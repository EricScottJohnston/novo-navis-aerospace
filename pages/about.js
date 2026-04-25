import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'

export default function About() {
  const router = useRouter()
  const embed = router.query.embed === '1'
  return (
    <>
      <Head>
        <title>About | Novo Navis</title>
        <meta name="description" content="Novo Navis delivers enterprise-level AI consulting at a fraction of the price. The same rigor Fortune 500 companies pay consulting firms tens of thousands for — built for your business." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {!embed && (
        <nav>
          <Link href="/" className="nav-logo">NOVO NAVIS</Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </nav>
      )}

      <div className="article-page">

        <div className="article-meta">
          <span style={{color: GOLD, fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase'}}>
            About Novo Navis
          </span>
        </div>

        <h1 style={{marginBottom: '0.5rem'}}>Enterprise-level AI consulting. Without the enterprise price tag.</h1>
        <p style={{color: '#6b7a99', fontSize: '1rem', lineHeight: '1.7', marginBottom: '2rem'}}>
          Large companies pay consulting firms tens of thousands of dollars to answer the same questions you have about AI. We deliver that same quality of analysis — built around your specific business, your workflows, your budget — starting at $49.
        </p>

        <div className="article-body">

          <p>
            The difference between a business that implements AI well and one that wastes money on the wrong tools usually comes down to one thing: access to real expertise. Enterprise companies have it. They hire consultants, run internal pilots, and build implementation roadmaps. Everyone else is left searching Google and hoping the first result is actually the right answer.
          </p>

          <p>
            It usually isn't. The tools that rank highest have the biggest marketing budgets — not the best fit for your situation. We know the full landscape. When we build your AI Blueprint, we're looking across every option — the household names and the ones that don't advertise — and recommending what actually fits your workflows, your team, and your budget. That's what a consultant does. That's what we do.
          </p>

          {/* CUSTOMER VOICES */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', margin: '2rem 0'}}>
            <div style={{background: '#0d1221', border: '1px solid #1e2a45', borderLeft: `3px solid ${GOLD}`, borderRadius: '6px', padding: '1.1rem 1.25rem'}}>
              <p style={{color: GOLD, fontWeight: 'bold', fontSize: '0.88rem', margin: '0 0 0.4rem'}}>★★★★★ — Brian T.</p>
              <p style={{color: '#d0d8e8', fontSize: '0.9rem', lineHeight: '1.7', margin: 0}}>
                "When it comes to AI, there is no best technology, there is just best for you. I literally scoured the internet for weeks and never came close to getting the answer my company needed to integrate AI. Novo Navis gave us the entire answer."
              </p>
            </div>
            <div style={{background: '#0d1221', border: '1px solid #1e2a45', borderLeft: `3px solid ${GOLD}`, borderRadius: '6px', padding: '1.1rem 1.25rem'}}>
              <p style={{color: GOLD, fontWeight: 'bold', fontSize: '0.88rem', margin: '0 0 0.4rem'}}>★★★★ — Kay W.</p>
              <p style={{color: '#d0d8e8', fontSize: '0.9rem', lineHeight: '1.7', margin: 0}}>
                "I run a small property management company that handles online rentals. I couldn't find a cost effective solution or product for my budget. Novo Navis uncovered AI tools for me that I never would have found on my own."
              </p>
            </div>
          </div>

          {/* WHO ERIC IS */}
          <figure style={{float: 'right', margin: '0 0 1.5rem 2rem', textAlign: 'center', maxWidth: '160px'}}>
            <Image
              src="/headshot.jpg"
              alt="Eric Johnston"
              width={160}
              height={196}
              style={{borderRadius: '8px', border: '2px solid #1e2a45', width: '100%', height: 'auto'}}
            />
            <figcaption style={{color: '#8a95aa', fontSize: '0.78rem', marginTop: '0.5rem', lineHeight: '1.4'}}>
              Eric Johnston<br />Founder / CEO
            </figcaption>
          </figure>

          <p>
            My name is Eric Johnston. I built Novo Navis because the gap between enterprise AI consulting and everyone else is absurd. The analysis that helps a large company implement AI correctly isn't complicated — it's just expensive to access. We close that gap.
          </p>

          <p>
            The system that builds your blueprint — David — was developed under the same standards I hold myself to as an active AI researcher working on Department of Defense projects. It doesn't generate generic advice. It reasons through your specific operational reality, identifies the actual causes of your inefficiencies, and tells you exactly where AI can help, what it will cost, and what the realistic return looks like.
          </p>

          <p style={{color: GOLD, fontWeight: 'bold', fontSize: '1.05rem'}}>
            We're your consultant — not their marketing agency.
          </p>

          {/* CONTACT */}
          <div style={{
            background: '#0d1221',
            border: '1px solid #1e2a45',
            borderRadius: '6px',
            padding: '1.25rem 1.5rem',
            margin: '1.75rem 0'
          }}>
            <p style={{color: GOLD, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.75rem'}}>
              Talk to Us Before You Buy
            </p>
            <p style={{color: '#d0d8e8', marginBottom: '0.4rem'}}>
              Phone: <a href="tel:6234289308" style={{color: GOLD, fontWeight: 'bold'}}>(623) 428-9308</a>
            </p>
            <p style={{color: '#d0d8e8', margin: 0}}>
              Email: <a href="mailto:support@novonavis.com" style={{color: GOLD}}>support@novonavis.com</a>
            </p>
          </div>

          {/* CREDENTIALS */}
          <div style={{
            background: '#0a0f1a',
            border: '1px solid #1e2a45',
            borderRadius: '6px',
            padding: '1.25rem 1.5rem',
            margin: '0 0 1rem 0'
          }}>
            <p style={{color: GOLD, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.3rem'}}>
              For Those Who Want to Verify
            </p>
            <p style={{color: '#d0d8e8', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 0.75rem'}}>
              Novo Navis is a registered, active U.S. Defense Contractor. Eric Johnston is a Principal Investigator on active U.S. Department of Defense AI research projects. The methodology behind every blueprint was built under defense-grade standards — not adapted from a consumer chatbot.
            </p>
            <p style={{color: '#b0b8cc', fontSize: '0.85rem', margin: '0 0 0.3rem'}}>Legal Name: Novo Navis Aerospace Operations LLC</p>
            <p style={{color: '#b0b8cc', fontSize: '0.85rem', margin: '0 0 0.3rem'}}>Location: Phoenix, Arizona Area</p>
            <p style={{color: '#b0b8cc', fontSize: '0.85rem', margin: 0}}>
              CAGE Code:{' '}
              <a href="https://www.dla.mil/LandandMaritime/Business/Selling/Vendor-Registration/CAGE-Code-Look-up/" target="_blank" rel="noopener noreferrer" style={{color: GOLD}}>
                8GN22 — verify here →
              </a>
            </p>
          </div>

          {/* REDDIT */}
          <div style={{
            background: '#0a0f1a',
            border: '1px solid #1e2a45',
            borderRadius: '6px',
            padding: '1.25rem 1.5rem',
            margin: '1rem 0 1.75rem 0'
          }}>
            <p style={{color: GOLD, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.5rem'}}>
              Find Us on Reddit
            </p>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <li>
                <a href="https://www.reddit.com/r/AiForSmallBusiness/comments/1snruki/i_built_a_causal_ai_system_for_small_businesses/" target="_blank" rel="noopener noreferrer" style={{color: GOLD, fontSize: '0.92rem'}}>
                  I built a causal AI system for small businesses →
                </a>
              </li>
              <li>
                <a href="https://www.reddit.com/r/AiForSmallBusiness/comments/1shq87i/ai_got_gimmecky_real_fast/" target="_blank" rel="noopener noreferrer" style={{color: GOLD, fontSize: '0.92rem'}}>
                  AI got gimmicky real fast →
                </a>
              </li>
            </ul>
          </div>

          <p style={{textAlign: 'center', fontSize: '1.1rem', color: GOLD, fontStyle: 'italic', marginTop: '1.5rem'}}>
            Fidelis Diligentia — Faithful Diligence.
          </p>

        </div>

        {embed ? (
          <div style={{textAlign: 'center', padding: '2rem 0 1rem'}}>
            <button
              onClick={() => window.parent.postMessage('close-nav-modal', '*')}
              style={{
                background: NAVY, border: 'none', borderRadius: '8px',
                color: '#fff', fontWeight: 'bold', fontSize: '1rem',
                padding: '0.85rem 2rem', cursor: 'pointer',
              }}
            >
              Got it — back to the quiz
            </button>
          </div>
        ) : (
          <>
            <hr className="divider" />
            <div style={{textAlign: 'center', padding: '2rem 0'}}>
              <div className="section-title" style={{marginBottom: '0.8rem'}}>Ready to See What AI Can Do for Your Business?</div>
              <p style={{color: '#8a95aa', marginBottom: '1.5rem'}}>
                One custom report. Built for your business. Delivered in real time.
              </p>
              <Link href="/#order-form" className="btn-primary">Get Your AI Blueprint — $199 →</Link>
            </div>
          </>
        )}

      </div>

      {!embed && (
        <footer>
          <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
          <p style={{marginTop: '0.5rem'}}>
            <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
            <Link href="/#order-form">Get Your AI Blueprint</Link> &nbsp;·&nbsp;
            <Link href="/faq">FAQ</Link> &nbsp;·&nbsp;
            <Link href="/about">About</Link>
          </p>
        </footer>
      )}
    </>
  )
}
