// pages/news/archive.js
// news.novonavis.com/news/archive
// Browsable archive of past intelligence reports organized by month and day.
// Reads from intelligence/archive/index.json on S3 via getServerSideProps.

import Head from 'next/head'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'
const INK  = '#0c1322'
const BODY = '#2d3748'

function groupByMonthDay(reports) {
  const groups = {}
  for (const report of reports) {
    const date = report.date || 'Unknown Date'
    if (!groups[date]) groups[date] = []
    groups[date].push(report)
  }
  // Sort dates newest first
  const sorted = Object.entries(groups).sort((a, b) => {
    const da = new Date(a[0])
    const db = new Date(b[0])
    return db - da
  })
  return sorted
}

export default function ArchivePage({ reports }) {
  const grouped = groupByMonthDay(reports)

  return (
    <>
      <Head>
        <title>Intelligence Report Archive — Novo Navis</title>
        <meta name="description" content="Archive of past Novo Navis Intelligence reports. Full causal analysis available on all archived reports." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; }
          body { margin: 0; background: #ffffff; }

          .archive-page {
            background: #ffffff;
            color: ${INK};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            line-height: 1.6;
          }

          .container {
            max-width: 900px;
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
            font-size: 1rem;
            text-decoration: none;
          }

          /* ── Header ── */
          .archive-header {
            background: ${NAVY};
            padding: 2.5rem 0 3rem;
          }
          .archive-eyebrow {
            color: ${GOLD};
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            margin-bottom: 0.75rem;
          }
          .archive-title {
            color: #ffffff;
            font-size: 1.8rem;
            font-weight: 800;
            font-family: Georgia, serif;
            margin: 0 0 0.5rem;
          }
          .archive-sub {
            color: #8a95aa;
            font-size: 0.9rem;
            margin: 0;
          }

          /* ── Archive body ── */
          .archive-body {
            padding: 2.5rem 0 4rem;
          }

          /* ── Date group ── */
          .date-group {
            margin-bottom: 2.5rem;
          }

          .date-heading {
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: ${GOLD};
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #e8ecf4;
          }

          /* ── Report cards ── */
          .report-card {
            display: flex;
            flex-direction: column;
            background: #ffffff;
            border: 1px solid #d8dee9;
            border-radius: 10px;
            padding: 1.25rem 1.5rem;
            margin-bottom: 0.85rem;
            text-decoration: none;
            color: inherit;
            transition: box-shadow 0.15s, border-color 0.15s;
          }
          .report-card:hover {
            box-shadow: 0 4px 16px rgba(27,42,74,0.1);
            border-color: ${GOLD};
          }
          .report-title {
            font-size: 1rem;
            font-weight: 700;
            color: ${NAVY};
            margin: 0 0 0.4rem;
            line-height: 1.3;
          }
          .report-teaser {
            font-size: 0.88rem;
            color: ${BODY};
            line-height: 1.6;
            margin: 0 0 0.6rem;
          }
          .report-tag {
            display: inline-block;
            background: #f0f4e8;
            color: #2d6a2d;
            font-size: 0.72rem;
            font-weight: 700;
            padding: 0.2rem 0.6rem;
            border-radius: 4px;
            letter-spacing: 0.06em;
          }

          /* ── Empty state ── */
          .empty-state {
            text-align: center;
            padding: 4rem 0;
            color: #8a95aa;
            font-size: 0.95rem;
          }

          /* ── Back link ── */
          .back-link {
            display: inline-block;
            color: ${GOLD};
            font-size: 0.88rem;
            text-decoration: none;
            margin-bottom: 2rem;
          }
          .back-link:hover { text-decoration: underline; }

          /* ── Footer ── */
          .archive-footer {
            background: #0a0e1a;
            color: #a8b2c5;
            text-align: center;
            padding: 2rem 0;
            font-size: 0.88rem;
          }
          .archive-footer a { color: ${GOLD}; text-decoration: none; }
        `}</style>
      </Head>

      <div className="archive-page">

        {/* NAV */}
        <nav>
          <a href="https://news.novonavis.com" className="nav-logo">NOVO NAVIS</a>
          <ul className="nav-links">
            <li><a href="https://news.novonavis.com">Reports</a></li>
            <li><a href="https://www.novonavis.com/faq">FAQ</a></li>
            <li><a href="https://www.novonavis.com/about">About</a></li>
          </ul>
        </nav>

        {/* HEADER */}
        <div className="archive-header">
          <div className="container">
            <div className="archive-eyebrow">Novo Navis Intelligence</div>
            <h1 className="archive-title">Report Archive</h1>
            <p className="archive-sub">
              Past reports are published in full. By the time it's free, the market has already moved.
            </p>
          </div>
        </div>

        {/* BODY */}
        <div className="archive-body">
          <div className="container">

            <a href="https://news.novonavis.com" className="back-link">
              ← Today's Reports
            </a>

            {grouped.length === 0 ? (
              <div className="empty-state">
                <p>No archived reports yet. Check back soon.</p>
              </div>
            ) : (
              grouped.map(([date, dateReports]) => (
                <div key={date} className="date-group">
                  <div className="date-heading">{date}</div>
                  {dateReports.map(report => (
                    <a
                      key={report.id}
                      href={`/news/${report.id}`}
                      className="report-card"
                    >
                      <h2 className="report-title">{report.title}</h2>
                      <p className="report-teaser">{report.teaser}</p>
                      <span className="report-tag">Full Report Available</span>
                    </a>
                  ))}
                </div>
              ))
            )}

          </div>
        </div>

        {/* FOOTER */}
        <footer className="archive-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} Novo Navis, LLC · Fidelis Diligentia</p>
            <p style={{ marginTop: '0.5rem' }}>
              <a href="https://www.novonavis.com/privacy">Privacy Policy</a>
              &nbsp;·&nbsp;
              <a href="https://www.novonavis.com/terms">Terms and Conditions</a>
              &nbsp;·&nbsp;
              <a href="https://news.novonavis.com">Today's Reports</a>
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
      Key:    'intelligence/archive/index.json',
    }))
    const reports = JSON.parse(await obj.Body.transformToString())
    return { props: { reports: reports || [] } }
  } catch (err) {
    console.error('[archive] Failed to fetch archive index:', err.message)
    return { props: { reports: [] } }
  }
}
