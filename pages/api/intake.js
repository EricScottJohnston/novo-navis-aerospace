// pages/api/intake.js
// Receives post-payment intake form, emails Eric with full report brief

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const {
    sessionId,
    industry,
    employees,
    budget,
    businessDescription,
    process1,
    process2,
    process3,
    goal
  } = req.body

  // Verify payment and retrieve identity from Stripe
  let customerName = 'Unknown'
  let customerEmail = 'Unknown'
  let businessName = 'Unknown'
  let amountPaid = 'Unknown'

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'Payment not verified' })
    }
    customerName = session.metadata?.customer_name || 'Unknown'
    customerEmail = session.customer_email || 'Unknown'
    businessName = session.metadata?.business_name || 'Unknown'
    amountPaid = `$${(session.amount_total / 100).toFixed(2)}`
  } catch (err) {
    console.error('Stripe session error:', err)
    return res.status(400).json({ error: 'Invalid session' })
  }

  try {
    await resend.emails.send({
      from: 'Novo Navis <noreply@novonavis.com>',
      to: 'ericjohnston105@gmail.com',
      subject: `Intake Ready — ${businessName} — ${industry}`,
      html: `
        <h2>Intake Form Received — Ready to Run Report</h2>
        <p><strong>Amount Paid:</strong> ${amountPaid}</p>
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
        <hr />
        <h3>Pain Points</h3>
        <p><strong>Repetitive Task 1:</strong><br/>${process1}</p>
        <p><strong>Repetitive Task 2:</strong><br/>${process2 || 'Not provided'}</p>
        <p><strong>Repetitive Task 3:</strong><br/>${process3 || 'Not provided'}</p>
        <p><strong>Biggest Operational Problem:</strong><br/>${goal}</p>
        <hr />
        <hr />
        <h3 style="color: #333;">order.txt — paste this into David</h3>
        <pre style="background: #f5f5f5; padding: 1rem; font-size: 13px; line-height: 1.6;">Name: ${customerName}
Business: ${businessName}
Industry: ${industry}
Employees: ${employees || 'Not provided'}
Budget: ${budget || 'Not provided'}
About: ${businessDescription}
Task 1: ${process1}
Task 2: ${process2 || 'Not provided'}
Task 3: ${process3 || 'Not provided'}
Problem: ${goal}</pre>
        <p style="color: #888; font-size: 12px;">
          Copy the block above into order.txt, run David, then email the report to ${customerEmail} within 24 hours.
        </p>
      `
    })

    res.status(200).json({ success: true })
  } catch (err) {
    console.error('Email error:', err)
    res.status(500).json({ error: 'Failed to send email' })
  }
}
