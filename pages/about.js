import Head from 'next/head'
import Link from 'next/link'

export default function About() {
  return (
    <>
      <Head>
        <title>About | Novo Navis Aerospace Operations LLC</title>
        <meta name="description" content="Novo Navis Aerospace Operations LLC is a registered federal defense contractor under CAGE Code 8GN22, delivering AI integration solutions to small businesses and government customers." />
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

        <h1>Novo Navis Aerospace Operations LLC</h1>

        <div className="article-body" style={{marginTop: '2rem'}}>

          <p>Novo Navis Aerospace Operations LLC is a registered federal defense contractor operating under CAGE Code 8GN22, with operations based in the Phoenix, Arizona area.</p>

          <p>Novo Navis develops solutions at the intersection of advanced materials science, aerospace engineering, and artificial intelligence — serving both government and civilian customers.</p>

          <p>Our AI division applies the same rigorous analytical methodology developed for defense applications to a new domain: helping small businesses identify, implement, and measure AI-driven workflow automation. The same precision required in defense contracting — causal reasoning, adversarial verification, evidence-based conclusions — is what drives every report we produce.</p>

          <p>We use a proprietary Small Psychological Model to generate our reports. This is not a large language model or a chatbot. It is a multi-instance reasoning architecture that builds knowledge from the ground up, challenges its own findings, and filters every conclusion through a formal causal reasoning framework before it reaches your report.</p>

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

          <p style={{textAlign: 'center', fontSize: '1.2rem', color: '#c8a96e', fontStyle: 'italic', marginTop: '2rem'}}>
            Fidelis Diligentia — Faithful Diligence.
          </p>

        </div>

        <hr className="divider" />

        <div style={{textAlign: 'center', padding: '2rem 0'}}>
          <div className="section-title" style={{marginBottom: '0.8rem'}}>Ready to See What AI Can Do for Your Business?</div>
          <p style={{color: '#8a95aa', marginBottom: '1.5rem'}}>
            One custom report. Built for your business. Delivered in 24 hours.
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