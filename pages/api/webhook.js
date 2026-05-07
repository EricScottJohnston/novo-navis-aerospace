// pages/api/webhook.js
// Listens for successful Stripe payments and routes by payment type.
//
// Three payment types:
//   1. Tool registration    — meta.tool_name present
//   2. Intelligence report  — orderId starts with 'intel_'
//   3. Standard report      — all other orders

import { Resend } from 'resend'
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'

const resend = new Resend(process.env.RESEND_API_KEY)
const sqs    = new SQSClient({ region: process.env.AWS_REGION || 'us-east-1' })

export const config = {
  api: {
    bodyParser: false
  }
}

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const rawBody = await getRawBody(req)
  const sig = req.headers['stripe-signature']

  let event

  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return res.status(400).json({ error: `Webhook Error: ${err.message}` })
  }

  if (event.type === 'checkout.session.completed') {
    const session    = event.data.object
    const meta       = session.metadata || {}
    const email      = session.customer_email || session.customer_details?.email || 'Unknown'
    const amountPaid = `$${(session.amount_total / 100).toFixed(2)}`
    const orderId    = meta.orderId || ''

    // ── 1. Tool registration payment ─────────────────────────────
    if (meta.tool_name) {
      const developerName = meta.developer_name || 'Unknown'
      const toolName      = meta.tool_name || 'Unknown'

      try {
        await resend.emails.send({
          from:    'Novo Navis <noreply@novonavis.com>',
          to:      'ericjohnston105@gmail.com',
          subject: `Tool Registration Payment — ${toolName} — ${developerName}`,
          html: `
            <h2>New AI Tool Registration</h2>
            <p><strong>Amount:</strong> ${amountPaid}</p>
            <p><strong>Developer:</strong> ${developerName}</p>
            <p><strong>Tool Name:</strong> ${toolName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr />
            <p style="color: #888; font-size: 12px;">
              Registration is valid for 3 months. Review the submitted tool details
              and add the tool to the recommendation spreadsheet.
            </p>
          `
        })
        console.log('Tool registration notification sent for:', toolName)
      } catch (emailErr) {
        console.error('Email send error:', emailErr)
      }

    // ── 2. Intelligence report purchase ──────────────────────────
    } else if (orderId.startsWith('intel_')) {
      console.log(`[webhook] Intelligence report purchase: ${orderId}`)

      // Push SQS message to EC2 to deliver the full unredacted PDF
      if (process.env.SQS_QUEUE_URL) {
        try {
          const sqsPayload = {
            orderId,
            orderText:     `Deliver: ${orderId}`,
            tier:          'intelligence',
            redacted:      false,
            customerEmail: email,
            action:        'deliver_full',
          }
          await sqs.send(new SendMessageCommand({
            QueueUrl:    process.env.SQS_QUEUE_URL,
            MessageBody: JSON.stringify(sqsPayload),
            MessageAttributes: {
              tier: { DataType: 'String', StringValue: 'intelligence' }
            }
          }))
          console.log(`[webhook] Intelligence delivery queued for: ${orderId}`)
        } catch (sqsErr) {
          console.error('[webhook] SQS send failed:', sqsErr)
        }
      }

      // Notify Eric
      try {
        await resend.emails.send({
          from:    'Novo Navis <noreply@novonavis.com>',
          to:      'ericjohnston105@gmail.com',
          subject: `Intelligence Report Purchased — ${orderId}`,
          html: `
            <h2>Intelligence Report Purchase</h2>
            <p><strong>Amount:</strong> ${amountPaid}</p>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Customer Email:</strong> ${email}</p>
            <hr />
            <p style="color: #888; font-size: 12px;">
              Full report delivery has been queued via SQS.
              David will email the full PDF to the customer automatically.
            </p>
          `
        })
      } catch (emailErr) {
        console.error('Email send error:', emailErr)
      }

    // ── 3. Standard report payment ───────────────────────────────
    } else {
      const customerName = meta.customer_name || 'Unknown'
      const businessName = meta.business_name || 'Unknown'

      try {
        await resend.emails.send({
          from:    'Novo Navis <noreply@novonavis.com>',
          to:      'ericjohnston105@gmail.com',
          subject: `Payment Received — ${businessName} — Awaiting Intake`,
          html: `
            <h2>Payment Received</h2>
            <p><strong>Amount:</strong> ${amountPaid}</p>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Business:</strong> ${businessName}</p>
            <hr />
            <p style="color: #888; font-size: 12px;">
              Customer has been redirected to the intake form. You will receive a second email
              with full report details once they complete it.
            </p>
          `
        })
        console.log('Payment notification sent for:', businessName)
      } catch (emailErr) {
        console.error('Email send error:', emailErr)
      }
    }

  } else {
    console.log(`Unhandled event type: ${event.type}`)
  }

  res.status(200).json({ received: true })
}
