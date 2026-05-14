// pages/smb/index.js — news.novonavis.com/smb
// Dedicated landing page for SMB causal tool-selection reports.
// Mirrors the visual structure of pages/news/index.js but reads from
// smb/index.json instead. SMB reports are NEVER archived, so there's
// no archive link.
//
// URLs in the cards point to the hierarchical url_path from each entry
// (e.g. /smb/law-firms/probate-intake-automation/intake-automation).

import Head from 'next/head'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'
const INK  = '#0c1322'
const BODY = '#2d3748'

export default function SMBIndex({ reports }) {
  return (
    <>
      <Head>
        <title>AI Tool Analysis for Small Business — Novo Navis Intelligence</title>
        <meta name="description" content="Causal analysis of AI tool selection for specific small business slices. Rigorous, sourced, and conditional — not a listicle." />
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

          .hero {
            background: ${NAVY};
            color: #ffffff;
            padding: 3.5rem 0 4rem;
            text-align: center;
          }
          .hero-headline {
            font-size: 2.6rem;
            font-weight: 800;
            color: ${GOLD} !important;
            font-family: Georgia, serif;
            margin: 0 0 0.6rem;
            line-height: 1.15;
            letter-spacing: -0.01em;
          }
          .hero-sub {
            font-size: 1.15rem;
            font-weight: 600;
            color: ${GOLD} !important;
            font-family: Georgia, serif;
            margin: 0;
            letter-spacing: 0.02em;
          }
          .hero-explain {
            color: #c8d0e0;
            font-size: 0.95rem;
            max-width: 640px;
            margin: 1.25rem auto 0;
            line-height: 1.6;
          }
          @media (max-width: 700px) {
            .hero-headline { font-size: 1.85rem; }
            .hero-sub { font-size: 1rem; }
          }

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
          .back-link {
            color: ${GOLD};
            font-size: 0.88rem;
            font-weight: 600;
            text-decoration: none;
            letter-spacing: 0.04em;
          }
          .back-link:hover { text-decoration: underline; }

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
          .report-tag-row {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            flex-wrap: wrap;
            margin-bottom: 0.6rem;
          }
          .report-date {
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: ${GOLD};
          }
          .vertical-pill {
            display: inline-block;
            background: #f0f3f9;
            color: ${NAVY};
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.06em;
            padding: 0.18rem 0.55rem;
            border-radius: 4px;
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
          .price-tag {
            float: right;
            color: ${GOLD};
            font-weight: 800;
          }

          .empty-state {
            text-align: center;
            padding: 4rem 0;
            color: #8a95aa;
            font-size: 0.95rem;
          }

          .news-footer {
            background: #0a0e1a;
            color: #a8b2c5;
            text-align: center;
            padding: 2rem 0;
            font-size: 0.88rem;
          }
          .news-footer a { color: ${GOLD}; text-decoration: none; }
        `}</style>
      </Head>

      <div className="news-page">

        <nav>
          <a href="https://www.novonavis.com" className="nav-logo">NOVO NAVIS</a>
          <ul className="nav-links">
            <li><a href="https://news.novonavis.com">Intelligence</a></li>
            <li><a href="https://news.novonavis.com/smb">SMB</a></li>
            <li><a href="https://www.novonavis.com/faq">FAQ</a></li>
            <li><a href="https://www.novonavis.com/about">About</a></li>
          </ul>
        </nav>

        <section className="hero">
          <div className="container">
            <h1 className="hero-headline">AI tool selection, done causally.</h1>
            <p className="hero-sub">For the specific business you actually run.</p>
            <p className="hero-explain">
              Generic "AI for your industry" advice fails because every business operates a
              specific slice with specific mechanics. These reports analyze which AI tools fit
              that exact slice — and which ones quietly fail — using the same causal framework
              applied across Novo Navis Intelligence.
            </p>
          </div>
        </section>

        <section className="reports-section">
          <div className="container">
            <div className="reports-header">
              <div className="reports-eyebrow">SMB Tool-Selection Reports</div>
              <a href="https://news.novonavis.com" className="back-link">← Back to all reports</a>
            </div>

            {reports && reports.length > 0 ? (
              <div className="reports-grid">
                {reports.map(report => (
                  <a
                    key={report.id}
                    href={report.url_path || `/smb/${report.id}`}
                    className="report-card"
                  >
                    <div className="report-tag-row">
                      <span className="report-date">{report.date}</span>
                      {report.vertical && <span className="vertical-pill">{report.vertical}</span>}
                    </div>
                    <h2 className="report-title">{report.title}</h2>
                    <p className="report-teaser">{report.teaser}</p>
                    <div className="report-card-footer">
                      Read Report →
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>SMB reports are being prepared. Check back shortly.</p>
              </div>
            )}

          </div>
        </section>

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

export async function getServerSideProps() {
  try {
    const s3  = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })
    const obj = await s3.send(new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key:    'smb/index.json',
    }))
    const reports = JSON.parse(await obj.Body.transformToString())
    return { props: { reports: reports || [] } }
  } catch (err) {
    console.error('[smb index] Failed to fetch smb/index.json:', err.message)
    return { props: { reports: [] } }
  }
}
