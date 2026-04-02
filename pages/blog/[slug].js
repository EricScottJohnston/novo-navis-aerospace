import Head from 'next/head'
import Link from 'next/link'
import { posts } from '../../lib/posts'

export async function getStaticPaths() {
  const paths = posts.map((post) => ({
    params: { slug: post.slug }
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const post = posts.find((p) => p.slug === params.slug)
  return { props: { post } }
}

export default function Article({ post }) {
  const paragraphs = post.content.split('\n\n').filter(p => p.trim())
  const midpoint = Math.floor(paragraphs.length / 2)

  return (
    <>
      <Head>
        <title>{post.title} | Novo Navis</title>
        <meta name="description" content={post.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
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

      <div className="article-page">

        <div className="article-meta">
          <Link href="/blog" style={{color: '#c8a96e'}}>← Back to Blog</Link>
          &nbsp;&nbsp;·&nbsp;&nbsp;
          <span>{post.industry}</span>
          &nbsp;&nbsp;·&nbsp;&nbsp;
          <span>{post.date}</span>
        </div>

        <h1>{post.title}</h1>

        <div className="article-body" style={{marginTop: '2rem'}}>

          {/* First half of article */}
          {paragraphs.slice(0, midpoint).map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          {/* Mid-article CTA */}
          <div style={{
            background: '#0d1221',
            border: '1px solid #c8a96e',
            borderRadius: '6px',
            padding: '1.5rem',
            margin: '2rem 0',
            textAlign: 'center'
          }}>
            <p style={{color: '#ffffff', fontWeight: 'bold', marginBottom: '0.5rem'}}>
              Want this analysis done for your specific business?
            </p>
            <p style={{color: '#8a95aa', fontSize: '0.9rem', marginBottom: '1rem'}}>
              Our proprietary Small Psychological Model builds a custom 10-page
              AI integration report tailored to your workflows and industry.
              Delivered in 24 hours.
            </p>
            <Link href="/report" className="btn-primary">Get Your Custom Report — $29</Link>
          </div>

          {/* Second half of article */}
          {paragraphs.slice(midpoint).map((para, i) => (
            <p key={i + midpoint}>{para}</p>
          ))}

        </div>

        {/* End of article CTA */}
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
            Get a Custom Report Built for Your Business
          </h3>
          <p style={{color: '#8a95aa', fontSize: '0.95rem', marginBottom: '1.5rem'}}>
            This article covers general strategies. Your report is built specifically
            for your business — your workflows, your pain points, your industry.
            Ten pages. Delivered in 24 hours. $29.
          </p>
          <Link href="/report" className="btn-primary">Get Your Custom Report</Link>
        </div>

        <div style={{textAlign: 'center', marginTop: '2rem'}}>
          <Link href="/blog" style={{color: '#8a95aa', fontSize: '0.9rem'}}>← Back to all articles</Link>
        </div>

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