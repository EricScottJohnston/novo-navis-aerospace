import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

const REASONING = [
  { type: 'boot', text: 'Initializing David Core...' },
  { type: 'boot', text: 'David Core loaded.' },
  { type: 'status', label: 'Instance differentiation', ver: 'v1.1' },
  { type: 'status', label: 'Web search', ver: 'v1.01' },
  { type: 'status', label: 'Extrapolation Engine', ver: 'v1.2' },
  { type: 'status', label: 'Causal Reasoning Framework', ver: 'v1.3' },
  { type: 'status', label: 'Persistent Log Files', ver: 'v1.3.1' },
  { type: 'status', label: 'Clarification Dialogue System', ver: 'v1.4.0' },
  { type: 'status', label: 'Outlier and Edge Case Engine', ver: 'v1.5.0' },
  { type: 'status', label: 'Explicit Data Recognition', ver: 'v1.6.0' },
  { type: 'status', label: 'Domain Expertise Query', ver: 'v1.7.0' },
  { type: 'status', label: 'Threshold Classification', ver: 'v1.8.0' },
  { type: 'status', label: 'SPM-Level Verification', ver: 'v1.8.0' },
  { type: 'status', label: 'Budget-Aware Tool Recommendations', ver: 'v2.5' },
  { type: 'divider' },
  { type: 'step', n: 1, text: 'Parsing intent and evaluating ambiguity...' },
  { type: 'detail', text: 'Domain: Healthcare operations, dental practice management, AI automation' },
  { type: 'detail', text: 'Output needed: AI integration roadmap with tool recommendations, implementation priorities, budget alignment, and expected ROI' },
  { type: 'confidence', val: 92, label: 'Intent confidence' },
  { type: 'tag', color: 'green', text: 'PROCEED' },
  { type: 'divider' },
  { type: 'step', n: 2, text: 'Recognizing real-time data needs...' },
  { type: 'search', query: 'AI scheduling software for dental practices 2024' },
  { type: 'search', query: 'dental appointment no-show reduction AI tools' },
  { type: 'search', query: 'automated patient communication dental offices' },
  { type: 'search', query: 'AI insurance claims processing dental' },
  { type: 'search', query: 'dental practice management software comparison' },
  { type: 'detail', text: 'Total web search items in memory: 5' },
  { type: 'divider' },
  { type: 'step', n: '2b', text: 'Querying domain expertise...' },
  { type: 'detail', text: 'Domain expertise loaded. Tools: 7 | Steps: 8' },
  { type: 'divider' },
  { type: 'step', n: 3, text: 'Building knowledge (Education Instances 1 & 2)...' },
  { type: 'instance', n: 1, role: 'Foundational', text: 'What is your current appointment no-show rate and what financial impact does it have on your practice?' },
  { type: 'instance', n: 2, role: 'Contextual', text: 'How many staff members currently handle insurance claims processing manually, and what percentage of claims are rejected?' },
  { type: 'instance', n: 1, role: 'Foundational', text: 'Which specific patient communication channels does your practice currently use, and where do you experience the highest engagement gaps?' },
  { type: 'confidence', val: 65, label: 'Knowledge confidence (round 1)' },
  { type: 'detail', text: 'Knowledge gaps remain. Continuing...' },
  { type: 'instance', n: 1, role: 'Foundational', text: 'What is your current technology stack maturity — do you have a centralized PMS integrated with scheduling and billing, or disconnected legacy systems?' },
  { type: 'instance', n: 2, role: 'Contextual', text: 'Beyond no-shows and claims processing, what is your biggest operational bottleneck in terms of staff time and cost?' },
  { type: 'instance', n: 1, role: 'Foundational', text: 'How do your patients prefer to receive appointment reminders, and do you have data on which channels have the highest confirmation rates?' },
  { type: 'confidence', val: 92, label: 'Knowledge confidence (round 2)' },
  { type: 'tag', color: 'green', text: 'Knowledge sufficient at 92%' },
  { type: 'divider' },
  { type: 'step', n: '3b', text: 'Checking for critical data gaps...' },
  { type: 'search', query: 'dental practice AI ROI case studies 2024 - cost savings and revenue recovery metrics' },
  { type: 'search', query: 'dental scheduling AI integration with existing practice management systems' },
  { type: 'search', query: 'dental patient communication AI — SMS vs email engagement rates comparison' },
  { type: 'detail', text: 'Total web search items in memory: 8' },
  { type: 'divider' },
  { type: 'step', n: 4, text: 'Domain and adversarial analysis (Instances 3 & 4)...' },
  { type: 'instance', n: 3, role: 'Domain Analysis', text: 'Running...' },
  { type: 'tag', color: 'blue', text: '[Instance 3] Complete' },
  { type: 'instance', n: 4, role: 'Adversarial Analysis', text: 'Running...' },
  { type: 'tag', color: 'blue', text: '[Instance 4] Complete' },
  { type: 'divider' },
  { type: 'step', n: 5, text: 'Extrapolation Engine (Instance 6)...' },
  { type: 'detail', text: 'Phase A: Generating causal chains... 5 candidates.' },
  { type: 'ex', id: 'EX_001', causal: 'MECHANISM', evidence: 'PLAUSIBLE' },
  { type: 'ex', id: 'EX_002', causal: 'MECHANISM', evidence: 'PLAUSIBLE' },
  { type: 'ex', id: 'EX_003', causal: 'MECHANISM', evidence: 'PLAUSIBLE' },
  { type: 'ex', id: 'EX_004', causal: 'MECHANISM', evidence: 'PLAUSIBLE' },
  { type: 'ex', id: 'EX_005', causal: 'MECHANISM', evidence: 'CONFIRMED' },
  { type: 'detail', text: 'Extrapolation complete. CAUSAL: 0 | MECHANISM: 5 | THRESHOLD: 0 | CORRELATED: 0 | NOISE: 0' },
  { type: 'divider' },
  { type: 'step', n: 6, text: 'Outlier and Edge Case Engine (Instance 7)...' },
  { type: 'out', id: 'OUT_001', result: 'CAUSAL' },
  { type: 'out', id: 'OUT_002', result: 'CAUSAL' },
  { type: 'out', id: 'OUT_003', result: 'MECHANISM' },
  { type: 'out', id: 'OUT_004', result: 'MECHANISM' },
  { type: 'out', id: 'OUT_005', result: 'CAUSAL' },
  { type: 'out', id: 'OUT_006', result: 'CORRELATED' },
  { type: 'out', id: 'OUT_007', result: 'MECHANISM' },
  { type: 'out', id: 'OUT_008', result: 'CORRELATED' },
  { type: 'detail', text: 'Outliers — CAUSAL: 3 | MECHANISM: 3 | Discarded: 2 | Edge cases — MECHANISM: 6 | Discarded: 0' },
  { type: 'divider' },
  { type: 'step', n: 7, text: 'Applying Causal Reasoning Framework filter...' },
  { type: 'detail', text: 'CAUSAL: 3 | MECHANISM: 19 | THRESHOLD: 1 | CORRELATED: 3 | NOISE: 1' },
  { type: 'divider' },
  { type: 'step', n: '7b', text: 'SPM-Level Independent Verification...' },
  { type: 'spm', finding: 'SMS-Based Appointment Reminders Reduce No-Shows', from: 'MECHANISM', to: 'MECHANISM', verdict: 'AGREED' },
  { type: 'spm', finding: 'AI Imaging Diagnostics Drive Incremental Revenue', from: 'MECHANISM', to: 'MECHANISM', verdict: 'AGREED' },
  { type: 'spm', finding: 'Cloud-Based Practice Management Integration Is Standard', from: 'MECHANISM', to: 'MECHANISM', verdict: 'AGREED' },
  { type: 'spm', finding: 'AI Claims Processing Adoption Remains Fragmented', from: 'MECHANISM', to: 'CORRELATED', verdict: 'OVERRIDDEN' },
  { type: 'spm', finding: 'Patient Communication Channel Preference Is SMS-Dominant', from: 'MECHANISM', to: 'CORRELATED', verdict: 'OVERRIDDEN' },
  { type: 'spm', finding: 'Integration Complexity Is Underspecified', from: 'THRESHOLD', to: 'MECHANISM', verdict: 'OVERRIDDEN' },
  { type: 'detail', text: 'SPM Verification: Agreements: 3 | Overrides: 3 | Threshold routes: 0' },
  { type: 'divider' },
  { type: 'step', n: 8, text: 'Synthesizing final output (Assembly Instance 5)...' },
  { type: 'tag', color: 'blue', text: '[Instance 5] Complete' },
  { type: 'divider' },
  { type: 'log', label: 'Intent confidence', val: '92%' },
  { type: 'log', label: 'Web search items', val: '8' },
  { type: 'log', label: 'Causal filter', val: 'CAUSAL: 3 | MECHANISM: 19 | THRESHOLD: 1 | CORRELATED: 3 | NOISE: 1' },
  { type: 'log', label: 'SPM verification', val: 'Agreements: 3 | Overrides: 3' },
  { type: 'log', label: 'Overall confidence', val: '72%' },
  { type: 'divider' },
  { type: 'boot', text: 'Report saved to cortex_reports/' },
  { type: 'boot', text: 'Ready for delivery after human review.' },
]

function ReasoningLine({ item }) {
  if (item.type === 'divider') return <div style={{ borderTop: '1px solid #1a2a1a', margin: '0.6rem 0' }} />

  if (item.type === 'boot') return (
    <p style={{ color: '#6b9e6b', fontSize: '0.78rem', marginBottom: '0.2rem' }}>{item.text}</p>
  )

  if (item.type === 'status') return (
    <p style={{ fontSize: '0.76rem', marginBottom: '0.15rem', color: '#4a7a4a' }}>
      <span style={{ color: '#7aba7a' }}>{item.label}:</span>{' '}
      <span style={{ color: '#3d993d' }}>ACTIVE</span>{' '}
      <span style={{ color: '#2d6b2d' }}>({item.ver})</span>
    </p>
  )

  if (item.type === 'step') return (
    <p style={{ color: '#a8d4a8', fontSize: '0.8rem', marginBottom: '0.3rem', marginTop: '0.2rem' }}>
      <span style={{ color: '#c8a96e' }}>Step {item.n}:</span> {item.text}
    </p>
  )

  if (item.type === 'detail') return (
    <p style={{ color: '#5a8a5a', fontSize: '0.74rem', marginBottom: '0.2rem', paddingLeft: '1rem' }}>→ {item.text}</p>
  )

  if (item.type === 'confidence') {
    const color = item.val >= 90 ? '#4caf50' : item.val >= 70 ? '#c8a96e' : '#e57373'
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '1rem', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '0.74rem', color: '#5a8a5a' }}>{item.label}:</span>
        <span style={{ fontSize: '0.8rem', color, fontWeight: 'bold' }}>{item.val}%</span>
        <div style={{ flex: 1, height: '4px', background: '#1a2a1a', borderRadius: '2px', maxWidth: '80px' }}>
          <div style={{ width: `${item.val}%`, height: '100%', background: color, borderRadius: '2px', transition: 'width 0.5s' }} />
        </div>
      </div>
    )
  }

  if (item.type === 'tag') {
    const colors = { green: '#4caf50', blue: '#5b9bd5', yellow: '#c8a96e' }
    return (
      <div style={{ paddingLeft: '1rem', marginBottom: '0.2rem' }}>
        <span style={{ fontSize: '0.72rem', color: colors[item.color] || '#5b9bd5', border: `1px solid ${colors[item.color] || '#5b9bd5'}`, padding: '1px 6px', borderRadius: '3px' }}>
          {item.text}
        </span>
      </div>
    )
  }

  if (item.type === 'search') return (
    <p style={{ fontSize: '0.72rem', marginBottom: '0.15rem', paddingLeft: '1rem', color: '#3d7a8a' }}>
      <span style={{ color: '#5b9bd5' }}>[Web Search]</span> {item.query}
      <span style={{ color: '#2d5a2d', marginLeft: '0.4rem' }}>✓ stored</span>
    </p>
  )

  if (item.type === 'instance') return (
    <div style={{ paddingLeft: '1rem', marginBottom: '0.2rem' }}>
      <p style={{ fontSize: '0.72rem', color: '#5a7a5a' }}>
        <span style={{ color: '#8ab8d4' }}>[Instance {item.n} — {item.role}]</span>
        {' '}<span style={{ color: '#5a8a5a' }}>{item.text}</span>
      </p>
    </div>
  )

  if (item.type === 'ex') {
    const evidColor = item.evidence === 'CONFIRMED' ? '#4caf50' : '#8ab8d4'
    return (
      <p style={{ fontSize: '0.72rem', paddingLeft: '1rem', marginBottom: '0.15rem', color: '#4a6a4a' }}>
        <span style={{ color: '#5a8a7a' }}>[Instance 6]</span> {item.id} —{' '}
        Causal: <span style={{ color: '#8ab8d4' }}>{item.causal}</span> | Evidence:{' '}
        <span style={{ color: evidColor }}>{item.evidence}</span>
      </p>
    )
  }

  if (item.type === 'out') {
    const colors = { CAUSAL: '#4caf50', MECHANISM: '#8ab8d4', CORRELATED: '#c8a96e', NOISE: '#e57373' }
    return (
      <p style={{ fontSize: '0.72rem', paddingLeft: '1rem', marginBottom: '0.12rem', color: '#4a6a4a' }}>
        <span style={{ color: '#5a8a7a' }}>[Instance 7]</span> {item.id} —{' '}
        <span style={{ color: colors[item.result] || '#8ab8d4' }}>{item.result}</span>
      </p>
    )
  }

  if (item.type === 'spm') {
    const verdictColor = item.verdict === 'AGREED' ? '#4caf50' : '#c8a96e'
    const toColor = item.to === 'CORRELATED' ? '#c8a96e' : '#8ab8d4'
    return (
      <div style={{ paddingLeft: '1rem', marginBottom: '0.2rem' }}>
        <p style={{ fontSize: '0.71rem', color: '#4a6a5a' }}>
          <span style={{ color: '#8ab8d4' }}>[{item.finding}]</span>
        </p>
        <p style={{ fontSize: '0.71rem', paddingLeft: '0.6rem', color: '#3a5a3a' }}>
          {item.from} → SPM: <span style={{ color: toColor }}>{item.to}</span>{' '}
          <span style={{ color: verdictColor }}>({item.verdict})</span>
        </p>
      </div>
    )
  }

  if (item.type === 'log') return (
    <p style={{ fontSize: '0.74rem', marginBottom: '0.2rem', color: '#5a8a6a' }}>
      <span style={{ color: '#8ab8a8' }}>{item.label}:</span>{' '}
      <span style={{ color: '#a8d4b8' }}>{item.val}</span>
    </p>
  )

  return null
}

export default function DavidDemo() {
  const [activeTab, setActiveTab] = useState('both') // 'both' | 'reasoning' | 'report'

  return (
    <>
      <Head>
        <title>How David Thinks — Novo Navis AI Research Engine</title>
        <meta name="description" content="See David's full reasoning process side-by-side with the final report it produces. Every causal filter, web search, and SPM verification shown in real time." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          .david-page {
            min-height: 100vh;
            background: #060a12;
          }

          .david-hero {
            background: linear-gradient(180deg, #0d1221 0%, #060a12 100%);
            border-bottom: 1px solid #1e2a45;
            padding: 3rem 2rem 2.5rem;
            text-align: center;
          }

          .david-eyebrow {
            font-size: 0.72rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #c8a96e;
            margin-bottom: 0.8rem;
          }

          .david-hero h1 {
            font-size: clamp(1.6rem, 4vw, 2.4rem);
            color: #ffffff;
            font-weight: bold;
            margin-bottom: 0.8rem;
            line-height: 1.25;
          }

          .david-hero p {
            color: #8a95aa;
            font-size: 1rem;
            max-width: 600px;
            margin: 0 auto 1.5rem;
          }

          .david-tabs {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 1.2rem;
          }

          .david-tab {
            padding: 0.4rem 1rem;
            font-size: 0.8rem;
            border-radius: 4px;
            border: 1px solid #1e2a45;
            background: transparent;
            color: #8a95aa;
            cursor: pointer;
            font-family: Georgia, serif;
            transition: all 0.2s;
          }

          .david-tab.active {
            background: #1e2a45;
            color: #c8a96e;
            border-color: #c8a96e;
          }

          .david-split {
            display: grid;
            height: calc(100vh - 230px);
            min-height: 600px;
          }

          .david-split.both { grid-template-columns: 1fr 1fr; }
          .david-split.reasoning { grid-template-columns: 1fr; }
          .david-split.report { grid-template-columns: 1fr; }

          .david-pane {
            overflow-y: auto;
            border-right: 1px solid #1e2a45;
          }

          .david-pane:last-child { border-right: none; }

          .pane-header {
            position: sticky;
            top: 0;
            z-index: 10;
            padding: 0.7rem 1.2rem;
            display: flex;
            align-items: center;
            gap: 0.6rem;
            border-bottom: 1px solid;
          }

          .pane-header.reasoning-header {
            background: #060e06;
            border-color: #1a2a1a;
          }

          .pane-header.report-header {
            background: #0d1221;
            border-color: #1e2a45;
          }

          .pane-title {
            font-size: 0.72rem;
            letter-spacing: 0.15em;
            text-transform: uppercase;
          }

          .reasoning-body {
            padding: 1rem 1.2rem;
            background: #060e06;
            font-family: 'Courier New', 'Monaco', monospace;
            min-height: 100%;
          }

          .report-body {
            padding: 1.5rem 2rem;
            background: #060a12;
          }

          .report-h1 {
            font-size: 1.25rem;
            color: #ffffff;
            font-weight: bold;
            margin-bottom: 0.3rem;
            line-height: 1.3;
          }

          .report-byline {
            font-size: 0.78rem;
            color: #5a6a7a;
            margin-bottom: 1.8rem;
          }

          .report-section {
            margin-bottom: 1.8rem;
          }

          .report-section h2 {
            font-size: 0.72rem;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #c8a96e;
            margin-bottom: 0.7rem;
            padding-bottom: 0.4rem;
            border-bottom: 1px solid #1e2a45;
          }

          .report-section p {
            font-size: 0.9rem;
            color: #b0b8cc;
            margin-bottom: 0.8rem;
            line-height: 1.75;
          }

          .report-section ul {
            margin: 0.5rem 0 0.8rem 1.2rem;
          }

          .report-section li {
            font-size: 0.88rem;
            color: #b0b8cc;
            margin-bottom: 0.4rem;
            line-height: 1.6;
          }

          .report-callout {
            background: #0d1221;
            border: 1px solid #1e2a45;
            border-left: 3px solid #c8a96e;
            padding: 1rem 1.2rem;
            border-radius: 4px;
            margin: 1rem 0;
          }

          .report-callout p {
            margin: 0;
            font-size: 0.88rem;
            color: #b0b8cc;
          }

          .report-metric-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.8rem;
            margin: 1rem 0;
          }

          .report-metric {
            background: #0d1221;
            border: 1px solid #1e2a45;
            padding: 0.9rem;
            border-radius: 4px;
            text-align: center;
          }

          .report-metric .val {
            font-size: 1.3rem;
            font-weight: bold;
            color: #c8a96e;
            display: block;
          }

          .report-metric .lbl {
            font-size: 0.7rem;
            color: #5a6a7a;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .report-phase {
            background: #0a0f1a;
            border: 1px solid #1e2a45;
            border-radius: 4px;
            padding: 1rem 1.2rem;
            margin-bottom: 0.8rem;
          }

          .report-phase-title {
            font-size: 0.8rem;
            color: #c8a96e;
            font-weight: bold;
            margin-bottom: 0.4rem;
            letter-spacing: 0.05em;
          }

          .report-phase p {
            font-size: 0.85rem;
            color: #8a95aa;
            margin: 0;
            line-height: 1.6;
          }

          .cta-strip {
            background: linear-gradient(90deg, #0d1221 0%, #111a2e 100%);
            border-top: 1px solid #1e2a45;
            padding: 2rem;
            text-align: center;
          }

          .cta-strip h3 {
            color: #ffffff;
            font-size: 1.15rem;
            margin-bottom: 0.5rem;
          }

          .cta-strip p {
            color: #8a95aa;
            font-size: 0.9rem;
            margin-bottom: 1.2rem;
          }

          .cta-btn {
            display: inline-block;
            background: #c8a96e;
            color: #0a0e1a;
            font-size: 0.9rem;
            font-weight: bold;
            padding: 0.75rem 2rem;
            border-radius: 4px;
            text-decoration: none;
            letter-spacing: 0.05em;
            transition: background 0.2s;
          }

          .cta-btn:hover {
            background: #e8c98e;
            color: #0a0e1a;
          }

          @media (max-width: 768px) {
            .david-split.both {
              grid-template-columns: 1fr;
              grid-template-rows: auto auto;
              height: auto;
            }
            .david-pane {
              height: 60vh;
              border-right: none;
              border-bottom: 1px solid #1e2a45;
            }
            .report-metric-row {
              grid-template-columns: repeat(2, 1fr);
            }
            .david-tabs { flex-wrap: wrap; }
          }
        `}</style>
      </Head>

      <nav>
        <Link href="/" className="nav-logo">NOVO NAVIS</Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/sample">Sample Report</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div className="david-page">

        {/* Hero */}
        <div className="david-hero">
          <p className="david-eyebrow">David v2.5 — Small Psychological Model</p>
          <h1>See How David Thinks Before It Writes</h1>
          <p>
            Every report begins with first-principles knowledge building against domain-specific expertise — David interrogates your problem from the ground up before it touches a single recommendation.
            Then every finding is run through a causal reasoning filter and independent SPM verification.
            This is what that looks like in real time — reasoning on the left, final output on the right.
          </p>
          <div className="david-tabs">
            {[['both', 'Side by Side'], ['reasoning', 'Reasoning Only'], ['report', 'Report Only']].map(([val, label]) => (
              <button
                key={val}
                className={`david-tab ${activeTab === val ? 'active' : ''}`}
                onClick={() => setActiveTab(val)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Split panes */}
        <div className={`david-split ${activeTab}`}>

          {/* LEFT — Reasoning */}
          {(activeTab === 'both' || activeTab === 'reasoning') && (
            <div className="david-pane">
              <div className="pane-header reasoning-header">
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4caf50', display: 'inline-block', animation: 'none' }} />
                <span className="pane-title" style={{ color: '#4caf50' }}>David Reasoning Engine — Live Process Log</span>
              </div>
              <div className="reasoning-body">
                <p style={{ color: '#3d6b3d', fontSize: '0.72rem', marginBottom: '0.8rem' }}>
                  DAVID v2.5 — Novo Navis Aerospace Operations LLC — Fidelis Diligentia
                </p>
                {REASONING.map((item, i) => (
                  <ReasoningLine key={i} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* RIGHT — Report */}
          {(activeTab === 'both' || activeTab === 'report') && (
            <div className="david-pane">
              <div className="pane-header report-header">
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c8a96e', display: 'inline-block' }} />
                <span className="pane-title" style={{ color: '#c8a96e' }}>David Cortex Report — Delivered Output</span>
              </div>
              <div className="report-body">

                <h1 className="report-h1">AI Integration Roadmap for Dental Practice Optimization</h1>
                <p className="report-byline">Novo Navis Cortex Report · April 2026 · Client: Jacquelyn Hurt, Wichita KS</p>

                <div className="report-metric-row">
                  <div className="report-metric">
                    <span className="val">15–25%</span>
                    <span className="lbl">No-Show Reduction</span>
                  </div>
                  <div className="report-metric">
                    <span className="val">8–12 hrs</span>
                    <span className="lbl">Admin Time Recovered / Week</span>
                  </div>
                  <div className="report-metric">
                    <span className="val">$28K–$55K</span>
                    <span className="lbl">Est. Net Annual Value</span>
                  </div>
                </div>

                <div className="report-section">
                  <h2>Executive Summary</h2>
                  <p>
                    This report identifies a focused, three-phase AI integration strategy designed to reduce appointment no-shows by 15–25%, recover 8–12 hours of administrative time per week, and generate an estimated $28,000 to $55,000 in net annual value after accounting for implementation costs.
                  </p>
                  <p>
                    The opportunity centers on three validated interventions: SMS-based appointment reminders (which engage 98% of patients within three minutes versus 20% for email), cloud-based practice management system migration (which creates the technical foundation for all downstream AI tools), and AI-assisted scheduling optimization (which typically reduces manual scheduling overhead by 40–60%).
                  </p>
                  <div className="report-callout">
                    <p><strong style={{ color: '#c8a96e' }}>Caution flag:</strong> Implementation will occur across 90 days in three distinct phases. Total estimated investment is $8,600–$18,000 for the first year. If your budget differs materially from $200–$500/month, notify the project team before proceeding.</p>
                  </div>
                </div>

                <div className="report-section">
                  <h2>The Opportunity</h2>
                  <p>
                    Dental practices of all sizes face three interconnected financial problems that AI can directly address: appointment no-shows, manual administrative overhead, and preventable insurance claim rejections.
                  </p>
                  <p>
                    Industry data confirms that 15–20% of scheduled appointments result in no-shows. For a typical multi-chair practice with 60–80 weekly appointments, annual no-show losses range from $125,000 to $166,000 for a mid-size practice, or approximately $25,000–$40,000 for a smaller single-doctor practice.
                  </p>
                  <p>
                    The causal mechanism underlying no-show reduction through SMS reminders is now empirically validated. SMS messages are read by 98% of recipients within three minutes versus email open rates of 20–25%. A reminder delivered four hours before an appointment creates a "decision friction point" — the patient must consciously acknowledge or dismiss the commitment. <em style={{ color: '#8a95aa' }}>This is mechanism-level evidence, not causal — no RCT-level dental-specific data exists in this knowledge base.</em>
                  </p>
                </div>

                <div className="report-section">
                  <h2>The AI Tools That Solve This</h2>
                  <p>Four specific AI and automation tools address the opportunity areas. All recommendations are concrete, named products with published pricing, and all are selected to fit within a $200–$500 monthly software budget.</p>

                  <div className="report-phase">
                    <div className="report-phase-title">SMS Reminder Automation — Reminder Media / Weave / Native PMS Module</div>
                    <p>Reminder Media sends appointment reminders via SMS at 48h, 24h, and 4h intervals with one-tap rescheduling links. Pricing: $400–$800/month. If your cloud PMS includes native SMS (CareStack does), this cost is $0.</p>
                  </div>

                  <div className="report-phase">
                    <div className="report-phase-title">Cloud Practice Management System — Open Dental / CareStack / Curve Dental</div>
                    <p>Cloud PMS is the prerequisite enabling all downstream AI integrations. Cloud systems provide API endpoints that allow third-party scheduling, communication, and diagnostic tools to integrate seamlessly. One-time migration: $8,000–$18,000. Monthly: $300–$700.</p>
                  </div>

                  <div className="report-phase">
                    <div className="report-phase-title">AI Scheduling Optimization — SimplePractice / CareStack Integrated</div>
                    <p>Reduces manual scheduling overhead by 40–60%. Identifies high-risk appointment slots and triggers enhanced reminder sequences. Expected combined no-show reduction (with SMS): 15–35%. Not zero.</p>
                  </div>

                  <div className="report-phase">
                    <div className="report-phase-title">Insurance Claims Automation — DEFERRED</div>
                    <p>No quantified ROI data exists yet for dental-specific claims automation. This report defers detailed claims recommendations pending evidence maturation. Revisit in Phase 4 at the 12-month mark if your rejection rate exceeds 12%.</p>
                  </div>
                </div>

                <div className="report-section">
                  <h2>Fast Action Implementation Plan</h2>

                  <div className="report-phase">
                    <div className="report-phase-title">Phase 1 — Days 1–30: Cloud PMS Foundation</div>
                    <p>Select vendor, conduct 30-min discovery call, request references from 3 similar-sized practices. Execute data migration in weeks 3–4. Allocate 8–12 hours of staff time for validation. Do NOT sign a multi-year contract until migration succeeds. Realistic timeline: 6–8 weeks (vendors claim 2–3 — do not plan around this).</p>
                  </div>

                  <div className="report-phase">
                    <div className="report-phase-title">Phase 2 — Days 31–60: SMS Communication Automation</div>
                    <p>Activate native SMS module (if included in PMS) or deploy Reminder Media. Configure 48h / 24h / 4h reminder cadence. Monitor opt-out rates weekly — above 8% indicates messaging problems. Expected no-show reduction by day 60: 3–8%.</p>
                  </div>

                  <div className="report-phase">
                    <div className="report-phase-title">Phase 3 — Days 61–90: Scheduling Optimization</div>
                    <p>Configure high-risk slot identification (time-of-day, day-of-week patterns). Set overbooking at 10% for slots with &gt;20% historical no-show rates — start conservative. Expected cumulative no-show reduction by day 90: 15–35%. Expected staff time recovery: 6–10 hrs/week.</p>
                  </div>
                </div>

                <div className="report-section">
                  <h2>Financial ROI</h2>

                  <div className="report-callout">
                    <p><strong style={{ color: '#ffffff' }}>Year 1 Net ROI: $12,400–$84,000</strong> (30–210% depending on baseline metrics and vendor selection)</p>
                  </div>

                  <p>No-show reduction: A practice with 70 weekly appointments and $200 average appointment value recovering 4–9 appointments per week = $800–$1,800 weekly = $41,600–$93,600 annually.</p>
                  <p>Staff time recovery: 8 hours/week at $25/hr loaded = $10,400 annually.</p>
                  <p>Total first-year cost: $20,000–$39,600 (including one-time migration). Year 2 ROI improves significantly as migration costs are amortized.</p>

                  <p><em style={{ color: '#5a6a7a', fontSize: '0.82rem' }}>
                    Note: Overall confidence in this roadmap is 72%. These figures assume a single-provider practice with 70 weekly appointments. Adjust projections if your baseline no-show rate, appointment volume, or average appointment value differs materially from these assumptions.
                  </em></p>
                </div>

                <div className="report-section">
                  <h2>Six Risks to Manage</h2>
                  <ul>
                    <li><strong style={{ color: '#e8c8a8' }}>Staff resistance</strong> — Begin change management 30 days before PMS cutover. Designate a staff champion.</li>
                    <li><strong style={{ color: '#e8c8a8' }}>Data integrity</strong> — Conduct a pre-migration audit 6 weeks before cutover. Prioritize the 20% of records containing 80% of problems.</li>
                    <li><strong style={{ color: '#e8c8a8' }}>Integration failures</strong> — Test all API integrations in a non-production environment. Require joint vendor validation before go-live.</li>
                    <li><strong style={{ color: '#e8c8a8' }}>Low SMS adoption</strong> — Monitor opt-out rates weekly. Craft messages with clear purpose and one-tap rescheduling links.</li>
                    <li><strong style={{ color: '#e8c8a8' }}>Cost overruns</strong> — Request fixed-price estimates in writing. Allocate 20% contingency ($2,000–$4,000).</li>
                    <li><strong style={{ color: '#e8c8a8' }}>Cybersecurity</strong> — Require SOC 2 Type II certification. Mandate two-factor authentication for all staff with patient data access.</li>
                  </ul>
                </div>

                <div className="report-section">
                  <h2>Your Next 7 Days</h2>
                  <p>The single most important action is to conduct a practice-specific financial baseline assessment:</p>
                  <ul>
                    <li>Measure your current no-show rate for the past two weeks</li>
                    <li>Calculate annual no-show cost: (rate) × (weekly appointments) × (appointment value) × 52</li>
                    <li>Inventory every software tool currently in use and note cloud vs. on-premise</li>
                    <li>Estimate your current monthly software spend + staff time on manual processes</li>
                  </ul>
                  <div className="report-callout">
                    <p>If your annual no-show cost is under $50,000, start with SMS reminders only (Phase 2) before committing to full cloud PMS migration. If it exceeds $100,000, proceed immediately.</p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* CTA */}
        <div className="cta-strip">
          <h3>Get Your AI Blueprint</h3>
          <p>David runs this same process on your specific operations — custom tools, real pricing, and an honest ROI case.</p>
          <Link href="/#order-form" className="cta-btn">Get My AI Blueprint — $199</Link>
        </div>

      </div>
    </>
  )
}
