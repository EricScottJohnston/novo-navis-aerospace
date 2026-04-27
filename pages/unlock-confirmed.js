import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'

export default function UnlockConfirmed() {
  const router = useRouter()
  const { session_id, order } = router.query

  const [status, setStatus] = useState('verifying') // verifying | success | error

  useEffect(() => {
    if (!router.isReady || !session_id || !order) return
    fetch('/api/unlock-confirmed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: session_id, orderId: order }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) setStatus('success')
        else setStatus('error')
      })
      .catch(() => setStatus('error'))
  }, [router.isReady, session_id, order])

  return (
    <>
      <Head>
        <title>Report Unlocked | Novo Navis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`html, body { background: #f8f9fc !important; }`}</style>
      </Head>

      <nav>
        <Link href="/" className="nav-logo">NOVO NAVIS</Link>
      </nav>

      <div style={{
        background: '#f8f9fc', minHeight: 'calc(100vh - 64px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1rem',
      }}>
        <div style={{
          background: '#ffffff', border: '1px solid #e0e4ef',
          borderRadius: '14px', boxShadow: '0 4px 32px rgba(27,42,74,0.10)',
          maxWidth: '480px', width: '100%', padding: '2.5rem 2rem',
          textAlign: 'center',
        }}>

          {status === 'verifying' && (
            <>
              <p style={{ color: NAVY, fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Verifying your payment...
              </p>
              <p style={{ color: '#8a95aa', fontSize: '0.9rem' }}>
                This takes just a moment.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: '#f0f7f0', border: '2px solid #4caf50',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.25rem', fontSize: '1.5rem',
              }}>
                ✓
              </div>
              <h1 style={{ color: NAVY, fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 0.5rem' }}>
                Your full report is on its way.
              </h1>
              <p style={{ color: '#6b7a99', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1.75rem' }}>
                Check your inbox — the full AI Blueprint with specific tool names,
                pricing, and vendor links is attached.
              </p>
              <div style={{
                background: '#f4f6fb', border: '1px solid #e0e4ef',
                borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '1.5rem',
              }}>
                <p style={{ color: '#4a5568', fontSize: '0.85rem', margin: 0 }}>
                  Don't see it? Check your spam folder, or call{' '}
                  <a href="tel:6234289308" style={{ color: GOLD, fontWeight: 'bold' }}>(623) 428-9308</a>
                  {' '}and we'll resend it.
                </p>
              </div>
              <Link href="/" style={{
                display: 'inline-block',
                background: NAVY, color: '#fff', fontWeight: 'bold',
                padding: '0.75rem 2rem', borderRadius: '8px',
                textDecoration: 'none', fontSize: '0.95rem',
              }}>
                Back to Novo Navis
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <h1 style={{ color: NAVY, fontSize: '1.3rem', fontWeight: 'bold', margin: '0 0 0.75rem' }}>
                Something went wrong.
              </h1>
              <p style={{ color: '#6b7a99', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
                Your payment may have gone through but we hit an error delivering the report.
                We'll get it sorted.
              </p>
              <p style={{ color: '#6b7a99', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                Call{' '}
                <a href="tel:6234289308" style={{ color: GOLD, fontWeight: 'bold' }}>(623) 428-9308</a>
              </p>
              <p style={{ color: '#6b7a99', fontSize: '0.9rem' }}>
                or email{' '}
                <a href="mailto:support@novonavis.com" style={{ color: GOLD }}>support@novonavis.com</a>
              </p>
            </>
          )}

        </div>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis, LLC · Fidelis Diligentia</p>
      </footer>
    </>
  )
}
