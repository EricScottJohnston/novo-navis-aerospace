// pages/api/tool-checkout.js
// Handles Stripe checkout for AI tool developer registration — $250 / 3 months

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { developerName, email, toolName } = req.body

  if (!developerName || !email || !toolName) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'AI Tool Registration — Novo Navis',
              description: `3-month registration for ${toolName} in the Novo Navis AI tool database.`
            },
            unit_amount: 25000
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      customer_email: email,
      metadata: {
        developer_name: developerName,
        tool_name: toolName
      },
      success_url: `${req.headers.origin}/tool-registration-success`,
      cancel_url: `${req.headers.origin}/tool-registration`
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    res.status(500).json({ error: err.message })
  }
}
