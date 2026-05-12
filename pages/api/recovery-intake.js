// pages/api/recovery-intake.js
// Receives the recovery diagnostic intake form submission.
// Queues the order to SQS for david_recovery_v1.py to process.
// Free preview delivered by David via email. $5,000 to unlock full report.

import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'

const sqs = new SQSClient({ region: process.env.AWS_REGION || 'us-east-1' })

function generateOrderId() {
  const now  = new Date()
  const dd   = String(now.getDate()).padStart(2, '0')
  const mm   = String(now.getMonth() + 1).padStart(2, '0')
  const yy   = String(now.getFullYear()).slice(-2)
  const rand = String(Math.floor(1000 + Math.random() * 9000))
  return `recovery_${dd}${mm}${yy}_${rand}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const {
    email,
    contactName,
    companyName,
    ticker,
    isPublic,
    industry,
    employees,
    situation,
    currentMetrics,
    targetMetrics,
    timeline,
    assets,
    alreadyTried,
  } = req.body

  if (!email || !companyName || !industry || !situation || !targetMetrics || !timeline) {
    return res.status(400).json({ error: 'Required fields missing.' })
  }

  const orderId = generateOrderId()

  const orderText = [
    `Company: ${companyName}`,
    `Ticker: ${ticker || ''}`,
    `IsPublic: ${isPublic || 'private'}`,
    `Industry: ${industry}`,
    `Employees: ${employees || ''}`,
    `Situation: ${situation}`,
    `CurrentMetrics: ${currentMetrics || ''}`,
    `TargetMetrics: ${targetMetrics}`,
    `Timeline: ${timeline}`,
    `Assets: ${assets || ''}`,
    `AlreadyTried: ${alreadyTried || ''}`,
    `ContactName: ${contactName || ''}`,
  ].join('\n')

  const unlockUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.novonavis.com'}/unlock?order=${orderId}`

  const sqsPayload = {
    orderId,
    orderText,
    tier:          'recovery',
    redacted:      false,
    customerEmail: email,
    unlockPrice:   500000,  // $5,000 in cents
    unlockUrl,
  }

  if (!process.env.SQS_QUEUE_URL) {
    console.error('[recovery-intake] SQS_QUEUE_URL not set')
    return res.status(500).json({ error: 'Queue not configured.' })
  }

  try {
    await sqs.send(new SendMessageCommand({
      QueueUrl:    process.env.SQS_QUEUE_URL,
      MessageBody: JSON.stringify(sqsPayload),
      MessageAttributes: {
        tier: { DataType: 'String', StringValue: 'recovery' }
      }
    }))
    console.log(`[recovery-intake] Order ${orderId} queued for ${companyName}`)
    return res.status(200).json({ success: true, orderId })
  } catch (err) {
    console.error('[recovery-intake] SQS send failed:', err)
    return res.status(500).json({ error: 'Failed to queue order.' })
  }
}
