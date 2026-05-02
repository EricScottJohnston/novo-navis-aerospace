// pages/api/unlock-confirmed.js
// Called by the /unlock-confirmed page after Stripe redirects back.
// Verifies payment, pulls the full PDF from S3, emails it to the customer,
// and marks the order as unlocked.
//
// Tier-aware: starter/blueprint get the AI Blueprint treatment.
// Strategic gets the Strategic Analysis treatment.

import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { Resend } from 'resend'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)
const s3     = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })
const BUCKET = process.env.S3_BUCKET

// ── Per-tier copy and branding ─────────────────────────────────────────────
const TIER_LABELS = {
  starter:   'Single Workflow Blueprint',
  blueprint: 'AI Blueprint',
  strategic: 'Strategic Analysis',
}

const TIER_FROM = {
  starter:   'Novo Navis <reports@novonavis.com>',
  blueprint: 'Novo Navis <reports@novonavis.com>',
  strategic: 'Novo Navis Strategic <reports@novonavis.com>',
}

const TIER_FILENAME_PREFIX = {
  starter:   'workflow_blueprint',
  blueprint: 'ai_blueprint',
  strategic: 'strategic_analysis',
}

const TIER_SUBJECTS = {
  starter:   'Your Full Workflow Blueprint — Unlocked',
  blueprint: 'Your Full AI Blueprint — Unlocked',
  strategic: 'Your Full Strategic Analysis — Unlocked',
}

function tierEmailBody(tier, label) {
  if (tier === 'strategic') {
    return `
      <p>You're all set.</p>
      <p>Your full <strong>${label}</strong> is attached. This is the unredacted
      report — including the strategic recommendation, the alternative paths
      considered, the decision framework, the sensitivity analysis, and the
      action plan.</p>
      <p>Every substantive finding carries a confidence label (CAUSAL, MECHANISM,
      or THRESHOLD) and a documented evidence provenance. The Decision Log
      appendix records every override, every gap, and every assumption — the
      audit trail you can defend in front of your client or their board.</p>
      <p>Questions or follow-on engagements? Reply to this email.</p>
      <p>Fidelis Diligentia<br/>Novo Navis, LLC<br/>
      <span style="color:#6b7a99;font-size:12px;">Registered U.S. Defense Contractor</span></p>
    `
  }
  // Default — starter / blueprint (Interactive product)
  return `
    <p>You're all set.</p>
    <p>Your full <strong>${label}</strong> is attached — with the specific tool
    names, pricing, and vendor links that were redacted in the preview.</p>
    <p>If you have any questions, reply to this email or call
    <a href="tel:6234289308">(623) 428-9308</a>.</p>
    <p>Fidelis Diligentia<br/>Novo Navis, LLC</p>
  `
}

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
      Key:    `orders/${orderId}.json`,
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
      Key:    `reports/${orderId}.pdf`,
    }))
    const chunks = []
    for await (const chunk of obj.Body) chunks.push(chunk)
    pdfBuffer = Buffer.concat(chunks)
  } catch (err) {
    console.error('[unlock-confirmed] S3 get-pdf error:', err)
    return res.status(500).json({ error: 'Failed to retrieve report' })
  }

  const customerEmail   = orderMeta.email
  const tier            = orderMeta.tier || 'blueprint'
  const tierLabel       = TIER_LABELS[tier]            || TIER_LABELS.blueprint
  const fromAddress     = TIER_FROM[tier]              || TIER_FROM.blueprint
  const filenamePrefix  = TIER_FILENAME_PREFIX[tier]   || TIER_FILENAME_PREFIX.blueprint
  const subject         = TIER_SUBJECTS[tier]          || TIER_SUBJECTS.blueprint
  const htmlBody        = tierEmailBody(tier, tierLabel)

  // Email the full report
  try {
    await resend.emails.send({
      from:    fromAddress,
      to:      [customerEmail],
      subject: subject,
      html:    htmlBody,
      attachments: [{
        filename: `${filenamePrefix}_${orderId}.pdf`,
        content:  Array.from(pdfBuffer),
      }],
    })
    console.log(`[unlock-confirmed] Full ${tierLabel} emailed to ${customerEmail}`)
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
