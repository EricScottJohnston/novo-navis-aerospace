// pages/api/prospector-intake.js
// Receives prospector search parameters from the admin interface.
// Validates ADMIN_SECRET, generates a run ID, queues to SQS.

import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'

const sqs = new SQSClient({ region: process.env.AWS_REGION || 'us-east-1' })

const ADMIN_SECRET = process.env.ADMIN_SECRET || ''

function generateRunId() {
  const now  = new Date()
  const dd   = String(now.getDate()).padStart(2, '0')
  const mm   = String(now.getMonth() + 1).padStart(2, '0')
  const yy   = String(now.getFullYear()).slice(-2)
  const rand = String(Math.floor(1000 + Math.random() * 9000))
  return `prospect_${dd}${mm}${yy}_${rand}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const {
    secret,
    industries,
    signals,
    startDate,
    endDate,
    minEmployees,
    maxEmployees,
    ticker,
    maxProspects,
  } = req.body

  if (!secret || secret !== ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const runId = generateRunId()

  const params = {
    industries:   industries   || [],
    signals:      signals      || ['going_concern'],
    startDate:    startDate    || new Date(Date.now() - 365*24*60*60*1000).toISOString().split('T')[0],
    endDate:      endDate      || new Date().toISOString().split('T')[0],
    minEmployees: minEmployees || 0,
    maxEmployees: maxEmployees || 999999,
    ticker:       ticker       || '',
    maxProspects: maxProspects || 10,
  }

  const sqsPayload = {
    orderId:   runId,
    orderText: JSON.stringify(params),
    tier:      'prospector',
    params,
  }

  if (!process.env.SQS_QUEUE_URL) {
    return res.status(500).json({ error: 'Queue not configured.' })
  }

  try {
    await sqs.send(new SendMessageCommand({
      QueueUrl:    process.env.SQS_QUEUE_URL,
      MessageBody: JSON.stringify(sqsPayload),
      MessageAttributes: {
        tier: { DataType: 'String', StringValue: 'prospector' }
      }
    }))
    console.log(`[prospector-intake] Run ${runId} queued.`)
    return res.status(200).json({ success: true, runId })
  } catch (err) {
    console.error('[prospector-intake] SQS failed:', err)
    return res.status(500).json({ error: 'Failed to queue prospector run.' })
  }
}
