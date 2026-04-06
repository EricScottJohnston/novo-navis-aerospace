import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Report() {
  const [loading, setLoading] = useState(false)
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
    <source src="https://studio.creativefabrica.com/ai-video-generator/3BzfE1JaMCTFBqM5Dcqx9h9uTPE" type='video/mp4' />
  </video>
</div>
<h1>Get Your Custom AI Integration Report</h1>
        <p className="lead">
          Tell us about your business. Our proprietary Small Psychological Model
           will build a custom 10-page AI integration
          roadmap specific to your workflows and pain points. Delivered to your inbox
          within 24 hours.
        </p>

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

        <div className="price-box">
          <div className="price">$97</div>
          <div className="price-desc">One report. Your business. 24-hour delivery.</div>
          <p style={{marginTop: '1rem', color: '#8a95aa', fontSize: '0.85rem'}}>
            Want to talk to a real person before you buy?{' '}
            <a href="tel:6234289308" style={{color: '#c8a96e', fontWeight: 'bold'}}>(623) 428-9308</a>
          </p>
        </div>

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

          <button
            type="submit"
            className="btn-primary"
            style={{width: '100%', fontSize: '1.1rem', padding: '1rem'}}
            disabled={loading}
          >
            {loading ? 'Redirecting to Payment...' : 'Continue to Payment — $97'}
          </button>

          <p style={{textAlign: 'center', color: '#4a5568', fontSize: '0.85rem', marginTop: '1rem'}}>
            Secured by Stripe. Your report will be delivered to your email within 24 hours.
            Not satisfied? Full refund, no questions asked.
          </p>

        </form>

        <hr className="divider" />

        <div style={{textAlign: 'center', padding: '1rem 0'}}>
          <p style={{color: '#8a95aa', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
            Want to talk to a real person before you buy?
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
          <Link href="/about">About</Link>
        </p>
      </footer>
    </>
  )
}