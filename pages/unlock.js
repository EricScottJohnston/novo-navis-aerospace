import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'
const LIGHT = '#f4f6fb'

const TIER_LABELS = {
  starter:   'Single Workflow Blueprint',
  blueprint: 'AI Blueprint',
}

const TIER_PRICE = {
  starter:   '$99',
  blueprint: '$299',
}

const FULL_FEATURES = [
  'Specific AI tool names — exactly which tools to use',
  'Pricing for each tool — monthly cost, free tiers, what to budget',
  'Vendor links — where to sign up and get started',
  'Full implementation roadmap with named tools at each step',
]

const PREVIEW_FEATURES = [
  'Complete workflow analysis',
  'What to automate and why',
  'Implementation strategy and timeline',
  'ROI framework and risk assessment',
]

function track(event, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }
}

export default function Unlock() {
  const router = useRouter()
  const { order } = router.query

  const [orderData,  setOrderData]  = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)
  const [checking,   setChecking]   = useState(false)

  useEffect(() => {
    if (!router.isReady || !order) return
    fetch(`/api/get-order?order=${order}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) setError(data.error)
        else setOrderData(data)
      })
      .catch(() => setError('Could not load your order. Please try again.'))
      .finally(() => setLoading(false))
  }, [router.isReady, order])

  const handleUnlock = async () => {
    if (!order) return
    setChecking(true)
    track('unlock_clicked', { tier: orderData?.tier })
    try {
      const res  = await fetch('/api/unlock-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order }),
      })
      const data = await res.json()
      if (data.error === 'already_unlocked') {
        setError('This report has already been unlocked. Check your email for the full report.')
        setChecking(false)
        return
      }
      if (data.url) window.location.href = data.url
      else { alert('Something went wrong. Please try again.'); setChecking(false) }
    } catch {
      alert('Something went wrong. Please try again.')
      setChecking(false)
    }
  }

  const tier       = orderData?.tier
  const tierLabel  = TIER_LABELS[tier] || 'AI Blueprint'
  const price      = orderData ? `$${(orderData.unlockPrice / 100).toFixed(0)}` : TIER_PRICE[tier] || ''

  return (
    <>
      <Head>
        <title>Unlock Your Full Report | Novo Navis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`html, body { background: #f8f9fc !important; }`}</style>
      </Head>

      <nav>
        <Link href="/" className="nav-logo">NOVO NAVIS</Link>
        <ul className="nav-links">
          <li><Link href="/faq">FAQ</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div style={{
        background: '#f8f9fc', minHeight: 'calc(100vh - 64px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1rem',
      }}>
        <div style={{
          background: '#ffffff', border: '1px solid #e0e4ef',
          borderRadius: '14px', boxShadow: '0 4px 32px rgba(27,42,74,0.10)',
          maxWidth: '520px', width: '100%', overflow: 'hidden',
        }}>

          {/* Gold top bar */}
          <div style={{ background: GOLD, height: '4px', width: '100%' }} />

          <div style={{ padding: '2rem 2rem 2.5rem' }}>

            {loading && (
              <p style={{ textAlign: 'center', color: '#8a95aa', padding: '2rem 0' }}>
                Loading your order...
              </p>
            )}

            {!loading && error && (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <p style={{ color: '#c0392b', marginBottom: '1rem', fontSize: '0.95rem' }}>
                  {error === 'Order not found'
                    ? "We couldn't find this order. The link may be incorrect."
                    : error}
                </p>
                <p style={{ color: '#8a95aa', fontSize: '0.88rem' }}>
                  Need help? Call{' '}
                  <a href="tel:6234289308" style={{ color: GOLD, fontWeight: 'bold' }}>(623) 428-9308</a>
                  {' '}or email{' '}
                  <a href="mailto:support@novonavis.com" style={{ color: GOLD }}>support@novonavis.com</a>
                </p>
              </div>
            )}

            {!loading && !error && orderData && (
              <>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                  <p style={{ color: GOLD, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>
                    Your blueprint is ready
                  </p>
                  <h1 style={{ color: NAVY, fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 0.4rem', lineHeight: 1.2 }}>
                    Unlock Your Full {tierLabel}
                  </h1>
                  <p style={{ color: '#6b7a99', fontSize: '0.9rem', margin: 0 }}>
                    Your preview is in your inbox. The full report is one step away.
                  </p>
                </div>

                {/* What's in the preview vs full */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>

                  <div style={{
                    background: LIGHT, border: '1px solid #e0e4ef',
                    borderRadius: '10px', padding: '1rem 1.1rem',
                  }}>
                    <p style={{ color: '#8a95aa', fontSize: '0.72rem', fontWeight: 'bold', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>
                      Your preview includes
                    </p>
                    {PREVIEW_FEATURES.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        <span style={{ color: '#8a95aa', fontSize: '0.85rem', flexShrink: 0 }}>✓</span>
                        <p style={{ color: '#6b7a99', fontSize: '0.85rem', margin: 0 }}>{f}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    background: '#fffbf4', border: `2px solid ${GOLD}`,
                    borderRadius: '10px', padding: '1rem 1.1rem',
                  }}>
                    <p style={{ color: GOLD, fontSize: '0.72rem', fontWeight: 'bold', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>
                      The full report adds
                    </p>
                    {FULL_FEATURES.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        <span style={{ color: GOLD, fontSize: '0.85rem', flexShrink: 0 }}>✓</span>
                        <p style={{ color: NAVY, fontSize: '0.85rem', margin: 0, fontWeight: '500' }}>{f}</p>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Unlock button */}
                <button
                  onClick={handleUnlock}
                  disabled={checking}
                  style={{
                    width: '100%', padding: '0.9rem',
                    background: checking ? '#dde2ef' : `linear-gradient(to bottom, #FFD814, #FFA41C)`,
                    border: 'none', borderRadius: '8px',
                    color: checking ? '#8a95aa' : '#111',
                    fontWeight: 'bold', fontSize: '1.05rem',
                    cursor: checking ? 'not-allowed' : 'pointer',
                    marginBottom: '0.75rem',
                  }}
                >
                  {checking ? 'Redirecting to checkout...' : `Unlock My Full Report — ${price}`}
                </button>

                {/* Trust */}
                <div style={{
                  background: '#f4f6fb', border: '1px solid #e0e4ef',
                  borderRadius: '8px', padding: '0.7rem 1rem',
                  textAlign: 'center', marginBottom: '1rem',
                }}>
                  <p style={{ color: '#4a5568', fontSize: '0.85rem', margin: 0 }}>
                    All sales are final. Review your preview carefully before unlocking.
                  </p>
                </div>

                <p style={{ textAlign: 'center', color: '#8a95aa', fontSize: '0.8rem', margin: 0 }}>
                  Secure payment via Stripe. Questions?{' '}
                  <a href="tel:6234289308" style={{ color: GOLD, fontWeight: 'bold' }}>(623) 428-9308</a>
                </p>
              </>
            )}

          </div>
        </div>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis, LLC · Fidelis Diligentia</p>
      </footer>
    </>
  )
}
