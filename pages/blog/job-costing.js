import Head from 'next/head'
import Link from 'next/link'

export default function JobCostingArticle() {
  return (
    <>
      <Head>
        <title>Most Construction Companies Don't Find Out a Job Lost Money Until It's Already Done | Novo Navis</title>
        <meta name="description" content="The job-level reconciliation problem costs construction companies margin every year — silently, after the fact. AI job costing tools fix that by closing the books in real time." />
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
          <Link href="/blog" style={{color: '#c8a96e'}}>← Back to Blog</Link>
          &nbsp;&nbsp;·&nbsp;&nbsp;
          <span>Construction</span>
          &nbsp;&nbsp;·&nbsp;&nbsp;
          <span>April 14, 2026</span>
        </div>

        <h1>Most Construction Companies Don't Find Out a Job Lost Money Until It's Already Done</h1>

        <div className="article-body" style={{marginTop: '2rem'}}>

          <p>That's the job-level reconciliation problem. Your estimate said one thing. Labor hours, material costs, subcontractor invoices, and change orders said another. By the time someone manually pulls it all together in a spreadsheet — the job is closed, the crew is gone, and there's nothing left to do but absorb the hit.</p>

          <p>AI-powered job costing tools change that by reconciling costs in real time, as the job runs. They pull data automatically from your time tracking, purchase orders, and supplier invoices — compare it against the original estimate — and flag variances before they become losses. If concrete costs spike mid-job or a subcontractor is tracking over budget, you know about it that week, not next quarter.</p>

          <p>The reconciliation that used to take a project manager half a day at job close gets done continuously, automatically, in the background.</p>

          <div style={{
            background: '#0d1221',
            border: '1px solid #c8a96e',
            borderRadius: '6px',
            padding: '1.5rem',
            margin: '2rem 0',
            textAlign: 'center'
          }}>
            <p style={{color: '#ffffff', fontWeight: 'bold', marginBottom: '0.5rem'}}>
              Want this analysis done for your specific construction business?
            </p>
            <p style={{color: '#8a95aa', fontSize: '0.9rem', marginBottom: '1rem'}}>
              Our proprietary Small Psychological Model builds a custom up to 25-page
              AI integration report tailored to your workflows. Built and delivered in real time.
            </p>
            <Link href="/#order-form" className="btn-primary">Get Your AI Blueprint — $199</Link>
          </div>

          <p>For companies running multiple jobs at once, this is especially powerful. Instead of juggling spreadsheets across five active sites, you get a single live view of where every job stands against budget — right now.</p>

          <p>The result isn't just cleaner books. It's better bidding. When you know exactly where you lost margin on the last ten jobs, your next estimate is sharper.</p>

          <p>Knowing which tools integrate with your existing software — and what setup actually looks like — is where most companies get stuck. A Novo Navis report maps that out specifically for your operation.</p>

        </div>

        <div style={{
          background: '#0d1221',
          border: '1px solid #1e2a45',
          borderRadius: '6px',
          padding: '2rem',
          margin: '3rem 0',
          textAlign: 'center'
        }}>
          <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem'}}>
            Ready to Take Action?
          </p>
          <h3 style={{color: '#ffffff', fontSize: '1.3rem', marginBottom: '0.8rem'}}>
            Get Your AI Blueprint for Your Construction Business
          </h3>
          <p style={{color: '#8a95aa', fontSize: '0.95rem', marginBottom: '1.5rem'}}>
            This article covers the problem. Your AI Blueprint maps the solution —
            specific tools, real pricing, and a fast action implementation plan built
            for your workflows and your software stack.
            Up to 25 pages. Built and delivered in real time. $199.
          </p>
          <Link href="/#order-form" className="btn-primary">Get Your AI Blueprint</Link>
        </div>

        <div style={{textAlign: 'center', marginTop: '2rem'}}>
          <Link href="/blog" style={{color: '#8a95aa', fontSize: '0.9rem'}}>← Back to all articles</Link>
        </div>

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/#order-form">Get Your AI Blueprint</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link>
        </p>
      </footer>
    </>
  )
}
