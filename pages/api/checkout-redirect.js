// pages/api/checkout-redirect.js
// GET route — creates a Stripe session and redirects directly to checkout
// Used by the "Send to Desktop" email button

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'AI Blueprint — Novo Navis',
              description: 'Custom up-to-25-page AI integration report for your business. Built and delivered in real time.'
            },
            unit_amount: 19900
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      allow_promotion_codes: false,
      success_url: `${req.headers.origin}/intake?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/#order-form`
    })

    res.redirect(303, session.url)
  } catch (err) {
    console.error('Checkout redirect error:', err)
    res.redirect(303, '/#order-form')
  }
}
