import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

export default function EnterpriseIntake() {
  const router = useRouter()
  const { session_id } = router.query

  const [sessionData,    setSessionData]    = useState(null)
  const [sessionError,   setSessionError]   = useState(false)
  const [submitting,     setSubmitting]     = useState(false)
  const [listeningField, setListeningField] = useState(null)
  const recognitionRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '', business: '', industry: '', employees: '', budget: '',
    businessDescription: '', currentTools: '',
    departments: '', itInfrastructure: '', compliance: '', timeline: '',
    process1: '', process2: '', process3: '', process4: '', process5: '',
    process6: '', process7: '', process8: '', process9: '', process10: '',
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
        if (data.error) setSessionError(true)
        else setSessionData(data)
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
    recognition.onend  = () => setListeningField(null)
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
          flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%',
          border: active ? '2px solid #e53935' : '2px solid #1e2a45',
          background: active ? '#1a0000' : '#0d1221',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '1rem', padding: 0,
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
      const res = await fetch('/api/enterprise-intake', {
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
    } catch {
      alert('Something went wrong. Please email support@novonavis.com.')
      setSubmitting(false)
    }
  }

  const fieldRow = (fieldName, children) => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
      {children}
      <MicButton fieldName={fieldName} />
    </div>
  )

  return (
    <>
      <Head>
        <title>Enterprise Intake | Novo Navis</title>
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
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div className="report-page">

        {sessionError ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p style={{ color: '#e57373', marginBottom: '1rem' }}>
              We could not verify your payment session.
            </p>
            <p style={{ color: '#8a95aa', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              If you completed checkout, please email{' '}
              <a href="mailto:support@novonavis.com" style={{ color: '#c8a96e' }}>support@novonavis.com</a>{' '}
              or call <a href="tel:6234289308" style={{ color: '#c8a96e' }}>(623) 428-9308</a>.
            </p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✓</div>
              <h1 style={{ marginBottom: '0.5rem' }}>
                Payment confirmed
                {sessionData?.name ? `, ${sessionData.name.split(' ')[0]}` : ''}.
              </h1>
              <p className="lead" style={{ marginBottom: '0.5rem' }}>
                Now tell us about {sessionData?.business || 'your organization'} so we can build your Enterprise AI Blueprint.
              </p>
              <p style={{ color: '#8a95aa', fontSize: '0.9rem' }}>
                The more specific you are, the more actionable your blueprint will be. Up to 10 workflows — list as many as apply.
              </p>
            </div>

            {!sessionData && !sessionError && (
              <p style={{ textAlign: 'center', color: '#8a95aa', marginBottom: '2rem' }}>
                Verifying your payment...
              </p>
            )}

            {sessionData && (
              <form onSubmit={handleSubmit}>

                {/* ── BASIC IDENTITY ── */}
                <div className="form-group">
                  <label>Your Full Name *</label>
                  {fieldRow('name',
                    <input type="text" name="name" required value={formData.name}
                      onChange={handleChange} placeholder="Jane Smith" style={{ flex: 1 }} />
                  )}
                </div>

                <div className="form-group">
                  <label>Business / Organization Name *</label>
                  {fieldRow('business',
                    <input type="text" name="business" required value={formData.business}
                      onChange={handleChange} placeholder="Acme Corp" style={{ flex: 1 }} />
                  )}
                </div>

                <div className="form-group">
                  <label>Industry *</label>
                  <select name="industry" required value={formData.industry} onChange={handleChange}>
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
                    <option value="Technology">Technology</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Logistics / Distribution">Logistics / Distribution</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Number of Employees</label>
                  <select name="employees" value={formData.employees} onChange={handleChange}>
                    <option value="">Select range</option>
                    <option value="16-50">16 to 50</option>
                    <option value="51-100">51 to 100</option>
                    <option value="101-250">101 to 250</option>
                    <option value="251-500">251 to 500</option>
                    <option value="500+">500 or more</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Monthly budget for new software tools *</label>
                  <select name="budget" required value={formData.budget} onChange={handleChange}>
                    <option value="">Select your budget</option>
                    <option value="$200–$500/month">$200 – $500 / month</option>
                    <option value="$500–$1,000/month">$500 – $1,000 / month</option>
                    <option value="$1,000–$2,500/month">$1,000 – $2,500 / month</option>
                    <option value="$2,500–$5,000/month">$2,500 – $5,000 / month</option>
                    <option value="$5,000+/month">$5,000+ / month</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>

                {/* ── ENTERPRISE CONTEXT ── */}
                <hr className="divider" />
                <p style={{ color: '#8a95aa', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Tell us about your organization's structure and technical environment.
                </p>

                <div className="form-group">
                  <label>How many distinct departments or teams will this blueprint cover? *</label>
                  <select name="departments" required value={formData.departments} onChange={handleChange}>
                    <option value="">Select range</option>
                    <option value="1-2">1 to 2</option>
                    <option value="3-5">3 to 5</option>
                    <option value="6-10">6 to 10</option>
                    <option value="10+">More than 10</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Current IT infrastructure</label>
                  <select name="itInfrastructure" value={formData.itInfrastructure} onChange={handleChange}>
                    <option value="">Select one</option>
                    <option value="Cloud-based (Google Workspace, Microsoft 365, etc.)">Cloud-based (Google Workspace, Microsoft 365, etc.)</option>
                    <option value="On-premise servers">On-premise servers</option>
                    <option value="Hybrid (cloud + on-premise)">Hybrid (cloud + on-premise)</option>
                    <option value="Outsourced / managed IT">Outsourced / managed IT</option>
                    <option value="Minimal / no formal IT">Minimal / no formal IT</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Compliance requirements that apply to your business</label>
                  <select name="compliance" value={formData.compliance} onChange={handleChange}>
                    <option value="">Select one (most important)</option>
                    <option value="None">None</option>
                    <option value="HIPAA (healthcare)">HIPAA (healthcare)</option>
                    <option value="SOC 2">SOC 2</option>
                    <option value="PCI-DSS (payment card data)">PCI-DSS (payment card data)</option>
                    <option value="GDPR">GDPR</option>
                    <option value="FedRAMP / government">FedRAMP / government</option>
                    <option value="Multiple / other">Multiple / other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Target implementation timeline</label>
                  <select name="timeline" value={formData.timeline} onChange={handleChange}>
                    <option value="">Select one</option>
                    <option value="ASAP (within 3 months)">ASAP (within 3 months)</option>
                    <option value="6 months">6 months</option>
                    <option value="12 months">12 months</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>

                {/* ── BUSINESS DESCRIPTION ── */}
                <hr className="divider" />

                <div className="form-group">
                  <label>Tell us about your business — what it does, who it serves, and anything we should know *</label>
                  {fieldRow('businessDescription',
                    <textarea name="businessDescription" required value={formData.businessDescription}
                      onChange={handleChange} style={{ flex: 1 }}
                      placeholder="Example: We are a regional property management company overseeing 1,400 units across 12 properties in the Phoenix metro area. We have separate teams for leasing, maintenance, accounting, and tenant relations..." />
                  )}
                </div>

                <div className="form-group">
                  <label>What software tools does your organization currently use?</label>
                  {fieldRow('currentTools',
                    <textarea name="currentTools" value={formData.currentTools}
                      onChange={handleChange} style={{ flex: 1 }}
                      placeholder="Example: Microsoft 365, Salesforce, QuickBooks Enterprise, Slack, Zoom, custom ERP system..." />
                  )}
                </div>

                {/* ── WORKFLOWS ── */}
                <hr className="divider" />
                <p style={{ color: '#8a95aa', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                  Describe the workflows you want automated. The first three are required — add as many as apply (up to 10).
                </p>

                {[
                  ['process1', 'Workflow #1 — Describe it and how long it takes per week *', true,
                    'Example: Our leasing team manually processes every rental application in a spreadsheet, cross-references credit reports, and emails results. Takes about 3 hours per application, 20+ applications per week.'],
                  ['process2', 'Workflow #2 — Describe it and how long it takes per week *', true,
                    'Example: Maintenance request intake — tenants call or email, a coordinator manually logs each request, assigns to a technician by phone, and follows up manually. ~15 hours per week across the team.'],
                  ['process3', 'Workflow #3 — Describe it and how long it takes per week *', true,
                    'Example: Monthly owner reporting — we manually compile financials, occupancy stats, and maintenance logs into a PDF for each property owner. Takes 2 days per month.'],
                  ['process4', 'Workflow #4 (optional)', false, ''],
                  ['process5', 'Workflow #5 (optional)', false, ''],
                  ['process6', 'Workflow #6 (optional)', false, ''],
                  ['process7', 'Workflow #7 (optional)', false, ''],
                  ['process8', 'Workflow #8 (optional)', false, ''],
                  ['process9', 'Workflow #9 (optional)', false, ''],
                  ['process10', 'Workflow #10 (optional)', false, ''],
                ].map(([name, label, required, placeholder]) => (
                  <div key={name} className="form-group">
                    <label>{label}</label>
                    {fieldRow(name,
                      <textarea name={name} required={required} value={formData[name]}
                        onChange={handleChange} style={{ flex: 1 }}
                        placeholder={placeholder} />
                    )}
                  </div>
                ))}

                {/* ── PRIMARY PROBLEM ── */}
                <hr className="divider" />

                <div className="form-group">
                  <label>What is the single biggest operational problem your organization faces right now? *</label>
                  {fieldRow('goal',
                    <textarea name="goal" required value={formData.goal}
                      onChange={handleChange} style={{ flex: 1 }}
                      placeholder="Example: We're scaling from 1,400 to 2,500 units over the next 18 months and our current manual processes won't survive that growth. We need AI to absorb the volume increase without proportional headcount growth." />
                  )}
                </div>

                <p style={{ color: '#8a95aa', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  🎤 Tap the microphone next to any field to speak your answer.
                </p>

                {listeningField && (
                  <p style={{ color: '#e53935', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold' }}>
                    🔴 Listening... speak now. Tap the mic again to stop.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit — Start Building My Enterprise Blueprint'}
                </button>

                <p style={{ textAlign: 'center', color: '#4a5568', fontSize: '0.85rem', marginTop: '1rem' }}>
                  Your Enterprise AI Blueprint will be built and delivered to your email. Given the depth of analysis, delivery may take up to 30 minutes.
                </p>

              </form>
            )}
          </>
        )}

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{ marginTop: '0.5rem' }}>
          <Link href="/privacy">Privacy Policy</Link> &nbsp;·&nbsp;
          <Link href="/terms">Terms and Conditions</Link>
        </p>
      </footer>
    </>
  )
}
