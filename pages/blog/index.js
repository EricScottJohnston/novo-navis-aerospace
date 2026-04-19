import Head from 'next/head'
import Link from 'next/link'

export default function BlogIndex() {
  const articles = [
    {
      href: '/blog/hvac',
      industry: 'Field Services',
      title: 'How HVAC Companies Can Use AI to Automate Dispatch and Invoicing',
      description: 'Most HVAC companies are losing 8-10 hours a week to manual dispatch and invoicing. Here is exactly how AI fixes that without replacing your team.',
      date: 'April 2, 2026'
    },
    {
      href: '/blog/dental',
      industry: 'Healthcare',
      title: 'AI for Dental Practices: How to Automate Scheduling and Patient Follow-Up Without Losing the Human Touch',
      description: 'Dental practices are losing new patients to missed calls and slow follow-up. Here is how AI handles the front desk bottleneck without replacing your staff.',
      date: 'April 2, 2026'
    },
    {
      href: '/blog/real-estate',
      industry: 'Real Estate',
      title: 'How Real Estate Agents Can Use AI to Automate Lead Follow-Up and Never Lose Another Deal to Response Time',
      description: 'Real estate agents lose deals every week to slow follow-up. Here is how AI nurtures your leads automatically so you never lose another prospect to response time.',
      date: 'April 2, 2026'
    },
    {
      href: '/blog/plumbing',
      industry: 'Field Services',
      title: 'How Plumbing Companies Can Use AI to Automate Dispatch, Scheduling, and Invoicing',
      description: 'Plumbing companies lose hours every week to manual scheduling and invoicing. Here is how AI automates the back office so your team can focus on the work.',
      date: 'April 2, 2026'
    },
    {
      href: '/blog/accounting',
      industry: 'Professional Services',
      title: 'How Accounting Firms Can Use AI to Automate Client Document Collection and Organization',
      description: 'Small accounting firms spend 10+ hours a week chasing client documents. Here is how AI automates collection, organization, and follow-up so your team can focus on billable work.',
      date: 'April 2, 2026'
    },
    {
      href: '/blog/law-firm',
      industry: 'Legal Services',
      title: 'How Small Law Firms Can Use AI to Automate Client Intake and Contract Review',
      description: 'Small law firms spend too much time on intake forms and routine contract review. Here is how AI handles the administrative work so attorneys can focus on billable hours.',
      date: 'April 2, 2026'
    },
    {
      href: '/blog/property-management',
      industry: 'Property Management',
      title: 'How Property Managers Can Use AI to Automate Maintenance Requests and Tenant Communication',
      description: 'Property managers spend hours every week routing maintenance requests and answering repetitive tenant questions. Here is how AI handles both automatically.',
      date: 'April 2, 2026'
    },
    {
      href: '/blog/restaurant',
      industry: 'Restaurant',
      title: 'How Restaurants Can Use AI to Automate Inventory Management and Supplier Ordering',
      description: 'Restaurants lose thousands every month to food waste and over-ordering. Here is how AI predicts what you need and automates supplier orders before you run out.',
      date: 'April 2, 2026'
    },
    {
      href: '/blog/chiropractic',
      industry: 'Healthcare',
      title: 'How Chiropractic Practices Can Use AI to Automate Scheduling and Insurance Verification',
      description: 'Chiropractic practices lose new patients to slow follow-up and waste hours on insurance verification. Here is how AI fixes both problems automatically.',
      date: 'April 2, 2026'
    },
    {
      href: '/blog/job-costing',
      industry: 'Construction',
      title: "Most Construction Companies Don't Find Out a Job Lost Money Until It's Already Done",
      description: "The job-level reconciliation problem costs construction companies margin every year — silently, after the fact. AI job costing tools fix that by closing the books in real time.",
      date: 'April 14, 2026'
    },
    {
      href: '/blog/construction',
      industry: 'Construction',
      title: 'How Construction Companies Can Use AI to Automate Job Costing and Change Order Processing',
      description: 'Construction companies lose margin every day to inaccurate job costing and slow change order processing. Here is how AI fixes both without adding administrative staff.',
      date: 'April 2, 2026'
    }
  ]

  return (
    <>
      <Head>
        <title>Blog | Novo Navis — AI Integration Intelligence</title>
        <meta name="description" content="Practical guides on how small businesses can use AI to automate workflows, cut costs, and grow. New articles published regularly." />
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

      <div className="section">
        <div className="section-title">AI Integration Intelligence</div>
        <div className="section-sub">
          Practical guides for small business owners on using AI to automate workflows,
          cut costs, and compete with larger companies.
        </div>

        <div className="blog-grid">
          {articles.map((article) => (
            <Link href={article.href} key={article.href} style={{textDecoration: 'none'}}>
              <div className="blog-card">
                <div className="tag">{article.industry}</div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <p style={{color: '#c8a96e', fontSize: '0.85rem', marginTop: '1rem'}}>
                  {article.date} → Read article
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <hr className="divider" />

      <div className="section" style={{textAlign: 'center'}}>
        <div className="section-title">Want This Done For Your Business?</div>
        <div className="section-sub">
          These articles cover general strategies. Our reports are built specifically
          for your business, your workflows, and your industry.
        </div>
        <Link href="/#order-form" className="btn-primary">Get Your Custom Report — $199</Link>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/sample-analysis">Try It Free</Link> &nbsp;·&nbsp;
          <Link href="/#order-form">Get Your Report</Link> &nbsp;·&nbsp;
          <Link href="/faq">FAQ</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link>
        </p>
      </footer>
    </>
  )
}