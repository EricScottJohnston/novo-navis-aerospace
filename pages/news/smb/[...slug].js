// pages/smb/[...slug].js
// Dynamic catch-all route for SMB causal tool-selection report pages.
// URL pattern: /smb/{vertical}/{drill}/{capability}
//
// SMB reports are NEVER archived. The page always renders the free preview
// (which contains the decision-point block — $29 unlock + AI Blueprint link
// — written in by david_intelligence_smb.py). Paid PDF is delivered via
// email after Stripe checkout, same as enterprise reports.
//
// Slug → order ID lookup is via smb/index.json. We match the requested
// URL path against the url_path field in each index entry.

import Head from 'next/head'
import { useState } from 'react'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'
const INK  = '#0c1322'
const BODY = '#2d3748'

export default function SMBReportPage({ orderId, html, title, date, urlPath, notFound, schemaJson }) {
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
          <title>Report Not Found — Novo Navis Intelligence</title>
          <meta name="robots" content="noindex" />
        </Head>
        <div style={{ padding: '4rem 1rem', textAlign: 'center', fontFamily: '-apple-system, sans-serif' }}>
          <h1 style={{ color: NAVY }}>Report Not Found</h1>
          <p style={{ color: '#8a95aa' }}>This SMB analysis report doesn't exist or has been removed.</p>
          <p style={{ marginTop: '1.5rem' }}>
            <a href="/smb" style={{ color: GOLD, textDecoration: 'none', fontWeight: 600 }}>Browse SMB Reports →</a>
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{title ? `${title} — Novo Navis Intelligence` : 'AI Tool Analysis — Novo Navis'}</title>
        <meta name="description" content={title ? `${title}. Causal AI tool-selection analysis from Novo Navis.` : 'Causal AI tool-selection analysis from Novo Navis.'} />
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
          @media (max-width: 700px) {
            .report-title { font-size: 1.4rem; }
          }

          .report-body { padding: 2.5rem 0 1rem; }

          /* The free HTML written by david_intelligence_smb.py already contains
             the disclaimer block, report content, DAG image, AND the decision-point
             buttons (unlock $29 + AI Blueprint link). The styles below format
             everything inside that injected HTML. */

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
          .report-content .chart-block { margin: 1.5rem 0; }
          .report-content .chart-title {
            font-size: 1rem;
            font-weight: 700;
            color: ${NAVY};
            margin-bottom: 0.5rem;
          }
          .report-content .chart-caption {
            font-size: 0.78rem;
            color: #8a95aa;
            margin-top: 0.4rem;
          }

          /* The decision-point block (unlock + AI Blueprint) is rendered by
             the injected HTML — but the button click needs to call our
             React handler. We add a click listener after mount via a hidden
             React button overlay, OR we restyle the embedded anchor to look
             like a button. We chose the cleaner path: the HTML produces
             real buttons, and we add a top-level click delegate. */

          .report-content .decision-point a.btn-unlock,
          .report-content .decision-point .btn-unlock {
            display: inline-block;
            padding: 0.95rem 2rem;
            background: ${GOLD};
            color: #0a0e1a;
            font-weight: 700;
            text-decoration: none;
            border-radius: 6px;
            font-size: 1rem;
            cursor: pointer;
            border: none;
          }

          /* Inline reveal-name button — replaces the first mention of each
             redacted tool in the preview. Tapping scrolls the reader to
             the unlock decision point, where they can buy or pick the
             AI Blueprint option. */
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

          /* Pulse animation on the unlock button when reader arrives via
             a reveal-name button click. */
          @keyframes unlock-pulse {
            0%   { box-shadow: 0 0 0 0   rgba(200,169,110,0.7); transform: scale(1);    }
            50%  { box-shadow: 0 0 0 18px rgba(200,169,110,0);  transform: scale(1.03); }
            100% { box-shadow: 0 0 0 0   rgba(200,169,110,0);   transform: scale(1);    }
          }
          .reveal-pulse {
            animation: unlock-pulse 0.9s ease-out 2;
          }

          /* React-rendered unlock fallback button (only used if injected HTML
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
          .fallback-cta-buttons { display: flex; flex-direction: column; gap: 0.85rem; }
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          .btn-unlock-react:disabled { opacity: 0.6; cursor: not-allowed; }
          .btn-blueprint-react {
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
          }
          .btn-blueprint-react:hover { border-color: ${GOLD}; }
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
            <li><a href="https://www.novonavis.com/faq">FAQ</a></li>
            <li><a href="https://www.novonavis.com/about">About</a></li>
          </ul>
        </nav>

        <div className="report-header">
          <div className="container">
            <div className="report-eyebrow">Novo Navis Intelligence</div>
            <h1 className="report-title">{title || 'AI Tool Analysis'}</h1>
            <div className="report-meta">
              <span>{date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span>Report ID: {orderId}</span>
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

            {/* Fallback CTA — only visible if the injected HTML didn't include
                its own decision-point block. Keeps the page functional even
                if david_intelligence_smb.py output is missing the buttons. */}
            {html && !html.includes('decision-point') && (
              <div className="fallback-cta-section">
                <h2 className="fallback-cta-heading">Get the full analysis.</h2>
                <p className="fallback-cta-sub">
                  The full report includes the complete causal map, named tool guidance,
                  conditional recommendations, and risk assessment. Delivered as a PDF
                  immediately after purchase.
                </p>
                <div className="fallback-cta-buttons">
                  <button className="btn-unlock-react" onClick={handleUnlock} disabled={buying}>
                    {buying ? 'Redirecting to checkout...' : <>Unlock Full Report<span className="price-label">— $29</span></>}
                  </button>
                  {buyError && <p className="buy-error">{buyError}</p>}
                  <a href="https://www.novonavis.com/interactive" className="btn-blueprint-react">
                    Or get a full customized AI Blueprint →
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
              constitute financial, legal, or technology procurement advice.
            </p>
          </div>
        </footer>

      </div>

      {/* Wire up the embedded HTML's unlock button (from the decision-point
          block) to our handleUnlock function. The injected HTML can't
          access React state directly, so we intercept clicks on any
          anchor with the unlock URL pattern and route to checkout. */}
      <script
        dangerouslySetInnerHTML={{ __html: `
          (function() {
            document.addEventListener('click', function(e) {
              // ── Reveal-name button click: scroll to decision point + pulse ──
              var revealBtn = e.target.closest && e.target.closest('.reveal-name-btn');
              if (revealBtn) {
                e.preventDefault();
                var decisionPoint = document.querySelector('.decision-point');
                var target = decisionPoint || document.querySelector('.btn-unlock')
                          || document.querySelector('.btn-unlock-react')
                          || document.querySelector('.fallback-cta-section');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  // After scroll, pulse the unlock button to draw the eye
                  setTimeout(function() {
                    var pulseTarget = document.querySelector('.btn-unlock')
                                   || document.querySelector('.btn-unlock-react');
                    if (pulseTarget) {
                      pulseTarget.classList.remove('reveal-pulse');
                      // Force reflow so the animation restarts on repeat clicks
                      void pulseTarget.offsetWidth;
                      pulseTarget.classList.add('reveal-pulse');
                    }
                  }, 600);
                }
                return;
              }

              // ── Embedded unlock anchor click ─────────────────────────────
              var anchor = e.target.closest && e.target.closest('a');
              if (!anchor) return;
              var href = anchor.getAttribute('href') || '';
              if (href.indexOf('/unlock?order=') !== -1) {
                e.preventDefault();
                var unlockBtn = document.querySelector('.btn-unlock-react');
                if (unlockBtn) {
                  unlockBtn.click();
                } else {
                  // No fallback button — call the API directly
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

// ── SCHEMA CONSTANTS ─────────────────────────────────────────────────────────
const LOGO_URL    = 'https://res.cloudinary.com/dqv9va6ta/image/upload/q_auto/f_auto/v1776042617/logo-3CHVSKdrSORX1atXUpvUTS7tVbt_cz2saz.webp'
const ORG_NAME    = 'Novo Navis, LLC'
const ORG_URL     = 'https://www.novonavis.com'
const AUTHOR_NAME = 'Eric Johnston'
const SAME_AS = [
  'https://www.reddit.com/r/AiForSmallBusiness/comments/1snruki/i_built_a_causal_ai_system_for_small_businesses/',
  'https://news.ycombinator.com/item?id=48075222',
]

function buildSMBSchema({ orderId, title, date, dagUrl, requestUrl, vertical, drill, capability }) {
  let isoDate = null
  if (date) {
    const ts = Date.parse(date)
    if (!isNaN(ts)) isoDate = new Date(ts).toISOString()
  }

  // TechArticle signals technical evaluation content. We omit `dependencies`
  // intentionally — naming the real AI tools there would bypass the paywall.
  const schema = {
    '@context':       'https://schema.org',
    '@type':          'TechArticle',
    headline:         title || 'AI Tool Analysis',
    description:     `${title || 'AI Tool Analysis'}. Causal AI tool-selection analysis from Novo Navis.`,
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
    identifier:       orderId,
    proficiencyLevel: 'Expert',
  }
  if (isoDate) {
    schema.datePublished = isoDate
    schema.dateModified  = isoDate
  }
  // `about` describes the subject matter — vertical and slice if we have them
  const aboutParts = [vertical, drill, capability].filter(Boolean)
  if (aboutParts.length) {
    schema.about = {
      '@type': 'Thing',
      name:    aboutParts.join(' — '),
    }
  }
  return JSON.stringify(schema)
}

export async function getServerSideProps({ params, req }) {
  // params.slug is an array — e.g. ['law-firms', 'probate', 'intake-automation']
  const slugParts = params.slug || []
  const requestedPath = '/smb/' + slugParts.join('/')

  const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })

  // ── Fetch smb/index.json and find the entry matching this URL path ────────
  let entry = null
  try {
    const indexObj = await s3.send(new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key:    'smb/index.json',
    }))
    const index = JSON.parse(await indexObj.Body.transformToString())
    entry = index.find(r => r.url_path === requestedPath)

    // Tolerant match — if exact url_path doesn't match, try without trailing slash
    if (!entry) {
      const stripped = requestedPath.replace(/\/+$/, '')
      entry = index.find(r => (r.url_path || '').replace(/\/+$/, '') === stripped)
    }
  } catch (err) {
    console.error('[smb report] Failed to fetch smb/index.json:', err.message)
  }

  if (!entry) {
    return { props: { notFound: true, orderId: '', html: '', title: '', date: '', urlPath: requestedPath, schemaJson: '' } }
  }

  const orderId    = entry.id
  const title      = entry.title || ''
  const date       = entry.date  || ''
  const vertical   = entry.vertical || ''
  const drill      = entry.drill || ''
  const capability = entry.capability || ''

  // ── Fetch the free HTML ────────────────────────────────────────────────────
  let html = ''
  try {
    const htmlObj = await s3.send(new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key:    `smb/${orderId}_free.html`,
    }))
    html = await htmlObj.Body.transformToString()
  } catch (err) {
    console.error(`[smb report] Free HTML fetch failed for ${orderId}:`, err.message)
    if (err.name === 'NoSuchKey') {
      return { props: { notFound: true, orderId, html: '', title, date, urlPath: requestedPath, schemaJson: '' } }
    }
  }

  // ── Inject the redaction explainer after the disclaimer block ─────────────
  // The disclaimer div is the first element in the free HTML. We close it and
  // immediately follow with a gold-bordered explainer box that tells the
  // reader why tool names show as "Tool A, Tool B, etc." in this preview.
  const REDACTION_EXPLAINER = `
<div style="background:#fff8ec;border:2px solid #c8a96e;border-radius:8px;padding:1rem 1.25rem;margin:1.5rem 0 2rem;color:#5a4a1f;font-size:0.92rem;line-height:1.55;">
  <strong style="color:#8a6f3e;display:block;margin-bottom:0.3rem;">A note on this preview</strong>
  Real tool names in this report appear as <em>Tool A</em>, <em>Tool B</em>, and so on. To see the actual product names along with the rest of the analysis, unlock the full report below — the complete PDF is emailed to you immediately after purchase.
</div>`

  if (html.includes('</div>')) {
    // Insert after the disclaimer's closing tag (first </div> in the HTML)
    html = html.replace('</div>', '</div>' + REDACTION_EXPLAINER)
  }

  // ── Inject the PDF-emailed line near the unlock button ────────────────────
  // The decision-point block contains the unlock anchor. We insert a small
  // line above the AI Blueprint secondary option so the reader sees the
  // delivery promise right at the decision point.
  const PDF_DELIVERY_LINE = `
  <p style="margin:0.6rem 0 0;color:#8a95aa;font-size:0.85rem;font-style:italic;">
    Full report PDF emailed to you immediately after purchase.
  </p>`

  // Insert the delivery line right after the unlock anchor closes
  html = html.replace(
    /(<a[^>]*class="btn-unlock"[^>]*>[^<]*<\/a>)/,
    '$1' + PDF_DELIVERY_LINE
  )

  // ── Convert first mention of each redacted tool into a reveal-name button ─
  // The HTML pulled from S3 contains plain text placeholders like "Tool A",
  // "Tool B", etc. We detect those placeholders, and for the FIRST occurrence
  // of each unique placeholder we swap it for an inline button that scrolls
  // the reader to the decision point. Subsequent occurrences stay as plain
  // text — the reader already has the option, no need to button-spam them.
  //
  // The placeholders are letters A-Z. We match "Tool X" where X is a single
  // uppercase letter, optionally followed by a word boundary.
  const seenLetters = new Set()
  html = html.replace(/Tool ([A-Z])\b/g, (match, letter) => {
    if (seenLetters.has(letter)) {
      // Subsequent mentions stay as plain text
      return match
    }
    seenLetters.add(letter)
    // First mention becomes a button
    return `<button type="button" class="reveal-name-btn" data-tool="${letter}">Tool ${letter}: reveal name</button>`
  })

  // ── Build schema ──────────────────────────────────────────────────────────
  const bucket   = process.env.S3_BUCKET || ''
  const region   = process.env.AWS_REGION || 'us-east-1'
  const dagUrl   = bucket
    ? `https://${bucket}.s3.${region}.amazonaws.com/smb/${orderId}_dag.png`
    : null

  const proto      = (req.headers['x-forwarded-proto'] || 'https').split(',')[0].trim()
  const host       = (req.headers['x-forwarded-host'] || req.headers.host || 'news.novonavis.com').split(',')[0].trim()
  const requestUrl = `${proto}://${host}${requestedPath}`

  const schemaJson = buildSMBSchema({
    orderId, title, date, dagUrl, requestUrl, vertical, drill, capability,
  })

  return {
    props: {
      orderId,
      html,
      title,
      date,
      urlPath: requestedPath,
      notFound: false,
      schemaJson,
    }
  }
}
