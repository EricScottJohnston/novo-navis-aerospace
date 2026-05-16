// pages/news/builders/index.js
// Live URL: news.novonavis.com/builders
//
// Renders the most recent Investment Thesis Edition. Reads
// builders/index.json from S3, takes the first (newest) entry, fetches
// builders/{id}_free.html for the preview, applies the same inline
// reveal-name pill-button conversion mechanics as the SMB report pages.
//
// One URL, always current. Previous weeks are not exposed publicly —
// they live in S3 history but the page only shows the latest.

import Head from 'next/head'
import { useState } from 'react'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'
const INK  = '#0c1322'
const BODY = '#2d3748'

// ── SCHEMA CONSTANTS ────────────────────────────────────────────────────────
const LOGO_URL    = 'https://res.cloudinary.com/dqv9va6ta/image/upload/q_auto/f_auto/v1776042617/logo-3CHVSKdrSORX1atXUpvUTS7tVbt_cz2saz.webp'
const ORG_NAME    = 'Novo Navis, LLC'
const ORG_URL     = 'https://www.novonavis.com'
const AUTHOR_NAME = 'Eric Johnston'
const SAME_AS = [
  'https://www.reddit.com/r/AiForSmallBusiness/comments/1snruki/i_built_a_causal_ai_system_for_small_businesses/',
  'https://news.ycombinator.com/item?id=48075222',
]

function buildSchema({ orderId, title, date, requestUrl, week }) {
  let isoDate = null
  if (date) {
    const ts = Date.parse(date)
    if (!isNaN(ts)) isoDate = new Date(ts).toISOString()
  }

  const schema = {
    '@context':       'https://schema.org',
    '@type':          'AnalysisNewsArticle',
    headline:         title || 'Investment Thesis Edition',
    description:     `${title || 'Investment Thesis Edition'}. Cross-vertical gap analysis for AI tool developers and VCs.`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id':   requestUrl,
    },
    image: LOGO_URL,
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
    isAccessibleForFree: false,
    hasPart: {
      '@type':              'WebPageElement',
      isAccessibleForFree:  false,
      cssSelector:          '.decision-point',
    },
  }
  if (isoDate) {
    schema.datePublished = isoDate
    schema.dateModified  = isoDate
  }
  if (week) {
    schema.about = { '@type': 'Thing', name: `Week of ${week}` }
  }
  return JSON.stringify(schema)
}

export default function BuildersPage({ orderId, html, title, date, week, reportCount, verticals, schemaJson, notFound }) {
  const [buying,   setBuying]   = useState(false)
  const [buyError, setBuyError] = useState('')

  const handleUnlock = async () => {
    if (!orderId) return
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

  if (notFound) {
    return (
      <>
        <Head>
          <title>Investment Thesis Edition — Coming Soon | Novo Navis</title>
          <meta name="robots" content="noindex" />
        </Head>
        <div style={{ padding: '4rem 1rem', textAlign: 'center', fontFamily: '-apple-system, sans-serif' }}>
          <h1 style={{ color: NAVY }}>Weekly Edition — Coming Soon</h1>
          <p style={{ color: '#8a95aa', maxWidth: '500px', margin: '1rem auto' }}>
            The first Investment Thesis Edition is being prepared. Check back shortly.
          </p>
          <p style={{ marginTop: '1.5rem' }}>
            <a href="/" style={{ color: GOLD, textDecoration: 'none', fontWeight: 600 }}>← Back to Novo Navis Intelligence</a>
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{title ? `${title} — Novo Navis Intelligence` : 'Investment Thesis Edition — Novo Navis'}</title>
        <meta name="description" content={title ? `${title}. Cross-vertical gap analysis for AI tool developers and VCs.` : 'Cross-vertical gap analysis for AI tool developers and VCs.'} />
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
          .weekly-badge {
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

          /* Disclaimer in the injected HTML — kept short */
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
          .report-content .report-subline {
            font-size: 0.78rem;
            color: #8a95aa;
            margin: 0 0 0.3rem;
            line-height: 1.55;
          }
          .report-content h2.section-heading {
            font-size: 1.15rem;
            font-weight: 800;
            color: ${NAVY};
            margin: 2rem 0 0.5rem;
            padding-bottom: 0.4rem;
            border-bottom: 1px solid #e8ecf4;
          }
          .report-content p {
            font-size: 0.98rem;
            color: ${BODY};
            line-height: 1.72;
            margin: 0 0 1rem;
          }

          /* Gap list — each row has a number + a reveal-pill button */
          .report-content .gap-list {
            list-style: none;
            padding: 0;
            margin: 1rem 0 2rem;
          }
          .report-content .gap-list-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            background: #f8f9fc;
            border: 1px solid #e0e4ef;
            border-radius: 6px;
            margin-bottom: 0.5rem;
          }
          .report-content .gap-number {
            font-size: 0.85rem;
            font-weight: 700;
            color: ${NAVY};
            letter-spacing: 0.04em;
            min-width: 60px;
          }

          /* Sample ROI structure — placeholder format */
          .report-content .roi-sample {
            background: #f8f9fc;
            border: 1px solid #e0e4ef;
            border-radius: 8px;
            padding: 1.25rem 1.5rem;
            margin: 1rem 0 2rem;
          }
          .report-content .roi-sample p {
            font-size: 0.92rem;
            color: ${BODY};
            margin: 0.25rem 0;
          }
          .report-content .roi-sample strong {
            color: ${NAVY};
          }

          /* Thesis gap blocks — full and redacted-skeleton variants */
          .report-content .thesis-gap {
            margin: 2rem 0 2.5rem;
            padding: 1.5rem 1.75rem;
            border-radius: 10px;
          }
          .report-content .thesis-gap-revealed {
            background: #ffffff;
            border: 1px solid #e0e4ef;
            box-shadow: 0 2px 8px rgba(27, 42, 74, 0.04);
          }
          .report-content .thesis-gap-redacted {
            background: #f8f9fc;
            border: 1px dashed #c8d0e0;
          }
          .report-content .gap-header {
            border-bottom: 1px solid #e8ecf4;
            padding-bottom: 0.7rem;
            margin-bottom: 1rem;
          }
          .report-content .gap-tag {
            display: inline-block;
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: ${GOLD};
            margin-bottom: 0.3rem;
          }
          .report-content .gap-tag-redacted {
            color: #8a95aa;
          }
          .report-content .gap-title {
            font-size: 1.2rem;
            font-weight: 800;
            color: ${NAVY};
            margin: 0;
            line-height: 1.3;
          }
          .report-content .gap-subsection {
            font-size: 0.95rem;
            font-weight: 700;
            color: ${NAVY};
            margin: 1.25rem 0 0.5rem;
            text-transform: none;
          }

          /* Redacted skeleton grid — shows structure, hides content */
          .report-content .redacted-grid {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            margin-top: 0.5rem;
          }
          .report-content .redacted-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            padding: 0.6rem 0.9rem;
            background: #ffffff;
            border: 1px solid #e8ecf4;
            border-radius: 6px;
            flex-wrap: wrap;
          }
          .report-content .redacted-label {
            font-size: 0.9rem;
            font-weight: 600;
            color: ${NAVY};
          }

          /* Intro paragraphs */
          .report-content .gaps-intro {
            font-size: 0.95rem;
            color: ${BODY};
            line-height: 1.7;
            margin: 0.5rem 0 1.5rem;
          }

          /* Inline reveal-name pill buttons — identical mechanics to SMB pages */
          .reveal-name-btn {
            display: inline-block;
            padding: 0.12rem 0.55rem;
            margin: 0 0.1rem;
            background: rgba(200, 169, 110, 0.14);
            color: #8a6f3e;
            border: 1px solid rgba(200, 169, 110, 0.55);
            border-radius: 4px;
            font-size: 0.85em;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            line-height: 1.4;
            white-space: nowrap;
            transition: background 0.15s, border-color 0.15s;
            font-family: inherit;
          }
          .reveal-name-btn:hover {
            background: rgba(200, 169, 110, 0.25);
            border-color: ${GOLD};
            color: ${NAVY};
          }
          .reveal-name-btn::after {
            content: ' →';
            opacity: 0.7;
            margin-left: 0.1rem;
          }

          @keyframes unlock-pulse {
            0%   { box-shadow: 0 0 0 0   rgba(200,169,110,0.7); transform: scale(1);    }
            50%  { box-shadow: 0 0 0 18px rgba(200,169,110,0);  transform: scale(1.03); }
            100% { box-shadow: 0 0 0 0   rgba(200,169,110,0);   transform: scale(1);    }
          }
          .reveal-pulse {
            animation: unlock-pulse 0.9s ease-out 2;
          }

          /* Decision-point block injected by the meta-builders script */
          .report-content .decision-point {
            margin-top: 3rem;
            padding: 2rem 1.75rem;
            background: #f8f9fc;
            border: 2px solid ${NAVY};
            border-radius: 10px;
            text-align: center;
          }
          .report-content .decision-point-heading {
            font-size: 1.3rem;
            font-weight: 800;
            color: ${NAVY};
            margin: 0 0 0.5rem;
          }
          .report-content .decision-point-body {
            font-size: 0.95rem;
            color: #6b7a99;
            margin: 0 0 1.5rem;
            line-height: 1.55;
          }
          .report-content .decision-point a.btn-unlock {
            display: inline-block;
            padding: 0.95rem 2rem;
            background: ${NAVY};
            color: #fff;
            font-weight: 700;
            text-decoration: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            border: none;
          }

          /* React-rendered fallback unlock button (only used if injected HTML
             does NOT contain a decision-point — defensive fallback). */
          .fallback-cta-section {
            padding: 2rem 0 3.5rem;
            border-top: 1px solid #e8ecf4;
            margin-top: 2rem;
          }
          .fallback-cta-heading {
            font-size: 1.2rem;
            font-weight: 800;
            color: ${NAVY};
            margin: 0 0 0.4rem;
          }
          .fallback-cta-sub {
            font-size: 0.9rem;
            color: #6b7a99;
            margin: 0 0 1.5rem;
            line-height: 1.55;
          }
          .btn-unlock-react {
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
            font-family: inherit;
            width: 100%;
            max-width: 380px;
            margin: 0 auto;
          }
          .btn-unlock-react:disabled { opacity: 0.6; cursor: not-allowed; }
          .buy-error {
            color: #c0392b;
            font-size: 0.88rem;
            margin-top: 0.5rem;
            text-align: center;
          }
          .price-label {
            font-size: 0.8rem;
            font-weight: 400;
            opacity: 0.8;
            margin-left: 0.4rem;
          }

          .pdf-delivery-line {
            margin-top: 0.6rem;
            color: #8a95aa;
            font-size: 0.85rem;
            font-style: italic;
            text-align: center;
          }

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
            <li><a href="https://news.novonavis.com/smb">SMB</a></li>
            <li><a href="https://news.novonavis.com/builders">Builders</a></li>
            <li><a href="https://www.novonavis.com/about">About</a></li>
          </ul>
        </nav>

        <div className="report-header">
          <div className="container">
            <div className="report-eyebrow">Novo Navis Intelligence — Weekly Edition</div>
            <h1 className="report-title">{title || 'Investment Thesis Edition'}</h1>
            <div className="report-meta">
              <span>{date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span className="weekly-badge">One-Off Edition</span>
              {reportCount > 0 && (
                <>
                  <span>·</span>
                  <span>{reportCount} reports analyzed</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="report-body">
          <div className="container">

            {html ? (
              <div className="report-content" dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <p style={{ color: '#8a95aa', fontSize: '0.92rem' }}>Loading report content...</p>
            )}

            {/* Fallback CTA if injected HTML lacks a decision-point */}
            {html && !html.includes('decision-point') && (
              <div className="fallback-cta-section">
                <h2 className="fallback-cta-heading">Get the full edition.</h2>
                <p className="fallback-cta-sub">
                  The full edition names every gap, capability, market size, ROI projection, and risk
                  with full sourcing and confidence ratings. Delivered as a PDF immediately after purchase.
                </p>
                <button className="btn-unlock-react" onClick={handleUnlock} disabled={buying}>
                  {buying ? 'Redirecting to checkout...' : <>Unlock Investment Thesis Edition<span className="price-label">— $499</span></>}
                </button>
                <p className="pdf-delivery-line">Full report PDF emailed to you immediately after purchase.</p>
                {buyError && <p className="buy-error">{buyError}</p>}
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
              <a href="https://www.novonavis.com/about">About</a>
            </p>
          </div>
        </footer>

      </div>

      {/* Click handlers: reveal-name buttons + embedded unlock anchor */}
      <script
        dangerouslySetInnerHTML={{ __html: `
          (function() {
            document.addEventListener('click', function(e) {
              // Reveal-name button: scroll to decision-point + pulse unlock button
              var revealBtn = e.target.closest && e.target.closest('.reveal-name-btn');
              if (revealBtn) {
                e.preventDefault();
                var target = document.querySelector('.decision-point')
                          || document.querySelector('.btn-unlock')
                          || document.querySelector('.btn-unlock-react')
                          || document.querySelector('.fallback-cta-section');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setTimeout(function() {
                    var pulseTarget = document.querySelector('.btn-unlock')
                                   || document.querySelector('.btn-unlock-react');
                    if (pulseTarget) {
                      pulseTarget.classList.remove('reveal-pulse');
                      void pulseTarget.offsetWidth;
                      pulseTarget.classList.add('reveal-pulse');
                    }
                  }, 600);
                }
                return;
              }

              // Embedded unlock anchor click — route to checkout
              var anchor = e.target.closest && e.target.closest('a');
              if (!anchor) return;
              var href = anchor.getAttribute('href') || '';
              if (href.indexOf('/unlock?order=') !== -1) {
                e.preventDefault();
                var fb = document.querySelector('.btn-unlock-react');
                if (fb) {
                  fb.click();
                } else {
                  fetch('/api/unlock-checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ orderId: '${orderId}' })
                  }).then(function(r) { return r.json(); })
                    .then(function(d) { if (d.url) window.location.href = d.url; });
                }
              }
            });
          })();
        ` }}
      />
    </>
  )
}

export async function getServerSideProps({ req }) {
  const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })

  // ── Fetch builders/index.json and take the latest entry ────────────────────
  let latest = null
  try {
    const indexObj = await s3.send(new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key:    'builders/index.json',
    }))
    const index = JSON.parse(await indexObj.Body.transformToString())
    if (Array.isArray(index) && index.length > 0) {
      latest = index[0]   // newest first per write convention
    }
  } catch (err) {
    console.error('[builders] Failed to fetch builders/index.json:', err.message)
  }

  if (!latest) {
    return {
      props: {
        notFound:     true,
        orderId:      '',
        html:         '',
        title:        '',
        date:         '',
        week:         '',
        reportCount:  0,
        verticals:    [],
        schemaJson:   '',
      },
    }
  }

  const orderId     = latest.id
  const title       = latest.title       || ''
  const date        = latest.date        || ''
  const week        = latest.week        || ''
  const reportCount = latest.report_count || 0
  const verticals   = latest.verticals   || []

  // Fetch the preview HTML for this week's edition
  let html = ''
  try {
    const htmlObj = await s3.send(new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key:    `builders/${orderId}_free.html`,
    }))
    html = await htmlObj.Body.transformToString()
  } catch (err) {
    console.error(`[builders] Free HTML fetch failed for ${orderId}:`, err.message)
  }

  // Strip disclaimer block (same pattern as SMB pages)
  if (html) {
    html = html.replace(
      /<div[^>]*class="disclaimer"[^>]*>[\s\S]*?<\/div>\s*/i,
      ''
    )
    // Inject the PDF-emailed line after the unlock anchor
    const PDF_DELIVERY_LINE = `
  <p style="margin:0.6rem 0 0;color:#8a95aa;font-size:0.85rem;font-style:italic;text-align:center;">
    Full report PDF emailed to you immediately after purchase.
  </p>`
    html = html.replace(
      /(<a[^>]*class="btn-unlock"[^>]*>[^<]*<\/a>)/,
      '$1' + PDF_DELIVERY_LINE
    )

    // Note: the thesis-builders pipeline produces the gap-list reveal pills
    // directly in the preview HTML. No server-side Tool A → button conversion
    // is needed here. The pills already exist in the markup we just fetched.
  }

  // Build schema
  const proto      = (req.headers['x-forwarded-proto'] || 'https').split(',')[0].trim()
  const host       = (req.headers['x-forwarded-host'] || req.headers.host || 'news.novonavis.com').split(',')[0].trim()
  const requestUrl = `${proto}://${host}/builders`
  const schemaJson = buildSchema({ orderId, title, date, requestUrl, week })

  return {
    props: {
      orderId,
      html,
      title,
      date,
      week,
      reportCount,
      verticals,
      schemaJson,
      notFound: false,
    },
  }
}
