import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'

export default function SampleAnalysis() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [listeningField, setListeningField] = useState(null)
  const recognitionRef = useRef(null)
  const [formData, setFormData] = useState({
    email: '',
    workflow: ''
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

    // Toggle off if already listening to this field
    if (listeningField === fieldName) {
      recognitionRef.current?.stop()
      setListeningField(null)
      return
    }

    // Stop any existing session
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
    setLoading(true)

    try {
      const res = await fetch('/api/sample', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (res.status === 429 || data.error === 'rate_limited') {
        alert('You\'ve already used your free analysis today. Come back tomorrow for another one, or get the full up to 25-page report below.')
        setLoading(false)
        return
      }
      if (data.analysis) {
        sessionStorage.setItem('sampleAnalysis', data.analysis)
        sessionStorage.setItem('sampleName', data.name)
        if (data.emailError) {
          console.warn('Notification email failed:', data.emailError)
        }
        router.push('/results')
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
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
        <title>Free AI Workflow Analysis | Novo Navis</title>
        <meta name="description" content="Describe one workflow problem in your business and get a free AI integration recommendation from Novo Navis. No credit card required." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @keyframes micPulse {
            0%   { box-shadow: 0 0 0 0 rgba(229, 57, 53, 0.6); }
            70%  { box-shadow: 0 0 0 8px rgba(229, 57, 53, 0); }
            100% { box-shadow: 0 0 0 0 rgba(229, 57, 53, 0); }
          }
        `}</style>
      </Head>

      <nav>
        <Link href="/" className="nav-logo">NOVO NAVIS</Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/#order-form">Get Your Report</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div className="report-page">

        <div style={{
          background: '#0d1a0d',
          border: '2px solid #4caf50',
          borderRadius: '8px',
          padding: '1rem 1.5rem',
          margin: '0 0 1.5rem 0',
          textAlign: 'center'
        }}>
          <p style={{color: '#4caf50', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 'bold', margin: 0}}>
            Free — No Credit Card Required
          </p>
        </div>

        <h1 style={{color: '#c8a96e', fontWeight: 'bold', textShadow: '0 2px 8px rgba(200, 169, 110, 0.4)'}}>
          Get a Free AI Analysis of Your Biggest Workflow Problem
        </h1>

        <p style={{color: '#4caf50', fontWeight: 'bold', fontSize: '1.1rem', margin: '-0.5rem 0 0.75rem 0'}}>
          60 seconds here returns 60 minutes of your time tomorrow.
        </p>

        <p style={{textAlign: 'center', marginBottom: '1.5rem'}}>
          <Link href="/david" style={{color: '#8a95aa', fontSize: '0.85rem', borderBottom: '1px solid #2a3a55', paddingBottom: '1px'}}>
            Curious how the analysis works? See David's reasoning process →
          </Link>
        </p>

        <p className="lead">
          Describe one repetitive process that's eating your time. Our AI will analyze it
          and tell you exactly which tools can automate it — and how much time you'll get back.
          Takes 60 seconds. Results delivered instantly.
        </p>

        <div style={{
          background: '#0d1221',
          border: '1px solid #1e2a45',
          borderRadius: '6px',
          padding: '1.25rem 1.5rem',
          margin: '1.5rem 0'
        }}>
          <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.75rem'}}>
            What you'll get
          </p>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.8'}}>
            <li>✓ &nbsp;Specific AI tools that solve your exact problem</li>
            <li>✓ &nbsp;Realistic time savings estimate</li>
            <li>✓ &nbsp;Approximate cost to implement</li>
            <li>✓ &nbsp;Delivered instantly — no waiting</li>
          </ul>
        </div>

        <p style={{color: '#8a95aa', fontSize: '0.85rem', marginBottom: '1rem'}}>
          🎤 Tap the microphone next to any field to speak your answer.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Your Email Address * (results delivered here)</label>
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
            <label>Describe your biggest workflow problem *</label>
            <div style={{display: 'flex', gap: '0.5rem', alignItems: 'flex-start'}}>
              <textarea
                name="workflow"
                required
                value={formData.workflow}
                onChange={handleChange}
                rows={5}
                placeholder="Example: Every morning I spend 90 minutes manually entering the previous day's job tickets into our billing system. We do about 15 jobs a day and each ticket has to be copied from our scheduling app into QuickBooks one by one."
                style={{flex: 1}}
              />
              <MicButton fieldName="workflow" />
            </div>
          </div>

          <p style={{color: '#8a95aa', fontSize: '0.85rem', marginTop: '-0.5rem', marginBottom: '1.5rem'}}>
            The more specific you are, the more useful your analysis will be.
          </p>

          {listeningField && (
            <p style={{color: '#e53935', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold'}}>
              🔴 Listening... speak now. Tap the mic again to stop.
            </p>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: '100%',
              fontSize: '1.1rem',
              padding: '1rem',
              background: '#4caf50',
              borderColor: '#4caf50'
            }}
            disabled={loading}
          >
            {loading ? 'Analyzing your workflow...' : 'Get My Free Analysis →'}
          </button>

          <p style={{textAlign: 'center', color: '#8a95aa', fontSize: '0.85rem', marginTop: '1rem'}}>
            Free. No credit card. No obligation.
          </p>
          <p style={{textAlign: 'center', color: '#8a95aa', fontSize: '0.85rem', marginTop: '0.25rem'}}>
            We will never sell or share your information.{' '}
            <Link href="/privacy" style={{color: '#c8a96e'}}>Read our Privacy Policy →</Link>
          </p>

        </form>

        <hr className="divider" />

        <div style={{textAlign: 'center', padding: '1rem 0'}}>
          <p style={{color: '#8a95aa', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
            Ready for the full report?
          </p>
          <Link href="/#order-form" style={{color: '#c8a96e', fontWeight: 'bold'}}>
            Get the complete up to 25-page AI integration report — $49 →
          </Link>
        </div>

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
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
