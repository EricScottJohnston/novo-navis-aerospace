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
        <h1 style={{marginBottom: '1rem'}}>Payment Received</h1>
        <p className="lead">
          Thank you. Your custom AI integration report is being built now
          and will be delivered to your email within 24 hours.
        </p>
        <p style={{color: '#8a95aa', marginTop: '1.5rem', fontSize: '0.95rem'}}>
          If you have any questions, contact us at ericjohnston105@gmail.com
        </p>
        <div style={{marginTop: '2.5rem'}}>
          <Link href="/blog" className="btn-secondary">Read the Blog While You Wait</Link>
        </div>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
      </footer>
    </>
  )
}