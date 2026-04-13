import Head from 'next/head'
import Link from 'next/link'

const faqs = [
  {
    q: "What exactly is in the report?",
    a: "You receive a up to 25-page document built around your specific business. It covers your top 3–5 automatable workflows ranked by estimated time savings, specific AI tools matched to each workflow and your budget, a prioritized 90-day implementation roadmap broken into three phases, an honest ROI estimate for your business size and industry, and a risks section that tells you what can go wrong and how to prevent it. Every report is reviewed by a human AI consultant before it's sent."
  },
  {
    q: "How is this different from just asking ChatGPT?",
    a: "ChatGPT gives generic answers. Your report is built from the specific details you provide about your business — your workflows, your employee count, your budget, your biggest operational problem. The Small Psychological Model runs seven specialized analytical passes on your intake data, and the output is reviewed by Eric Johnston, a Principal Investigator on active U.S. Department of Defense AI research projects. You get a structured, prioritized plan — not a list of ideas."
  },
  {
    q: "How does the 1-hour delivery work?",
    a: "After checkout, you'll complete a short intake form with details about your business and workflows. That intake is sent directly to Eric. He runs your data through the Small Psychological Model, reviews the output, and emails your finished report within 1 hour during business hours. Most reports arrive sooner. If there's any delay, you'll hear from us before the 1-hour window closes."
  },
  {
    q: "What if I'm not satisfied with the report?",
    a: "Full refund, no questions asked. If you read your report and don't find it useful, email support@novonavis.com and we'll refund you in full. We'd rather lose the $49 than send a report that doesn't deliver value."
  },
  {
    q: "Do I need to be tech-savvy to use the tools you recommend?",
    a: "No. The report is built for business owners, not developers. Every tool recommendation includes what it does, what it costs, how long setup takes, and what could go wrong. The 90-day roadmap is designed so that Phase 1 starts with the lowest-friction, highest-impact changes — things you or your office manager can implement without technical help. If something in the report is unclear, you can call or email us and we'll walk you through it."
  },
  {
    q: "What industries do you serve?",
    a: "The Small Psychological Model is trained on automation profiles across trades (HVAC, plumbing, electrical, landscaping), professional services (legal, accounting, consulting), healthcare (dental, chiropractic), real estate and property management, retail, e-commerce, restaurant and hospitality, and construction. If your industry isn't listed, select 'Other' in the intake form and describe your business — the model handles it."
  },
  {
    q: "Will the AI tools you recommend be too expensive for my business?",
    a: "No. Budget-matching is built into the report. You tell us your monthly software budget during the intake, and every tool we recommend fits within that range. If you're on a tight budget, we focus on free tiers and freemium tools. If you have room to invest, we show you the full recommended stack and the ROI that justifies it. We'll never recommend a $500/month platform to a business that told us their budget is under $50."
  },
  {
    q: "What is the Small Psychological Model?",
    a: "The Small Psychological Model (SPM) is a proprietary multi-pass analytical system built by Novo Navis. It runs your intake data through seven specialized analytical instances — each focused on a different dimension of your business — before assembling the final report. The same analytical frameworks used in defense-grade AI assessments underlie its design. It is not a chatbot, and it does not produce template responses. Every report is unique to the business that ordered it."
  },
  {
    q: "How is my business information handled?",
    a: "Your intake data is used solely to build your report. It is never sold, shared with third parties, or used for marketing. Payment is processed by Stripe — Novo Navis never sees your card number. Your report is delivered by email and is not stored on a public server. You can read our full Privacy Policy for details."
  },
  {
    q: "I'm not ready to buy yet. How do I know the report is worth it?",
    a: "Read the sample report for a real plumbing company before you decide. It shows you exactly what you'll receive — the format, the depth, the specific tool recommendations, and the 90-day roadmap structure. If after reading it you still have questions, call us at (623) 428-9308 or email support@novonavis.com. We'd rather answer your questions now than have you buy something you're uncertain about."
  }
]

export default function FAQ() {
  return (
    <>
      <Head>
        <title>Frequently Asked Questions | Novo Navis</title>
        <meta name="description" content="Common questions about the Novo Navis custom AI integration report — what's in it, how it's built, who it's for, and what happens if you're not satisfied." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav>
        <Link href="/" className="nav-logo">NOVO NAVIS</Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/#order-form">Get Your Report</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div className="report-page">

        <h1 style={{marginBottom: '0.5rem'}}>Frequently Asked Questions</h1>
        <p className="lead" style={{marginBottom: '2.5rem'}}>
          Everything you need to know about the report, the process, and what happens after you order.
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
          background: '#0d1a0d',
          border: '2px solid #4caf50',
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
          <Link href="/#order-form" className="btn-primary" style={{background: '#4caf50', borderColor: '#4caf50'}}>
            ⚡ Start Here →
          </Link>
        </div>

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/#order-form">Get Your Report</Link> &nbsp;·&nbsp;
          <Link href="/faq">FAQ</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link> &nbsp;·&nbsp;
          <Link href="/privacy">Privacy Policy</Link> &nbsp;·&nbsp;
          <Link href="/terms">Terms and Conditions</Link>
        </p>
      </footer>
    </>
  )
}
