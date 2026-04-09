import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SampleAnalysis() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: '',
    workflow: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/sample', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (res.status === 429 || data.error === 'rate_limited') {
        alert('You\'ve already used your free analysis today. Come back tomorrow for another one, or get the full 10-page report below.')
        setLoading(false)
        return
      }
      if (data.analysis) {
        // Store result in sessionStorage and redirect to results page
        sessionStorage.setItem('sampleAnalysis', data.analysis)
        sessionStorage.setItem('sampleName', data.name)
        if (data.emailError) {
          console.warn('Notification email failed:', data.emailError)
        }
        router.push('/results')
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
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
        <title>Free AI Workflow Analysis | Novo Navis</title>
        <meta name="description" content="Describe one workflow problem in your business and get a free AI integration recommendation from Novo Navis. No credit card required." />
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

      <div className="report-page">

        <div style={{
          background: '#0d1a0d',
          border: '2px solid #4caf50',
          borderRadius: '8px',
          padding: '1rem 1.5rem',
          margin: '0 0 1.5rem 0',
          textAlign: 'center'
        }}>
          <p style={{color: '#4caf50', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 'bold', margin: 0}}>
            Free — No Credit Card Required
          </p>
        </div>

        <h1 style={{color: '#c8a96e', fontWeight: 'bold', textShadow: '0 2px 8px rgba(200, 169, 110, 0.4)'}}>
          Get a Free AI Analysis of Your Biggest Workflow Problem
        </h1>

        <p className="lead">
          Describe one repetitive process that's eating your time. Our AI will analyze it
          and tell you exactly which tools can automate it — and how much time you'll get back.
          Takes 30 seconds. Results delivered instantly.
        </p>

        <div style={{
          background: '#0d1221',
          border: '1px solid #1e2a45',
          borderRadius: '6px',
          padding: '1.25rem 1.5rem',
          margin: '1.5rem 0'
        }}>
          <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.75rem'}}>
            What you'll get
          </p>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.8'}}>
            <li>✓ &nbsp;Specific AI tools that solve your exact problem</li>
            <li>✓ &nbsp;Realistic time savings estimate</li>
            <li>✓ &nbsp;Approximate cost to implement</li>
            <li>✓ &nbsp;Delivered instantly — no waiting</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Your First Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John"
            />
          </div>

          <div className="form-group">
            <label>Your Email Address * (results delivered here)</label>
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
            <label>What type of business do you run? *</label>
            <input
              type="text"
              name="businessType"
              required
              value={formData.businessType}
              onChange={handleChange}
              placeholder="e.g. HVAC company, dental practice, property management, law firm"
            />
          </div>

          <div className="form-group">
            <label>Describe your biggest workflow problem *</label>
            <textarea
              name="workflow"
              required
              value={formData.workflow}
              onChange={handleChange}
              rows={5}
              placeholder="Example: Every morning I spend 90 minutes manually entering the previous day's job tickets into our billing system. We do about 15 jobs a day and each ticket has to be copied from our scheduling app into QuickBooks one by one."
            />
          </div>

          <p style={{color: '#8a95aa', fontSize: '0.85rem', marginTop: '-0.5rem', marginBottom: '1.5rem'}}>
            The more specific you are, the more useful your analysis will be.
          </p>

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: '100%',
              fontSize: '1.1rem',
              padding: '1rem',
              background: '#4caf50',
              borderColor: '#4caf50'
            }}
            disabled={loading}
          >
            {loading ? 'Analyzing your workflow...' : 'Get My Free Analysis →'}
          </button>

          <p style={{textAlign: 'center', color: '#4a5568', fontSize: '0.85rem', marginTop: '1rem'}}>
            Free. No credit card. No obligation.
            Your email will never be sold or shared.
          </p>

        </form>

        <hr className="divider" />

        <div style={{textAlign: 'center', padding: '1rem 0'}}>
          <p style={{color: '#8a95aa', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
            Ready for the full report?
          </p>
          <Link href="/#order-form" style={{color: '#c8a96e', fontWeight: 'bold'}}>
            Get the complete 10-page AI integration report — $288 →
          </Link>
        </div>

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/#order-form">Get Your Report</Link> &nbsp;·&nbsp;
          <Link href="/faq">FAQ</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link> &nbsp;·&nbsp;
          <Link href="/privacy">Privacy Policy</Link> &nbsp;·&nbsp;
          <Link href="/terms">Terms and Conditions</Link>
        </p>
      </footer>
    </>
  )
}
