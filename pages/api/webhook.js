// pages/api/webhook.js
// Listens for successful Stripe payments and emails form data to Eric

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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
    const session = event.data.object
    const meta = session.metadata || {}
    const customerName = meta.customer_name || 'Unknown'
    const businessName = meta.business_name || 'Unknown'
    const email = session.customer_email || 'Unknown'
    const amountPaid = `$${(session.amount_total / 100).toFixed(2)}`

    // Payment confirmed — intake form submission will trigger the full report brief email
    try {
      await resend.emails.send({
        from: 'Novo Navis <noreply@novonavis.com>',
        to: 'ericjohnston105@gmail.com',
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
  } else {
    console.log(`Unhandled event type: ${event.type}`)
  }

  res.status(200).json({ received: true })
}