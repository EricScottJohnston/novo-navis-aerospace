// pages/api/unlock-confirmed.js
// Called by the /unlock-confirmed page after Stripe redirects back.
// Verifies payment, pulls the full PDF from S3, emails it to the customer,
// and marks the order as unlocked.

import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { Resend } from 'resend'

const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY)
const resend  = new Resend(process.env.RESEND_API_KEY)
const s3      = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })
const BUCKET  = process.env.S3_BUCKET

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { sessionId, orderId } = req.body
  if (!sessionId || !orderId) {
    return res.status(400).json({ error: 'Missing sessionId or orderId' })
  }

  // Verify Stripe payment
  let stripeSession
  try {
    stripeSession = await stripe.checkout.sessions.retrieve(sessionId)
    if (stripeSession.payment_status !== 'paid') {
      return res.status(402).json({ error: 'Payment not confirmed' })
    }
    if (stripeSession.metadata?.orderId !== orderId) {
      return res.status(400).json({ error: 'Order ID mismatch' })
    }
  } catch (err) {
    console.error('[unlock-confirmed] Stripe error:', err)
    return res.status(400).json({ error: 'Invalid session' })
  }

  // Read order metadata from S3
  let orderMeta
  try {
    const obj = await s3.send(new GetObjectCommand({
      Bucket: BUCKET,
      Key: `orders/${orderId}.json`,
    }))
    orderMeta = JSON.parse(await obj.Body.transformToString())
  } catch (err) {
    console.error('[unlock-confirmed] S3 get-order error:', err)
    return res.status(500).json({ error: 'Failed to retrieve order metadata' })
  }

  // Idempotent — if already unlocked, just confirm success
  if (orderMeta.status === 'unlocked') {
    return res.status(200).json({ success: true, alreadyUnlocked: true })
  }

  // Pull the full PDF from S3
  let pdfBuffer
  try {
    const obj = await s3.send(new GetObjectCommand({
      Bucket: BUCKET,
      Key: `reports/${orderId}.pdf`,
    }))
    const chunks = []
    for await (const chunk of obj.Body) chunks.push(chunk)
    pdfBuffer = Buffer.concat(chunks)
  } catch (err) {
    console.error('[unlock-confirmed] S3 get-pdf error:', err)
    return res.status(500).json({ error: 'Failed to retrieve report' })
  }

  const customerEmail = orderMeta.email
  const tierLabel = orderMeta.tier === 'starter' ? 'Single Workflow Blueprint' : 'AI Blueprint'

  // Email the full report
  try {
    await resend.emails.send({
      from: 'Novo Navis <reports@novonavis.com>',
      to:   [customerEmail],
      subject: `Your Full AI Blueprint — Unlocked`,
      html: `
        <p>You're all set.</p>
        <p>Your full <strong>${tierLabel}</strong> is attached — with the specific tool
        names, pricing, and vendor links that were redacted in the preview.</p>
        <p>If you have any questions, reply to this email or call
        <a href="tel:6234289308">(623) 428-9308</a>.</p>
        <p>Fidelis Diligentia<br/>Novo Navis, LLC</p>
      `,
      attachments: [{
        filename: `ai_blueprint_${orderId}.pdf`,
        content:  Array.from(pdfBuffer),
      }],
    })
    console.log(`[unlock-confirmed] Full report emailed to ${customerEmail}`)
  } catch (err) {
    console.error('[unlock-confirmed] Email error:', err)
    // Non-fatal — update status and return success; Eric's notification handles fallback
  }

  // Mark order as unlocked in S3
  try {
    const updated = { ...orderMeta, status: 'unlocked', unlockedAt: new Date().toISOString() }
    await s3.send(new PutObjectCommand({
      Bucket:      BUCKET,
      Key:         `orders/${orderId}.json`,
      Body:        JSON.stringify(updated, null, 2),
      ContentType: 'application/json',
    }))
  } catch (err) {
    console.error('[unlock-confirmed] S3 update-order error:', err)
  }

  // Notify Eric
  try {
    await resend.emails.send({
      from:    'Novo Navis <noreply@novonavis.com>',
      to:      'ericjohnston105@gmail.com',
      subject: `Unlock Confirmed — ${orderId}`,
      html: `
        <p><strong>Order unlocked:</strong> ${orderId}</p>
        <p><strong>Tier:</strong> ${tierLabel}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Amount:</strong> $${(orderMeta.unlockPrice / 100).toFixed(2)}</p>
      `,
    })
  } catch (_) {}

  res.status(200).json({ success: true })
}
