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

          <p>One of our core research areas is AI for air traffic control — a domain where standard AI simply is not good enough. When safety depends on it, you need AI that understands cause and effect, not just pattern matching. That requirement forced us to develop something different from the ground up: causal AI.</p>

          <p>Most AI tools — including large language models — are correlative. They find patterns in data and make predictions based on what has happened before. Causal AI goes further. It reasons about why things happen, identifies the actual mechanisms driving outcomes, and produces recommendations grounded in cause and effect rather than statistical association. In air traffic control, that distinction matters enormously. In business operations, it turns out it matters just as much.</p>

          <p>As we scaled our own operations, we encountered a problem familiar to many advanced manufacturers — integrating AI into complex, highly specialized workflows. No existing tool understood our processes. So we built our own.</p>

          <p>The result was David — a proprietary Small Psychological Model that applies causal reasoning to business workflow analysis. David does not generate generic advice. He reasons through your specific operational reality, identifies the actual causes of your inefficiencies, and tells you exactly where AI can reduce manual work, cut costs, and improve efficiency.</p>

          <p>That is a fundamentally different kind of analysis than what you get from standard AI tools. And it is available to small business owners at a price point that has never existed before.</p>

          <p style={{color: '#c8a96e', fontWeight: 'bold', fontSize: '1.05rem'}}>David was built for aerospace. Now he works for you.</p>

          <div style={{
            background: '#0d1221',
            border: '1px solid #1e2a45',
            borderRadius: '6px',
            padding: '1.5rem 2rem',
            margin: '2.5rem 0',
          }}>
            <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Company Details</p>
            <p style={{color: '#b0b8cc', marginBottom: '0.4rem'}}>Legal Name: Novo Navis Aerospace Operations LLC</p>
            <p style={{color: '#b0b8cc', marginBottom: '0.4rem'}}>
              CAGE Code:{' '}
              <a
                href="https://www.dla.mil/LandandMaritime/Business/Selling/Vendor-Registration/CAGE-Code-Look-up/"
                target="_blank"
                rel="noopener noreferrer"
                style={{color: '#c8a96e'}}
              >
                8GN22
              </a>
            </p>
            <p style={{color: '#b0b8cc', marginBottom: '0.4rem'}}>Location: Phoenix, Arizona Area</p>
            <p style={{color: '#b0b8cc', marginBottom: '1rem'}}>Registration: Registered Federal Contractor with the U.S. Government</p>
            <p style={{color: '#8a95aa', fontSize: '0.85rem', margin: 0}}>
              Novo Navis is a registered federal contractor with the U.S. government. Our CAGE Code (8GN22) can be verified directly through the{' '}
              <a
                href="https://www.dla.mil/LandandMaritime/Business/Selling/Vendor-Registration/CAGE-Code-Look-up/"
                target="_blank"
                rel="noopener noreferrer"
                style={{color: '#c8a96e'}}
              >
                Defense Logistics Agency CAGE Code lookup service →
              </a>
            </p>
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
            <div style={{flexShrink: 0, width: 'clamp(80px, 20vw, 120px)', height: 'clamp(80px, 20vw, 120px)', borderRadius: '50%', overflow: 'hidden', border: '2px solid #1e2a45'}}>
              <img src="/headshot.png" alt="Eric Johnston" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div>
              <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.3rem'}}>
                Who Built the System
              </p>
              <p style={{color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.6', margin: 0}}>
                Eric Johnston is a Principal Investigator on active U.S. Department of Defense AI research projects. The causal AI frameworks developed for defense-grade applications power every Novo Navis report — applied to the operational realities of small and mid-size businesses.
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
            One custom report. Built for your business. Delivered within 24 hours.
          </p>
          <Link href="/sample-analysis" className="btn-primary" style={{background: '#4caf50', borderColor: '#4caf50'}}>⚡ Start Here — Try It Free →</Link>
        </div>

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/sample-analysis">Try It Free</Link> &nbsp;·&nbsp;
          <Link href="/#order-form">Get Your AI Blueprint</Link> &nbsp;·&nbsp;
          <Link href="/faq">FAQ</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link>
        </p>
      </footer>
    </>
  )
}
