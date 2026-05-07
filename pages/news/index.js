// pages/index.js — news.novonavis.com
// Daily intelligence reports landing page.
// Update REPORTS array each morning with six new reports.

import Head from 'next/head'
import Link from 'next/link'

const NAVY  = '#1B2A4A'
const GOLD  = '#c8a96e'
const LIGHT = '#f4f6fb'
const INK   = '#0c1322'
const BODY  = '#2d3748'

const REPORTS = [
  {
    id: '070526-0001',
    date: 'May 7, 2026',
    title: 'Placeholder Report Title One',
    teaser: 'A two to three sentence teaser that gives the reader enough context to understand what this report covers and why it matters today, without giving away the core finding.',
  },
  {
    id: '070526-0002',
    date: 'May 7, 2026',
    title: 'Placeholder Report Title Two',
    teaser: 'A two to three sentence teaser that gives the reader enough context to understand what this report covers and why it matters today, without giving away the core finding.',
  },
  {
    id: '070526-0003',
    date: 'May 7, 2026',
    title: 'Placeholder Report Title Three',
    teaser: 'A two to three sentence teaser that gives the reader enough context to understand what this report covers and why it matters today, without giving away the core finding.',
  },
  {
    id: '070526-0004',
    date: 'May 7, 2026',
    title: 'Placeholder Report Title Four',
    teaser: 'A two to three sentence teaser that gives the reader enough context to understand what this report covers and why it matters today, without giving away the core finding.',
  },
  {
    id: '070526-0005',
    date: 'May 7, 2026',
    title: 'Placeholder Report Title Five',
    teaser: 'A two to three sentence teaser that gives the reader enough context to understand what this report covers and why it matters today, without giving away the core finding.',
  },
  {
    id: '070526-0006',
    date: 'May 7, 2026',
    title: 'Placeholder Report Title Six',
    teaser: 'A two to three sentence teaser that gives the reader enough context to understand what this report covers and why it matters today, without giving away the core finding.',
  },
]

export default function NewsIndex() {
  return (
    <>
      <Head>
        <title>Novo Navis — Daily Intelligence Reports</title>
        <meta name="description" content="Daily auditable intelligence reports from Novo Navis. Causal analysis on the decisions that matter." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; }
          body { margin: 0; background: #ffffff; }

          .news-page {
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
            text-decoration: none;
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
          .hero-headline {
            font-size: 2.8rem;
            font-weight: 800;
            color: ${GOLD};
            font-family: Georgia, serif;
            margin: 0 0 0.6rem;
            line-height: 1.15;
            letter-spacing: -0.01em;
          }
          .hero-sub {
            font-size: 1.3rem;
            font-weight: 700;
            color: ${GOLD};
            font-family: Georgia, serif;
            margin: 0;
            letter-spacing: 0.04em;
          }
          @media (max-width: 700px) {
            .hero-headline { font-size: 2rem; }
            .hero-sub { font-size: 1.05rem; }
          }

          /* ── Reports section ── */
          .reports-section {
            padding: 3rem 0 4rem;
            background: #ffffff;
          }
          .reports-header {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            gap: 0.75rem;
          }
          .reports-eyebrow {
            color: #9a7b3f;
            font-size: 0.74rem;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
          }
          .archive-link {
            color: ${GOLD};
            font-size: 0.88rem;
            font-weight: 600;
            text-decoration: none;
            letter-spacing: 0.04em;
          }
          .archive-link:hover {
            text-decoration: underline;
          }

          /* ── Report cards ── */
          .reports-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.5rem;
          }
          @media (max-width: 700px) {
            .reports-grid { grid-template-columns: 1fr; }
          }

          .report-card {
            background: #ffffff;
            border: 1px solid #d8dee9;
            border-radius: 10px;
            padding: 1.5rem 1.6rem 1.75rem;
            display: flex;
            flex-direction: column;
            box-shadow: 0 2px 10px rgba(27,42,74,0.06);
            text-decoration: none;
            color: inherit;
            transition: box-shadow 0.18s ease, border-color 0.18s ease;
          }
          .report-card:hover {
            box-shadow: 0 6px 24px rgba(27,42,74,0.13);
            border-color: ${GOLD};
          }
          .report-date {
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: ${GOLD};
            margin-bottom: 0.6rem;
          }
          .report-title {
            font-size: 1.08rem;
            font-weight: 700;
            color: ${NAVY};
            margin: 0 0 0.7rem;
            line-height: 1.3;
          }
          .report-teaser {
            font-size: 0.9rem;
            color: ${BODY};
            line-height: 1.6;
            margin: 0;
            flex: 1;
          }
          .report-card-footer {
            margin-top: 1.25rem;
            font-size: 0.82rem;
            font-weight: 700;
            color: ${NAVY};
            letter-spacing: 0.04em;
          }

          /* ── Footer ── */
          .news-footer {
            background: #0a0e1a;
            color: #a8b2c5;
            text-align: center;
            padding: 2rem 0;
            font-size: 0.88rem;
          }
          .news-footer a {
            color: ${GOLD};
            text-decoration: none;
          }
        `}</style>
      </Head>

      <div className="news-page">

        {/* ── NAV ── */}
        <nav>
          <a href="https://www.novonavis.com" className="nav-logo">NOVO NAVIS</a>
          <ul className="nav-links">
            <li><a href="/archive">Archive</a></li>
            <li><a href="https://www.novonavis.com/strategic/intake">Custom Report</a></li>
            <li><a href="https://www.novonavis.com/faq">FAQ</a></li>
          </ul>
        </nav>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="container">
            <h1 className="hero-headline">You want the edge, it's here.</h1>
            <p className="hero-sub">We are Novo Navis.</p>
          </div>
        </section>

        {/* ── REPORTS ── */}
        <section className="reports-section">
          <div className="container">
            <div className="reports-header">
              <div className="reports-eyebrow">Today's Intelligence Reports</div>
              <a href="/archive" className="archive-link">View Archive →</a>
            </div>
            <div className="reports-grid">
              {REPORTS.map(report => (
                <a
                  key={report.id}
                  href={`/${report.id}`}
                  className="report-card"
                >
                  <div className="report-date">{report.date}</div>
                  <h2 className="report-title">{report.title}</h2>
                  <p className="report-teaser">{report.teaser}</p>
                  <div className="report-card-footer">Read Report →</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="news-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} Novo Navis, LLC · Fidelis Diligentia</p>
            <p style={{ marginTop: '0.5rem' }}>
              <a href="https://www.novonavis.com/privacy">Privacy Policy</a>
              &nbsp;·&nbsp;
              <a href="https://www.novonavis.com/terms">Terms and Conditions</a>
              &nbsp;·&nbsp;
              <a href="https://www.novonavis.com/faq">FAQ</a>
              &nbsp;·&nbsp;
              <a href="https://www.novonavis.com/about">About</a>
            </p>
          </div>
        </footer>

      </div>
    </>
  )
}
