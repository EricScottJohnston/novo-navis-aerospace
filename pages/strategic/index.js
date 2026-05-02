// pages/strategic/index.js — Placeholder David/Strategic landing page.
// Will be replaced with full sales page (description + autoplay video + sample report).
// For now: minimal page with a CTA to the intake form.

import Head from 'next/head'
import Link from 'next/link'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'

export default function StrategicLanding() {
  return (
    <>
      <Head>
        <title>David / Strategic | Novo Navis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Auditable strategic analysis for boutique consulting firms. Defense-grade reasoning, applied to your client's hardest decisions." />
      </Head>

      <nav>
        <Link href="/" className="nav-logo">NOVO NAVIS</Link>
        <ul className="nav-links">
          <li><Link href="/strategic">David/Strategic</Link></li>
          <li><Link href="/faq">FAQ</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div style={{
        minHeight: '70vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '3rem 1.5rem',
      }}>
        <div style={{ maxWidth: '640px', width: '100%', textAlign: 'center' }}>

          <p style={{
            color: GOLD, fontSize: '0.78rem', fontWeight: 'bold',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            David / Strategic
          </p>

          <h1 style={{
            color: NAVY, fontSize: '2.1rem', fontWeight: '700',
            lineHeight: 1.2, marginBottom: '1.25rem',
          }}>
            Defense-grade strategic analysis for the consulting industry.
          </h1>

          <p style={{
            color: '#4a5568', fontSize: '1.05rem', lineHeight: 1.65,
            marginBottom: '2rem',
          }}>
            Submit your client's strategic question. David produces a 50-page auditable analysis with confidence ratings, evidence provenance, and a full audit trail. Read the redacted preview free. Pay $999 only if you'd put your firm's name on it.
          </p>

          <Link href="/strategic/intake" style={{
            display: 'inline-block',
            padding: '1rem 2.25rem',
            background: GOLD, color: NAVY,
            border: 'none', borderRadius: '8px',
            fontWeight: '700', fontSize: '1.05rem',
            textDecoration: 'none', letterSpacing: '0.02em',
            boxShadow: '0 4px 14px rgba(200,169,110,0.35)',
            transition: 'box-shadow 0.18s ease, transform 0.18s ease',
          }}>
            Submit Your First Analysis →
          </Link>

          <p style={{
            color: '#8a95aa', fontSize: '0.85rem',
            marginTop: '1.25rem', fontStyle: 'italic',
          }}>
            About 5 minutes. Free preview. No payment until you approve.
          </p>

        </div>
      </div>

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
