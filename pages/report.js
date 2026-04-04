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
        <h1>Get Your Custom AI Integration Report</h1>
        <p className="lead">
          Tell us about your business. Our proprietary Small Psychological Model —
          not a chatbot, not a template — will build a custom 10-page AI integration
          roadmap specific to your workflows and pain points. Delivered to your inbox
          within 24 hours.
        </p>

        <div className="price-box">
          <div className="price">$29</div>
          <div className="price-desc">One report. Your business. 24-hour delivery. Money back guarantee.</div>
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
            {loading ? 'Redirecting to Payment...' : 'Continue to Payment — $29'}
          </button>

          <p style={{textAlign: 'center', color: '#4a5568', fontSize: '0.85rem', marginTop: '1rem'}}>
            Secured by Stripe. Your report will be delivered to your email within 24 hours.
            Not satisfied? Full refund, no questions asked.
          </p>

        </form>
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