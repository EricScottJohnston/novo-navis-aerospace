import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

const GOLD = '#c8a96e'
const NAVY = '#1B2A4A'

export default function SampleReport() {
  const router = useRouter()
  const embed = router.query.embed === '1'

  return (
    <>
      <Head>
        <title>Sample AI Blueprint | Novo Navis</title>
        <meta name="description" content="See a real AI Blueprint built by Novo Navis — a mold remediation business, analyzed and delivered in real time." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {embed && <style>{`html, body { background: #fff !important; color: #1a1a2e !important; }`}</style>}
      </Head>

      {!embed && (
        <nav>
          <Link href="/" className="nav-logo">NOVO NAVIS</Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/#order-form">Get Your AI Blueprint</Link></li>
          </ul>
        </nav>
      )}

      <div style={{
        maxWidth: '780px', margin: '0 auto', padding: embed ? '1.5rem 1.25rem' : '3rem 1.5rem',
        fontFamily: 'Georgia, serif', color: '#1a1a2e',
      }}>

        {/* Header */}
        <div style={{
          borderTop: `4px solid ${GOLD}`, borderBottom: `1px solid #d0d4de`,
          padding: '1.25rem 0', marginBottom: '2rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ color: NAVY, fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '0.08em', fontFamily: 'sans-serif' }}>
            NOVO NAVIS
          </span>
          <span style={{ color: '#8a95aa', fontSize: '0.82rem', fontFamily: 'sans-serif' }}>Sample Blueprint</span>
        </div>

        {/* Sample watermark notice */}
        <div style={{
          background: '#fff8ee', border: `1px solid ${GOLD}60`, borderLeft: `3px solid ${GOLD}`,
          borderRadius: '6px', padding: '0.85rem 1.1rem', marginBottom: '2rem',
          fontFamily: 'sans-serif',
        }}>
          <p style={{ color: NAVY, fontSize: '0.82rem', margin: 0 }}>
            <strong>Sample Report</strong> — This is a real AI Blueprint built for a mold remediation business. Customer name and details are published with permission. Your blueprint will be built the same way, around your specific business.
          </p>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ color: GOLD, fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem' }}>AI Blueprint</h1>
          <h2 style={{ color: NAVY, fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 1rem' }}>
            AI Integration Starter Report: Mold Remediation Business
          </h2>
          <p style={{ color: '#6b7a99', fontSize: '0.9rem', margin: '0 0 0.25rem', fontFamily: 'sans-serif' }}>Novo Navis AI Starter Report | May 2025</p>
          <p style={{ color: '#6b7a99', fontSize: '0.9rem', margin: 0, fontFamily: 'sans-serif' }}>
            Prepared exclusively for: <Redacted width="120px" /> | <Redacted width="160px" />
          </p>
          <div style={{ borderBottom: `1px solid #d0d4de`, marginTop: '1.5rem' }} />
        </div>

        <Section title="Executive Summary">
          <p>Your mold remediation business has identified three workflows where AI can make a real operational difference: generating estimates from photos, writing insurance reports, and managing job cost scheduling. This report identifies the specific tools best suited to each workflow and is honest about where the evidence is strong versus where it depends on your specific situation.</p>
          <p>The single highest-confidence recommendation in this report is Xactimate, the industry-standard cost estimation platform with IICRC S520 pricing libraries built in. Xactimate runs approximately $60 to $120 per month depending on the package tier, and it is the platform against which virtually every mold remediation estimate in the industry is benchmarked. If you are not already using it, that is the clearest gap to close.</p>
          <p>For insurance report automation, the tool that most directly addresses your stated need is Joist or, for more compliance-focused output, a workflow built around Microsoft Copilot Pro, which costs approximately $30 per user per month as of 2025 and can generate compliant report drafts from project notes. Zapier, at approximately $19.99 per month for the Starter plan, functions as the connective tissue that links your estimation, reporting, and scheduling tools together without manual re-entry.</p>
          <p>One critical fact this report will not obscure: the tools that are right for your situation depend heavily on where your actual bottleneck is. Before committing to any specific stack, a two-week internal audit of your estimate generation time, insurance revision rate, and project cost variance will sharpen these recommendations considerably. The tools described here are the right candidates. The audit tells you which ones to buy first.</p>
        </Section>

        <Section title="Your Workflows and Where AI Fits">
          <SubSection title="Estimate Generation from Photos">
            <p>This is a strong candidate for AI assistance, with one important qualification. AI tools today can analyze photos to detect visible contamination patterns, flag affected surface areas, and suggest line items based on visual scope. However, the accuracy of that output depends entirely on the quality and consistency of the photos going in. If your team's photos are taken at inconsistent angles, without measurement references, or in poor lighting, AI analysis will produce unreliable results. The photo capture process itself may need to be standardized before AI analysis adds real value.</p>
            <p>The IICRC S520 standard, now in its 4th edition published in 2024, defines the scope categories that all estimates should follow: containment, remediation method, clearance verification, and post-remediation protocols. Any AI tool you use for estimation must be capable of outputting scope that maps to these categories, or your estimates will not hold up to carrier scrutiny regardless of how fast they are generated. Industry benchmarks indicate that Xactimate-based estimates are considered planning-grade accurate within plus or minus 15 to 25 percent when site inputs are consistent.</p>
          </SubSection>
          <SubSection title="Insurance Report Writing">
            <p>This is a partial candidate for AI automation. The portion of report writing that is rule-based and repetitive — pulling standard language, organizing field observations into carrier-required formats, and checking that required data fields are present — is genuinely automatable. The portion that requires professional judgment about scope justification, remediation method selection, and technical explanation of why a particular approach was necessary is not. AI can draft; a certified professional must review.</p>
            <p>The evidence base on insurance claim rejection rates is murky. Available data on claim denial rates comes primarily from health insurance, not property or remediation insurance, so there are no reliable industry benchmarks to cite for remediation report rejection rates. What this means practically: before investing in report automation tools, you should pull your own rejection and revision data from the last 10 to 20 jobs to understand whether documentation gaps are actually driving your revisions or whether rejections are coming from underwriting decisions that better-formatted reports cannot fix.</p>
          </SubSection>
          <SubSection title="Job Cost Scheduling">
            <p>This is a partial candidate. AI tools can improve visibility across multiple jobs, flag scheduling conflicts, and help match crew availability to project timelines. However, the biggest driver of job cost overruns in remediation work is hidden scope discovered mid-project, and no scheduling software eliminates that risk. What good scheduling software does is reduce the cascade effect when a job runs over. It can alert you when Job B's start date is at risk because Job A is running long, giving you time to notify the client and adjust crew deployment before the problem compounds.</p>
          </SubSection>
        </Section>

        <Section title="The AI Tools That Apply to Your Business">
          <SubSection title="Estimate Generation from Photos">
            <p>Xactimate, offered by Verisk, is the de facto standard for mold remediation cost estimation. The mobile version allows photo capture in the field and generates line-item estimates based on S520 scope categories and local labor pricing data. Pricing runs approximately $60 to $120 per month for small business plans as of 2025. Every remediation estimate in the industry is effectively validated against Xactimate pricing, so using it ensures your numbers are defensible to any carrier.</p>
            <p>For photo analysis specifically, Google Cloud Vision API offers computer vision capabilities that can detect contamination markers, classify surface types, and flag areas of concern in uploaded photos. Pricing is usage-based at approximately $1.50 per 1,000 images analyzed, with a free tier for the first 1,000 images per month.</p>
            <p>ChatGPT Plus or Claude Pro can assist with interpreting photo descriptions, generating scope narratives, and drafting estimate line-item justifications when given structured field notes. Both cost approximately $20 per month per user.</p>
          </SubSection>
          <SubSection title="Insurance Report Writing">
            <p>Microsoft Copilot Pro, at approximately $30 per user per month as of 2025, integrates directly into Microsoft Word and can generate compliant insurance report drafts from structured project notes. A technician describes what was found and what was done; Copilot drafts the formal report language; a certified professional reviews and approves. This is realistically capable of reducing report writing time by 50 to 70 percent for the drafting phase.</p>
            <p>Zapier, at approximately $19.99 per month for the Starter plan, automates data handoffs between tools. If Xactimate generates an estimate and that data needs to flow into your report template or your scheduling system without manual re-entry, Zapier is the connective layer.</p>
          </SubSection>
          <SubSection title="Job Cost Scheduling">
            <p>Jobber, at approximately $99 to $199 per month depending on the plan, handles job scheduling, crew assignment, client communication, and invoicing for service businesses. It provides the visibility and coordination layer that prevents scheduling chaos when projects run long. Verify at getjobber.com.</p>
          </SubSection>
        </Section>

        <Section title="What These Tools Can and Cannot Do">
          <p><strong>Xactimate</strong> handles scope-based cost estimation well when the scope inputs are accurate. It enforces S520 scope structure and produces estimates that carriers recognize as credible. What it cannot do is compensate for inaccurate field observations. Garbage in, garbage out applies here as firmly as anywhere.</p>
          <p><strong>Microsoft Copilot Pro</strong> handles the drafting and formatting phases of report writing well. What it handles poorly is technical interpretation. If your field notes are vague or use inconsistent terminology, Copilot will produce plausible-sounding language that may not accurately represent what was found. Every AI-drafted report requires a qualified professional review before submission — not as a formality, but as a genuine quality gate.</p>
          <p><strong>Zapier</strong> handles routine, rule-based data transfers between platforms reliably. It handles exceptions poorly. If a field entry is formatted differently than expected or a required data field is left blank, Zapier's automation will typically fail silently or pass bad data downstream. Any Zapier workflow needs a human review checkpoint.</p>
          <p><strong>Jobber</strong> manages scheduling and client communication effectively but does not predict scope creep or hidden scope risk. It can only help you communicate and adjust faster when it happens.</p>
          <p>The most significant risk across all of these tools is the absence of a validation step. The risk is not that the tools are unreliable. The risk is that they produce reliable-looking outputs that mask underlying inaccuracies.</p>
        </Section>

        {/* Footer */}
        <div style={{
          borderTop: `1px solid #d0d4de`, marginTop: '3rem', paddingTop: '1rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'sans-serif',
        }}>
          <span style={{ color: '#8a95aa', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Confidential — <Redacted width="100px" /> | <Redacted width="140px" />
          </span>
          <span style={{ color: '#8a95aa', fontSize: '0.78rem' }}>Starter Blueprint</span>
        </div>

        {embed ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 0 1rem', fontFamily: 'sans-serif' }}>
            <p style={{ color: '#6b7a99', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Your blueprint will be built the same way — around your specific business, workflows, and budget.
            </p>
            <button
              onClick={() => window.parent.postMessage('close-nav-modal', '*')}
              style={{
                background: NAVY, border: 'none', borderRadius: '8px',
                color: '#fff', fontWeight: 'bold', fontSize: '1rem',
                padding: '0.85rem 2rem', cursor: 'pointer',
              }}
            >
              Got it — back to my options
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 0 1rem', fontFamily: 'sans-serif' }}>
            <p style={{ color: '#6b7a99', marginBottom: '1.5rem' }}>
              Your blueprint will be built the same way — around your specific business, workflows, and budget.
            </p>
            <Link href="/#order-form" className="btn-primary">Get Your AI Blueprint →</Link>
          </div>
        )}

      </div>

      {!embed && (
        <footer>
          <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        </footer>
      )}
    </>
  )
}

function Redacted({ width }) {
  return (
    <span style={{
      display: 'inline-block', width, height: '0.9em',
      background: '#1a1a2e', borderRadius: '2px',
      verticalAlign: 'middle', opacity: 0.15,
    }} />
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ color: GOLD, fontSize: '1.15rem', fontWeight: 'bold', borderBottom: '1px solid #d0d4de', paddingBottom: '0.4rem', marginBottom: '1rem' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function SubSection({ title, children }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ color: NAVY, fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.6rem' }}>{title}</h3>
      {children}
    </div>
  )
}
