// pages/api/intake.js
// Two flows:
//   Free flow  — `tier` + `email` in body, no Stripe session. David generates redacted report, emails unlock link.
//   Enterprise — `sessionId` in body, Stripe verified. David generates full report directly.

import { Resend } from 'resend'
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'

const resend = new Resend(process.env.RESEND_API_KEY)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const sqs = new SQSClient({ region: process.env.AWS_REGION || 'us-east-1' })
const s3  = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })

const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000 // 24 hours

async function checkRateLimit(email) {
  const key = `ratelimit/${email.toLowerCase().replace(/[^a-z0-9@._-]/g, '_')}.json`
  try {
    const obj = await s3.send(new GetObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key }))
    const { submittedAt } = JSON.parse(await obj.Body.transformToString())
    if (Date.now() - new Date(submittedAt).getTime() < RATE_LIMIT_WINDOW_MS) {
      return false // blocked
    }
  } catch (err) {
    if (err.name !== 'NoSuchKey') console.error('[intake] rate-limit check error:', err)
  }
  return true // allowed
}

async function writeRateLimit(email) {
  const key = `ratelimit/${email.toLowerCase().replace(/[^a-z0-9@._-]/g, '_')}.json`
  try {
    await s3.send(new PutObjectCommand({
      Bucket:      process.env.S3_BUCKET,
      Key:         key,
      Body:        JSON.stringify({ submittedAt: new Date().toISOString() }),
      ContentType: 'application/json',
    }))
  } catch (err) {
    console.error('[intake] rate-limit write error:', err)
  }
}

// Stripe amount → tier for enterprise (paid-upfront) flow
const ENTERPRISE_TIER_MAP = {
  100:   'test',       // $1 — smoke test only
  99900: 'enterprise', // $999
}

// Unlock price (cents) for each free-flow tier
const UNLOCK_PRICE = {
  starter:   9900,  // $99
  blueprint: 29900, // $299
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const {
    sessionId,
    tier: bodyTier,
    name: bodyName,
    email: bodyEmail,
    business: bodyBusiness,
    industry,
    employees,
    budget,
    businessDescription,
    currentTools,
    process1,
    process2,
    process3,
    process4,
    process5,
    goal
  } = req.body

  const isFree = !!bodyTier && !sessionId

  let customerName  = bodyName     || 'Unknown'
  let customerEmail = bodyEmail    || 'Unknown'
  let businessName  = bodyBusiness || 'Unknown'
  let tier          = bodyTier     || null
  let amountPaid    = 'Free intake'

  // Enterprise: verify Stripe payment
  if (!isFree) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      if (session.payment_status !== 'paid') {
        return res.status(402).json({ error: 'Payment not verified' })
      }
      customerName  = bodyName     || session.metadata?.customer_name || 'Unknown'
      customerEmail = session.customer_details?.email || session.customer_email || 'Unknown'
      businessName  = bodyBusiness || session.metadata?.business_name || 'Unknown'
      const amountTotal = session.amount_total || 0
      amountPaid    = `$${(amountTotal / 100).toFixed(2)}`
      tier          = ENTERPRISE_TIER_MAP[amountTotal] || 'enterprise'
    } catch (err) {
      console.error('Stripe session error:', err)
      return res.status(400).json({ error: 'Invalid session' })
    }
  }

  // Validate free-flow tier
  if (isFree && !UNLOCK_PRICE[tier]) {
    return res.status(400).json({ error: 'Invalid tier' })
  }

  // Rate limit — one submission per email per 24 hours
  const allowed = await checkRateLimit(customerEmail)
  if (!allowed) {
    return res.status(429).json({ error: 'rate_limited' })
  }

  // Generate order ID
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
    `Task 4: ${process4 || 'Not provided'}`,
    `Task 5: ${process5 || 'Not provided'}`,
    `Problem: ${goal}`,
  ].join('\n')

  // Queue to David via SQS
  let sqsSent = false
  if (tier && process.env.SQS_QUEUE_URL) {
    try {
      const sqsPayload = {
        orderId,
        orderText,
        tier,
        redacted: isFree,
        ...(isFree && {
          customerEmail,
          unlockPrice: UNLOCK_PRICE[tier],
          unlockUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.novonavis.com'}/unlock?order=${orderId}`,
        }),
      }
      await sqs.send(new SendMessageCommand({
        QueueUrl:    process.env.SQS_QUEUE_URL,
        MessageBody: JSON.stringify(sqsPayload),
        MessageAttributes: {
          tier: { DataType: 'String', StringValue: tier }
        }
      }))
      sqsSent = true
      console.log(`[intake] Order ${orderId} queued for David. redacted=${isFree}`)
    } catch (err) {
      console.error('[intake] SQS send failed:', err)
    }
  }

  // Record submission for rate limiting
  await writeRateLimit(customerEmail)

  // Email Eric (notification + manual fallback)
  try {
    await resend.emails.send({
      from:    'Novo Navis <noreply@novonavis.com>',
      to:      'ericjohnston105@gmail.com',
      subject: `${isFree ? '[FREE INTAKE]' : 'Intake Ready'} — ${businessName} — ${industry}`,
      html: `
        <h2>Intake Form Received</h2>
        <p><strong>Flow:</strong> ${isFree ? '🆓 Free intake (redacted report → unlock)' : '💳 Paid upfront'}</p>
        <p><strong>Amount:</strong> ${amountPaid}</p>
        <p><strong>Tier:</strong> ${tier || 'unknown'}</p>
        ${isFree ? `<p><strong>Unlock Price:</strong> $${(UNLOCK_PRICE[tier] / 100).toFixed(2)}</p>` : ''}
        <p><strong>David Auto-Queued:</strong> ${sqsSent ? '✅ Yes — Order ID: ' + orderId : '⚠️ No — SQS not configured'}</p>
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
        <p><strong>Task 1:</strong><br/>${process1}</p>
        <p><strong>Task 2:</strong><br/>${process2 || 'Not provided'}</p>
        <p><strong>Task 3:</strong><br/>${process3 || 'Not provided'}</p>
        <p><strong>Task 4:</strong><br/>${process4 || 'Not provided'}</p>
        <p><strong>Task 5:</strong><br/>${process5 || 'Not provided'}</p>
        <p><strong>Biggest Operational Problem:</strong><br/>${goal}</p>
        <hr />
        <h3 style="color:#333;">order.txt — manual fallback</h3>
        <pre style="background:#f5f5f5;padding:1rem;font-size:13px;line-height:1.6;">${orderText}</pre>
        <p style="color:#888;font-size:12px;">
          If David did not auto-run, paste the block above into order.txt and run the appropriate script.
          ${isFree
            ? `Redacted mode: run david_redacted.py. Then email redacted PDF + unlock link (${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.novonavis.com'}/unlock?order=${orderId}) to ${customerEmail}.`
            : `Full mode: run david_199_v1.py. Then email the full report to ${customerEmail}.`
          }
        </p>
      `
    })
  } catch (err) {
    console.error('Email error:', err)
  }

  res.status(200).json({ success: true, orderId })
}
