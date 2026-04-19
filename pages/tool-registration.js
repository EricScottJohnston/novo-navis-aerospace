import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function ToolRegistration() {
  const [loading, setLoading] = useState(false)
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [formData, setFormData] = useState({
    developerName: '',
    email: '',
    toolName: '',
    toolUrl: '',
    description: '',
    workflows: '',
    industries: '',
    pricing: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!agreedTerms) {
      alert('You must agree to the AI Developer Terms and Conditions to continue.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/tool-checkout', {
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
        <title>AI Tool Registration | Novo Navis</title>
        <meta name="description" content="Register your AI tool in the Novo Navis recommendation database. Reach small business owners actively looking for workflow automation solutions." />
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

      <div className="report-page">

        <h1 style={{color: '#c8a96e', fontWeight: 'bold', textShadow: '0 2px 8px rgba(200, 169, 110, 0.4)'}}>
          AI Tool Recommendation Registration
        </h1>

        <p className="lead">
          Register your tool in the Novo Navis recommendation database. When our analysis
          identifies a workflow match for a small business customer, your tool will be
          considered alongside others in your category.
        </p>

        <div style={{
          background: '#0d1221',
          border: '1px solid #1e2a45',
          borderLeft: '3px solid #c8a96e',
          borderRadius: '6px',
          padding: '1.25rem 1.5rem',
          margin: '1.5rem 0'
        }}>
          <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.5rem'}}>
            How it works
          </p>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, color: '#d0d8e8', fontSize: '0.95rem', lineHeight: '1.9'}}>
            <li>✓ &nbsp;Your tool is added to our active recommendation database</li>
            <li>✓ &nbsp;Our analysis engine checks registered tools for workflow matches on every report</li>
            <li>✓ &nbsp;Recommendations are made on fit only — registration is not a guarantee of inclusion</li>
            <li>✓ &nbsp;Registration is valid for 3 months from the date of payment</li>
            <li>✓ &nbsp;This is not advertising — we will never recommend a tool that doesn't fit</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Developer or Company Name *</label>
            <input
              type="text"
              name="developerName"
              required
              value={formData.developerName}
              onChange={handleChange}
              placeholder="Acme AI Inc."
            />
          </div>

          <div className="form-group">
            <label>Contact Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@yourcompany.com"
            />
          </div>

          <div className="form-group">
            <label>Tool Name *</label>
            <input
              type="text"
              name="toolName"
              required
              value={formData.toolName}
              onChange={handleChange}
              placeholder="e.g. AutoInvoice Pro"
            />
          </div>

          <div className="form-group">
            <label>Tool Website URL *</label>
            <input
              type="url"
              name="toolUrl"
              required
              value={formData.toolUrl}
              onChange={handleChange}
              placeholder="https://yourtool.com"
            />
          </div>

          <div className="form-group">
            <label>What does your tool do? *</label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe what your tool does in plain English. What problem does it solve? What does it automate or improve?"
            />
          </div>

          <div className="form-group">
            <label>What workflows does it address? *</label>
            <textarea
              name="workflows"
              required
              value={formData.workflows}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. Invoice generation, appointment scheduling, customer follow-up, inventory tracking, payroll processing"
            />
          </div>

          <div className="form-group">
            <label>What industries does it serve? *</label>
            <textarea
              name="industries"
              required
              value={formData.industries}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. HVAC, dental practices, restaurants, law firms, construction, property management"
            />
          </div>

          <div className="form-group">
            <label>Pricing *</label>
            <textarea
              name="pricing"
              required
              value={formData.pricing}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. Free tier available. Starter plan $19/month. Professional $199/month. Enterprise pricing on request."
            />
          </div>

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
                <Link href="/developer-terms" style={{color: '#c8a96e'}}>AI Developer Terms and Conditions</Link>
                {' '}and understand that registration does not guarantee my tool will be recommended, and that all recommendations are made solely on the basis of workflow fit.
              </span>
            </label>
          </div>

          <div style={{
            background: '#0f0d00',
            border: '2px solid #c8a96e',
            borderRadius: '8px',
            padding: '1.25rem 1.5rem',
            margin: '1.5rem 0',
            textAlign: 'center'
          }}>
            <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.25rem'}}>
              Registration Fee
            </p>
            <span style={{color: '#c8a96e', fontSize: '2.5rem', fontWeight: 'bold'}}>$250</span>
            <p style={{color: '#8a95aa', fontSize: '0.85rem', margin: '0.25rem 0 0 0'}}>
              Valid for 3 months from date of payment.
            </p>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: '100%',
              fontSize: '1.1rem',
              padding: '1rem',
              opacity: agreedTerms ? 1 : 0.5,
              cursor: agreedTerms ? 'pointer' : 'not-allowed',
              background: '#4caf50',
              borderColor: '#4caf50'
            }}
            disabled={loading || !agreedTerms}
          >
            {loading ? 'Redirecting to Checkout...' : 'Register My Tool — $250'}
          </button>

          <p style={{textAlign: 'center', color: '#8a95aa', fontSize: '0.85rem', marginTop: '1rem'}}>
            Secured by Stripe. We will never sell or share your information.{' '}
            <Link href="/privacy" style={{color: '#c8a96e'}}>Privacy Policy →</Link>
          </p>

        </form>

        <hr className="divider" />

        <div style={{textAlign: 'center', padding: '1rem 0'}}>
          <p style={{color: '#8a95aa', fontSize: '0.9rem', marginBottom: '0.5rem'}}>
            Questions about registration?
          </p>
          <a href="mailto:support@novonavis.com" style={{color: '#c8a96e', fontWeight: 'bold'}}>
            support@novonavis.com
          </a>
        </div>

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/sample-analysis">Try It Free</Link> &nbsp;·&nbsp;
          <Link href="/#order-form">Get Your AI Blueprint</Link> &nbsp;·&nbsp;
          <Link href="/faq">FAQ</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link> &nbsp;·&nbsp;
          <Link href="/privacy">Privacy Policy</Link> &nbsp;·&nbsp;
          <Link href="/terms">Terms and Conditions</Link>
        </p>
      </footer>
    </>
  )
}
