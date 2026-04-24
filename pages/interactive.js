// pages/interactive.js
// Interactive AI Blueprint sales funnel — 3 rounds of questions, powered by Haiku, leads to purchase.

import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

const NAVY  = '#1B2A4A'
const GOLD  = '#c8a96e'
const LIGHT = '#f4f6fb'

const TIER_LABELS = {
  starter:  { name: 'Starter Report',         price: '$49',  tier: 'starter' },
  blueprint:{ name: 'AI Blueprint',            price: '$199', tier: 'blueprint' },
  consult:  { name: 'Blueprint + Consult',     price: '$499', tier: 'consult' },
}

const ROUND_1 = {
  tip: 'Did you know? Most small businesses could automate 30–40% of their daily admin tasks with tools that cost less than $50/month — but fewer than 10% know which ones to use.',
  question: 'What best describes you?',
  options: ['Solo / Freelancer', 'Small Business', 'Growing Business'],
}

export default function Interactive() {
  const [round,     setRound]     = useState(1)
  const [answers,   setAnswers]   = useState([])
  const [current,   setCurrent]   = useState(ROUND_1)
  const [loading,   setLoading]   = useState(false)
  const [final,     setFinal]     = useState(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const handleChoice = async (option) => {
    const newAnswers = [...answers, { question: current.question, answer: option }]
    setAnswers(newAnswers)

    if (round === 3) {
      setLoading(true)
      try {
        const res  = await fetch('/api/interactive', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: newAnswers, round: 'final' }),
        })
        const data = await res.json()
        setFinal(data)
        setRound('final')
      } catch {
        setFinal({
          tip: 'AI can reduce manual data entry by up to 80% for most small businesses.',
          recommendation: 'blueprint',
          pitch: 'Based on your answers, the AI Blueprint is the right fit. It gives you a complete, prioritized roadmap — exactly what you need to start seeing results fast.',
        })
        setRound('final')
      }
      setLoading(false)
      return
    }

    const nextRound = round + 1
    setLoading(true)
    try {
      const res  = await fetch('/api/interactive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: newAnswers, round: nextRound }),
      })
      const data = await res.json()
      setCurrent(data)
      setRound(nextRound)
    } catch {
      setCurrent({
        tip: 'AI scheduling tools can save the average small business owner 5–8 hours per week.',
        question: 'What slows you down most?',
        options: ['Admin and paperwork', 'Finding and keeping customers'],
      })
      setRound(nextRound)
    }
    setLoading(false)
  }

  const handleCheckout = async (tier) => {
    setCheckoutLoading(true)
    try {
      const res  = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else { alert('Something went wrong. Please try again.'); setCheckoutLoading(false) }
    } catch {
      alert('Something went wrong. Please try again.')
      setCheckoutLoading(false)
    }
  }

  const tierInfo = final ? (TIER_LABELS[final.recommendation] || TIER_LABELS.blueprint) : null

  return (
    <>
      <Head>
        <title>Find Your AI Blueprint | Novo Navis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav>
        <Link href="/" className="nav-logo">NOVO NAVIS</Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/faq">FAQ</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div style={{
        minHeight: '80vh',
        background: '#f8f9fc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e0e4ef',
          borderRadius: '14px',
          boxShadow: '0 4px 32px rgba(27,42,74,0.10)',
          maxWidth: '520px',
          width: '100%',
          padding: '2.5rem 2rem',
        }}>

          {/* I AM headline */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <p style={{
              color: GOLD,
              fontSize: '0.75rem',
              fontWeight: 'bold',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '0.3rem',
            }}>
              Find your fit
            </p>
            <h1 style={{
              color: NAVY,
              fontSize: '1.9rem',
              fontWeight: 'bold',
              margin: 0,
              lineHeight: 1.2,
            }}>
              I AM...
            </h1>
          </div>

          {/* Progress dots */}
          {round !== 'final' && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '1.75rem' }}>
              {[1, 2, 3].map(n => (
                <div key={n} style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: n <= round ? GOLD : '#dde2ef',
                  transition: 'background 0.3s ease',
                }} />
              ))}
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                border: `3px solid ${GOLD}`, borderTopColor: 'transparent',
                animation: 'spin 0.8s linear infinite',
                margin: '0 auto 1rem',
              }} />
              <p style={{ color: '#8a95aa', fontSize: '0.9rem' }}>Thinking...</p>
            </div>
          ) : round === 'final' && final ? (
            <>
              {/* Tip */}
              <div style={{
                background: LIGHT,
                border: `1px solid ${GOLD}40`,
                borderLeft: `3px solid ${GOLD}`,
                borderRadius: '8px',
                padding: '0.9rem 1.1rem',
                marginBottom: '1.75rem',
              }}>
                <p style={{ color: GOLD, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Did you know?
                </p>
                <p style={{ color: NAVY, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                  {final.tip}
                </p>
              </div>

              {/* Recommendation */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <p style={{ color: '#6b7a99', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
                  Based on your answers, we recommend:
                </p>
                <p style={{ color: NAVY, fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 0.25rem' }}>
                  {tierInfo.name}
                </p>
                <p style={{ color: GOLD, fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
                  {tierInfo.price}
                </p>
              </div>

              {/* Pitch */}
              <div style={{
                background: LIGHT,
                border: '1px solid #e0e4ef',
                borderRadius: '8px',
                padding: '1rem 1.1rem',
                marginBottom: '1.75rem',
              }}>
                <p style={{ color: NAVY, fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
                  {final.pitch}
                </p>
              </div>

              {/* Buy button */}
              <button
                onClick={() => handleCheckout(tierInfo.tier)}
                disabled={checkoutLoading}
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  background: checkoutLoading ? '#dde2ef' : 'linear-gradient(to bottom, #FFD814, #FFA41C)',
                  border: 'none',
                  borderRadius: '8px',
                  color: checkoutLoading ? '#8a95aa' : '#111',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  cursor: checkoutLoading ? 'not-allowed' : 'pointer',
                  marginBottom: '1rem',
                }}
              >
                {checkoutLoading ? 'Redirecting...' : `Get ${tierInfo.name} — ${tierInfo.price}`}
              </button>

              {/* Post-checkout reassurance */}
              <div style={{
                background: '#f0f7f0',
                border: '1px solid #b2dab2',
                borderRadius: '8px',
                padding: '1rem 1.1rem',
                textAlign: 'center',
              }}>
                <p style={{ color: '#2e6b2e', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                  After checkout, we'll bring you back for a short, easy intake form.<br />
                  Then we build your blueprint — <strong>ready in about 12 minutes.</strong>
                </p>
              </div>

              <p style={{ textAlign: 'center', marginTop: '1.25rem', marginBottom: 0 }}>
                <button
                  onClick={() => { setRound(1); setAnswers([]); setCurrent(ROUND_1); setFinal(null) }}
                  style={{ background: 'none', border: 'none', color: '#8a95aa', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Start over
                </button>
              </p>
            </>
          ) : (
            <>
              {/* Tip box */}
              <div style={{
                background: LIGHT,
                border: `1px solid ${GOLD}40`,
                borderLeft: `3px solid ${GOLD}`,
                borderRadius: '8px',
                padding: '0.9rem 1.1rem',
                marginBottom: '1.75rem',
              }}>
                <p style={{ color: GOLD, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Did you know?
                </p>
                <p style={{ color: NAVY, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                  {current.tip}
                </p>
              </div>

              {/* Question */}
              <p style={{
                color: NAVY,
                fontSize: '1.15rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '1.25rem',
              }}>
                {current.question}
              </p>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {current.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleChoice(opt)}
                    style={{
                      width: '100%',
                      padding: '0.9rem 1.25rem',
                      background: '#ffffff',
                      border: `1.5px solid #dde2ef`,
                      borderRadius: '10px',
                      color: NAVY,
                      fontWeight: '600',
                      fontSize: '0.97rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'border-color 0.15s, background 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = '#fffbf4' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#dde2ef'; e.currentTarget.style.background = '#ffffff' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
      </footer>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
