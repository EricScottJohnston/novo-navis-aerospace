import Head from 'next/head'
import Link from 'next/link'

const posts = [
  { href: '/blog/hvac',                title: 'AI for HVAC Companies: Automate Dispatch, Invoicing, and Maintenance Reminders',            category: 'Trades' },
  { href: '/blog/plumbing',            title: 'How Plumbing Companies Can Use AI to Automate Dispatch and Invoicing',                     category: 'Trades' },
  { href: '/blog/construction',        title: 'How Construction Companies Can Use AI to Automate Job Costing and Change Orders',           category: 'Construction' },
  { href: '/blog/job-costing',         title: "Most Construction Companies Don't Find Out a Job Lost Money Until It's Already Done",      category: 'Construction' },
  { href: '/blog/restaurant',          title: 'How Restaurants Can Use AI to Automate Inventory Management and Supplier Ordering',        category: 'Hospitality' },
  { href: '/blog/dental',              title: 'AI for Dental Practices: Automate Scheduling and Patient Follow-Up',                       category: 'Healthcare' },
  { href: '/blog/chiropractic',        title: 'How Chiropractic Practices Can Use AI to Automate Scheduling and Insurance Verification',  category: 'Healthcare' },
  { href: '/blog/law-firm',            title: 'How Small Law Firms Can Use AI to Automate Client Intake and Contract Review',             category: 'Professional Services' },
  { href: '/blog/accounting',          title: 'How Accounting Firms Can Use AI to Automate Client Document Collection',                   category: 'Professional Services' },
  { href: '/blog/real-estate',         title: 'How Real Estate Agents Can Use AI to Automate Lead Follow-Up',                            category: 'Real Estate' },
  { href: '/blog/property-management', title: 'How Property Managers Can Use AI to Automate Maintenance Requests and Tenant Communication', category: 'Real Estate' },
]

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog | Novo Navis — AI Integration for Small Business</title>
        <meta name="description" content="Practical guides on using AI to automate operations across trades, healthcare, legal, and more. No hype, just implementation." />
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

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Novo Navis
          </p>
          <h1>AI Integration Guides</h1>
          <p className="lead" style={{ color: '#8a95aa', maxWidth: '560px', margin: '1rem auto 0' }}>
            Practical breakdowns for small business owners. No hype — just what to automate, how to do it, and what it actually costs.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {posts.map((post) => (
            <Link key={post.href} href={post.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#0d1221',
                border: '1px solid #1e2a45',
                borderRadius: '6px',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <div>
                  <p style={{ color: '#c8a96e', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    {post.category}
                  </p>
                  <p style={{ color: '#ffffff', fontSize: '1rem', lineHeight: '1.45', margin: 0 }}>
                    {post.title}
                  </p>
                </div>
                <span style={{ color: '#4a5568', fontSize: '1.2rem', flexShrink: 0 }}>→</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{
          background: '#0d1221',
          border: '1px solid #1e2a45',
          borderRadius: '6px',
          padding: '2rem',
          margin: '3rem 0',
          textAlign: 'center'
        }}>
          <p style={{ color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
            Ready to Go Further?
          </p>
          <h3 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '0.8rem' }}>
            Get a Custom AI Blueprint for Your Business
          </h3>
          <p style={{ color: '#8a95aa', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            These articles cover general strategies. Your blueprint is built specifically for your workflows, your tools, your bottlenecks. Built and delivered in real time.
          </p>
          <Link href="/#order-form" className="btn-primary">Get Your AI Blueprint — $199</Link>
        </div>

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{ marginTop: '0.5rem' }}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/#order-form">Get Your AI Blueprint</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link>
        </p>
      </footer>
    </>
  )
}
