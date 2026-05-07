// pages/api/intelligence-intake.js
// Private admin API route for submitting intelligence report topics.
// Called only by pages/admin/intelligence.js — not publicly accessible.
// No rate limiting, no email verification, no Stripe session check.
// Builds order and pushes to SQS with tier: intelligence.

import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'

const sqs = new SQSClient({ region: process.env.AWS_REGION || 'us-east-1' })

const ADMIN_SECRET = process.env.ADMIN_SECRET || ''

function generateOrderId() {
  const now    = new Date()
  const dd     = String(now.getDate()).padStart(2, '0')
  const mm     = String(now.getMonth() + 1).padStart(2, '0')
  const yy     = String(now.getFullYear()).slice(-2)
  const rand   = String(Math.floor(1000 + Math.random() * 9000))
  return `intel_${dd}${mm}${yy}_${rand}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  // Simple secret check — admin only
  const { secret, topic, angle, constraints } = req.body

  if (!secret || secret !== ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (!topic || !topic.trim()) {
    return res.status(400).json({ error: 'Topic is required' })
  }

  const orderId = generateOrderId()

  const orderText = [
    `Topic: ${topic.trim()}`,
    angle       ? `Angle: ${angle.trim()}`       : null,
    constraints ? `Constraints: ${constraints.trim()}` : null,
  ].filter(Boolean).join('\n')

  const unlockUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.novonavis.com'}/unlock?order=${orderId}`

  const sqsPayload = {
    orderId,
    orderText,
    tier:         'intelligence',
    redacted:     false,
    customerEmail: '',
    unlockPrice:  49900,   // $499.00
    unlockUrl,
  }

  if (!process.env.SQS_QUEUE_URL) {
    console.error('[intelligence-intake] SQS_QUEUE_URL not set')
    return res.status(500).json({ error: 'SQS not configured' })
  }

  try {
    await sqs.send(new SendMessageCommand({
      QueueUrl:    process.env.SQS_QUEUE_URL,
      MessageBody: JSON.stringify(sqsPayload),
      MessageAttributes: {
        tier: { DataType: 'String', StringValue: 'intelligence' }
      }
    }))
    console.log(`[intelligence-intake] Order ${orderId} queued.`)
    return res.status(200).json({ success: true, orderId, unlockUrl })
  } catch (err) {
    console.error('[intelligence-intake] SQS send failed:', err)
    return res.status(500).json({ error: 'Failed to queue order' })
  }
}
