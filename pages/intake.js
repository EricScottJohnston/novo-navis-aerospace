import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

export default function Intake() {
  const router = useRouter()
  const { session_id } = router.query

  const [sessionData, setSessionData] = useState(null)
  const [sessionError, setSessionError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [listeningField, setListeningField] = useState(null)
  const recognitionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    industry: '',
    employees: '',
    budget: '',
    businessDescription: '',
    currentTools: '',
    process1: '',
    process2: '',
    process3: '',
    goal: ''
  })

  useEffect(() => {
    if (!router.isReady) return
    if (!session_id) {
      router.replace('/')
      return
    }
    fetch(`/api/session?id=${session_id}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setSessionError(true)
        } else {
          setSessionData(data)
        }
      })
      .catch(() => setSessionError(true))
  }, [router.isReady, session_id])

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
    setSubmitting(true)

    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session_id, ...formData })
      })
      const data = await res.json()
      if (data.success) {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion_event_purchase_1')
        }
        router.push('/track/' + data.orderId)
      } else {
        alert('Something went wrong submitting your intake. Please email support@novonavis.com.')
        setSubmitting(false)
      }
    } catch (err) {
      alert('Something went wrong. Please email support@novonavis.com.')
      setSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Complete Your Intake | Novo Navis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: `(function(w, d, t, u, o) {w[u] = w[u] || [], o.ts = (new Date).getTime();var n = d.createElement(t);n.src = "https://bat.bing.net/bat.js?ti=" + o.ti + ("uetq" != u ? "&q=" + u : ""),n.async = 1, n.onload = n.onreadystatechange = function() {var s = this.readyState;s && "loaded" !== s && "complete" !== s ||(o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad"),n.onload = n.onreadystatechange = null)};var i = d.getElementsByTagName(t)[0];i.parentNode.insertBefore(n, i);})(window, document, "script", "uetq", {ti: "343243587",enableAutoSpaTracking: true});` }} />
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
          <li><Link href="/#order-form">Get Your AI Blueprint</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div className="report-page">

        {sessionError ? (
          <div style={{textAlign: 'center', padding: '3rem 0'}}>
            <p style={{color: '#e57373', marginBottom: '1rem'}}>
              We could not verify your payment session.
            </p>
            <p style={{color: '#8a95aa', fontSize: '0.9rem', marginBottom: '1.5rem'}}>
              If you completed checkout, please email us at{' '}
              <a href="mailto:support@novonavis.com" style={{color: '#c8a96e'}}>support@novonavis.com</a>{' '}
              or call <a href="tel:6234289308" style={{color: '#c8a96e'}}>(623) 428-9308</a> and we'll get your intake sorted.
            </p>
          </div>
        ) : (
          <>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
              <div style={{fontSize: '2rem', marginBottom: '0.75rem'}}>✓</div>
              <h1 style={{marginBottom: '0.5rem'}}>
                Payment confirmed
                {sessionData?.name ? `, ${sessionData.name.split(' ')[0]}` : ''}.
              </h1>
              <p className="lead" style={{marginBottom: '0'}}>
                Now tell us about {sessionData?.business || 'your business'} so we can build your AI Blueprint.
                The more specific you are, the more valuable Your AI Blueprint will be.
              </p>
            </div>

            {!sessionData && !sessionError && (
              <p style={{textAlign: 'center', color: '#8a95aa', marginBottom: '2rem'}}>
                Verifying your payment...
              </p>
            )}

            {sessionData && (
              <form onSubmit={handleSubmit}>

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

                <div className="form-group">
                  <label>Industry *</label>
                  <select
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleChange}
                  >
                    <option value="">Select your industry</option>
                    <option value="HVAC / Plumbing / Electrical">HVAC / Plumbing / Electrical</option>
                    <option value="Landscaping / Field Services">Landscaping / Field Services</option>
                    <option value="Legal Services">Legal Services</option>
                    <option value="Accounting / Finance">Accounting / Finance</option>
                    <option value="Dental / Chiropractic / Healthcare">Dental / Chiropractic / Healthcare</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Property Management">Property Management</option>
                    <option value="Retail / E-commerce">Retail / E-commerce</option>
                    <option value="Restaurant / Hospitality">Restaurant / Hospitality</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Construction">Construction</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Number of Employees</label>
                  <select
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                  >
                    <option value="">Select range</option>
                    <option value="Just me">Just me</option>
                    <option value="2-5">2 to 5</option>
                    <option value="6-15">6 to 15</option>
                    <option value="16-50">16 to 50</option>
                    <option value="50+">50 or more</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Monthly budget for new software tools *</label>
                  <select
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select your budget</option>
                    <option value="Under $50/month">Under $50 / month</option>
                    <option value="$50–$200/month">$50 – $200 / month</option>
                    <option value="$200–$500/month">$200 – $500 / month</option>
                    <option value="$500+/month">$500+ / month</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tell us about your business — what it does, who it serves, and anything you think we should know *</label>
                  <div style={{display: 'flex', gap: '0.5rem', alignItems: 'flex-start'}}>
                    <textarea
                      name="businessDescription"
                      required
                      value={formData.businessDescription}
                      onChange={handleChange}
                      placeholder="Example: We are a family owned plumbing company serving the Phoenix metro area. We have 3 trucks and handle both residential and commercial work. We do about 15 jobs per week and our busiest season is summer."
                      style={{flex: 1}}
                    />
                    <MicButton fieldName="businessDescription" />
                  </div>
                </div>

                <div className="form-group">
                  <label>What software tools do you currently use in your business?</label>
                  <div style={{display: 'flex', gap: '0.5rem', alignItems: 'flex-start'}}>
                    <textarea
                      name="currentTools"
                      value={formData.currentTools}
                      onChange={handleChange}
                      placeholder="Example: QuickBooks, Google Workspace, Jobber, Microsoft 365, Slack, etc. List anything you use regularly — even basic tools like Excel or Gmail."
                      style={{flex: 1}}
                    />
                    <MicButton fieldName="currentTools" />
                  </div>
                </div>

                <hr className="divider" />

                <p style={{color: '#8a95aa', fontSize: '0.95rem', marginBottom: '1.5rem'}}>
                  Now tell us about your biggest operational pain points.
                </p>

                <div className="form-group">
                  <label>Most Repetitive Task #1 — What is it and how long does it take per week? *</label>
                  <div style={{display: 'flex', gap: '0.5rem', alignItems: 'flex-start'}}>
                    <textarea
                      name="process1"
                      required
                      value={formData.process1}
                      onChange={handleChange}
                      placeholder="Example: Our office manager manually enters every job request into a spreadsheet, then texts the crew lead to check availability. Takes about 2 hours a day."
                      style={{flex: 1}}
                    />
                    <MicButton fieldName="process1" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Most Repetitive Task #2 — What is it and how long does it take per week?</label>
                  <div style={{display: 'flex', gap: '0.5rem', alignItems: 'flex-start'}}>
                    <textarea
                      name="process2"
                      value={formData.process2}
                      onChange={handleChange}
                      placeholder="Example: We create invoices manually in Word at the end of every job. Takes 20-30 minutes per invoice."
                      style={{flex: 1}}
                    />
                    <MicButton fieldName="process2" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Most Repetitive Task #3 — What is it and how long does it take per week?</label>
                  <div style={{display: 'flex', gap: '0.5rem', alignItems: 'flex-start'}}>
                    <textarea
                      name="process3"
                      value={formData.process3}
                      onChange={handleChange}
                      placeholder="Example: Following up with leads who haven't responded. We do this manually by email and it often falls through the cracks."
                      style={{flex: 1}}
                    />
                    <MicButton fieldName="process3" />
                  </div>
                </div>

                <div className="form-group">
                  <label>What is the single biggest operational problem in your business right now? *</label>
                  <div style={{display: 'flex', gap: '0.5rem', alignItems: 'flex-start'}}>
                    <textarea
                      name="goal"
                      required
                      value={formData.goal}
                      onChange={handleChange}
                      placeholder="Example: We're losing jobs because we're too slow to respond to new inquiries. By the time we follow up, they've already hired someone else."
                      style={{flex: 1}}
                    />
                    <MicButton fieldName="goal" />
                  </div>
                </div>

                <p style={{color: '#8a95aa', fontSize: '0.85rem', marginBottom: '1rem'}}>
                  🎤 Tap the microphone next to any field to speak your answer.
                </p>

                {listeningField && (
                  <p style={{color: '#e53935', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold'}}>
                    🔴 Listening... speak now. Tap the mic again to stop.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  style={{width: '100%', fontSize: '1.1rem', padding: '1rem'}}
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit My Intake — Start Building My Report'}
                </button>

                <p style={{textAlign: 'center', color: '#4a5568', fontSize: '0.85rem', marginTop: '1rem'}}>
                  Your AI Blueprint will be built and delivered to your email in real time.
                </p>

              </form>
            )}
          </>
        )}

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/privacy">Privacy Policy</Link> &nbsp;·&nbsp;
          <Link href="/terms">Terms and Conditions</Link>
        </p>
      </footer>
    </>
  )
}
