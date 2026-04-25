// pages/api/enterprise-intake.js
// Receives enterprise post-payment intake form.
// Verifies Stripe payment, emails Eric, and routes $999 orders to David Enterprise via SQS.

import { Resend } from 'resend'
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'

const resend = new Resend(process.env.RESEND_API_KEY)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const sqs    = new SQSClient({ region: process.env.AWS_REGION || 'us-east-1' })

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const {
    sessionId,
    name:               bodyName,
    business:           bodyBusiness,
    industry,
    employees,
    budget,
    businessDescription,
    currentTools,
    departments,
    itInfrastructure,
    compliance,
    timeline,
    process1,  process2,  process3,  process4,  process5,
    process6,  process7,  process8,  process9,  process10,
    goal,
  } = req.body

  // Verify payment via Stripe
  let customerName  = 'Unknown'
  let customerEmail = 'Unknown'
  let businessName  = 'Unknown'
  let amountPaid    = 'Unknown'

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'Payment not verified' })
    }
    customerName  = bodyName     || session.metadata?.customer_name  || 'Unknown'
    customerEmail = session.customer_details?.email || session.customer_email || 'Unknown'
    businessName  = bodyBusiness || session.metadata?.business_name  || 'Unknown'
    amountPaid    = `$${(session.amount_total / 100).toFixed(2)}`
  } catch (err) {
    console.error('Stripe session error:', err)
    return res.status(400).json({ error: 'Invalid session' })
  }

  const safeName = customerName.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 20)
  const orderId  = `ent_${safeName}_${Date.now()}`

  // Build the order text block David Enterprise reads
  const taskLines = [
    process1,  process2,  process3,  process4,  process5,
    process6,  process7,  process8,  process9,  process10,
  ]
    .map((p, i) => p?.trim() ? `Task ${i + 1}: ${p.trim()}` : null)
    .filter(Boolean)
    .join('\n')

  const orderText = [
    `Name: ${customerName}`,
    `Email: ${customerEmail}`,
    `Business: ${businessName}`,
    `Industry: ${industry || 'Not provided'}`,
    `Employees: ${employees || 'Not provided'}`,
    `Budget: ${budget || 'Not provided'}`,
    `Departments: ${departments || 'Not provided'}`,
    `IT Infrastructure: ${itInfrastructure || 'Not provided'}`,
    `Compliance: ${compliance || 'None'}`,
    `Timeline: ${timeline || 'Not provided'}`,
    `About: ${businessDescription || 'Not provided'}`,
    `Current Tools: ${currentTools || 'Not provided'}`,
    taskLines,
    `Problem: ${goal || 'Not provided'}`,
  ].filter(Boolean).join('\n')

  // Send to SQS → David Enterprise
  let sqsSent = false
  if (process.env.SQS_QUEUE_URL) {
    try {
      await sqs.send(new SendMessageCommand({
        QueueUrl:    process.env.SQS_QUEUE_URL,
        MessageBody: JSON.stringify({ orderId, orderText, tier: 'enterprise' }),
        MessageAttributes: {
          tier: { DataType: 'String', StringValue: 'enterprise' }
        }
      }))
      sqsSent = true
      console.log(`[enterprise-intake] Order ${orderId} queued for David Enterprise.`)
    } catch (err) {
      console.error('[enterprise-intake] SQS send failed:', err)
    }
  }

  // Email Eric
  try {
    await resend.emails.send({
      from:    'Novo Navis <noreply@novonavis.com>',
      to:      'ericjohnston105@gmail.com',
      subject: `ENTERPRISE Intake — ${businessName} — ${industry}`,
      html: `
        <h2>Enterprise Intake Form Received</h2>
        <p><strong>Amount Paid:</strong> ${amountPaid}</p>
        <p><strong>Tier:</strong> Enterprise ($999)</p>
        <p><strong>David Auto-Queued:</strong> ${sqsSent ? '✅ Yes — Order ID: ' + orderId : '⚠️ No — SQS not configured'}</p>
        <hr />
        <h3>Customer</h3>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Industry:</strong> ${industry || 'Not provided'}</p>
        <p><strong>Employees:</strong> ${employees || 'Not provided'}</p>
        <p><strong>Budget:</strong> ${budget || 'Not provided'}</p>
        <hr />
        <h3>Enterprise Context</h3>
        <p><strong>Departments:</strong> ${departments || 'Not provided'}</p>
        <p><strong>IT Infrastructure:</strong> ${itInfrastructure || 'Not provided'}</p>
        <p><strong>Compliance:</strong> ${compliance || 'None'}</p>
        <p><strong>Timeline:</strong> ${timeline || 'Not provided'}</p>
        <p><strong>Current Tools:</strong> ${currentTools || 'Not provided'}</p>
        <hr />
        <h3>About Their Business</h3>
        <p>${businessDescription || 'Not provided'}</p>
        <hr />
        <h3>Workflows</h3>
        ${taskLines.replace(/\n/g, '<br/>')}
        <hr />
        <h3>Biggest Problem</h3>
        <p>${goal || 'Not provided'}</p>
        <hr />
        <h3>order.txt — manual fallback if David Enterprise did not auto-run</h3>
        <pre style="background:#f5f5f5;padding:1rem;font-size:13px;line-height:1.6;">${orderText}</pre>
        <p style="color:#888;font-size:12px;">
          If David did not auto-run, paste the block above into order.txt and run david_enterprise_v1.py.
          Then email the report to ${customerEmail}.
        </p>
      `
    })
  } catch (err) {
    console.error('[enterprise-intake] Email error:', err)
  }

  res.status(200).json({ success: true, orderId })
}
