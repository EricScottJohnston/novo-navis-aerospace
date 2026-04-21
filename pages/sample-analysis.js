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
    setLoading(true)

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (res.status === 429 || data.error === 'rate_limited') {
        alert('You\'ve already used your free analysis.')
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
        <title>Fix Your Most Annoying Manual Task — Free | Novo Navis</title>
        <meta name="description" content="Tell us the most annoying thing you have to do manually and we'll tell you exactly which AI tool can eliminate it. Free, instant, no credit card." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @keyframes micPulse {
            0%   { box-shadow: 0 0 0 0 rgba(229, 57, 53, 0.6); }
            70%  { box-shadow: 0 0 0 8px rgba(229, 57, 53, 0); }
            100% { box-shadow: 0 0 0 0 rgba(229, 57, 53, 0); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(8px); }
          }
        `}</style>
      </Head>

      <nav>
        <Link href="/" className="nav-logo">NOVO NAVIS</Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/#order-form">Get Your AI Blueprint</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div className="report-page">

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 2rem 0'}}>
          <button onClick={() => window.scrollBy({top: 300, behavior: 'smooth'})} style={{background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', animation: 'bounce 1.4s ease-in-out infinite'}}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
          <p style={{color: '#4caf50', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 'bold', margin: 0}}>
            Free — No Credit Card Required
          </p>
          <button onClick={() => window.scrollBy({top: 300, behavior: 'smooth'})} style={{background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', animation: 'bounce 1.4s ease-in-out infinite'}}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>What's the most ANNOYING thing you have to do manually in your business? *</label>
            <div style={{display: 'flex', gap: '0.5rem', alignItems: 'flex-start'}}>
              <textarea
                name="workflow"
                required
                value={formData.workflow}
                onChange={handleChange}
                rows={5}
                placeholder="Example: Every time we finish a job I have to manually type it into QuickBooks. It's tedious and I hate it."
                style={{flex: 1}}
              />
              <MicButton fieldName="workflow" />
            </div>
          </div>

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
            {loading ? 'Finding your fix...' : 'Show Me the Fix →'}
          </button>

          <p style={{textAlign: 'center', color: '#8a95aa', fontSize: '0.85rem', marginTop: '1rem'}}>
            Free. No credit card. No email required. Instant results.
          </p>

        </form>

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
    </>
  )
}
