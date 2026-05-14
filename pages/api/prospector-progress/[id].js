// pages/api/prospector-progress/[id].js
// Dynamic route matching the existing /api/track/[orderId] pattern.
// Fetches prospector run progress from S3.

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { id } = req.query
  if (!id) return res.status(400).json({ error: 'Missing run ID' })

  try {
    const obj = await s3.send(new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: `progress/${id}.json`,
    }))
    const data = JSON.parse(await obj.Body.transformToString())
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json(data)
  } catch (err) {
    if (err.name === 'NoSuchKey') return res.status(404).json({ error: 'Run not found' })
    console.error('[prospector-progress]', err)
    return res.status(500).json({ error: 'Failed to fetch progress' })
  }
}
