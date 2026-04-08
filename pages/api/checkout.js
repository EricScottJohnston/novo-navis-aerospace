// pages/api/checkout.js
// Handles Stripe payment session creation

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, business } = req.body

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Custom AI Integration Report',
              description: `Business: ${business} | Delivered within 24 hours.`
            },
            unit_amount: 7700
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      allow_promotion_codes: false,
      customer_email: email,
      metadata: {
        customer_name: name,
        business_name: business
      },
      success_url: `${req.headers.origin}/intake?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/report`
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    res.status(500).json({ error: err.message })
  }
}
