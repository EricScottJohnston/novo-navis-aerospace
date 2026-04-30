// pages/intake.js — Drop-in replacement.
// Same payload to David, same endpoints (/api/intake, /api/verify-email, /api/session).
// Only the UI is changed to reduce friction.

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

const INDUSTRIES = [
  'HVAC / Plumbing / Electrical',
  'Landscaping / Field Services',
  'Legal Services',
  'Accounting / Finance',
  'Dental / Chiropractic / Healthcare',
  'Real Estate',
  'Property Management',
  'Retail / E-commerce',
  'Restaurant / Hospitality',
  'Consulting',
  'Construction',
  'Other',
]

const EMPLOYEE_OPTIONS = ['Just me', '2-5', '6-15', '16-50', '50+']

const BUDGET_OPTIONS = [
  'Under $50/month',
  '$50–$200/month',
  '$200–$500/month',
  '$500+/month',
  'Not sure yet',
]

const COMMON_TOOLS = [
  'QuickBooks', 'Google Workspace', 'Microsoft 365', 'Slack',
  'Excel / Sheets', 'Gmail', 'Outlook', 'Square',
  'Stripe', 'Shopify', 'Mailchimp', 'HubSpot', 'Salesforce',
  'Jobber', 'ServiceTitan', 'Calendly', 'Zoom', 'WhatsApp',
]

const COMMON_TASKS = [
  'Following up with leads',
  'Creating invoices / quotes',
  'Scheduling / dispatching',
  'Customer intake / onboarding',
  'Email management',
  'Bookkeeping / categorizing',
  'Social posting / marketing',
  'Reporting / dashboards',
]

const DRAFT_KEY = 'novonavis_intake_draft_v1'

export default function Intake() {
  const router = useRouter()
  const { session_id, tier } = router.query
  const isFree = !!tier && !session_id

  // $99 starter: 1 task. $299 blueprint: up to 5 tasks.
  const taskCount = tier === 'starter' ? 1 : 5

  const [sessionData,    setSessionData]   = useState(null)
  const [sessionError,   setSessionError]  = useState(false)
  const [submitting,     setSubmitting]    = useState(false)
  const [agreedTerms,    setAgreedTerms]   = useState(false)
  const [listeningField, setListeningField] = useState(null)
  const [currentStep,    setCurrentStep]   = useState(1)
  const [stepError,      setStepError]     = useState('')
  const [submitNotice,   setSubmitNotice]  = useState('')
  const recognitionRef = useRef(null)
  const topRef         = useRef(null)
  const businessRef    = useRef(null)
  const draftHydrated  = useRef(false)

  // Email verification state — now lives inside Step 4 for free flow.
  const [codeSent,      setCodeSent]      = useState(false)
  const [codeInput,     setCodeInput]     = useState('')
  const [emailVerified, setEmailVerified] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [verifyError,   setVerifyError]   = useState('')

  // Tools chip state — compiled into formData.currentTools (a single string)
  const [selectedTools, setSelectedTools] = useState([])
  const [customTools,   setCustomTools]   = useState('')

  // Step 3: how many task fields are visible (progressive disclosure for $299)
  const [visibleTasks,  setVisibleTasks]  = useState(taskCount === 1 ? 1 : 2)

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

  // ── Hydrate draft from localStorage ───────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY)
      if (raw) {
        const d = JSON.parse(raw)
        if (d.formData)        setFormData(prev => ({ ...prev, ...d.formData }))
        if (d.currentStep)     setCurrentStep(d.currentStep)
        if (d.agreedTerms)     setAgreedTerms(d.agreedTerms)
        if (d.selectedTools)   setSelectedTools(d.selectedTools)
        if (d.customTools)     setCustomTools(d.customTools)
        if (d.visibleTasks)    setVisibleTasks(d.visibleTasks)
        if (d.emailVerified)   setEmailVerified(d.emailVerified)
      }
    } catch {}
    draftHydrated.current = true
  }, [])

  // ── Persist draft to localStorage ─────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined' || !draftHydrated.current) return
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify({
        formData, currentStep, agreedTerms, selectedTools, customTools, visibleTasks, emailVerified,
      }))
    } catch {}
  }, [formData, currentStep, agreedTerms, selectedTools, customTools, visibleTasks, emailVerified])

  // ── Compile selected tools + custom into formData.currentTools ────────────
  useEffect(() => {
    const compiled = [...selectedTools, customTools.trim()].filter(Boolean).join(', ')
    setFormData(prev => prev.currentTools === compiled ? prev : { ...prev, currentTools: compiled })
  }, [selectedTools, customTools])

  // ── Bootstrap (route validation + paid session lookup) ────────────────────
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

  const setField = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
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
    rec.continuous     = false
    rec.interimResults = false
    rec.lang           = 'en-US'

    rec.onresult = (e) => {
      const t = e.results[0][0].transcript
      setFormData(prev => ({
        ...prev,
        [fieldName]: prev[fieldName] ? prev[fieldName] + ' ' + t : t,
      }))
    }
    rec.onend   = () => setListeningField(null)
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
          flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%',
          border: active ? '2px solid #e53935' : '2px solid #d0d4de',
          background: active ? '#fff0f0' : '#f8f9fc',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '1.05rem', padding: 0,
          animation: active ? 'micPulse 1s ease-in-out infinite' : 'none',
          transition: 'border-color 0.2s',
        }}>
        {active ? '🔴' : '🎤'}
      </button>
    )
  }

  // ── Email verification (Step 4) ───────────────────────────────────────────
  const handleSendCode = async () => {
    const email = formData.email.trim()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setVerifyError('Please enter a valid email address.'); return
    }
    setVerifyLoading(true); setVerifyError('')
    try {
      const res  = await fetch('/api/verify-email', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', email }),
      })
      const data = await res.json()
      if (data.success) setCodeSent(true)
      else setVerifyError(data.error || 'Failed to send code. Please try again.')
    } catch { setVerifyError('Something went wrong. Please try again.') }
    setVerifyLoading(false)
  }

  const handleVerifyCode = async () => {
    if (!codeInput.trim()) { setVerifyError('Please enter the code.'); return }
    setVerifyLoading(true); setVerifyError('')
    try {
      const res  = await fetch('/api/verify-email', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', email: formData.email.trim(), code: codeInput.trim() }),
      })
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
      if (!formData.employees)       return 'Please pick the number of employees.'
    }
    if (step === 2) {
      if (!formData.businessDescription.trim()) return 'Please tell us about your business.'
    }
    if (step === 3) {
      if (!formData.goal.trim())     return 'Please describe your biggest operational problem.'
      if (!formData.process1.trim()) return 'Please describe at least one task to automate.'
    }
    if (step === 4) {
      if (!formData.name.trim())                 return 'Please enter your full name.'
      if (!formData.budget)                      return 'Please pick a monthly budget.'
      if (isFree && !emailVerified)              return 'Please verify your email so we can deliver your preview.'
      if (!agreedTerms)                          return 'Please agree to the Terms and Conditions.'
    }
    return null
  }

  const handleNext = () => {
    const err = validateStep(currentStep)
    if (err) { setStepError(err); return }
    setStepError('')
    setCurrentStep(s => s + 1)
  }

  const handleBack = () => { setStepError(''); setCurrentStep(s => s - 1) }

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validateStep(4)
    if (err) { setStepError(err); return }
    setSubmitting(true)
    setSubmitNotice('')

    const industryValue = formData.industry === 'Other' && formData.otherIndustry
      ? `Other: ${formData.otherIndustry}`
      : formData.industry

    try {
      const payload = isFree
        ? { tier, ...formData, industry: industryValue }
        : { sessionId: session_id, ...formData, industry: industryValue }

      const res  = await fetch('/api/intake', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (data.error === 'rate_limited') {
        setSubmitNotice('You already submitted a report request in the last 24 hours. Check your inbox for your preview, or call (623) 428-9308 if you need help.')
        setSubmitting(false); return
      }
      if (data.success) {
        try { window.localStorage.removeItem(DRAFT_KEY) } catch {}
        if (!isFree && typeof window !== 'undefined' && window.gtag) window.gtag('event', 'conversion_event_purchase_1')
        if (typeof window !== 'undefined') { window.uetq = window.uetq || []; window.uetq.push('event', 'submit_lead_form', {}) }
        router.push('/track/' + data.orderId)
      } else {
        setSubmitNotice('Something went wrong submitting your intake. Please email support@novonavis.com.')
        setSubmitting(false)
      }
    } catch {
      setSubmitNotice('Something went wrong. Please email support@novonavis.com.')
      setSubmitting(false)
    }
  }

  const tierLabel = tier === 'starter' ? 'Single Workflow Blueprint' : 'AI Blueprint'

  // Visible task fields (progressive disclosure for $299/$999)
  const taskFields = Array.from({ length: visibleTasks }, (_, i) => ({
    key: `process${i + 1}`,
    num: i + 1,
    required: i === 0, // only the first is strictly required
  }))

  const canAddMoreTasks = taskCount > 1 && visibleTasks < taskCount

  // ── Step indicator ────────────────────────────────────────────────────────
  const StepIndicator = () => (
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
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

  // ── Reusable: button-row for choose-one fields (replaces dropdown) ────────
  const ButtonRow = ({ name, value, options, onChange }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {options.map(opt => {
        const selected = value === opt
        return (
          <button key={opt} type="button" onClick={() => onChange(opt)}
            style={{
              flex: '1 1 auto', minWidth: '90px',
              padding: '0.75rem 0.85rem',
              background: selected ? NAVY : '#fff',
              color:      selected ? '#fff' : NAVY,
              border:     selected ? `2px solid ${NAVY}` : '2px solid #d8dee9',
              borderRadius: '8px', fontSize: '0.92rem',
              fontWeight: selected ? '700' : '600',
              cursor: 'pointer', transition: 'all 0.15s',
            }}>
            {opt}
          </button>
        )
      })}
    </div>
  )

  // ── Industry tap-to-select grid ───────────────────────────────────────────
  const IndustryGrid = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
      {INDUSTRIES.map(ind => {
        const selected = formData.industry === ind
        return (
          <button key={ind} type="button"
            onClick={() => setField('industry', ind)}
            style={{
              padding: '0.7rem 0.75rem',
              background: selected ? '#fffbf4' : '#fff',
              color: NAVY,
              border: selected ? `2px solid ${GOLD}` : '2px solid #e0e4ef',
              borderRadius: '8px',
              fontSize: '0.83rem', fontWeight: selected ? '700' : '500',
              textAlign: 'center', cursor: 'pointer',
              minHeight: '52px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              lineHeight: 1.25, transition: 'all 0.15s',
              boxShadow: selected ? '0 2px 8px rgba(200,169,110,0.25)' : 'none',
            }}>
            {ind}
          </button>
        )
      })}
    </div>
  )

  // ── Tools chip selector ───────────────────────────────────────────────────
  const toggleTool = (tool) => {
    setSelectedTools(prev => prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool])
  }

  const ToolsChips = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
      {COMMON_TOOLS.map(tool => {
        const selected = selectedTools.includes(tool)
        return (
          <button key={tool} type="button" onClick={() => toggleTool(tool)}
            style={{
              padding: '0.5rem 0.85rem',
              background: selected ? NAVY : '#fff',
              color:      selected ? '#fff' : NAVY,
              border:     selected ? `1px solid ${NAVY}` : '1px solid #d8dee9',
              borderRadius: '20px', fontSize: '0.85rem',
              fontWeight: selected ? '700' : '500',
              cursor: 'pointer', transition: 'all 0.15s',
            }}>
            {selected ? '✓ ' : ''}{tool}
          </button>
        )
      })}
    </div>
  )

  // ── Task starter chips (Step 3) ───────────────────────────────────────────
  const useTaskStarter = (label) => {
    // Find the first empty task field, fill it with the starter prefix.
    for (let i = 1; i <= taskCount; i++) {
      const key = `process${i}`
      if (!formData[key]?.trim()) {
        setField(key, `${label} — currently we `)
        if (i > visibleTasks) setVisibleTasks(i)
        // Focus the textarea after a tick
        setTimeout(() => {
          const el = document.querySelector(`textarea[name="${key}"]`)
          if (el) {
            el.focus()
            el.setSelectionRange(el.value.length, el.value.length)
          }
        }, 30)
        return
      }
    }
  }

  const TaskStarters = () => (
    <div style={{ marginBottom: '1.25rem' }}>
      <p style={{ color: '#6b7a99', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
        Need a starting point? Tap a common task — then add YOUR specifics in the field (how you currently do it, how often, who's involved).
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {COMMON_TASKS.map(t => (
          <button key={t} type="button" onClick={() => useTaskStarter(t)}
            style={{
              padding: '0.45rem 0.85rem',
              background: '#fff', color: NAVY,
              border: `1px dashed ${GOLD}`, borderRadius: '20px',
              fontSize: '0.82rem', fontWeight: '500', cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fffbf4' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}>
            + {t}
          </button>
        ))}
      </div>
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
          disabled={submitting || !agreedTerms || (isFree && !emailVerified)}>
          {submitting
            ? 'Submitting...'
            : isFree ? 'Submit — Get My Free Preview →' : 'Submit — Build My Blueprint →'}
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

  // Free flow: form is shown immediately. Paid flow: wait for session lookup.
  const showForm = isFree || sessionData

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
            {/* Header */}
            <div style={{ marginBottom: '1.5rem' }}>
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
                  ? 'A few quick questions and we\'ll start building.'
                  : `Tell us about ${sessionData?.business || 'your business'} so we can build your AI Blueprint.`}
              </p>
              <p style={{ color: '#6b7a99', fontSize: '0.88rem', fontStyle: 'italic', marginBottom: 0 }}>
                About 3 minutes. The more specific you are, the more accurate your blueprint. Tap 🎤 to speak instead of type — it's faster.
              </p>
            </div>

            {!isFree && !sessionData && !sessionError && (
              <p style={{ textAlign: 'center', color: '#8a95aa', marginBottom: '2rem' }}>Verifying your payment...</p>
            )}

            {showForm && (
              <form onSubmit={handleSubmit}>

                <StepIndicator />

                {/* ────────────────────────────────────────────────────────
                    STEP 1 — Business basics
                ──────────────────────────────────────────────────────── */}
                {currentStep === 1 && (
                  <div className="step-panel">
                    <div className="form-group">
                      <label>Business Name *</label>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input ref={businessRef} type="text" name="business"
                          value={formData.business} onChange={handleChange}
                          placeholder="Smith Plumbing LLC"
                          autoComplete="organization" style={{ flex: 1 }} />
                        <MicButton fieldName="business" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Industry *</label>
                      <IndustryGrid />
                    </div>

                    {formData.industry === 'Other' && (
                      <div className="form-group">
                        <label>Describe your industry *</label>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <input type="text" name="otherIndustry" value={formData.otherIndustry} onChange={handleChange}
                            placeholder="Mold remediation, pet grooming, photography..." style={{ flex: 1 }} />
                          <MicButton fieldName="otherIndustry" />
                        </div>
                      </div>
                    )}

                    <div className="form-group">
                      <label>Number of Employees *</label>
                      <ButtonRow name="employees" value={formData.employees}
                        options={EMPLOYEE_OPTIONS}
                        onChange={(v) => setField('employees', v)} />
                    </div>

                    {stepError && <p style={{ color: '#c0392b', fontSize: '0.88rem', marginTop: '0.5rem' }}>{stepError}</p>}
                    <NavButtons />
                  </div>
                )}

                {/* ────────────────────────────────────────────────────────
                    STEP 2 — About the business
                ──────────────────────────────────────────────────────── */}
                {currentStep === 2 && (
                  <div className="step-panel">
                    <div className="form-group">
                      <label>Tell us about your business — what it does, who it serves, and anything you think we should know *</label>
                      <p style={{ color: '#6b7a99', fontSize: '0.8rem', margin: '-0.25rem 0 0.5rem' }}>
                        The more specific you are here, the more tailored your blueprint will be. Tap 🎤 and just talk — it's the fastest way to give detail.
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <textarea name="businessDescription" value={formData.businessDescription} onChange={handleChange}
                          placeholder="Example: We're a family-owned plumbing company serving the Phoenix metro area. We have 3 trucks and handle both residential and light commercial work. About 15 jobs per week, busiest in summer. Office manager handles dispatch and invoicing, two field crews. Most of our leads come from Google and word of mouth."
                          rows={6} style={{ flex: 1 }} />
                        <MicButton fieldName="businessDescription" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Tools you currently use</label>
                      <p style={{ color: '#6b7a99', fontSize: '0.8rem', margin: '-0.25rem 0 0.6rem' }}>
                        Tap any that apply. Add anything else below.
                      </p>
                      <ToolsChips />
                      <textarea
                        value={customTools}
                        onChange={e => setCustomTools(e.target.value)}
                        placeholder="Anything else, or details about HOW you use these? (e.g. 'ServiceFusion for dispatch, QuickBooks Desktop only, custom Excel sheet for job tracking, Gmail but no shared inbox')"
                        rows={3}
                        style={{ marginTop: '0.6rem', width: '100%' }} />
                    </div>

                    {listeningField && (
                      <p style={{ color: '#e53935', fontSize: '0.85rem', textAlign: 'center', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        🔴 Listening... speak now. Tap the mic again to stop.
                      </p>
                    )}

                    {stepError && <p style={{ color: '#c0392b', fontSize: '0.88rem', marginTop: '0.5rem' }}>{stepError}</p>}
                    <NavButtons />
                  </div>
                )}

                {/* ────────────────────────────────────────────────────────
                    STEP 3 — What to fix
                ──────────────────────────────────────────────────────── */}
                {currentStep === 3 && (
                  <div className="step-panel">
                    <div className="form-group">
                      <label>What's the single biggest operational problem in your business right now? *</label>
                      <p style={{ color: '#6b7a99', fontSize: '0.8rem', margin: '-0.25rem 0 0.5rem' }}>
                        Be specific — this is what your blueprint will solve. Numbers, frequency, who's affected — all of it helps.
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <textarea name="goal" value={formData.goal} onChange={handleChange}
                          placeholder="Example: We're losing jobs because we're too slow to respond to new inquiries. Leads come in via web form and email, but by the time someone checks them and follows up, prospects have already hired someone else. Probably losing 5–10 jobs a month this way."
                          rows={5} style={{ flex: 1 }} />
                        <MicButton fieldName="goal" />
                      </div>
                    </div>

                    <hr className="divider" style={{ margin: '1.5rem 0' }} />

                    <p style={{ color: NAVY, fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                      {taskCount === 1
                        ? 'What manual task do you wish to automate? *'
                        : 'What do you want to automate?'}
                    </p>

                    {taskCount > 1 && <TaskStarters />}

                    {taskFields.map(({ key, num, required }) => (
                      <div className="form-group" key={key}>
                        <label>
                          {taskCount === 1
                            ? 'Describe the task *'
                            : `Task ${num}${required ? ' *' : ''}`}
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                          <textarea name={key} required={required} value={formData[key]} onChange={handleChange}
                            placeholder={
                              num === 1
                                ? "Example: Our office manager manually enters every job request into a spreadsheet, then texts the crew lead to check availability. Takes about 2 hours a day. We use Google Sheets and SMS for this. Sometimes jobs get missed when she's out."
                                : num === 2
                                  ? "Example: We create invoices manually in Word at the end of every job. ~20–30 min per invoice. Then re-enter them in QuickBooks for the books. Probably 50+ invoices a month getting double-handled."
                                  : "Example: Following up with leads who haven't responded. We do this manually by email and it often falls through the cracks. No system to track who needs a touch."
                            }
                            rows={4} style={{ flex: 1 }} />
                          <MicButton fieldName={key} />
                        </div>
                      </div>
                    ))}

                    {canAddMoreTasks && (
                      <button type="button"
                        onClick={() => setVisibleTasks(v => Math.min(v + 1, taskCount))}
                        style={{
                          width: '100%', padding: '0.75rem',
                          background: '#fff', color: NAVY,
                          border: `2px dashed ${GOLD}`, borderRadius: '8px',
                          fontWeight: '600', fontSize: '0.92rem', cursor: 'pointer',
                          marginTop: '0.5rem',
                        }}>
                        + Add another task ({visibleTasks}/{taskCount})
                      </button>
                    )}

                    {listeningField && (
                      <p style={{ color: '#e53935', fontSize: '0.85rem', textAlign: 'center', marginTop: '0.75rem', marginBottom: '0', fontWeight: 'bold' }}>
                        🔴 Listening... speak now. Tap the mic again to stop.
                      </p>
                    )}

                    {stepError && <p style={{ color: '#c0392b', fontSize: '0.88rem', marginTop: '0.75rem' }}>{stepError}</p>}
                    <NavButtons />
                  </div>
                )}

                {/* ────────────────────────────────────────────────────────
                    STEP 4 — Wrap up (incl. email verification for free flow)
                ──────────────────────────────────────────────────────── */}
                {currentStep === 4 && (
                  <div className="step-panel">
                    <p style={{ color: '#4a5568', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                      Last step. {isFree ? "We'll send your preview to the email you verify below." : "Just a couple of last details."}
                    </p>

                    <div className="form-group">
                      <label>Your Full Name *</label>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                          placeholder="John Smith" autoComplete="name" style={{ flex: 1 }} />
                        <MicButton fieldName="name" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Monthly budget for new software tools *</label>
                      <ButtonRow name="budget" value={formData.budget}
                        options={BUDGET_OPTIONS}
                        onChange={(v) => setField('budget', v)} />
                    </div>

                    {/* Email + verification (free flow only) */}
                    {isFree && (
                      <div className="form-group">
                        <label>
                          Email Address *
                          {emailVerified && (
                            <span style={{ color: '#1a8a4e', fontSize: '0.85rem', marginLeft: '0.5rem', fontWeight: '600' }}>
                              ✓ Verified
                            </span>
                          )}
                        </label>
                        <p style={{ color: '#6b7a99', fontSize: '0.82rem', margin: '-0.25rem 0 0.5rem' }}>
                          We'll send a 6-digit code to confirm. We never sell or share your info.
                        </p>

                        {!emailVerified && (
                          <>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                              <input type="email" name="email"
                                value={formData.email}
                                onChange={e => { handleChange(e); if (codeSent) { setCodeSent(false); setCodeInput('') } }}
                                placeholder="you@yourbusiness.com"
                                autoComplete="email"
                                style={{ flex: 1, minWidth: '200px' }} />
                              {!codeSent && (
                                <button type="button" onClick={handleSendCode} disabled={verifyLoading}
                                  style={{
                                    background: NAVY, color: '#fff', border: 'none', borderRadius: '6px',
                                    padding: '0.65rem 1.1rem', fontWeight: '700', fontSize: '0.9rem',
                                    cursor: verifyLoading ? 'not-allowed' : 'pointer',
                                    opacity: verifyLoading ? 0.6 : 1,
                                  }}>
                                  {verifyLoading ? 'Sending...' : 'Send Code'}
                                </button>
                              )}
                            </div>

                            {codeSent && (
                              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '0.6rem' }}>
                                <input type="text" inputMode="numeric"
                                  value={codeInput} onChange={e => setCodeInput(e.target.value)}
                                  placeholder="6-digit code" maxLength={6}
                                  style={{
                                    width: '160px', textAlign: 'center',
                                    letterSpacing: '0.2em', fontSize: '1.1rem',
                                  }} />
                                <button type="button" onClick={handleVerifyCode} disabled={verifyLoading}
                                  style={{
                                    background: GOLD, color: '#111', border: 'none', borderRadius: '6px',
                                    padding: '0.65rem 1.1rem', fontWeight: '700', fontSize: '0.9rem',
                                    cursor: verifyLoading ? 'not-allowed' : 'pointer',
                                    opacity: verifyLoading ? 0.6 : 1,
                                  }}>
                                  {verifyLoading ? 'Verifying...' : 'Verify'}
                                </button>
                                <button type="button"
                                  onClick={() => { setCodeSent(false); setCodeInput(''); setVerifyError('') }}
                                  style={{
                                    background: 'none', border: 'none', color: '#8a95aa',
                                    fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline',
                                  }}>
                                  Resend / change email
                                </button>
                              </div>
                            )}
                            {verifyError && <p style={{ color: '#c0392b', fontSize: '0.85rem', marginTop: '0.5rem' }}>{verifyError}</p>}
                          </>
                        )}
                      </div>
                    )}

                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', marginBottom: '1rem', marginTop: '0.5rem' }}>
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
                    {submitNotice && (
                      <div style={{
                        background: '#fff4f4', border: '1px solid #f5c2c0',
                        borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '0.75rem',
                        color: '#9b1c1c', fontSize: '0.88rem', lineHeight: 1.5,
                      }}>
                        {submitNotice}
                      </div>
                    )}

                    <NavButtons isSubmit />

                    <p style={{ textAlign: 'center', color: '#6b7a99', fontSize: '0.85rem', marginTop: '1rem' }}>
                      {isFree
                        ? "Your preview will land in your inbox. Unlock the full report when you're ready."
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
