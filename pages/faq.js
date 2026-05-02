import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import { useRouter } from 'next/router'

const strategicFaqs = [
  {
    q: "How does David / Strategic work?",
    a: "You submit your client's strategic question through a short intake form — about 5 minutes. David runs a defense-grade analytical process on that question and produces a 50-page auditable report with confidence ratings, evidence provenance, and a full audit trail. You receive a redacted preview at no charge. If you'd put your firm's name on it, you pay $999 to unlock the complete deliverable. If not, you walk away — no charge, no follow-up."
  },
  {
    q: "What's included in the 50-page analysis?",
    a: "The report covers a structured breakdown of the strategic question, a ranked set of findings with confidence ratings assigned to each claim, full evidence provenance identifying where every data point originates, a complete audit trail of the analytical steps taken, and a conclusion section your team can act on or present directly to a client. Nothing is summarized into bullet points and handed to you without support — every assertion is traceable."
  },
  {
    q: "What does the free preview include?",
    a: "The redacted preview gives you a meaningful look at the structure, analytical depth, and caliber of the output before you commit. It is not a teaser designed to withhold the conclusion. You'll have enough to judge whether the finished report meets your firm's standard. If it does, you unlock the full deliverable for $999. If it doesn't, you owe nothing."
  },
  {
    q: "What does 'auditable' mean — and why does it matter?",
    a: "Every claim in the report is supported by a traceable source and assigned a confidence rating. You can follow any finding back through the evidence chain to its origin. This matters because consulting deliverables often contain conclusions that can't survive scrutiny — assertions presented as findings without disclosed methodology or source quality. An auditable report means your firm can defend every line of it, in front of a client, a board, or a regulator."
  },
  {
    q: "What are confidence ratings and evidence provenance?",
    a: "Confidence ratings are explicit probability assessments attached to each finding — David does not present uncertain conclusions as settled facts. Evidence provenance is the documented origin of every data point used in the analysis: the source, its quality classification, and how it was weighted. Together, these give you a report where the margin of uncertainty is visible, not hidden."
  },
  {
    q: "What kinds of strategic questions can David analyze?",
    a: "David is built for the strategic questions that consulting firms bring to clients: market entry and exit decisions, competitive positioning, build-buy-partner analysis, organizational restructuring, scenario planning under uncertainty, and threat and opportunity assessments. If you can frame it as a strategic question with a defensible answer, David can analyze it. If you're unsure whether your question is a fit, submit it — the intake is free."
  },
  {
    q: "How is David / Strategic different from hiring a consulting firm?",
    a: "A traditional consulting engagement at this analytical depth costs tens of thousands of dollars and takes weeks. David produces the same caliber of structured, sourced, auditable analysis for $999 and delivers it in hours. You're not paying for a team of analysts and a partner review cycle — you're paying for the output. The audit trail and confidence ratings actually make the methodology more transparent than most consulting deliverables, not less."
  },
  {
    q: "Why $999?",
    a: "The price reflects the depth of the output — a 50-page auditable analysis is not a summary or an overview. It is a defensible strategic deliverable. At $999, it costs a fraction of what a comparable consulting engagement would run, and it delivers faster. The free preview exists so you can verify that before you pay."
  },
  {
    q: "How long does the analysis take?",
    a: "Most analyses are delivered within a few hours of intake submission. You'll be able to track progress in real time. When the report is ready, it is delivered to the email address you provided. You don't need to stay on the tracking page — it will arrive in your inbox regardless."
  }
]

const blueprintFaqs = [
  {
    q: "How does the AI Blueprint work?",
    a: "You answer 3 quick questions about your business — what you want AI to do, where you are today, and what's holding you back. We use your answers to build a custom AI Blueprint tailored to your situation. You get a free preview of the full strategy before you pay a cent. If you like what we recommend, you unlock the complete report. If not, walk away — no charge, no follow-up."
  },
  {
    q: "Why wouldn't I just research AI tools myself?",
    a: "You can — but here's what you'll run into. The AI tools that show up first in your search results are there because they have the largest marketing budgets, not because they're the best fit for your business. There are incredibly well-built AI tools made by talented teams that simply can't compete on the marketing scene. They get buried. We know about them. When we build your blueprint, we're looking across the full landscape — the household names and the hidden ones — and recommending what actually fits your workflows and budget. That's the difference between a consultant and a Google search."
  },
  {
    q: "What's the difference between the three tiers?",
    a: "The Single Workflow Blueprint ($99) focuses on one workflow — fast to implement, great for businesses that know exactly what they want to fix first. The AI Blueprint ($299) covers 3–5 workflows prioritized by impact, with a full implementation plan and ROI estimates — this is the most popular option. The Enterprise Blueprint ($999) goes up to 10 workflows with a department-by-department rollout plan, IT integration architecture, compliance and security assessment, a 12-month roadmap, and a 2-hour hands-on Zoom with one of our AI experts. All three tiers include a free preview before you pay."
  },
  {
    q: "How is the AI Blueprint different from just asking ChatGPT?",
    a: "ChatGPT gives generic answers. Your AI Blueprint is built from the specific details you provide about your business — your workflows, your employee count, your budget, your biggest operational problem. The Small Psychological Model runs seven specialized analytical passes on your intake data using live market data, industry benchmarks, and a causal reasoning framework developed for defense-grade AI applications. You get a structured, prioritized plan — not a list of ideas."
  },
  {
    q: "What exactly is in the AI Blueprint?",
    a: "Depending on your tier, you receive up to a 50-page document built around your specific business. It covers your top automatable workflows ranked by estimated time savings, specific AI tools matched to each workflow and your budget, a full implementation plan, an honest ROI estimate for your business size and industry, and a risks section that tells you what can go wrong and how to prevent it. The entire report is built and delivered automatically — no human delay."
  },
  {
    q: "What does the AI Blueprint free preview include?",
    a: "The free preview is the complete blueprint — the full analysis, your prioritized workflows, tool recommendations, ROI framework, and implementation strategy. We don't hold back a teaser and ask you to pay to see the rest. You read the whole thing first. If you approve what we recommend, you unlock it. If it's not what you were looking for, you owe nothing."
  },
  {
    q: "Do I need to be tech-savvy to use the tools you recommend?",
    a: "No. The AI Blueprint is built for business owners, not developers. Every tool recommendation includes what it does, what it costs, how long setup takes, and what could go wrong. The implementation plan is designed so that Phase 1 starts with the lowest-friction, highest-impact changes — things you or your office manager can implement without technical help. If something in the AI Blueprint is unclear, you can call or email us and we'll walk you through it."
  },
  {
    q: "Will the AI tools you recommend be too expensive for my business?",
    a: "No. Budget-matching is built into your AI Blueprint. You tell us your monthly software budget during the intake, and every tool we recommend fits within that range. If you're on a tight budget, we focus on free tiers and freemium tools. If you have room to invest, we show you the full recommended stack and the ROI that justifies it. We'll never recommend a $500/month platform to a business that told us their budget is under $50."
  },
  {
    q: "What industries do you serve?",
    a: "The Small Psychological Model is trained on automation profiles across trades (HVAC, plumbing, electrical, landscaping), professional services (legal, accounting, consulting), healthcare (dental, chiropractic), real estate and property management, retail, e-commerce, restaurant and hospitality, and construction. If your industry isn't listed, select 'Other' in the intake form and describe your business — the model handles it."
  },
  {
    q: "How does delivery work?",
    a: "After you answer the 3 questions, you'll select your tier and complete a short intake form with details about your business and workflows. Your intake is immediately processed by our Small Psychological Model — David — which researches your industry, analyzes your workflows, and assembles your report automatically. You'll be taken to a live tracking page where you can watch David build your report in real time. Your finished report is emailed to you as soon as it's built, typically within the hour. You're free to close the tracking page at any time — the report will arrive in your inbox regardless."
  },
  {
    q: "What if I'm not satisfied with the AI Blueprint?",
    a: "All sales of the full unlocked report are final — that's why we give you a free preview first. Your preview includes the complete analysis, workflows, ROI framework, and implementation strategy. Review it carefully before you unlock. If you have questions before unlocking, call us at (623) 428-9308 or email support@novonavis.com."
  },
  {
    q: "I'm not ready to buy yet. How do I know the AI Blueprint is worth it?",
    a: <><Link href="/david" style={{color: '#c8a96e'}}>See how David thinks</Link> before you decide. It walks you through exactly how the analysis works — the reasoning process, the depth, and what makes it different from generic AI advice. If after reading it you still have questions, call us at (623) 428-9308 or email support@novonavis.com. We'd rather answer your questions now than have you buy something you're uncertain about.</>
  }
]

const sharedFaqs = [
  {
    q: "Who is Novo Navis?",
    a: <>Novo Navis Interactive is a division of Novo Navis Aerospace — a registered U.S. federal contractor with an A+ rating from the Better Business Bureau. We got our start building AI systems for government and defense and made that same rigor available to small businesses. You can read what we&apos;re talking about in the AI for Small Business community on Reddit:{' '}
      <a href="https://www.reddit.com/r/AiForSmallBusiness/comments/1snruki/i_built_a_causal_ai_system_for_small_businesses/" target="_blank" rel="noopener noreferrer" style={{color: '#c8a96e'}}>I built a causal AI system for small businesses →</a>
      {' '}and{' '}
      <a href="https://www.reddit.com/r/AiForSmallBusiness/comments/1shq87i/ai_got_gimmecky_real_fast/" target="_blank" rel="noopener noreferrer" style={{color: '#c8a96e'}}>AI got gimmicky real fast →</a>
    </>
  },
  {
    q: "How is my information handled?",
    a: "Your intake data is used solely to build your report. It is never sold, shared with third parties, or used for marketing. Payment is processed by Stripe — Novo Navis never sees your card number. Your report is delivered by email and is not stored on a public server. You can read our full Privacy Policy for details."
  },
  {
    q: "Are there any businesses you don't serve?",
    a: "Yes. Novo Navis does not provide services to cannabis or marijuana dispensary operations. As a registered U.S. federal contractor, we are prohibited from conducting business with entities engaged in activities that remain illegal under federal law, regardless of state-level legalization. We also do not serve businesses whose operations conflict with U.S. national security interests. As a defense contractor and Principal Investigator on active Department of Defense research projects, we have an obligation to decline any engagement that could present a conflict with those responsibilities. Beyond these specific exclusions, Novo Navis reserves the right to decline service to any business we determine, at our sole discretion, may be in conflict with local, state, federal, or international law. If we decline your order for any reason prior to delivery, you will be notified by email."
  }
]

const SectionLabel = ({ children }) => (
  <div style={{
    borderBottom: '1px solid #1e2a45',
    marginBottom: '1.25rem',
    paddingBottom: '0.5rem'
  }}>
    <p style={{
      color: '#c8a96e',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      margin: 0
    }}>
      {children}
    </p>
  </div>
)

export default function FAQ() {
  const router = useRouter()
  const embed = router.query.embed === '1'
  return (
    <>
      <Head>
        <title>Frequently Asked Questions | Novo Navis</title>
        <meta name="description" content="Common questions about Novo Navis products — the AI Blueprint for small businesses and David / Strategic for the consulting industry." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {embed && <style>{`html, body { background: #fff !important; color: #1a1a2e !important; } .report-page, .article-page { background: #fff !important; } nav { display: none !important; }`}</style>}
        <Script id="embed-bg" strategy="beforeInteractive">{`if(location.search.includes('embed=1'))document.documentElement.style.background='#fff'`}</Script>
      </Head>

      {!embed && (
        <nav>
          <Link href="/" className="nav-logo">NOVO NAVIS</Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/interactive">Get Your AI Blueprint</Link></li>
            <li><Link href="/strategic">David/Strategic</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </nav>
      )}

      <div className="report-page">

        <h1 style={{marginBottom: '0.5rem'}}>Frequently Asked Questions</h1>
        <p className="lead" style={{marginBottom: '2.5rem'}}>
          Everything you need to know about our products, the process, and what happens after you order.
        </p>

        {/* David / Strategic */}
        <SectionLabel>David / Strategic — For the Consulting Industry</SectionLabel>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem'}}>
          {strategicFaqs.map((item, i) => (
            <div key={i} style={{
              background: i % 2 === 0 ? '#0d1221' : '#0a0f1a',
              border: '1px solid #1e2a45',
              borderRadius: '6px',
              padding: '1.25rem 1.5rem'
            }}>
              <p style={{color: '#c8a96e', fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.5rem'}}>
                {item.q}
              </p>
              <p style={{color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.7', margin: 0}}>
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* AI Blueprint */}
        <SectionLabel>AI Blueprint — For Small Businesses</SectionLabel>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem'}}>
          {blueprintFaqs.map((item, i) => (
            <div key={i} style={{
              background: i % 2 === 0 ? '#0d1221' : '#0a0f1a',
              border: '1px solid #1e2a45',
              borderRadius: '6px',
              padding: '1.25rem 1.5rem'
            }}>
              <p style={{color: '#c8a96e', fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.5rem'}}>
                {item.q}
              </p>
              <p style={{color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.7', margin: 0}}>
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* General */}
        <SectionLabel>General</SectionLabel>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
          {sharedFaqs.map((item, i) => (
            <div key={i} style={{
              background: i % 2 === 0 ? '#0d1221' : '#0a0f1a',
              border: '1px solid #1e2a45',
              borderRadius: '6px',
              padding: '1.25rem 1.5rem'
            }}>
              <p style={{color: '#c8a96e', fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.5rem'}}>
                {item.q}
              </p>
              <p style={{color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.7', margin: 0}}>
                {item.a}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          background: '#0d1221',
          border: '1px solid #1e2a45',
          borderRadius: '8px',
          padding: '1.5rem',
          margin: '2.5rem 0',
          textAlign: 'center'
        }}>
          <p style={{color: '#d0d8e8', fontSize: '1rem', marginBottom: '1rem'}}>
            Still have a question? Call or email us before you order.
          </p>
          <p style={{marginBottom: '0.5rem'}}>
            <a href="tel:6234289308" style={{color: '#c8a96e', fontWeight: 'bold', fontSize: '1.05rem'}}>(623) 428-9308</a>
          </p>
          <p style={{marginBottom: '1.25rem'}}>
            <a href="mailto:support@novonavis.com" style={{color: '#c8a96e'}}>support@novonavis.com</a>
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link href="/interactive" className="btn-primary">
              Get My AI Blueprint — Preview Free →
            </Link>
            <Link href="/strategic/intake" className="btn-primary">
              Submit a Strategic Analysis →
            </Link>
          </div>
        </div>

      </div>

      {!embed && (
        <footer>
          <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
          <p style={{marginTop: '0.5rem'}}>
            <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
            <Link href="/interactive">Get Your AI Blueprint</Link> &nbsp;·&nbsp;
            <Link href="/strategic">David/Strategic</Link> &nbsp;·&nbsp;
            <Link href="/faq">FAQ</Link> &nbsp;·&nbsp;
            <Link href="/about">About</Link> &nbsp;·&nbsp;
            <Link href="/privacy">Privacy Policy</Link> &nbsp;·&nbsp;
            <Link href="/terms">Terms and Conditions</Link>
          </p>
        </footer>
      )}
    </>
  )
}
