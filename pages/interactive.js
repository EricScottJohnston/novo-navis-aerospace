// pages/interactive.js
// Interactive AI Blueprint sales funnel — 3 rounds of emotionally-arced questions, leads to free personalized report.

import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const NAVY  = '#1B2A4A'
const GOLD  = '#c8a96e'
const LIGHT = '#f4f6fb'
const SERIF = '"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif'

const TIER_DETAILS = {
  starter: [
    'Custom AI Blueprint — up to 10 pages',
    '1 workflow analyzed and planned',
    'Specific tools matched to your budget',
    'Maximize existing AI tool utility',
    'Fast implementation plan',
  ],
  blueprint: [
    'Custom AI Blueprint — up to 25 pages',
    '3–5 workflows, prioritized by impact',
    'Specific tools matched to your budget',
    'Maximize existing AI tool utility',
    'Full implementation plan',
    'ROI estimates + risks section',
  ],
  enterprise: [
    'Custom AI Blueprint — up to 50 pages',
    'Up to 10 things to automate, prioritized by impact',
    'Maximize existing AI tool utility',
    'Department-by-department rollout plan',
    '12-month implementation roadmap',
    'IT integration architecture',
    'Compliance & security assessment',
    'ROI estimates + risks section',
    '2-hour hands-on Zoom with an AI expert',
  ],
}

const TIERS = [
  { key: 'starter',    name: 'Single Workflow Blueprint', price: '$99',  badge: null },
  { key: 'blueprint',  name: 'AI Blueprint',              price: '$299', badge: 'Most Popular' },
  { key: 'enterprise', name: 'Enterprise Blueprint',      price: '$999', badge: null },
]

// ROUND 1 — ASPIRATION (towards-language, paints the future)
const ROUND_1 = {
  question: 'What would actually change your business right now?',
  options: [
    'Getting hours back every week so I can focus on real work',
    'Stopping the slow bleed of leads slipping through the cracks',
    'Finally knowing which AI tools are actually worth the money',
    'Scaling without hiring more people',
  ],
}

// ROUND 2 — BEHAVIOR (neutral, how they currently operate)
const ROUND_2 = {
  question: 'How are you handling AI decisions today?',
  options: [
    'I haven\'t started yet — I don\'t know where to begin',
    'I\'ve tried a few tools but nothing has stuck',
    'I\'m using AI casually but not strategically',
    'I have a stack but I\'m not sure I\'m using the right ones',
  ],
}

// ROUND 3 — PAIN (problem-ownership, creates buying intent)
const ROUND_3 = {
  question: 'What\'s the biggest thing holding you back?',
  options: [
    'I don\'t have time to research and test 50 different tools',
    'I can\'t tell which AI advice is real and which is hype',
    'I\'m afraid of picking the wrong tool and wasting money',
    'I\'m running an enterprise — I need this done at scale',
  ],
}

const ENTERPRISE_OPTION = 'I\'m running an enterprise — I need this done at scale'

function track(event, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }
}

// Inline mockup of the blueprint deliverable — clickable to open sample.
// Renders as a stack of three "pages" with a navy header and gold accent.
function BlueprintMockup({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="See a sample blueprint"
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        maxWidth: '300px',
        height: '200px',
        margin: '0 auto 0.6rem',
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
      }}
    >
      {/* Back page */}
      <div style={{
        position: 'absolute', top: '14px', left: '28px', right: '4px', bottom: '4px',
        background: '#fff', border: '1px solid #e0e4ef',
        borderRadius: '6px', boxShadow: '0 2px 8px rgba(27,42,74,0.08)',
        transform: 'rotate(2deg)',
      }} />
      {/* Middle page */}
      <div style={{
        position: 'absolute', top: '7px', left: '14px', right: '14px', bottom: '8px',
        background: '#fff', border: '1px solid #e0e4ef',
        borderRadius: '6px', boxShadow: '0 2px 10px rgba(27,42,74,0.10)',
        transform: 'rotate(-1deg)',
      }} />
      {/* Front page */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: '28px', bottom: '14px',
        background: '#fff', border: '1px solid #d8dee9',
        borderRadius: '6px',
        boxShadow: '0 6px 22px rgba(27,42,74,0.18)',
        overflow: 'hidden',
      }}>
        {/* Navy header */}
        <div style={{
          height: '36px', background: NAVY, display: 'flex',
          alignItems: 'center', padding: '0 14px', gap: '8px',
        }}>
          <div style={{ width: '3px', height: '16px', background: GOLD }} />
          <span style={{ color: '#fff', fontSize: '0.55rem', fontWeight: 'bold', letterSpacing: '0.18em' }}>
            AI BLUEPRINT
          </span>
          <span style={{ color: GOLD, fontSize: '0.5rem', marginLeft: 'auto', letterSpacing: '0.1em' }}>
            NOVO NAVIS
          </span>
        </div>
        <div style={{ height: '2px', background: GOLD, width: '38%' }} />
        {/* Body content lines */}
        <div style={{ padding: '14px 16px' }}>
          <div style={{ height: '7px', background: NAVY, width: '70%', marginBottom: '10px', borderRadius: '2px' }} />
          <div style={{ height: '4px', background: '#d0d8e8', width: '100%', marginBottom: '4px', borderRadius: '2px' }} />
          <div style={{ height: '4px', background: '#d0d8e8', width: '92%', marginBottom: '4px', borderRadius: '2px' }} />
          <div style={{ height: '4px', background: '#d0d8e8', width: '96%', marginBottom: '14px', borderRadius: '2px' }} />
          <div style={{ height: '5px', background: NAVY, width: '48%', marginBottom: '6px', borderRadius: '2px' }} />
          <div style={{ height: '4px', background: '#d0d8e8', width: '85%', marginBottom: '4px', borderRadius: '2px' }} />
          <div style={{ height: '4px', background: '#d0d8e8', width: '90%', marginBottom: '4px', borderRadius: '2px' }} />
          <div style={{ height: '4px', background: '#d0d8e8', width: '78%', borderRadius: '2px' }} />
        </div>
      </div>
    </button>
  )
}

export default function Interactive() {
  const [round,          setRound]          = useState(1)
  const [answers,        setAnswers]        = useState([])
  const [current,        setCurrent]        = useState(ROUND_1)
  const [isEnterprise,   setIsEnterprise]   = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(null)
  const [navModal,        setNavModal]        = useState(null)
  useEffect(() => {
    const handler = (e) => {
      if (e.data === 'close-nav-modal') setNavModal(null)
      if (e.data === 'close-sample-modal') setSampleOpen(false)
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  const [sampleOpen,     setSampleOpen]     = useState(false)
  const [sampleType,     setSampleType]     = useState('mold')
  const [objOpen,        setObjOpen]        = useState(false)
  const [siteOpen,       setSiteOpen]       = useState(false)
  const [reviewsOpen,    setReviewsOpen]    = useState(false)
  const [agreedTerms,    setAgreedTerms]    = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [pendingTier,    setPendingTier]    = useState(null)

  const handleChoice = (option) => {
    const newAnswers = [...answers, { question: current.question, answer: option }]
    setAnswers(newAnswers)
    if (round === 1) {
      setCurrent(ROUND_2)
      setRound(2)
      return
    }
    if (round === 2) {
      setCurrent(ROUND_3)
      setRound(3)
      return
    }

    // Round 3 complete — show sample prompt
    const enterprise = option === ENTERPRISE_OPTION
    setIsEnterprise(enterprise)
    setRound('sample-prompt')
  }

  const handleCheckout = async (tier) => {
    track('quiz_buy_clicked', { tier })
    if (tier !== 'enterprise') {
      setCheckoutLoading(tier)
      track('quiz_intake_started', { tier })
      window.location.href = `/intake?tier=${tier}`
      return
    }
    if (!agreedTerms) {
      setPendingTier(tier)
      setShowTermsModal(true)
      return
    }
    track('quiz_checkout_started', { tier })
    setCheckoutLoading(tier)
    try {
      const res  = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else { track('checkout_failed', { tier }); alert('Something went wrong. Please try again.'); setCheckoutLoading(null) }
    } catch {
      track('checkout_failed', { tier })
      alert('Something went wrong. Please try again.')
      setCheckoutLoading(null)
    }
  }

  // Round-specific sub-headlines for emotional pacing
  const getSubheadline = () => {
    if (round === 1) return "Pick the outcome that would matter most to you."
    if (round === 2) return "There's no wrong answer — just where you actually are right now."
    if (round === 3) return "One last thing. Be honest — this is what we'll solve."
    return ""
  }

  const getMomentumLine = () => {
    if (round === 1) return "Answer 3 quick questions. We build your report. You preview it free. You only pay if you approve."
    if (round === 2) return "Good. We're already learning what you need."
    if (round === 3) return "Almost there. This is the one that matters."
    return ""
  }

  return (
    <>
      <Head>
        <title>Find Your AI Blueprint | Novo Navis</title>
        <meta name="description" content="Find the AI tools that actually fit your business — in about 12 minutes. We build a custom AI Blueprint, you preview it free, and only pay if you approve." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="/logonovo.png" />
        <meta property="og:title" content="Find Your AI Blueprint | Novo Navis" />
        <meta property="og:description" content="Find the AI tools that actually fit your business — in about 12 minutes. Pay only if you approve." />
        

        <style>{`
          html, body { background: #f4f7fc !important; }
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeSlideIn {
  from { opacity: 0.01; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
        `}</style>
      </Head>

      <nav>
        <span className="nav-logo" style={{cursor:'default'}}>NOVO NAVIS</span>
        <ul className="nav-links">
          {[['FAQ','faq'],['About','about']].map(([label, key]) => (
            <li key={key}>
              <button
                onClick={() => { setNavModal(key) }}
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
              style={{flex:1, border:'none', width:'100%', background:'#fff'}}
              title={navModal}
            />
          </div>
        </div>
      )}

      {/* Page wrapper with subtle navy-tinted gradient anchoring the card */}
      <div style={{
        background: 'linear-gradient(to bottom, #eef2f9 0px, #f4f7fc 280px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        minHeight: '100vh',
      }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e0e4ef',
          borderRadius: '14px',
          boxShadow: '0 8px 40px rgba(27,42,74,0.12)',
          maxWidth: '520px',
          width: '100%',
          overflow: 'hidden',
        }}>

          {/* Defense contractor credential bar — visible authority signal */}
          <div style={{
            background: '#fafbfd',
            borderBottom: '1px solid #e8ecf4',
            padding: '0.55rem 1rem',
            textAlign: 'center',
          }}>
            <span style={{
              color: NAVY, fontSize: '0.66rem', fontWeight: '700',
              letterSpacing: '0.16em', textTransform: 'uppercase',
            }}>
              <span style={{ color: GOLD, marginRight: '0.4rem' }}>◆</span>
              Registered U.S. Defense Contractor
              <span style={{ color: GOLD, marginLeft: '0.4rem' }}>◆</span>
            </span>
          </div>

          {/* Progress bar */}
          {round !== 'final' && round !== 'sample-prompt' && (
            <>
              <div style={{ background: '#e8ecf4', height: '5px', width: '100%' }}>
                <div style={{
                  height: '100%',
                  width: `${(round / 3) * 100}%`,
                  background: GOLD,
                  transition: 'width 0.4s ease',
                  minWidth: '33%',
                }} />
              </div>
              <p style={{ textAlign: 'right', fontSize: '0.72rem', color: '#8a95aa', margin: '0.3rem 1rem 0', paddingBottom: '0' }}>
                Question {round} of 3
              </p>
            </>
          )}

          {/* Animated content container — re-mounts on round change for the dopamine micro-reward */}
          <div key={round} style={{ padding: '1.75rem 2rem 2.5rem', animation: round === 1 ? 'none' : 'fadeSlideIn 0.35s ease-out' }}>

          {/* Headline */}
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            {round !== 'final' && round !== 'sample-prompt' && (
              <>
                <p style={{
                  color: GOLD, fontSize: '1.4rem', fontWeight: '700',
                  letterSpacing: '0', margin: '0 0 0.5rem', lineHeight: 1.2,
                  fontFamily: SERIF,
                }}>
                  68% of businesses qualify for our "pay after" promotion.
                </p>
                <p style={{ color: '#4a5568', fontSize: '0.95rem', fontWeight: '500', margin: '0 0 1rem', lineHeight: 1.5 }}>
                  We build the report. You preview it free. Pay only if you approve.
                </p>
              </>
            )}
            {round !== 'sample-prompt' && (
              <h1 style={{
                color: NAVY,
                fontSize: round === 'final' ? '1.55rem' : '1.5rem',
                fontWeight: 'bold',
                margin: '0 0 0.5rem',
                lineHeight: 1.25,
                fontFamily: round === 'final' ? SERIF : 'inherit',
              }}>
                {round === 'final'
                  ? "You named the problem. Pick the blueprint that fits."
                  : current.question}
              </h1>
            )}
            {round !== 'final' && round !== 'sample-prompt' && (
              <>
                <p style={{ color: '#6b7a99', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 0.4rem' }}>
                  {getSubheadline()}
                </p>
                {round === 1 && (
                  <p style={{ color: '#8a95aa', fontSize: '0.82rem', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                    {getMomentumLine()}
                  </p>
                )}
                {round > 1 && (
                  <p style={{ color: GOLD, fontSize: '0.82rem', lineHeight: 1.5, margin: 0, fontWeight: '600' }}>
                    {getMomentumLine()}
                  </p>
                )}
              </>
            )}
          </div>

          {round === 'sample-prompt' ? (
            <div style={{ textAlign: 'center', padding: '1rem 0 0.5rem' }}>
              <p style={{ color: GOLD, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.75rem' }}>
                Before we show you the options
              </p>
              <h2 style={{ color: NAVY, fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 0.5rem', lineHeight: 1.3, fontFamily: SERIF }}>
                Want to see exactly what we'll build for you?
              </h2>
              <p style={{ color: '#6b7a99', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 2rem' }}>
                Take 60 seconds and look at a real blueprint we built for another business. Same depth, same detail, same format you'll get.
              </p>
              <p style={{ color: '#6b7a99', fontSize: '0.83rem', margin: '0 0 1rem' }}>
                Pick an industry to see a real blueprint:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '340px', margin: '0 auto' }}>
                <button
                  onClick={() => { setSampleType('mold'); setSampleOpen(true); setRound('final'); track('quiz_sample_mold') }}
                  style={{
                    width: '100%', padding: '0.9rem 1.25rem',
                    background: NAVY, border: 'none', borderRadius: '10px',
                    color: '#fff', fontWeight: 'bold', fontSize: '0.97rem', cursor: 'pointer',
                  }}
                >
                  Mold Remediation Company
                </button>
                <button
                  onClick={() => { setSampleType('law'); setSampleOpen(true); setRound('final'); track('quiz_sample_law') }}
                  style={{
                    width: '100%', padding: '0.9rem 1.25rem',
                    background: NAVY, border: 'none', borderRadius: '10px',
                    color: '#fff', fontWeight: 'bold', fontSize: '0.97rem', cursor: 'pointer',
                  }}
                >
                  Personal Injury Law Firm
                </button>
                <button
                  onClick={() => { setRound('final'); track('quiz_sample_skipped') }}
                  style={{
                    width: '100%', padding: '0.9rem 1.25rem',
                    background: '#ffffff', border: '1px solid #e8ecf4', borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(27,42,74,0.07)',
                    color: NAVY, fontWeight: '600', fontSize: '0.97rem', cursor: 'pointer',
                  }}
                >
                  Skip — show me my options
                </button>
              </div>
            </div>
          ) : round === 'final' ? (
            <>
              {/* Visual proof of the deliverable — clickable to open sample */}
              <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                <BlueprintMockup onClick={() => { setSampleType('mold'); setSampleOpen(true); track('blueprint_mockup_clicked') }} />
                <p style={{ color: '#8a95aa', fontSize: '0.78rem', margin: '0 0 1.25rem', fontStyle: 'italic' }}>
                  ↑ Tap to see a real blueprint we built
                </p>
              </div>

              {/* APPROVAL-FIRST BANNER — investment framing + gating mechanic explained */}
              <div style={{
                background: 'linear-gradient(135deg, #fffbf4 0%, #fff8ee 100%)',
                border: `2px solid ${GOLD}`,
                borderRadius: '12px',
                padding: '1.1rem 1.25rem',
                marginBottom: '1.5rem',
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(200,169,110,0.18)',
              }}>
                <p style={{ color: GOLD, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>
                  We invest in you first
                </p>
                <p style={{ color: NAVY, fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 0.4rem', lineHeight: 1.3, fontFamily: SERIF }}>
                  Read your full strategy free. Pay only to unlock the tools.
                </p>
                <p style={{ color: '#4a5568', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
                  We build your complete blueprint — real work, real hours — before you pay a cent. Read the entire strategy. The specific AI tools we recommend stay redacted in the preview. If it earns your business, unlock the tools. If not, walk away — no charges, no follow-up.
                </p>
              </div>

              {/* Pricing header */}
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <h2 style={{ color: NAVY, fontSize: '1.25rem', fontWeight: 'bold', margin: 0, fontFamily: SERIF }}>
                  Pick your blueprint depth
                </h2>
              </div>

              {/* Tier cards */}
              {TIERS.filter(t => isEnterprise ? t.key === 'enterprise' : t.key !== 'enterprise').map(({ key, name, price, badge }) => (
                <div key={key} style={{
                  border: key === 'blueprint' ? `2px solid ${GOLD}` : '1px solid #e0e4ef',
                  borderRadius: '10px',
                  padding: '1.1rem 1.25rem',
                  marginBottom: '0.75rem',
                  background: key === 'blueprint' ? '#fffbf4' : '#ffffff',
                  position: 'relative',
                }}>
                  {badge && (
                    <div style={{
                      position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)',
                      background: GOLD, color: NAVY, fontSize: '0.68rem', fontWeight: 'bold',
                      padding: '0.18rem 0.85rem', borderRadius: '20px', whiteSpace: 'nowrap',
                      letterSpacing: '0.08em',
                      boxShadow: '0 2px 8px rgba(200,169,110,0.35)',
                    }}>
                      {badge}
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                    <p style={{ color: NAVY, fontWeight: 'bold', fontSize: '1rem', margin: 0 }}>{name}</p>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: GOLD, fontWeight: 'bold', fontSize: '1.3rem', margin: 0, fontFamily: SERIF }}>{price}</p>
                      {key !== 'enterprise' && (
                        <p style={{ color: '#8a95aa', fontSize: '0.7rem', margin: '0.1rem 0 0', fontStyle: 'italic' }}>only after approval</p>
                      )}
                    </div>
                  </div>
                  <ul style={{ margin: '0 0 0.85rem', paddingLeft: '1.1rem' }}>
                    {TIER_DETAILS[key].map((item, i) => (
                      <li key={i} style={{ color: '#4a5568', fontSize: '0.83rem', lineHeight: 1.7 }}>{item}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleCheckout(key)}
                    disabled={checkoutLoading === key}
                    onMouseEnter={e => { if (!checkoutLoading && key === 'blueprint') { e.currentTarget.style.boxShadow = '0 6px 20px rgba(200,169,110,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
                    onMouseLeave={e => { if (key === 'blueprint') { e.currentTarget.style.boxShadow = '0 4px 14px rgba(200,169,110,0.35)'; e.currentTarget.style.transform = 'translateY(0)' } }}
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      background: checkoutLoading === key
                        ? '#dde2ef'
                        : key === 'blueprint'
                          ? GOLD
                          : NAVY,
                      border: key === 'blueprint' ? `1px solid ${GOLD}` : 'none',
                      borderRadius: '8px',
                      color: checkoutLoading === key ? '#8a95aa' : key === 'blueprint' ? NAVY : '#fff',
                      fontWeight: 'bold',
                      fontSize: '0.97rem',
                      letterSpacing: '0.02em',
                      cursor: checkoutLoading === key ? 'not-allowed' : 'pointer',
                      boxShadow: key === 'blueprint' ? '0 4px 14px rgba(200,169,110,0.35)' : 'none',
                      transition: 'box-shadow 0.18s ease, transform 0.18s ease',
                    }}
                  >
                    {checkoutLoading === key
                      ? (key === 'enterprise' ? 'Redirecting...' : 'Taking you there...')
                      : key === 'enterprise' ? `Get ${name} — ${price}` : `Build My Blueprint →`}
                  </button>
                  {key !== 'enterprise' && (
                    <p style={{ textAlign: 'center', color: '#6b7a99', fontSize: '0.78rem', margin: '0.5rem 0 0' }}>
                      Build & preview is <strong style={{ color: NAVY }}>free</strong>. Pay <strong style={{ color: NAVY }}>{price}</strong> only when you approve.
                    </p>
                  )}
                </div>
              ))}

              {/* Industry strip — breadth of social proof */}
              <div style={{
                background: '#fafbfd',
                border: '1px solid #e8ecf4',
                borderRadius: '8px',
                padding: '0.7rem 1rem',
                margin: '1rem 0',
                textAlign: 'center',
              }}>
                <p style={{
                  color: '#8a95aa', fontSize: '0.66rem', fontWeight: '700',
                  letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 0.35rem',
                }}>
                  Blueprints built for
                </p>
                <p style={{ color: NAVY, fontSize: '0.78rem', margin: 0, fontWeight: '500', lineHeight: 1.5 }}>
                  Mold Remediation · Personal Injury Law · Property Management · Healthcare · Construction · E-commerce
                </p>
              </div>

              {/* Call us */}
              <div style={{
                textAlign: 'center', marginBottom: '1rem',
                padding: '0.85rem 1rem',
                background: LIGHT, border: '1px solid #e0e4ef', borderRadius: '8px',
              }}>
                <p style={{ color: NAVY, fontSize: '0.88rem', fontWeight: '600', margin: '0 0 0.2rem' }}>
                  Want to talk to a real person first?
                </p>
                <a href="tel:6234289308" style={{ color: GOLD, fontWeight: 'bold', fontSize: '1.05rem', textDecoration: 'none', fontFamily: SERIF }}>
                  (623) 428-9308
                </a>
              </div>

              {/* Consolidated secondary links — single line */}
              <p style={{ textAlign: 'center', color: '#8a95aa', fontSize: '0.82rem', margin: '0 0 1rem' }}>
                Questions?{' '}
                <button
                  onClick={() => { setObjOpen(true); track('modal_opened', { modal: 'what_is_blueprint', round }) }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a95aa', fontSize: '0.82rem', textDecoration: 'underline', textUnderlineOffset: '3px', padding: 0 }}
                >
                  See what an AI Blueprint is
                </button>
                {' '}or{' '}
                <button
                  onClick={() => { setReviewsOpen(true); track('modal_opened', { modal: 'reviews', round }) }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a95aa', fontSize: '0.82rem', textDecoration: 'underline', textUnderlineOffset: '3px', padding: 0 }}
                >
                  read what others say
                </button>
                .
              </p>

              {/* What happens next */}
              <div style={{
                background: '#f4f6fb', border: '1px solid #e0e4ef',
                borderRadius: '8px', padding: '1rem 1.1rem',
              }}>
                <p style={{ color: NAVY, fontSize: '0.82rem', fontWeight: 'bold', margin: '0 0 0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  What happens next
                </p>
                {(isEnterprise ? [
                  ['1', 'Stripe takes your payment — secure, takes about 30 seconds.'],
                  ['2', 'We bring you back for a short intake form — 2 to 3 minutes.'],
                  ['3', 'We build your custom blueprint — delivered to your inbox in about 12 minutes.'],
                ] : [
                  ['1', 'Quick intake form — 2 to 3 minutes. Tell us about your business.'],
                  ['2', 'We build your custom blueprint — about 12 minutes. Up to 25 pages, all yours.'],
                  ['3', 'Read the full preview. If you approve it, unlock the tool names. If not, walk away — no charge.'],
                ]).map(([n, text]) => (
                  <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.5rem' }}>
                    <span style={{
                      background: GOLD, color: NAVY, fontWeight: 'bold', fontSize: '0.7rem',
                      borderRadius: '50%', width: '18px', height: '18px', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{n}</span>
                    <p style={{ color: '#4a5568', fontSize: '0.83rem', lineHeight: 1.6, margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>

              <p style={{ textAlign: 'center', marginTop: '1.25rem', marginBottom: 0 }}>
                <button
                  onClick={() => { setRound(1); setAnswers([]); setCurrent(ROUND_1); setIsEnterprise(false) }}
                  style={{ background: 'none', border: 'none', color: '#8a95aa', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Start over
                </button>
              </p>
            </>
          ) : (
            <>
              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {current.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleChoice(opt)}
                    style={{
                      width: '100%',
                      padding: '0.95rem 1.25rem',
                      background: '#ffffff',
                      border: `1px solid #e8ecf4`,
                      borderRadius: '10px',
                      boxShadow: '0 2px 8px rgba(27,42,74,0.07)',
                      color: NAVY,
                      fontWeight: '600',
                      fontSize: '0.97rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'border-color 0.15s, background 0.15s, box-shadow 0.15s, transform 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = '#fffbf4'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(200,169,110,0.18)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8ecf4'; e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(27,42,74,0.07)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Site explainer link */}
              <p style={{ textAlign: 'center', marginTop: '1rem', marginBottom: 0 }}>
                <button
                  onClick={() => { setSiteOpen(true); track('modal_opened', { modal: 'what_is_this_site', round }) }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a95aa', fontSize: '0.78rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  Wait, what is this site?
                </button>
              </p>
            </>
          )}

          </div>{/* end animated content container */}
        </div>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis, LLC · Registered U.S. Defense Contractor · Fidelis Diligentia</p>
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
            animation: 'fadeIn 0.2s ease-out',
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
              animation: 'fadeSlideIn 0.3s ease-out',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <p style={{ color: GOLD, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.2rem' }}>Good question</p>
                <h2 style={{ color: NAVY, fontSize: '1.25rem', fontWeight: 'bold', margin: 0, fontFamily: SERIF }}>What is an AI Blueprint?</h2>
              </div>
              <button onClick={() => setObjOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a95aa', fontSize: '1.3rem', lineHeight: 1, padding: '0.1rem 0.3rem' }}>✕</button>
            </div>

            <div style={{ background: '#fff8ee', border: `1px solid ${GOLD}60`, borderLeft: `3px solid ${GOLD}`, borderRadius: '8px', padding: '1rem 1.1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: NAVY, fontSize: '0.88rem', fontWeight: 'bold', margin: '0 0 0.3rem' }}>
                95% of businesses pick the wrong AI tools.
              </p>
              <p style={{ color: '#4a5568', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>
                Not because they're not smart — because they're searching Google and finding whatever has the biggest marketing budget. The right tool for your business might be built by a team of 12 people who can't afford a Super Bowl ad. We find those tools.
              </p>
            </div>

            <p style={{ color: NAVY, fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.1rem' }}>
              Your AI Blueprint is built by scanning the full landscape — the big names and the hidden ones — and matching the right tool to your specific workflows and budget. That's what a consultant does. That's what we do.
            </p>

            <p style={{ color: NAVY, fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Built by David — our proprietary AI system, developed under defense-grade standards — and delivered in about <strong>12 minutes</strong>. Up to 25 pages, built around your specific business.
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
            animation: 'fadeIn 0.2s ease-out',
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
              animation: 'fadeSlideIn 0.3s ease-out',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <p style={{ color: GOLD, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.2rem' }}>What customers say</p>
                <h2 style={{ color: NAVY, fontSize: '1.25rem', fontWeight: 'bold', margin: 0, fontFamily: SERIF }}>Real results from real businesses.</h2>
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

      {/* Sample report modal */}
      {sampleOpen && (
        <div
          onClick={() => setSampleOpen(false)}
          style={{
            position:'fixed', inset:0, zIndex:99998,
            background:'rgba(0,0,0,0.65)',
            display:'flex', alignItems:'center', justifyContent:'center',
            padding:'1rem',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background:'#fff', borderRadius:'12px',
              width:'100%', maxWidth:'820px',
              height:'85vh', display:'flex', flexDirection:'column',
              overflow:'hidden', boxShadow:'0 8px 48px rgba(0,0,0,0.35)',
              animation: 'fadeSlideIn 0.3s ease-out',
            }}
          >
            <div style={{
              display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'0.85rem 1.25rem',
              borderBottom:'1px solid #e0e4ef',
              background:'#f8f9fc', flexShrink:0
            }}>
              <span style={{color:NAVY, fontWeight:'bold', fontSize:'0.95rem'}}>Sample Blueprint</span>
              <button
                onClick={() => setSampleOpen(false)}
                style={{
                  background:'none', border:'none', cursor:'pointer',
                  color:'#8a95aa', fontSize:'1.3rem', lineHeight:1, padding:'0.2rem 0.4rem'
                }}
              >✕</button>
            </div>
            <iframe
              src={sampleType === 'law' ? '/sample-report-law?embed=1' : '/sample-report?embed=1'}
              style={{flex:1, border:'none', width:'100%', background:'#fff'}}
              title="Sample AI Blueprint"
            />
          </div>
        </div>
      )}

      {/* What is this site modal */}
      {siteOpen && (
        <div
          onClick={() => setSiteOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99998,
            background: 'rgba(0,0,0,0.65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#ffffff', borderRadius: '14px',
              border: '1px solid #e0e4ef',
              boxShadow: '0 8px 48px rgba(27,42,74,0.18)',
              maxWidth: '440px', width: '100%',
              padding: '2rem 1.75rem',
              animation: 'fadeSlideIn 0.3s ease-out',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <p style={{ color: GOLD, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.2rem' }}>About this site</p>
                <h2 style={{ color: NAVY, fontSize: '1.25rem', fontWeight: 'bold', margin: 0, fontFamily: SERIF }}>You're on Novo Navis.</h2>
              </div>
              <button onClick={() => setSiteOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a95aa', fontSize: '1.3rem', lineHeight: 1, padding: '0.1rem 0.3rem' }}>✕</button>
            </div>

            <p style={{ color: NAVY, fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              Novo Navis is a registered U.S. Defense Contractor that builds custom AI Blueprints for small businesses — the same rigor we apply to defense-grade AI, applied to your workflows and budget.
            </p>

            <p style={{ color: NAVY, fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Answer 3 quick questions and we'll build you a custom AI report. We build it. You preview it. You only pay if you approve.
            </p>

            <button
              onClick={() => setSiteOpen(false)}
              style={{
                width: '100%', padding: '0.85rem',
                background: NAVY, border: 'none', borderRadius: '8px',
                color: '#ffffff', fontWeight: 'bold', fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              Got it — let's do this
            </button>
          </div>
        </div>
      )}

      {/* Terms modal */}
      {showTermsModal && (
        <div
          onClick={() => setShowTermsModal(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0d1221', border: '1px solid #1e2a45',
              borderRadius: '8px', maxWidth: '420px', width: '100%',
              padding: '1.75rem 1.5rem',
              animation: 'fadeSlideIn 0.3s ease-out',
            }}
          >
            <div style={{ background: '#0d1221', border: '1px solid #1e2a45', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#d0d8e8', fontSize: '0.84rem', lineHeight: '1.6', margin: 0 }}>
                All sales of the full unlocked report are final. You will receive a free preview first — review it before you decide to unlock.
              </p>
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', marginBottom: '1.25rem' }}>
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={e => setAgreedTerms(e.target.checked)}
                style={{ marginTop: '3px', width: '20px', height: '20px', flexShrink: 0, cursor: 'pointer' }}
              />
              <span style={{ color: '#d0d8e8', fontSize: '0.88rem', lineHeight: '1.6' }}>
                I agree to the{' '}
                <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: GOLD }}>Terms and Conditions</a>.
              </span>
            </label>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => { setShowTermsModal(false) }}
                style={{
                  flex: 1, padding: '0.75rem',
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
                  flex: 2, padding: '0.75rem',
                  background: agreedTerms ? GOLD : '#2a3a55',
                  border: 'none', borderRadius: '6px',
                  color: agreedTerms ? NAVY : '#8a95aa',
                  fontWeight: 'bold', fontSize: '0.95rem',
                  cursor: agreedTerms ? 'pointer' : 'not-allowed',
                  boxShadow: agreedTerms ? '0 4px 14px rgba(200,169,110,0.35)' : 'none',
                }}
              >Continue to Checkout</button>
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
