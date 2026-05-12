// pages/recovery-intake.js
// novonavis.com/recovery-intake
// Distressed Asset Recovery Diagnostic intake form — $5,000

import Head from 'next/head'
import { useState } from 'react'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'
const INK  = '#0c1322'
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
    isPublic:       'private',
    industry:       '',
    employees:      '',
    situation:      '',
    currentMetrics: '',
    targetMetrics:  '',
    timeline:       '',
    assets:         '',
    alreadyTried:   '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [result,     setResult]     = useState(null)
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
    if (!form.timeline.trim())    { setError('Timeline is required.'); return }

    setSubmitting(true)

    try {
      const res  = await fetch('/api/recovery-intake', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url
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
            max-width: 720px;
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
            font-size: 1.6rem;
            font-weight: 800;
            margin: 0 0 0.3rem;
            font-family: Georgia, serif;
          }

          .subtitle {
            color: ${MUTED};
            font-size: 0.9rem;
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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

          .back-link:hover { color: ${NAVY}; }
        `}</style>
      </Head>

      <div className="page">
        <div className="card">
          <div className="eyebrow">Novo Navis — Recovery Diagnostic</div>
          <h1>Distressed Asset Diagnostic</h1>
          <p className="subtitle">
            David will analyze your company's situation, identify the causal drivers of distress,
            and produce a full recovery architecture plan including an asset multi-purposing strategy
            and the specific agents he would deploy. Free preview delivered first. Pay $5,000 to unlock
            the complete report.
          </p>

          {error && <p className="error">{error}</p>}

          {/* ── CONTACT ── */}
          <div className="section-label">Contact Information</div>

          <div className="field">
            <label>Your Email *</label>
            <input type="email" value={form.email}
              onChange={e => update('email', e.target.value)}
              placeholder="cfo@yourcompany.com" />
          </div>

          <div className="field">
            <label>Your Name *</label>
            <input type="text" value={form.contactName}
              onChange={e => update('contactName', e.target.value)}
              placeholder="Full name" />
          </div>

          {/* ── COMPANY ── */}
          <div className="section-label">Company Information</div>

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
              >
                Publicly Traded
              </button>
              <button
                className={`toggle-btn ${form.isPublic === 'private' ? 'active' : ''}`}
                onClick={() => update('isPublic', 'private')}
              >
                Private Company
              </button>
            </div>
          </div>

          {form.isPublic === 'public' && (
            <div className="field">
              <label>Ticker Symbol</label>
              <p className="hint">David will pull your SEC filings automatically from EDGAR.</p>
              <input type="text" value={form.ticker}
                onChange={e => update('ticker', e.target.value.toUpperCase())}
                placeholder="e.g. SAVE" />
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

          <div className="field">
            <label>Number of Employees</label>
            <input type="text" value={form.employees}
              onChange={e => update('employees', e.target.value)}
              placeholder="e.g. 2,400" />
          </div>

          {/* ── SITUATION ── */}
          <div className="section-label">Situation</div>

          <div className="field">
            <label>Describe the distress situation *</label>
            <p className="hint">What is going wrong? How long has it been deteriorating? What triggered it?</p>
            <textarea rows={4} value={form.situation}
              onChange={e => update('situation', e.target.value)}
              placeholder="e.g. We have been losing market share for 18 months due to rising fuel costs and aggressive pricing from legacy carriers. Our cash runway is approximately 6 months at current burn rate..." />
          </div>

          <div className="field">
            <label>What have you already tried?</label>
            <p className="hint">Cost cuts, refinancing, asset sales, management changes, etc.</p>
            <textarea rows={3} value={form.alreadyTried}
              onChange={e => update('alreadyTried', e.target.value)}
              placeholder="e.g. We reduced headcount by 15% in Q4, renegotiated two aircraft leases, and explored a merger with a regional carrier that fell through..." />
          </div>

          {/* ── METRICS ── */}
          <div className="section-label">Metrics</div>

          <div className="field">
            <label>Current Key Metrics *</label>
            <p className="hint">Where you are now. Include the metrics that matter most for your industry.</p>
            <textarea rows={3} value={form.currentMetrics}
              onChange={e => update('currentMetrics', e.target.value)}
              placeholder="e.g. Revenue: $1.2B. Gross margin: 8%. CASM: $0.097. Cash: $180M. Debt: $3.1B. Monthly burn: $28M..." />
          </div>

          <div className="field">
            <label>Target Metrics *</label>
            <p className="hint">Where you need to get to. David will build every recommendation around closing these gaps.</p>
            <textarea rows={3} value={form.targetMetrics}
              onChange={e => update('targetMetrics', e.target.value)}
              placeholder="e.g. CASM: $0.05. Gross margin: 18%. Cash runway: 24 months. Revenue: $1.6B. Break-even in 14 months..." />
          </div>

          <div className="field">
            <label>Timeline *</label>
            <p className="hint">How long do you have before the situation becomes unrecoverable?</p>
            <input type="text" value={form.timeline}
              onChange={e => update('timeline', e.target.value)}
              placeholder="e.g. 6 months of cash runway. Must show lenders progress by Q3 2026." />
          </div>

          {/* ── ASSETS ── */}
          <div className="section-label">Assets</div>

          <div className="field">
            <label>Describe your major assets</label>
            <p className="hint">Physical assets, intellectual property, contracts, relationships, capacity. David will do a full inventory but this gives him a starting point.</p>
            <textarea rows={4} value={form.assets}
              onChange={e => update('assets', e.target.value)}
              placeholder="e.g. 47 aircraft (owned: 12, leased: 35). 8 maintenance hangars across 4 hubs. Gates at 32 airports. 4.2M active loyalty members. MRO certification for Boeing 737 and Airbus A320 families..." />
          </div>

          {/* ── PRICE BOX ── */}
          <div className="price-box">
            <p><strong>How this works:</strong></p>
            <p>Submit your intake form. David will run the full diagnostic and deliver a free preview within 2-4 hours. The preview includes the Executive Summary, Causal Diagnosis, and Target Metrics Assessment — at no cost.</p>
            <p>If you find the preview valuable, pay $5,000 to unlock the complete report — including the full Asset Multi-Purposing Plan and Agent Architecture Plan.</p>
            <p><strong>You pay nothing until you see the preview. $5,000 to unlock. No subscription. No retainer.</strong></p>
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
