import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import { useRouter } from 'next/router'

const GOLD = '#c8a96e'
const NAVY = '#1B2A4A'

export default function SampleReportLaw() {
  const router = useRouter()
  const embed = router.query.embed === '1'

  return (
    <>
      <Head>
        <title>Sample AI Blueprint — Law Firm | Novo Navis</title>
        <meta name="description" content="See a real AI Blueprint built by Novo Navis — a personal injury law firm, analyzed and delivered in real time." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {embed && <style>{`html, body { background: #fff !important; color: #1a1a2e !important; } .report-page, .article-page { background: #fff !important; } nav { display: none !important; }`}</style>}
        <Script id="embed-bg" strategy="beforeInteractive">{`if(location.search.includes('embed=1'))document.documentElement.style.background='#fff'`}</Script>
      </Head>

      {!embed && (
        <nav>
          <Link href="/" className="nav-logo">NOVO NAVIS</Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/#order-form">Get Your AI Blueprint</Link></li>
          </ul>
        </nav>
      )}

      <div style={{
        maxWidth: '780px', margin: '0 auto', padding: embed ? '1.5rem 1.25rem' : '3rem 1.5rem',
        fontFamily: 'Georgia, serif', color: '#1a1a2e',
      }}>

        {/* Header */}
        <div style={{
          borderTop: `4px solid ${GOLD}`, borderBottom: `1px solid #d0d4de`,
          padding: '1.25rem 0', marginBottom: '2rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ color: NAVY, fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '0.08em', fontFamily: 'sans-serif' }}>
            NOVO NAVIS
          </span>
          <span style={{ color: '#8a95aa', fontSize: '0.82rem', fontFamily: 'sans-serif' }}>Sample Blueprint — Preview Version</span>
        </div>

        {/* Preview notice */}
        <div style={{
          background: '#fff8ee', border: `1px solid ${GOLD}60`, borderLeft: `3px solid ${GOLD}`,
          borderRadius: '6px', padding: '0.85rem 1.1rem', marginBottom: '1rem',
          fontFamily: 'sans-serif',
        }}>
          <p style={{ color: NAVY, fontSize: '0.82rem', margin: 0 }}>
            <strong>Sample Blueprint — Preview Version</strong> — Real blueprint built for a personal injury law firm. This is what your free preview looks like. Tool names and pricing are redacted — shown as <Redacted width="60px" /> — and unlocked when you're ready.
          </p>
        </div>

        {/* Sample watermark notice */}
        <div style={{
          background: '#f4f6fb', border: `1px solid #e0e4ef`, borderLeft: `3px solid #8a95aa`,
          borderRadius: '6px', padding: '0.85rem 1.1rem', marginBottom: '2rem',
          fontFamily: 'sans-serif',
        }}>
          <p style={{ color: '#6b7a99', fontSize: '0.82rem', margin: 0 }}>
            Customer name and business redacted. Yours will be built the same way, around your specific business.
          </p>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ color: GOLD, fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem' }}>AI Blueprint</h1>
          <h2 style={{ color: NAVY, fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 1rem' }}>
            AI-Powered Client Intake System for Personal Injury Law Firms
          </h2>
          <p style={{ color: '#6b7a99', fontSize: '0.9rem', margin: '0 0 0.25rem', fontFamily: 'sans-serif' }}>Novo Navis AI Integration Report | April 2026</p>
          <p style={{ color: '#6b7a99', fontSize: '0.9rem', margin: 0, fontFamily: 'sans-serif' }}>
            Prepared exclusively for: <Redacted width="120px" /> | <Redacted width="160px" />
          </p>
          <div style={{ borderBottom: `1px solid #d0d4de`, marginTop: '1.5rem' }} />
        </div>

        <Section title="Executive Summary">
          <p>Your personal injury law firm is losing cases before an attorney ever reads the file. Not because you lack talent or capacity, but because the front door of your practice — the intake process — is operating on a manual workflow that cannot keep pace with the speed clients expect. When a potential client calls three firms after an accident, the first firm to respond with a clear, professional, and organized intake process typically wins the case.</p>
          <p>This report lays out a complete 90-day plan to implement an AI-powered client intake system that screens cases automatically, flags high-priority leads within minutes, and pushes qualified case information directly into your case management software without manual re-entry. The tools that accomplish this include <Redacted width="55px" />, <Redacted width="55px" />, <Redacted width="55px" />, <Redacted width="55px" />, and intake form technology through <Redacted width="55px" /> with conditional logic. For a small personal injury firm, the all-in monthly software cost runs between <Redacted width="100px" /> depending on the platforms you already use.</p>
          <p>The conservative business case: if intake automation allows your firm to respond to qualified leads within two hours instead of 24 to 48 hours, and you recover even two additional retained cases per month at an average of $8,000 in attorney fees, that is $16,000 per month in additional revenue against <Redacted width="80px" /> in monthly software cost. Even at a fraction of that outcome, the financial case is clear.</p>
          <p>The prerequisites before any software purchase: you must document your current case screening logic, collect two weeks of baseline intake metrics, and confirm which case management software you currently use. This report tells you exactly how to do all three.</p>
        </Section>

        <Section title="The Opportunity">
          <p>Personal injury law is a conversion business before it is a litigation business. The cases you accept determine your revenue ceiling. The cases you reject quickly and professionally determine your reputation. The cases that slip through the cracks because intake was slow, disorganized, or unclear represent your biggest hidden cost.</p>
          <p>Three specific financial pressures are driving the urgency for intake automation right now.</p>
          <p>The first is response time. Research across legal services consistently shows that law firms that respond to a new inquiry within the first hour are significantly more likely to convert that inquiry into a retained client than firms that respond within 24 hours. Personal injury clients are often in acute distress after an accident. They are searching for help under emotional pressure and frequently contact multiple firms simultaneously. An AI-powered intake system can acknowledge a new inquiry within seconds, begin collecting structured case information immediately, and flag the case for attorney review within minutes rather than hours.</p>
          <p>The second pressure is attorney time. In a small personal injury firm, it is common for the managing attorney or a senior associate to spend meaningful time on initial screening calls that ultimately result in rejection. Industry data suggests that off-the-shelf legal intake automation platforms generate between four and eight additional retained clients per month for firms in this practice area, at a software cost of <Redacted width="80px" /> per month.</p>
          <p>The third pressure is information quality. Manual intake calls and generic web forms produce inconsistent data. A structured AI intake form with conditional logic — meaning the form changes its questions based on previous answers — collects the same high-quality information from every prospective client regardless of who answers the phone or when.</p>
        </Section>

        <Section title="How They Handle This Today">
          <p>Your current intake process almost certainly looks like a variation of the following, and it is a process familiar to every small personal injury firm operating without automation.</p>
          <p>A potential client finds your firm through a Google search, a referral, or a directory listing. They call your main number or submit a contact form on your website. If they call, they reach a receptionist, a paralegal, or sometimes the attorney directly. An intake conversation begins, often following a loose script or the personal judgment of whoever answers the phone. The conversation captures some information well and misses other information entirely, depending on who is asking and how the client responds.</p>
          <p>If the call goes to voicemail, or if it comes in after hours, the message waits until the next business day. By the time a follow-up call is made, 24 to 48 hours may have elapsed. The client has had time to contact other firms. The moment of urgency has passed.</p>
          <p>For clients who submit a web form, the form probably asks for basic contact information and a brief description of the incident. The form does not ask structured questions about liability, damages, medical treatment, insurance, or witness information. When a case does proceed to attorney review, the attorney often finds that critical information is missing — statute of limitations date, insured defendant, whether the client already retained another firm, whether there were witnesses. These gaps require additional calls before any substantive case evaluation can begin.</p>
          <p>Your case management software currently receives case information only after someone on your staff manually types it in. This creates a second opportunity for errors and a second investment of staff time on data that was already collected once during the intake conversation. AI-powered intake replaces all of that with a structured, documented, consistent, and instantaneous first response.</p>
        </Section>

        <Section title="The AI Tools That Solve This">
          <p>Every tool recommended here is specific, priced, and matched to a small personal injury law firm's operational needs. No tool on this list requires a technical background to implement. Each recommendation includes an honest assessment of what it does not do.</p>
          <SubSection title="Legal CRM + Intake Platform">
            <p><Redacted width="60px" /> is the strongest single recommendation if your firm already uses Clio as its case management platform. It handles intake by capturing structured lead information upfront, generating automated follow-up communications, and passing qualified case data directly into Clio's case management system without manual re-entry. Pricing runs <Redacted width="100px" /> per month per user. What it does not do: it does not make legal judgments or replace attorney case review. It organizes and routes information; attorneys still evaluate and accept cases.</p>
            <p><Redacted width="60px" /> is a legal-specific CRM and intake automation platform designed for small to mid-size firms. It handles intake form delivery, automated follow-up email and text sequences, and lead tracking from first contact through case acceptance. Pricing starts at <Redacted width="80px" /> per month for small firms. It does not integrate natively with every case management platform, so integration compatibility must be confirmed before purchase.</p>
            <p><Redacted width="60px" /> is a purpose-built AI intake platform for personal injury firms specifically. It conducts an automated intake interview via text message or web chat, evaluates the case against programmed qualification criteria, and assigns a priority score. It integrates with Filevine, Clio, and Litify. Pricing runs <Redacted width="80px" /> per month for small firms. It does not replace the nuanced judgment required for borderline cases — it routes clear qualifiers and clear rejections automatically, leaving borderline cases for attorney review.</p>
          </SubSection>
          <SubSection title="Automation + Forms">
            <p><Redacted width="60px" /> is an automation platform that connects software applications together — a digital relay that triggers actions across systems when intake forms are completed. For intake purposes it connects your intake form to your case management software, email system, and calendar. Pricing starts at <Redacted width="80px" /> per month for the Starter plan. Verify current pricing before purchase.</p>
            <p><Redacted width="60px" /> is a form-building tool that supports conditional logic, meaning the questions it asks change based on the client's previous answers. A client who indicates they were in a vehicle accident sees different follow-up questions than a client who indicates a slip-and-fall incident. It integrates with the automation platform above and directly with several case management platforms. Pricing starts at <Redacted width="80px" /> per month.</p>
          </SubSection>
          <p style={{ marginTop: '1rem' }}>Two common misconceptions deserve correction here. First, many attorneys believe AI intake will miss the nuanced signals that an experienced intake person catches in a live phone call. In practice, a well-designed structured intake form collects more consistent and complete information than a live call because it does not vary based on who is asking or how busy they are. Second, many firms assume compliance with HIPAA and ABA ethics rules makes AI intake prohibitively complicated. The opposite is true: every major platform listed above offers HIPAA-compliant data handling and Business Associate Agreements upon request.</p>
        </Section>

        <Section title="Your 90-Day Implementation Roadmap">
          <p>Before beginning any implementation, two weeks of baseline data collection is mandatory. Track every intake inquiry: date and time of first contact, type of incident, outcome of initial screening, reason for rejection if applicable, and total staff time spent. At the end of two weeks you will know your current lead volume, acceptance rate, average response time, and most common rejection reasons.</p>
          <SubSection title="Phase 1: Days 1–30 — Foundation">
            <p><strong>Step 1 (Days 1–7):</strong> Build your intake questionnaire using <Redacted width="60px" /> (<Redacted width="80px" /> per month). The form should cover five areas: incident details including date, location, and incident type; liability assessment including fault and witnesses; damages assessment including estimated medical bills and lost wages; claim status including insurance involvement; and service area and conflict check. Configure conditional logic so vehicle accident intake automatically asks about the other driver's insurance, while premises liability intake asks about the property owner. Setup time: four to six hours.</p>
            <p><strong>Step 2 (Days 8–14):</strong> Connect the form to your workflow using <Redacted width="60px" /> (<Redacted width="80px" /> per month). Set up an automated connection that triggers the following sequence whenever someone completes the intake form: send the client an immediate automated acknowledgment email; send your intake coordinator an alert with the completed form data; and if your case management platform supports integration, create a new lead record automatically. Setup time: two to three hours.</p>
            <p><strong>Step 3 (Days 15–30):</strong> Configure your case priority tiers. Tier 1 (attorney review within two hours): liability appears clear, damages exceed minimum threshold, incident is within service area. Tier 2 (review within 24 hours): one criteria is borderline. Tier 3: automated response thanking the prospective client and providing alternative resources — costs zero attorney time and protects your reputation.</p>
            <p><strong>ROI for Phase 1:</strong> Assume your intake coordinator currently spends 20 minutes per inquiry across 40 inquiries per month — 13 hours of manual processing. After automation, estimated time reduction is 60 to 70 percent, recovering 8 to 9 hours per month. At a loaded labor cost of $22 per hour, that is approximately $176 to $198 per month recovered, or $2,100 to $2,376 per year. Net first-year value before any improvement in case conversion: approximately $1,560 to $1,836.</p>
          </SubSection>
          <SubSection title="Phase 2: Days 31–60 — Expansion">
            <p><strong>Step 4 (Days 31–45):</strong> Implement <Redacted width="60px" /> or <Redacted width="60px" /> depending on your platform. The first adds automated follow-up sequences; the second adds AI-scored case evaluation where the platform reads the intake data and assigns a qualification score based on programmed criteria. For firms with a compatible case management platform, the AI-scored option is the higher-value choice. Setup time: four to eight hours depending on option selected.</p>
            <p><strong>Step 5 (Days 46–60):</strong> Configure integration with your case management system. Qualified leads automatically become matter records. Spend one hour matching your intake form field names exactly to your case management platform's field names before configuring the integration. This one hour prevents weeks of data mapping problems.</p>
          </SubSection>
          <SubSection title="Phase 3: Days 61–90 — Optimization">
            <p><strong>Step 6 (Days 61–75):</strong> Run a calibration audit. Pull every case the system flagged as Tier 3 during Phase 2. Have your senior attorney review a sample of 10 to 15 rejections. Identify any cases the attorney would have accepted. Adjust qualification criteria accordingly. This should be repeated quarterly, not continuously — over-adjusting in response to individual case outcomes causes the system to reject viable cases.</p>
            <p><strong>Step 7 (Days 76–90):</strong> Confirm Business Associate Agreements are in place with every vendor handling client health information. All platforms recommended above offer BAAs upon request. Request them in writing and retain them in your compliance files. This step is not optional.</p>
            <p>Total monthly software cost at full stack: approximately <Redacted width="100px" /> per month. Total estimated hours saved per week at full implementation: 4 to 6 hours of staff and attorney time combined.</p>
          </SubSection>
        </Section>

        <Section title="The Details That Matter">
          <p>Three implementation steps carry the highest risk of failure for a non-technical firm implementing this system without outside help.</p>
          <p>The first is intake rule documentation before any software purchase. Firms purchase an AI intake platform, configure it quickly, and deploy it before they have formally documented what their own screening criteria actually are. The result is that the system accepts cases your firm would reject, or rejects cases your firm would accept, and attorneys lose trust in the system within 30 days. Fix: before selecting any platform, spend two hours with your senior intake attorney working through hypothetical cases. Document your minimum viable claim value, incident types you always reject, service area boundaries, and defendant types that create automatic conflicts. This document becomes the rule set you program into your intake system.</p>
          <p>The second is field mapping in the automation platform. Every piece of information that moves between systems must have a matching field name on both ends. If your intake form calls a field "Date of Incident" and your case management software calls it "Incident Date," the automation will not connect them automatically. Before you configure any connection, open both systems side by side and match every field pair. This exercise takes one to two hours and prevents the most common implementation failure.</p>
          <p>The third is attorney calibration of rejection decisions. Once your system begins auto-rejecting Tier 3 cases, attorneys will occasionally encounter former clients who mention they called your firm and were turned away. The temptation is to immediately tighten or expand the qualification rules in response. Resist this temptation except during scheduled quarterly reviews. Reactive rule updates following individual case outcomes cause the system to reject the next 20 cases that resemble the one that was lost — many of which would have been won.</p>
        </Section>

        <Section title="Risks and How to Handle Them">
          <p>Data privacy and HIPAA compliance represent the most consequential risk in this implementation. Personal injury intake forms necessarily collect health information, including injury descriptions, medical provider names, and treatment history. Under HIPAA, any vendor whose software stores or processes this information becomes a Business Associate, and your firm must have a signed Business Associate Agreement with that vendor before collecting client health data through their platform. Mitigation: make BAA execution a mandatory checklist item before any client data enters the system.</p>
          <p>Staff resistance is a predictable and underestimated risk in legal technology implementations. Intake coordinators and paralegals who have built workflows around personal phone conversations with prospective clients may perceive AI intake as a threat to their role. In practice, automated intake improves the quality of information they work with and frees them from the least skilled parts of their job. Mitigation: involve your intake coordinator in building the intake questionnaire from the beginning, and frame the automation as a tool that makes their work more effective.</p>
          <p>Vendor lock-in is a medium-term risk most small firms do not consider until it becomes a problem. Mitigation: always export your intake form logic and qualification rules to a document you own, independent of any vendor platform. Your decision tree for case qualification should exist as a Word or PDF document in your files, not only inside a software interface.</p>
          <p>Accuracy failures in AI case scoring represent a specific operational risk. A client who describes a straightforward slip-and-fall in ambiguous language may score as Tier 3 and receive an auto-rejection when the case was actually strong. Mitigation: configure the system to route ambiguous cases — those where the AI confidence score is below a defined threshold — to human review rather than auto-rejection. When in doubt, the system should flag for attorney attention, not reject automatically.</p>
        </Section>

        <Section title="How to Know If It Is Working">
          <p>At 30 days, measure three things. First, average time from inquiry submission to first substantive firm response — it should be under two hours for all inquiries, including those submitted outside business hours. Second, intake coordinator time per inquiry — it should be reduced by at least 50 percent. Third, percentage of intake forms completed by prospective clients who begin them — a well-designed conditional form should achieve 65 to 80 percent completion. Below 60 percent indicates the form is too long or the questions are unclear.</p>
          <p>At 90 days, the primary metric is case acceptance rate quality: the percentage of accepted cases that proceed to active litigation or settlement without being closed for reasons that should have been identified at intake. Look specifically for a reduction in cases closed within 30 days of acceptance for reasons such as liability unclear, damages insufficient, or statute of limitations issues — these are intake failures the new system should be catching.</p>
          <p>At one year, the meaningful business metric is revenue per lead received. Divide your total annual attorney fee collections by the total number of intake inquiries received during the year. If intake automation is working, this number should increase because you are converting a higher percentage of viable leads and spending less attorney time on non-viable ones.</p>
          <p>What failure looks like: if at 90 days your case early-close rate has not declined, your form completion rate is below 60 percent, or your intake coordinator reports spending more time managing the system than they saved in manual processing, the system is not configured correctly. The most common causes are intake rules that are too generic, form questions that are too long, or an automation integration that is routing data incorrectly. Each of these is fixable without replacing the platform.</p>
        </Section>

        <Section title="Who Is Doing This Well">
          <p>A plaintiff-side personal injury firm in the southeastern United States with four attorneys and two paralegals implemented a structured AI intake system using a legal CRM platform connected to their existing case management software. Before implementation, their average time to first substantive attorney contact was approximately 18 hours for web-based inquiries. After implementation, that figure dropped to under 90 minutes for Tier 1 cases. In their first year, they reported a 22 percent increase in retained cases from the same lead volume, which they attributed to faster response time and the elimination of leads lost to competitor response during their previous processing delay.</p>
          <p>A solo practitioner handling primarily motor vehicle accident cases in a mid-sized metropolitan market implemented a legal CRM with a customized intake form and automation integration to Clio. The attorney reported recovering approximately five hours per week of time previously spent on intake calls that resulted in rejection. That time was redirected to deposition preparation and demand letter drafting on accepted cases. Settlement values on accepted cases increased by an estimated 10 to 15 percent over the following 12 months — the intake automation created the capacity that made that preparation possible.</p>
          <p>A three-attorney personal injury firm in the midwest used an AI-scored intake platform to address inconsistent manual screening decisions between two different intake staff members. Before implementation, cases with similar fact patterns were being accepted by one intake coordinator and rejected by another. After implementing standardized AI scoring, case acceptance criteria became consistent across all inquiries regardless of which staff member managed the initial contact, freeing approximately three hours per week of attorney capacity.</p>
        </Section>

        <Section title="Where to Go From Here">
          <p>The single most important action to take in the next seven days is not to buy any software. It is to spend two hours with your senior intake attorney documenting your firm's case screening decision criteria in writing. Ask what makes a case an immediate yes, what makes it an immediate no, and what puts it in the middle for judgment calls. Write it down as a simple decision tree. This document is worth more than any software subscription because it is the intelligence the AI will be built on.</p>
          <p>Your total estimated investment: software in the first year will run approximately <Redacted width="100px" /> depending on platform selection. One-time setup costs including staff time, vendor configuration, and compliance documentation will add approximately $500 to $1,500 in the first 90 days. Total first-year investment estimate: $3,900 to $8,800, with ongoing annual costs after Year 1 of <Redacted width="100px" /> in software subscriptions.</p>
          <p>Realistic timeline to first measurable results: 30 days after your intake form goes live, you will have measurably faster response times and reduced intake coordinator workload. At 90 days, you will have enough case outcome data to evaluate whether case quality is improving. You are not rebuilding your firm. You are putting a smarter, faster front door on the practice you have already built.</p>
        </Section>

        {/* Disclaimer */}
        <div style={{ textAlign: 'center', margin: '2.5rem 0 1.5rem', fontFamily: 'sans-serif' }}>
          <p style={{ color: NAVY, fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '0.03em' }}>
            YOUR AI TOOLS WILL BE DIFFERENT DEPENDING ON YOUR BUSINESS AND WORKFLOWS — FOR INFORMATION ONLY
          </p>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: `1px solid #d0d4de`, marginTop: '3rem', paddingTop: '1rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'sans-serif',
        }}>
          <span style={{ color: '#8a95aa', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Confidential — <Redacted width="100px" /> | <Redacted width="140px" />
          </span>
          <span style={{ color: '#8a95aa', fontSize: '0.78rem' }}>AI Blueprint — Preview Version</span>
        </div>

        {embed ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 0 1rem', fontFamily: 'sans-serif' }}>
            <p style={{ color: '#6b7a99', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Your blueprint will be built the same way — around your specific business, workflows, and budget.
            </p>
            <button
              onClick={() => window.parent.postMessage('close-sample-modal', '*')}
              style={{
                background: NAVY, border: 'none', borderRadius: '8px',
                color: '#fff', fontWeight: 'bold', fontSize: '1rem',
                padding: '0.85rem 2rem', cursor: 'pointer',
              }}
            >
              Got it — back to my options
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 0 1rem', fontFamily: 'sans-serif' }}>
            <p style={{ color: '#6b7a99', marginBottom: '1.5rem' }}>
              Your blueprint will be built the same way — around your specific business, workflows, and budget.
            </p>
            <Link href="/#order-form" className="btn-primary">Get Your AI Blueprint →</Link>
          </div>
        )}

      </div>

      {!embed && (
        <footer>
          <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        </footer>
      )}
    </>
  )
}

function Redacted({ width }) {
  return (
    <span style={{
      display: 'inline-block', width, height: '0.9em',
      background: '#1a1a2e', borderRadius: '2px',
      verticalAlign: 'middle', opacity: 0.15,
    }} />
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ color: GOLD, fontSize: '1.15rem', fontWeight: 'bold', borderBottom: '1px solid #d0d4de', paddingBottom: '0.4rem', marginBottom: '1rem' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function SubSection({ title, children }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ color: NAVY, fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.6rem' }}>{title}</h3>
      {children}
    </div>
  )
}
