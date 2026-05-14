// pages/recovery-intake.js
// novonavis.com/recovery-intake
// Distressed Asset Recovery Diagnostic intake form.
// Simplified — David pulls assets, financials, and research himself from EDGAR.

import Head from 'next/head'
import { useState } from 'react'

const NAVY  = '#1B2A4A'
const GOLD  = '#c8a96e'
const INK   = '#0c1322'
const MUTED = '#6b7a99'

const INDUSTRIES = [
  'Airlines / Aviation',
  'Automotive',
  'Construction',
  'Energy / Oil & Gas',
  'Financial Services',
  'Healthcare',
  'Hospitality / Hotels',
  'Manufacturing',
  'Media / Publishing',
  'Paper / Pulp / Forestry',
  'Real Estate',
  'Retail',
  'Restaurant / Food Service',
  'Shipping / Logistics',
  'Technology',
  'Telecommunications',
  'Transportation',
  'Other',
]

export default function RecoveryIntake() {
  const [form, setForm] = useState({
    email:          '',
    contactName:    '',
    companyName:    '',
    ticker:         '',
    isPublic:       'public',
    industry:       '',
    situation:      '',
    currentMetrics: '',
    targetMetrics:  '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error,      setError]      = useState('')

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleSubmit = async () => {
    if (!form.email.trim())       { setError('Email is required.'); return }
    if (!form.contactName.trim()) { setError('Contact name is required.'); return }
    if (!form.companyName.trim()) { setError('Company name is required.'); return }
    if (!form.industry)           { setError('Industry is required.'); return }
    if (!form.situation.trim())   { setError('Please describe the situation.'); return }
    if (!form.targetMetrics.trim()) { setError('Target metrics are required.'); return }

    setSubmitting(true)

    try {
      const res  = await fetch('/api/recovery-intake', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.orderId) {
        window.location.href = `/recovery-progress?id=${data.orderId}`
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
        setSubmitting(false)
      }
    } catch {
      setError('Network error. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Recovery Diagnostic Intake — Novo Navis</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: ${NAVY}; }
          .page {
            min-height: 100vh;
            background: ${NAVY};
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding: 2rem 1rem 4rem;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
          }
          .card {
            background: #ffffff;
            border-radius: 12px;
            padding: 2rem 1.75rem 2.5rem;
            width: 100%;
            max-width: 680px;
            box-shadow: 0 8px 40px rgba(0,0,0,0.35);
          }
          .eyebrow {
            color: ${GOLD};
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            margin-bottom: 0.4rem;
          }
          h1 {
            color: ${NAVY};
            font-size: 1.5rem;
            font-weight: 800;
            margin: 0 0 0.3rem;
            font-family: Georgia, serif;
          }
          .subtitle {
            color: ${MUTED};
            font-size: 0.88rem;
            margin: 0 0 2rem;
            line-height: 1.55;
          }
          .section-label {
            color: ${NAVY};
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            margin: 1.75rem 0 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #e8ecf4;
          }
          .field { margin-bottom: 1.25rem; }
          label {
            display: block;
            color: ${INK};
            font-size: 0.88rem;
            font-weight: 700;
            margin-bottom: 0.35rem;
          }
          .hint {
            color: #8a95aa;
            font-size: 0.78rem;
            margin: -0.15rem 0 0.4rem;
            line-height: 1.5;
          }
          input, select, textarea {
            width: 100%;
            padding: 0.75rem 0.9rem;
            border: 1px solid #d0d4de;
            border-radius: 8px;
            font-size: 0.95rem;
            color: ${INK};
            background: #ffffff;
            font-family: inherit;
            outline: none;
            transition: border-color 0.15s;
          }
          input:focus, select:focus, textarea:focus { border-color: ${GOLD}; }
          textarea { resize: vertical; line-height: 1.55; }
          .toggle-row {
            display: flex;
            gap: 0.75rem;
            margin-bottom: 1.25rem;
          }
          .toggle-btn {
            flex: 1;
            padding: 0.75rem;
            border-radius: 8px;
            border: 2px solid #d0d4de;
            background: #ffffff;
            color: ${MUTED};
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            text-align: center;
            transition: all 0.15s;
            font-family: inherit;
          }
          .toggle-btn.active {
            border-color: ${NAVY};
            background: ${NAVY};
            color: #ffffff;
          }
          .price-box {
            background: #f4f6fb;
            border: 1px solid #e0e4ef;
            border-radius: 10px;
            padding: 1.25rem 1.5rem;
            margin: 1.75rem 0 1.25rem;
          }
          .price-box p {
            font-size: 0.88rem;
            color: ${MUTED};
            margin: 0 0 0.5rem;
            line-height: 1.55;
          }
          .price-box p:last-child { margin-bottom: 0; }
          .price-box strong { color: ${NAVY}; }
          .error {
            color: #c0392b;
            font-size: 0.88rem;
            margin-bottom: 0.75rem;
          }
          .btn {
            width: 100%;
            padding: 1rem;
            background: ${NAVY};
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            font-family: inherit;
            transition: opacity 0.15s;
          }
          .btn:disabled { opacity: 0.6; cursor: not-allowed; }
          .back-link {
            display: block;
            text-align: center;
            margin-top: 1rem;
            color: ${MUTED};
            font-size: 0.85rem;
            text-decoration: none;
          }
        `}</style>
      </Head>

      <div className="page">
        <div className="card">
          <div className="eyebrow">Novo Navis — Recovery Diagnostic</div>
          <h1>Request a Diagnostic</h1>
          <p className="subtitle">
            Tell us the company and what you're trying to achieve. David will pull the financials,
            inventory the assets, and build the recovery architecture himself.
          </p>

          {error && <p className="error">{error}</p>}

          {/* CONTACT */}
          <div className="section-label">Your Contact Information</div>

          <div className="field">
            <label>Email *</label>
            <input type="email" value={form.email}
              onChange={e => update('email', e.target.value)}
              placeholder="you@company.com" />
          </div>

          <div className="field">
            <label>Your Name *</label>
            <input type="text" value={form.contactName}
              onChange={e => update('contactName', e.target.value)}
              placeholder="Full name" />
          </div>

          {/* COMPANY */}
          <div className="section-label">Company</div>

          <div className="field">
            <label>Company Name *</label>
            <input type="text" value={form.companyName}
              onChange={e => update('companyName', e.target.value)}
              placeholder="Legal company name" />
          </div>

          <div className="field">
            <label>Public or Private?</label>
            <div className="toggle-row">
              <button
                className={`toggle-btn ${form.isPublic === 'public' ? 'active' : ''}`}
                onClick={() => update('isPublic', 'public')}
              >Publicly Traded</button>
              <button
                className={`toggle-btn ${form.isPublic === 'private' ? 'active' : ''}`}
                onClick={() => update('isPublic', 'private')}
              >Private Company</button>
            </div>
          </div>

          {form.isPublic === 'public' && (
            <div className="field">
              <label>Ticker Symbol</label>
              <p className="hint">David will pull SEC filings automatically.</p>
              <input type="text" value={form.ticker}
                onChange={e => update('ticker', e.target.value.toUpperCase())}
                placeholder="e.g. STI" />
            </div>
          )}

          <div className="field">
            <label>Industry *</label>
            <select value={form.industry} onChange={e => update('industry', e.target.value)}>
              <option value="">Select industry...</option>
              {INDUSTRIES.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* SITUATION */}
          <div className="section-label">Situation</div>

          <div className="field">
            <label>Describe the situation *</label>
            <p className="hint">What is going wrong? How long has it been deteriorating?</p>
            <textarea rows={4} value={form.situation}
              onChange={e => update('situation', e.target.value)}
              placeholder="e.g. Revenue has declined for three consecutive quarters, margins are compressing, and we have approximately 6 months of cash runway at current burn rate..." />
          </div>

          {/* METRICS */}
          <div className="section-label">Metrics</div>

          <div className="field">
            <label>Current key metrics</label>
            <p className="hint">Where you are now. Revenue, margins, cash, debt — whatever matters most.</p>
            <textarea rows={3} value={form.currentMetrics}
              onChange={e => update('currentMetrics', e.target.value)}
              placeholder="e.g. Revenue $12M, gross margin 8%, cash $2M, debt $18M..." />
          </div>

          <div className="field">
            <label>Target metrics *</label>
            <p className="hint">Where you need to get to. David will build every recommendation around closing these gaps.</p>
            <textarea rows={3} value={form.targetMetrics}
              onChange={e => update('targetMetrics', e.target.value)}
              placeholder="e.g. Gross margin 20%, cash flow positive within 12 months, reduce debt by 40%..." />
          </div>

          {/* PRICE BOX */}
          <div className="price-box">
            <p><strong>How this works:</strong></p>
            <p>Submit your information. David will pull the company's financials and assets from public sources, run a full causal diagnostic, and deliver a free preview. The preview includes the Executive Summary, Causal Diagnosis, and Target Metrics Assessment.</p>
            <p>If you find the preview valuable, pay $5,000 to unlock the complete report — including the full Asset Multi-Purposing Plan and Agent Architecture Plan.</p>
            <p><strong>You pay nothing until you see the preview.</strong></p>
          </div>

          {error && <p className="error">{error}</p>}

          <button className="btn" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit for Free Diagnostic Preview →'}
          </button>

          <a href="/recovery" className="back-link">← Back to Recovery</a>
        </div>
      </div>
    </>
  )
}
