// pages/admin/prospector-progress.js
// novonavis.com/admin/prospector-progress?id={runId}
// Live progress view for David Prospector runs.
// Polls S3 every 3 seconds and updates in real time.

import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

const NAVY  = '#1B2A4A'
const GOLD  = '#c8a96e'
const INK   = '#0c1322'
const MUTED = '#6b7a99'

const STATUS_COLORS = {
  running:  '#3498db',
  complete: '#2ecc71',
  error:    '#e74c3c',
}

export default function ProspectorProgress() {
  const router  = useRouter()
  const { id }  = router.query

  const [state,    setState]    = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [notFound, setNotFound] = useState(false)
  const intervalRef = useRef(null)
  const logEndRef   = useRef(null)

  const fetchProgress = async () => {
    if (!id) return
    try {
      const res = await fetch(`/api/prospector-progress?id=${id}`)
      if (res.status === 404) {
        // Worker not started yet — keep polling
        setLoading(false)
        return
      }
      if (!res.ok) return
      const data = await res.json()
      setState(data)
      setLoading(false)
      if (data.status === 'complete' || data.status === 'error') {
        clearInterval(intervalRef.current)
      }
    } catch {}
  }

  useEffect(() => {
    if (!id) return
    fetchProgress()
    intervalRef.current = setInterval(fetchProgress, 3000)
    return () => clearInterval(intervalRef.current)
  }, [id])

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [state?.log?.length])

  if (!id || loading) {
    return (
      <div style={{ background: NAVY, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: '#c8a96e', fontFamily: 'sans-serif', fontSize: '1rem', fontWeight: 700 }}>David Prospector</p>
        <p style={{ color: '#8a95aa', fontFamily: 'sans-serif', fontSize: '0.9rem' }}>Connecting to run {id}...</p>
      </div>
    )
  }

  if (!state) {
    return (
      <div style={{ background: NAVY, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: '#c8a96e', fontFamily: 'sans-serif', fontSize: '1rem', fontWeight: 700 }}>David Prospector</p>
        <p style={{ color: '#8a95aa', fontFamily: 'sans-serif', fontSize: '0.9rem' }}>Waiting for David to start... checking every 3 seconds</p>
        <p style={{ color: '#4a5568', fontFamily: 'monospace', fontSize: '0.8rem' }}>Run ID: {id}</p>
      </div>
    )
  }

  const pct       = state?.percent_complete || 0
  const status    = state?.status || 'running'
  const prospects = state?.prospects || []
  const logs      = state?.log || []

  return (
    <>
      <Head>
        <title>David Prospector — Running</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: ${NAVY}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

          .page {
            min-height: 100vh;
            background: ${NAVY};
            padding: 2rem 1rem 4rem;
          }

          .container {
            max-width: 900px;
            margin: 0 auto;
          }

          .header {
            margin-bottom: 1.5rem;
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
            color: #ffffff;
            font-size: 1.5rem;
            font-weight: 800;
            font-family: Georgia, serif;
            margin: 0 0 0.3rem;
          }

          .run-id {
            color: #8a95aa;
            font-size: 0.8rem;
            font-family: 'Courier New', monospace;
          }

          /* ── Progress bar ── */
          .progress-card {
            background: #0d1221;
            border: 1px solid #1e2a45;
            border-radius: 10px;
            padding: 1.25rem 1.5rem;
            margin-bottom: 1.25rem;
          }

          .progress-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;
          }

          .status-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }

          .current-step {
            color: #8a95aa;
            font-size: 0.85rem;
          }

          .progress-bar-bg {
            background: #1e2a45;
            border-radius: 4px;
            height: 8px;
            overflow: hidden;
          }

          .progress-bar-fill {
            height: 100%;
            border-radius: 4px;
            background: ${GOLD};
            transition: width 0.5s ease;
          }

          .pct-label {
            color: ${GOLD};
            font-size: 0.85rem;
            font-weight: 700;
            margin-top: 0.4rem;
            text-align: right;
          }

          /* ── Two column layout ── */
          .two-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.25rem;
          }

          @media (max-width: 700px) {
            .two-col { grid-template-columns: 1fr; }
          }

          /* ── Log panel ── */
          .panel {
            background: #0d1221;
            border: 1px solid #1e2a45;
            border-radius: 10px;
            padding: 1.25rem;
            margin-bottom: 1.25rem;
          }

          .panel-title {
            color: ${GOLD};
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            margin-bottom: 0.75rem;
          }

          .log-scroll {
            max-height: 320px;
            overflow-y: auto;
          }

          .log-entry {
            display: flex;
            gap: 0.75rem;
            padding: 0.3rem 0;
            border-bottom: 1px solid #1a2338;
            font-size: 0.8rem;
          }

          .log-time {
            color: #4a5568;
            font-family: 'Courier New', monospace;
            flex-shrink: 0;
            width: 60px;
          }

          .log-msg {
            color: #c8d0e0;
          }

          /* ── Prospect cards ── */
          .prospect-card {
            background: #0d1221;
            border: 1px solid #1e2a45;
            border-radius: 8px;
            padding: 1rem 1.25rem;
            margin-bottom: 0.75rem;
          }

          .prospect-name {
            color: #ffffff;
            font-size: 0.95rem;
            font-weight: 700;
            margin-bottom: 0.2rem;
          }

          .prospect-meta {
            color: #8a95aa;
            font-size: 0.78rem;
            margin-bottom: 0.5rem;
          }

          .prospect-score {
            display: inline-block;
            background: #1e2a45;
            color: ${GOLD};
            font-size: 0.75rem;
            font-weight: 700;
            padding: 0.2rem 0.6rem;
            border-radius: 4px;
            margin-bottom: 0.5rem;
          }

          .trigger-list {
            list-style: none;
            padding: 0;
          }

          .trigger-list li {
            color: #e74c3c;
            font-size: 0.78rem;
            padding: 0.1rem 0;
          }

          .trigger-list li::before {
            content: '⚠ ';
          }

          /* ── Complete state ── */
          .complete-banner {
            background: #0d2218;
            border: 1px solid #2ecc71;
            border-radius: 10px;
            padding: 1.25rem 1.5rem;
            margin-bottom: 1.25rem;
            text-align: center;
          }

          .complete-banner p {
            color: #2ecc71;
            font-size: 1rem;
            font-weight: 700;
          }

          .complete-banner small {
            color: #8a95aa;
            font-size: 0.82rem;
          }

          .back-link {
            display: inline-block;
            margin-top: 1rem;
            color: ${GOLD};
            font-size: 0.88rem;
            text-decoration: none;
          }
        `}</style>
      </Head>

      <div className="page">
        <div className="container">

          {/* HEADER */}
          <div className="header">
            <div className="eyebrow">Novo Navis — Admin</div>
            <h1>David Prospector</h1>
            <div className="run-id">Run ID: {id}</div>
          </div>

          {/* COMPLETE BANNER */}
          {status === 'complete' && (
            <div className="complete-banner">
              <p>✅ Prospector run complete — {prospects.length} prospects found</p>
              <small>Report has been emailed to you. Check your inbox.</small>
              <br />
              <a href="/admin/prospector" className="back-link">← Run another search</a>
            </div>
          )}

          {status === 'error' && (
            <div style={{ background: '#1a0808', border: '1px solid #e74c3c', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.25rem', textAlign: 'center' }}>
              <p style={{ color: '#e74c3c', fontWeight: 700 }}>Error: {state?.error || 'Unknown error'}</p>
              <a href="/admin/prospector" className="back-link">← Try again</a>
            </div>
          )}

          {/* PROGRESS BAR */}
          <div className="progress-card">
            <div className="progress-header">
              <span
                className="status-badge"
                style={{ background: STATUS_COLORS[status] + '22', color: STATUS_COLORS[status] }}
              >
                {status}
              </span>
              <span className="current-step">{state?.current_step || 'Initializing'}</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="pct-label">{pct}%</div>
          </div>

          <div className="two-col">

            {/* LOG PANEL */}
            <div className="panel">
              <div className="panel-title">Activity Log</div>
              <div className="log-scroll">
                {logs.map((entry, i) => (
                  <div key={i} className="log-entry">
                    <span className="log-time">{entry.time}</span>
                    <span className="log-msg">{entry.message}</span>
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>
            </div>

            {/* PROSPECTS PANEL */}
            <div className="panel">
              <div className="panel-title">
                Prospects Found ({prospects.length})
              </div>
              {prospects.length === 0 ? (
                <p style={{ color: '#4a5568', fontSize: '0.85rem' }}>
                  {status === 'running' ? 'Scanning...' : 'No prospects found.'}
                </p>
              ) : (
                prospects.map((p, i) => (
                  <div key={i} className="prospect-card">
                    <div className="prospect-name">{p.name} {p.ticker ? `(${p.ticker})` : ''}</div>
                    <div className="prospect-meta">{p.industry}</div>
                    <div className="prospect-score">Distress Score: {p.score}/100</div>
                    <ul className="trigger-list">
                      {(p.triggers || []).map((t, j) => (
                        <li key={j}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>
      </div>
    </>
  )
}
