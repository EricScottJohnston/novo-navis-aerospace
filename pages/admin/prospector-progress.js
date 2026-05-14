// pages/admin/prospector-progress.js
// Live prospector progress tracker. Polls /api/prospector-progress every 2 seconds.
// Built to match the existing pages/track/[orderId].js pattern exactly.

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'

const CHECK_INTERVAL = 2000

const LOG_COLORS = {
  step:   '#c8a96e',
  search: '#4caf50',
  info:   '#d0d8e8',
  detail: '#6a7a8a',
  warn:   '#e57373',
}

export default function ProspectorProgress() {
  const router     = useRouter()
  const { id }     = router.query

  const [data,     setData]     = useState(null)
  const [error,    setError]    = useState(null)
  const intervalRef  = useRef(null)
  const logBottomRef = useRef(null)

  useEffect(() => {
    if (!id) return

    const poll = async () => {
      try {
        const res = await fetch(`/api/track/${id}`)
        if (res.status === 404) {
          // Not started yet — keep polling, show waiting state
          return
        }
        if (!res.ok) throw new Error('fetch failed')
        const json = await res.json()
        setData(json)
        if (json.status === 'complete' || json.status === 'error') {
          clearInterval(intervalRef.current)
        }
      } catch (e) {
        setError('Could not load progress. Please wait a moment.')
      }
    }

    poll()
    intervalRef.current = setInterval(poll, CHECK_INTERVAL)
    return () => clearInterval(intervalRef.current)
  }, [id])

  useEffect(() => {
    logBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [data?.log?.length])

  const isComplete = data?.status === 'complete'
  const isError    = data?.status === 'error'
  const isWaiting  = !data
  const pct        = data?.percent_complete ?? 0

  return (
    <>
      <Head>
        <title>David Prospector — Running | Novo Navis</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{
        background: '#0a0e1a', minHeight: '100vh', color: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
        padding: '2rem 1rem 4rem',
      }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ color: '#c8a96e', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Novo Navis — Admin
            </div>

            {isComplete ? (
              <>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✓</div>
                <h1 style={{ margin: '0 0 0.5rem', color: '#ffffff', fontFamily: 'Georgia, serif' }}>Prospector run complete.</h1>
                <p style={{ color: '#8a95aa' }}>
                  {data?.prospects?.length || 0} prospects found. Report emailed to you.
                </p>
                <a href="/admin/prospector" style={{ display: 'inline-block', marginTop: '1rem', color: '#c8a96e', fontSize: '0.88rem' }}>
                  ← Run another search
                </a>
              </>
            ) : isError ? (
              <>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚠</div>
                <h1 style={{ margin: '0 0 0.5rem', color: '#ffffff', fontFamily: 'Georgia, serif' }}>Something went wrong.</h1>
                <p style={{ color: '#8a95aa' }}>{data?.error || 'An error occurred.'}</p>
                <a href="/admin/prospector" style={{ display: 'inline-block', marginTop: '1rem', color: '#c8a96e', fontSize: '0.88rem' }}>
                  ← Try again
                </a>
              </>
            ) : isWaiting ? (
              <>
                <h1 style={{ margin: '0 0 0.5rem', color: '#ffffff', fontFamily: 'Georgia, serif' }}>David Prospector</h1>
                <p style={{ color: '#8a95aa' }}>Waiting for David to start... this page updates automatically.</p>
                <p style={{ color: '#4a5568', fontSize: '0.8rem', fontFamily: 'monospace', marginTop: '0.5rem' }}>Run ID: {id}</p>
              </>
            ) : (
              <>
                <h1 style={{ margin: '0 0 0.5rem', color: '#ffffff', fontFamily: 'Georgia, serif' }}>David Prospector</h1>
                <p style={{ color: '#8a95aa' }}>{data?.current_step || 'Running...'}</p>
              </>
            )}
          </div>

          {/* Progress bar */}
          {!isWaiting && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#8a95aa' }}>
                <span>{data?.current_step || 'Starting...'}</span>
                <span>{pct}%</span>
              </div>
              <div style={{ height: '8px', background: '#1e2a45', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${pct}%`,
                  background: isComplete ? '#4caf50' : '#c8a96e',
                  borderRadius: '4px',
                  transition: 'width 0.6s ease',
                }} />
              </div>
            </div>
          )}

          {/* Live log */}
          {data?.log && data.log.length > 0 && (
            <div style={{
              background: '#060c18', border: '1px solid #1e2a45',
              borderRadius: '6px', padding: '1rem', marginBottom: '2rem',
              maxHeight: '450px', overflowY: 'auto', fontFamily: 'monospace',
            }}>
              <p style={{ color: '#4a5568', fontSize: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Live log
              </p>
              {data.log.map((entry, i) => (
                <div key={i} style={{ fontSize: '0.8rem', marginBottom: '0.2rem', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#4a5568', flexShrink: 0 }}>{entry.time}</span>
                  <span style={{ color: LOG_COLORS[entry.type] || LOG_COLORS.info }}>{entry.message}</span>
                </div>
              ))}
              <div ref={logBottomRef} />
            </div>
          )}

          {/* Prospects found so far */}
          {data?.prospects && data.prospects.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ color: '#c8a96e', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Prospects Found ({data.prospects.length})
              </p>
              {data.prospects.map((p, i) => (
                <div key={i} style={{
                  background: '#0d1221', border: '1px solid #1e2a45',
                  borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '0.75rem',
                }}>
                  <div style={{ color: '#ffffff', fontWeight: 700, marginBottom: '0.2rem' }}>
                    {p.name} {p.ticker ? `(${p.ticker})` : ''}
                  </div>
                  <div style={{ color: '#8a95aa', fontSize: '0.78rem', marginBottom: '0.5rem' }}>
                    {p.industry} · Distress Score: <span style={{ color: '#e74c3c', fontWeight: 700 }}>{p.score}/100</span>
                  </div>
                  {(p.triggers || []).map((t, j) => (
                    <div key={j} style={{ color: '#e74c3c', fontSize: '0.78rem' }}>⚠ {t}</div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {error && (
            <p style={{ color: '#e57373', textAlign: 'center', fontSize: '0.85rem' }}>{error}</p>
          )}

        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </>
  )
}
