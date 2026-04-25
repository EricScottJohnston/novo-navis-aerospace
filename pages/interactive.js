// pages/interactive.js
// Interactive AI Blueprint sales funnel — 3 rounds of questions, powered by Haiku, leads to purchase.

import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const NAVY  = '#1B2A4A'
const GOLD  = '#c8a96e'
const LIGHT = '#f4f6fb'

const TIER_LABELS = {
  starter:  { name: 'Starter Blueprint',       price: '$49',  tier: 'starter' },
  blueprint:{ name: 'AI Blueprint',            price: '$199', tier: 'blueprint' },
  consult:  { name: 'Blueprint + Consult',     price: '$499', tier: 'consult' },
}

const ROUND_1 = {
  tip: 'The average small business owner spends 40+ hours researching AI tools before giving up — and still doesn\'t know what to use. Our blueprint does that research for you, customized to your business, in about 12 minutes.',
  question: 'I am...',
  options: [
    'Having a hard time selecting the right AI tools',
    'Struggling to match AI tools to my specific workflows',
    'Not sure where to start with AI at all',
  ],
}

const ROUND_2 = {
  tip: 'Most AI tools are built for enterprise companies — not small businesses. Your AI Blueprint is built around what actually works at your scale and budget.',
  question: 'I am a...',
  options: ['Solo operator or freelancer', 'Small business with a team', 'Growing business ready to scale'],
}

function track(event, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }
}

export default function Interactive() {
  const [round,     setRound]     = useState(1)
  const [answers,   setAnswers]   = useState([])
  const [current,   setCurrent]   = useState(ROUND_1)
  const [loading,   setLoading]   = useState(false)
  const [final,     setFinal]     = useState(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [navModal,        setNavModal]        = useState(null)
  useEffect(() => { track('funnel_entered') }, [])

  const [objOpen,        setObjOpen]        = useState(false)
  const [reviewsOpen,    setReviewsOpen]    = useState(false)
  const [agreedTerms,    setAgreedTerms]    = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [pendingTier,    setPendingTier]    = useState(null)

  const handleChoice = async (option) => {
    const newAnswers = [...answers, { question: current.question, answer: option }]
    setAnswers(newAnswers)
    track(`quiz_round_${round}_complete`, { answer: option })

    if (round === 4) {
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
        track('quiz_recommendation_shown', { tier: data.recommendation })
      } catch {
        setFinal({
          tip: 'AI can reduce manual data entry by up to 80% for most small businesses.',
          recommendation: 'blueprint',
          pitch: 'Based on your answers, the AI Blueprint is the right fit. It gives you a complete, prioritized roadmap — exactly what you need to start seeing results fast.',
        })
        setRound('final')
        track('quiz_recommendation_shown', { tier: 'blueprint' })
      }
      setLoading(false)
      return
    }

    const nextRound = round + 1

    // Round 2 is hardcoded — no API call needed
    if (nextRound === 2) {
      setCurrent(ROUND_2)
      setRound(2)
      return
    }

    // Rounds 3 and 4 are Haiku-generated
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
    if (!agreedTerms) {
      setPendingTier(tier)
      setShowTermsModal(true)
      track('quiz_buy_clicked', { tier })
      return
    }
    track('quiz_checkout_started', { tier })
    setCheckoutLoading(true)
    try {
      const res  = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else { track('checkout_failed', { tier }); alert('Something went wrong. Please try again.'); setCheckoutLoading(false) }
    } catch {
      track('checkout_failed', { tier })
      alert('Something went wrong. Please try again.')
      setCheckoutLoading(false)
    }
  }

  const tierInfo = final ? (TIER_LABELS[final.recommendation] || TIER_LABELS.blueprint) : null

  return (
    <>
      <Head>
        <title>Find Your AI Blueprint | Novo Navis</title>
        <meta name="description" content="Answer 4 quick questions and get a custom AI Blueprint built for your specific business — delivered in about 12 minutes. Find your fit now." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav>
        <span className="nav-logo" style={{cursor:'default'}}>NOVO NAVIS</span>
        <ul className="nav-links">
          {[['FAQ','faq'],['About','about']].map(([label, key]) => (
            <li key={key}>
              <button
                onClick={() => { setNavModal(key); track('nav_modal_opened', { page: key }) }}
                style={{background:'none', border:'none', cursor:'pointer', color:'inherit', font:'inherit', padding:0}}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Nav modal */}
      {navModal && (
        <div
          onClick={() => setNavModal(null)}
          style={{
            position:'fixed', inset:0, zIndex:99999,
            background:'rgba(0,0,0,0.65)',
            display:'flex', alignItems:'center', justifyContent:'center',
            padding:'1rem'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background:'#fff', borderRadius:'12px',
              width:'100%', maxWidth:'780px',
              height:'80vh', display:'flex', flexDirection:'column',
              overflow:'hidden', boxShadow:'0 8px 48px rgba(0,0,0,0.35)'
            }}
          >
            <div style={{
              display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'0.85rem 1.25rem',
              borderBottom:'1px solid #e0e4ef',
              background:'#f8f9fc', flexShrink:0
            }}>
              <span style={{color:NAVY, fontWeight:'bold', fontSize:'0.95rem', textTransform:'capitalize'}}>
                {navModal === 'home' ? 'Novo Navis' : navModal.toUpperCase()}
              </span>
              <button
                onClick={() => setNavModal(null)}
                style={{
                  background:'none', border:'none', cursor:'pointer',
                  color:'#8a95aa', fontSize:'1.3rem', lineHeight:1, padding:'0.2rem 0.4rem'
                }}
              >✕</button>
            </div>
            <iframe
              src={`/${navModal}?embed=1`}
              style={{flex:1, border:'none', width:'100%'}}
              title={navModal}
            />
          </div>
        </div>
      )}

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
              {[1, 2, 3, 4].map(n => (
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

              {/* Secondary links */}
              <div style={{ textAlign: 'center', marginBottom: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  onClick={() => { setObjOpen(true); track('quiz_objection_opened') }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#8a95aa', fontSize: '0.85rem',
                    textDecoration: 'underline', textUnderlineOffset: '3px',
                  }}
                >
                  Wait, what is an AI Blueprint?
                </button>
                <button
                  onClick={() => { setReviewsOpen(true); track('quiz_reviews_opened') }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#8a95aa', fontSize: '0.85rem',
                    textDecoration: 'underline', textUnderlineOffset: '3px',
                  }}
                >
                  Wait, I want to know what other people have to say.
                </button>
              </div>

              {/* Post-checkout reassurance */}
              <div style={{
                background: '#f0f7f0',
                border: '1px solid #b2dab2',
                borderRadius: '8px',
                padding: '1rem 1.1rem',
                textAlign: 'center',
              }}>
                <p style={{ color: '#2e6b2e', fontSize: '0.9rem', fontWeight: 'bold', margin: '0 0 0.4rem' }}>
                  <span style={{ color: '#4caf50' }}>✓</span> 100% money-back guarantee
                </p>
                <p style={{ color: '#2e6b2e', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                  After checkout, we'll bring you back for a short, easy intake form.<br />
                  Then we build your blueprint — <strong>ready in about 12 minutes.</strong>
                </p>
              </div>

              <p style={{ textAlign: 'center', marginTop: '1.25rem', marginBottom: 0 }}>
                <button
                  onClick={() => { setRound(1); setAnswers([]); setCurrent(ROUND_1); setFinal(null); track('quiz_restarted') }}
                  style={{ background: 'none', border: 'none', color: '#8a95aa', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Start over
                </button>
              </p>
            </>
          ) : (
            <>
              {/* Question */}
              <p style={{
                color: NAVY,
                fontSize: '1.15rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '0.4rem',
              }}>
                {current.question}
              </p>

              {/* Nudge */}
              <p style={{
                color: '#8a95aa',
                fontSize: '0.78rem',
                textAlign: 'center',
                marginBottom: '1.25rem',
              }}>
                Select whichever matches best.
              </p>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
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

              {/* Tip box */}
              <div style={{
                background: LIGHT,
                border: `1px solid ${GOLD}40`,
                borderLeft: `3px solid ${GOLD}`,
                borderRadius: '8px',
                padding: '0.9rem 1.1rem',
              }}>
                <p style={{ color: GOLD, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Did you know?
                </p>
                <p style={{ color: NAVY, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                  {current.tip}
                </p>
              </div>

            </>
          )}

        </div>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
      </footer>

      {/* What is an AI Blueprint — static info modal */}
      {objOpen && (
        <div
          onClick={() => setObjOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99998,
            background: 'rgba(0,0,0,0.65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#ffffff', borderRadius: '14px',
              border: '1px solid #e0e4ef',
              boxShadow: '0 8px 48px rgba(27,42,74,0.18)',
              maxWidth: '480px', width: '100%',
              padding: '2rem 1.75rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <p style={{ color: GOLD, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.2rem' }}>Good question</p>
                <h2 style={{ color: NAVY, fontSize: '1.15rem', fontWeight: 'bold', margin: 0 }}>What is an AI Blueprint?</h2>
              </div>
              <button onClick={() => setObjOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a95aa', fontSize: '1.3rem', lineHeight: 1, padding: '0.1rem 0.3rem' }}>✕</button>
            </div>

            <div style={{ background: '#fff8ee', border: `1px solid ${GOLD}60`, borderLeft: `3px solid ${GOLD}`, borderRadius: '8px', padding: '1rem 1.1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: NAVY, fontSize: '0.88rem', fontWeight: 'bold', margin: '0 0 0.3rem' }}>
                95% of businesses fail to implement AI successfully.
              </p>
              <p style={{ color: '#4a5568', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>
                According to MIT research, the reason isn't the technology — it's that businesses get upsold by vendors who don't understand their specific workflows. They end up with tools that don't fit, budgets that don't work, and no clear plan.
              </p>
            </div>

            <p style={{ color: NAVY, fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.1rem' }}>
              An AI Blueprint is a <strong>custom document built specifically for your business</strong> — not generic advice. It identifies the exact AI tools that fit your workflows and budget, gives you a fast implementation plan, and includes honest ROI estimates.
            </p>

            <p style={{ color: NAVY, fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              It's built by David — a proprietary AI system developed under defense-grade standards — and delivered in about <strong>12 minutes</strong>. Up to 25 pages, built around your specific business.
            </p>

            <button
              onClick={() => setObjOpen(false)}
              style={{
                width: '100%', padding: '0.85rem',
                background: NAVY, border: 'none', borderRadius: '8px',
                color: '#ffffff', fontWeight: 'bold', fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              Got it — back to my recommendation
            </button>
          </div>
        </div>
      )}

      {/* Reviews modal */}
      {reviewsOpen && (
        <div
          onClick={() => setReviewsOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99998,
            background: 'rgba(0,0,0,0.65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#ffffff', borderRadius: '14px',
              border: '1px solid #e0e4ef',
              boxShadow: '0 8px 48px rgba(27,42,74,0.18)',
              maxWidth: '480px', width: '100%',
              padding: '2rem 1.75rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <p style={{ color: GOLD, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.2rem' }}>What customers say</p>
                <h2 style={{ color: NAVY, fontSize: '1.15rem', fontWeight: 'bold', margin: 0 }}>Real results from real businesses.</h2>
              </div>
              <button onClick={() => setReviewsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a95aa', fontSize: '1.3rem', lineHeight: 1, padding: '0.1rem 0.3rem' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: LIGHT, border: '1px solid #e0e4ef', borderRadius: '10px', padding: '1.1rem 1.25rem' }}>
                <p style={{ color: GOLD, fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>★★★★★ — Brian T.</p>
                <p style={{ color: NAVY, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
                  When it comes to AI, there is no best technology, there is just best for you. I literally scoured the internet for weeks and never came close to getting the answer my company needed to integrate AI. Novo Navis gave us the entire answer.
                </p>
              </div>
              <div style={{ background: LIGHT, border: '1px solid #e0e4ef', borderRadius: '10px', padding: '1.1rem 1.25rem' }}>
                <p style={{ color: GOLD, fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>★★★★ — Kay W.</p>
                <p style={{ color: NAVY, fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
                  I run a small property management company that handles online rentals. I couldn't find a cost effective solution or product for my budget. Novo Navis uncovered AI tools for me that I never would have found on my own.
                </p>
              </div>
            </div>

            <button
              onClick={() => setReviewsOpen(false)}
              style={{
                width: '100%', padding: '0.85rem',
                background: NAVY, border: 'none', borderRadius: '8px',
                color: '#ffffff', fontWeight: 'bold', fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              Back to my recommendation
            </button>
          </div>
        </div>
      )}

      {/* Terms modal — scrollable, checkbox at bottom */}
      {showTermsModal && (
        <div
          onClick={() => setShowTermsModal(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0d1221', border: '1px solid #1e2a45',
              borderRadius: '8px', maxWidth: '520px', width: '100%',
              maxHeight: '85vh', display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Fixed header */}
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1e2a45', flexShrink: 0 }}>
              <h3 style={{ color: '#d0d8e8', margin: 0, fontSize: '1.05rem' }}>Terms and Conditions</h3>
              <p style={{ color: '#8a95aa', fontSize: '0.82rem', margin: '0.25rem 0 0' }}>
                Scroll through and check the box at the bottom to continue.
              </p>
            </div>

            {/* Scrollable body */}
            <div style={{ overflowY: 'auto', padding: '1.25rem 1.5rem', flex: 1 }}>

              <div style={{ background: '#0a1a0a', border: '2px solid #4caf50', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
                <p style={{ color: '#4caf50', fontWeight: 'bold', margin: '0 0 0.35rem', fontSize: '0.92rem' }}>✓ 100% Money-Back Guarantee</p>
                <p style={{ color: '#d0d8e8', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                  If you're not satisfied for any reason, we'll refund you in full — no questions asked. Just email support@novonavis.com.
                </p>
              </div>

              {[
                ['Agreement to Terms', 'By requesting, purchasing, or using any report or service provided by Novo Navis Aerospace Operations LLC ("Novo Navis," "we," "us," or "our"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not submit a report request or complete a purchase.'],
                ['Refund Policy', 'Novo Navis offers a full refund, no questions asked, if you are not satisfied with your report for any reason. Refund requests must be submitted within 72 hours of report delivery. To request a refund, email support@novonavis.com. Refunds are processed through Stripe and typically appear within 5 to 10 business days.'],
                ["What You're Buying", "Novo Navis provides custom AI integration analysis reports for small businesses, generated by our proprietary Small Psychological Model. Reports are for informational purposes and do not constitute legal, financial, accounting, tax, or medical advice."],
                ['Accuracy of Information', 'The quality of your report depends on the accuracy of the information you provide in your intake form. Tool pricing, features, and availability referenced in reports are current as of report generation and are subject to change by third-party vendors.'],
                ['Client Responsibility', 'You retain full responsibility for any business decisions made based on a Novo Navis report. Please independently verify all recommendations before implementing them. Our reports are analytical tools to inform your decision making, not directives to be followed without independent evaluation.'],
                ['No Guarantee of Specific Results', 'Novo Navis makes no warranty that implementing recommendations will result in specific outcomes, cost savings, or revenue increases. All ROI estimates and projections are estimates based on industry data, not guarantees of actual results.'],
                ['Limitation of Liability', 'Novo Navis Aerospace Operations LLC shall not be held liable for any direct, indirect, incidental, or consequential damages arising from your use of or reliance on any information in a Novo Navis report. You agree to hold Novo Navis harmless from claims arising from your use or implementation of report information.'],
                ['Intellectual Property', 'Reports are delivered for your personal business use. You may not resell, redistribute, or commercially exploit any Novo Navis report without written permission. The underlying methodology and systems are proprietary intellectual property of Novo Navis Aerospace Operations LLC.'],
                ['Businesses We Cannot Serve', 'As a registered U.S. federal contractor, Novo Navis cannot serve cannabis or marijuana operations, businesses in conflict with U.S. national security interests, or businesses engaged in activities conflicting with applicable law. If we cannot fulfill an order for these reasons, you will receive a full refund.'],
                ['Governing Law', 'These Terms are governed by the laws of the State of Arizona. Any disputes shall be subject to the exclusive jurisdiction of the courts of Maricopa County, Arizona.'],
              ].map(([heading, body]) => (
                <div key={heading} style={{ marginBottom: '1.1rem' }}>
                  <p style={{ color: '#c8a96e', fontWeight: 'bold', fontSize: '0.88rem', margin: '0 0 0.3rem' }}>{heading}</p>
                  <p style={{ color: '#b0b8cc', fontSize: '0.84rem', lineHeight: '1.65', margin: 0 }}>{body}</p>
                </div>
              ))}

              <p style={{ color: '#8a95aa', fontSize: '0.8rem', marginTop: '1rem' }}>
                Effective Date: April 24, 2026 · Novo Navis Aerospace Operations LLC · Sun City, Arizona 85351
              </p>
            </div>

            {/* Fixed footer — checkbox + buttons */}
            <div style={{ padding: '1.1rem 1.5rem', borderTop: '1px solid #1e2a45', flexShrink: 0 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', marginBottom: '1rem' }}>
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={e => setAgreedTerms(e.target.checked)}
                  style={{ marginTop: '3px', width: '18px', height: '18px', flexShrink: 0, cursor: 'pointer' }}
                />
                <span style={{ color: '#d0d8e8', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  I have read and agree to the Terms and Conditions.
                </span>
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => { setShowTermsModal(false); track('terms_dismissed') }}
                  style={{
                    flex: 1, padding: '0.65rem',
                    background: 'transparent', border: '1px solid #1e2a45',
                    borderRadius: '6px', color: '#8a95aa',
                    cursor: 'pointer', fontSize: '0.9rem',
                  }}
                >Cancel</button>
                <button
                  disabled={!agreedTerms}
                  onClick={() => {
                    if (!agreedTerms) return
                    setShowTermsModal(false)
                    handleCheckout(pendingTier)
                  }}
                  style={{
                    flex: 1, padding: '0.65rem',
                    background: agreedTerms ? 'linear-gradient(to bottom, #FFD814, #FFA41C)' : '#2a3a55',
                    border: 'none', borderRadius: '6px',
                    color: agreedTerms ? '#111' : '#8a95aa',
                    fontWeight: 'bold', fontSize: '0.9rem',
                    cursor: agreedTerms ? 'pointer' : 'not-allowed',
                  }}
                >Continue to Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
