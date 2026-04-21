import Head from 'next/head'
import Link from 'next/link'

const tips = [
  {
    number: '01',
    title: 'Search by your workflow, not by buzzword',
    body: 'The worst thing you can type into Google is "best AI tools for small business." You will get listicles written by people who have never run a business, full of tools that have nothing to do with your specific problem. Instead, search for the exact task you want to eliminate. "AI tool for automatic invoice generation." "AI scheduling assistant for field service companies." "AI that reads and sorts incoming emails." The more specific your search term, the closer you get to tools that were actually built for your situation. If you can\'t describe the workflow in one sentence, you\'re not ready to search for a tool yet — write it out first.'
  },
  {
    number: '02',
    title: 'Filter out the noise before you waste a week on trials',
    body: 'There are over 16,000 AI tools on the market right now. The majority of them are irrelevant to your business, underfunded, or solving a problem you don\'t have. Before you spend any time on a tool, run it through this filter: Does it integrate with software you already use? Does it have reviews from businesses in your industry — not just generic five-star ratings? Is it actively maintained — check their blog, changelog, or LinkedIn for activity in the last 90 days? Does it offer a free trial or a meaningful free tier? If a tool can\'t pass at least three of those four checks, move on immediately. Your time is worth more than another demo call.'
  },
  {
    number: '03',
    title: 'Determine whether a product is actually AI — or just automation',
    body: 'This distinction will save you from paying a premium for something you could have built yourself in Zapier for $20 a month. A large portion of tools currently marketed as "AI-powered" are really just rule-based automation — if this happens, then do that. That is not AI. It does not learn. It does not adapt. It executes the same steps in the same order every time, which is useful, but limited. True AI learns from your data over time, improves its outputs as it sees more inputs, and can handle variation and edge cases. Ask the vendor directly: does your tool learn from my data, or does it follow rules I set? The answer will tell you whether you\'re buying a hammer or a thinking system.'
  },
  {
    number: '04',
    title: 'Calculate your return on investment before you sign up for anything',
    body: 'Most business owners implement AI tools on instinct and then wonder six months later whether they\'re actually saving money. Do the math before you commit. Start with this formula: How many hours per week does this task currently take? Multiply that by your effective hourly rate — what your time is actually worth to the business. That\'s your weekly cost of doing it manually. Then multiply by 4.3 to get a monthly cost. Now compare that to the tool\'s monthly subscription price. If a tool costs $80 per month and eliminates 6 hours of work per week at $60 per hour, that\'s $1,548 in monthly value for $80 in cost — obvious. If the math is close or unclear, the tool is not ready for your business yet.'
  },
  {
    number: '05',
    title: 'Measure your expected productivity gains — before you start, not after',
    body: 'This is the step almost everyone skips, and it\'s the reason most people can\'t tell you whether their AI tools are actually working. Before you implement anything, document your current baseline in writing: How long does this task take? How many times per week does it happen? How often does it result in an error, a delay, or a follow-up? Set a calendar reminder for 30 days after implementation. On that date, measure the same numbers. Without a before-and-after comparison, you are flying blind — and you will end up paying monthly for tools that are not delivering anything, simply because you never established what "delivering" would actually look like.'
  }
]

export default function DIYGuide() {
  return (
    <>
      <Head>
        <title>How to Find the Right AI Tools for Your Business | Novo Navis</title>
        <meta name="description" content="Five honest tips for finding AI tools that actually fit your business — without wasting weeks on demos and trials." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav>
        <Link href="/" className="nav-logo">NOVO NAVIS</Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/#order-form">Get Your AI Blueprint</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div className="article-page">

        <div className="article-meta">
          <span style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase'}}>
            DIY Guide
          </span>
        </div>

        <h1>How to Find the Right AI Tools for Your Business</h1>

        <p className="lead" style={{marginBottom: '2rem'}}>
          If you'd rather do this yourself, here's exactly how. No fluff — just the five things that actually matter when you're searching for AI tools on your own.
        </p>

        <div className="article-body">

          {tips.map((tip, i) => (
            <div key={i} style={{
              background: '#0d1221',
              border: '1px solid #1e2a45',
              borderLeft: '3px solid #c8a96e',
              borderRadius: '6px',
              padding: '1.5rem 1.75rem',
              marginBottom: '1.5rem'
            }}>
              <p style={{color: '#c8a96e', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.4rem'}}>
                Tip {tip.number}
              </p>
              <p style={{color: '#ffffff', fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '0.75rem', lineHeight: '1.4'}}>
                {tip.title}
              </p>
              <p style={{color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.8', margin: 0}}>
                {tip.body}
              </p>
            </div>
          ))}

          <div style={{
            background: '#0a0f1a',
            border: '1px solid #1e2a45',
            borderRadius: '6px',
            padding: '1.5rem 1.75rem',
            margin: '2rem 0',
            textAlign: 'center'
          }}>
            <p style={{color: '#d0d8e8', fontSize: '1rem', lineHeight: '1.7', marginBottom: '0.5rem'}}>
              This is exactly the process David runs on your business — in real time.
            </p>
            <p style={{color: '#8a95aa', fontSize: '0.9rem', margin: 0}}>
              Every tip above is baked into the analysis. You get the output without the weeks of work.
            </p>
          </div>

          <div style={{textAlign: 'center', padding: '1rem 0 2rem 0'}}>
            <p style={{color: '#8a95aa', fontSize: '0.95rem', marginBottom: '1.25rem'}}>
              Want us to handle all of this for you?
            </p>
            <Link
              href="/#order-form"
              className="btn-primary"
              style={{fontSize: '1.1rem', padding: '1rem 2rem'}}
            >
              Get My AI Blueprint — $199 →
            </Link>
            <p style={{color: '#5a6a7a', fontSize: '0.82rem', marginTop: '1rem'}}>
              One report. Your business. Built and delivered in real time.
            </p>
          </div>

        </div>

      </div>

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
    </>
  )
}
