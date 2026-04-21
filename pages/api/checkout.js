// pages/api/checkout.js
// Handles Stripe payment session creation

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const TIERS = {
  starter: {
    name: 'Starter — Novo Navis',
    description: '5-page AI workflow analysis. Identifies the right tools and workflows for your business.',
    unit_amount: 4900
  },
  blueprint: {
    name: 'Blueprint — Novo Navis',
    description: 'Custom up-to-25-page AI integration report with implementation guidance and ROI estimates. Built and delivered in real time.',
    unit_amount: 19900
  },
  consult: {
    name: 'Blueprint + Consult — Novo Navis',
    description: 'Full AI Blueprint plus a 2-hour Zoom session with an AI consultant to walk through implementation together.',
    unit_amount: 49900
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { tier = 'blueprint' } = req.body
  const product = TIERS[tier] || TIERS.blueprint

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description
            },
            unit_amount: product.unit_amount
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `${req.headers.origin}/intake?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/#order-form`
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    res.status(500).json({ error: err.message })
  }
}
