// pages/recovery.js
// novonavis.com/recovery
// Distressed Asset Recovery — AI C-Suite product page

import Head from 'next/head'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'
const INK  = '#0c1322'
const MUTED = '#6b7a99'

export default function Recovery() {
  return (
    <>
      <Head>
        <title>Distressed Asset Recovery — Novo Navis</title>
        <meta name="description" content="Novo Navis deploys an AI C-Suite into distressed companies. Causal analysis identifies the real drivers of underperformance. Recovery begins immediately." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #ffffff; color: ${INK}; }

          .page {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            line-height: 1.6;
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
            text-decoration: none;
          }
          .nav-links {
            display: flex;
            gap: 1.75rem;
            list-style: none;
            align-items: center;
          }
          .nav-links a {
            color: #ffffff;
            font-size: 1rem;
            text-decoration: none;
          }

          /* ── Hero ── */
          .hero {
            background: ${NAVY};
            padding: 5rem 1.5rem 5rem;
            text-align: center;
          }
          .hero-eyebrow {
            color: ${GOLD};
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            margin-bottom: 1rem;
          }
          .hero-headline {
            color: #ffffff;
            font-size: 2.6rem;
            font-weight: 800;
            font-family: Georgia, serif;
            line-height: 1.15;
            max-width: 760px;
            margin: 0 auto 1.25rem;
          }
          .hero-sub {
            color: #8a95aa;
            font-size: 1.1rem;
            max-width: 580px;
            margin: 0 auto 2.5rem;
            line-height: 1.65;
          }
          .hero-cta {
            display: inline-block;
            background: ${GOLD};
            color: ${NAVY};
            font-weight: 700;
            font-size: 1rem;
            padding: 0.95rem 2rem;
            border-radius: 6px;
            text-decoration: none;
            letter-spacing: 0.03em;
          }
          @media (max-width: 700px) {
            .hero-headline { font-size: 1.8rem; }
          }

          /* ── Container ── */
          .container {
            max-width: 860px;
            margin: 0 auto;
            padding: 0 1.5rem;
          }

          /* ── Section ── */
          .section {
            padding: 4rem 0;
            border-bottom: 1px solid #e8ecf4;
          }
          .section:last-of-type { border-bottom: none; }

          .section-eyebrow {
            color: ${GOLD};
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            margin-bottom: 0.6rem;
          }
          .section-title {
            color: ${NAVY};
            font-size: 1.6rem;
            font-weight: 800;
            font-family: Georgia, serif;
            margin-bottom: 1rem;
            line-height: 1.2;
          }
          .section-body {
            color: ${MUTED};
            font-size: 1rem;
            line-height: 1.75;
            max-width: 680px;
          }

          /* ── Architecture cards ── */
          .arch-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 1.25rem;
            margin-top: 2rem;
          }
          .arch-card {
            background: #f8f9fc;
            border: 1px solid #e0e4ef;
            border-radius: 10px;
            padding: 1.5rem;
          }
          .arch-card-label {
            color: ${GOLD};
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
          }
          .arch-card-title {
            color: ${NAVY};
            font-size: 1rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }
          .arch-card-body {
            color: ${MUTED};
            font-size: 0.88rem;
            line-height: 1.6;
          }

          /* ── Mode toggle ── */
          .modes {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.25rem;
            margin-top: 2rem;
          }
          @media (max-width: 600px) {
            .modes { grid-template-columns: 1fr; }
            .arch-grid { grid-template-columns: 1fr; }
          }
          .mode-card {
            border: 2px solid #e0e4ef;
            border-radius: 10px;
            padding: 1.75rem 1.5rem;
          }
          .mode-card.featured { border-color: ${GOLD}; }
          .mode-title {
            color: ${NAVY};
            font-size: 1.05rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
          }
          .mode-body {
            color: ${MUTED};
            font-size: 0.9rem;
            line-height: 1.65;
          }

          /* ── CTA section ── */
          .cta-section {
            background: ${NAVY};
            padding: 4rem 1.5rem;
            text-align: center;
          }
          .cta-section h2 {
            color: #ffffff;
            font-size: 1.8rem;
            font-weight: 800;
            font-family: Georgia, serif;
            margin-bottom: 0.75rem;
          }
          .cta-section p {
            color: #8a95aa;
            font-size: 1rem;
            max-width: 500px;
            margin: 0 auto 2rem;
            line-height: 1.65;
          }
          .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
          }
          .btn-primary {
            background: ${GOLD};
            color: ${NAVY};
            font-weight: 700;
            font-size: 1rem;
            padding: 0.95rem 2rem;
            border-radius: 6px;
            text-decoration: none;
          }
          .btn-secondary {
            background: transparent;
            color: #ffffff;
            font-weight: 600;
            font-size: 1rem;
            padding: 0.95rem 2rem;
            border-radius: 6px;
            border: 2px solid #3a4a6a;
            text-decoration: none;
          }

          /* ── Footer ── */
          footer {
            background: #0a0e1a;
            color: #6b7a99;
            text-align: center;
            padding: 2rem 1.5rem;
            font-size: 0.85rem;
          }
          footer a { color: ${GOLD}; text-decoration: none; }
        `}</style>
      </Head>

      <div className="page">

        {/* NAV */}
        <nav>
          <a href="https://www.novonavis.com" className="nav-logo">NOVO NAVIS</a>
          <ul className="nav-links">
            <li><a href="https://www.novonavis.com/strategic">Strategic Analysis</a></li>
            <li><a href="https://news.novonavis.com">Intelligence</a></li>
            <li><a href="https://www.novonavis.com/about">About</a></li>
          </ul>
        </nav>

        {/* HERO */}
        <div className="hero">
          <div className="hero-eyebrow">Distressed Asset Recovery</div>
          <h1 className="hero-headline">We replace your C-Suite with one that never sleeps.</h1>
          <p className="hero-sub">
            Novo Navis deploys an AI C-Suite into distressed companies. David identifies
            the causal drivers of underperformance — not symptoms, not guesses — and
            recovery begins immediately.
          </p>
          <a href="mailto:eric@novonavis.com?subject=Recovery Inquiry" className="hero-cta">
            Start the Conversation →
          </a>
        </div>

        {/* THE PROBLEM */}
        <div className="section">
          <div className="container">
            <div className="section-eyebrow">The Problem</div>
            <h2 className="section-title">Most turnarounds fail because they treat symptoms.</h2>
            <p className="section-body">
              Traditional restructuring brings in consultants who interview people, build
              slide decks, and recommend cuts. They identify what is happening. They rarely
              identify why. Without understanding the causal mechanism driving underperformance,
              the same problems resurface under different names. Novo Navis approaches recovery
              differently — we find the cause before we prescribe the fix.
            </p>
          </div>
        </div>

        {/* THE ARCHITECTURE */}
        <div className="section">
          <div className="container">
            <div className="section-eyebrow">The Architecture</div>
            <h2 className="section-title">An AI C-Suite built for your specific situation.</h2>
            <p className="section-body">
              David ingests your company data and applies a constitutional causal reasoning
              framework to identify the real drivers of distress. He then builds a team of
              specialized agents — one for each executive function — that execute the recovery
              in real time.
            </p>
            <div className="arch-grid">
              <div className="arch-card">
                <div className="arch-card-label">David — Chief Reasoning Officer</div>
                <div className="arch-card-title">Causal Analysis Engine</div>
                <div className="arch-card-body">Ingests all company data. Identifies causal drivers of underperformance. Builds the recovery thesis. Reports to your board.</div>
              </div>
              <div className="arch-card">
                <div className="arch-card-label">Specialized Agents</div>
                <div className="arch-card-title">AI C-Suite</div>
                <div className="arch-card-body">Purpose-built agents for finance, operations, sales, marketing, and HR. Each reports to David. Each is built for your specific situation.</div>
              </div>
              <div className="arch-card">
                <div className="arch-card-label">Board Interface</div>
                <div className="arch-card-title">Governance Layer</div>
                <div className="arch-card-body">David compiles information for your board and takes strategic direction from them. You remain in control. David executes.</div>
              </div>
              <div className="arch-card">
                <div className="arch-card-label">Worker Input</div>
                <div className="arch-card-title">Ground Truth Layer</div>
                <div className="arch-card-body">David listens to your people via email, text, and internal systems. Ground truth from the floor informs every decision.</div>
              </div>
            </div>
          </div>
        </div>

        {/* OPERATING MODES */}
        <div className="section">
          <div className="container">
            <div className="section-eyebrow">Operating Modes</div>
            <h2 className="section-title">You decide how much David does.</h2>
            <p className="section-body">
              Every company is different. Some want David to execute tasks directly.
              Others want David to direct humans through an interface. The level of
              autonomy is your choice.
            </p>
            <div className="modes">
              <div className="mode-card">
                <div className="mode-title">Command and Control</div>
                <div className="mode-body">David's agents issue orders to human workers through an interface. Humans execute. AI directs. Full transparency at every step.</div>
              </div>
              <div className="mode-card featured">
                <div className="mode-title">Full Execution</div>
                <div className="mode-body">David's agents do the work directly — filing reports, executing decisions, managing workflows. Maximum speed. Maximum recovery velocity.</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <h2>Is your company a candidate?</h2>
          <p>
            We work with distressed companies and their investors. If you are facing
            underperformance with no clear path forward, let David look at it.
          </p>
          <div className="cta-buttons">
            <a href="/recovery-intake" className="btn-primary">
              Run a Recovery Diagnostic — $5,000 →
            </a>
            <a href="mailto:eric@novonavis.com?subject=Recovery Inquiry" className="btn-secondary">
              Talk to Eric First →
            </a>
            <a href="https://news.novonavis.com" className="btn-secondary">
              Read Our Intelligence Reports
            </a>
          </div>
        </div>

        {/* FOOTER */}
        <footer>
          <p>© {new Date().getFullYear()} Novo Navis, LLC · Fidelis Diligentia</p>
          <p style={{ marginTop: '0.5rem' }}>
            <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/about">About</a>
          </p>
        </footer>

      </div>
    </>
  )
}
