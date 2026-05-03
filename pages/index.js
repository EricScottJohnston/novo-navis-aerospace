// pages/index.js — Novo Navis homepage
// Links to /interactive (AI Blueprint) and /strategic (David / Strategic)

import Head from 'next/head'
import Link from 'next/link'

const NAVY    = '#1B2A4A'
const NAVY2   = '#0c1322'
const GOLD    = '#c8a96e'
const GOLD_DIM = '#9a7b3f'
const INK     = '#0c1322'
const BODY    = '#2d3748'
const BG_DARK = '#0a0e1a'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Novo Navis — Fidelis Diligentia</title>
        <meta name="description" content="Novo Navis builds AI systems that think before they act. AI integration for small business and defense-grade strategic analysis for consultants." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; }
          body { margin: 0; }

          .home-page {
            background: ${BG_DARK};
            color: #d8dce8;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            line-height: 1.6;
          }

          .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 1.25rem;
          }

          /* ── NAV ── */
          .home-nav {
            background: ${NAVY2};
            border-bottom: 1px solid #1e2a45;
            padding: 0 1.25rem;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            top: 0;
            z-index: 50;
          }
          .nav-logo {
            color: ${GOLD};
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            text-decoration: none;
          }
          .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
            margin: 0;
            padding: 0;
          }
          .nav-links a {
            color: #8a95aa;
            font-size: 0.82rem;
            text-decoration: none;
            letter-spacing: 0.06em;
            transition: color 0.15s;
          }
          .nav-links a:hover { color: ${GOLD}; }

          /* ── HERO ── */
          .hero {
            background: ${NAVY2};
            padding: 5rem 1.25rem 4.5rem;
            text-align: center;
            border-bottom: 1px solid #1e2a45;
            position: relative;
            overflow: hidden;
          }
          .hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background:
              linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px);
            background-size: 48px 48px;
            pointer-events: none;
          }
          .hero-eyebrow {
            color: ${GOLD_DIM};
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            margin-bottom: 1.2rem;
          }
          .hero-title {
            font-size: clamp(2rem, 5vw, 3.2rem);
            font-weight: 700;
            color: #ffffff;
            line-height: 1.15;
            margin: 0 0 1.1rem;
            letter-spacing: -0.01em;
          }
          .hero-title span { color: ${GOLD}; }
          .hero-sub {
            font-size: 1.1rem;
            color: #a8b2c5;
            max-width: 600px;
            margin: 0 auto 2.2rem;
            line-height: 1.65;
          }
          .hero-rule {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2.5rem;
          }
          .hero-rule::before,
          .hero-rule::after {
            content: '';
            display: block;
            width: 48px;
            height: 1px;
            background: #2a3550;
          }
          .hero-rule-text {
            color: #3a4560;
            font-size: 0.7rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
          }

          /* ── PRODUCT CARDS ── */
          .products {
            padding: 4rem 0 5rem;
          }
          .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(440px, 1fr));
            gap: 2rem;
            margin-top: 0;
          }
          @media (max-width: 960px) {
            .products-grid { grid-template-columns: 1fr; }
          }

          .product-card {
            background: #0d1221;
            border: 1px solid #1e2a45;
            border-radius: 12px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .product-card:hover {
            border-color: ${GOLD_DIM};
            box-shadow: 0 8px 40px rgba(200,169,110,0.08);
          }

          .product-card-header {
            background: ${NAVY};
            padding: 2rem 2rem 1.8rem;
            border-bottom: 1px solid #1e2a45;
          }
          .product-badge {
            display: inline-block;
            background: rgba(200,169,110,0.12);
            color: ${GOLD};
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            padding: 0.3rem 0.75rem;
            border-radius: 4px;
            border: 1px solid rgba(200,169,110,0.2);
            margin-bottom: 1rem;
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
            padding: 1.75rem 2rem;
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
            gap: 0.7rem;
          }
          .product-features li {
            display: flex;
            align-items: flex-start;
            gap: 0.65rem;
            font-size: 0.94rem;
            color: #8a95aa;
            line-height: 1.5;
          }
          .product-features li::before {
            content: '◆';
            color: ${GOLD_DIM};
            font-size: 0.5rem;
            margin-top: 0.38rem;
            flex-shrink: 0;
          }

          .product-price {
            font-size: 0.82rem;
            color: #4a5568;
            margin-bottom: 1.25rem;
            padding-top: 1.25rem;
            border-top: 1px solid #1e2a45;
          }
          .product-price strong {
            color: ${GOLD};
            font-size: 1.05rem;
          }

          .product-cta {
            display: block;
            text-align: center;
            background: ${GOLD};
            color: #111 !important;
            font-weight: 700;
            font-size: 0.98rem;
            padding: 0.85rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            box-shadow: 0 4px 16px rgba(200,169,110,0.25);
            transition: box-shadow 0.2s, transform 0.1s;
            margin-top: auto;
          }
          .product-cta:hover {
            box-shadow: 0 6px 24px rgba(200,169,110,0.4);
            transform: translateY(-1px);
          }
          .product-cta-secondary {
            display: block;
            text-align: center;
            background: transparent;
            color: ${GOLD} !important;
            font-weight: 600;
            font-size: 0.95rem;
            padding: 0.78rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            border: 1px solid rgba(200,169,110,0.35);
            margin-top: 0.65rem;
            transition: border-color 0.2s, background 0.2s;
          }
          .product-cta-secondary:hover {
            border-color: ${GOLD};
            background: rgba(200,169,110,0.06);
          }

          /* ── DIVIDER ── */
          .divider {
            border: none;
            border-top: 1px solid #1a2440;
            margin: 0;
          }

          /* ── PEDIGREE STRIP ── */
          .pedigree {
            background: ${NAVY};
            padding: 2.75rem 1.25rem;
            text-align: center;
            border-top: 1px solid #1e2a45;
            border-bottom: 1px solid #1e2a45;
          }
          .pedigree-text {
            color: #a8b2c5;
            font-size: 0.92rem;
            margin: 0;
            line-height: 1.7;
          }
          .pedigree-text strong { color: ${GOLD}; }

          /* ── FOOTER ── */
          .home-footer {
            background: ${NAVY2};
            border-top: 1px solid #1e2a45;
            padding: 2rem 1.25rem;
            text-align: center;
            color: #4a5568;
            font-size: 0.86rem;
          }
          .home-footer a { color: ${GOLD_DIM}; text-decoration: none; }
          .home-footer a:hover { color: ${GOLD}; }
        `}</style>
      </Head>

      <div className="home-page">

        {/* ── NAV ── */}
        <nav className="home-nav">
          <span className="nav-logo">Novo Navis</span>
          <ul className="nav-links">
            <li><Link href="/interactive">AI Blueprint</Link></li>
            <li><Link href="/strategic">Strategic</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </nav>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="container">
            <p className="hero-eyebrow">Novo Navis Aerospace Operations LLC</p>
            <h1 className="hero-title">
              AI that thinks<br/>
              <span>before it acts.</span>
            </h1>
            <p className="hero-sub">
              We build AI systems grounded in causal reasoning — not
              confident-sounding outputs. Two products. One standard of rigor.
            </p>
            <div className="hero-rule">
              <span className="hero-rule-text">Choose your product</span>
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ── */}
        <section className="products">
          <div className="container">
            <div className="products-grid">

              {/* ── Interactive / AI Blueprint ── */}
              <div className="product-card">
                <div className="product-card-header">
                  <div className="product-badge">David / Interactive</div>
                  <h2 className="product-name">AI Blueprint</h2>
                  <p className="product-tagline">
                    Find exactly which AI tools will save your small business
                    time and money — with a 90-day implementation plan and real ROI math.
                  </p>
                </div>
                <div className="product-card-body">
                  <ul className="product-features">
                    <li>Specific tool names, real pricing, budget-matched recommendations</li>
                    <li>90-day phased implementation roadmap written for non-technical owners</li>
                    <li>Quantified time savings and ROI calculation for your situation</li>
                    <li>Risks, resistance, and failure modes — honestly addressed</li>
                    <li>Delivered as a branded PDF report in under 20 minutes</li>
                  </ul>
                  <p className="product-price">
                    <strong>Free</strong> — Limited availability during Founders Special
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
                    Auditable. Citable. Built to survive a board room.
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
                  <p className="product-price">
                    Free preview · <strong>$999</strong> to unlock · No subscription
                  </p>
                  <Link href="/strategic/intake" className="product-cta">
                    Submit a Decision →
                  </Link>
                  <Link href="/strategic" className="product-cta-secondary">
                    Learn More →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── PEDIGREE STRIP ── */}
        <section className="pedigree">
          <div className="container">
            <p className="pedigree-text">
              <strong>Novo Navis Aerospace Operations LLC</strong> · Registered U.S. Defense Contractor ·{' '}
              <a
                href="https://www.bbb.org/us/az/glendale/profile/aerospace-industry/novo-navis-aerospace-1126-1000076608"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: GOLD, textDecoration: 'none' }}
              >
                A+ Rated, Better Business Bureau
              </a>
              <br />
              Fidelis Diligentia
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="home-footer">
          <div className="container">
            <p>
              © {new Date().getFullYear()} Novo Navis, LLC · Registered U.S. Defense Contractor · Fidelis Diligentia
            </p>
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
