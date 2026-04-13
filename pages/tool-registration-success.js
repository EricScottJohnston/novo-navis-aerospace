import Head from 'next/head'
import Link from 'next/link'

export default function ToolRegistrationSuccess() {
  return (
    <>
      <Head>
        <title>Registration Complete | Novo Navis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav>
        <Link href="/" className="nav-logo">NOVO NAVIS</Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/sample-analysis">Try It Free</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div className="report-page">

        <div style={{
          background: '#0d1a0d',
          border: '2px solid #4caf50',
          borderRadius: '8px',
          padding: '2rem',
          margin: '2rem 0',
          textAlign: 'center'
        }}>
          <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>✓</div>
          <h1 style={{color: '#4caf50', fontWeight: 'bold', marginBottom: '0.75rem'}}>
            Registration Complete
          </h1>
          <p style={{color: '#d0d8e8', fontSize: '1rem', lineHeight: '1.7', margin: 0}}>
            Your tool has been received. Eric will review your submission and add it
            to the Novo Navis recommendation database within one business day.
          </p>
        </div>

        <div style={{
          background: '#0d1221',
          border: '1px solid #1e2a45',
          borderRadius: '6px',
          padding: '1.25rem 1.5rem',
          margin: '1.5rem 0'
        }}>
          <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.75rem'}}>
            What happens next
          </p>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.9'}}>
            <li>✓ &nbsp;You'll receive a confirmation email at the address you provided</li>
            <li>✓ &nbsp;Eric will review your tool details and add it to the database</li>
            <li>✓ &nbsp;Your tool will be considered in all relevant workflow analyses</li>
            <li>✓ &nbsp;Registration is active for 3 months from today's date</li>
            <li>✓ &nbsp;You'll receive a renewal reminder before your registration expires</li>
          </ul>
        </div>

        <p style={{color: '#8a95aa', fontSize: '0.9rem', textAlign: 'center', marginTop: '1.5rem'}}>
          Questions? Email us at{' '}
          <a href="mailto:support@novonavis.com" style={{color: '#c8a96e'}}>support@novonavis.com</a>
        </p>

        <hr className="divider" />

        <div style={{textAlign: 'center', padding: '1rem 0'}}>
          <Link href="/" style={{color: '#c8a96e', fontWeight: 'bold'}}>
            ← Back to Novo Navis
          </Link>
        </div>

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/sample-analysis">Try It Free</Link> &nbsp;·&nbsp;
          <Link href="/#order-form">Get Your Report</Link> &nbsp;·&nbsp;
          <Link href="/faq">FAQ</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link> &nbsp;·&nbsp;
          <Link href="/privacy">Privacy Policy</Link> &nbsp;·&nbsp;
          <Link href="/terms">Terms and Conditions</Link>
        </p>
      </footer>
    </>
  )
}
