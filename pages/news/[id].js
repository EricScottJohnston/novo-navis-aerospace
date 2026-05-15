// pages/news/[id].js
// Dynamic route for individual intelligence report pages.
// Checks if report is archived — if so, serves full content free.
// If current, serves free preview with paywall.

import Head from 'next/head'
import { useState } from 'react'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'
const INK  = '#0c1322'
const BODY = '#2d3748'

export default function ReportPage({ orderId, html, title, date, isArchived, schemaJson }) {
  const [buying,   setBuying]   = useState(false)
  const [buyError, setBuyError] = useState('')

  const handleUnlock = async () => {
    setBuying(true); setBuyError('')
    try {
      const res  = await fetch('/api/unlock-checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ orderId }),
      })
      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url
      } else {
        setBuyError(data.error || 'Something went wrong. Please try again.')
        setBuying(false)
      }
    } catch {
      setBuyError('Network error. Please try again.')
      setBuying(false)
    }
  }

  return (
    <>
      <Head>
        <title>{title ? `${title} — Novo Navis Intelligence` : 'Intelligence Report — Novo Navis'}</title>
        <meta name="description" content={title ? `${title}. Causal intelligence analysis from Novo Navis.` : 'Causal intelligence analysis from Novo Navis.'} />
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

          .report-page {
            background: #ffffff;
            color: ${INK};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            line-height: 1.6;
          }

          .container {
            max-width: 820px;
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
          }

          .report-header {
            background: ${NAVY};
            padding: 2.5rem 0 3rem;
          }
          .report-eyebrow {
            color: ${GOLD};
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            margin-bottom: 0.75rem;
          }
          .report-title {
            color: #ffffff;
            font-size: 1.85rem;
            font-weight: 800;
            font-family: Georgia, serif;
            line-height: 1.22;
            margin: 0 0 0.75rem;
          }
          .report-meta {
            color: #8a95aa;
            font-size: 0.84rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
          }
          .archived-badge {
            display: inline-block;
            background: rgba(200,169,110,0.15);
            color: ${GOLD};
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            padding: 0.2rem 0.6rem;
            border-radius: 4px;
            border: 1px solid rgba(200,169,110,0.3);
          }
          @media (max-width: 700px) {
            .report-title { font-size: 1.4rem; }
          }

          .report-body { padding: 2.5rem 0 1rem; }

          .archived-banner {
            background: #f8f9fc;
            border: 1px solid #e0e4ef;
            border-radius: 8px;
            padding: 1rem 1.25rem;
            margin-bottom: 2rem;
            font-size: 0.85rem;
            color: #6b7a99;
            line-height: 1.55;
          }
          .archived-banner strong { color: ${NAVY}; }

          .report-content .disclaimer {
            background: #f8f9fc;
            border-left: 3px solid #d0d4de;
            border-radius: 6px;
            padding: 1rem 1.1rem;
            margin-bottom: 2rem;
          }
          .report-content .disclaimer p {
            font-size: 0.78rem;
            color: #8a95aa;
            margin: 0 0 0.4rem;
            line-height: 1.55;
          }
          .report-content .disclaimer p:last-child { margin-bottom: 0; }
          .report-content h1.report-title { display: none; }
          .report-content h2.section-heading {
            font-size: 1.15rem;
            font-weight: 800;
            color: ${NAVY};
            margin: 2rem 0 0.5rem;
            padding-bottom: 0.4rem;
            border-bottom: 1px solid #e8ecf4;
          }
          .report-content h3.sub-heading {
            font-size: 1rem;
            font-weight: 700;
            color: ${INK};
            margin: 1.25rem 0 0.4rem;
          }
          .report-content p {
            font-size: 0.98rem;
            color: ${BODY};
            line-height: 1.72;
            margin: 0 0 1rem;
          }
          .report-content img {
            max-width: 100%;
            border-radius: 8px;
            margin: 1rem 0;
          }
          .chart-block { margin: 1.5rem 0; }
          .chart-title {
            font-size: 1rem;
            font-weight: 700;
            color: ${NAVY};
            margin-bottom: 0.5rem;
          }
          .chart-caption {
            font-size: 0.78rem;
            color: #8a95aa;
            margin-top: 0.4rem;
          }

          .paywall-divider {
            margin: 2.5rem 0 0;
            text-align: center;
            position: relative;
          }
          .paywall-divider::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(to right, transparent, #d0d4de, transparent);
          }
          .paywall-label {
            display: inline-block;
            position: relative;
            background: #ffffff;
            padding: 0 1rem;
            color: #8a95aa;
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .frosted-preview {
            margin: 1.5rem 0;
            background: #f3f6fb;
            border: 1px solid #e0e4ef;
            border-radius: 10px;
            padding: 1.5rem 1.6rem;
          }
          .frosted-preview p {
            font-size: 0.9rem;
            color: #8a95aa;
            margin: 0 0 0.5rem;
            line-height: 1.6;
          }
          .frosted-preview p:last-child { margin-bottom: 0; }
          .frosted-bar {
            height: 10px;
            border-radius: 4px;
            background: #dde2ef;
            margin-bottom: 0.6rem;
          }

          .cta-section {
            padding: 2rem 0 3.5rem;
            border-top: 1px solid #e8ecf4;
            margin-top: 2rem;
          }
          .cta-heading {
            font-size: 1.2rem;
            font-weight: 800;
            color: ${NAVY};
            margin: 0 0 0.4rem;
          }
          .cta-sub {
            font-size: 0.9rem;
            color: #6b7a99;
            margin: 0 0 1.5rem;
            line-height: 1.55;
          }
          .cta-buttons { display: flex; flex-direction: column; gap: 0.85rem; }
          .btn-unlock {
            display: block;
            text-align: center;
            background: ${NAVY};
            color: #ffffff;
            font-weight: 700;
            font-size: 1.02rem;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            text-decoration: none;
            transition: opacity 0.15s;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          .btn-unlock:disabled { opacity: 0.6; cursor: not-allowed; }
          .btn-custom {
            display: block;
            text-align: center;
            background: transparent;
            color: ${NAVY};
            font-weight: 600;
            font-size: 0.98rem;
            padding: 0.9rem 1.5rem;
            border-radius: 8px;
            border: 2px solid #c8d0e0;
            text-decoration: none;
            transition: border-color 0.15s;
          }
          .btn-custom:hover { border-color: ${GOLD}; }
          .buy-error {
            color: #c0392b;
            font-size: 0.88rem;
            margin-top: 0.5rem;
          }
          .price-label {
            font-size: 0.8rem;
            font-weight: 400;
            opacity: 0.8;
            margin-left: 0.4rem;
          }

          .archive-cta-section {
            padding: 2rem 0 3.5rem;
            border-top: 1px solid #e8ecf4;
            margin-top: 2rem;
            text-align: center;
          }
          .archive-cta-section h2 {
            font-size: 1.1rem;
            font-weight: 800;
            color: ${NAVY};
            margin: 0 0 0.5rem;
          }
          .archive-cta-section p {
            font-size: 0.88rem;
            color: #6b7a99;
            margin: 0 0 1.25rem;
          }
          .archive-cta-buttons {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            max-width: 400px;
            margin: 0 auto;
          }
          .btn-today {
            display: block;
            text-align: center;
            background: ${NAVY};
            color: #ffffff;
            font-weight: 700;
            font-size: 1rem;
            padding: 0.95rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
          }
          .btn-custom-report {
            display: block;
            text-align: center;
            background: transparent;
            color: ${NAVY};
            font-weight: 600;
            font-size: 0.95rem;
            padding: 0.85rem 1.5rem;
            border-radius: 8px;
            border: 2px solid #c8d0e0;
            text-decoration: none;
          }
          .btn-custom-report:hover { border-color: ${GOLD}; }

          .report-footer {
            background: #0a0e1a;
            color: #a8b2c5;
            text-align: center;
            padding: 2rem 0;
            font-size: 0.88rem;
          }
          .report-footer a { color: ${GOLD}; text-decoration: none; }
        `}</style>
      </Head>

      <div className="report-page">

        <nav>
          <a href="https://news.novonavis.com" className="nav-logo">NOVO NAVIS</a>
          <ul className="nav-links">
            <li><a href="https://news.novonavis.com">Reports</a></li>
            <li><a href="https://www.novonavis.com/faq">FAQ</a></li>
            <li><a href="https://www.novonavis.com/about">About</a></li>
          </ul>
        </nav>

        <div className="report-header">
          <div className="container">
            <div className="report-eyebrow">Novo Navis Intelligence</div>
            <h1 className="report-title">{title || 'Intelligence Report'}</h1>
            <div className="report-meta">
              <span>{date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span>Report ID: {orderId}</span>
              {isArchived && <span className="archived-badge">Archived — Full Report</span>}
            </div>
          </div>
        </div>

        <div className="report-body">
          <div className="container">

            {isArchived && (
              <div className="archived-banner">
                <strong>This is an archived report.</strong> The full analysis is available free.
                By the time it's free, the market has already moved. Don't miss the next one —
                <a href="https://news.novonavis.com" style={{ color: GOLD, marginLeft: '0.3rem' }}>see today's reports →</a>
              </div>
            )}

            {html ? (
              <div className="report-content" dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <p style={{ color: '#8a95aa', fontSize: '0.92rem' }}>Loading report content...</p>
            )}

            {!isArchived && (
              <>
                <div className="paywall-divider">
                  <span className="paywall-label">Full report continues below</span>
                </div>
                <div className="frosted-preview">
                  <div className="frosted-bar" style={{ width: '95%' }} />
                  <div className="frosted-bar" style={{ width: '88%' }} />
                  <div className="frosted-bar" style={{ width: '92%' }} />
                  <div className="frosted-bar" style={{ width: '75%' }} />
                  <p>Causal Analysis, Who Benefits and Why, Key Risks, and What to Watch are available in the full report.</p>
                </div>
                <div className="cta-section">
                  <h2 className="cta-heading">Get the full analysis.</h2>
                  <p className="cta-sub">
                    The full report includes the complete causal analysis with confidence ratings,
                    differentiated beneficiary assessment, key risks, and specific data points to watch.
                    Delivered as a PDF immediately after purchase.
                  </p>
                  <div className="cta-buttons">
                    <button className="btn-unlock" onClick={handleUnlock} disabled={buying}>
                      {buying ? 'Redirecting to checkout...' : <>Unlock Full Report<span className="price-label">— $499</span></>}
                    </button>
                    {buyError && <p className="buy-error">{buyError}</p>}
                    <a href="https://www.novonavis.com/strategic" className="btn-custom">
                      Get a Custom Report Built for Your Situation →
                    </a>
                  </div>
                </div>
              </>
            )}

            {isArchived && (
              <div className="archive-cta-section">
                <h2>Don't miss the next one.</h2>
                <p>This report was published {date}. Current intelligence reports are available now.</p>
                <div className="archive-cta-buttons">
                  <a href="https://news.novonavis.com" className="btn-today">
                    See Today's Intelligence Reports →
                  </a>
                  <a href="https://www.novonavis.com/strategic" className="btn-custom-report">
                    Get a Custom Report Built for Your Situation →
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>

        <footer className="report-footer">
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
            <p style={{ marginTop: '0.75rem', color: '#4a5568', fontSize: '0.78rem', maxWidth: '600px', margin: '0.75rem auto 0' }}>
              This report is published for general informational purposes only and does not
              constitute financial, investment, or legal advice.
            </p>
          </div>
        </footer>

      </div>
    </>
  )
}

// ── SCHEMA CONSTANTS ─────────────────────────────────────────────────────────
const LOGO_URL    = 'https://res.cloudinary.com/dqv9va6ta/image/upload/q_auto/f_auto/v1776042617/logo-3CHVSKdrSORX1atXUpvUTS7tVbt_cz2saz.webp'
const SITE_URL    = 'https://news.novonavis.com'
const ORG_NAME    = 'Novo Navis, LLC'
const ORG_URL     = 'https://www.novonavis.com'
const AUTHOR_NAME = 'Eric Johnston'
const SAME_AS = [
  'https://www.reddit.com/r/AiForSmallBusiness/comments/1snruki/i_built_a_causal_ai_system_for_small_businesses/',
  'https://news.ycombinator.com/item?id=48075222',
]

function buildIntelligenceSchema({ orderId, title, date, dagUrl, requestUrl }) {
  // Convert "May 14, 2026" into ISO 8601 if possible
  let isoDate = null
  if (date) {
    const ts = Date.parse(date)
    if (!isNaN(ts)) isoDate = new Date(ts).toISOString()
  }

  const schema = {
    '@context':       'https://schema.org',
    '@type':          'NewsArticle',
    'additionalType': 'https://schema.org/AnalysisNewsArticle',
    headline:         title || 'Intelligence Report',
    description:     `${title || 'Intelligence Report'}. Causal intelligence analysis from Novo Navis.`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id':   requestUrl,
    },
    image: dagUrl || LOGO_URL,
    author: {
      '@type': 'Person',
      name:    AUTHOR_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name:    ORG_NAME,
      url:     ORG_URL,
      logo: {
        '@type': 'ImageObject',
        url:     LOGO_URL,
      },
      sameAs: SAME_AS,
    },
    identifier: orderId,
  }
  if (isoDate) {
    schema.datePublished = isoDate
    schema.dateModified  = isoDate
  }
  return JSON.stringify(schema)
}

export async function getServerSideProps({ params, req }) {
  const orderId = params.id
  const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })

  let isArchived  = false
  let archivePath = null

  // Check archive index
  try {
    const archiveObj   = await s3.send(new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key:    'intelligence/archive/index.json',
    }))
    const archiveIndex = JSON.parse(await archiveObj.Body.transformToString())
    const archiveEntry = archiveIndex.find(r => r.id === orderId)
    if (archiveEntry) {
      isArchived  = true
      archivePath = archiveEntry.archive_path
    }
  } catch {}

  let html  = ''
  let title = ''
  let date  = ''

  if (isArchived && archivePath) {
    try {
      const obj = await s3.send(new GetObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key:    archivePath,
      }))
      html = await obj.Body.transformToString()
    } catch (err) {
      console.error(`[report page] Archive fetch failed for ${orderId}:`, err.message)
    }
  } else {
    try {
      const obj = await s3.send(new GetObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key:    `intelligence/${orderId}_free.html`,
      }))
      html = await obj.Body.transformToString()
    } catch (err) {
      console.error(`[report page] Free HTML fetch failed for ${orderId}:`, err.message)
      if (err.name === 'NoSuchKey') return { notFound: true }
    }
  }

  if (html) {
    const titleMatch = html.match(/<h1[^>]*class="report-title"[^>]*>(.*?)<\/h1>/i)
    if (titleMatch) title = titleMatch[1].replace(/<[^>]+>/g, '').trim()
  }

  try {
    const datePart = orderId.replace('intel_', '').split('_')[0]
    if (datePart && datePart.length === 6) {
      const dd = datePart.slice(0, 2)
      const mm = datePart.slice(2, 4)
      const yy = datePart.slice(4, 6)
      const d  = new Date(`20${yy}-${mm}-${dd}`)
      date = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    }
  } catch {}

  // Build the DAG image URL — the DAG is generated for most intelligence reports
  // and stored at intelligence/{orderId}_dag.png in S3.
  const bucket   = process.env.S3_BUCKET || ''
  const region   = process.env.AWS_REGION || 'us-east-1'
  const dagUrl   = bucket
    ? `https://${bucket}.s3.${region}.amazonaws.com/intelligence/${orderId}_dag.png`
    : null

  // Build the canonical URL for this request
  const proto      = (req.headers['x-forwarded-proto'] || 'https').split(',')[0].trim()
  const host       = (req.headers['x-forwarded-host'] || req.headers.host || 'news.novonavis.com').split(',')[0].trim()
  const requestUrl = `${proto}://${host}/news/${orderId}`

  const schemaJson = buildIntelligenceSchema({ orderId, title, date, dagUrl, requestUrl })

  return {
    props: { orderId, html, title, date, isArchived, schemaJson }
  }
}
