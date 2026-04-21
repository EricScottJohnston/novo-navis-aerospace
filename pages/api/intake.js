// pages/api/intake.js
// Receives post-payment intake form.
// Verifies Stripe payment, emails Eric, and routes $199 orders to David via SQS.

import { Resend } from 'resend'
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'

const resend = new Resend(process.env.RESEND_API_KEY)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const sqs = new SQSClient({ region: process.env.AWS_REGION || 'us-east-1' })

const TIER_MAP = {
  4900:  'starter',   // $49
  19900: 'blueprint', // $199
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const {
    sessionId,
    name: bodyName,
    business: bodyBusiness,
    industry,
    employees,
    budget,
    businessDescription,
    currentTools,
    process1,
    process2,
    process3,
    goal
  } = req.body

  // Verify payment and retrieve identity from Stripe
  let customerName  = 'Unknown'
  let customerEmail = 'Unknown'
  let businessName  = 'Unknown'
  let amountPaid    = 'Unknown'
  let amountTotal   = 0

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'Payment not verified' })
    }
    customerName  = bodyName     || session.metadata?.customer_name  || 'Unknown'
    customerEmail = session.customer_email                            || 'Unknown'
    businessName  = bodyBusiness || session.metadata?.business_name  || 'Unknown'
    amountTotal   = session.amount_total || 0
    amountPaid    = `$${(amountTotal / 100).toFixed(2)}`
  } catch (err) {
    console.error('Stripe session error:', err)
    return res.status(400).json({ error: 'Invalid session' })
  }

  // Generate order ID — flows through SQS → David → tracking page
  const safeName = customerName.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 20)
  const orderId  = `${safeName}_${Date.now()}`

  // Build the order text block David reads
  const orderText = [
    `Name: ${customerName}`,
    `Email: ${customerEmail}`,
    `Business: ${businessName}`,
    `Industry: ${industry}`,
    `Employees: ${employees || 'Not provided'}`,
    `Budget: ${budget || 'Not provided'}`,
    `About: ${businessDescription}`,
    `Current Tools: ${currentTools || 'Not provided'}`,
    `Task 1: ${process1}`,
    `Task 2: ${process2 || 'Not provided'}`,
    `Task 3: ${process3 || 'Not provided'}`,
    `Problem: ${goal}`,
  ].join('\n')

  // Route all known tiers to David via SQS
  const tier = TIER_MAP[amountTotal] || null
  let sqsSent = false
  if (tier && process.env.SQS_QUEUE_URL) {
    try {
      await sqs.send(new SendMessageCommand({
        QueueUrl:    process.env.SQS_QUEUE_URL,
        MessageBody: JSON.stringify({ orderId, orderText, tier }),
        MessageAttributes: {
          tier: { DataType: 'String', StringValue: tier }
        }
      }))
      sqsSent = true
      console.log(`[intake] Order ${orderId} queued for David.`)
    } catch (err) {
      console.error('[intake] SQS send failed:', err)
      // Non-fatal — Eric's email is the fallback
    }
  }

  // Email Eric (notification + fallback)
  try {
    await resend.emails.send({
      from:    'Novo Navis <noreply@novonavis.com>',
      to:      'ericjohnston105@gmail.com',
      subject: `Intake Ready — ${businessName} — ${industry}`,
      html: `
        <h2>Intake Form Received</h2>
        <p><strong>Amount Paid:</strong> ${amountPaid}</p>
        <p><strong>Tier:</strong> ${tier || 'unknown'}</p>
        <p><strong>David Auto-Queued:</strong> ${sqsSent ? '✅ Yes — Order ID: ' + orderId : '⚠️ No — SQS not configured or unrecognized tier'}</p>
        <hr />
        <h3>Customer</h3>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Employees:</strong> ${employees || 'Not provided'}</p>
        <p><strong>Monthly Software Budget:</strong> ${budget || 'Not provided'}</p>
        <hr />
        <h3>About Their Business</h3>
        <p>${businessDescription}</p>
        <p><strong>Current Software Tools:</strong> ${currentTools || 'Not provided'}</p>
        <hr />
        <h3>Pain Points</h3>
        <p><strong>Repetitive Task 1:</strong><br/>${process1}</p>
        <p><strong>Repetitive Task 2:</strong><br/>${process2 || 'Not provided'}</p>
        <p><strong>Repetitive Task 3:</strong><br/>${process3 || 'Not provided'}</p>
        <p><strong>Biggest Operational Problem:</strong><br/>${goal}</p>
        <hr />
        <h3 style="color:#333;">order.txt — manual fallback if David did not auto-run</h3>
        <pre style="background:#f5f5f5;padding:1rem;font-size:13px;line-height:1.6;">${orderText}</pre>
        <p style="color:#888;font-size:12px;">
          If David did not auto-run, paste the block above into order.txt and run david_199_v1.py.
          Then email the report to ${customerEmail}.
        </p>
      `
    })
  } catch (err) {
    console.error('Email error:', err)
    // Non-fatal — SQS is the primary path
  }

  res.status(200).json({ success: true, orderId })
}
