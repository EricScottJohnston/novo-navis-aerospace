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
          Effective Date: April 14, 2026 · Novo Navis Aerospace Operations LLC
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

          <h2 style={{color: '#c8a96e', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.8rem'}}>Advertising and Behavioral Targeting</h2>
          <p>Novo Navis uses third-party advertising services, including Microsoft Advertising and Reddit Ads, to display relevant advertisements to users who have previously visited our website. These services use cookies and similar tracking technologies — such as the Microsoft Universal Event Tracking (UET) tag and the Reddit Pixel — to collect information about your visits to our site and other websites in order to serve you targeted advertisements based on your browsing activity.</p>
          <p>We do not use these advertising technologies to collect your name, email address, or any personally identifiable information you provide to us through our intake form. The data collected through advertising cookies is limited to browsing behavior and is governed by the privacy policies of those advertising platforms.</p>
          <p><strong style={{color: '#d0d8e8'}}>Your Opt-Out Options:</strong> You may opt out of interest-based advertising at any time using any of the following:</p>
          <p>
            <strong style={{color: '#d0d8e8'}}>Microsoft:</strong> Manage your Microsoft advertising preferences at{' '}
            <a href="https://account.microsoft.com/privacy/ad-settings" target="_blank" rel="noopener noreferrer" style={{color: '#c8a96e'}}>account.microsoft.com/privacy/ad-settings</a>
            <br />
            <strong style={{color: '#d0d8e8'}}>Reddit:</strong> Manage your Reddit ad preferences at{' '}
            <a href="https://www.reddit.com/settings/privacy" target="_blank" rel="noopener noreferrer" style={{color: '#c8a96e'}}>reddit.com/settings/privacy</a>
            <br />
            <strong style={{color: '#d0d8e8'}}>Network Advertising Initiative (NAI):</strong>{' '}
            <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" style={{color: '#c8a96e'}}>optout.networkadvertising.org</a>
            <br />
            <strong style={{color: '#d0d8e8'}}>Digital Advertising Alliance (DAA):</strong>{' '}
            <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" style={{color: '#c8a96e'}}>optout.aboutads.info</a>
          </p>
          <p>Please note that opting out of interest-based advertising does not mean you will stop seeing advertisements. It means that the ads you see will not be tailored to your browsing behavior.</p>
          <p>Novo Navis complies with the Online Behavioral Advertising (OBA) self-regulation principles established by the Digital Advertising Alliance and the Network Advertising Initiative. We do not use sensitive data categories — including but not limited to political affiliation, religion, sexual orientation, gender identity, health conditions, or terminal illness — in the creation of advertising audiences or remarketing lists. We do not collect precise geo-location data from your device without your express consent.</p>

          <h2 style={{color: '#c8a96e', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.8rem'}}>Children's Privacy</h2>
          <p>The Novo Navis website is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at support@novonavis.com and we will promptly delete that information.</p>
          <p>In compliance with the Children's Online Privacy Protection Act (COPPA), we do not create remarketing lists, retarget, or otherwise profile any individuals under the age of 18. Our advertising campaigns are not directed at minors. We do not implement audience remarketing on any site or application directed to children.</p>
          <p>In California, we additionally comply with the California Online Privacy Protection Act (CalOPPA) and the California Consumer Privacy Act (CCPA). California residents under 18 who have registered to use our service may request removal of content or information they have publicly posted by contacting us at support@novonavis.com.</p>

          <h2 style={{color: '#c8a96e', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.8rem'}}>California and State Privacy Rights</h2>
          <p>California residents have the right to request information about personal data we have shared with third parties for direct marketing purposes during the prior calendar year. We do not sell your personal information. To submit a request or to opt out of any future sharing, contact us at support@novonavis.com.</p>
          <p><strong style={{color: '#d0d8e8'}}>Do Not Track:</strong> Some browsers transmit "Do Not Track" signals to websites. Because there is currently no industry standard for how websites should respond to these signals, our website does not currently alter its data collection practices in response to Do Not Track signals. You may, however, opt out of interest-based advertising at any time using the opt-out links provided in the section above.</p>

          <h2 style={{color: '#c8a96e', fontSize: '1.2rem', marginTop: '2rem', marginBottom: '0.8rem'}}>Third Party Services</h2>
          <p>We use the following third-party services to operate our website and deliver our service. Stripe for payment processing. Resend for transactional email delivery. Google Analytics for anonymous website traffic analysis. Microsoft Advertising (UET) for interest-based advertising. Reddit Ads for interest-based advertising. Cloudinary for video hosting. These services operate under their own privacy policies and are selected for their commitment to data security and privacy.</p>

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