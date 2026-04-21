// pages/api/track/[orderId].js
// Proxies progress JSON from S3 so the tracking page avoids CORS.

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { orderId } = req.query
  if (!orderId || !/^[a-z0-9_]+$/i.test(orderId)) {
    return res.status(400).json({ error: 'Invalid order ID' })
  }

  const bucket = process.env.S3_BUCKET
  if (!bucket) {
    return res.status(503).json({ error: 'S3 not configured' })
  }

  try {
    const cmd = new GetObjectCommand({
      Bucket: bucket,
      Key:    `progress/${orderId}.json`,
    })
    const response = await s3.send(cmd)

    // Stream body to string
    const chunks = []
    for await (const chunk of response.Body) {
      chunks.push(chunk)
    }
    const body = Buffer.concat(chunks).toString('utf-8')
    const data = JSON.parse(body)

    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json(data)
  } catch (err) {
    if (err.name === 'NoSuchKey') {
      // David hasn't started yet — order is queued
      return res.status(200).json({ status: 'queued', percent_complete: 0, current_step: 'Queued — starting soon' })
    }
    console.error('[track] S3 fetch error:', err)
    return res.status(500).json({ error: 'Could not fetch progress' })
  }
}
