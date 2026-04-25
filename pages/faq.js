import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

const faqs = [
  {
    q: "Who is Novo Navis?",
    a: <>Novo Navis is a registered U.S. federal contractor. We research and develop trusted AI systems that got its start building AI systems for government and defense — and made that same rigor available to small businesses. You can read what we&apos;re talking about in the AI for Small Business community on Reddit:{' '}
      <a href="https://www.reddit.com/r/AiForSmallBusiness/comments/1snruki/i_built_a_causal_ai_system_for_small_businesses/" target="_blank" rel="noopener noreferrer" style={{color: '#c8a96e'}}>I built a causal AI system for small businesses →</a>
      {' '}and{' '}
      <a href="https://www.reddit.com/r/AiForSmallBusiness/comments/1shq87i/ai_got_gimmecky_real_fast/" target="_blank" rel="noopener noreferrer" style={{color: '#c8a96e'}}>AI got gimmicky real fast →</a>
    </>
  },
  {
    q: "How is this different from just asking ChatGPT?",
    a: "ChatGPT gives generic answers. Your AI Blueprint is built from the specific details you provide about your business — your workflows, your employee count, your budget, your biggest operational problem. The Small Psychological Model runs seven specialized analytical passes on your intake data using live market data, industry benchmarks, and a causal reasoning framework developed for defense-grade AI applications. You get a structured, prioritized plan — not a list of ideas."
  },
  {
    q: "What exactly is in the AI Blueprint?",
    a: "You receive a up to 25-page document built around your specific business. It covers your top 3–5 automatable workflows ranked by estimated time savings, specific AI tools matched to each workflow and your budget, a fast action implementation plan, an honest ROI estimate for your business size and industry, and a risks section that tells you what can go wrong and how to prevent it. The entire report is built and delivered automatically — no human delay."
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
    q: "How does the real-time delivery work?",
    a: "After checkout, you'll complete a short intake form with details about your business and workflows. Your intake is immediately processed by our Small Psychological Model — David — which researches your industry, analyzes your workflows, and assembles your report automatically. You'll be taken to a live tracking page where you can watch David build your report in real time — many customers find it fascinating to see the model reason through their business step by step. Your finished report is emailed to you as soon as it's built, typically within the hour. You're also free to close the tracking page at any time — the report will arrive in your inbox regardless."
  },
  {
    q: "What if I'm not satisfied with the AI Blueprint?",
    a: "Full refund, no questions asked. If you read your AI Blueprint and don't find it useful, email support@novonavis.com and we'll refund you in full. We'd rather lose the sale than send a report that doesn't deliver value."
  },
  {
    q: "How is my business information handled?",
    a: "Your intake data is used solely to build your AI Blueprint. It is never sold, shared with third parties, or used for marketing. Payment is processed by Stripe — Novo Navis never sees your card number. Your AI Blueprint is delivered by email and is not stored on a public server. You can read our full Privacy Policy for details."
  },
  {
    q: "Are there any businesses you don't serve?",
    a: "Yes. Novo Navis does not provide services to cannabis or marijuana dispensary operations. As a registered U.S. federal contractor, we are prohibited from conducting business with entities engaged in activities that remain illegal under federal law, regardless of state-level legalization. We also do not serve businesses whose operations conflict with U.S. national security interests. As a defense contractor and Principal Investigator on active Department of Defense research projects, we have an obligation to decline any engagement that could present a conflict with those responsibilities. Beyond these specific exclusions, Novo Navis reserves the right to decline service to any business we determine, at our sole discretion, may be in conflict with local, state, federal, or international law. If we decline your order for any reason, you will receive a full refund."
  },
  {
    q: "Why wouldn't I just research AI tools myself?",
    a: "You can — but here's what you'll run into. The AI tools that show up first in your search results are there because they have the largest marketing budgets, not because they're the best fit for your business. There are incredibly well-built AI tools made by talented teams that simply can't compete on the marketing scene. They get buried. We know about them. When we build your blueprint, we're looking across the full landscape — the household names and the hidden ones — and recommending what actually fits your workflows and budget. That's the difference between a consultant and a Google search."
  },
  {
    q: "I'm not ready to buy yet. How do I know the AI Blueprint is worth it?",
    a: <><Link href="/david" style={{color: '#c8a96e'}}>See how David thinks</Link> before you decide. It walks you through exactly how the analysis works — the reasoning process, the depth, and what makes it different from generic AI advice. If after reading it you still have questions, call us at (623) 428-9308 or email support@novonavis.com. We'd rather answer your questions now than have you buy something you're uncertain about.</>
  }
]

export default function FAQ() {
  const router = useRouter()
  const embed = router.query.embed === '1'
  return (
    <>
      <Head>
        <title>Frequently Asked Questions | Novo Navis</title>
        <meta name="description" content="Common questions about the Novo Navis custom AI integration report — what's in it, how it's built, who it's for, and what happens if you're not satisfied." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {!embed && (
        <nav>
          <Link href="/" className="nav-logo">NOVO NAVIS</Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/#order-form">Get Your AI Blueprint</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </nav>
      )}

      <div className="report-page">

        <h1 style={{marginBottom: '0.5rem'}}>Frequently Asked Questions</h1>
        <p className="lead" style={{marginBottom: '2.5rem'}}>
          Everything you need to know about the AI Blueprint, the process, and what happens after you order.
        </p>

        <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
          {faqs.map((item, i) => (
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
          <Link href="/#order-form" className="btn-primary">
            Get My AI Blueprint — $199 →
          </Link>
        </div>

      </div>

      {!embed && (
        <footer>
          <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
          <p style={{marginTop: '0.5rem'}}>
            <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
            <Link href="/#order-form">Get Your AI Blueprint</Link> &nbsp;·&nbsp;
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
