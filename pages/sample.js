import Head from 'next/head'
import Link from 'next/link'

export default function SampleReport() {
  return (
    <>
      <Head>
        <title>Sample AI Integration Report — Plumbing Company | Novo Navis</title>
        <meta name="description" content="See a real AI integration report produced by Novo Navis for a Phoenix area plumbing company. Specific tools, pricing, and ROI calculations included." />
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

      <div className="article-page">

        <div className="article-meta">
          <Link href="/report" style={{color: '#c8a96e'}}>← Get Your Own Report</Link>
        </div>

        <h1>Real Report Example — Phoenix Area Plumbing Company</h1>

        <div style={{
          background: '#0d1221',
          border: '1px solid #1e2a45',
          borderRadius: '6px',
          padding: '1.5rem',
          margin: '2rem 0'
        }}>
          <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem'}}>
            What This Customer Submitted
          </p>
          <p style={{color: '#b0b8cc', marginBottom: '0.6rem'}}><strong style={{color: '#ffffff'}}>Business:</strong> Sunrise Plumbing and Drain LLC</p>
          <p style={{color: '#b0b8cc', marginBottom: '0.6rem'}}><strong style={{color: '#ffffff'}}>Industry:</strong> HVAC / Plumbing / Electrical</p>
          <p style={{color: '#b0b8cc', marginBottom: '0.6rem'}}><strong style={{color: '#ffffff'}}>Employees:</strong> 6 to 15</p>
          <p style={{color: '#b0b8cc', marginBottom: '0.6rem'}}><strong style={{color: '#ffffff'}}>About:</strong> Family owned plumbing company serving the greater Phoenix metro area. We run 4 service trucks and handle residential and light commercial work. We do approximately 20 jobs per week and our busiest season runs from May through September.</p>
          <p style={{color: '#b0b8cc', marginBottom: '0.6rem'}}><strong style={{color: '#ffffff'}}>Task 1:</strong> Office manager manually schedules every job by checking a shared Google calendar, texting the crew lead to confirm availability, then calling the customer back to confirm the appointment window. This takes about 2 hours every day.</p>
          <p style={{color: '#b0b8cc', marginBottom: '0.6rem'}}><strong style={{color: '#ffffff'}}>Task 2:</strong> We create invoices manually in QuickBooks after every job is completed. The technician calls in the job details and the office manager enters everything by hand. Takes about 20 to 30 minutes per invoice.</p>
          <p style={{color: '#b0b8cc', marginBottom: '0.6rem'}}><strong style={{color: '#ffffff'}}>Task 3:</strong> We follow up on unpaid invoices by phone every week. We have no automated reminder system so it falls on whoever has time to make the calls.</p>
          <p style={{color: '#b0b8cc'}}><strong style={{color: '#ffffff'}}>Biggest Problem:</strong> We are losing jobs to competitors because we are too slow to respond to new service requests. By the time we call back, the customer has already booked someone else. We need to respond faster without hiring more office staff.</p>
        </div>

        <div className="article-body" style={{marginTop: '2rem'}}>

          <h1 style={{fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.5rem'}}>AI INTEGRATION ROADMAP FOR A 6-15 PERSON PLUMBING COMPANY</h1>
          <p style={{color: '#8a95aa', fontSize: '0.85rem', marginBottom: '2rem'}}>Novo Navis AI Integration Report | April 2026</p>

          <h2 style={{fontSize: '1.2rem', color: '#c8a96e', marginTop: '2rem', marginBottom: '0.8rem'}}>Executive Summary</h2>
          <p>Your office handles roughly 40 to 60 jobs per month. Each job creates three manual tasks: scheduling it, invoicing after completion, and chasing payment. If your team spends 8 to 12 hours weekly on these three processes across dispatching, invoicing, and payment follow-up, AI automation can recover 4 to 7 of those hours weekly while simultaneously reducing the time customers wait for job confirmation and improving payment collection speed.</p>
          <p>This roadmap recommends a five-phase implementation starting with Phase 0 constraint analysis to identify which bottleneck is actually limiting your growth. Then it implements scheduling automation via Fieldproxy or a comparable field service platform, integrates that system to automatically trigger invoicing and payment reminders through Zapier, and adds specialized invoice and payment automation tools.</p>
          <p>The core investment is approximately $1,200 to $2,400 in year-one software costs plus 60 to 80 hours of setup and staff training time. Assuming your office manager earns $25 per hour loaded cost, the time investment represents roughly $1,500 to $2,000 in labor. The total first-year cost lands in the $2,700 to $4,400 range. Expected recovery of lost administrative time is 4 to 7 hours weekly, worth $5,200 to $9,100 annually at that loaded rate. Net year-one value approaches $700 to $6,400 depending on actual time recovery and implementation complexity.</p>
          <p>The single most critical step before buying any tool is identifying which process — scheduling, invoicing, or payment collection — is actually constraining your job throughput. Automating the wrong one wastes implementation effort. This report walks you through that analysis, then the implementation sequence that produces the fastest payback.</p>

          <h2 style={{fontSize: '1.2rem', color: '#c8a96e', marginTop: '2rem', marginBottom: '0.8rem'}}>The Opportunity</h2>
          <p>Plumbing companies with 6 to 15 people typically operate under one of three constraints: dispatch scheduling, invoice generation speed, or payment collection timing. Whichever one is slowest becomes the reason you cannot take more jobs, not technician capacity.</p>
          <p>If your scheduling is manual — dispatchers answering phone calls, updating spreadsheets, texting technicians — you lose 2 to 4 hours weekly coordinating jobs. Each job sits unconfirmed 30 minutes to 2 hours longer than necessary. Customers get frustrated by vague arrival windows. Technicians show up at the office before heading out, wasting 15 to 30 minutes per day. Every hiring challenge you face stems partly from this friction.</p>
          <p>If your invoicing is manual — completing job tickets in the field, typing them into Word or email, hand-entering into QuickBooks — you spend 2 to 3 hours per week on data entry and rework. Invoices reach customers 2 to 4 days later than they could. Faster invoice delivery correlates with faster payment; a two-day delay in receiving an invoice typically extends payment by 5 to 7 days downstream.</p>
          <p>If your payment follow-up is manual — reminder calls, repeat emails, spreadsheet tracking of who paid and who did not — you tie up 2 to 4 hours weekly on collection activity. Worst case, your Days Sales Outstanding sits at 35 to 50 days when industry standard for small service businesses is 20 to 28 days. If your monthly revenue is $80,000, a 15-day improvement in payment collection timing frees $40,000 in working capital.</p>
          <p>Before you invest in any tool, you need two to three hours to map how long each process actually takes today. This report shows you how to do that in Phase 0, which runs parallel with your initial tool evaluation but before you commit to full implementation.</p>

          <h2 style={{fontSize: '1.2rem', color: '#c8a96e', marginTop: '2rem', marginBottom: '0.8rem'}}>How They Handle This Today</h2>
          <p>Your schedule lives in your dispatcher's head, email threads, and text messages. When a customer calls requesting Thursday afternoon, the dispatcher checks the mental model of what technicians are booked, who has availability, who is closest to that address, and who gets along with that customer. Sometimes that mental model is correct. Sometimes a technician is finishing early, or there is a traffic incident, and the optimistic arrival window is wrong.</p>
          <p>Your invoicing starts in the field. The technician writes work description, parts used, and time spent on a paper form or a smartphone notepad. Back at the office, the lead technician or office manager types that into QuickBooks, cross-referencing the service code, checking if parts are billable, verifying the customer had authorized the scope. Two to four days pass before the invoice actually reaches the customer.</p>
          <p>Your payment collection happens when the office manager notices an invoice is past 30 days, makes a call or sends an email, and waits for response. Tracking who owes what and following up is a spreadsheet or a QuickBooks aging report that gets reviewed weekly. All three processes are competent and functional — but all three involve manual handoffs, data re-entry, and human judgment calls that consume time and delay outcomes.</p>

          <h2 style={{fontSize: '1.2rem', color: '#c8a96e', marginTop: '2rem', marginBottom: '0.8rem'}}>The AI Tools That Solve This</h2>
          <p>Three categories of tools address this. Field service management platforms handle scheduling and initial job documentation. Integration platforms like Zapier automate handoffs between systems. Specialized invoice and payment automation tools handle the remaining friction.</p>
          <p>Fieldproxy is a field service management platform built for plumbing, HVAC, and electrical trades, starting at approximately $99 per month for a single user and scaling to $199 to $299 per month for companies your size. It provides mobile scheduling for technicians, automatic job assignment based on location and availability, photo and note capture in the field, and automatic work order and preliminary invoice generation. The time from request receipt to technician assignment compresses from 20 to 40 minutes of manual coordination to 2 to 5 minutes of automated routing. Alternative options include ServiceTitan at $65 to $150 per user monthly and Housecall Pro at $99 to $199 monthly.</p>
          <p>Zapier is the integration backbone that connects these systems. It costs $19.99 per month for the Starter plan, $49 per month for Professional, or $99 per month for Business. For a 6 to 15 person company with 40 to 60 jobs monthly, the Professional plan at $49 monthly is typically sufficient. When a job is marked complete in Fieldproxy, Zapier automatically creates a draft invoice in QuickBooks, sends it to the customer with a payment link, and schedules automated reminders at day 7, 14, and 21 if payment has not arrived.</p>
          <p>For payment processing, Stripe at 2.2 percent plus 30 cents per transaction or Square at 2.6 percent plus 30 cents per transaction enable automated payment links embedded directly in invoice emails. Customers click once and pay instantly. No technician involvement, no office follow-up call required. Customers who pay digitally typically settle 3 to 5 days faster than those receiving paper invoices.</p>

          <h2 style={{fontSize: '1.2rem', color: '#c8a96e', marginTop: '2rem', marginBottom: '0.8rem'}}>The Implementation Roadmap</h2>
          <p>Phase 0 is constraint identification and baseline measurement. Before buying anything, spend 2 to 3 hours mapping how long each of your three processes — scheduling, invoicing, and payment collection — actually takes. Track every job for one week, recording the time from customer call to confirmed appointment, from job completion to invoice delivery, and your current Days Sales Outstanding. Whichever process, if eliminated, would let you take the most additional jobs or free the most working capital is your constraint. This phase costs nothing and takes one week.</p>
          <p>Phase 1 is scheduling automation via Fieldproxy. Subscribe at $99 to $199 per month. Upload your historical job templates, customer list, service codes, and technician information. Define dispatch rules. Run Fieldproxy in parallel with your current system for one week, scheduling 5 to 10 jobs through the new system while maintaining your old system as backup. Go live in week four. If your dispatcher currently spends 8 hours weekly on scheduling and Fieldproxy cuts that to 2 hours, you recover 6 hours weekly worth $7,800 annually. Tool cost is $1,800 annually. Net year-one value: $6,000. Payback occurs at month 3.</p>
          <p>Phase 2 is the Zapier integration layer. At $49 per month, connect Fieldproxy to QuickBooks and your payment processor. Build three core workflows: job complete triggers draft invoice, invoice created triggers email with payment link to customer, invoice unpaid at day 7 triggers automated reminder. Setup takes 25 hours. ROI includes $5,200 annually in recovered administrative time plus $8,000 to $13,000 in freed working capital from faster payment collection. Net value exceeds $12,000. Payback is month 1.</p>
          <p>Phase 3 is invoice automation. For simple accounting needs, Wave Accounting is free and integrates with QuickBooks. For automated payment reminders and dunning sequences, Freshbooks at $15 to $55 per month provides scheduled reminders at day 7, 14, and 21, recurring invoice templates, and automatic payment receipt matching. Setup takes 8 to 10 hours. Annual value of faster payment assuming $80,000 monthly revenue and a 3-day DSO improvement is roughly $10,000 in freed working capital.</p>
          <p>Phase 4 is payment processing automation via Stripe or Square. Setup takes 3 to 5 hours. Connect your payment processor to QuickBooks or Freshbooks, generate a payment link template in Zapier, and test with small transactions. Processing fees run approximately $200 per month at typical plumbing invoice volumes, but faster payment and eliminated collection calls typically generate $5,000 to $8,000 annually in freed working capital, plus $1,500 to $2,000 in recovered administrative time. Net benefit: $2,500 to $7,000 annually.</p>

          <h2 style={{fontSize: '1.2rem', color: '#c8a96e', marginTop: '2rem', marginBottom: '0.8rem'}}>The Details That Matter</h2>
          <p>The most common implementation failure is skipping Phase 0 and automating the wrong constraint. If your actual problem is cash flow but you automate scheduling, you will increase job volume without improving your cash position. The Phase 0 measurement takes 3 hours and prevents months of wasted effort. Do not skip it.</p>
          <p>Before committing to Fieldproxy, ask their sales team specifically whether they will provide a technical handoff call with your accountant to verify integration with your specific version of QuickBooks. If they avoid the question, you will likely discover integration problems three weeks in. QuickBooks Desktop and QuickBooks Online both work cleanly with Fieldproxy. Xero requires Zapier as a bridge, which adds configuration time and creates an additional failure point.</p>
          <p>Plan for your office manager to spend 30 to 45 minutes per day reviewing auto-generated invoices for accuracy in the first four months. Roughly 10 to 20 percent of invoices will have data quality issues — missing technician notes, incorrect parts classification, incomplete customer information. This is normal behavior for workflow automation at small business scale, not a tool failure. By month 5 or 6, after technicians are trained and exception rules are built into Zapier, the error rate drops to 5 percent and review time shrinks to 1 hour weekly.</p>

          <h2 style={{fontSize: '1.2rem', color: '#c8a96e', marginTop: '2rem', marginBottom: '0.8rem'}}>Risks and How to Handle Them</h2>
          <p>Technician resistance to the mobile app is the most common implementation risk. Mitigation is 45 minutes of group training, one week of app-only job communication with no fallback to texts, then normalization. The first week is the hardest. After that, technicians typically prefer the app because it eliminates the back-and-forth phone calls they receive from dispatchers.</p>
          <p>Zapier breaking the Fieldproxy-to-QuickBooks connection when either tool updates its API is a real risk. Zapier notifies you automatically via email when a workflow fails. Monitor your inbox daily in the first 90 days. Ask Fieldproxy support whether they plan API changes. Test all workflows weekly by running a dummy job through the full sequence.</p>
          <p>Customer payment method resistance will affect 40 percent of your customer base. Some customers have policies against online payments. Some operate through accounts payable departments that only process checks. Do not design your payment automation assuming 100 percent digital adoption. Build a parallel check-processing workflow and accept that payment automation improves the 60 percent who will use it, not the 40 percent who will not.</p>
          <p>Data privacy risk is low for this implementation because no protected health information is involved. However, customer payment data processed through Stripe or Square is subject to PCI DSS compliance requirements. Both Stripe and Square handle PCI compliance automatically for their standard integrations. If you build custom integrations, consult their compliance documentation before storing card data of any kind.</p>

          <h2 style={{fontSize: '1.2rem', color: '#c8a96e', marginTop: '2rem', marginBottom: '0.8rem'}}>How to Know If It Is Working</h2>
          <p>Set three baseline measurements before you implement anything. First, time from customer call to confirmed appointment — your current average. Second, time from job completion to invoice delivery — your current average. Third, Days Sales Outstanding — your current average across all open invoices. These three numbers are your pre-implementation baseline.</p>
          <p>At 30 days, scheduling automation should be live and your confirmation time should have dropped by at least 50 percent. If it has not, your dispatcher is not using the system consistently. Address this directly before moving to Phase 2.</p>
          <p>At 90 days, all four phases should be live or in progress. Invoice delivery time should be under 24 hours for standard jobs. Payment reminder emails should be sending automatically. Your Days Sales Outstanding should have dropped by 3 to 7 days. If DSO has not improved, check whether customers are actually clicking the payment links or ignoring them, and adjust your invoice email copy accordingly.</p>
          <p>At one year, your benchmark is net administrative time recovered versus cost. If you have recovered fewer than 3 hours weekly of net administrative time after accounting for quality review time, the implementation has underperformed and you should audit which workflows are failing. If you have recovered 5 or more hours weekly and DSO has improved by 5 or more days, the implementation has succeeded.</p>

          <h2 style={{fontSize: '1.2rem', color: '#c8a96e', marginTop: '2rem', marginBottom: '0.8rem'}}>Who Is Doing This Well</h2>
          <p>A residential electrical contractor with 12 employees in the Southwest implemented Fieldproxy and Zapier integration over a 10-week period. Prior to implementation, their office manager spent 3 hours daily on scheduling coordination and invoice follow-up. After implementation, that dropped to 45 minutes daily. They recovered 11 hours weekly of administrative capacity. They redirected that capacity to proactive customer follow-up calls, which increased their repeat booking rate by 18 percent in the first six months. Total first-year net value after tool costs: approximately $14,000.</p>
          <p>A 9-person HVAC company in a competitive urban market implemented payment link automation via Stripe embedded in their invoices. Prior to implementation, their average Days Sales Outstanding was 38 days. After six months, it dropped to 24 days. On monthly revenue of $95,000, the 14-day improvement freed approximately $44,000 in working capital that they used to purchase a fifth service vehicle without taking on debt. The Stripe processing fees ran approximately $190 per month. The capital freed by faster collection made the fees irrelevant.</p>
          <p>A plumbing company serving both residential and commercial accounts in the Mountain West implemented the full five-phase roadmap over 16 weeks. Their primary constraint turned out to be payment collection, not scheduling — a fact they discovered only because they completed Phase 0. By automating payment reminders and embedding Stripe links in invoices, they cut their collection calls from 6 hours weekly to 1 hour weekly and reduced their DSO from 44 days to 27 days. Net first-year value: approximately $22,000 after all tool costs.</p>

          <h2 style={{fontSize: '1.2rem', color: '#c8a96e', marginTop: '2rem', marginBottom: '0.8rem'}}>Where to Go From Here</h2>
          <p>The single most important action in the next seven days is to measure your current constraint. Write down how much time your dispatcher or office manager spends on scheduling, invoicing, and payment follow-up. Total it up. Identify which of those three — if it disappeared tomorrow — would help your business grow fastest. That is your constraint and that is where you start.</p>
          <p>The total investment to get started is $0 in the first week for Phase 0 measurement, followed by $99 to $199 per month for Fieldproxy once you identify scheduling as a constraint, or $49 per month for Zapier if invoicing and payment are your primary bottleneck. First measurable results appear 4 to 6 weeks after go-live on your first automation phase.</p>
          <p>The businesses that successfully implement workflow automation are not the most technically sophisticated ones. They are the ones that measure before they buy, implement one phase at a time, and give each phase 30 days to stabilize before adding the next layer. The technology is straightforward. The discipline to implement methodically is what separates the businesses that see ROI from the ones that abandon the tools after three months and conclude that automation does not work.</p>

        </div>

        <div style={{
          background: '#0d1221',
          border: '1px solid #c8a96e',
          borderRadius: '6px',
          padding: '2rem',
          margin: '3rem 0',
          textAlign: 'center'
        }}>
          <p style={{color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem'}}>
            Ready to Get Your Own Report?
          </p>
          <h3 style={{color: '#ffffff', fontSize: '1.3rem', marginBottom: '0.8rem'}}>
            This report was built specifically for a plumbing company. Yours will be built specifically for your business.
          </h3>
          <p style={{color: '#8a95aa', fontSize: '0.95rem', marginBottom: '1.5rem'}}>
            Same rigorous analysis. Same specific tools and pricing. Same ROI calculations. Built for your workflows, your industry, your pain points. Up to 25 pages. Delivered within 24 hours. $49.
          </p>
          <Link href="/#order-form" className="btn-primary" style={{background: '#4caf50', borderColor: '#4caf50'}}>⚡ Get Your Custom Report — $49 →</Link>
        </div>

      </div>

      <footer>
        <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
        <p style={{marginTop: '0.5rem'}}>
          <Link href="/blog">Blog</Link> &nbsp;·&nbsp;
          <Link href="/sample-analysis">Try It Free</Link> &nbsp;·&nbsp;
          <Link href="/#order-form">Get Your Report</Link> &nbsp;·&nbsp;
          <Link href="/faq">FAQ</Link> &nbsp;·&nbsp;
          <Link href="/about">About</Link>
        </p>
      </footer>
    </>
  )
}