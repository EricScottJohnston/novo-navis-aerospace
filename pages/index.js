import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'


export default function Home() {
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)

  // Countdown timer — persists across refreshes via localStorage
  useEffect(() => {
    const KEY = 'nn_price_deadline'
    const DURATION = (0 * 86400 + 2 * 3600 + 34 * 60 + 15) * 1000
    let deadline = parseInt(localStorage.getItem(KEY) || '0', 10)
    if (!deadline || deadline <= Date.now()) {
      deadline = Date.now() + DURATION
      localStorage.setItem(KEY, String(deadline))
    }
    const tick = () => {
      const rem = deadline - Date.now()
      if (rem <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 })
        clearInterval(id)
        return
      }
      setTimeLeft({
        d: Math.floor(rem / 86400000),
        h: Math.floor((rem % 86400000) / 3600000),
        m: Math.floor((rem % 3600000) / 60000),
        s: Math.floor((rem % 60000) / 1000)
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Fade-in on scroll via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const [loadingTier, setLoadingTier] = useState(null)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [pendingTier, setPendingTier] = useState(null)

  const handleCheckout = async (tier) => {
    if (!agreedTerms) {
      setPendingTier(tier)
      setShowTermsModal(true)
      return
    }
    setLoadingTier(tier)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier })
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Something went wrong. Please try again.')
        setLoadingTier(null)
      }
    } catch (err) {
      alert('Something went wrong. Please try again.')
      setLoadingTier(null)
    }
  }

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js?pixel_id=a2_is5chzhhi73u",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','a2_is5chzhhi73u');rdt('track', 'PageVisit');`
          }}
        />
        <style>{`
          @keyframes micPulse {
            0%   { box-shadow: 0 0 0 0 rgba(229, 57, 53, 0.6); }
            70%  { box-shadow: 0 0 0 8px rgba(229, 57, 53, 0); }
            100% { box-shadow: 0 0 0 0 rgba(229, 57, 53, 0); }
          }
          .fade-in {
            opacity: 0;
            transform: translateY(22px);
            transition: opacity 0.55s ease, transform 0.55s ease;
          }
          .fade-in-visible {
            opacity: 1;
            transform: translateY(0);
          }
          .card-hover {
            transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          }
          .card-hover:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 24px rgba(0,0,0,0.45);
          }
        `}</style>
        <title>Novo Navis | Custom AI Integration Reports for Small Business</title>
        <meta name="description" content="Tell us about your business and receive a custom AI integration report — up to 25 pages — built by our proprietary Small Psychological Model. Built and delivered in real time." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav>
        <Link href="/" className="nav-logo">NOVO NAVIS</Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/faq">FAQ</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div className="report-page">

        <h1 style={{fontWeight: 'bold'}}>
          <span style={{color: '#c8a96e', textShadow: '0 2px 8px rgba(200, 169, 110, 0.4)', display: 'block'}}>
            We UN-complicate AI for you. In about 12 minutes.
          </span>
          <span style={{color: '#d0d8e8', fontSize: '0.65em', fontWeight: 'normal', display: 'block', marginTop: '0.35em'}}>
            We tell you exactly which AI tools your business needs and how to get started — no tech background required.
          </span>
        </h1>

        <p style={{color: '#d0d8e8', fontSize: '1rem', lineHeight: '1.7', margin: '0.75rem 0 1.25rem 0'}}>
          No guessing. No googling. Just the specific tools that fit your workflows, your budget, and your industry.
        </p>

        <p style={{color: '#8a95aa', fontSize: '0.85rem', margin: '0 0 1.25rem 0'}}>
          <Link href="/about" style={{color: '#c8a96e'}}>Read our story →</Link>
        </p>

        <Image
          src="/jungle.png"
          alt="Business owner lost in a jungle of AI tools"
          width={700}
          height={700}
          priority
          sizes="609px"
          quality={60}
          style={{width: '100%', height: 'auto', borderRadius: '8px', margin: '0 0 1.5rem 0'}}
        />


        <div className="fade-in card-hover" style={{
          background: '#0d1221',
          border: '1px solid #1e2a45',
          borderRadius: '6px',
          padding: '1.25rem 1.5rem',
          margin: '1.25rem 0'
        }}>
          <p style={{color: '#d0d8e8', fontSize: '1rem', lineHeight: '1.8', margin: 0}}>
            There are over <strong style={{color: '#c8a96e'}}>16,000 AI tools</strong> out there. Nobody has time to sort through that — hire us for that. It's fast, safe and guaranteed.
          </p>
        </div>

        <div className="fade-in" style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0'}}>
          <div style={{background: '#0d1221', border: '1px solid #1e2a45', borderRadius: '6px', padding: '1.25rem 1.5rem'}}>
            <p style={{color: '#c8a96e', fontSize: '1rem', marginBottom: '0.5rem'}}>★★★★★ — Brian T.</p>
            <p style={{color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.7', margin: 0}}>
              When it comes to AI, there is no best technology, there is just best for you. I literally scoured the internet for weeks and never came close to getting the answer my company needed to integrate AI. Novo Navis gave us the entire answer...
            </p>
          </div>
          <div style={{background: '#0d1221', border: '1px solid #1e2a45', borderRadius: '6px', padding: '1.25rem 1.5rem'}}>
            <p style={{color: '#c8a96e', fontSize: '1rem', marginBottom: '0.5rem'}}>★★★★ — Kay W.</p>
            <p style={{color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.7', margin: 0}}>
              I run a small property management company that handles online rentals. I couldn't find a cost effective solution or product for my budget. Novo Navis uncovered AI tools for me that I never would have found on my own.
            </p>
          </div>
        </div>

        {/* SAMPLE REPORT PREVIEW */}
        <div style={{margin: '2rem 0'}}>
          <p style={{color: '#c8a96e', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.4rem'}}>
            Sample Report
          </p>
          <p style={{color: '#8a95aa', fontSize: '0.88rem', marginBottom: '0.75rem'}}>
            This is what you'll receive — scroll to read through it.
          </p>
          <div style={{position: 'relative'}}>
            <div style={{
              height: '420px',
              overflowY: 'scroll',
              background: '#060a12',
              border: '1px solid #1e2a45',
              borderRadius: '8px',
              padding: '1.5rem',
              WebkitOverflowScrolling: 'touch'
            }}>

              <p style={{color: '#ffffff', fontSize: '1.05rem', fontWeight: 'bold', lineHeight: '1.3', marginBottom: '0.25rem'}}>
                AI Integration Roadmap for Dental Practice Optimization
              </p>
              <p style={{color: '#5a6a7a', fontSize: '0.78rem', marginBottom: '1.5rem'}}>
                Novo Navis Cortex Report · April 2026 · Client: Jacquelyn Hurt, Wichita KS
              </p>

              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.6rem', marginBottom: '1.5rem'}}>
                {[['15–25%','No-Show Reduction'],['8–12 hrs','Admin Time / Week'],['$28K–$55K','Est. Annual Value']].map(([val, lbl]) => (
                  <div key={lbl} style={{background: '#0d1221', border: '1px solid #1e2a45', borderRadius: '4px', padding: '0.75rem', textAlign: 'center'}}>
                    <span style={{display: 'block', fontSize: '1.1rem', fontWeight: 'bold', color: '#c8a96e'}}>{val}</span>
                    <span style={{fontSize: '0.65rem', color: '#5a6a7a', textTransform: 'uppercase', letterSpacing: '0.06em'}}>{lbl}</span>
                  </div>
                ))}
              </div>

              <p style={{color: '#c8a96e', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', borderBottom: '1px solid #1e2a45', paddingBottom: '0.4rem', marginBottom: '0.75rem'}}>Executive Summary</p>
              <p style={{color: '#b0b8cc', fontSize: '0.88rem', lineHeight: '1.75', marginBottom: '0.8rem'}}>
                This report identifies a focused, three-phase AI integration strategy designed to reduce appointment no-shows by 15–25%, recover 8–12 hours of administrative time per week, and generate an estimated $28,000 to $55,000 in net annual value after accounting for implementation costs.
              </p>
              <p style={{color: '#b0b8cc', fontSize: '0.88rem', lineHeight: '1.75', marginBottom: '1rem'}}>
                The opportunity centers on three validated interventions: SMS-based appointment reminders (which engage 98% of patients within three minutes versus 20% for email), cloud-based practice management system migration, and AI-assisted scheduling optimization (which typically reduces manual scheduling overhead by 40–60%).
              </p>
              <div style={{background: '#0d1221', border: '1px solid #1e2a45', borderLeft: '3px solid #c8a96e', padding: '0.9rem 1.1rem', borderRadius: '4px', marginBottom: '1.5rem'}}>
                <p style={{color: '#b0b8cc', fontSize: '0.85rem', margin: 0}}><strong style={{color: '#c8a96e'}}>Caution flag:</strong> Implementation will occur across 90 days in three distinct phases. Total estimated investment is $8,600–$18,000 for the first year.</p>
              </div>

              <p style={{color: '#c8a96e', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', borderBottom: '1px solid #1e2a45', paddingBottom: '0.4rem', marginBottom: '0.75rem'}}>The AI Tools That Solve This</p>
              {[
                ['SMS Reminder Automation — Reminder Media / Weave / Native PMS Module', 'Reminder Media sends appointment reminders via SMS at 48h, 24h, and 4h intervals with one-tap rescheduling links. Pricing: $400–$800/month. If your cloud PMS includes native SMS (CareStack does), this cost is $0.'],
                ['Cloud Practice Management — Open Dental / CareStack / Curve Dental', 'Cloud PMS is the prerequisite enabling all downstream AI integrations. One-time migration: $8,000–$18,000. Monthly: $300–$700.'],
                ['AI Scheduling Optimization — SimplePractice / CareStack Integrated', 'Reduces manual scheduling overhead by 40–60%. Expected combined no-show reduction (with SMS): 15–35%.'],
                ['Insurance Claims Automation — DEFERRED', 'No quantified ROI data exists yet. Revisit at the 12-month mark if your rejection rate exceeds 12%.'],
              ].map(([title, body]) => (
                <div key={title} style={{background: '#0a0f1a', border: '1px solid #1e2a45', borderRadius: '4px', padding: '0.9rem 1.1rem', marginBottom: '0.75rem'}}>
                  <p style={{color: '#c8a96e', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.35rem'}}>{title}</p>
                  <p style={{color: '#8a95aa', fontSize: '0.83rem', lineHeight: '1.6', margin: 0}}>{body}</p>
                </div>
              ))}

              <p style={{color: '#c8a96e', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', borderBottom: '1px solid #1e2a45', paddingBottom: '0.4rem', marginBottom: '0.75rem', marginTop: '1.25rem'}}>Fast Action Implementation Plan</p>
              {[
                ['Phase 1 — Days 1–30: Cloud PMS Foundation', 'Select vendor, conduct 30-min discovery call, request references from 3 similar-sized practices. Do NOT sign a multi-year contract until migration succeeds.'],
                ['Phase 2 — Days 31–60: SMS Communication Automation', 'Activate native SMS module or deploy Reminder Media. Configure 48h / 24h / 4h reminder cadence. Monitor opt-out rates weekly — above 8% indicates messaging problems.'],
                ['Phase 3 — Days 61–90: Scheduling Optimization', 'Configure high-risk slot identification. Set overbooking at 10% for slots with >20% historical no-show rates. Expected staff time recovery: 6–10 hrs/week.'],
              ].map(([title, body]) => (
                <div key={title} style={{background: '#0a0f1a', border: '1px solid #1e2a45', borderRadius: '4px', padding: '0.9rem 1.1rem', marginBottom: '0.75rem'}}>
                  <p style={{color: '#c8a96e', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.35rem'}}>{title}</p>
                  <p style={{color: '#8a95aa', fontSize: '0.83rem', lineHeight: '1.6', margin: 0}}>{body}</p>
                </div>
              ))}

              <p style={{color: '#c8a96e', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', borderBottom: '1px solid #1e2a45', paddingBottom: '0.4rem', marginBottom: '0.75rem', marginTop: '1.25rem'}}>Financial ROI</p>
              <div style={{background: '#0d1221', border: '1px solid #1e2a45', borderLeft: '3px solid #c8a96e', padding: '0.9rem 1.1rem', borderRadius: '4px', marginBottom: '0.75rem'}}>
                <p style={{color: '#ffffff', fontSize: '0.88rem', margin: 0}}><strong>Year 1 Net ROI: $12,400–$84,000</strong> (30–210% depending on baseline metrics and vendor selection)</p>
              </div>
              <p style={{color: '#b0b8cc', fontSize: '0.88rem', lineHeight: '1.75', marginBottom: '0.75rem'}}>
                No-show reduction: A practice with 70 weekly appointments and $200 average appointment value recovering 4–9 appointments per week = $41,600–$93,600 annually. Staff time recovery: 8 hours/week at $25/hr = $10,400 annually.
              </p>
              <p style={{color: '#5a6a7a', fontSize: '0.8rem', fontStyle: 'italic'}}>
                Note: Overall confidence in this roadmap is 72%. Figures assume a single-provider practice with 70 weekly appointments.
              </p>

            </div>

            {/* Fade overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '80px',
              background: 'linear-gradient(to bottom, transparent, #060a12)',
              borderRadius: '0 0 8px 8px',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: '0.6rem'
            }}>
              <span style={{color: '#c8a96e', fontSize: '0.78rem', fontWeight: 'bold', letterSpacing: '0.1em'}}>↕ scroll inside to read</span>
            </div>
          </div>

          <p style={{textAlign: 'center', marginTop: '0.75rem'}}>
            <Link href="/david" style={{color: '#8a95aa', fontSize: '0.82rem', borderBottom: '1px solid #2a3a55', paddingBottom: '1px'}}>
              See David's full reasoning process behind this report →
            </Link>
          </p>
        </div>

        <div className="fade-in" style={{
          background: '#0d1221',
          border: '1px solid #1e2a45',
          borderLeft: '3px solid #c8a96e',
          borderRadius: '6px',
          padding: '1.25rem 1.5rem',
          margin: '1.25rem 0'
        }}>
          <p style={{color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.75', margin: '0 0 0.75rem 0'}}>
            Are you a contractor who needs to automate job costing? A dental practice losing patients to scheduling gaps? A property manager drowning in maintenance requests?
          </p>
          <p style={{color: '#c8a96e', fontSize: '0.95rem', fontWeight: 'bold', margin: 0}}>
            If you have a workflow, we know the tool that automates it.
          </p>
        </div>

        <p style={{color: '#d0d8e8', fontSize: '1rem', lineHeight: '1.7', margin: '1rem 0'}}>
          The answer exists. You just haven't had anyone find it for you yet.
        </p>


        <Image
          src="/flow.png"
          alt="From manual to AI-automated workflow — 3 step process"
          width={600}
          height={900}
          priority
          sizes="609px"
          quality={60}
          style={{width: '100%', height: 'auto', borderRadius: '8px', margin: '1.5rem 0'}}
        />

        <p className="lead">
          Most small business owners are losing about <strong style={{color: '#c8a96e'}}>11 hours every week</strong> to
          stuff AI could just handle for them. Your AI Blueprint tells you exactly which tasks those are —
          and exactly what to do about it.
        </p>
        <p style={{color: '#8a95aa', fontSize: '0.85rem', marginBottom: '1.5rem'}}>
          Are you an AI tool developer?{' '}
          <Link href="/tool-registration" style={{color: '#c8a96e'}}>Register your tool here →</Link>
        </p>


        {/* WHAT YOU'LL DISCOVER */}
        <div className="fade-in card-hover" style={{
          background: '#0d1221',
          border: '1px solid #1e2a45',
          borderRadius: '6px',
          padding: '1.25rem 1.5rem',
          margin: '1.5rem 0'
        }}>
          <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.75rem'}}>
            What your AI Blueprint includes
          </p>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.8'}}>
            <li>✓ &nbsp;The 3–5 tasks eating your time that AI can handle automatically</li>
            <li>✓ &nbsp;Specific AI tools matched to each one — and your budget</li>
            <li>✓ &nbsp;A fast action implementation plan</li>
            <li>✓ &nbsp;A straight answer on whether this will actually save you money</li>
            <li>✓ &nbsp;Fully automated — no human delay</li>
          </ul>
        </div>


        {/* NOT A TECH PERSON */}
        <div className="fade-in card-hover" style={{
          background: '#0d1221',
          border: '1px solid #1e2a45',
          borderLeft: '3px solid #4caf50',
          borderRadius: '6px',
          padding: '1.25rem 1.5rem',
          margin: '1.5rem 0'
        }}>
          <p style={{color: '#4caf50', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.5rem'}}>
            You don't need to be a tech person
          </p>
          <p style={{color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.7', margin: 0}}>
            Every recommendation in your AI Blueprint comes with plain-English implementation steps,
            approximate costs, and a realistic estimate of how long setup takes.
            If you can send an email, you can implement what we recommend.
          </p>
        </div>

        {/* SEE HOW IT THINKS */}
        <Link href="/david" style={{textDecoration: 'none', display: 'block'}}>
          <div className="fade-in card-hover" style={{
            background: '#0d1221',
            border: '1px solid #1e2a45',
            borderLeft: '3px solid #c8a96e',
            borderRadius: '6px',
            padding: '1.25rem 1.5rem',
            margin: '1.5rem 0',
            cursor: 'pointer'
          }}>
            <p style={{color: '#8a95aa', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem'}}>
              How the analysis works
            </p>
            <p style={{color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.7', margin: '0 0 0.5rem 0'}}>
              Our Small Psychological Model draws upon the same resources and tools enterprise-level
              business consultants use — live market data, industry benchmarks, causal reasoning
              frameworks — at micro business prices.
            </p>
            <span style={{color: '#c8a96e', fontSize: '0.9rem', fontWeight: 'bold'}}>
              See how it works →
            </span>
          </div>
        </Link>


        <p style={{color: '#c8a96e', fontSize: '1rem', fontStyle: 'italic', textAlign: 'center', margin: '1.5rem 0'}}>
          You wouldn't build a house without a blueprint. Don't implement AI without yours.
        </p>

        <p style={{textAlign: 'center', marginBottom: '1.25rem'}}>
          <Link href="/diy-guide" style={{color: '#8a95aa', fontSize: '0.88rem', borderBottom: '1px solid #2a3a55', paddingBottom: '1px'}}>
            Can we offer you some free integration tips before you leave? →
          </Link>
        </p>

        <div className="fade-in" id="order-form">

          {/* MONEY BACK GUARANTEE */}
          <div style={{
            background: '#0a1a0a',
            border: '2px solid #4caf50',
            borderRadius: '8px',
            padding: '1rem 1.5rem',
            margin: '0 0 1.25rem 0',
            textAlign: 'center'
          }}>
            <p style={{color: '#4caf50', fontSize: '1rem', fontWeight: 'bold', margin: '0 0 0.25rem 0'}}>
              ✓ 100% Money-Back Guarantee
            </p>
            <p style={{color: '#a0c8a0', fontSize: '0.88rem', margin: 0}}>
              Not satisfied with your report? We'll refund you in full — no questions asked.
            </p>
          </div>

          {/* TERMS CHECKBOX */}
          <div style={{
            background: '#0d1221',
            border: '1px solid #1e2a45',
            borderRadius: '6px',
            padding: '1rem 1.5rem',
            margin: '0 0 1.25rem 0'
          }}>
            <label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer'}}>
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                style={{marginTop: '3px', width: '18px', height: '18px', flexShrink: 0, cursor: 'pointer'}}
              />
              <span style={{color: '#d0d8e8', fontSize: '0.9rem', lineHeight: '1.5'}}>
                I agree to the{' '}
                <Link href="/terms" style={{color: '#c8a96e'}}>Terms and Conditions</Link>
              </span>
            </label>
          </div>

          {/* PRICING CARDS */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem'}}>

            {/* STARTER */}
            <div style={{
              background: '#0d1221',
              border: '1px solid #1e2a45',
              borderRadius: '8px',
              padding: '1.25rem 1.5rem',
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
                <div>
                  <p style={{color: '#c8a96e', fontWeight: 'bold', fontSize: '1rem', margin: 0}}>Starter</p>
                  <p style={{color: '#8a95aa', fontSize: '0.8rem', margin: '0.15rem 0 0 0'}}>Single workflow analysis</p>
                </div>
                <p style={{color: '#d0d8e8', fontWeight: 'bold', fontSize: '1.4rem', margin: 0}}>$49</p>
              </div>
              <ul style={{listStyle: 'none', padding: 0, margin: '0 0 1rem 0', color: '#8a95aa', fontSize: '0.85rem', lineHeight: '1.8'}}>
                <li>✓ &nbsp;5-page report</li>
                <li>✓ &nbsp;Identifies AI tools and workflows</li>
                <li>✓ &nbsp;Implementation guidance</li>
                <li>✗ &nbsp;No ROI estimates</li>
                <li>✓ &nbsp;Built in real time</li>
                <li><span style={{color: '#4caf50'}}>✓</span> &nbsp;100% money-back guarantee</li>
              </ul>
              <button
                onClick={() => handleCheckout('starter')}
                disabled={loadingTier !== null}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'linear-gradient(to bottom, #FFD814, #FFA41C)',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#111111',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                {loadingTier === 'starter' ? 'Redirecting...' : 'Get Starter Report — $49'}
              </button>
            </div>

            {/* BLUEPRINT — RECOMMENDED */}
            <div style={{
              background: '#0a1221',
              border: '2px solid #c8a96e',
              borderRadius: '8px',
              padding: '1.25rem 1.5rem',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#c8a96e',
                color: '#111',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0.2rem 0.9rem',
                borderRadius: '20px'
              }}>Most Popular</div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
                <div>
                  <p style={{color: '#c8a96e', fontWeight: 'bold', fontSize: '1rem', margin: 0}}>Blueprint</p>
                  <p style={{color: '#8a95aa', fontSize: '0.8rem', margin: '0.15rem 0 0 0'}}>Full AI integration report</p>
                </div>
                <p style={{color: '#d0d8e8', fontWeight: 'bold', fontSize: '1.4rem', margin: 0}}>$199</p>
              </div>
              <ul style={{listStyle: 'none', padding: 0, margin: '0 0 1rem 0', color: '#d0d8e8', fontSize: '0.85rem', lineHeight: '1.8'}}>
                <li>✓ &nbsp;Up to 25-page report</li>
                <li>✓ &nbsp;Identifies AI tools and workflows</li>
                <li>✓ &nbsp;Implementation guidance</li>
                <li>✓ &nbsp;ROI estimates</li>
                <li>✓ &nbsp;Built in real time</li>
                <li><span style={{color: '#4caf50'}}>✓</span> &nbsp;100% money-back guarantee</li>
              </ul>
              <button
                onClick={() => handleCheckout('blueprint')}
                disabled={loadingTier !== null}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'linear-gradient(to bottom, #FFD814, #FFA41C)',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#111111',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                {loadingTier === 'blueprint' ? 'Redirecting...' : 'Get My AI Blueprint — $199'}
              </button>
            </div>

            {/* BLUEPRINT + CONSULT */}
            <div style={{
              background: '#0d1221',
              border: '1px solid #1e2a45',
              borderRadius: '8px',
              padding: '1.25rem 1.5rem',
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
                <div>
                  <p style={{color: '#c8a96e', fontWeight: 'bold', fontSize: '1rem', margin: 0}}>Blueprint + Consult</p>
                  <p style={{color: '#8a95aa', fontSize: '0.8rem', margin: '0.15rem 0 0 0'}}>Report plus 2-hour Zoom session</p>
                </div>
                <p style={{color: '#d0d8e8', fontWeight: 'bold', fontSize: '1.4rem', margin: 0}}>$499</p>
              </div>
              <ul style={{listStyle: 'none', padding: 0, margin: '0 0 1rem 0', color: '#8a95aa', fontSize: '0.85rem', lineHeight: '1.8'}}>
                <li>✓ &nbsp;Up to 25-page report</li>
                <li>✓ &nbsp;Identifies AI tools and workflows</li>
                <li>✓ &nbsp;Implementation guidance</li>
                <li>✓ &nbsp;ROI estimates</li>
                <li>✓ &nbsp;Built in real time</li>
                <li>✓ &nbsp;2-hour Zoom with Eric Johnston</li>
                <li><span style={{color: '#4caf50'}}>✓</span> &nbsp;100% money-back guarantee</li>
              </ul>
              <button
                onClick={() => handleCheckout('consult')}
                disabled={loadingTier !== null}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'linear-gradient(to bottom, #FFD814, #FFA41C)',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#111111',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                {loadingTier === 'consult' ? 'Redirecting...' : 'Get Blueprint + Consult — $499'}
              </button>
            </div>


          </div>

          {/* TRUST SIGNALS */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center',
            marginBottom: '1.25rem'
          }}>
            {['🔒 Secured by Stripe', '📬 Built and delivered in real time', '🚫 Never sold or shared'].map(label => (
              <span key={label} style={{
                background: '#0d1221',
                border: '1px solid #1e2a45',
                borderRadius: '4px',
                padding: '0.3rem 0.75rem',
                color: '#8a95aa',
                fontSize: '0.8rem'
              }}>{label}</span>
            ))}
          </div>


        </div>

        <hr className="divider" />

        <div style={{textAlign: 'center', padding: '1rem 0'}}>
          <p style={{color: '#8a95aa', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
            Want to talk to a real person before you claim your AI Blueprint?
          </p>
          <p style={{color: '#ffffff', fontSize: '1rem', marginBottom: '0.3rem'}}>
            Call us: <a href="tel:6234289308" style={{color: '#c8a96e', fontWeight: 'bold'}}>(623) 428-9308</a>
          </p>
          <p style={{color: '#8a95aa', fontSize: '0.85rem'}}>
            Or email: <a href="mailto:support@novonavis.com" style={{color: '#c8a96e'}}>support@novonavis.com</a>
          </p>
        </div>

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/#order-form">Get Your AI Blueprint</Link> &nbsp;·&nbsp;
          <Link href="/faq">FAQ</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link> &nbsp;·&nbsp;
          <Link href="/privacy">Privacy Policy</Link> &nbsp;·&nbsp;
          <Link href="/terms">Terms and Conditions</Link>
        </p>
      </footer>

      {/* TERMS MODAL */}
      {showTermsModal && (
        <div
          onClick={() => setShowTermsModal(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0d1221', border: '1px solid #1e2a45',
              borderRadius: '8px', padding: '2rem',
              maxWidth: '420px', width: '100%'
            }}
          >
            <h3 style={{color: '#d0d8e8', marginBottom: '0.75rem', fontSize: '1.1rem'}}>
              One quick step
            </h3>
            <p style={{color: '#8a95aa', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: '1.6'}}>
              Please accept the Terms and Conditions before continuing.
            </p>
            <label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', marginBottom: '1.5rem'}}>
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                style={{marginTop: '3px', width: '18px', height: '18px', flexShrink: 0, cursor: 'pointer'}}
              />
              <span style={{color: '#d0d8e8', fontSize: '0.9rem', lineHeight: '1.5'}}>
                I agree to the{' '}
                <Link href="/terms" style={{color: '#c8a96e'}} target="_blank">Terms and Conditions</Link>
              </span>
            </label>
            <div style={{display: 'flex', gap: '0.75rem'}}>
              <button
                onClick={() => setShowTermsModal(false)}
                style={{
                  flex: 1, padding: '0.65rem',
                  background: 'transparent', border: '1px solid #1e2a45',
                  borderRadius: '6px', color: '#8a95aa',
                  cursor: 'pointer', fontSize: '0.9rem'
                }}
              >Cancel</button>
              <button
                disabled={!agreedTerms || loadingTier !== null}
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
                  cursor: agreedTerms ? 'pointer' : 'not-allowed'
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
