import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Novo Navis | AI Integration Intelligence for Small Business</title>
        <meta name="description" content="Novo Navis delivers custom AI integration reports for small businesses using a proprietary Small Psychological Model. Not a chatbot. A reasoning system." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* NAV */}
      <nav>
        <span className="nav-logo">NOVO NAVIS</span>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/report">Get Your Report</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-tag">AI Integration Intelligence</div>
        <h1>Your Business. A Custom AI Roadmap. Delivered in 24 Hours.</h1>
        <p>
          Novo Navis uses a proprietary Small Psychological Model — not a chatbot,
          not a template — to produce a custom 10-page AI integration report
          built specifically for your business.
        </p>
        <div className="btn-group">
          <Link href="/report" className="btn-primary" style={{background: '#4caf50', borderColor: '#4caf50'}}>⚡ Start Here →</Link>
          <Link href="/blog" className="btn-secondary">Read the Blog</Link>
        </div>
      </div>

      {/* WHAT YOU GET */}
      <div className="section">
        <div className="section-title">What You Get</div>
        <div className="section-sub">
          A 10-page report built around your specific business, workflows, and pain points.
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Current State Analysis</h3>
            <p>
              A precise breakdown of how your business currently operates and
              where time and money are being lost to manual processes.
            </p>
          </div>
          <div className="feature-card">
            <h3>AI Integration Roadmap</h3>
            <p>
              Five concrete, sequential steps to implement AI in your specific
              workflows — with real tool names, real costs, and real timelines.
            </p>
          </div>
          <div className="feature-card">
            <h3>Risk and ROI Framework</h3>
            <p>
              Honest assessment of what can go wrong, how to prevent it, and
              how to measure whether the integration is actually working.
            </p>
          </div>
          <div className="feature-card">
            <h3>Proprietary Reasoning</h3>
            <p>
              Built by a Small Psychological Model that challenges its own
              findings before they reach your report. Not a chatbot response.
              A reasoned analysis.
            </p>
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* HOW IT WORKS */}
      <div className="section">
        <div className="section-title">How It Works</div>
        <div className="section-sub">Three steps. 24 hours. A report built for your business.</div>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>1. Tell Us About Your Business</h3>
            <p>
              Fill out a short intake form describing your business, your
              workflows, and your biggest operational pain points.
            </p>
          </div>
          <div className="feature-card">
            <h3>2. We Run the Analysis</h3>
            <p>
              Our proprietary Small Psychological Model analyzes your inputs,
              researches your industry, and builds a custom report from the
              ground up.
            </p>
          </div>
          <div className="feature-card">
            <h3>3. Receive Your Report</h3>
            <p>
              Your 10-page PDF report arrives in your inbox within 24 hours,
              ready to put to work immediately.
            </p>
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* WHO THIS IS FOR */}
      <div className="section">
        <div className="section-title">Who This Is For</div>
        <div className="section-sub">
          Any small business owner spending too much time on work that should be automated.
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Contractors & Field Services</h3>
            <p>HVAC, plumbing, electrical, landscaping — dispatch, invoicing, scheduling.</p>
          </div>
          <div className="feature-card">
            <h3>Professional Services</h3>
            <p>Legal, accounting, consulting — document review, client intake, billing.</p>
          </div>
          <div className="feature-card">
            <h3>Healthcare Practices</h3>
            <p>Dental, chiropractic, therapy — appointment scheduling, patient follow-up.</p>
          </div>
          <div className="feature-card">
            <h3>Real Estate</h3>
            <p>Agents and property managers — lead follow-up, listing management, maintenance.</p>
          </div>
          <div className="feature-card">
            <h3>Retail & E-commerce</h3>
            <p>Boutique retail and online stores — inventory, customer service, order management.</p>
          </div>
          <div className="feature-card">
            <h3>Restaurants & Hospitality</h3>
            <p>Reservations, supplier ordering, staff scheduling, customer follow-up.</p>
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* CTA */}
      <div className="section" style={{textAlign: 'center'}}>
        <div className="section-title">Ready to See What AI Can Do for Your Business?</div>
        <div className="section-sub">
          One report. One roadmap. 24 hours. $97.
        </div>
        <Link href="/report" className="btn-primary" style={{background: '#4caf50', borderColor: '#4caf50'}}>⚡ Start Here →</Link>
      </div>

      {/* FOOTER */}
      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/report">Get Your Report</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link>
        </p>
      </footer>
    </>
  )
}