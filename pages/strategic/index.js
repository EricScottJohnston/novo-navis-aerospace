// pages/strategic/index.js — Novo Navis Strategic sales page
// Hero video (autoplay, muted, looped) → defense pedigree pitch →
// audit trail breakdown → sample report download → CTA to intake.

import Head from 'next/head'
import Link from 'next/link'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'
const INK  = '#0c1322'   // near-black for section titles — high contrast
const BODY = '#2d3748'

const VIDEO_URL  = 'https://res.cloudinary.com/dqv9va6ta/video/upload/v1777770174/Untitled_design_x0d45n.mp4'
const SAMPLE_PDF = '/samples/strategic-preview-novo-navis.pdf'

// Inline style applied directly to h2 elements as a final override —
// guarantees the color wins regardless of any global site CSS.
const FORCE_TITLE = { color: INK, fontWeight: 800 }

export default function StrategicLanding() {
  return (
    <>
      <Head>
        <title>David / Strategic — Defense-grade Strategic Analysis | Novo Navis</title>
        <meta name="description" content="Auditable strategic analysis for boutique consultants. Confidence ratings, inline citations, documented gaps, framework mapping. From a registered U.S. defense contractor." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; }
          body { margin: 0; }

          .strategic-page {
            background: #ffffff;
            color: ${INK};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            line-height: 1.6;
          }

          /* HARD OVERRIDES — beat any global site CSS that targets h2/h3/p */
          .strategic-page h1.hero-title { color: #ffffff !important; }
          .strategic-page h2.section-title {
            color: ${INK} !important;
            font-weight: 800 !important;
            opacity: 1 !important;
            -webkit-text-fill-color: ${INK} !important;
          }
          .strategic-page h2.pricing-headline { color: #ffffff !important; }
          .strategic-page h3.feature-title,
          .strategic-page h3.step-title,
          .strategic-page h3.sample-headline {
            color: ${INK} !important;
            opacity: 1 !important;
          }
          .strategic-page p.section-lead {
            color: ${BODY} !important;
            opacity: 1 !important;
          }
          .strategic-page p.feature-body,
          .strategic-page p.step-body {
            color: ${BODY} !important;
          }

          .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 1.25rem;
          }

          /* ── Hero ─────────────────────────────────── */
          .hero {
            background: ${NAVY};
            color: #ffffff;
            padding: 3.5rem 0 4rem;
            position: relative;
            overflow: hidden;
          }
          .hero-eyebrow {
            color: ${GOLD};
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            margin-bottom: 0.9rem;
          }
          .hero-title {
            font-size: 2.4rem;
            font-weight: 700;
            line-height: 1.18;
            margin: 0 0 1rem;
          }
          .hero-subtitle {
            font-size: 1.08rem;
            color: #d6dde8;
            max-width: 680px;
            margin: 0 0 2rem;
          }
          .hero-cta {
            display: inline-block;
            background: ${GOLD};
            color: #111;
            font-weight: 700;
            font-size: 1.05rem;
            padding: 0.95rem 1.8rem;
            border-radius: 8px;
            text-decoration: none;
            box-shadow: 0 4px 16px rgba(200,169,110,0.35);
          }
          .hero-pedigree {
            display: inline-block;
            margin-left: 1.25rem;
            color: #a8b2c5;
            font-size: 0.9rem;
            vertical-align: middle;
          }
          @media (max-width: 700px) {
            .hero-title { font-size: 1.85rem; }
            .hero-subtitle { font-size: 1rem; }
            .hero-pedigree { display: block; margin: 1rem 0 0; }
          }

          /* ── Video ────────────────────────────────── */
          .video-wrap {
            background: #0a0e1a;
            padding: 2rem 0 2.5rem;
            border-top: 1px solid #2a3550;
            border-bottom: 1px solid #2a3550;
          }
          .video-frame {
            max-width: 960px;
            margin: 0 auto;
            background: #000;
            border: 1px solid #1e2a45;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 6px 30px rgba(0,0,0,0.4);
          }
          .video-frame video { display: block; width: 100%; height: auto; }
          .video-caption {
            text-align: center;
            color: #a8b2c5;
            font-size: 0.9rem;
            margin-top: 0.85rem;
            font-style: italic;
          }

          /* ── Section common ───────────────────────── */
          .section { padding: 3.5rem 0; }
          .section-light { background: #f3f6fb; }
          .section-eyebrow {
            color: #9a7b3f;
            font-size: 0.74rem;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            margin-bottom: 0.7rem;
          }
          .section-title {
            font-size: 1.95rem;
            margin: 0 0 1rem;
            line-height: 1.22;
            letter-spacing: -0.01em;
          }
          .section-lead {
            font-size: 1.06rem;
            max-width: 760px;
            margin: 0 0 2rem;
            line-height: 1.65;
          }

          /* ── Audit trail features ─────────────────── */
          .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.5rem;
            margin-top: 1.5rem;
          }
          .feature {
            background: #ffffff;
            border: 1px solid #d8dee9;
            border-left: 3px solid ${GOLD};
            border-radius: 8px;
            padding: 1.4rem 1.4rem 1.5rem;
            box-shadow: 0 2px 8px rgba(27,42,74,0.05);
          }
          .feature-title { font-size: 1.08rem; font-weight: 700; margin: 0 0 0.55rem; }
          .feature-body { font-size: 0.95rem; margin: 0; line-height: 1.6; }

          /* ── Sample download ──────────────────────── */
          .sample-card {
            background: #ffffff;
            border: 1px solid #d8dee9;
            border-radius: 12px;
            padding: 2rem 2rem 2.2rem;
            display: flex;
            align-items: center;
            gap: 1.75rem;
            box-shadow: 0 4px 20px rgba(27,42,74,0.08);
          }
          .sample-icon {
            flex: 0 0 auto;
            width: 64px; height: 64px;
            border-radius: 12px;
            background: ${NAVY};
            color: ${GOLD};
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.3rem;
            letter-spacing: 0.05em;
          }
          .sample-text { flex: 1; }
          .sample-headline { font-size: 1.18rem; font-weight: 700; margin: 0 0 0.35rem; }
          .sample-sub { color: #5a6478; font-size: 0.94rem; margin: 0; }
          .sample-button {
            flex: 0 0 auto;
            display: inline-block;
            background: ${NAVY};
            color: #ffffff !important;
            font-weight: 600;
            font-size: 0.96rem;
            padding: 0.78rem 1.3rem;
            border-radius: 8px;
            text-decoration: none;
            white-space: nowrap;
          }
          @media (max-width: 700px) {
            .sample-card { flex-direction: column; text-align: center; padding: 1.5rem; gap: 1rem; }
            .sample-text { text-align: center; }
          }

          /* ── How it works ─────────────────────────── */
          .steps {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1.5rem;
            margin-top: 1.85rem;
          }
          .step {
            background: #ffffff;
            border: 1px solid #d8dee9;
            border-radius: 8px;
            padding: 1.6rem 1.4rem 1.6rem;
            position: relative;
            box-shadow: 0 2px 8px rgba(27,42,74,0.05);
          }
          .step-num {
            position: absolute;
            top: -14px; left: 1.4rem;
            background: ${GOLD};
            color: #111;
            width: 32px; height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.95rem;
            box-shadow: 0 2px 6px rgba(200,169,110,0.4);
          }
          .step-title { font-size: 1.05rem; font-weight: 700; margin: 0.5rem 0 0.55rem; }
          .step-body { font-size: 0.94rem; margin: 0; line-height: 1.6; }

          /* ── Pricing strip ────────────────────────── */
          .pricing {
            background: ${NAVY};
            color: #ffffff;
            padding: 3rem 0 3.5rem;
            text-align: center;
          }
          .pricing-eyebrow {
            color: ${GOLD};
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            margin-bottom: 0.7rem;
          }
          .pricing-headline { font-size: 1.7rem; margin: 0 0 0.6rem; }
          .pricing-detail {
            color: #d6dde8;
            font-size: 1.04rem;
            max-width: 640px;
            margin: 0 auto 1.6rem;
          }
          .pricing-cta {
            display: inline-block;
            background: ${GOLD};
            color: #111 !important;
            font-weight: 700;
            font-size: 1.05rem;
            padding: 0.95rem 1.9rem;
            border-radius: 8px;
            text-decoration: none;
            box-shadow: 0 4px 16px rgba(200,169,110,0.4);
          }
          .pricing-fineprint { margin-top: 1.1rem; color: #a8b2c5; font-size: 0.9rem; }

          /* ── Footer ───────────────────────────────── */
          .strategic-footer {
            background: #0a0e1a;
            color: #a8b2c5;
            text-align: center;
            padding: 2rem 0;
            font-size: 0.88rem;
          }
          .strategic-footer a { color: ${GOLD}; text-decoration: none; }
        `}</style>
      </Head>

      <div className="strategic-page">

        {/* ── HERO ─────────────────────────────────── */}
        <section className="hero">
          <div className="container">
            <div className="hero-eyebrow">David / Strategic</div>
            <h1 className="hero-title" style={{ color: '#ffffff' }}>
              Defense-grade strategic analysis<br/>for the consulting industry.
            </h1>
            <p className="hero-subtitle">
              Submit a strategic decision. David builds an auditable analysis with
              confidence ratings, inline citations, documented gaps, and a complete
              audit trail you can defend in front of a client or their board.
            </p>
            <Link href="/strategic/intake" className="hero-cta">
              Submit a Decision — See It Built →
            </Link>
            <span className="hero-pedigree">From a registered U.S. defense contractor.</span>
          </div>
        </section>

        {/* ── VIDEO ────────────────────────────────── */}
        <section className="video-wrap">
          <div className="container">
            <div className="video-frame">
              <video
                src={VIDEO_URL}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
            <p className="video-caption">
              Watch David build a strategic analysis end-to-end.
            </p>
          </div>
        </section>

        {/* ── WHY THIS MATTERS ─────────────────────── */}
        <section className="section">
          <div className="container">
            <div className="section-eyebrow">Why this exists</div>
            <h2 className="section-title" style={FORCE_TITLE}>
              Hallucinated AI in client deliverables is the new career risk.
            </h2>
            <p className="section-lead" style={{ color: BODY }}>
              Hallucinated AI output that ends up in a client deliverable is a career
              risk no boutique can absorb. David is built so the output is defensible
              by construction: every factual claim is cited, every finding carries a
              confidence label, every gap is documented, and the reasoning chain is
              visible — not hidden behind a confident-sounding paragraph.
            </p>
          </div>
        </section>

        {/* ── AUDIT TRAIL FEATURES ─────────────────── */}
        <section className="section section-light">
          <div className="container">
            <div className="section-eyebrow">What you get</div>
            <h2 className="section-title" style={FORCE_TITLE}>
              The audit trail is the product.
            </h2>
            <p className="section-lead" style={{ color: BODY }}>
              Most AI consulting output looks confident. David's looks accountable.
              That difference is what your client's general counsel cares about.
            </p>
            <div className="features">
              <div className="feature">
                <h3 className="feature-title" style={{ color: INK }}>Confidence ratings inline</h3>
                <p className="feature-body" style={{ color: BODY }}>
                  Every substantive finding is labeled CAUSAL, MECHANISM, THRESHOLD,
                  or CORRELATED — and the labels appear in the body, not buried in
                  an appendix. You and your client know exactly what's load-bearing.
                </p>
              </div>
              <div className="feature">
                <h3 className="feature-title" style={{ color: INK }}>Inline citations + bibliography</h3>
                <p className="feature-body" style={{ color: BODY }}>
                  Every external claim carries a numbered marker linking to a real,
                  verifiable source. The bibliography lists every URL, search query,
                  and access date. No phantom citations.
                </p>
              </div>
              <div className="feature">
                <h3 className="feature-title" style={{ color: INK }}>Compliance framework mapping</h3>
                <p className="feature-body" style={{ color: BODY }}>
                  Optional alignment to NIST AI RMF, ISO 42001, EU AI Act, GDPR
                  Article 22, or SOX general controls — David maps each requirement
                  to the section that satisfies it, with confidence ratings and gaps.
                </p>
              </div>
              <div className="feature">
                <h3 className="feature-title" style={{ color: INK }}>Documented gaps</h3>
                <p className="feature-body" style={{ color: BODY }}>
                  Where evidence is missing, David names it explicitly and tells you
                  what would close the gap. Honest uncertainty is more defensible
                  than confident-sounding generalities.
                </p>
              </div>
              <div className="feature">
                <h3 className="feature-title" style={{ color: INK }}>Adversarial verification</h3>
                <p className="feature-body" style={{ color: BODY }}>
                  An adversarial instance challenges every causal claim. SPM-level
                  verification overrides instance ratings where reasoning is weak.
                  Agreements and overrides are logged in the Decision Log.
                </p>
              </div>
              <div className="feature">
                <h3 className="feature-title" style={{ color: INK }}>Decision log appendix</h3>
                <p className="feature-body" style={{ color: BODY }}>
                  Every report ends with a complete audit log: causal filter counts,
                  override counts, extrapolations applied, every open gap. The
                  artifact your compliance officer wants to see.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SAMPLE DOWNLOAD ──────────────────────── */}
        <section className="section">
          <div className="container">
            <div className="section-eyebrow">See it for yourself</div>
            <h2 className="section-title" style={FORCE_TITLE}>
              A sample David report.
            </h2>
            <p className="section-lead" style={{ color: BODY }}>
              The Disney–ESPN spinoff question, run through David. Confidence ratings,
              eight cited sources, full Decision Log. Recommendation and action plan
              redacted — that's what an unlocked report adds — but the analysis quality
              is fully visible.
            </p>
            <div className="sample-card">
              <div className="sample-icon">PDF</div>
              <div className="sample-text">
                <h3 className="sample-headline" style={{ color: INK }}>
                  Disney / ESPN Strategic Analysis — Sample Preview
                </h3>
                <p className="sample-sub">19 pages · 8 cited sources · auditable causal analysis</p>
              </div>
              <a href={SAMPLE_PDF} className="sample-button" target="_blank" rel="noopener noreferrer">
                Download Sample →
              </a>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────── */}
        <section className="section section-light">
          <div className="container">
            <div className="section-eyebrow">How it works</div>
            <h2 className="section-title" style={FORCE_TITLE}>
              Five minutes in. About 18 minutes to a full report.
            </h2>
            <div className="steps">
              <div className="step">
                <div className="step-num">1</div>
                <h3 className="step-title" style={{ color: INK }}>Submit the decision</h3>
                <p className="step-body" style={{ color: BODY }}>
                  Tell David the strategic decision your client faces, the situation,
                  what you already know, and which compliance frameworks apply if any.
                </p>
              </div>
              <div className="step">
                <div className="step-num">2</div>
                <h3 className="step-title" style={{ color: INK }}>Watch David build it</h3>
                <p className="step-body" style={{ color: BODY }}>
                  Real-time research, causal filter, adversarial review, SPM
                  verification, compliance mapping, citation tracking. Every step visible.
                </p>
              </div>
              <div className="step">
                <div className="step-num">3</div>
                <h3 className="step-title" style={{ color: INK }}>Read the preview free</h3>
                <p className="step-body" style={{ color: BODY }}>
                  A redacted preview lands in your inbox. Full analysis, full audit
                  trail, full bibliography. Recommendation and action plan held back.
                </p>
              </div>
              <div className="step">
                <div className="step-num">4</div>
                <h3 className="step-title" style={{ color: INK }}>Unlock if it holds up</h3>
                <p className="step-body" style={{ color: BODY }}>
                  $999 unlocks the full report — recommendation, alternatives,
                  decision framework, sensitivity analysis, action plan, compliance
                  mapping detail. Pay only if you'd put your firm's name on it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRICING / CTA ────────────────────────── */}
        <section className="pricing">
          <div className="container">
            <div className="pricing-eyebrow">Pricing</div>
            <h2 className="pricing-headline" style={{ color: '#ffffff' }}>
              $999 per analysis. Free preview, every time.
            </h2>
            <p className="pricing-detail">
              Submit, read the preview, and only pay if the analysis quality holds up
              to the standard you'd put your name on. No subscription, no commitment,
              no procurement cycle.
            </p>
            <Link href="/strategic/intake" className="pricing-cta">
              Submit a Decision →
            </Link>
            <p className="pricing-fineprint">
              About 5 minutes to submit. About 18 minutes for David to build.
            </p>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────── */}
        <footer className="strategic-footer">
          <div className="container">
            <p>
              © {new Date().getFullYear()} Novo Navis, LLC · Registered U.S. Defense Contractor · Fidelis Diligentia
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              <Link href="/privacy">Privacy Policy</Link> &nbsp;·&nbsp;
              <Link href="/terms">Terms and Conditions</Link> &nbsp;·&nbsp;
              <Link href="/">Home</Link>
            </p>
          </div>
        </footer>

      </div>
    </>
  )
}
