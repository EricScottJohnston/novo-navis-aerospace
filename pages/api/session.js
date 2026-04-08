// pages/api/session.js
// Returns customer info from a paid Stripe session — used by /intake to pre-fill identity

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { id } = req.query
  if (!id) return res.status(400).json({ error: 'Missing session ID' })

  try {
    const session = await stripe.checkout.sessions.retrieve(id)

    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'Payment not completed' })
    }

    res.status(200).json({
      name: session.metadata?.customer_name || '',
      email: session.customer_email || '',
      business: session.metadata?.business_name || ''
    })
  } catch (err) {
    console.error('Session lookup error:', err)
    res.status(404).json({ error: 'Session not found' })
  }
}
