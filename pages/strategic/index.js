// pages/strategic/intake.js — David/Strategic intake form.
// Submits to existing /api/intake with tier: 'strategic'.
// Free preview model: consultant submits, David builds, redacted preview is emailed,
// unlock link in email leads to $999 checkout.

import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'

const STEPS = [
  { num: 1, label: 'About You'        },
  { num: 2, label: 'The Decision'     },
  { num: 3, label: 'What You Know'    },
  { num: 4, label: 'Confirm & Submit' },
]

const ANALYTICAL_LENSES = [
  'Let David choose',
  'Porter\'s Five Forces',
  'SWOT',
  'Internal-External Scan',
  'Decision Matrix',
  'Scenario Analysis',
  'Causal Chain Modeling',
  'Other (describe below)',
]

const COMPLIANCE_FRAMEWORKS = [
  'None',
  'NIST AI RMF',
  'ISO 42001',
  'EU AI Act',
  'GDPR',
  'SOX',
  'HIPAA',
  'PCI DSS',
  'Other (specify)',
]

const DRAFT_KEY = 'novonavis_strategic_intake_draft_v1'

export default function StrategicIntake() {
  const router = useRouter()

  const [submitting,      setSubmitting]      = useState(false)
  const [agreedTerms,     setAgreedTerms]     = useState(false)
  const [currentStep,     setCurrentStep]     = useState(1)
  const [stepError,       setStepError]       = useState('')
  const [submitNotice,    setSubmitNotice]    = useState('')
  const [showVerifyModal, setShowVerifyModal] = useState(false)

  const topRef        = useRef(null)
  const emailRef      = useRef(null)
  const verifyBoxRef  = useRef(null)
  const draftHydrated = useRef(false)

  const [codeSent,      setCodeSent]      = useState(false)
  const [codeInput,     setCodeInput]     = useState('')
  const [emailVerified, setEmailVerified] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [verifyError,   setVerifyError]   = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    firm: '',
    practice: '',
    decision: '',
    deadline: '',
    situation: '',
    knownContext: '',
    constraints: '',
    lens: 'Let David choose',
    lensOther: '',
    compliance: ['None'],
    complianceOther: '',
    additional: '',
  })

  // ── Hydrate draft from localStorage ───────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY)
      if (raw) {
        const d = JSON.parse(raw)
        if (d.formData) {
          const { compliance, complianceOther, ...restFormData } = d.formData
          setFormData(prev => ({ ...prev, ...restFormData }))
        }
        if (d.currentStep)   setCurrentStep(d.currentStep)
        if (d.agreedTerms)   setAgreedTerms(d.agreedTerms)
        if (d.emailVerified) setEmailVerified(d.emailVerified)
      }
    } catch {}
    draftHydrated.current = true
  }, [])

  // ── Persist draft — exclude compliance from saved state ───────────────────
  useEffect(() => {
    if (typeof window === 'undefined' || !draftHydrated.current) return
    try {
      const { compliance, complianceOther, ...restFormData } = formData
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify({
        formData: restFormData,
        currentStep, agreedTerms, emailVerified,
      }))
    } catch {}
  }, [formData, currentStep, agreedTerms, emailVerified])

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

  const toggleCompliance = (framework) => {
    setStepError('')
    setFormData(prev => {
      const current = prev.compliance || []
      if (framework === 'None') {
        return { ...prev, compliance: ['None'], complianceOther: '' }
      }
      const withoutNone = current.filter(f => f !== 'None')
      if (withoutNone.includes(framework)) {
        const next = withoutNone.filter(f => f !== framework)
        return {
          ...prev,
          compliance: next.length === 0 ? ['None'] : next,
          complianceOther: framework === 'Other (specify)' ? '' : prev.complianceOther,
        }
      } else {
        return { ...prev, compliance: [...withoutNone, framework] }
      }
    })
  }

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

  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.name.trim())     return 'Please enter your full name.'
      if (!formData.firm.trim())     return 'Please enter your firm name.'
      if (!formData.practice.trim()) return 'Please describe your consulting practice in one line.'
    }
    if (step === 2) {
      if (!formData.decision.trim())  return 'Please describe the strategic decision.'
      if (!formData.situation.trim()) return 'Please describe the client situation.'
    }
    if (step === 3) {
      if (!formData.knownContext.trim()) return 'Please describe what you already know about the situation.'
      if (formData.compliance.includes('Other (specify)') && !formData.complianceOther.trim()) {
        return 'Please specify the other compliance framework, or deselect it.'
      }
    }
    if (step === 4) {
      if (!emailVerified) return 'NEEDS_EMAIL_VERIFY'
      if (!agreedTerms)   return 'Please agree to the Terms and Conditions.'
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

  const handleModalVerifyNow = () => {
    setShowVerifyModal(false)
    setTimeout(() => {
      verifyBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      if (!formData.email.trim() || !codeSent) {
        emailRef.current?.focus()
      } else {
        const codeEl = document.querySelector('input[data-verify-code="1"]')
        codeEl?.focus()
      }
    }, 80)
  }

  // ── Submit handler ─────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validateStep(4)

    if (err === 'NEEDS_EMAIL_VERIFY') {
      setStepError('')
      setShowVerifyModal(true)
      return
    }
    if (err) { setStepError(err); return }

    setSubmitting(true)
    setSubmitNotice('')
    try {
      const res  = await fetch('/api/intake', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tier: 'strategic' }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        window.localStorage.removeItem(DRAFT_KEY)
        router.push(data.redirectUrl || '/strategic/building')
      } else {
        setSubmitNotice(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitNotice('Something went wrong. Please check your connection and try again.')
    }
    setSubmitting(false)
  }

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
                textAlign: 'center', whiteSpace: 'nowrap', maxWidth: '70px',
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

  const LensPicker = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {ANALYTICAL_LENSES.map(opt => {
        const selected = formData.lens === opt
        return (
          <button key={opt} type="button" onClick={() => setField('lens', opt)}
            style={{
              padding: '0.65rem 0.95rem',
              background: selected ? NAVY : '#fff',
              color:      selected ? '#fff' : NAVY,
              border:     selected ? `2px solid ${NAVY}` : '2px solid #d8dee9',
              borderRadius: '8px', fontSize: '0.88rem',
              fontWeight: selected ? '700' : '600',
              cursor: 'pointer', transition: 'all 0.15s',
            }}>
            {opt}
          </button>
        )
      })}
    </div>
  )

  const CompliancePicker = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {COMPLIANCE_FRAMEWORKS.map(opt => {
        const selected = formData.compliance.includes(opt)
        const isNone   = opt === 'None'
        return (
          <button key={opt} type="button" onClick={() => toggleCompliance(opt)}
            style={{
              padding: '0.55rem 0.9rem',
              background: selected ? NAVY : '#fff',
              color:      selected ? '#fff' : NAVY,
              border:     selected ? `2px solid ${NAVY}` : '2px solid #d8dee9',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: selected ? '700' : '500',
              cursor: 'pointer',
              transition: 'all 0.15s',
              fontStyle: isNone ? 'italic' : 'normal',
            }}>
            {selected ? '✓ ' : ''}{opt}
          </button>
        )
      })}
    </div>
  )

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
          disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit — Build My Free Preview →'}
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

  return (
    <>
      <Head>
        <title>Strategic Analysis Intake | Novo Navis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @keyframes stepFadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes modalFadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes modalSlideIn {
            from { opacity: 0; transform: translateY(12px) scale(0.98); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
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
          <li><Link href="/strategic">David/Strategic</Link></li>
          <li><Link href="/faq">FAQ</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div className="report-page" ref={topRef}>

        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: GOLD, fontSize: '0.72rem', fontWeight: 'bold', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            David / Strategic
          </p>
          <h1 style={{ marginBottom: '0.5rem' }}>
            Submit your strategic analysis.
          </h1>
          <p className="lead" style={{ marginBottom: '0.4rem' }}>
            Tell us about the decision your client needs to make. David builds a 50-page auditable strategic analysis with confidence ratings, evidence provenance, and a full audit trail. Read the preview free. Pay $999 only if you'd put your firm's name on it.
          </p>
          <p style={{ color: '#6b7a99', fontSize: '0.88rem', fontStyle: 'italic', marginBottom: 0 }}>
            About 5 minutes. The more specific you are, the more defensible your analysis.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <StepIndicator />

          {currentStep === 1 && (
            <div className="step-panel">
              <div className="form-group">
                <label>Your Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Sarah Chen" autoComplete="name" />
              </div>
              <div className="form-group">
                <label>Your Firm *</label>
                <input type="text" name="firm" value={formData.firm} onChange={handleChange}
                  placeholder="Chen Advisory Group" autoComplete="organization" />
              </div>
              <div className="form-group">
                <label>Your Practice *</label>
                <p style={{ color: '#6b7a99', fontSize: '0.8rem', margin: '-0.25rem 0 0.5rem' }}>
                  One line — what kind of strategy work you do.
                </p>
                <input type="text" name="practice" value={formData.practice} onChange={handleChange}
                  placeholder="Growth strategy for mid-market fintech" />
              </div>
              {stepError && <p style={{ color: '#c0392b', fontSize: '0.88rem', marginTop: '0.5rem' }}>{stepError}</p>}
              <NavButtons />
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-panel">
              <div className="form-group">
                <label>The decision your client is trying to make *</label>
                <p style={{ color: '#6b7a99', fontSize: '0.8rem', margin: '-0.25rem 0 0.5rem' }}>
                  1–3 sentences. The specific decision, framed precisely.
                </p>
                <textarea name="decision" value={formData.decision} onChange={handleChange}
                  placeholder="Example: My client is deciding whether to expand their B2B SaaS product into the European market in Q4, or double down on their existing North American base. They have capital for one bet, not both."
                  rows={4} />
              </div>
              <div className="form-group">
                <label>Decision deadline (optional)</label>
                <p style={{ color: '#6b7a99', fontSize: '0.8rem', margin: '-0.25rem 0 0.5rem' }}>
                  When does the client need to act?
                </p>
                <input type="text" name="deadline" value={formData.deadline} onChange={handleChange}
                  placeholder="Board meeting June 15 — needs answer by then" />
              </div>
              <div className="form-group">
                <label>Client situation *</label>
                <p style={{ color: '#6b7a99', fontSize: '0.8rem', margin: '-0.25rem 0 0.5rem' }}>
                  Who is the client, what do they do, what's been happening that brought them to this question.
                </p>
                <textarea name="situation" value={formData.situation} onChange={handleChange}
                  placeholder="Example: Series B SaaS company, $18M ARR, 65 employees..."
                  rows={7} />
              </div>
              {stepError && <p style={{ color: '#c0392b', fontSize: '0.88rem', marginTop: '0.5rem' }}>{stepError}</p>}
              <NavButtons />
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-panel">
              <div className="form-group">
                <label>What you already know *</label>
                <p style={{ color: '#6b7a99', fontSize: '0.8rem', margin: '-0.25rem 0 0.5rem' }}>
                  Your hypotheses, data the client has shared, things you've already concluded.
                </p>
                <textarea name="knownContext" value={formData.knownContext} onChange={handleChange}
                  placeholder="Example: I've reviewed their churn data..."
                  rows={6} />
              </div>
              <div className="form-group">
                <label>Constraints (optional)</label>
                <p style={{ color: '#6b7a99', fontSize: '0.8rem', margin: '-0.25rem 0 0.5rem' }}>
                  Budget caps, timeline limits, things that are off the table, regulatory or political factors.
                </p>
                <textarea name="constraints" value={formData.constraints} onChange={handleChange}
                  placeholder="Example: Client is unwilling to raise additional capital in the next 12 months."
                  rows={4} />
              </div>
              <div className="form-group">
                <label>Preferred analytical lens (optional)</label>
                <p style={{ color: '#6b7a99', fontSize: '0.8rem', margin: '-0.25rem 0 0.6rem' }}>
                  How do you want this framed? If you're not sure, let David choose.
                </p>
                <LensPicker />
                {formData.lens === 'Other (describe below)' && (
                  <input type="text" name="lensOther" value={formData.lensOther} onChange={handleChange}
                    placeholder="Describe the framework you want applied"
                    style={{ marginTop: '0.6rem', width: '100%' }} />
                )}
              </div>
              <div className="form-group">
                <label>Compliance frameworks (optional)</label>
                <p style={{ color: '#6b7a99', fontSize: '0.8rem', margin: '-0.25rem 0 0.6rem' }}>
                  Pick any frameworks the client cares about. David will produce a Compliance Traceability section mapping the analysis to relevant requirements. Leave as "None" to skip.
                </p>
                <CompliancePicker />
                {formData.compliance.includes('Other (specify)') && (
                  <input type="text" name="complianceOther" value={formData.complianceOther} onChange={handleChange}
                    placeholder="Specify the framework(s) — e.g., 'CCPA', 'FedRAMP', 'CMMC Level 2'"
                    style={{ marginTop: '0.6rem', width: '100%' }} />
                )}
              </div>
              <div className="form-group">
                <label>Anything else David should know (optional)</label>
                <textarea name="additional" value={formData.additional} onChange={handleChange}
                  placeholder="Sensitivities, internal politics, prior consulting work, anything that would change how the analysis should be framed."
                  rows={3} />
              </div>
              {stepError && <p style={{ color: '#c0392b', fontSize: '0.88rem', marginTop: '0.5rem' }}>{stepError}</p>}
              <NavButtons />
            </div>
          )}

          {currentStep === 4 && (
            <div className="step-panel">
              <p style={{ color: '#4a5568', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                Last step. We'll send your free redacted preview to the email you verify below. If you approve the analysis, you'll be able to unlock the full report for $999.
              </p>
              <div
                ref={verifyBoxRef}
                className="form-group"
                style={{
                  padding: emailVerified ? '0.85rem 1rem' : '1rem 1.1rem',
                  border: emailVerified ? '1px solid #c4e2cf' : `2px solid ${GOLD}`,
                  background: emailVerified ? '#f4fbf6' : '#fffbf4',
                  borderRadius: '10px',
                  boxShadow: emailVerified ? 'none' : '0 2px 12px rgba(200,169,110,0.18)',
                  transition: 'all 0.2s ease',
                }}>
                <label>
                  {emailVerified ? (
                    <>
                      Email Address *
                      <span style={{ color: '#1a8a4e', fontSize: '0.85rem', marginLeft: '0.5rem', fontWeight: '700' }}>
                        ✓ Verified
                      </span>
                    </>
                  ) : (
                    <>
                      <span style={{ color: GOLD, fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                        Required to receive your preview
                      </span>
                      Email Address *
                    </>
                  )}
                </label>
                <p style={{ color: '#6b7a99', fontSize: '0.82rem', margin: '-0.15rem 0 0.6rem' }}>
                  We'll send a 6-digit code to confirm. We never sell or share your info.
                </p>
                {!emailVerified && (
                  <>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <input ref={emailRef} type="email" name="email"
                        value={formData.email}
                        onChange={e => { handleChange(e); if (codeSent) { setCodeSent(false); setCodeInput('') } }}
                        placeholder="you@yourfirm.com"
                        autoComplete="email"
                        style={{ flex: 1, minWidth: '200px' }} />
                      {!codeSent && (
                        <button type="button" onClick={handleSendCode} disabled={verifyLoading}
                          style={{
                            background: GOLD, color: '#111', border: 'none', borderRadius: '6px',
                            padding: '0.7rem 1.2rem', fontWeight: '700', fontSize: '0.92rem',
                            cursor: verifyLoading ? 'not-allowed' : 'pointer',
                            opacity: verifyLoading ? 0.6 : 1,
                            boxShadow: '0 2px 8px rgba(200,169,110,0.3)',
                          }}>
                          {verifyLoading ? 'Sending...' : 'Send Code'}
                        </button>
                      )}
                    </div>
                    {codeSent && (
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '0.6rem' }}>
                        <input type="text" inputMode="numeric" data-verify-code="1"
                          value={codeInput} onChange={e => setCodeInput(e.target.value)}
                          placeholder="6-digit code" maxLength={6}
                          style={{ width: '160px', textAlign: 'center', letterSpacing: '0.2em', fontSize: '1.1rem' }} />
                        <button type="button" onClick={handleVerifyCode} disabled={verifyLoading}
                          style={{
                            background: GOLD, color: '#111', border: 'none', borderRadius: '6px',
                            padding: '0.7rem 1.2rem', fontWeight: '700', fontSize: '0.92rem',
                            cursor: verifyLoading ? 'not-allowed' : 'pointer',
                            opacity: verifyLoading ? 0.6 : 1,
                            boxShadow: '0 2px 8px rgba(200,169,110,0.3)',
                          }}>
                          {verifyLoading ? 'Verifying...' : 'Verify'}
                        </button>
                        <button type="button"
                          onClick={() => { setCodeSent(false); setCodeInput(''); setVerifyError('') }}
                          style={{ background: 'none', border: 'none', color: '#8a95aa', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}>
                          Resend / change email
                        </button>
                      </div>
                    )}
                    {verifyError && <p style={{ color: '#c0392b', fontSize: '0.85rem', marginTop: '0.5rem' }}>{verifyError}</p>}
                  </>
                )}
              </div>
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
              {stepError && stepError !== 'NEEDS_EMAIL_VERIFY' && (
                <p style={{ color: '#c0392b', fontSize: '0.88rem', marginBottom: '0.75rem' }}>{stepError}</p>
              )}
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
                After you submit, you'll watch David build your analysis in real time. The redacted preview lands in your inbox when complete.
              </p>
            </div>
          )}

        </form>
      </div>

      {/* ── EMAIL VERIFY MODAL ─────────────────────────────────────────────── */}
      {showVerifyModal && (
        <div
          onClick={() => setShowVerifyModal(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(0,0,0,0.65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
            animation: 'modalFadeIn 0.2s ease-out',
          }}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#ffffff', borderRadius: '14px',
              border: `2px solid ${GOLD}`,
              boxShadow: '0 12px 48px rgba(27,42,74,0.28)',
              maxWidth: '420px', width: '100%',
              padding: '1.75rem 1.6rem',
              animation: 'modalSlideIn 0.25s ease-out',
            }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '50%',
                background: '#fffbf4', border: `2px solid ${GOLD}`,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem', marginBottom: '0.75rem',
              }}>
                ✉️
              </div>
              <h2 style={{ color: NAVY, fontSize: '1.2rem', fontWeight: '700', margin: '0 0 0.4rem' }}>
                One more thing — verify your email
              </h2>
              <p style={{ color: '#4a5568', fontSize: '0.92rem', lineHeight: 1.55, margin: 0 }}>
                {!formData.email.trim()
                  ? "We need a verified email so we can deliver your free preview. It takes about 30 seconds."
                  : codeSent
                    ? "We've sent a 6-digit code to your inbox. Enter it to confirm — then we'll build your analysis."
                    : "Tap 'Send Code' to receive a 6-digit code. Enter it to confirm your email — then we'll build your analysis."}
              </p>
            </div>
            <button type="button" onClick={handleModalVerifyNow}
              style={{
                width: '100%', padding: '0.9rem',
                background: GOLD, color: '#111',
                border: 'none', borderRadius: '8px',
                fontWeight: '700', fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(200,169,110,0.4)',
                marginBottom: '0.5rem',
              }}>
              Verify My Email Now →
            </button>
            <button type="button" onClick={() => setShowVerifyModal(false)}
              style={{
                width: '100%', padding: '0.6rem',
                background: 'none', border: 'none',
                color: '#8a95aa', fontSize: '0.85rem',
                cursor: 'pointer', textDecoration: 'underline',
              }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis, LLC · Registered U.S. Defense Contractor · Fidelis Diligentia</p>
        <p style={{ marginTop: '0.5rem' }}>
          <Link href="/privacy">Privacy Policy</Link> &nbsp;·&nbsp;
          <Link href="/terms">Terms and Conditions</Link>
        </p>
      </footer>
    </>
  )
}
