import Head from 'next/head'
import Link from 'next/link'

export default function DeveloperTerms() {
  return (
    <>
      <Head>
        <title>AI Developer Terms and Conditions | Novo Navis</title>
        <meta name="description" content="Terms and conditions for AI tool developers registering their tools in the Novo Navis recommendation database." />
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

        <h1 style={{color: '#c8a96e', fontWeight: 'bold'}}>
          AI Developer Terms and Conditions
        </h1>

        <p style={{color: '#8a95aa', fontSize: '0.85rem', marginBottom: '2rem'}}>
          Effective date: {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
        </p>

        <div className="article-body">

          <h2>1. Registration and Payment</h2>
          <p>
            By completing the AI Tool Registration form and submitting payment of $250 USD, you
            ("Developer") agree to these terms. Registration is valid for a period of three (3)
            months from the date of payment. At the end of the registration period, your tool
            will be removed from the Novo Navis recommendation database unless renewed.
            Registration fees are non-refundable.
          </p>

          <h2>2. What Registration Includes</h2>
          <p>
            Registration grants inclusion of your tool in the Novo Navis active recommendation
            database. When our analysis system identifies a potential workflow match between a
            customer's described workflows and your tool's stated capabilities, your tool may
            be included in that customer's report. Registration does not guarantee inclusion
            in any specific report or any minimum number of recommendations.
          </p>

          <h2>3. No Guarantee of Recommendation</h2>
          <p>
            Novo Navis operates on a strict policy of unbiased, workflow-based recommendations.
            Payment of the registration fee does not influence, guarantee, or increase the
            likelihood of your tool being recommended to any specific customer. All
            recommendations are made solely on the basis of fit between the customer's described
            workflows and your tool's stated capabilities. Novo Navis reserves the right to
            recommend, not recommend, or discontinue recommending any registered tool at any
            time without notice or refund.
          </p>

          <h2>4. Accuracy of Information</h2>
          <p>
            You warrant that all information submitted during registration — including tool
            description, workflows addressed, industries served, and pricing — is accurate and
            complete at the time of submission. You agree to notify Novo Navis promptly at
            support@novonavis.com if any registered information changes materially during your
            registration period. Novo Navis is not responsible for recommendations made based
            on inaccurate information provided by the Developer.
          </p>

          <h2>5. This Is Not Advertising</h2>
          <p>
            Registration in the Novo Navis database is not advertising, sponsored content,
            or paid placement. Novo Navis will not represent your tool as sponsored or
            advertised in any customer report or communication. Recommendations are presented
            as independent analysis conclusions, which they are.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            You retain all intellectual property rights to your tool, its name, and any
            materials you submit. By registering, you grant Novo Navis a limited, non-exclusive
            license to reference your tool's name, description, pricing, and capabilities in
            customer reports and internal analysis systems for the duration of your registration
            period.
          </p>

          <h2>7. Removal and Termination</h2>
          <p>
            Novo Navis reserves the right to remove any tool from the database at any time
            without refund if the tool is found to be misrepresented, discontinued, harmful,
            deceptive, or otherwise inconsistent with Novo Navis's commitment to accurate
            and unbiased recommendations.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            Novo Navis is not liable for any direct, indirect, incidental, or consequential
            damages arising from inclusion or exclusion in the recommendation database,
            including lost sales or business opportunities. Registration is provided as-is
            with no warranty of results.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of Arizona, United States.
            Any disputes arising from these terms shall be resolved in the courts of
            Maricopa County, Arizona.
          </p>

          <h2>10. Contact</h2>
          <p>
            Questions about these terms should be directed to{' '}
            <a href="mailto:support@novonavis.com">support@novonavis.com</a>.
          </p>

        </div>

        <hr className="divider" />

        <div style={{textAlign: 'center', padding: '1rem 0'}}>
          <Link href="/tool-registration" style={{color: '#c8a96e', fontWeight: 'bold'}}>
            ← Back to Tool Registration
          </Link>
        </div>

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/sample-analysis">Try It Free</Link> &nbsp;·&nbsp;
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
