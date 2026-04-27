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

const TIER_DETAILS = {
  starter: [
    'Custom AI Blueprint — up to 10 pages',
    '1 thing to automate, analyzed and planned',
    'Specific tools matched to your budget',
    'Maximize existing AI tool utility',
    'Fast implementation plan',
  ],
  blueprint: [
    'Custom AI Blueprint — up to 25 pages',
    '3–5 things to automate, prioritized by impact',
    'Specific tools matched to your budget',
    'Maximize existing AI tool utility',
    'Full implementation plan',
    'ROI estimates + risks section',
  ],
  consult: [
    'Everything in the AI Blueprint',
    '3–5 things to automate, prioritized by impact',
    'Maximize existing AI tool utility',
    '2-hour hands-on Zoom with an AI expert',
    'Live implementation guidance',
    'Q&A tailored to your specific situation',
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
  { key: 'starter',    name: 'Starter Blueprint',    price: '$49',   wasPrice: '$69',  badge: null },
  { key: 'blueprint',  name: 'AI Blueprint',          price: '$199',  wasPrice: '$249', badge: 'Most Popular' },
  { key: 'consult',    name: 'Blueprint + Consult',   price: '$499',  wasPrice: null,   badge: null },
  { key: 'enterprise', name: 'Enterprise Blueprint',  price: '$999',  wasPrice: null,   badge: null },
]

const ROUND_1 = {
  tip: 'The average small business owner spends 40+ hours researching AI tools before giving up — and still doesn\'t know what to use. Our blueprint does that research for you, customized to your business, in about 12 minutes.',
  question: 'I am...',
  options: [
    'Having a hard time selecting the right AI tools',
    'Struggling to match AI tools to my specific workflows',
    'I want to get more out of the AI tools I already use',
  ],
}

const ROUND_2 = {
  tip: 'Most AI tools are built for enterprise companies — not small businesses. Your AI Blueprint is built around what actually works at your scale and budget.',
  question: 'I am a...',
  options: ['Solo operator or freelancer', 'Small business with a team', 'Growing business ready to scale', 'Enterprise organization'],
}

const ENTERPRISE_OPTION = 'Enterprise organization'

function track(event, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }
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
  const [objOpen,        setObjOpen]        = useState(false)
  const [siteOpen,       setSiteOpen]       = useState(false)
  const [reviewsOpen,    setReviewsOpen]    = useState(false)
  const [agreedTerms,    setAgreedTerms]    = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [pendingTier,    setPendingTier]    = useState(null)

  const handleChoice = (option) => {
    const newAnswers = [...answers, { question: current.question, answer: option }]
    setAnswers(newAnswers)
    track(`quiz_round_${round}_complete`, { answer: option })

    if (round === 1) {
      setCurrent(ROUND_2)
      setRound(2)
      return
    }

    // Round 2 complete — show sample prompt
    const enterprise = option === ENTERPRISE_OPTION
    setIsEnterprise(enterprise)
    setRound('sample-prompt')
    track('quiz_sample_prompt_shown', { enterprise })
  }

  const handleCheckout = async (tier) => {
    if (!agreedTerms) {
      setPendingTier(tier)
      setShowTermsModal(true)
      track('quiz_buy_clicked', { tier })
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

  return (
    <>
      <Head>
        <title>Find Your AI Blueprint | Novo Navis</title>
        <meta name="description" content="Answer 4 quick questions and get a custom AI Blueprint built for your specific business — delivered in about 12 minutes. Find your fit now." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="/logonovo.png" />
        <meta property="og:title" content="Find Your AI Blueprint | Novo Navis" />
        <meta property="og:description" content="Answer 4 quick questions and get a custom AI Blueprint built for your specific business — delivered in about 12 minutes." />
        <style>{`html, body { background: #f8f9fc !important; }`}</style>
      </Head>

      <nav>
        <span className="nav-logo" style={{cursor:'default'}}>NOVO NAVIS</span>
        <ul className="nav-links">
          {[['Blueprint Sample','sample-report'],['FAQ','faq'],['About','about']].map(([label, key]) => (
            <li key={key}>
              <button
                onClick={() => { setNavModal(key); track('nav_modal_opened', { page: key, round }) }}
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

      <div style={{
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
          overflow: 'hidden',
        }}>

          {/* Progress bar */}
          {round !== 'final' && round !== 'sample-prompt' && (
            <>
              <div style={{ background: '#e8ecf4', height: '5px', width: '100%' }}>
                <div style={{
                  height: '100%',
                  width: `${(round / 2) * 100}%`,
                  background: GOLD,
                  transition: 'width 0.4s ease',
                  minWidth: '50%',
                }} />
              </div>
              <p style={{ textAlign: 'right', fontSize: '0.72rem', color: '#8a95aa', margin: '0.3rem 1rem 0', paddingBottom: '0' }}>
                Question {round} of 2
              </p>
            </>
          )}

          <div style={{ padding: '2rem 2rem 2.5rem' }}>

          {/* Headline */}
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            {round !== 'final' && round !== 'sample-prompt' && (
              <>
                <p style={{ color: '#4a5568', fontSize: '1.05rem', fontWeight: '600', margin: '0 0 0.15rem' }}>
                  Let's figure this out together.
                </p>
                <p style={{ color: GOLD, fontSize: '0.82rem', fontWeight: '600', margin: '0 0 0.75rem', fontStyle: 'italic' }}>
                  We're YOUR consultant — not their marketing agency.
                </p>
              </>
            )}
            {round !== 'sample-prompt' && (
              <h1 style={{
                color: NAVY,
                fontSize: round === 'final' ? '1.45rem' : '1.75rem',
                fontWeight: 'bold',
                margin: '0 0 0.5rem',
                lineHeight: 1.2,
              }}>
                {round === 'final'
                  ? "We've solved 50% of your problem. Choose an option to solve the other 50%."
                  : 'Where are you with AI right now?'}
              </h1>
            )}
            {round === 1 && (
              <p style={{ color: '#6b7a99', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                Answer 2 quick questions and we'll match you to one of our AI blueprint services.
              </p>
            )}
          </div>

          {round === 'sample-prompt' ? (
            <div style={{ textAlign: 'center', padding: '1rem 0 0.5rem' }}>
              <p style={{ color: GOLD, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.75rem' }}>
                Before we show you the options
              </p>
              <h2 style={{ color: NAVY, fontSize: '1.3rem', fontWeight: 'bold', margin: '0 0 0.5rem', lineHeight: 1.3 }}>
                Would you like to see a sample blueprint first?
              </h2>
              <p style={{ color: '#6b7a99', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 2rem' }}>
                See exactly what we build before you decide.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '340px', margin: '0 auto' }}>
                <button
                  onClick={() => { setSampleOpen(true); setRound('final'); track('quiz_sample_yes') }}
                  style={{
                    width: '100%', padding: '0.9rem 1.25rem',
                    background: NAVY, border: 'none', borderRadius: '10px',
                    color: '#fff', fontWeight: 'bold', fontSize: '0.97rem', cursor: 'pointer',
                  }}
                >
                  Yes, show me a sample blueprint
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
                  No, show me the options
                </button>
              </div>
            </div>
          ) : round === 'final' ? (
            <>
              {/* Pricing header */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <p style={{ color: GOLD, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.35rem' }}>
                  Here's what we can build for you
                </p>
                <h2 style={{ color: NAVY, fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
                  Choose your plan
                </h2>
              </div>

              {/* Tier cards — enterprise buyers see only $499 and $999 */}
              {TIERS.filter(t => isEnterprise ? ['consult','enterprise'].includes(t.key) : t.key !== 'enterprise').map(({ key, name, price, wasPrice, badge }) => (
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
                      background: GOLD, color: '#111', fontSize: '0.68rem', fontWeight: 'bold',
                      padding: '0.18rem 0.75rem', borderRadius: '20px', whiteSpace: 'nowrap',
                      letterSpacing: '0.05em',
                    }}>
                      {badge}
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                    <p style={{ color: NAVY, fontWeight: 'bold', fontSize: '1rem', margin: 0 }}>{name}</p>
                    <div style={{ textAlign: 'right' }}>
                      {wasPrice && (
                        <p style={{ color: '#a0aab8', fontSize: '0.8rem', textDecoration: 'line-through', margin: '0 0 0.1rem' }}>{wasPrice}</p>
                      )}
                      <p style={{ color: GOLD, fontWeight: 'bold', fontSize: '1.25rem', margin: 0 }}>{price}</p>
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
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: checkoutLoading === key ? '#dde2ef' : key === 'blueprint' ? 'linear-gradient(to bottom, #FFD814, #FFA41C)' : NAVY,
                      border: 'none',
                      borderRadius: '8px',
                      color: checkoutLoading === key ? '#8a95aa' : key === 'blueprint' ? '#111' : '#fff',
                      fontWeight: 'bold',
                      fontSize: '0.95rem',
                      cursor: checkoutLoading === key ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {checkoutLoading === key ? 'Redirecting...' : `Get ${name} — ${price}`}
                  </button>
                </div>
              ))}

              {/* Trust badges */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', margin: '1rem 0', flexWrap: 'wrap' }}>
                {[['🔒', 'Stripe Secure'], ['🔐', 'Information Encrypted']].map(([icon, label]) => (
                  <div key={label} style={{
                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                    background: LIGHT, border: '1px solid #e0e4ef',
                    borderRadius: '20px', padding: '0.3rem 0.75rem',
                    fontSize: '0.75rem', color: '#6b7a99', fontWeight: '500',
                  }}>
                    <span>{icon}</span><span>{label}</span>
                  </div>
                ))}
              </div>

              {/* Call us */}
              <div style={{
                textAlign: 'center', marginBottom: '1rem',
                padding: '0.85rem 1rem',
                background: LIGHT, border: '1px solid #e0e4ef', borderRadius: '8px',
              }}>
                <p style={{ color: NAVY, fontSize: '0.88rem', fontWeight: '600', margin: '0 0 0.2rem' }}>
                  Have questions? Yeah, it's the weekend — we're still here.
                </p>
                <a href="tel:6234289308" style={{ color: GOLD, fontWeight: 'bold', fontSize: '1rem', textDecoration: 'none' }}>
                  (623) 428-9308
                </a>
              </div>

              {/* Secondary links */}
              <div style={{ textAlign: 'center', marginBottom: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  onClick={() => { setObjOpen(true); track('modal_opened', { modal: 'what_is_blueprint', round }) }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a95aa', fontSize: '0.85rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  Wait, what is an AI Blueprint?
                </button>
                <button
                  onClick={() => { setReviewsOpen(true); track('modal_opened', { modal: 'reviews', round }) }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a95aa', fontSize: '0.85rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  Wait, I want to know what other people have to say.
                </button>
              </div>

              {/* What happens next */}
              <div style={{
                background: '#f4f6fb', border: '1px solid #e0e4ef',
                borderRadius: '8px', padding: '1rem 1.1rem',
              }}>
                <p style={{ color: NAVY, fontSize: '0.82rem', fontWeight: 'bold', margin: '0 0 0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  What happens after you checkout
                </p>
                {[
                  ['1', 'Stripe takes your payment — secure, takes about 30 seconds.'],
                  ['2', 'We bring you back for a short intake form — 2 to 3 minutes.'],
                  ['3', 'We build your custom blueprint — delivered to your inbox in about 12 minutes.'],
                ].map(([n, text]) => (
                  <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.5rem' }}>
                    <span style={{
                      background: GOLD, color: '#111', fontWeight: 'bold', fontSize: '0.7rem',
                      borderRadius: '50%', width: '18px', height: '18px', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{n}</span>
                    <p style={{ color: '#4a5568', fontSize: '0.83rem', lineHeight: 1.6, margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>

              {/* Reassurance */}
              <div style={{
                background: '#f0f7f0', border: '1px solid #b2dab2',
                borderRadius: '8px', padding: '0.85rem 1.1rem', textAlign: 'center', marginTop: '0.75rem',
              }}>
                <p style={{ color: '#2e6b2e', fontSize: '0.88rem', fontWeight: 'bold', margin: 0 }}>
                  <span style={{ color: '#4caf50' }}>✓</span> 100% money-back guarantee — no questions asked
                </p>
              </div>

              <p style={{ textAlign: 'center', marginTop: '1.25rem', marginBottom: 0 }}>
                <button
                  onClick={() => { setRound(1); setAnswers([]); setCurrent(ROUND_1); setIsEnterprise(false); track('quiz_restarted') }}
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
                      padding: '0.9rem 1.25rem',
                      background: '#ffffff',
                      border: `1px solid #e8ecf4`,
                      borderRadius: '10px',
                      boxShadow: '0 2px 8px rgba(27,42,74,0.07)',
                      color: NAVY,
                      fontWeight: '600',
                      fontSize: '0.97rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'border-color 0.15s, background 0.15s, box-shadow 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = '#fffbf4'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(200,169,110,0.18)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8ecf4'; e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(27,42,74,0.07)' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Nudge */}
              <p style={{ color: '#8a95aa', fontSize: '0.78rem', textAlign: 'center', margin: 0 }}>
                Select whichever matches best.
              </p>

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

          </div>{/* end inner padding */}
        </div>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis, LLC · Fidelis Diligentia</p>
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
              Built by David — a proprietary AI system developed under defense-grade standards — and delivered in about <strong>12 minutes</strong>. Up to 25 pages, built around your specific business.
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

      {/* Sample report modal */}
      {sampleOpen && (
        <div
          onClick={() => setSampleOpen(false)}
          style={{
            position:'fixed', inset:0, zIndex:99998,
            background:'rgba(0,0,0,0.65)',
            display:'flex', alignItems:'center', justifyContent:'center',
            padding:'1rem'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background:'#fff', borderRadius:'12px',
              width:'100%', maxWidth:'820px',
              height:'85vh', display:'flex', flexDirection:'column',
              overflow:'hidden', boxShadow:'0 8px 48px rgba(0,0,0,0.35)'
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
              src="/sample-report?embed=1"
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
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <p style={{ color: GOLD, fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.2rem' }}>About this site</p>
                <h2 style={{ color: NAVY, fontSize: '1.15rem', fontWeight: 'bold', margin: 0 }}>You're on Novo Navis.</h2>
              </div>
              <button onClick={() => setSiteOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a95aa', fontSize: '1.3rem', lineHeight: 1, padding: '0.1rem 0.3rem' }}>✕</button>
            </div>

            <p style={{ color: NAVY, fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              Novo Navis is a registered U.S. Defense Contractor that builds custom AI Blueprints for small businesses — the same rigor we apply to defense-grade AI, applied to your workflows and budget.
            </p>

            <p style={{ color: NAVY, fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              This short quiz helps us understand your situation so we can recommend the right Blueprint for you. Answer 4 quick questions and we'll tell you exactly which tier fits — and why.
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

      {/* Terms modal — lightweight, checkbox upfront */}
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
              borderRadius: '8px', maxWidth: '420px', width: '100%',
              padding: '1.75rem 1.5rem',
            }}
          >
            <div style={{ background: '#0a1a0a', border: '2px solid #4caf50', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#4caf50', fontWeight: 'bold', margin: '0 0 0.2rem', fontSize: '0.92rem' }}>✓ 100% Money-Back Guarantee</p>
              <p style={{ color: '#d0d8e8', fontSize: '0.84rem', lineHeight: '1.6', margin: 0 }}>
                Not satisfied for any reason? Email support@novonavis.com and we'll refund you in full — no questions asked.
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
                <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#c8a96e' }}>Terms and Conditions</a>.
              </span>
            </label>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => { setShowTermsModal(false); track('terms_dismissed') }}
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
                  background: agreedTerms ? 'linear-gradient(to bottom, #FFD814, #FFA41C)' : '#2a3a55',
                  border: 'none', borderRadius: '6px',
                  color: agreedTerms ? '#111' : '#8a95aa',
                  fontWeight: 'bold', fontSize: '0.95rem',
                  cursor: agreedTerms ? 'pointer' : 'not-allowed',
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
