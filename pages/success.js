import Head from 'next/head'
import Link from 'next/link'

export default function Success() {
  return (
    <>
      <Head>
        <title>Payment Successful | Novo Navis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav>
        <Link href="/" className="nav-logo">NOVO NAVIS</Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/report">Get Your Report</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div className="report-page" style={{textAlign: 'center', paddingTop: '5rem'}}>
        <div style={{fontSize: '3rem', marginBottom: '1rem'}}>✓</div>
        <h1 style={{marginBottom: '1rem'}}>You're all set.</h1>
        <p className="lead">
          Your intake has been received. Eric will review your business details,
          run your report, and deliver it to your inbox within 24 hours.
        </p>

        <div style={{
          background: '#0d1221',
          border: '1px solid #1e2a45',
          borderRadius: '6px',
          padding: '1.5rem',
          margin: '2rem auto',
          maxWidth: '400px'
        }}>
          <p style={{color: '#8a95aa', marginBottom: '0.8rem', fontSize: '0.9rem'}}>
            Questions about your order?
          </p>
          <p style={{color: '#ffffff', marginBottom: '0.4rem'}}>
            Email: <a href="mailto:support@novonavis.com" style={{color: '#c8a96e'}}>support@novonavis.com</a>
          </p>
          <p style={{color: '#ffffff'}}>
            Call: <a href="tel:6234289308" style={{color: '#c8a96e'}}>(623) 428-9308</a>
          </p>
        </div>

        <div style={{marginTop: '2rem'}}>
          <Link href="/blog" className="btn-secondary">Read the Blog While You Wait</Link>
        </div>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
      </footer>
    </>
  )
}