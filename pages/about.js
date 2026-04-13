import Head from 'next/head'
import Link from 'next/link'

export default function About() {
  return (
    <>
      <Head>
        <title>About | Novo Navis Aerospace Operations LLC</title>
        <meta name="description" content="Novo Navis Aerospace Operations LLC is an aerospace R&D company specializing in carbon fiber composite materials. We built David — a proprietary AI workflow analysis model — for our own operations. Now it works for yours." />
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

      <div className="article-page">

        <div className="article-meta">
          <span style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase'}}>
            About Novo Navis
          </span>
        </div>

        <h1>About Novo Navis</h1>

        <div className="article-body" style={{marginTop: '2rem'}}>

          <p>Novo Navis Aerospace Operations LLC is an aerospace research and development company specializing in the design and fabrication of customized three-dimensional carbon fiber composite materials for government and civilian applications.</p>

          <p>As we scaled our own operations, we encountered a problem familiar to many advanced manufacturers — integrating AI into complex, highly specialized workflows. No existing tool understood our processes. So we built our own.</p>

          <p>The result was David — a proprietary Small Psychological Model that analyzes business workflows with the same rigor we apply to aerospace engineering. David doesn't generate generic advice. He reasons through your specific operational reality and identifies exactly where AI can reduce manual work, cut costs, and improve efficiency.</p>

          <p>At Novo Navis, the technologies we develop for our own operations don't stay in-house. We make them available to other businesses because it funds our advanced research and brings enterprise-grade tools to small business owners at a price point that has never existed before.</p>

          <p style={{color: '#c8a96e', fontWeight: 'bold', fontSize: '1.05rem'}}>David was built for us. Now he works for you.</p>

          <div style={{
            background: '#0d1221',
            border: '1px solid #1e2a45',
            borderRadius: '6px',
            padding: '1.5rem 2rem',
            margin: '2.5rem 0',
          }}>
            <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Company Details</p>
            <p style={{color: '#b0b8cc', marginBottom: '0.4rem'}}>Legal Name: Novo Navis Aerospace Operations LLC</p>
            <p style={{color: '#b0b8cc', marginBottom: '0.4rem'}}>CAGE Code: 8GN22</p>
            <p style={{color: '#b0b8cc', marginBottom: '0.4rem'}}>Location: Phoenix, Arizona Area</p>
            <p style={{color: '#b0b8cc'}}>Registration: Federal Defense Contractor</p>
          </div>

          {/* ERIC JOHNSTON CREDENTIALS */}
          <div style={{
            background: '#0a0f1a',
            border: '1px solid #1e2a45',
            borderRadius: '6px',
            padding: '1.25rem 1.5rem',
            margin: '0 0 1.75rem 0',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}>
            <div style={{flexShrink: 0, width: '44px', height: '44px', borderRadius: '50%', background: '#1e2a45', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'}}>
              EJ
            </div>
            <div>
              <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.3rem'}}>
                Who builds your report
              </p>
              <p style={{color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.6', margin: 0}}>
                <strong>Eric Johnston</strong> is a Principal Investigator on active U.S. Department of Defense AI research projects.
                The same analytical frameworks used in defense-grade AI assessments are what power every Novo Navis report —
                applied to the operational realities of small and mid-size businesses.
              </p>
            </div>
          </div>

          {/* CONTACT */}
          <div style={{
            background: '#0d1221',
            border: '1px solid #1e2a45',
            borderRadius: '6px',
            padding: '1.25rem 1.5rem',
            margin: '0 0 1.75rem 0'
          }}>
            <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.75rem'}}>
              Contact
            </p>
            <p style={{color: '#d0d8e8', marginBottom: '0.4rem'}}>
              Phone: <a href="tel:6234289308" style={{color: '#c8a96e', fontWeight: 'bold'}}>(623) 428-9308</a>
            </p>
            <p style={{color: '#d0d8e8', margin: 0}}>
              Email: <a href="mailto:support@novonavis.com" style={{color: '#c8a96e'}}>support@novonavis.com</a>
            </p>
          </div>

          <p style={{textAlign: 'center', fontSize: '1.2rem', color: '#c8a96e', fontStyle: 'italic', marginTop: '2rem'}}>
            Fidelis Diligentia — Faithful Diligence.
          </p>

        </div>

        <hr className="divider" />

        <div style={{textAlign: 'center', padding: '2rem 0'}}>
          <div className="section-title" style={{marginBottom: '0.8rem'}}>Ready to See What AI Can Do for Your Business?</div>
          <p style={{color: '#8a95aa', marginBottom: '1.5rem'}}>
            One custom report. Built for your business. Delivered within 1 hour during business hours.
          </p>
          <Link href="/sample-analysis" className="btn-primary" style={{background: '#4caf50', borderColor: '#4caf50'}}>⚡ Start Here — Try It Free →</Link>
        </div>

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/sample-analysis">Try It Free</Link> &nbsp;·&nbsp;
          <Link href="/#order-form">Get Your Report</Link> &nbsp;·&nbsp;
          <Link href="/faq">FAQ</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link>
        </p>
      </footer>
    </>
  )
}
