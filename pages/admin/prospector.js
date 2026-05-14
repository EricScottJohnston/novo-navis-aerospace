// pages/admin/prospector.js
// novonavis.com/admin/prospector
// David Prospector admin interface — search EDGAR for distressed companies.
// Protected by ADMIN_SECRET environment variable.

import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

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
]

const SIGNALS = [
  { id: 'going_concern',   label: 'Going concern warning' },
  { id: 'negative_cash_flow', label: 'Negative cash flow from operations' },
  { id: 'cash_runway',     label: 'Cash runway / liquidity concerns' },
  { id: 'debt_covenant',   label: 'Covenant breach or waiver' },
  { id: 'revenue_decline', label: 'Revenue decline (3+ quarters)' },
  { id: 'negative_equity', label: 'Negative stockholders equity' },
]

export default function ProspectorAdmin() {
  const router = useRouter()

  const [secret,       setSecret]       = useState('')
  const [industries,   setIndustries]   = useState([])
  const [signals,      setSignals]      = useState(['going_concern'])
  const [startDate,    setStartDate]    = useState('2025-01-01')
  const [endDate,      setEndDate]      = useState(new Date().toISOString().split('T')[0])
  const [minEmployees, setMinEmployees] = useState('')
  const [maxEmployees, setMaxEmployees] = useState('')
  const [ticker,       setTicker]       = useState('')
  const [maxProspects, setMaxProspects] = useState('10')
  const [submitting,   setSubmitting]   = useState(false)
  const [error,        setError]        = useState('')

  const toggleIndustry = (ind) => {
    setIndustries(prev =>
      prev.includes(ind) ? prev.filter(i => i !== ind) : [...prev, ind]
    )
  }

  const toggleSignal = (id) => {
    setSignals(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const handleRun = async () => {
    if (!secret.trim()) { setError('Enter the admin password.'); return }
    if (signals.length === 0 && !ticker.trim()) {
      setError('Select at least one distress signal or enter a specific ticker.')
      return
    }
    setError(''); setSubmitting(true)

    try {
      const res  = await fetch('/api/prospector-intake', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          secret,
          industries,
          signals,
          startDate,
          endDate,
          minEmployees: minEmployees ? parseInt(minEmployees) : 0,
          maxEmployees: maxEmployees ? parseInt(maxEmployees) : 999999,
          ticker:       ticker.toUpperCase().trim(),
          maxProspects: parseInt(maxProspects) || 10,
        }),
      })
      const data = await res.json()
      if (res.ok && data.runId) {
        router.push(`/track/${data.runId}`)
      } else {
        setError(data.error || 'Something went wrong.')
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
        <title>David Prospector — Novo Navis Admin</title>
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          .card {
            background: #ffffff;
            border-radius: 12px;
            padding: 2rem 1.75rem 2.5rem;
            width: 100%;
            max-width: 700px;
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
            margin: 0 0 1.75rem;
            line-height: 1.55;
          }
          .section-label {
            color: ${NAVY};
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            margin: 1.75rem 0 0.75rem;
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
          }
          input, select {
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
          input:focus, select:focus { border-color: ${GOLD}; }
          .row-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
          .checkbox-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
          }
          @media (max-width: 500px) {
            .checkbox-grid { grid-template-columns: 1fr; }
            .row-2 { grid-template-columns: 1fr; }
          }
          .checkbox-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.6rem 0.75rem;
            border: 1px solid #d0d4de;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.85rem;
            color: ${INK};
            transition: all 0.12s;
            user-select: none;
          }
          .checkbox-item.active {
            border-color: ${NAVY};
            background: #f0f3f9;
            font-weight: 600;
          }
          .checkbox-item input[type="checkbox"] {
            width: auto;
            padding: 0;
            margin: 0;
            border: none;
            accent-color: ${NAVY};
          }
          .industry-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.4rem;
            max-height: 220px;
            overflow-y: auto;
            border: 1px solid #e0e4ef;
            border-radius: 8px;
            padding: 0.75rem;
          }
          .industry-item {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.82rem;
            color: ${INK};
            cursor: pointer;
            padding: 0.2rem 0;
          }
          .industry-item input[type="checkbox"] {
            width: auto;
            padding: 0;
            border: none;
            accent-color: ${NAVY};
          }
          .divider {
            border: none;
            border-top: 1px solid #e8ecf4;
            margin: 1.5rem 0;
          }
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
        `}</style>
      </Head>

      <div className="page">
        <div className="card">
          <div className="eyebrow">Novo Navis — Admin</div>
          <h1>David Prospector</h1>
          <p className="subtitle">
            Search EDGAR for distressed public companies matching your parameters.
            David scores each prospect, researches contacts, and drafts outreach emails.
            Results emailed to you when complete.
          </p>

          {error && <p className="error">{error}</p>}

          {/* PASSWORD */}
          <div className="field">
            <label>Admin Password</label>
            <input
              type="password"
              value={secret}
              onChange={e => { setSecret(e.target.value); setError('') }}
              placeholder="Enter admin password"
            />
          </div>

          <hr className="divider" />

          {/* SPECIFIC TICKER */}
          <div className="section-label">Specific Target (Optional)</div>
          <div className="field">
            <label>Ticker Symbol</label>
            <p className="hint">Skip the broad scan and go straight to one company.</p>
            <input
              type="text"
              value={ticker}
              onChange={e => setTicker(e.target.value.toUpperCase())}
              placeholder="e.g. SAVE"
              style={{ textTransform: 'uppercase' }}
            />
          </div>

          {/* DISTRESS SIGNALS */}
          <div className="section-label">Distress Signals</div>
          <div className="field">
            <p className="hint">David will search EDGAR full-text for companies with these signals in recent filings.</p>
            <div className="checkbox-grid">
              {SIGNALS.map(sig => (
                <label
                  key={sig.id}
                  className={`checkbox-item ${signals.includes(sig.id) ? 'active' : ''}`}
                  onClick={() => toggleSignal(sig.id)}
                >
                  <input
                    type="checkbox"
                    checked={signals.includes(sig.id)}
                    onChange={() => toggleSignal(sig.id)}
                  />
                  {sig.label}
                </label>
              ))}
            </div>
          </div>

          {/* INDUSTRIES */}
          <div className="section-label">Industries (Optional Filter)</div>
          <div className="field">
            <p className="hint">Leave blank to search all industries.</p>
            <div className="industry-grid">
              {INDUSTRIES.map(ind => (
                <label
                  key={ind}
                  className="industry-item"
                  onClick={() => toggleIndustry(ind)}
                >
                  <input
                    type="checkbox"
                    checked={industries.includes(ind)}
                    onChange={() => toggleIndustry(ind)}
                  />
                  {ind}
                </label>
              ))}
            </div>
          </div>

          {/* DATE RANGE */}
          <div className="section-label">Filing Date Range</div>
          <div className="row-2">
            <div className="field">
              <label>From</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div className="field">
              <label>To</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* COMPANY SIZE */}
          <div className="section-label">Company Size (Optional)</div>
          <div className="row-2">
            <div className="field">
              <label>Min Employees</label>
              <input
                type="number"
                value={minEmployees}
                onChange={e => setMinEmployees(e.target.value)}
                placeholder="e.g. 100"
              />
            </div>
            <div className="field">
              <label>Max Employees</label>
              <input
                type="number"
                value={maxEmployees}
                onChange={e => setMaxEmployees(e.target.value)}
                placeholder="e.g. 50000"
              />
            </div>
          </div>

          {/* MAX PROSPECTS */}
          <div className="section-label">Output</div>
          <div className="field">
            <label>Max Prospects to Return</label>
            <p className="hint">David will return the top N by distress score. Higher numbers take longer.</p>
            <select value={maxProspects} onChange={e => setMaxProspects(e.target.value)}>
              <option value="5">5 prospects</option>
              <option value="10">10 prospects</option>
              <option value="15">15 prospects</option>
              <option value="20">20 prospects</option>
            </select>
          </div>

          <hr className="divider" />

          {error && <p className="error">{error}</p>}

          <button className="btn" onClick={handleRun} disabled={submitting}>
            {submitting ? 'Starting David Prospector...' : 'Run Prospector →'}
          </button>
        </div>
      </div>
    </>
  )
}
