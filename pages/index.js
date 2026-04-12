import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [agreedTerms, setAgreedTerms] = useState(false)
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
        `}</style>
        <title>Novo Navis | Custom AI Integration Reports for Small Business</title>
        <meta name="description" content="Tell us about your business and receive a custom AI integration report — up to 25 pages — built by our proprietary Small Psychological Model. Delivered in 24 hours." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

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

        <h1 style={{color: '#c8a96e', fontWeight: 'bold', textShadow: '0 2px 8px rgba(200, 169, 110, 0.4)'}}>You're paying your team to do work AI does for free. We'll show you exactly where.</h1>

        <p className="lead">
          The average small business loses <strong style={{color: '#c8a96e'}}>11 hours a week</strong> to
          repetitive tasks AI handles automatically. Your report shows you exactly which ones —
          and exactly what to do about it.
        </p>
        <p style={{color: '#8a95aa', fontSize: '0.85rem', marginTop: '-0.5rem', marginBottom: '1.5rem'}}>
          U.S. &amp; Canadian customers only.
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
              Get My Free Analysis →
            </span>
          </div>
          <p style={{color: '#8a95aa', fontSize: '0.85rem', margin: '0.5rem 0 0 0', textAlign: 'center'}}>
            No credit card · 2 fields · Instant results
          </p>
        </Link>

        {/* WHAT YOU'LL DISCOVER */}
        <div style={{
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
            <li>✓ &nbsp;Your top 3–5 automatable workflows, ranked by estimated time savings</li>
            <li>✓ &nbsp;Specific AI tools matched to each workflow and your budget</li>
            <li>✓ &nbsp;A prioritized 90-day implementation roadmap</li>
            <li>✓ &nbsp;An honest ROI estimate for your specific business size and industry</li>
            <li>✓ &nbsp;Human review by an AI consultant before delivery</li>
          </ul>
        </div>

        {/* METHODOLOGY */}
        <div style={{
          background: '#0a0f1a',
          border: '1px solid #1e2a45',
          borderRadius: '6px',
          padding: '1.25rem 1.5rem',
          margin: '1.5rem 0'
        }}>
          <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.5rem'}}>
            How it works
          </p>
          <p style={{color: '#8a95aa', fontSize: '0.9rem', lineHeight: '1.7', margin: 0}}>
            Our Small Psychological Model (SPM) analyzes your specific workflows against known AI
            automation profiles across industries including trades, professional services, retail,
            healthcare, and construction. It ranks automatable tasks by estimated time savings and
            implementation complexity, then builds a roadmap specific to your business.
            Every report is reviewed by a human AI consultant before it reaches your inbox.
          </p>
        </div>

        {/* SEE HOW IT THINKS */}
        <Link href="/david" style={{textDecoration: 'none', display: 'block'}}>
          <div style={{
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

        <div style={{
          background: '#0d1a0d',
          border: '2px solid #4caf50',
          borderRadius: '6px',
          padding: '1rem 1.5rem',
          margin: '1.5rem 0',
          textAlign: 'center'
        }}>
          <p style={{color: '#8a95aa', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
            Want to see what a real report looks like before you buy?
          </p>
          <Link href="/sample" style={{color: '#4caf50', fontWeight: 'bold'}}>
            Read a real report for a plumbing company →
          </Link>
          <p style={{marginTop: '0.75rem', marginBottom: 0}}>
            <Link href="/faq" style={{color: '#8a95aa', fontSize: '0.85rem'}}>
              Have questions? Read the FAQ →
            </Link>
          </p>
        </div>

        {/* PRICE BOX */}
        <div style={{
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
            <span style={{color: '#c8a96e', fontSize: '2.5rem', fontWeight: 'bold'}}>$288</span>
          </div>
          <p style={{color: '#8a95aa', fontSize: '0.85rem', margin: '0 0 0.4rem 0'}}>
            One report. Your business. 24-hour delivery.
          </p>
          <p style={{color: '#8a95aa', fontSize: '0.8rem', margin: 0}}>
            Most AI consultants charge $300–$500 per hour. This report is $288 and yours to keep.
          </p>
        </div>

        <p style={{color: '#8a95aa', fontSize: '0.8rem', textAlign: 'center', marginBottom: '1rem'}}>
          Novo Navis will never sell or share your information.{' '}
          <Link href="/privacy" style={{color: '#c8a96e'}}>Read our Privacy Policy →</Link>
        </p>

        {/* FOUNDER CREDENTIAL */}
        <div style={{
          background: '#0a0f1a',
          border: '1px solid #1e2a45',
          borderRadius: '6px',
          padding: '1.25rem 1.5rem',
          margin: '0 0 1.75rem 0',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem'
        }}>
          <div style={{flexShrink: 0, width: '44px', height: '44px', borderRadius: '50%', background: '#1e2a45', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'}}>
            EJ
          </div>
          <div>
            <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.3rem'}}>
              Who builds your report
            </p>
            <p style={{color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.6', margin: 0}}>
              <strong>Eric Johnston</strong> is a Principal Investigator on active U.S. Department of Defense AI research projects.
              The same analytical frameworks used in defense-grade AI assessments are what power every Novo Navis report —
              applied to the operational realities of small and mid-size businesses.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} id="order-form">

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
            {loading ? 'Redirecting to Checkout...' : 'Get My Report — $288'}
          </button>

          <p style={{textAlign: 'center', color: '#4a5568', fontSize: '0.85rem', marginTop: '1rem'}}>
            Secured by Stripe. $288 — custom report, up to 25 pages.
            Delivered to your email within 24 hours.
            Not satisfied? We'll refund you in full — no questions asked.
          </p>

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
