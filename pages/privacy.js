import Head from 'next/head'
import Link from 'next/link'

export default function privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Novo Navis</title>
        <meta name="description" content="Novo Navis Privacy Policy — how we collect, use, and protect your business information." />
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

      <div className="article-page">

        <h1>Privacy Policy</h1>
        <p style={{color: '#8a95aa', fontSize: '0.85rem', marginBottom: '2rem'}}>
          Effective Date: April 7, 2026 · Novo Navis Aerospace Operations LLC
        </p>

        <div className="article-body">

          <h2 style={{color: '#c8a96e', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.8rem'}}>Our Commitment to Your Privacy</h2>
          <p>Novo Navis Aerospace Operations LLC ("Novo Navis," "we," "us," or "our") is committed to protecting the privacy and confidentiality of your business information. This Privacy Policy explains how we collect, use, and protect information you provide to us when using our AI integration report service at novonavis.com.</p>
          <p>We will never sell, rent, lease, trade, or otherwise disseminate your personal or business information to any third party for any reason. Your information is used solely to deliver the service you have requested.</p>

          <h2 style={{color: '#c8a96e', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.8rem'}}>Information We Collect</h2>
          <p>When you request a custom AI integration report, we collect the following information through our intake form:</p>
          <p>Contact information including your name and email address. Business information including your business name, industry, and number of employees. Operational information including descriptions of your business workflows, repetitive tasks, and operational challenges.</p>
          <p>We also collect standard website analytics data through Google Analytics, including pages visited, time on site, and general geographic location. This data is aggregated and anonymous and is used solely to improve our website.</p>

          <h2 style={{color: '#c8a96e', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.8rem'}}>How We Use Your Information</h2>
          <p>The information you provide through our intake form is used exclusively to generate your custom AI integration report. Your business details, workflow descriptions, and operational challenges are analyzed by our proprietary Small Psychological Model to produce a report tailored specifically to your business.</p>
          <p>Your email address is used to deliver your completed report and to respond to any questions or support requests you submit. We do not use your email address for marketing purposes without your explicit consent.</p>

          <h2 style={{color: '#c8a96e', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.8rem'}}>What We Will Never Do With Your Information</h2>
          <p>Novo Navis will never sell your personal or business information to any third party. We will never share your business details, workflows, or operational information with competitors, data brokers, marketing companies, or any other external parties. We will never use your business information for any purpose other than delivering the service you requested. We will never disclose confidential business information you share with us in the course of requesting a report.</p>
          <p>Your business is your business. What you tell us stays with us.</p>

          <h2 style={{color: '#c8a96e', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.8rem'}}>Payment Information</h2>
          <p>All payment processing is handled by Stripe, a PCI-compliant payment processor. Novo Navis does not collect, store, or have access to your credit card number or banking information. All payment data is transmitted directly to and stored by Stripe under their privacy policy and security standards.</p>

          <h2 style={{color: '#c8a96e', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.8rem'}}>Data Security</h2>
          <p>We take reasonable technical and organizational measures to protect the information you share with us. Your intake form data is transmitted over encrypted HTTPS connections. Access to customer information is limited to authorized personnel required to deliver your report.</p>

          <h2 style={{color: '#c8a96e', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.8rem'}}>Data Retention</h2>
          <p>We retain your intake form information for the period necessary to deliver your report and to address any follow-up questions or refund requests. We do not retain your business information indefinitely. If you wish to request deletion of your information, contact us at support@novonavis.com and we will honor that request promptly.</p>

          <h2 style={{color: '#c8a96e', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.8rem'}}>Third Party Services</h2>
          <p>We use the following third-party services to operate our website and deliver our service. Stripe for payment processing. Resend for transactional email delivery. Google Analytics for anonymous website traffic analysis. Cloudinary for video hosting. These services operate under their own privacy policies and are selected for their commitment to data security and privacy.</p>

          <h2 style={{color: '#c8a96e', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.8rem'}}>Your Rights</h2>
          <p>You have the right to request access to the information we hold about you. You have the right to request correction of inaccurate information. You have the right to request deletion of your information. You have the right to withdraw consent at any time. To exercise any of these rights, contact us at support@novonavis.com or call (623) 428-9308.</p>

          <h2 style={{color: '#c8a96e', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.8rem'}}>Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of our service after any changes constitutes acceptance of the updated policy.</p>

          <h2 style={{color: '#c8a96e', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.8rem'}}>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or how we handle your information, please contact us:</p>
          <p>
            Novo Navis Aerospace Operations LLC<br />
            Sun City, Arizona 85351<br />
            Email: <a href="mailto:support@novonavis.com" style={{color: '#c8a96e'}}>support@novonavis.com</a><br />
            Phone: <a href="tel:6234289308" style={{color: '#c8a96e'}}>(623) 428-9308</a>
          </p>

        </div>

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/report">Get Your Report</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link> &nbsp;·&nbsp;
          <Link href="/privacy-policy">Privacy Policy</Link>
        </p>
      </footer>
    </>
  )
}