// pages/track/[orderId].js
// Live report-building tracker. Polls /api/track/[orderId] every 3 seconds.

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'

const CHECK_INTERVAL = 3000 // ms

export default function TrackOrder() {
  const router   = useRouter()
  const { orderId } = router.query

  const [data,    setData]    = useState(null)
  const [error,   setError]   = useState(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!orderId) return

    const poll = async () => {
      try {
        const res = await fetch(`/api/track/${orderId}`)
        if (!res.ok) throw new Error('fetch failed')
        const json = await res.json()
        setData(json)
        if (json.status === 'complete' || json.status === 'error') {
          clearInterval(intervalRef.current)
        }
      } catch (e) {
        setError('Could not load progress. Please wait a moment and refresh.')
      }
    }

    poll()
    intervalRef.current = setInterval(poll, CHECK_INTERVAL)
    return () => clearInterval(intervalRef.current)
  }, [orderId])

  const isComplete = data?.status === 'complete'
  const isError    = data?.status === 'error'
  const isQueued   = data?.status === 'queued' || !data
  const pct        = data?.percent_complete ?? 0

  return (
    <>
      <Head>
        <title>Building Your Report | Novo Navis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav>
        <Link href="/" className="nav-logo">NOVO NAVIS</Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/#order-form">Get Your AI Blueprint</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div className="report-page" style={{ maxWidth: '720px', margin: '0 auto', paddingTop: '3rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          {isComplete ? (
            <>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✓</div>
              <h1 style={{ marginBottom: '0.5rem' }}>Your report is on its way.</h1>
              <p className="lead" style={{ color: '#8a95aa' }}>
                Check your inbox — your AI Integration Report has been sent.
              </p>
            </>
          ) : isError ? (
            <>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚠</div>
              <h1 style={{ marginBottom: '0.5rem' }}>Something went wrong.</h1>
              <p className="lead" style={{ color: '#8a95aa' }}>
                {data?.error || 'An error occurred. Our team has been notified.'}
              </p>
              <p style={{ color: '#8a95aa', marginTop: '1rem', fontSize: '0.9rem' }}>
                Email <a href="mailto:support@novonavis.com" style={{ color: '#c8a96e' }}>support@novonavis.com</a> and we'll sort it out.
              </p>
            </>
          ) : (
            <>
              <h1 style={{ marginBottom: '0.5rem' }}>
                {isQueued ? 'Your report is queued.' : 'Building your report.'}
              </h1>
              {data?.customer_name && (
                <p style={{ color: '#c8a96e', marginBottom: '0.25rem', fontWeight: 600 }}>
                  {data.customer_name} · {data.business}
                </p>
              )}
              <p className="lead" style={{ color: '#8a95aa' }}>
                {isQueued
                  ? 'David is starting up. This page updates automatically.'
                  : 'David is analyzing your business. This page updates in real time.'}
              </p>
            </>
          )}
        </div>

        {/* Progress bar */}
        {!isQueued && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: '0.5rem', fontSize: '0.85rem', color: '#8a95aa'
            }}>
              <span>{data?.current_step || 'Starting...'}</span>
              <span>{pct}%</span>
            </div>
            <div style={{
              height: '8px', background: '#1e2a45', borderRadius: '4px', overflow: 'hidden'
            }}>
              <div style={{
                height: '100%', width: `${pct}%`,
                background: isComplete ? '#4caf50' : '#c8a96e',
                borderRadius: '4px',
                transition: 'width 0.6s ease'
              }} />
            </div>
          </div>
        )}

        {/* Steps list */}
        {data?.steps && (
          <div style={{
            background: '#0d1221', border: '1px solid #1e2a45',
            borderRadius: '6px', padding: '1.25rem', marginBottom: '2rem'
          }}>
            {data.steps.map((step) => (
              <div key={step.id} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.45rem 0',
                borderBottom: step.id < data.steps.length ? '1px solid #1a2237' : 'none',
                opacity: step.status === 'pending' ? 0.4 : 1,
              }}>
                <StepIcon status={step.status} />
                <span style={{
                  fontSize: '0.9rem',
                  color: step.status === 'running' ? '#c8a96e'
                       : step.status === 'complete' ? '#ffffff'
                       : '#8a95aa'
                }}>
                  {step.name}
                  {step.status === 'running' && (
                    <span style={{ marginLeft: '0.5rem', animation: 'pulse 1.4s infinite' }}>…</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Live log */}
        {data?.log && data.log.length > 0 && !isComplete && (
          <div style={{
            background: '#060c18', border: '1px solid #1e2a45',
            borderRadius: '6px', padding: '1rem', marginBottom: '2rem',
            maxHeight: '220px', overflowY: 'auto', fontFamily: 'monospace'
          }}>
            <p style={{ color: '#4a5568', fontSize: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Live log
            </p>
            {[...data.log].reverse().slice(0, 20).map((entry, i) => (
              <div key={i} style={{ fontSize: '0.8rem', color: '#8a95aa', marginBottom: '0.2rem' }}>
                <span style={{ color: '#4a5568', marginRight: '0.5rem' }}>{entry.time}</span>
                {entry.message}
              </div>
            ))}
          </div>
        )}

        {/* Support block */}
        <div style={{
          background: '#0d1221', border: '1px solid #1e2a45',
          borderRadius: '6px', padding: '1.25rem', textAlign: 'center'
        }}>
          <p style={{ color: '#8a95aa', marginBottom: '0.6rem', fontSize: '0.85rem' }}>
            {isComplete ? "Didn't receive your report?" : 'Questions while you wait?'}
          </p>
          <p style={{ color: '#ffffff', marginBottom: '0.3rem', fontSize: '0.9rem' }}>
            <a href="mailto:support@novonavis.com" style={{ color: '#c8a96e' }}>support@novonavis.com</a>
          </p>
          <p style={{ color: '#ffffff', fontSize: '0.9rem' }}>
            <a href="tel:6234289308" style={{ color: '#c8a96e' }}>(623) 428-9308</a>
          </p>
        </div>

        {error && (
          <p style={{ color: '#e57373', textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
            {error}
          </p>
        )}

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </>
  )
}

function StepIcon({ status }) {
  if (status === 'complete') return (
    <span style={{ color: '#4caf50', fontSize: '1rem', width: '18px', textAlign: 'center' }}>✓</span>
  )
  if (status === 'running') return (
    <span style={{
      display: 'inline-block', width: '12px', height: '12px',
      borderRadius: '50%', background: '#c8a96e',
      animation: 'pulse 1.2s ease-in-out infinite',
      margin: '0 3px'
    }} />
  )
  return (
    <span style={{
      display: 'inline-block', width: '12px', height: '12px',
      borderRadius: '50%', border: '1px solid #2a3a55',
      margin: '0 3px'
    }} />
  )
}
