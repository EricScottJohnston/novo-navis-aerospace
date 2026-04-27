// pages/api/get-order.js
// Reads order metadata from S3 so the /unlock page knows what to display.
// Returns only display-safe fields — never the customer email.

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { order } = req.query
  if (!order || !/^[a-z0-9_]+$/i.test(order)) {
    return res.status(400).json({ error: 'Invalid order ID' })
  }

  try {
    const obj = await s3.send(new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: `orders/${order}.json`,
    }))
    const metadata = JSON.parse(await obj.Body.transformToString())

    res.status(200).json({
      orderId:      metadata.orderId,
      tier:         metadata.tier,
      unlockPrice:  metadata.unlockPrice,
      status:       metadata.status,
    })
  } catch (err) {
    if (err.name === 'NoSuchKey') {
      return res.status(404).json({ error: 'Order not found' })
    }
    console.error('[get-order] S3 error:', err)
    res.status(500).json({ error: 'Failed to retrieve order' })
  }
}
