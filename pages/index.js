// pages/index.js — Novo Navis homepage
// Links to /interactive (AI Blueprint) and /strategic (David / Strategic)

import Head from 'next/head'
import Link from 'next/link'

const NAVY  = '#1B2A4A'
const GOLD  = '#c8a96e'
const LIGHT = '#f4f6fb'
const SERIF = 'Georgia, serif'
const INK   = '#0c1322'
const BODY  = '#2d3748'

const BBB_URL = 'https://www.bbb.org/us/az/glendale/profile/aerospace-industry/novo-navis-aerospace-1126-1000076608'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Novo Navis — Fidelis Diligentia</title>
        <meta name="description" content="Novo Navis builds AI systems that think before they act. AI Blueprints for small business and defense-grade strategic analysis for consultants." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="/logonovo.png" />
        <meta property="og:title" content="Novo Navis — Fidelis Diligentia" />
        <meta property="og:description" content="AI that thinks before it acts. Two products. One standard of rigor." />
        <style>{`
          * { box-sizing: border-box; }
          body { margin: 0; background: #ffffff; }

          .home-page {
            background: #ffffff;
            color: ${INK};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            line-height: 1.6;
          }

          .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 1.25rem;
          }

          /* ── Nav ── */
          nav {
            background: ${NAVY};
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.1rem 1.5rem;
          }
          .nav-logo {
            color: ${GOLD};
            font-size: 1.55rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            font-family: Georgia, serif;
            line-height: 1.15;
          }
          .nav-links {
            display: flex;
            gap: 1.75rem;
            list-style: none;
            margin: 0;
            padding: 0;
            align-items: center;
          }
          .nav-links a {
            color: #ffffff;
            font-size: 1.05rem;
            text-decoration: none;
            font-weight: 400;
          }

          /* ── Hero ── */
          .hero {
            background: ${NAVY};
            color: #ffffff;
            padding: 3.5rem 0 4rem;
            text-align: center;
          }
          .hero-eyebrow {
            color: ${GOLD};
            font-size: 0.74rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            margin-bottom: 0.9rem;
          }
          .hero-title {
            font-size: 2.4rem;
            font-weight: 700;
            line-height: 1.18;
            margin: 0 0 1rem;
            color: #ffffff;
          }
          .hero-subtitle {
            font-size: 1.08rem;
            color: #d6dde8;
            max-width: 560px;
            margin: 0 auto;
            line-height: 1.65;
          }
          @media (max-width: 700px) {
            .hero-title { font-size: 1.85rem; }
            .hero-subtitle { font-size: 1rem; }
          }

          /* ── Section common ── */
          .section { padding: 3.5rem 0; }
          .section-light { background: ${LIGHT}; }
          .section-eyebrow {
            color: #9a7b3f;
            font-size: 0.74rem;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            margin-bottom: 0.7rem;
          }
          .section-title {
            font-size: 1.95rem;
            font-weight: 800;
            margin: 0 0 1rem;
            line-height: 1.22;
            letter-spacing: -0.01em;
            color: ${INK};
          }
          .section-lead {
            font-size: 1.06rem;
            color: ${BODY};
            max-width: 760px;
            margin: 0 0 2.5rem;
            line-height: 1.65;
          }

          /* ── Product cards ── */
          .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(440px, 1fr));
            gap: 2rem;
          }
          @media (max-width: 960px) {
            .products-grid { grid-template-columns: 1fr; }
          }

          .product-card {
            background: #ffffff;
            border: 1px solid #d8dee9;
            border-radius: 12px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 2px 12px rgba(27,42,74,0.07);
          }

          .product-card-header {
            background: ${NAVY};
            padding: 2rem 2rem 1.8rem;
          }
          .product-badge {
            display: inline-block;
            background: rgba(200,169,110,0.15);
            color: ${GOLD};
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            padding: 0.28rem 0.75rem;
            border-radius: 4px;
            border: 1px solid rgba(200,169,110,0.3);
            margin-bottom: 0.9rem;
          }
          .product-name {
            font-size: 1.6rem;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 0.6rem;
            line-height: 1.2;
          }
          .product-tagline {
            color: #a8b2c5;
            font-size: 0.96rem;
            margin: 0;
            line-height: 1.55;
          }

          .product-card-body {
            padding: 1.75rem 2rem 2rem;
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .product-features {
            list-style: none;
            margin: 0 0 1.75rem;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 0.55rem;
          }
          .product-features li {
            display: flex;
            align-items: flex-start;
            gap: 0.6rem;
            font-size: 0.94rem;
            color: ${BODY};
            line-height: 1.5;
          }
          .product-features li::before {
            content: '◆';
            color: ${GOLD};
            font-size: 0.48rem;
            margin-top: 0.42rem;
            flex-shrink: 0;
          }

          .product-divider {
            border: none;
            border-top: 1px solid #e8ecf4;
            margin: 0 0 1.25rem;
          }

          .product-price {
            font-size: 0.88rem;
            color: #8a95aa;
            margin-bottom: 1.25rem;
          }
          .product-price strong { color: ${NAVY}; }

          .product-cta {
            display: block;
            text-align: center;
            background: ${GOLD};
            color: #111 !important;
            font-weight: 700;
            font-size: 1rem;
            padding: 0.88rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            box-shadow: 0 4px 16px rgba(200,169,110,0.3);
            margin-top: auto;
          }
          .product-cta-outline {
            display: block;
            text-align: center;
            background: transparent;
            color: ${NAVY} !important;
            font-weight: 600;
            font-size: 0.96rem;
            padding: 0.78rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            border: 1px solid #c8d0e0;
            margin-top: 0.65rem;
          }

          /* ── Pedigree strip ── */
          .pedigree {
            background: ${NAVY};
            padding: 2.5rem 1.25rem;
            text-align: center;
          }
          .pedigree p {
            color: #a8b2c5;
            font-size: 0.9rem;
            margin: 0;
            line-height: 1.7;
          }
          .pedigree a { color: ${GOLD}; text-decoration: none; }

          /* ── Footer ── */
          .home-footer {
            background: #0a0e1a;
            color: #a8b2c5;
            text-align: center;
            padding: 2rem 0;
            font-size: 0.88rem;
          }
          .home-footer a { color: ${GOLD}; text-decoration: none; }
        `}</style>
      </Head>

      <div className="home-page">

        {/* ── NAV ── */}
        <nav>
          <span className="nav-logo">NOVO NAVIS</span>
          <ul className="nav-links">
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </nav>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="container" style={{ textAlign: 'center' }}>
            <p className="hero-eyebrow">Novo Navis Aerospace Operations LLC</p>
            <h1 className="hero-title">
              AI that thinks<br />before it acts.
            </h1>
            <p className="hero-subtitle">
              We build AI systems grounded in causal reasoning — not confident-sounding outputs.
              Two products. One standard of rigor.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem', marginTop: '2.5rem' }}>
              <Link href="/strategic" style={{
                display: 'block', width: '100%', maxWidth: '400px',
                background: GOLD, color: '#111', fontWeight: 700,
                fontSize: '1.05rem', padding: '1rem 1.8rem',
                borderRadius: '8px', textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(200,169,110,0.35)',
                textAlign: 'center',
              }}>
                Strategic →
              </Link>
              <Link href="/interactive" style={{
                display: 'block', width: '100%', maxWidth: '400px',
                background: GOLD, color: '#111', fontWeight: 700,
                fontSize: '1.05rem', padding: '1rem 1.8rem',
                borderRadius: '8px', textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(200,169,110,0.35)',
                textAlign: 'center',
              }}>
                Small Business Services →
              </Link>
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ── */}
        <section className="section">
          <div className="container">
            <div className="section-eyebrow">Our products</div>
            <h2 className="section-title">Choose your engagement.</h2>
            <p className="section-lead">
              Whether you're a small business owner trying to cut through AI hype or a boutique
              consultant who needs analysis you can put your name on — David is built for rigor.
            </p>

            <div className="products-grid">

              {/* ── AI Blueprint ── */}
              <div className="product-card">
                <div className="product-card-header">
                  <div className="product-badge">David / Interactive</div>
                  <h2 className="product-name">AI Blueprint</h2>
                  <p className="product-tagline">
                    Find exactly which AI tools will save your small business time and money —
                    with a 90-day implementation plan and real ROI math.
                  </p>
                </div>
                <div className="product-card-body">
                  <ul className="product-features">
                    <li>Specific tool names, real pricing, budget-matched recommendations</li>
                    <li>90-day phased implementation roadmap written for non-technical owners</li>
                    <li>Quantified time savings and ROI calculation for your situation</li>
                    <li>Risks, staff resistance, and failure modes — honestly addressed</li>
                    <li>Delivered as a branded PDF in under 20 minutes</li>
                  </ul>
                  <hr className="product-divider" />
                  <p className="product-price">
                    <strong>Free to read.</strong> Pay only if you approve the recommendation.
                  </p>
                  <Link href="/interactive" className="product-cta">
                    Get My AI Blueprint →
                  </Link>
                </div>
              </div>

              {/* ── Strategic ── */}
              <div className="product-card">
                <div className="product-card-header">
                  <div className="product-badge">David / Strategic</div>
                  <h2 className="product-name">Strategic Analysis</h2>
                  <p className="product-tagline">
                    Defense-grade strategic analysis for boutique consultants.
                    Auditable. Citable. Built to survive a boardroom.
                  </p>
                </div>
                <div className="product-card-body">
                  <ul className="product-features">
                    <li>50-page analysis with confidence ratings on every finding</li>
                    <li>Inline citations tied to a real, verifiable bibliography</li>
                    <li>Adversarial verification and SPM-level causal reasoning</li>
                    <li>Optional compliance mapping: NIST AI RMF, ISO 42001, EU AI Act, GDPR, SOX</li>
                    <li>Free redacted preview — pay $999 only if you'd put your name on it</li>
                  </ul>
                  <hr className="product-divider" />
                  <p className="product-price">
                    Free preview · <strong>$999 to unlock</strong> · No subscription
                  </p>
                  <Link href="/strategic/intake" className="product-cta">
                    Submit a Decision →
                  </Link>
                  <Link href="/strategic" className="product-cta-outline">
                    Learn More
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── PEDIGREE ── */}
        <section className="pedigree">
          <div className="container">
            <p>
              <strong style={{ color: GOLD }}>Novo Navis Aerospace Operations LLC</strong>
              {' '}· Registered U.S. Defense Contractor ·{' '}
              <a href={BBB_URL} target="_blank" rel="noopener noreferrer">
                A+ Rated, Better Business Bureau
              </a>
            </p>
            <p style={{ marginTop: '0.4rem', color: '#4a5568', fontSize: '0.82rem' }}>
              Fidelis Diligentia
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="home-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} Novo Navis, LLC · Registered U.S. Defense Contractor · Fidelis Diligentia</p>
            <p style={{ marginTop: '0.5rem' }}>
              <Link href="/privacy">Privacy Policy</Link>
              &nbsp;·&nbsp;
              <Link href="/terms">Terms and Conditions</Link>
              &nbsp;·&nbsp;
              <Link href="/faq">FAQ</Link>
              &nbsp;·&nbsp;
              <Link href="/about">About</Link>
            </p>
          </div>
        </footer>

      </div>
    </>
  )
}
