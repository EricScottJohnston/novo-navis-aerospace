// pages/news/[id].js
// Dynamic route for individual intelligence report pages.
// Fetches free HTML content from S3 and renders it.
// Two CTAs at bottom: unlock full report ($499) and custom report link.

import Head from 'next/head'
import { useState, useEffect } from 'react'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'
const INK  = '#0c1322'
const BODY = '#2d3748'

export default function ReportPage({ orderId, freeHtml, title, date }) {
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

          /* ── Report header ── */
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
          }
          @media (max-width: 700px) {
            .report-title { font-size: 1.4rem; }
          }

          /* ── Report body ── */
          .report-body {
            padding: 2.5rem 0 1rem;
          }

          /* ── Free content HTML styles ── */
          .free-content .disclaimer {
            background: #f8f9fc;
            border-left: 3px solid #d0d4de;
            border-radius: 6px;
            padding: 1rem 1.1rem;
            margin-bottom: 2rem;
          }
          .free-content .disclaimer p {
            font-size: 0.78rem;
            color: #8a95aa;
            margin: 0 0 0.4rem;
            line-height: 1.55;
          }
          .free-content .disclaimer p:last-child { margin-bottom: 0; }
          .free-content h1.report-title {
            display: none;
          }
          .free-content h2.section-heading {
            font-size: 1.15rem;
            font-weight: 800;
            color: ${NAVY};
            margin: 2rem 0 0.5rem;
            padding-bottom: 0.4rem;
            border-bottom: 1px solid #e8ecf4;
          }
          .free-content h3.sub-heading {
            font-size: 1rem;
            font-weight: 700;
            color: ${INK};
            margin: 1.25rem 0 0.4rem;
          }
          .free-content p {
            font-size: 0.98rem;
            color: ${BODY};
            line-height: 1.72;
            margin: 0 0 1rem;
          }

          /* ── Paywall divider ── */
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

          /* ── Frosted preview ── */
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

          /* ── CTA section ── */
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
          .cta-buttons {
            display: flex;
            flex-direction: column;
            gap: 0.85rem;
          }
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

          /* ── Footer ── */
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

        {/* ── NAV ── */}
        <nav>
          <a href="https://news.novonavis.com" className="nav-logo">NOVO NAVIS</a>
          <ul className="nav-links">
            <li><a href="https://news.novonavis.com">Reports</a></li>
            <li><a href="https://www.novonavis.com/faq">FAQ</a></li>
            <li><a href="https://www.novonavis.com/about">About</a></li>
          </ul>
        </nav>

        {/* ── REPORT HEADER ── */}
        <div className="report-header">
          <div className="container">
            <div className="report-eyebrow">Novo Navis Intelligence</div>
            <h1 className="report-title">{title || 'Intelligence Report'}</h1>
            <div className="report-meta">
              {date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              &nbsp;·&nbsp;Report ID: {orderId}
            </div>
          </div>
        </div>

        {/* ── REPORT BODY ── */}
        <div className="report-body">
          <div className="container">

            {/* Free content */}
            {freeHtml ? (
              <div
                className="free-content"
                dangerouslySetInnerHTML={{ __html: freeHtml }}
              />
            ) : (
              <p style={{ color: '#8a95aa', fontSize: '0.92rem' }}>
                Loading report content...
              </p>
            )}

            {/* Paywall divider */}
            <div className="paywall-divider">
              <span className="paywall-label">Full report continues below</span>
            </div>

            {/* Frosted preview */}
            <div className="frosted-preview">
              <div className="frosted-bar" style={{ width: '95%' }} />
              <div className="frosted-bar" style={{ width: '88%' }} />
              <div className="frosted-bar" style={{ width: '92%' }} />
              <div className="frosted-bar" style={{ width: '75%' }} />
              <p>Causal Analysis, Who Benefits and Why, Key Risks, and What to Watch are available in the full report.</p>
            </div>

            {/* CTA section */}
            <div className="cta-section">
              <h2 className="cta-heading">Get the full analysis.</h2>
              <p className="cta-sub">
                The full report includes the complete causal analysis with confidence ratings,
                differentiated beneficiary assessment, key risks, and specific data points to watch.
                Delivered as a PDF immediately after purchase.
              </p>
              <div className="cta-buttons">
                <button
                  className="btn-unlock"
                  onClick={handleUnlock}
                  disabled={buying}
                >
                  {buying ? 'Redirecting to checkout...' : <>Unlock Full Report<span className="price-label">— $499</span></>}
                </button>
                {buyError && <p className="buy-error">{buyError}</p>}
                <a
                  href="https://www.novonavis.com/strategic"
                  className="btn-custom"
                >
                  Get a Custom Report Built for Your Situation →
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ── FOOTER ── */}
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
              constitute financial, investment, or legal advice. Always seek the advice of a
              qualified professional before making decisions based on this report.
            </p>
          </div>
        </footer>

      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const orderId = params.id

  // Fetch free HTML from S3
  let freeHtml = ''
  let title    = ''
  let date     = ''

  try {
    const { S3Client, GetObjectCommand } = await import('@aws-sdk/client-s3')
    const s3  = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })
    const obj = await s3.send(new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key:    `intelligence/${orderId}_free.html`,
    }))
    freeHtml = await obj.Body.transformToString()

    // Extract title from the first h1 in the free HTML
    const titleMatch = freeHtml.match(/<h1[^>]*class="report-title"[^>]*>(.*?)<\/h1>/i)
    if (titleMatch) title = titleMatch[1].replace(/<[^>]+>/g, '').trim()

    // Format date from order ID — intel_DDMMYY_NNNN
    const datePart = orderId.replace('intel_', '').split('_')[0]
    if (datePart && datePart.length === 6) {
      const dd   = datePart.slice(0, 2)
      const mm   = datePart.slice(2, 4)
      const yy   = datePart.slice(4, 6)
      const d    = new Date(`20${yy}-${mm}-${dd}`)
      date = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    }

  } catch (err) {
    console.error(`[report page] Failed to fetch free HTML for ${orderId}:`, err)
    // Return 404 if report not found
    if (err.name === 'NoSuchKey') {
      return { notFound: true }
    }
  }

  return {
    props: {
      orderId,
      freeHtml,
      title,
      date,
    }
  }
  }
