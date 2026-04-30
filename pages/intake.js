import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'

const STEPS = [
  { num: 1, label: 'Your Business' },
  { num: 2, label: 'About You'     },
  { num: 3, label: 'What to Fix'   },
  { num: 4, label: 'Wrap Up'       },
]

export default function Intake() {
  const router = useRouter()
  const { session_id, tier } = router.query
  const isFree = !!tier && !session_id

  // $99 starter: 1 automation field. $299 blueprint: 5 automation fields.
  const taskCount = tier === 'starter' ? 1 : 5

  const [sessionData,    setSessionData]   = useState(null)
  const [sessionError,   setSessionError]  = useState(false)
  const [submitting,     setSubmitting]    = useState(false)
  const [agreedTerms,    setAgreedTerms]   = useState(false)
  const [listeningField, setListeningField] = useState(null)
  const [currentStep,    setCurrentStep]   = useState(1)
  const [stepError,      setStepError]     = useState('')
  const recognitionRef = useRef(null)
  const topRef = useRef(null)

  // Email verification state (free flow only)
  const [verifyEmail,   setVerifyEmail]   = useState('')
  const [codeSent,      setCodeSent]      = useState(false)
  const [codeInput,     setCodeInput]     = useState('')
  const [emailVerified, setEmailVerified] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [verifyError,   setVerifyError]   = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    industry: '',
    otherIndustry: '',
    employees: '',
    budget: '',
    businessDescription: '',
    currentTools: '',
    process1: '',
    process2: '',
    process3: '',
    process4: '',
    process5: '',
    goal: '',
  })

  useEffect(() => {
    if (!router.isReady) return
    if (!session_id && !tier) { router.replace('/'); return }
    if (session_id) {
      fetch(`/api/session?id=${session_id}`)
        .then(r => r.json())
        .then(data => { if (data.error) setSessionError(true); else setSessionData(data) })
        .catch(() => setSessionError(true))
    }
  }, [router.isReady, session_id, tier])

  // Scroll to top of form on step change
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [currentStep])

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setStepError('')
  }

  // ── Voice input ───────────────────────────────────────────────────────────
  const startVoice = (fieldName) => {
    if (typeof window === 'undefined') return
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { alert('Voice input is not supported in this browser. Please use Chrome.'); return }
    if (listeningField === fieldName) { recognitionRef.current?.stop(); setListeningField(null); return }
    recognitionRef.current?.stop()
    const rec = new SR()
    rec.continuous = false; rec.interimResults = false; rec.lang = 'en-US'
    rec.onresult = (e) => {
      const t = e.results[0][0].transcript
      setFormData(prev => ({ ...prev, [fieldName]: prev[fieldName] ? prev[fieldName] + ' ' + t : t }))
    }
    rec.onend = () => setListeningField(null)
    rec.onerror = () => setListeningField(null)
    recognitionRef.current = rec
    rec.start()
    setListeningField(fieldName)
  }

  const MicButton = ({ fieldName }) => {
    const active = listeningField === fieldName
    return (
      <button type="button" onClick={() => startVoice(fieldName)}
        title={active ? 'Stop listening' : 'Tap to speak'}
        style={{
          flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%',
          border: active ? '2px solid #e53935' : '2px solid #d0d4de',
          background: active ? '#fff0f0' : '#f8f9fc',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '1rem', padding: 0,
          animation: active ? 'micPulse 1s ease-in-out infinite' : 'none',
          transition: 'border-color 0.2s',
        }}>
        {active ? '🔴' : '🎤'}
      </button>
    )
  }

  // ── Email verification ────────────────────────────────────────────────────
  const handleSendCode = async () => {
    if (!verifyEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(verifyEmail)) {
      setVerifyError('Please enter a valid email address.'); return
    }
    setVerifyLoading(true); setVerifyError('')
    try {
      const res  = await fetch('/api/verify-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'send', email: verifyEmail }) })
      const data = await res.json()
      if (data.success) { setCodeSent(true); setFormData(prev => ({ ...prev, email: verifyEmail })) }
      else setVerifyError(data.error || 'Failed to send code. Please try again.')
    } catch { setVerifyError('Something went wrong. Please try again.') }
    setVerifyLoading(false)
  }

  const handleVerifyCode = async () => {
    if (!codeInput.trim()) { setVerifyError('Please enter the code.'); return }
    setVerifyLoading(true); setVerifyError('')
    try {
      const res  = await fetch('/api/verify-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'verify', email: verifyEmail, code: codeInput.trim() }) })
      const data = await res.json()
      if (data.success) setEmailVerified(true)
      else setVerifyError(data.error || 'Incorrect code. Please try again.')
    } catch { setVerifyError('Something went wrong. Please try again.') }
    setVerifyLoading(false)
  }

  // ── Step validation ───────────────────────────────────────────────────────
  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.business.trim()) return 'Please enter your business name.'
      if (!formData.industry)        return 'Please select your industry.'
      if (formData.industry === 'Other' && !formData.otherIndustry.trim()) return 'Please describe your industry.'
    }
    if (step === 2) {
      if (!formData.businessDescription.trim()) return 'Please tell us about your business.'
    }
    if (step === 3) {
      if (!formData.goal.trim())     return 'Please describe your biggest operational problem.'
      if (!formData.process1.trim()) return 'Please describe at least one task to automate.'
    }
    if (step === 4) {
      if (!formData.name.trim()) return 'Please enter your full name.'
      if (!formData.budget)      return 'Please select a monthly budget.'
      if (!agreedTerms)          return 'Please agree to the Terms and Conditions.'
    }
    return null
  }

  const handleNext = () => {
    const err = validateStep(currentStep)
    if (err) { setStepError(err); return }
    setStepError('')
    setCurrentStep(s => s + 1)
  }

  const handleBack = () => {
    setStepError('')
    setCurrentStep(s => s - 1)
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validateStep(4)
    if (err) { setStepError(err); return }
    setSubmitting(true)

    const industryValue = formData.industry === 'Other' && formData.otherIndustry
      ? `Other: ${formData.otherIndustry}`
      : formData.industry

    try {
      const payload = isFree
        ? { tier, ...formData, industry: industryValue }
        : { sessionId: session_id, ...formData, industry: industryValue }

      const res  = await fetch('/api/intake', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()

      if (data.error === 'rate_limited') {
        alert('You already submitted a report request in the last 24 hours. Check your inbox for your preview, or call (623) 428-9308 if you need help.')
        setSubmitting(false); return
      }
      if (data.success) {
        if (!isFree && typeof window !== 'undefined' && window.gtag) window.gtag('event', 'conversion_event_purchase_1')
        if (typeof window !== 'undefined') { window.uetq = window.uetq || []; window.uetq.push('event', 'submit_lead_form', {}) }
        router.push('/track/' + data.orderId)
      } else {
        alert('Something went wrong submitting your intake. Please email support@novonavis.com.')
        setSubmitting(false)
      }
    } catch {
      alert('Something went wrong. Please email support@novonavis.com.')
      setSubmitting(false)
    }
  }

  const tierLabel = tier === 'starter' ? 'Single Workflow Blueprint' : 'AI Blueprint'

  const taskFields = [
    { key: 'process1', num: 1, required: true },
    { key: 'process2', num: 2, required: taskCount >= 2 },
    { key: 'process3', num: 3, required: false },
    { key: 'process4', num: 4, required: false },
    { key: 'process5', num: 5, required: false },
  ].slice(0, taskCount)

  const optional = (n) => n > 2

  // ── Step indicator ────────────────────────────────────────────────────────
  const StepIndicator = () => (
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '2rem' }}>
      {STEPS.map((step, i) => {
        const done   = currentStep > step.num
        const active = currentStep === step.num
        return (
          <div key={step.num} style={{ display: 'flex', alignItems: 'flex-start', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
              <div style={{
                width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.78rem', fontWeight: '700',
                background: done ? GOLD : active ? NAVY : '#e8ebf2',
                color: done ? '#111' : active ? '#fff' : '#9aa5b4',
                border: active ? `2px solid ${NAVY}` : done ? `2px solid ${GOLD}` : '2px solid #e8ebf2',
                transition: 'all 0.25s ease',
              }}>
                {done ? '✓' : step.num}
              </div>
              <span style={{
                fontSize: '0.62rem', fontWeight: active ? '700' : '500',
                color: active ? NAVY : done ? '#6b7a99' : '#b0b8cc',
                textAlign: 'center', whiteSpace: 'nowrap', maxWidth: '60px',
              }}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                flex: 1, height: '2px', marginTop: '14px', marginLeft: '4px', marginRight: '4px',
                background: done ? GOLD : '#e8ebf2',
                transition: 'background 0.25s ease',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )

  // ── Nav buttons ───────────────────────────────────────────────────────────
  const NavButtons = ({ isSubmit = false }) => (
    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem' }}>
      {currentStep > 1 && (
        <button type="button" onClick={handleBack}
          style={{
            flex: '0 0 auto', padding: '0.85rem 1.4rem',
            background: 'none', border: '2px solid #d0d4de',
            borderRadius: '8px', color: '#6b7a99',
            fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer',
          }}>
          ← Back
        </button>
      )}
      {isSubmit ? (
        <button type="submit" className="btn-primary"
          style={{ flex: 1, fontSize: '1.05rem', padding: '0.9rem' }}
          disabled={submitting || !agreedTerms}>
          {submitting ? 'Submitting...' : 'Submit — Build My Blueprint →'}
        </button>
      ) : (
        <button type="button" onClick={handleNext}
          style={{
            flex: 1, padding: '0.9rem',
            background: NAVY, color: '#fff', border: 'none',
            borderRadius: '8px', fontWeight: '700',
            fontSize: '1.05rem', cursor: 'pointer',
          }}>
          Continue →
        </button>
      )}
    </div>
  )

  const showForm = (isFree || sessionData) && (!isFree || emailVerified)

  return (
    <>
      <Head>
        <title>Complete Your Intake | Novo Navis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: `(function(w, d, t, u, o) {w[u] = w[u] || [], o.ts = (new Date).getTime();var n = d.createElement(t);n.src = "https://bat.bing.net/bat.js?ti=" + o.ti + ("uetq" != u ? "&q=" + u : ""),n.async = 1, n.onload = n.onreadystatechange = function() {var s = this.readyState;s && "loaded" !== s && "complete" !== s ||(o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad"),n.onload = n.onreadystatechange = null)};var i = d.getElementsByTagName(t)[0];i.parentNode.insertBefore(n, i);})(window, document, "script", "uetq", {ti: "343243587",enableAutoSpaTracking: true});` }} />
        <style>{`
          @keyframes micPulse {
            0%   { box-shadow: 0 0 0 0 rgba(229,57,53,0.6); }
            70%  { box-shadow: 0 0 0 8px rgba(229,57,53,0); }
            100% { box-shadow: 0 0 0 0 rgba(229,57,53,0); }
          }
          @keyframes stepFadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .step-panel { animation: stepFadeIn 0.2s ease both; }
          .report-page { background: #ffffff !important; }
          .report-page h1 { color: ${NAVY} !important; }
          .lead { color: #4a5568 !important; }
          .form-group label { color: #1a1a2e !important; font-weight: 600; }
          .form-group input, .form-group textarea, .form-group select {
            background-color: #ffffff !important; color: #1a1a2e !important;
            border: 1px solid #d0d4de !important;
          }
          .form-group input::placeholder, .form-group textarea::placeholder { color: #9aa5b4 !important; }
          .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
            border-color: ${GOLD} !important; outline: none;
          }
          .form-group select option { color: #1a1a2e; background: #ffffff; }
          .divider { border-color: #e0e4ef !important; }
          footer { color: #6b7a99 !important; }
          footer a { color: ${GOLD} !important; }
        `}</style>
      </Head>

      <nav>
        <Link href="/" className="nav-logo">NOVO NAVIS</Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/faq">FAQ</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div className="report-page" ref={topRef}>

        {sessionError ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p style={{ color: '#c0392b', marginBottom: '1rem' }}>We could not verify your payment session.</p>
            <p style={{ color: '#6b7a99', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              If you completed checkout, please email us at{' '}
              <a href="mailto:support@novonavis.com" style={{ color: GOLD }}>support@novonavis.com</a>{' '}
              or call <a href="tel:6234289308" style={{ color: GOLD }}>(623) 428-9308</a>.
            </p>
          </div>
        ) : (
          <>
            {/* ── Header ── */}
            <div style={{ marginBottom: '1.75rem' }}>
              <p style={{ color: GOLD, fontSize: '0.72rem', fontWeight: 'bold', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                {isFree ? tierLabel : 'AI Blueprint'}
              </p>
              <h1 style={{ marginBottom: '0.5rem' }}>
                {isFree
                  ? `Let's build your ${tierLabel}.`
                  : `Payment confirmed${sessionData?.name ? `, ${sessionData.name.split(' ')[0]}` : ''}.`}
              </h1>
              <p className="lead" style={{ marginBottom: '0.4rem' }}>
                {isFree
                  ? 'Tell us about your business so we can build your custom AI Blueprint.'
                  : `Tell us about ${sessionData?.business || 'your business'} so we can build your AI Blueprint.`}
              </p>
              <p style={{ color: '#6b7a99', fontSize: '0.88rem', fontStyle: 'italic', marginBottom: 0 }}>
                This takes about 3 minutes. The more specific you are, the more accurate your blueprint.
              </p>
            </div>

            {!isFree && !sessionData && !sessionError && (
              <p style={{ textAlign: 'center', color: '#8a95aa', marginBottom: '2rem' }}>Verifying your payment...</p>
            )}

            {/* ── Email verification gate (free flow only) ── */}
            {isFree && !emailVerified && (
              <div style={{ marginBottom: '2rem' }}>
                <p style={{ color: NAVY, fontWeight: '600', marginBottom: '0.5rem' }}>
                  Your blueprint will be sent to this email — let's make sure we have it right.
                </p>
                <p style={{ color: '#6b7a99', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
                  We'll send a quick 6-digit code so we know your inbox is real.
                </p>
                <p style={{ color: '#4a5568', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '1.25rem' }}>
                  We will never sell or share your information.
                </p>

                {!codeSent ? (
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <input type="email" value={verifyEmail} onChange={e => setVerifyEmail(e.target.value)}
                      placeholder="you@yourbusiness.com"
                      style={{ flex: 1, minWidth: '200px', background: '#ffffff', color: '#1a1a2e', border: '1px solid #d0d4de', borderRadius: '6px', padding: '0.65rem 0.85rem', fontSize: '1rem' }} />
                    <button type="button" onClick={handleSendCode} disabled={verifyLoading}
                      style={{ background: NAVY, color: '#fff', border: 'none', borderRadius: '6px', padding: '0.65rem 1.25rem', fontWeight: 'bold', fontSize: '0.95rem', cursor: verifyLoading ? 'not-allowed' : 'pointer', opacity: verifyLoading ? 0.6 : 1 }}>
                      {verifyLoading ? 'Sending...' : 'Send Code'}
                    </button>
                  </div>
                ) : (
                  <div>
                    <p style={{ color: '#4a5568', fontSize: '0.88rem', marginBottom: '0.75rem' }}>
                      Code sent to <strong>{verifyEmail}</strong>. Check your inbox.
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <input type="text" value={codeInput} onChange={e => setCodeInput(e.target.value)}
                        placeholder="6-digit code" maxLength={6}
                        style={{ width: '140px', background: '#ffffff', color: '#1a1a2e', border: '1px solid #d0d4de', borderRadius: '6px', padding: '0.65rem 0.85rem', fontSize: '1.1rem', letterSpacing: '0.2em', textAlign: 'center' }} />
                      <button type="button" onClick={handleVerifyCode} disabled={verifyLoading}
                        style={{ background: GOLD, color: '#111', border: 'none', borderRadius: '6px', padding: '0.65rem 1.25rem', fontWeight: 'bold', fontSize: '0.95rem', cursor: verifyLoading ? 'not-allowed' : 'pointer', opacity: verifyLoading ? 0.6 : 1 }}>
                        {verifyLoading ? 'Verifying...' : 'Verify'}
                      </button>
                      <button type="button" onClick={() => { setCodeSent(false); setCodeInput(''); setVerifyError('') }}
                        style={{ background: 'none', border: 'none', color: '#8a95aa', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}>
                        Use a different email
                      </button>
                    </div>
                  </div>
                )}
                {verifyError && <p style={{ color: '#c0392b', fontSize: '0.88rem', marginTop: '0.6rem' }}>{verifyError}</p>}
              </div>
            )}

            {/* ── Multi-step form ── */}
            {showForm && (
              <form onSubmit={handleSubmit}>

                <StepIndicator />

                {/* ────────────────────────────────────────────────────────
                    STEP 1 — Business basics
                    Fields: business name, industry, employees
                ──────────────────────────────────────────────────────── */}
                {currentStep === 1 && (
                  <div className="step-panel">
                    <p style={{ color: '#4a5568', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                      Let's start with the basics — just three quick fields.
                    </p>

                    <div className="form-group">
                      <label>Business Name *</label>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input type="text" name="business" value={formData.business} onChange={handleChange}
                          placeholder="Smith Plumbing LLC" style={{ flex: 1 }} />
                        <MicButton fieldName="business" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Industry *</label>
                      <select name="industry" value={formData.industry} onChange={handleChange}>
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

                    {formData.industry === 'Other' && (
                      <div className="form-group">
                        <label>Describe your industry *</label>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <input type="text" name="otherIndustry" value={formData.otherIndustry} onChange={handleChange}
                            placeholder="e.g. Mold remediation, pet grooming, photography..." style={{ flex: 1 }} />
                          <MicButton fieldName="otherIndustry" />
                        </div>
                      </div>
                    )}

                    <div className="form-group">
                      <label>Number of Employees</label>
                      <select name="employees" value={formData.employees} onChange={handleChange}>
                        <option value="">Select range</option>
                        <option value="Just me">Just me</option>
                        <option value="2-5">2 to 5</option>
                        <option value="6-15">6 to 15</option>
                        <option value="16-50">16 to 50</option>
                        <option value="50+">50 or more</option>
                      </select>
                    </div>

                    {stepError && <p style={{ color: '#c0392b', fontSize: '0.88rem', marginTop: '0.5rem' }}>{stepError}</p>}
                    <NavButtons />
                  </div>
                )}

                {/* ────────────────────────────────────────────────────────
                    STEP 2 — About the business
                    Fields: businessDescription, currentTools
                ──────────────────────────────────────────────────────── */}
                {currentStep === 2 && (
                  <div className="step-panel">
                    <p style={{ color: '#4a5568', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                      Tell us what your business does. Voice input works great here — just tap the mic and talk.
                    </p>

                    <div className="form-group">
                      <label>Tell us about your business — what it does, who it serves, and anything you think we should know *</label>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <textarea name="businessDescription" value={formData.businessDescription} onChange={handleChange}
                          placeholder="Example: We are a family owned plumbing company serving the Phoenix metro area. We have 3 trucks and handle both residential and commercial work. We do about 15 jobs per week and our busiest season is summer."
                          style={{ flex: 1 }} />
                        <MicButton fieldName="businessDescription" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>What software tools do you currently use in your business?</label>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <textarea name="currentTools" value={formData.currentTools} onChange={handleChange}
                          placeholder="Example: QuickBooks, Google Workspace, Jobber, Microsoft 365, Slack, etc. List anything you use regularly — even basic tools like Excel or Gmail."
                          style={{ flex: 1 }} />
                        <MicButton fieldName="currentTools" />
                      </div>
                    </div>

                    {listeningField && (
                      <p style={{ color: '#e53935', fontSize: '0.85rem', textAlign: 'center', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        🔴 Listening... speak now. Tap the mic again to stop.
                      </p>
                    )}
                    <p style={{ color: '#6b7a99', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                      🎤 Tap the microphone next to any field to speak your answer.
                    </p>

                    {stepError && <p style={{ color: '#c0392b', fontSize: '0.88rem', marginTop: '0.5rem' }}>{stepError}</p>}
                    <NavButtons />
                  </div>
                )}

                {/* ────────────────────────────────────────────────────────
                    STEP 3 — What to fix
                    Fields: goal (biggest problem), automation tasks
                ──────────────────────────────────────────────────────── */}
                {currentStep === 3 && (
                  <div className="step-panel">
                    <p style={{ color: '#4a5568', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                      This is the most important step — what's broken, and what do you want automated?
                    </p>

                    <div className="form-group">
                      <label>What is the single biggest operational problem in your business right now? *</label>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <textarea name="goal" value={formData.goal} onChange={handleChange}
                          placeholder="Example: We're losing jobs because we're too slow to respond to new inquiries. By the time we follow up, they've already hired someone else."
                          style={{ flex: 1 }} />
                        <MicButton fieldName="goal" />
                      </div>
                    </div>

                    <hr className="divider" style={{ margin: '1.5rem 0' }} />
                    <p style={{ color: '#4a5568', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                      Now, what do you want to automate?
                    </p>

                    {taskFields.map(({ key, num, required }) => (
                      <div className="form-group" key={key}>
                        <label>
                          {taskCount === 1
                            ? 'What manual task do you wish to automate? *'
                            : optional(num)
                              ? `Manual Task ${num} — Leave blank if you have no more to add.`
                              : `Manual Task ${num} — What do you wish to automate?${required ? ' *' : ''}`}
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                          <textarea name={key} required={required} value={formData[key]} onChange={handleChange}
                            placeholder={
                              num === 1
                                ? 'Example: Our office manager manually enters every job request into a spreadsheet, then texts the crew lead to check availability. Takes about 2 hours a day.'
                                : num === 2
                                  ? 'Example: We create invoices manually in Word at the end of every job. Takes 20–30 minutes per invoice.'
                                  : "Example: Following up with leads who haven't responded. We do this manually by email and it often falls through the cracks."
                            }
                            style={{ flex: 1 }} />
                          <MicButton fieldName={key} />
                        </div>
                      </div>
                    ))}

                    {listeningField && (
                      <p style={{ color: '#e53935', fontSize: '0.85rem', textAlign: 'center', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        🔴 Listening... speak now. Tap the mic again to stop.
                      </p>
                    )}
                    <p style={{ color: '#6b7a99', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                      🎤 Tap the microphone next to any field to speak your answer.
                    </p>

                    {stepError && <p style={{ color: '#c0392b', fontSize: '0.88rem', marginTop: '0.5rem' }}>{stepError}</p>}
                    <NavButtons />
                  </div>
                )}

                {/* ────────────────────────────────────────────────────────
                    STEP 4 — Wrap up
                    Fields: name, email (read-only free), budget, terms, submit
                ──────────────────────────────────────────────────────── */}
                {currentStep === 4 && (
                  <div className="step-panel">
                    <p style={{ color: '#4a5568', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                      Almost done — just a couple of last details and you're in.
                    </p>

                    <div className="form-group">
                      <label>Your Full Name *</label>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                          placeholder="John Smith" style={{ flex: 1 }} />
                        <MicButton fieldName="name" />
                      </div>
                    </div>

                    {isFree && (
                      <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" value={formData.email} readOnly
                          style={{ background: '#f4f6fb', color: '#6b7a99', cursor: 'not-allowed' }} />
                      </div>
                    )}

                    <div className="form-group">
                      <label>Monthly budget for new software tools *</label>
                      <select name="budget" value={formData.budget} onChange={handleChange}>
                        <option value="">Select your budget</option>
                        <option value="Under $50/month">Under $50 / month</option>
                        <option value="$50–$200/month">$50 – $200 / month</option>
                        <option value="$200–$500/month">$200 – $500 / month</option>
                        <option value="$500+/month">$500+ / month</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>

                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', marginBottom: '1.25rem', marginTop: '0.5rem' }}>
                      <input type="checkbox" checked={agreedTerms}
                        onChange={e => { setAgreedTerms(e.target.checked); setStepError('') }}
                        style={{ marginTop: '3px', width: '20px', height: '20px', flexShrink: 0, cursor: 'pointer' }} />
                      <span style={{ color: '#4a5568', fontSize: '0.88rem', lineHeight: '1.6' }}>
                        I agree to the{' '}
                        <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: GOLD }}>Terms and Conditions</a>,
                        including that all sales of the full unlocked report are final.
                      </span>
                    </label>

                    {stepError && <p style={{ color: '#c0392b', fontSize: '0.88rem', marginBottom: '0.75rem' }}>{stepError}</p>}
                    <NavButtons isSubmit />

                    <p style={{ textAlign: 'center', color: '#6b7a99', fontSize: '0.85rem', marginTop: '1rem' }}>
                      {isFree
                        ? "You'll receive a preview by email. Unlock the full report when you're ready."
                        : 'Your AI Blueprint will be built and delivered to your email in real time.'}
                    </p>
                  </div>
                )}

              </form>
            )}
          </>
        )}
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis, LLC · Fidelis Diligentia</p>
        <p style={{ marginTop: '0.5rem' }}>
          <Link href="/privacy">Privacy Policy</Link> &nbsp;·&nbsp;
          <Link href="/terms">Terms and Conditions</Link>
        </p>
      </footer>
    </>
  )
}
