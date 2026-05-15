// pages/api/unlock-confirmed.js
// Called by the /unlock-confirmed page after Stripe redirects back.
// Verifies payment, pulls the full PDF from S3, emails it to the customer,
// and marks the order as unlocked.
//
// Tier-aware:
//   - starter/blueprint   → AI Blueprint treatment (Interactive product line)
//   - strategic           → Strategic Analysis treatment
//   - intelligence ($499) → Intelligence Report treatment (enterprise)
//   - smb ($29)           → AI Tool Analysis treatment (trade journal voice)

import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { Resend } from 'resend'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)
const s3     = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })
const BUCKET = process.env.S3_BUCKET

// ── Per-tier copy and branding ─────────────────────────────────────────────
const TIER_LABELS = {
  starter:      'Single Workflow Blueprint',
  blueprint:    'AI Blueprint',
  strategic:    'Strategic Analysis',
  intelligence: 'Intelligence Report',
  smb:          'AI Tool Analysis',
}

const TIER_FROM = {
  starter:      'Novo Navis <reports@novonavis.com>',
  blueprint:    'Novo Navis <reports@novonavis.com>',
  strategic:    'Novo Navis Strategic <reports@novonavis.com>',
  intelligence: 'Novo Navis Intelligence <reports@novonavis.com>',
  smb:          'Novo Navis <reports@novonavis.com>',
}

const TIER_FILENAME_PREFIX = {
  starter:      'workflow_blueprint',
  blueprint:    'ai_blueprint',
  strategic:    'strategic_analysis',
  intelligence: 'intelligence_report',
  smb:          'ai_tool_analysis',
}

const TIER_SUBJECTS = {
  starter:      'Your Full Workflow Blueprint — Unlocked',
  blueprint:    'Your Full AI Blueprint — Unlocked',
  strategic:    'Your Full Strategic Analysis — Unlocked',
  intelligence: 'Your Full Intelligence Report — Unlocked',
  smb:          'Your Full AI Tool Analysis — Unlocked',
}

// ── PDF S3 key resolution ──────────────────────────────────────────────────
// Different report types live in different S3 prefixes. Branch on tier.
function pdfKeyForTier(tier, orderId) {
  if (tier === 'smb')          return `smb/${orderId}.pdf`
  if (tier === 'intelligence') return `intelligence/${orderId}.pdf`
  // starter, blueprint, strategic, and anything else default to reports/
  return `reports/${orderId}.pdf`
}

// ── Email body per tier ────────────────────────────────────────────────────
function tierEmailBody(tier, label) {
  if (tier === 'smb') {
    return `
      <p>You're all set.</p>
      <p>Your full <strong>${label}</strong> is attached — with the real tool
      names, vendor specifics, and the conditional guidance that was redacted
      in the preview.</p>
      <p>If you have questions, reply to this email or call
      <a href="tel:6234289308">(623) 428-9308</a>.</p>
      <p>Fidelis Diligentia<br/>Novo Navis, LLC</p>
    `
  }

  if (tier === 'intelligence') {
    return `
      <p>You're all set.</p>
      <p>Your full <strong>${label}</strong> is attached. This is the complete
      analysis — including the full causal map, the differentiated beneficiary
      assessment, the key risks, and the specific data points to watch.</p>
      <p>Every substantive finding carries a confidence label (CAUSAL,
      MECHANISM, THRESHOLD, or CORRELATED) and documented evidence provenance.
      The Analysis Log appendix records the rating distribution, verification
      outcomes, and open questions.</p>
      <p>Questions? Reply to this email.</p>
      <p>Fidelis Diligentia<br/>Novo Navis, LLC<br/>
      <span style="color:#6b7a99;font-size:12px;">Registered U.S. Defense Contractor</span></p>
    `
  }

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

  const tier            = orderMeta.tier || 'blueprint'
  const tierLabel       = TIER_LABELS[tier]            || TIER_LABELS.blueprint
  const fromAddress     = TIER_FROM[tier]              || TIER_FROM.blueprint
  const filenamePrefix  = TIER_FILENAME_PREFIX[tier]   || TIER_FILENAME_PREFIX.blueprint
  const subject         = TIER_SUBJECTS[tier]          || TIER_SUBJECTS.blueprint
  const htmlBody        = tierEmailBody(tier, tierLabel)

  // Idempotent — if already unlocked, just confirm success and echo tier
  if (orderMeta.status === 'unlocked') {
    return res.status(200).json({ success: true, alreadyUnlocked: true, tier, tierLabel })
  }

  // Pull the full PDF from S3 — path depends on tier
  let pdfBuffer
  const pdfKey = pdfKeyForTier(tier, orderId)
  try {
    const obj = await s3.send(new GetObjectCommand({
      Bucket: BUCKET,
      Key:    pdfKey,
    }))
    const chunks = []
    for await (const chunk of obj.Body) chunks.push(chunk)
    pdfBuffer = Buffer.concat(chunks)
  } catch (err) {
    console.error(`[unlock-confirmed] S3 get-pdf error (key=${pdfKey}):`, err)
    return res.status(500).json({ error: 'Failed to retrieve report' })
  }

  // The customer email comes from Stripe (the address they paid with) — for
  // SMB and intelligence orders the metadata may not have a pre-set email
  // since those orders are scanner-generated, not intake-form-generated.
  const customerEmail = orderMeta.email
                     || stripeSession.customer_email
                     || stripeSession.customer_details?.email
                     || ''

  if (!customerEmail) {
    console.error(`[unlock-confirmed] No customer email for ${orderId}`)
    // We have the payment but no address to send to. Notify Eric and surface error.
    try {
      await resend.emails.send({
        from:    'Novo Navis <noreply@novonavis.com>',
        to:      'ericjohnston105@gmail.com',
        subject: `URGENT: Paid order has no email — ${orderId}`,
        html: `
          <p>Order ${orderId} (${tierLabel}) was paid via Stripe session
          ${sessionId} but no customer email is available to send the PDF.</p>
          <p>Contact Stripe support or look up the session manually to recover
          the email and resend.</p>
        `,
      })
    } catch (_) {}
    return res.status(500).json({ error: 'Customer email unavailable' })
  }

  // Email the full report to the customer
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

  // Mark order as unlocked in S3, store the customer email so we have it on file
  try {
    const updated = {
      ...orderMeta,
      email:       customerEmail,
      status:      'unlocked',
      unlockedAt:  new Date().toISOString(),
    }
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
      subject: `Unlock Confirmed — ${orderId} — ${tierLabel}`,
      html: `
        <p><strong>Order unlocked:</strong> ${orderId}</p>
        <p><strong>Tier:</strong> ${tierLabel}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Amount:</strong> $${(orderMeta.unlockPrice / 100).toFixed(2)}</p>
      `,
    })
  } catch (_) {}

  // Echo tier in response so the success page can show the right copy
  res.status(200).json({ success: true, tier, tierLabel })
}
