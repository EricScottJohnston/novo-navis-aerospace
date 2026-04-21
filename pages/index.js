import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'


export default function Home() {
  const [loading, setLoading] = useState(false)
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
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

  // Sticky bar — show after scrolling past the hero
  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 480)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Something went wrong. Please try again.')
        setLoading(false)
      }
    } catch (err) {
      alert('Something went wrong. Please try again.')
      setLoading(false)
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
          @keyframes stickySlideUp {
            from { opacity: 0; transform: translateX(-50%) translateY(12px); }
            to   { opacity: 1; transform: translateX(-50%) translateY(0); }
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
        <meta name="description" content="Tell us about your business and receive a custom AI integration report — up to 25 pages — built by our proprietary Small Psychological Model. Delivered within 24 hours." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {showStickyBar && (
        <div style={{
          position: 'fixed',
          bottom: '88px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999,
          display: 'flex',
          gap: '0.5rem',
          background: '#0a0f1a',
          border: '1px solid #2a3a5a',
          borderRadius: '40px',
          padding: '0.45rem 0.6rem',
          boxShadow: '0 4px 28px rgba(0,0,0,0.65)',
          animation: 'stickySlideUp 0.3s ease',
          whiteSpace: 'nowrap'
        }}>
          <Link href="/sample-analysis" style={{
            background: '#4caf50',
            color: '#fff',
            borderRadius: '20px',
            padding: '0.4rem 1.1rem',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}>Try It Free →</Link>
          <Link href="/#order-form" style={{
            background: 'linear-gradient(to bottom, #FFD814, #FFA41C)',
            color: '#111111',
            borderRadius: '20px',
            padding: '0.4rem 1.1rem',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}>Get My AI Blueprint — $199</Link>
        </div>
      )}

      <nav>
        <Link href="/" className="nav-logo">NOVO NAVIS</Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/sample-analysis">Try It Free</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div className="report-page">

        <h1 style={{fontWeight: 'bold'}}>
          <span style={{color: '#c8a96e', textShadow: '0 2px 8px rgba(200, 169, 110, 0.4)', display: 'block'}}>
            That annoying manual task you do every day?
          </span>
          <span style={{color: '#d0d8e8', fontSize: '0.65em', fontWeight: 'normal', display: 'block', marginTop: '0.35em'}}>
            We'll find the AI tool that makes it go away.
          </span>
        </h1>

        <p style={{color: '#d0d8e8', fontSize: '1rem', lineHeight: '1.7', margin: '0.75rem 0 1.25rem 0'}}>
          No guessing. No googling. Just the specific tools that fit your workflows, your budget, and your industry.
        </p>

        <p style={{color: '#8a95aa', fontSize: '0.85rem', margin: '0 0 1.25rem 0'}}>
          <Link href="/about" style={{color: '#c8a96e'}}>Read our story →</Link>
        </p>

        <Image
          src="/flow.png"
          alt="From manual to AI-automated workflow — 3 step process"
          width={600}
          height={900}
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
            There are over <strong style={{color: '#c8a96e'}}>16,000 AI tools</strong> out there. Nobody has time to sort through that — and honestly, you shouldn't have to. Some of the tools that would actually help your business are ones you've never heard of. Some are ones you already pay for but aren't using right. Figuring out which is which takes serious research. We've automated that research. For $199, we'll tell you exactly what applies to your specific situation — nothing more, nothing less.
          </p>
        </div>

        <div className="fade-in" style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0'}}>
          <div style={{background: '#0d1221', border: '1px solid #1e2a45', borderRadius: '6px', padding: '1.25rem 1.5rem'}}>
            <p style={{color: '#c8a96e', fontSize: '1rem', marginBottom: '0.5rem'}}>★★★★★ — Brian T.</p>
            <p style={{color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.7', margin: 0}}>
              When it comes to AI, there is no best technology, there is just best for you. I literally scoured the internet for weeks and never came close to getting the answer my company needed to integrate AI. Novo Navis gave us the entire answer in less than a day.
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
          src="/Drowning.jpg"
          alt="Business owner overwhelmed by AI tools"
          width={700}
          height={700}
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
            <li>✓ &nbsp;Human review by an AI consultant before delivery</li>
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

        <form className="fade-in" onSubmit={handleSubmit} id="order-form">

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
              Not satisfied with your AI Blueprint? We'll refund you in full — no questions asked.
            </p>
          </div>

          {/* TERMS CHECKBOX */}
          <div style={{
            background: '#0d1221',
            border: '1px solid #1e2a45',
            borderRadius: '6px',
            padding: '1rem 1.5rem',
            margin: '0 0 1rem 0'
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

          {/* TRUST SIGNALS */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            {['🔒 Secured by Stripe', '📬 Delivered within 24 hours', '🚫 Never sold or shared'].map(label => (
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

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: '100%',
              fontSize: '1.1rem',
              padding: '1rem',
              background: 'linear-gradient(to bottom, #FFD814, #FFA41C)',
              borderColor: '#e8a000',
              color: '#111111',
              opacity: agreedTerms ? 1 : 0.5,
              cursor: agreedTerms ? 'pointer' : 'not-allowed'
            }}
            disabled={loading || !agreedTerms}
          >
            {loading ? 'Redirecting to Checkout...' : 'Get My AI Blueprint — $199'}
          </button>

          {timeLeft !== null && (
            <div style={{
              background: 'linear-gradient(135deg, #00081a, #000e22)',
              border: '1px solid #1a6abd',
              borderRadius: '8px',
              padding: '1rem 1.25rem',
              margin: '1.5rem 0 0 0',
              textAlign: 'center'
            }}>
              <p style={{color: '#4a9af0', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 0.4rem 0'}}>
                ⚠ Price Increase Notice
              </p>
              <p style={{color: '#d0d8e8', fontSize: '0.92rem', margin: '0 0 0.75rem 0'}}>
                Current price of <strong style={{color: '#4caf50'}}>$199</strong> increases to <strong style={{color: '#4a9af0'}}>$499</strong> when this timer expires
              </p>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '0.4rem'}}>
                {[
                  [timeLeft.d, 'Days'],
                  [timeLeft.h, 'Hrs'],
                  [timeLeft.m, 'Min'],
                  [timeLeft.s, 'Sec'],
                ].map(([val, label], i) => (
                  <div key={label} style={{display: 'flex', alignItems: 'flex-start', gap: '0.4rem'}}>
                    <div style={{textAlign: 'center'}}>
                      <div style={{
                        background: '#0a0f1a',
                        border: '1px solid #1a6abd',
                        borderRadius: '6px',
                        padding: '0.35rem 0.6rem',
                        minWidth: '42px'
                      }}>
                        <span style={{color: '#4a9af0', fontSize: '1.4rem', fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: '0.05em'}}>
                          {String(val).padStart(2, '0')}
                        </span>
                      </div>
                      <span style={{color: '#7a8599', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
                        {label}
                      </span>
                    </div>
                    {i < 3 && (
                      <span style={{color: '#1a6abd', fontSize: '1.4rem', fontWeight: 'bold', paddingTop: '0.25rem', lineHeight: 1}}>:</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FREE TRIAL CTA — after buy button */}
          <div style={{margin: '1.5rem 0 0 0', textAlign: 'center'}}>
            <p style={{color: '#8a95aa', fontSize: '0.88rem', marginBottom: '0.6rem'}}>
              Not ready to commit? Try it free first.
            </p>
            <Link href="/sample-analysis" style={{textDecoration: 'none', display: 'block'}}>
              <div style={{
                background: '#0d1a0d',
                border: '1px solid #4caf50',
                borderRadius: '6px',
                padding: '0.85rem 1.5rem',
                textAlign: 'center',
                cursor: 'pointer'
              }}>
                <span style={{color: '#4caf50', fontSize: '1rem', fontWeight: 'bold'}}>
                  Find My AI Tools — It's Free →
                </span>
              </div>
              <p style={{color: '#5a6a7a', fontSize: '0.82rem', margin: '0.4rem 0 0 0', textAlign: 'center'}}>
                No credit card · instant results
              </p>
            </Link>
          </div>

        </form>

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
          <Link href="/sample-analysis">Try It Free</Link> &nbsp;·&nbsp;
          <Link href="/#order-form">Get Your AI Blueprint</Link> &nbsp;·&nbsp;
          <Link href="/faq">FAQ</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link> &nbsp;·&nbsp;
          <Link href="/privacy">Privacy Policy</Link> &nbsp;·&nbsp;
          <Link href="/terms">Terms and Conditions</Link>
        </p>
      </footer>
    </>
  )
}
