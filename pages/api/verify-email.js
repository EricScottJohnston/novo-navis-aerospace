// pages/api/verify-email.js
// Two actions:
//   send   — generates a 6-digit code, stores in S3, emails via Resend
//   verify — checks code against S3, marks email as verified

import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { Resend } from 'resend'

const s3     = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })
const resend = new Resend(process.env.RESEND_API_KEY)

const CODE_TTL_MS     = 10 * 60 * 1000  // 10 minutes to enter the code
const VERIFIED_TTL_MS = 60 * 60 * 1000  // verified status valid for 1 hour

function emailKey(email) {
  return `verify/${email.toLowerCase().replace(/[^a-z0-9@._-]/g, '_')}.json`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { action, email, code } = req.body
  if (!email || !action) return res.status(400).json({ error: 'Missing fields' })

  const normalizedEmail = email.toLowerCase().trim()
  const key = emailKey(normalizedEmail)

  // ── SEND ──────────────────────────────────────────────────────
  if (action === 'send') {
    const generatedCode = String(Math.floor(100000 + Math.random() * 900000))
    const record = {
      generatedCode,
      expiresAt:  new Date(Date.now() + CODE_TTL_MS).toISOString(),
      verified:   false,
    }

    try {
      await s3.send(new PutObjectCommand({
        Bucket:      process.env.S3_BUCKET,
        Key:         key,
        Body:        JSON.stringify(record),
        ContentType: 'application/json',
      }))
    } catch (err) {
      console.error('[verify-email] S3 write error:', err)
      return res.status(500).json({ error: 'Failed to store code' })
    }

    try {
      await resend.emails.send({
        from:    'Novo Navis <noreply@novonavis.com>',
        to:      [normalizedEmail],
        subject: `Your Novo Navis verification code: ${generatedCode}`,
        html: `
          <p>Your verification code is:</p>
          <p style="font-size:2rem;font-weight:bold;letter-spacing:0.15em;color:#1B2A4A;">${generatedCode}</p>
          <p style="color:#6b7a99;font-size:0.9rem;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
          <p style="color:#6b7a99;font-size:0.9rem;">Novo Navis, LLC · Fidelis Diligentia</p>
        `,
      })
    } catch (err) {
      console.error('[verify-email] Resend error:', err)
      return res.status(500).json({ error: 'Failed to send code' })
    }

    return res.status(200).json({ success: true })
  }

  // ── VERIFY ────────────────────────────────────────────────────
  if (action === 'verify') {
    if (!code) return res.status(400).json({ error: 'Missing code' })

    let record
    try {
      const obj = await s3.send(new GetObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key }))
      record = JSON.parse(await obj.Body.transformToString())
    } catch (err) {
      if (err.name === 'NoSuchKey') return res.status(400).json({ error: 'No code found for this email. Request a new one.' })
      console.error('[verify-email] S3 read error:', err)
      return res.status(500).json({ error: 'Verification failed' })
    }

    if (new Date(record.expiresAt).getTime() < Date.now()) {
      return res.status(400).json({ error: 'Code expired. Request a new one.' })
    }

    if (record.generatedCode !== code.trim()) {
      return res.status(400).json({ error: 'Incorrect code. Please try again.' })
    }

    // Mark as verified
    try {
      await s3.send(new PutObjectCommand({
        Bucket:      process.env.S3_BUCKET,
        Key:         key,
        Body:        JSON.stringify({ verified: true, verifiedAt: new Date().toISOString(), expiresAt: new Date(Date.now() + VERIFIED_TTL_MS).toISOString() }),
        ContentType: 'application/json',
      }))
    } catch (err) {
      console.error('[verify-email] S3 verified write error:', err)
    }

    return res.status(200).json({ success: true })
  }

  return res.status(400).json({ error: 'Invalid action' })
}
