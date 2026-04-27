// pages/api/unlock-checkout.js
// Creates a Stripe checkout session for unlocking a redacted report.
// Price is read from S3 (locked at intake time) — not from the client.

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })

const TIER_NAMES = {
  starter:   'Single Workflow Blueprint — Full Report',
  blueprint: 'AI Blueprint — Full Report',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { orderId } = req.body
  if (!orderId || !/^[a-z0-9_]+$/i.test(orderId)) {
    return res.status(400).json({ error: 'Invalid order ID' })
  }

  let metadata
  try {
    const obj = await s3.send(new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: `orders/${orderId}.json`,
    }))
    metadata = JSON.parse(await obj.Body.transformToString())
  } catch (err) {
    if (err.name === 'NoSuchKey') return res.status(404).json({ error: 'Order not found' })
    console.error('[unlock-checkout] S3 error:', err)
    return res.status(500).json({ error: 'Failed to retrieve order' })
  }

  if (metadata.status === 'unlocked') {
    return res.status(400).json({ error: 'already_unlocked' })
  }

  const origin = req.headers.origin || 'https://www.novonavis.com'

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: TIER_NAMES[metadata.tier] || 'AI Blueprint — Full Report',
            description: 'Unlock the full report with specific tool recommendations and pricing.',
          },
          unit_amount: metadata.unlockPrice,
        },
        quantity: 1,
      }],
      metadata: { orderId },
      success_url: `${origin}/unlock-confirmed?session_id={CHECKOUT_SESSION_ID}&order=${orderId}`,
      cancel_url:  `${origin}/unlock?order=${orderId}`,
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('[unlock-checkout] Stripe error:', err)
    res.status(500).json({ error: 'Failed to create checkout session' })
  }
}
