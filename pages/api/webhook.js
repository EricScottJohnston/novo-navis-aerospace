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
    const industry = meta.industry || 'Unknown'
    const employees = meta.employees || 'Unknown'
    const businessDescription = meta.business_description || 'Not provided'
    const email = session.customer_email || 'Unknown'
    const process1 = meta.process1 || 'Not provided'
    const process2 = meta.process2 || 'Not provided'
    const process3 = meta.process3 || 'Not provided'
    const goal = meta.goal || 'Not provided'
    const amountPaid = `$${(session.amount_total / 100).toFixed(2)}`

    try {
      await resend.emails.send({
        from: 'Novo Navis <onboarding@resend.dev>',
        to: 'ericjohnston105@gmail.com',
        subject: `New Report Order — ${businessName} — ${industry}`,
        html: `
          <h2>New Report Order Received</h2>
          <p><strong>Amount Paid:</strong> ${amountPaid}</p>
          <hr />
          <h3>Customer Information</h3>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Business:</strong> ${businessName}</p>
          <p><strong>Industry:</strong> ${industry}</p>
          <p><strong>Employees:</strong> ${employees}</p>
          <hr />
          <h3>About Their Business</h3>
          <p>${businessDescription}</p>
          <hr />
          <h3>Their Pain Points</h3>
          <p><strong>Repetitive Task 1:</strong><br/>${process1}</p>
          <p><strong>Repetitive Task 2:</strong><br/>${process2}</p>
          <p><strong>Repetitive Task 3:</strong><br/>${process3}</p>
          <p><strong>Biggest Operational Problem:</strong><br/>${goal}</p>
          <hr />
          <p style="color: #888; font-size: 12px;">
            Run David with this information and email the PDF report to ${email} within 24 hours.
          </p>
        `
      })

      console.log('Email sent successfully for order from:', businessName)
    } catch (emailErr) {
      console.error('Email send error:', emailErr)
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`)
  }

  res.status(200).json({ received: true })
}