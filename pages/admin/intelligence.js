// pages/admin/intelligence.js
// Private admin interface for submitting intelligence report topics to David.
// Protected by ADMIN_SECRET environment variable.
// Access at: novonavis.com/admin/intelligence

import Head from 'next/head'
import { useState } from 'react'


const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'
const INK  = '#0c1322'
const BODY = '#2d3748'

export default function IntelligenceAdmin() {
  const [secret,      setSecret]      = useState('')
  const [topic,       setTopic]       = useState('')
  const [angle,       setAngle]       = useState('')
  const [constraints, setConstraints] = useState('')
  const [submitting,  setSubmitting]  = useState(false)
  const [result,      setResult]      = useState(null)
  const [error,       setError]       = useState('')

  const handleSubmit = async () => {
    if (!secret.trim()) { setError('Enter the admin password.'); return }
    if (!topic.trim())  { setError('Topic is required.'); return }
    setError(''); setSubmitting(true); setResult(null)

    try {
      const res  = await fetch('/api/intelligence-intake', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ secret, topic, angle, constraints }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setResult(data)
        setTopic(''); setAngle(''); setConstraints('')
      } else {
        setError(data.error || 'Something went wrong.')
      }
    } catch {
      setError('Network error. Check your connection.')
    }
    setSubmitting(false)
  }

  return (
    <>
      <Head>
        <title>Intelligence Admin — Novo Navis</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; }
          body { margin: 0; background: ${NAVY}; }
          .page {
            min-height: 100vh;
            background: ${NAVY};
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding: 2rem 1rem 4rem;
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          h1 {
            color: ${NAVY};
            font-size: 1.5rem;
            font-weight: 800;
            margin: 0 0 0.3rem;
            font-family: Georgia, serif;
          }
          .subtitle {
            color: #6b7a99;
            font-size: 0.88rem;
            margin: 0 0 1.75rem;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          .field { margin-bottom: 1.25rem; }
          label {
            display: block;
            color: ${INK};
            font-size: 0.88rem;
            font-weight: 700;
            margin-bottom: 0.35rem;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          .hint {
            color: #8a95aa;
            font-size: 0.78rem;
            margin: -0.2rem 0 0.45rem;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          input, textarea {
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
          input:focus, textarea:focus { border-color: ${GOLD}; }
          textarea { resize: vertical; line-height: 1.55; }
          .divider {
            border: none;
            border-top: 1px solid #e8ecf4;
            margin: 1.5rem 0;
          }
          .btn {
            width: 100%;
            padding: 0.95rem;
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
          .error {
            color: #c0392b;
            font-size: 0.88rem;
            margin-bottom: 0.75rem;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          .success-box {
            background: #f4fbf6;
            border: 1px solid #c4e2cf;
            border-radius: 10px;
            padding: 1.25rem 1.4rem;
            margin-bottom: 1.25rem;
          }
          .success-box p {
            margin: 0 0 0.5rem;
            font-size: 0.92rem;
            color: ${BODY};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          .success-box p:last-child { margin-bottom: 0; }
          .success-box strong { color: ${NAVY}; }
          .order-id {
            font-family: 'Courier New', monospace;
            font-size: 0.95rem;
            background: #e8f4ed;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            color: #1a5c33;
          }
        `}</style>
      </Head>

      <div className="page">
        <div className="card">
          <div className="eyebrow">Novo Navis — Admin</div>
          <h1>Intelligence Report</h1>
          <p className="subtitle">Submit a topic to David. He will research, analyze, and build the report.</p>

          {result && (
            <div className="success-box">
              <p>✅ <strong>Report queued successfully.</strong></p>
              <p>Order ID: <span className="order-id">{result.orderId}</span></p>
              <p>David is running. When complete, create the report page at:</p>
              <p><strong>pages/news/{result.orderId}.js</strong></p>
            </div>
          )}

          {error && <p className="error">{error}</p>}

          <div className="field">
            <label>Admin Password *</label>
            <input
              type="password"
              value={secret}
              onChange={e => { setSecret(e.target.value); setError('') }}
              placeholder="Enter admin password"
              autoComplete="current-password"
            />
          </div>

          <hr className="divider" />

          <div className="field">
            <label>Topic *</label>
            <p className="hint">What is the report about? 1–3 sentences.</p>
            <textarea
              rows={3}
              value={topic}
              onChange={e => { setTopic(e.target.value); setError('') }}
              placeholder="e.g. Which U.S. carriers stand to benefit most from Spirit Airlines' bankruptcy, and through what structural mechanisms beyond simple passenger absorption."
            />
          </div>

          <div className="field">
            <label>Angle (optional)</label>
            <p className="hint">The non-obvious question David should focus on. What are the hidden variables?</p>
            <textarea
              rows={3}
              value={angle}
              onChange={e => setAngle(e.target.value)}
              placeholder="e.g. Focus on slot reallocation dynamics, loyalty program orphan migration, and which carriers benefit through mechanism rather than proximity."
            />
          </div>

          <div className="field">
            <label>Constraints (optional)</label>
            <p className="hint">Anything David should avoid, assume, or be aware of going in.</p>
            <textarea
              rows={2}
              value={constraints}
              onChange={e => setConstraints(e.target.value)}
              placeholder="e.g. Avoid surface-level passenger absorption framing. Treat each carrier as a distinct strategic case."
            />
          </div>

          <button
            className="btn"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Submitting to David...' : 'Run Intelligence Report →'}
          </button>
        </div>
      </div>
    </>
  )
}
