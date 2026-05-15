// pages/news/index.js — news.novonavis.com
// Dynamic landing page. Fetches BOTH intelligence/index.json and smb/index.json
// from S3 on every request, merges them by date, and renders unified cards.
//
// Each card links to the right destination based on report kind:
//   - "intelligence" cards link to /news/{id}
//   - "smb" cards link to the hierarchical url_path
//
// No rebuild needed when reports are added.

import Head from 'next/head'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'
const INK  = '#0c1322'
const BODY = '#2d3748'

export default function NewsIndex({ reports, schemaJson }) {
  return (
    <>
      <Head>
        <title>Novo Navis Intelligence — Daily Analysis</title>
        <meta name="description" content="Daily causal intelligence reports from Novo Navis. Rigorous analysis on the decisions and events that matter." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {schemaJson && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schemaJson }}
          />
        )}
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
            font-size: 2.8rem;
            font-weight: 800;
            color: ${GOLD} !important;
            font-family: Georgia, serif;
            margin: 0 0 0.6rem;
            line-height: 1.15;
            letter-spacing: -0.01em;
          }
          .hero-sub {
            font-size: 1.3rem;
            font-weight: 700;
            color: ${GOLD} !important;
            font-family: Georgia, serif;
            margin: 0;
            letter-spacing: 0.04em;
          }
          @media (max-width: 700px) {
            .hero-headline { font-size: 2rem; }
            .hero-sub { font-size: 1.05rem; }
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
          .archive-link {
            color: ${GOLD};
            font-size: 0.88rem;
            font-weight: 600;
            text-decoration: none;
            letter-spacing: 0.04em;
          }
          .archive-link:hover { text-decoration: underline; }

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
            position: relative;
          }
          .report-card:hover {
            box-shadow: 0 6px 24px rgba(27,42,74,0.13);
            border-color: ${GOLD};
          }
          .kind-pill {
            position: absolute;
            top: 1rem;
            right: 1.1rem;
            font-size: 0.62rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            padding: 0.22rem 0.55rem;
            border-radius: 4px;
            background: #f0f3f9;
            color: ${NAVY};
          }
          .kind-pill.smb {
            background: rgba(200,169,110,0.18);
            color: #8a6f3e;
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
            padding-right: 4.5rem;
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
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .price-tag {
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
            <li><a href="https://news.novonavis.com/smb">SMB Reports</a></li>
            <li><a href="https://www.novonavis.com/faq">FAQ</a></li>
            <li><a href="https://www.novonavis.com/about">About</a></li>
          </ul>
        </nav>

        <section className="hero">
          <div className="container">
            <h1 className="hero-headline">You want the edge, it's here.</h1>
            <p className="hero-sub">We are Novo Navis.</p>
          </div>
        </section>

        <section className="reports-section">
          <div className="container">
            <div className="reports-header">
              <div className="reports-eyebrow">Today's Intelligence Reports</div>
              <a href="/news/archive" className="archive-link">View Archive →</a>
            </div>

            {reports && reports.length > 0 ? (
              <div className="reports-grid">
                {reports.map(report => (
                  <a
                    key={`${report.kind}-${report.id}`}
                    href={report.href}
                    className="report-card"
                  >
                    <span className={`kind-pill ${report.kind === 'smb' ? 'smb' : ''}`}>
                      {report.kind === 'smb' ? 'SMB' : 'Intel'}
                    </span>
                    <div className="report-date">{report.date}</div>
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
                <p>Reports are being prepared. Check back shortly.</p>
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

// ── Helpers to parse the date strings reliably for sorting ────────────────────
function parseEntryDate(dateStr) {
  // Date format is like "May 14, 2026" — let Date.parse handle it.
  // If parse fails, fall back to epoch 0 so the entry sinks to the bottom.
  if (!dateStr) return 0
  const ts = Date.parse(dateStr)
  return isNaN(ts) ? 0 : ts
}

export async function getServerSideProps() {
  const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })

  // Fetch both indexes in parallel. If either fails, fall back to empty array.
  const fetchIndex = async (key) => {
    try {
      const obj = await s3.send(new GetObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key:    key,
      }))
      const parsed = JSON.parse(await obj.Body.transformToString())
      return Array.isArray(parsed) ? parsed : []
    } catch (err) {
      console.error(`[news index] Failed to fetch ${key}:`, err.message)
      return []
    }
  }

  const [intel, smb] = await Promise.all([
    fetchIndex('intelligence/index.json'),
    fetchIndex('smb/index.json'),
  ])

  const normalized = []

  for (const r of intel) {
    normalized.push({
      kind:   'intelligence',
      id:     r.id || '',
      date:   r.date || '',
      title:  r.title || '',
      teaser: r.teaser || '',
      href:   `/news/${r.id}`,
      _ts:    parseEntryDate(r.date),
    })
  }

  for (const r of smb) {
    normalized.push({
      kind:   'smb',
      id:     r.id || '',
      date:   r.date || '',
      title:  r.title || '',
      teaser: r.teaser || '',
      href:   r.url_path || `/smb/${r.id}`,
      _ts:    parseEntryDate(r.date),
    })
  }

  // Sort by date descending (newest first)
  normalized.sort((a, b) => b._ts - a._ts)

  // Strip internal sort key before sending to client
  const reports = normalized.map(({ _ts, ...rest }) => rest)

  // ── Build landing-page schema (Organization + WebSite) ────────────────────
  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id':   'https://www.novonavis.com/#organization',
        name:    'Novo Navis, LLC',
        url:     'https://www.novonavis.com',
        logo: {
          '@type': 'ImageObject',
          url:     'https://res.cloudinary.com/dqv9va6ta/image/upload/q_auto/f_auto/v1776042617/logo-3CHVSKdrSORX1atXUpvUTS7tVbt_cz2saz.webp',
        },
        sameAs: [
          'https://www.reddit.com/r/AiForSmallBusiness/comments/1snruki/i_built_a_causal_ai_system_for_small_businesses/',
          'https://news.ycombinator.com/item?id=48075222',
        ],
        founder: {
          '@type': 'Person',
          name:    'Eric Johnston',
        },
      },
      {
        '@type':   'WebSite',
        '@id':     'https://news.novonavis.com/#website',
        url:       'https://news.novonavis.com',
        name:      'Novo Navis Intelligence',
        publisher: { '@id': 'https://www.novonavis.com/#organization' },
      },
    ],
  })

  return { props: { reports, schemaJson } }
}
