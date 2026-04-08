import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Report() {
  const [loading, setLoading] = useState(false)
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    industry: '',
    employees: '',
    businessDescription: '',
    process1: '',
    process2: '',
    process3: '',
    goal: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!agreedTerms) {
      alert('You must agree to the Terms and Conditions to continue.')
      return
    }
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Something went wrong. Please try again.')
        setLoading(false)
      }
    } catch (err) {
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js?pixel_id=a2_is5chzhhi73u",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','a2_is5chzhhi73u');rdt('track', 'PageVisit');`
          }}
        />
        <title>Get Your Custom AI Report | Novo Navis</title>
        <meta name="description" content="Tell us about your business and receive a custom 10-page AI integration report built by our proprietary Small Psychological Model. Delivered in 24 hours." />
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

      <div className="report-page">

        <div style={{marginBottom: '1.5rem'}}>
          <h2 style={{textAlign: 'center', color: '#c8a96e', fontSize: '1.3rem', marginBottom: '1rem', marginTop: '1rem'}}>
            If You're Not Using AI Now, You're Already Behind
          </h2>
          <video
            controls
            loop
            playsInline
            onPlay={() => {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'video_play', {
                  event_category: 'engagement',
                  event_label: 'report_page_video'
                })
              }
            }}
            style={{width: '100%', maxWidth: '500px', display: 'block', margin: '0 auto', borderRadius: '6px', marginBottom: '1.5rem'}}
          >
            <source src="https://res.cloudinary.com/dqv9va6ta/video/upload/v1775497102/video_3_g6b6kh.mp4" type="video/mp4" />
          </video>
        </div>

        {/* FOUNDER CREDENTIAL */}
        <div style={{
          background: '#0a0f1a',
          border: '1px solid #1e2a45',
          borderRadius: '6px',
          padding: '1.25rem 1.5rem',
          margin: '0 0 1.75rem 0',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem'
        }}>
          <div style={{flexShrink: 0, width: '44px', height: '44px', borderRadius: '50%', background: '#1e2a45', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'}}>
            EJ
          </div>
          <div>
            <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.3rem'}}>
              Who builds your report
            </p>
            <p style={{color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.6', margin: 0}}>
              <strong>Eric Johnston</strong> is a Principal Investigator on active U.S. Department of Defense AI research projects.
              The same analytical frameworks used in defense-grade AI assessments are what power every Novo Navis report —
              applied to the operational realities of small and mid-size businesses.
            </p>
          </div>
        </div>

        <h1>Get Your Custom AI Integration Report</h1>
        <p className="lead">
          Tell us about your business. Our proprietary Small Psychological Model
          analyzes your specific workflows to identify, on average, <strong style={{color: '#c8a96e'}}>8–12 hours per week
          of manual work that can be automated</strong>. You'll receive a 10-page report showing
          exactly which processes to automate, which AI tools fit your budget and tech stack,
          and a prioritized 90-day implementation roadmap — delivered to your inbox within 24 hours.
        </p>

        {/* WHAT YOU'LL DISCOVER */}
        <div style={{
          background: '#0d1221',
          border: '1px solid #1e2a45',
          borderRadius: '6px',
          padding: '1.25rem 1.5rem',
          margin: '1.5rem 0'
        }}>
          <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.75rem'}}>
            What your report includes
          </p>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.8'}}>
            <li>✓ &nbsp;Your top 3–5 automatable workflows, ranked by estimated time savings</li>
            <li>✓ &nbsp;Specific AI tools matched to each workflow and your budget</li>
            <li>✓ &nbsp;A prioritized 90-day implementation roadmap</li>
            <li>✓ &nbsp;An honest ROI estimate for your specific business size and industry</li>
            <li>✓ &nbsp;Human review by an AI consultant before delivery</li>
          </ul>
        </div>

        {/* METHODOLOGY */}
        <div style={{
          background: '#0a0f1a',
          border: '1px solid #1e2a45',
          borderRadius: '6px',
          padding: '1.25rem 1.5rem',
          margin: '1.5rem 0'
        }}>
          <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.5rem'}}>
            How it works
          </p>
          <p style={{color: '#8a95aa', fontSize: '0.9rem', lineHeight: '1.7', margin: 0}}>
            Our Small Psychological Model (SPM) was developed from analysis of workflows across
            12 industries. It identifies patterns in manual, repetitive tasks that match known AI
            automation profiles, then ranks them by estimated time savings and implementation complexity.
            Every report is reviewed by a human AI consultant before it reaches your inbox.
          </p>
        </div>

        {/* SPECIFIC CUSTOMER RESULT */}
        <div style={{
          background: '#0d1221',
          border: '1px solid #1e2a45',
          borderLeft: '3px solid #c8a96e',
          borderRadius: '6px',
          padding: '1.25rem 1.5rem',
          margin: '1.5rem 0'
        }}>
          <p style={{color: '#8a95aa', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem'}}>
            Example outcome
          </p>
          <p style={{color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.7', margin: 0}}>
            A Phoenix-area HVAC company with 8 employees identified <strong>14 hours per week</strong> of
            automatable scheduling and follow-up work — time their office manager could redirect to
            customer relationships and upsells. Implementation cost: $0. Tools used: free tiers of
            two existing platforms they already paid for.
          </p>
        </div>

        <div style={{
          background: '#0d1221',
          border: '1px solid #1e2a45',
          borderRadius: '6px',
          padding: '1rem 1.5rem',
          margin: '1.5rem 0',
          textAlign: 'center'
        }}>
          <p style={{color: '#8a95aa', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
            Want to see what a real report looks like before you buy?
          </p>
          <Link href="/sample" style={{color: '#c8a96e', fontWeight: 'bold'}}>
            Read a real report for a plumbing company →
          </Link>
        </div>

        {/* PROMOTIONAL OFFER BOX */}
        <div style={{
          background: '#0d1a0d',
          border: '2px solid #4caf50',
          borderRadius: '8px',
          padding: '1.5rem',
          margin: '1.5rem 0',
          textAlign: 'center'
        }}>
          <p style={{color: '#4caf50', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 'bold'}}>
            Limited Promotional Offer
          </p>
          <p style={{color: '#ffffff', fontSize: '1.1rem', marginBottom: '0.75rem'}}>
            We are giving away <strong>25 free reports</strong> as part of our launch promotion.
          </p>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem'}}>
            <span style={{color: '#8a95aa', fontSize: '1.5rem', textDecoration: 'line-through'}}>$97</span>
            <span style={{color: '#4caf50', fontSize: '2rem', fontWeight: 'bold'}}>FREE</span>
          </div>
          <p style={{color: '#8a95aa', fontSize: '0.85rem', marginBottom: '0.5rem'}}>
            Use promo code at checkout:
          </p>
          <p style={{
            background: '#1a2a1a',
            border: '1px solid #4caf50',
            borderRadius: '4px',
            padding: '0.5rem 1rem',
            color: '#4caf50',
            fontFamily: 'monospace',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            display: 'inline-block',
            marginBottom: '0.75rem',
            letterSpacing: '0.1em'
          }}>
            TPREVIEW
          </p>
          <p style={{color: '#8a95aa', fontSize: '0.8rem'}}>
            Spots remaining: <strong style={{color: '#ffffff'}}>14 of 25</strong> — First come, first served.
          </p>
        </div>

        <div className="price-box">
          <div style={{textDecoration: 'line-through', color: '#8a95aa', fontSize: '1.5rem', marginBottom: '0.25rem'}}>$97</div>
          <div className="price" style={{color: '#4caf50'}}>FREE with code TPREVIEW</div>
          <div className="price-desc">One report. Your business. 24-hour delivery.</div>
          <p style={{marginTop: '1rem', color: '#8a95aa', fontSize: '0.85rem'}}>
            Want to talk to a real person before you claim your report?{' '}
            <a href="tel:6234289308" style={{color: '#c8a96e', fontWeight: 'bold'}}>(623) 428-9308</a>
          </p>
        </div>

        <p style={{color: '#8a95aa', fontSize: '0.8rem', textAlign: 'center', marginBottom: '1rem'}}>
          Novo Navis will never sell or share your information.{' '}
          <Link href="/privacy" style={{color: '#c8a96e'}}>Read our Privacy Policy →</Link>
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Your Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Smith"
            />
          </div>

          <div className="form-group">
            <label>Your Email Address * (report delivered here)</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@yourbusiness.com"
            />
          </div>

          <div className="form-group">
            <label>Business Name *</label>
            <input
              type="text"
              name="business"
              required
              value={formData.business}
              onChange={handleChange}
              placeholder="Smith Plumbing LLC"
            />
          </div>

          <div className="form-group">
            <label>Industry *</label>
            <select
              name="industry"
              required
              value={formData.industry}
              onChange={handleChange}
            >
              <option value="">Select your industry</option>
              <option value="HVAC / Plumbing / Electrical">HVAC / Plumbing / Electrical</option>
              <option value="Landscaping / Field Services">Landscaping / Field Services</option>
              <option value="Legal Services">Legal Services</option>
              <option value="Accounting / Finance">Accounting / Finance</option>
              <option value="Dental / Chiropractic / Healthcare">Dental / Chiropractic / Healthcare</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Property Management">Property Management</option>
              <option value="Retail / E-commerce">Retail / E-commerce</option>
              <option value="Restaurant / Hospitality">Restaurant / Hospitality</option>
              <option value="Consulting">Consulting</option>
              <option value="Construction">Construction</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Number of Employees</label>
            <select
              name="employees"
              value={formData.employees}
              onChange={handleChange}
            >
              <option value="">Select range</option>
              <option value="Just me">Just me</option>
              <option value="2-5">2 to 5</option>
              <option value="6-15">6 to 15</option>
              <option value="16-50">16 to 50</option>
              <option value="50+">50 or more</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tell us about your business — what it does, who it serves, and anything you think we should know *</label>
            <textarea
              name="businessDescription"
              required
              value={formData.businessDescription}
              onChange={handleChange}
              placeholder="Example: We are a family owned plumbing company serving the Phoenix metro area. We have 3 trucks and handle both residential and commercial work. We do about 15 jobs per week and our busiest season is summer."
            />
          </div>

          <hr className="divider" />

          <p style={{color: '#8a95aa', fontSize: '0.95rem', marginBottom: '1.5rem'}}>
            Now tell us about your biggest operational pain points.
            The more specific you are, the more valuable your report will be.
          </p>

          <div className="form-group">
            <label>Most Repetitive Task #1 — What is it and how long does it take per week? *</label>
            <textarea
              name="process1"
              required
              value={formData.process1}
              onChange={handleChange}
              placeholder="Example: Our office manager manually enters every job request into a spreadsheet, then texts the crew lead to check availability. Takes about 2 hours a day."
            />
          </div>

          <div className="form-group">
            <label>Most Repetitive Task #2 — What is it and how long does it take per week?</label>
            <textarea
              name="process2"
              value={formData.process2}
              onChange={handleChange}
              placeholder="Example: We create invoices manually in Word at the end of every job. Takes 20-30 minutes per invoice."
            />
          </div>

          <div className="form-group">
            <label>Most Repetitive Task #3 — What is it and how long does it take per week?</label>
            <textarea
              name="process3"
              value={formData.process3}
              onChange={handleChange}
              placeholder="Example: Following up with leads who haven't responded. We do this manually by email and it often falls through the cracks."
            />
          </div>

          <div className="form-group">
            <label>What is the single biggest operational problem in your business right now? *</label>
            <textarea
              name="goal"
              required
              value={formData.goal}
              onChange={handleChange}
              placeholder="Example: We're losing jobs because we're too slow to respond to new inquiries. By the time we follow up, they've already hired someone else."
            />
          </div>

          {/* TERMS AND CONDITIONS CHECKBOX */}
          <div style={{
            background: '#0d1221',
            border: '1px solid #1e2a45',
            borderRadius: '6px',
            padding: '1rem 1.5rem',
            margin: '1.5rem 0'
          }}>
            <label style={{display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer'}}>
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                style={{marginTop: '3px', width: '18px', height: '18px', flexShrink: 0, cursor: 'pointer'}}
              />
              <span style={{color: '#ffffff', fontSize: '0.9rem', lineHeight: '1.5'}}>
                I agree to the{' '}
                <Link href="/terms" style={{color: '#c8a96e'}}>Terms and Conditions</Link>
                {' '}and understand this report is provided for informational purposes only. Novo Navis is not liable for any business decisions made based on this report.
              </span>
            </label>
          </div>

          {/* TRUST SIGNALS ABOVE SUBMIT */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            {['🔒 TLS encrypted', '🚫 Never sold or shared', '✅ 100% satisfaction guarantee'].map(label => (
              <span key={label} style={{
                background: '#0d1221',
                border: '1px solid #1e2a45',
                borderRadius: '4px',
                padding: '0.3rem 0.75rem',
                color: '#8a95aa',
                fontSize: '0.8rem'
              }}>{label}</span>
            ))}
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: '100%',
              fontSize: '1.1rem',
              padding: '1rem',
              opacity: agreedTerms ? 1 : 0.5,
              cursor: agreedTerms ? 'pointer' : 'not-allowed'
            }}
            disabled={loading || !agreedTerms}
          >
            {loading ? 'Redirecting to Checkout...' : 'Claim My Free Report — Use Code TPREVIEW at Checkout'}
          </button>

          <p style={{textAlign: 'center', color: '#4a5568', fontSize: '0.85rem', marginTop: '1rem'}}>
            Secured by Stripe. Enter promo code TPREVIEW at checkout for free access.
            Your report will be delivered to your email within 24 hours.
            Not satisfied? We'll refund you in full — no questions asked.
          </p>

        </form>

        <hr className="divider" />

        <div style={{textAlign: 'center', padding: '1rem 0'}}>
          <p style={{color: '#8a95aa', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
            Want to talk to a real person before you claim your report?
          </p>
          <p style={{color: '#ffffff', fontSize: '1rem', marginBottom: '0.3rem'}}>
            Call us: <a href="tel:6234289308" style={{color: '#c8a96e', fontWeight: 'bold'}}>(623) 428-9308</a>
          </p>
          <p style={{color: '#8a95aa', fontSize: '0.85rem'}}>
            Or email: <a href="mailto:support@novonavis.com" style={{color: '#c8a96e'}}>support@novonavis.com</a>
          </p>
        </div>

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/report">Get Your Report</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link> &nbsp;·&nbsp;
          <Link href="/privacy">Privacy Policy</Link> &nbsp;·&nbsp;
          <Link href="/terms">Terms and Conditions</Link>
        </p>
      </footer>
    </>
  )
}