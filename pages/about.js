import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  return (
    <>
      <Head>
        <title>About | Novo Navis Aerospace Operations LLC</title>
        <meta name="description" content="Novo Navis Aerospace Operations LLC is a registered, active U.S. Defense Contractor (CAGE 8GN22). We deliver the same trusted AI solutions to small businesses that we deliver to our defense customers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav>
        <Link href="/" className="nav-logo">NOVO NAVIS</Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/sample-analysis">Try It Free</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

      <div className="article-page">

        <div className="article-meta">
          <span style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase'}}>
            About Novo Navis
          </span>
        </div>

        <h1>About Novo Navis</h1>

        <div className="article-body" style={{marginTop: '2rem'}}>

          <figure style={{float: 'right', margin: '0 0 1.5rem 2rem', textAlign: 'center', maxWidth: '180px'}}>
            <Image
              src="/headshot.jpg"
              alt="Eric Johnston"
              width={180}
              height={220}
              style={{borderRadius: '8px', border: '2px solid #1e2a45', width: '100%', height: 'auto'}}
            />
            <figcaption style={{color: '#8a95aa', fontSize: '0.78rem', marginTop: '0.5rem', lineHeight: '1.4'}}>
              Eric Johnston<br />Founder / CEO
            </figcaption>
          </figure>

          <p>Novo Navis Aerospace Operations LLC is a registered, active U.S. Defense Contractor. CAGE Code <a href="https://www.dla.mil/LandandMaritime/Business/Selling/Vendor-Registration/CAGE-Code-Look-up/" target="_blank" rel="noopener noreferrer" style={{color: '#c8a96e'}}>8GN22</a> — you can verify that right now through the Defense Logistics Agency. That is not a marketing claim. It is a federal registration you can look up in thirty seconds.</p>

          <p>Operating as a defense contractor means our internal AI work is held to a standard that most commercial tools never have to meet. It has to be right. It has to reason from cause to effect, not just find patterns and make predictions. That requirement shaped how we build AI — and it is the foundation of everything we do.</p>

          <p>The AI frameworks we developed for our own operations do not stay inside defense work. We apply that same rigor to small business analysis. When you get an AI Blueprint from Novo Navis, the methodology behind it was built under the same standard we hold ourselves to as a registered defense contractor — not adapted from a consumer chatbot.</p>

          <p>The tool that runs that analysis is David — a proprietary Small Psychological Model built for our own operations and applied to small business workflow problems. David does not generate generic advice. He reasons through your specific operational reality, identifies the actual causes of your inefficiencies, and tells you exactly where AI can reduce manual work, cut costs, and improve efficiency.</p>

          <p style={{color: '#c8a96e', fontWeight: 'bold', fontSize: '1.05rem'}}>Defense-grade rigor. Small business price point. That is what makes us different.</p>

          <Link href="/david" style={{textDecoration: 'none', display: 'block'}}>
            <div style={{
              background: '#0d1221',
              border: '1px solid #1e2a45',
              borderLeft: '3px solid #c8a96e',
              borderRadius: '6px',
              padding: '1.25rem 1.5rem',
              margin: '1.5rem 0',
              cursor: 'pointer'
            }}>
              <p style={{color: '#d0d8e8', fontSize: '1rem', fontStyle: 'italic', margin: '0 0 0.75rem 0'}}>
                You wouldn't build a house without a blueprint. Don't implement AI without yours.
              </p>
              <span style={{color: '#c8a96e', fontSize: '0.9rem', fontWeight: 'bold'}}>
                See how David builds it →
              </span>
            </div>
          </Link>

          <div style={{
            background: '#0d1221',
            border: '1px solid #1e2a45',
            borderRadius: '6px',
            padding: '1.5rem 2rem',
            margin: '2.5rem 0',
          }}>
            <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Company Details</p>
            <p style={{color: '#b0b8cc', marginBottom: '0.4rem'}}>Legal Name: Novo Navis Aerospace Operations LLC</p>
            <p style={{color: '#b0b8cc', marginBottom: '0.4rem'}}>
              CAGE Code:{' '}
              <a
                href="https://www.dla.mil/LandandMaritime/Business/Selling/Vendor-Registration/CAGE-Code-Look-up/"
                target="_blank"
                rel="noopener noreferrer"
                style={{color: '#c8a96e'}}
              >
                8GN22
              </a>
            </p>
            <p style={{color: '#b0b8cc', marginBottom: '0.4rem'}}>Location: Phoenix, Arizona Area</p>
            <p style={{color: '#b0b8cc', marginBottom: '1rem'}}>Registration: Registered Federal Contractor with the U.S. Government</p>
            <p style={{color: '#8a95aa', fontSize: '0.85rem', margin: 0}}>
              Novo Navis is a registered federal contractor with the U.S. government. Our CAGE Code (8GN22) can be verified directly through the{' '}
              <a
                href="https://www.dla.mil/LandandMaritime/Business/Selling/Vendor-Registration/CAGE-Code-Look-up/"
                target="_blank"
                rel="noopener noreferrer"
                style={{color: '#c8a96e'}}
              >
                Defense Logistics Agency CAGE Code lookup service →
              </a>
            </p>
          </div>

          {/* ERIC JOHNSTON CREDENTIALS */}
          <div style={{
            background: '#0a0f1a',
            border: '1px solid #1e2a45',
            borderRadius: '6px',
            padding: '1.25rem 1.5rem',
            margin: '0 0 1.75rem 0'
          }}>
            <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.3rem'}}>
              Who Built the System
            </p>
            <p style={{color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.6', margin: 0}}>
              Eric Johnston is a Principal Investigator on active U.S. Department of Defense AI research projects. The causal AI frameworks developed for defense-grade applications power every Novo Navis report — applied to the operational realities of small and mid-size businesses.
            </p>
          </div>

          {/* REDDIT */}
          <div style={{
            background: '#0a0f1a',
            border: '1px solid #1e2a45',
            borderRadius: '6px',
            padding: '1.25rem 1.5rem',
            margin: '0 0 1.75rem 0'
          }}>
            <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.75rem'}}>
              Find Us on Reddit
            </p>
            <p style={{color: '#8a95aa', fontSize: '0.88rem', marginBottom: '0.75rem'}}>
              We're active in the AI for Small Business community. Come see what we're talking about.
            </p>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <li>
                <a href="https://www.reddit.com/r/AiForSmallBusiness/comments/1snruki/i_built_a_causal_ai_system_for_small_businesses/" target="_blank" rel="noopener noreferrer" style={{color: '#c8a96e', fontSize: '0.92rem'}}>
                  I built a causal AI system for small businesses →
                </a>
              </li>
              <li>
                <a href="https://www.reddit.com/r/AiForSmallBusiness/comments/1shq87i/ai_got_gimmecky_real_fast/" target="_blank" rel="noopener noreferrer" style={{color: '#c8a96e', fontSize: '0.92rem'}}>
                  AI got gimmicky real fast →
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div style={{
            background: '#0d1221',
            border: '1px solid #1e2a45',
            borderRadius: '6px',
            padding: '1.25rem 1.5rem',
            margin: '0 0 1.75rem 0'
          }}>
            <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.75rem'}}>
              Contact
            </p>
            <p style={{color: '#d0d8e8', marginBottom: '0.4rem'}}>
              Phone: <a href="tel:6234289308" style={{color: '#c8a96e', fontWeight: 'bold'}}>(623) 428-9308</a>
            </p>
            <p style={{color: '#d0d8e8', margin: 0}}>
              Email: <a href="mailto:support@novonavis.com" style={{color: '#c8a96e'}}>support@novonavis.com</a>
            </p>
          </div>

          <p style={{textAlign: 'center', fontSize: '1.2rem', color: '#c8a96e', fontStyle: 'italic', marginTop: '2rem'}}>
            Fidelis Diligentia — Faithful Diligence.
          </p>

        </div>

        <hr className="divider" />

        <div style={{textAlign: 'center', padding: '2rem 0'}}>
          <div className="section-title" style={{marginBottom: '0.8rem'}}>Ready to See What AI Can Do for Your Business?</div>
          <p style={{color: '#8a95aa', marginBottom: '1.5rem'}}>
            One custom report. Built for your business. Delivered within 24 hours.
          </p>
          <Link href="/#order-form" className="btn-primary">Get Your AI Blueprint — $199 →</Link>
        </div>

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/sample-analysis">Try It Free</Link> &nbsp;·&nbsp;
          <Link href="/#order-form">Get Your AI Blueprint</Link> &nbsp;·&nbsp;
          <Link href="/faq">FAQ</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link>
        </p>
      </footer>
    </>
  )
}
