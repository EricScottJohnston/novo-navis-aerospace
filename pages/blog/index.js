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
          <li><Link href="/report">Get Your Report</Link></li>
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
        <Link href="/report" className="btn-primary">Get Your Custom Report — $29</Link>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/report">Get Your Report</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link>
        </p>
      </footer>
    </>
  )
}