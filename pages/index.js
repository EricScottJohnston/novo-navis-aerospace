import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)
  const [listeningField, setListeningField] = useState(null)
  const recognitionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const startVoice = (fieldName) => {
    if (typeof window === 'undefined') return
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser. Please use Chrome.')
      return
    }

    if (listeningField === fieldName) {
      recognitionRef.current?.stop()
      setListeningField(null)
      return
    }

    recognitionRef.current?.stop()

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      setFormData(prev => ({
        ...prev,
        [fieldName]: prev[fieldName] ? prev[fieldName] + ' ' + transcript : transcript
      }))
    }

    recognition.onend = () => setListeningField(null)
    recognition.onerror = () => setListeningField(null)

    recognitionRef.current = recognition
    recognition.start()
    setListeningField(fieldName)
  }

  const MicButton = ({ fieldName }) => {
    const active = listeningField === fieldName
    return (
      <button
        type="button"
        onClick={() => startVoice(fieldName)}
        title={active ? 'Stop listening' : 'Tap to speak'}
        style={{
          flexShrink: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: active ? '2px solid #e53935' : '2px solid #1e2a45',
          background: active ? '#1a0000' : '#0d1221',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
          padding: 0,
          animation: active ? 'micPulse 1s ease-in-out infinite' : 'none',
          transition: 'border-color 0.2s'
        }}
      >
        {active ? '🔴' : '🎤'}
      </button>
    )
  }

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
    if (!agreedTerms) {
      alert('You must agree to the Terms and Conditions to continue.')
      return
    }
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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
            background: '#c8a96e',
            color: '#0a0f1a',
            borderRadius: '20px',
            padding: '0.4rem 1.1rem',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}>Get My Report — $199</Link>
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
            You've spent hours trying to figure out which AI tools work for your business.
          </span>
          <span style={{color: '#d0d8e8', fontSize: '0.65em', fontWeight: 'normal', display: 'block', marginTop: '0.35em'}}>
            We'll tell you in one day.
          </span>
        </h1>

        <p style={{color: '#d0d8e8', fontSize: '1rem', lineHeight: '1.7', margin: '0.75rem 0 1.25rem 0'}}>
          No guessing. No googling. Just the specific tools that fit your workflows, your budget, and your industry.
        </p>

        <p style={{color: '#8a95aa', fontSize: '0.85rem', margin: '0 0 1.25rem 0'}}>
          <Link href="/about" style={{color: '#c8a96e'}}>Read our story →</Link>
        </p>

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
          <p style={{color: '#8a95aa', fontSize: '0.9rem', fontStyle: 'italic', margin: '1rem 0 0 0'}}>
            That's what we're selling.
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

        {/* PRIMARY FREE CTA */}
        <Link href="/sample-analysis" style={{textDecoration: 'none', display: 'block', margin: '1.5rem 0'}}>
          <div style={{
            background: '#4caf50',
            borderRadius: '6px',
            padding: '1rem 1.5rem',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            <span style={{color: '#fff', fontSize: '1.15rem', fontWeight: 'bold'}}>
              Find My AI Tools — It's Free
            </span>
          </div>
          <p style={{color: '#8a95aa', fontSize: '0.85rem', margin: '0.5rem 0 0 0', textAlign: 'center'}}>
            No credit card · 2 fields · Instant results
          </p>
        </Link>

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
          stuff AI could just handle for them. Your report tells you exactly which tasks those are —
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
            What your report includes
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
            Every recommendation in your report comes with plain-English implementation steps,
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

        {/* FREE SAMPLE CTA */}
        <Link href="/sample-analysis" style={{textDecoration: 'none', display: 'block'}}>
          <div className="fade-in card-hover" style={{
            background: '#0d1a0d',
            border: '2px solid #4caf50',
            borderRadius: '6px',
            padding: '1.25rem 1.5rem',
            margin: '1.5rem 0',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            <p style={{color: '#d0d8e8', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 'bold'}}>
              Want to see it in action before you buy?
            </p>
            <span style={{color: '#4caf50', fontWeight: 'bold', fontSize: '0.95rem'}}>
              Try it here — free, no credit card →
            </span>
          </div>
        </Link>

        {/* PRICE BOX */}
        <div className="fade-in card-hover" style={{
          background: '#0f0d00',
          border: '2px solid #c8a96e',
          borderRadius: '8px',
          padding: '1.5rem',
          margin: '1.5rem 0',
          textAlign: 'center'
        }}>
          <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 'bold'}}>
            Full Custom Report — Up to 25 Pages
          </p>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem'}}>
            <span style={{color: '#c8a96e', fontSize: '2.5rem', fontWeight: 'bold'}}>$199</span>
          </div>
          <p style={{color: '#8a95aa', fontSize: '0.85rem', margin: '0 0 0.4rem 0'}}>
            One report. Your business. 24-hour delivery.
          </p>
          <p style={{color: '#8a95aa', fontSize: '0.8rem', margin: 0}}>
            Most AI consultants charge $300–$500 per hour. This report is $199 and yours to keep.
          </p>
        </div>

        <p style={{color: '#8a95aa', fontSize: '0.8rem', textAlign: 'center', marginBottom: '1rem'}}>
          Novo Navis will never sell or share your information.{' '}
          <Link href="/privacy" style={{color: '#c8a96e'}}>Read our Privacy Policy →</Link>
        </p>

        <form className="fade-in" onSubmit={handleSubmit} id="order-form">

          <div className="form-group">
            <label>Your Full Name *</label>
            <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Smith"
                style={{flex: 1}}
              />
              <MicButton fieldName="name" />
            </div>
          </div>

          <div className="form-group">
            <label>Your Email Address * (report delivered here)</label>
            <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@yourbusiness.com"
                style={{flex: 1}}
              />
              <MicButton fieldName="email" />
            </div>
          </div>

          <div className="form-group">
            <label>Business Name *</label>
            <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
              <input
                type="text"
                name="business"
                required
                value={formData.business}
                onChange={handleChange}
                placeholder="Smith Plumbing LLC"
                style={{flex: 1}}
              />
              <MicButton fieldName="business" />
            </div>
          </div>

          <p style={{color: '#8a95aa', fontSize: '0.85rem', marginTop: '-0.5rem', marginBottom: '1.5rem'}}>
            After checkout you'll complete a short intake form with your business details.
            Your report is built from that — so the more specific you are there, the better your report.
          </p>

          <p style={{color: '#8a95aa', fontSize: '0.85rem', marginBottom: '1rem'}}>
            🎤 Tap the microphone next to any field to speak your answer.
          </p>

          {listeningField && (
            <p style={{color: '#e53935', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold'}}>
              🔴 Listening... speak now. Tap the mic again to stop.
            </p>
          )}

          {/* TERMS AND CONDITIONS CHECKBOX */}
          <div style={{
            background: '#0d1221',
            border: '1px solid #1e2a45',
            borderRadius: '6px',
            padding: '1rem 1.5rem',
            margin: '1.5rem 0'
          }}>
            <label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer'}}>
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                style={{marginTop: '3px', width: '18px', height: '18px', flexShrink: 0, cursor: 'pointer'}}
              />
              <span style={{color: '#ffffff', fontSize: '0.9rem', lineHeight: '1.5'}}>
                I agree to the{' '}
                <Link href="/terms" style={{color: '#c8a96e'}}>Terms and Conditions</Link>
                {' '}and understand this report is provided for informational purposes only. Novo Navis is not liable for any business decisions made based on this report.
              </span>
            </label>
          </div>

          {/* TRUST SIGNALS ABOVE SUBMIT */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            {['🔒 TLS encrypted', '🚫 Never sold or shared', '✅ 100% satisfaction guarantee'].map(label => (
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
              opacity: agreedTerms ? 1 : 0.5,
              cursor: agreedTerms ? 'pointer' : 'not-allowed',
              background: '#4caf50',
              borderColor: '#4caf50'
            }}
            disabled={loading || !agreedTerms}
          >
            {loading ? 'Redirecting to Checkout...' : 'Get My Report — $199'}
          </button>

          <p style={{textAlign: 'center', color: '#4a5568', fontSize: '0.85rem', marginTop: '1rem'}}>
            Secured by Stripe. $199 — custom report, up to 25 pages.
            Delivered to your email within 24 hours.
            Not satisfied? We'll refund you in full — no questions asked.
          </p>

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

        </form>

        <hr className="divider" />

        <div style={{textAlign: 'center', padding: '1rem 0'}}>
          <p style={{color: '#8a95aa', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
            Want to talk to a real person before you claim your report?
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
          <Link href="/#order-form">Get Your Report</Link> &nbsp;·&nbsp;
          <Link href="/faq">FAQ</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link> &nbsp;·&nbsp;
          <Link href="/privacy">Privacy Policy</Link> &nbsp;·&nbsp;
          <Link href="/terms">Terms and Conditions</Link>
        </p>
      </footer>
    </>
  )
}
