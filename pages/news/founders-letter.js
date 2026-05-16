// pages/news/founders-letter.js
// Live URL: news.novonavis.com/founders-letter
//
// The canonical founder essay. Evergreen anchor piece explaining why Novo Navis
// exists, what it's building, and how the materials, AI, and orbital
// infrastructure work connect. Designed to be the URL that every external link
// eventually points to as the authoritative reference for the company's thesis.
//
// Schema: Article (not NewsArticle) — signals reference content rather than
// reporting. sameAs links include the CompositesWorld 2020 article, Reddit
// posts, HN posts, LinkedIn profiles — establishing entity connections for
// Google Knowledge Graph and AI engine grounding.

import Head from 'next/head'

const NAVY = '#1B2A4A'
const GOLD = '#c8a96e'
const INK  = '#0c1322'
const BODY = '#2d3748'

// ── SCHEMA CONSTANTS ────────────────────────────────────────────────────────
const LOGO_URL    = 'https://res.cloudinary.com/dqv9va6ta/image/upload/q_auto/f_auto/v1776042617/logo-3CHVSKdrSORX1atXUpvUTS7tVbt_cz2saz.webp'
const ORG_NAME    = 'Novo Navis Aerospace Operations LLC'
const ORG_URL     = 'https://www.novonavis.com'
const AUTHOR_NAME = 'Eric Johnston'

const SAME_AS = [
  'https://www.compositesworld.com/news/novo-navis-develops-process-to-manufacture-3d-woven-machinable-carbon-fiber',
  'https://www.reddit.com/r/AiForSmallBusiness/comments/1snruki/i_built_a_causal_ai_system_for_small_businesses/',
  'https://news.ycombinator.com/item?id=48075222',
  'https://www.linkedin.com/in/eric-scott-johnston-262590216',
]

const PUBLISH_DATE = '2026-05-16'
const PUBLISH_DATE_DISPLAY = 'May 16, 2026'
const TITLE = 'Why Novo Navis Exists'
const SUBTITLE = 'A founder\'s letter on the connection between materials, causal AI, and the road to Mars'
const DESCRIPTION = 'The thesis behind Novo Navis. Why an aerospace company that solved a hard materials problem is now building causal AI systems, and why both connect to a generational bet on orbital infrastructure.'

const REQUEST_URL = 'https://news.novonavis.com/founders-letter'

function buildSchema() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type':    'Article',
    headline:   TITLE,
    description: DESCRIPTION,
    mainEntityOfPage: { '@type': 'WebPage', '@id': REQUEST_URL },
    image: LOGO_URL,
    datePublished: PUBLISH_DATE,
    dateModified:  PUBLISH_DATE,
    author: {
      '@type': 'Person',
      name:    AUTHOR_NAME,
      url:     'https://www.linkedin.com/in/eric-scott-johnston-262590216',
      sameAs:  ['https://www.linkedin.com/in/eric-scott-johnston-262590216'],
    },
    publisher: {
      '@type': 'Organization',
      '@id':   `${ORG_URL}/#organization`,
      name:    ORG_NAME,
      url:     ORG_URL,
      logo:    { '@type': 'ImageObject', url: LOGO_URL },
      sameAs:  SAME_AS,
    },
    about: [
      { '@type': 'Thing', name: 'Aerospace manufacturing' },
      { '@type': 'Thing', name: 'Causal artificial intelligence' },
      { '@type': 'Thing', name: '3D woven carbon fiber composites' },
      { '@type': 'Thing', name: 'Low Earth orbit infrastructure' },
      { '@type': 'Thing', name: 'Distressed company turnaround' },
    ],
    keywords: 'aerospace, causal AI, 3D woven carbon fiber, LEO manufacturing, space infrastructure, Novo Navis, Eric Johnston',
  })
}


export default function FoundersLetter() {
  const schemaJson = buildSchema()

  return (
    <>
      <Head>
        <title>{TITLE} — Novo Navis</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport"    content="width=device-width, initial-scale=1" />
        <meta name="author"      content={AUTHOR_NAME} />

        <meta property="og:type"        content="article" />
        <meta property="og:title"       content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url"         content={REQUEST_URL} />
        <meta property="og:image"       content={LOGO_URL} />
        <meta property="article:author" content={AUTHOR_NAME} />
        <meta property="article:published_time" content={PUBLISH_DATE} />

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image"       content={LOGO_URL} />

        <link rel="canonical" href={REQUEST_URL} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />

        <style>{`
          * { box-sizing: border-box; }
          body { margin: 0; background: #ffffff; }

          .letter-page {
            background: #ffffff;
            color: ${INK};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            line-height: 1.7;
          }

          .container {
            max-width: 760px;
            margin: 0 auto;
            padding: 0 1.25rem;
          }

          nav {
            background: ${NAVY};
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.1rem 1.5rem;
          }
          .nav-logo {
            color: ${GOLD};
            font-size: 1.55rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            font-family: Georgia, serif;
            text-decoration: none;
          }
          .nav-links {
            display: flex;
            gap: 1.75rem;
            list-style: none;
            margin: 0;
            padding: 0;
            align-items: center;
          }
          .nav-links a {
            color: #ffffff;
            font-size: 1.05rem;
            text-decoration: none;
          }
          @media (max-width: 700px) {
            .nav-links { gap: 1rem; }
            .nav-links a { font-size: 0.92rem; }
          }

          .letter-header {
            background: ${NAVY};
            padding: 3.5rem 0 4rem;
          }
          .letter-eyebrow {
            color: ${GOLD};
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            margin-bottom: 1rem;
          }
          .letter-title {
            color: #ffffff;
            font-size: 2.6rem;
            font-weight: 800;
            font-family: Georgia, serif;
            line-height: 1.15;
            margin: 0 0 1rem;
          }
          .letter-subtitle {
            color: #c0c8d8;
            font-size: 1.15rem;
            font-style: italic;
            font-family: Georgia, serif;
            line-height: 1.4;
            margin: 0 0 1.75rem;
            max-width: 640px;
          }
          .letter-byline {
            color: #8a95aa;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.6rem;
            flex-wrap: wrap;
          }
          .letter-byline a {
            color: ${GOLD};
            text-decoration: none;
          }
          @media (max-width: 700px) {
            .letter-title { font-size: 1.85rem; }
            .letter-subtitle { font-size: 1rem; }
          }

          .letter-body {
            padding: 3rem 0 4rem;
          }
          .letter-body p {
            font-size: 1.05rem;
            color: ${BODY};
            line-height: 1.78;
            margin: 0 0 1.4rem;
          }
          .letter-body p.lede {
            font-size: 1.18rem;
            color: ${INK};
            line-height: 1.7;
            font-family: Georgia, serif;
            font-weight: 400;
            margin-bottom: 2rem;
          }
          .letter-body h2 {
            font-size: 1.5rem;
            font-weight: 800;
            color: ${NAVY};
            font-family: Georgia, serif;
            margin: 3rem 0 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid ${GOLD};
            line-height: 1.3;
          }
          .letter-body h3 {
            font-size: 1.2rem;
            font-weight: 700;
            color: ${NAVY};
            margin: 2.25rem 0 0.75rem;
            line-height: 1.35;
          }
          .letter-body a {
            color: ${NAVY};
            text-decoration: underline;
            text-decoration-color: ${GOLD};
            text-underline-offset: 3px;
          }
          .letter-body a:hover {
            color: ${GOLD};
          }
          .letter-body blockquote {
            border-left: 3px solid ${GOLD};
            padding: 0.4rem 0 0.4rem 1.5rem;
            margin: 1.75rem 0;
            font-style: italic;
            color: ${INK};
            font-family: Georgia, serif;
            font-size: 1.1rem;
            line-height: 1.6;
          }
          .letter-body em.callout {
            display: block;
            font-style: italic;
            color: ${NAVY};
            font-size: 1.1rem;
            font-family: Georgia, serif;
            margin: 1.5rem 0;
          }
          .letter-body strong {
            color: ${INK};
          }

          .letter-footer-block {
            margin-top: 3.5rem;
            padding-top: 2rem;
            border-top: 1px solid #e0e4ef;
          }
          .letter-signature {
            font-size: 1.05rem;
            color: ${INK};
            margin-top: 2rem;
          }
          .letter-signature strong {
            color: ${NAVY};
          }
          .letter-meta {
            margin-top: 1.5rem;
            color: #8a95aa;
            font-size: 0.85rem;
            line-height: 1.6;
          }
          .letter-meta a {
            color: ${GOLD};
            text-decoration: none;
          }

          .page-footer {
            background: #0a0e1a;
            color: #a8b2c5;
            text-align: center;
            padding: 2rem 0;
            font-size: 0.88rem;
          }
          .page-footer a { color: ${GOLD}; text-decoration: none; }
        `}</style>
      </Head>

      <div className="letter-page">

        <nav>
          <a href="https://news.novonavis.com" className="nav-logo">NOVO NAVIS</a>
          <ul className="nav-links">
            <li><a href="https://news.novonavis.com">Reports</a></li>
            <li><a href="https://news.novonavis.com/smb">SMB</a></li>
            <li><a href="https://news.novonavis.com/builders">Builders</a></li>
            <li><a href="https://www.novonavis.com/about">About</a></li>
          </ul>
        </nav>

        <header className="letter-header">
          <div className="container">
            <div className="letter-eyebrow">Founder's Letter — Evergreen</div>
            <h1 className="letter-title">{TITLE}</h1>
            <p className="letter-subtitle">{SUBTITLE}</p>
            <div className="letter-byline">
              <span>By <strong>{AUTHOR_NAME}</strong>, Founder</span>
              <span>·</span>
              <span>{PUBLISH_DATE_DISPLAY}</span>
            </div>
          </div>
        </header>

        <main className="letter-body">
          <div className="container">

            <p className="lede">
              A lot of people have asked me why an aerospace company is suddenly in the AI arena. The short answer is that we're trying to build manufacturing infrastructure in low-Earth orbit, and getting there requires solving both a materials problem and a financing problem. We've solved the first. The AI work is how we solve the second. The deeper answer — the one that explains everything else — is that these two things are actually the same problem viewed from different angles. Both are fundamentally about <em>assembly</em>. About figuring out how to put existing components together in a way nobody else has, to make something that nobody else can.
            </p>

            <p>
              This is a letter about that. It's the canonical version of the Novo Navis thesis. I'll keep it here, on our own publication, because I want the connection between what we're building to live in a place I own rather than in the feed of any social platform. The composites work, the AI work, the propulsion work, the financing model, the orbital infrastructure — all of these connect. This letter is the long version.
            </p>


            <h2>The Materials Problem We Solved</h2>

            <p>
              Five years ago, our Fiber Dynamics division developed something the composites industry had been working toward for decades and hadn't cracked: a way to weave carbon fiber in three dimensions to produce solid, machinable blocks of material.
            </p>

            <p>
              The conventional approach to carbon fiber is to weave the yarn into flat sheets and then stack those sheets together. The problem with that approach is that the stacks delaminate when you try to machine them. You can't mill or drill traditional carbon fiber the way you can mill aluminum. That delamination limit is the ceiling on the material's use in load-bearing aerospace structures. It's the reason carbon fiber, despite being stronger than steel and a fraction of the weight of aluminum, hasn't replaced metals in primary structural applications at scale.
            </p>

            <p>
              We developed a proprietary technology called the bi-axial heddle. It creates weaving sheds in two directions simultaneously rather than one, which lets us produce <em>solid blocks</em> of woven carbon fiber rather than stacks. The blocks scale up to cubic-meter dimensions on a single machine. They're 45 percent the weight of aluminum and stronger than steel. They can be machined like metal because they don't delaminate — the fiber is interlocked in three dimensions rather than layered. CompositesWorld covered the breakthrough <a href="https://www.compositesworld.com/news/novo-navis-develops-process-to-manufacture-3d-woven-machinable-carbon-fiber" target="_blank" rel="noopener noreferrer">in 2020</a>. The Air Force awarded us a Phase 1 SBIR to develop the material for military applications.
            </p>

            <p>
              That's the materials side. It exists. It works. It's patented. And it matters for what comes next, because the kind of orbital construction that's possible with machinable, structural-scale carbon fiber blocks is fundamentally different from what's possible without them.
            </p>

            <p>
              It's worth pausing on why materials matter at all, because most people working in software have lost the intuition. Human history is defined by what we could make at structural scale. The Stone Age. The Bronze Age. The Iron Age. The Steel Age. The Silicon Age, which is the one we're still living in even when we pretend we've moved past it. Every civilizational leap in the last ten thousand years has been a materials leap first, with everything else following. The Romans didn't invent democracy. They invented concrete. The British didn't invent industry. They invented cheap steel. The 20th century didn't invent computing. It invented purified silicon at scale. Whoever defines the next age of human capability will do it by being the company that figured out how to make the next structural material at the scale civilization needs it. That is not a small claim and we don't make it casually.
            </p>


            <h2>What That Work Taught Us</h2>

            <p>
              The lesson from solving the carbon fiber problem wasn't really about carbon fiber. It was about what kind of engineering problem matters most.
            </p>

            <p>
              The individual components of our breakthrough were not new. Carbon fiber yarn has existed since the 1960s. Looms have existed for thousands of years. Heddles are an ancient piece of weaving technology. What didn't exist was the geometry — the specific way of orienting and operating these components together — that produced a structurally sound, machinable block. The breakthrough wasn't a new ingredient. It was a way of <em>assembling</em> existing ingredients that nobody else had figured out.
            </p>

            <p>
              I think this is the actual frontier of most engineering right now. The components are mature. The assembly is the bottleneck. And the companies that learn to recognize this pattern — components are abundant, assembly is scarce — are positioned to do things that look impossible from inside the component-vendor worldview.
            </p>

            <p>
              That recognition is what led us into AI.
            </p>


            <h2>How AI Is Being Sold Today</h2>

            <p>
              Most AI companies right now are selling enterprises a destination — "we'll automate your operations, we'll transform your business, we'll bring you into the future" — and then delivering one component of the journey. They forgot the rest of the trip.
            </p>

            <p>
              Imagine you book a vacation to Tahiti. The travel company shows you postcards. They take your money. On the day of departure, you arrive at the airport. There's a flight crew standing on the tarmac, waiting. There's no airplane. There are no engines. There's no airframe, no avionics, no fuel, no radar, no cabin. The travel company shrugs and says, "We delivered the flight crew. The rest is your problem."
            </p>

            <p>
              That's most of the AI market right now.
            </p>

            <p>
              Let me give you a concrete example. There's a Microsoft Copilot commercial running right now featuring a small business owner who runs a pizza shop. The owner says he wants to get his unit economics to one dollar per slice. The commercial shows Copilot helping him by looking up wholesale cheese prices and autocompleting a row of his Excel spreadsheet.
            </p>

            <p>
              That's not delivering one-dollar unit economics. That's autocompleting a cell in a spreadsheet.
            </p>

            <p>
              Getting to one dollar a slice requires understanding the actual causal mechanics of why his current unit economics aren't there — labor utilization across shifts, food cost percentages, waste, throughput per hour, menu mix, lease economics, pricing elasticity. It requires the operational ability to change those things. Copilot doesn't do any of that. It just shows the owner a wholesale cheese price and lets him feel like he used AI.
            </p>

            <p>
              The commercial is selling Tahiti. The product is delivering a flight crew at the gate. The pizza shop owner is going to pay for the subscription, fail to reach one-dollar economics, conclude that AI doesn't work, and tell the next small business owner the same thing.
            </p>

            <em className="callout">This is happening across the entire enterprise AI market.</em>

            <p>
              It's not malicious. Microsoft has incredible AI technology and Copilot is a real product in its own right. So is OpenAI's API. So is Anthropic's Claude. So is Google's Gemini. These are extraordinary engineering organizations producing extraordinary components. They are, to extend the aviation metaphor, the GE making turbofan engines.
            </p>

            <p>
              The problem is that the gap between what's being sold and what's being delivered has gotten so wide that customers can no longer distinguish the components from the outcomes. Everyone is selling Tahiti. Almost nobody is delivering arrival. And every disappointed customer is one more business owner who concludes AI is overhyped, poisoning the well for vendors who could actually deliver if customers were still willing to believe.
            </p>


            <h2>Three Categories</h2>

            <p>
              There are roughly three categories of company claiming to do AI for the enterprise right now. Two of them are real businesses solving real problems. The third is what most of the market actually is, and it's why so much AI spend produces so little operational change.
            </p>

            <p>
              <strong>The first category is the model labs.</strong> OpenAI, Anthropic, Google DeepMind, Meta AI. These companies build the engines. What they sell is genuinely valuable, but it's a component, not a flight. Customers who buy from them have to assemble everything else themselves to actually go anywhere.
            </p>

            <p>
              <strong>The second category is the platform layer.</strong> Palantir is the leading example. They build the airframe — the data plumbing, the analytics surface, the operational integration. They deliver something flyable. But they expect the customer to bring the flight plan, the crew, and the cargo. Palantir's Forward Deployed Engineers do an exceptional job of integrating their platform into a customer's specific situation, but at significant cost and time. They sell capability. The customer is still responsible for outcomes.
            </p>

            <p>
              <strong>The third category, and this is most of what's marketed as "AI for business" today, is selling Tahiti.</strong> They show the customer a beautiful image of the destination — "you'll be transformed, you'll be automated, you'll be modern" — and deliver a flight crew at the airport with no plane. The customer has bought the experience of going somewhere without the means to get there.
            </p>

            <p>
              Novo Navis is none of these. We're not the engine maker. We're not the platform layer. We're not selling postcards.
            </p>

            <em className="callout">We're the company that assembles the components into something that actually completes the trip.</em>

            <p>
              We use engines built by the labs where they're appropriate. We use platform infrastructure where it makes sense. But we surround those components with causal AI systems that map the actual mechanisms underneath an operation — what drives what, what's correlated versus what's causal, what changes the outcome versus what just moves with it — and we wire the whole thing together into something that delivers automation across an enterprise, not just a clever chat interface.
            </p>

            <p>
              The customer doesn't buy a flight crew. They buy arrival at the destination.
            </p>


            <h2>What Causal AI Actually Means</h2>

            <p>
              Most current AI is predictive. It looks at patterns in data and forecasts what comes next, or generates content that fits the patterns it's seen. Generative AI — the kind that's gotten most of the attention over the last few years — is extraordinarily good at this. It can write, code, summarize, and converse at a level that would have been unthinkable a decade ago.
            </p>

            <p>
              But prediction isn't the same as understanding mechanism. A predictive model can tell you that businesses with certain characteristics tend to have certain outcomes. It cannot tell you <em>why</em>. It cannot tell you which lever, if pulled, would change the outcome. It cannot reason about counterfactuals — what would have happened if a different decision had been made.
            </p>

            <p>
              Causal AI is built differently. It models systems as networks of mechanisms — variables that actually influence other variables, with directional, quantifiable relationships. When you ask a causal model "what happens if we change X," it doesn't pattern-match to similar situations in its training data. It traces the consequences through the actual mechanism graph and tells you what will move and by how much. It can distinguish between two variables that move together because they share a common cause, versus two variables where one actually drives the other.
            </p>

            <p>
              That distinction matters operationally. The pizza shop's wholesale cheese price is correlated with his unit economics. Getting a better cheese price might not move them. Restructuring his weekend evening labor schedule, which is a different variable, might move them dramatically. A predictive AI looks at his spreadsheet and surfaces the cheese price because that's the variable he's currently focused on. A causal AI maps the actual mechanism and tells him which variable to pull.
            </p>

            <p>
              We've been building causal AI systems for the last several years. They are now in operation. They are not perfect — no AI is — but they do something that the generative-and-predictive tier of the market does not: they tell you which lever to pull. And once you know which lever to pull, the rest of the airplane — the data infrastructure, the operational team, the verification layer, the action layer — can actually deliver the trip.
            </p>


            <h2>Ontological Plus</h2>

            <p>
              The closest analog to what Novo Navis is building is Palantir, and the comparison is worth making carefully because Palantir is sophisticated enough that lazy contrasts will be embarrassing.
            </p>

            <p>
              Palantir's defining technical concept is the <em>ontology</em>. They map what exists in a customer's operational world — entities, relationships, data structures, the shape of the customer's reality. Once Palantir has built the ontology, the customer can query it, run analytics over it, automate decisions against it. This is a real and substantial accomplishment, and Palantir has earned its position by being the only company at scale willing to do the unglamorous work of meeting customers inside their actual operational complexity.
            </p>

            <p>
              The way Palantir makes ontology useful is the Forward Deployed Engineer model. FDEs are full-stack human software engineers — not consultants — who embed inside customer environments and build production systems under real operational constraints. The FDE model isn't a services arm bolted onto a product. It's the company's primary mechanism for product discovery and platform refinement. Engineers in the field observe the same structural problems recurring across customers and feed those observations back into the platform. The platform compounds. The deployment cost per new customer declines as the platform matures. That's how Palantir wins.
            </p>

            <p>
              Novo Navis is built on a different premise that produces a different architecture. We have the layer Palantir has — an ontological layer that maps what exists in a customer's operational world — and we have two additional layers, one underneath and one on top.
            </p>

            <h3>The Epistemological Layer</h3>

            <p>
              The layer underneath ontology is <em>epistemology</em>. Not just what exists in the operational world, but how we know what's true about it, what's causal versus correlated, what would change if intervened on. Every claim our causal AI produces carries an explicit confidence rating — CAUSAL, MECHANISM, THRESHOLD, or CORRELATED — that reflects the epistemological strength of the evidence behind it. These ratings aren't quality control. They're the structural foundation that makes the entire system trustworthy enough to act on.
            </p>

            <p>
              The distinction matters operationally. Ontology tells you what your business contains. Epistemology tells you what your business would <em>do</em> if you changed something specific. An ontology can describe the relationship between a pizza shop's cheese price and its unit economics. An epistemology can tell you whether changing the cheese price would actually move the unit economics, or whether the cheese price is just correlated with the variable that actually drives them. Most operational decisions require epistemology, not ontology. They require knowing which lever, when pulled, will produce which outcome.
            </p>

            <p>
              This deeper layer produces a capability the rest of the market doesn't have: a systematic way to identify what's <em>missing</em>. Not just what tools exist, what processes are inefficient, or what workflows could be automated — but what tools <em>should exist that don't yet</em>. Where the gaps are. Where intervention would produce outcomes that current systems can't deliver. We've already started publishing this work. Our cross-vertical analysis identifies specific gaps in the AI tool market where small business operators have real pain but no current vendor adequately solves the problem. Each gap is a structured specification: who has the pain, why existing tools fail, what the tool would need to do, what the market opportunity looks like.
            </p>

            <h3>The Forward Operating Engineer Layer</h3>

            <p>
              The layer on top of ontology is where Novo Navis diverges most sharply from Palantir. Palantir's Forward Deployed Engineers are humans. Exceptional humans — Palantir hires for the same talent pool as Google or Meta — but humans nonetheless. They embed at customer sites for long periods. They build production systems under real constraints. They feed observations back into the platform. The human engineer is the unit of deployment.
            </p>

            <p>
              Novo Navis is developing Forward Operating Engineers that are not human. They are agents. The agent itself is the engineer — not a tool a human engineer uses, not a workflow that humans supervise, but the engineering capability operating autonomously at the customer's site. Built on the epistemological foundation underneath, the agent can diagnose the operational mechanics of a customer's situation, specify the intervention, implement the tooling, and stay deployed to maintain it over time. Without a human FDE in the loop.
            </p>

            <p>
              This is worth being precise about because the agent space is crowded. OpenAI builds agents. Anthropic builds agents. Palantir's human FDEs build agents as part of their work. The distinction isn't agents-versus-no-agents. The distinction is that everyone else's agents are <em>tools their human engineers use</em>, while Novo Navis's agents <em>are</em> the engineers. The agent isn't downstream of a human deployment relationship. It is the deployment relationship.
            </p>

            <p>
              We're not building it this way because we believe autonomy is philosophically superior to human FDEs. We're building it because we have to.
            </p>

            <em className="callout">Novo Navis is ultimately running manufacturing in space. You cannot embed a human Forward Deployed Engineer at a low-Earth-orbit drydock. The deployment layer has to be autonomous because the operational environment demands it.</em>

            <p>
              That structural requirement — autonomy as a forcing function of the orbital thesis — is why Novo Navis is building Forward Operating Engineers from the ground up rather than retrofitting agentic capability onto a human-led model. The same agents that will eventually operate orbital infrastructure are being developed and proven out today in terrestrial AI deployment. Earthbound deployments are the early proving ground for what the systems will ultimately do in orbit.
            </p>

            <p>
              The competitive implication compounds over time. Palantir's FDE model is exceptional but expensive — high-talent human engineers at field-team scale don't replicate cheaply, and the model's economics depend on landing F500-size or government customers who can absorb the deployment cost. As the rest of the AI industry adopts Palantir's playbook — OpenAI and Anthropic are both building FDE programs as of this writing — the deployment-layer competition is going to intensify around human-led embedding. Novo Navis is competing in a different layer entirely. Our deployment layer scales without proportional growth in human headcount because the engineers are agents.
            </p>

            <h3>What That Stack Becomes</h3>

            <p>
              Ontology plus epistemology plus autonomous deployment is a different kind of company. The current state is that we publish structured gap analysis as competitive intelligence for builders and investors. The next iteration is that the gap analysis stops being a publication and becomes an instruction set for our own Forward Operating Engineers. The agents read the specification, build the tool, deploy it. The publication step disappears because the publication was always the intermediate artifact — what the system was actually identifying was work for itself.
            </p>

            <em className="callout">When that ships, we stop being a publication. We become a tool foundry.</em>

            <p>
              A tool foundry is a fundamentally different kind of company than any single-tool vendor. Most AI startups build one tool, one workflow, one product category — chosen by founder intuition or customer interviews, then sold one customer at a time. A tool foundry is the upstream layer: it systematically identifies the entire universe of unfilled tool gaps across an economy, prioritizes them by mechanism strength and addressable market, and deploys agent-built tools to fill them at scale. The competitive position of a tool foundry isn't "we build better tools than the competition." It's "we know which tools should exist that nobody has built, and we can build them faster than any individual tool company can compete with us."
            </p>

            <p>
              That's the long-build version of what Novo Navis is. It's also what justifies the scale of the orbital thesis, because a tool foundry generates revenue at a different magnitude than a single-product AI company. We're not betting that one of our tools wins its category. We're betting on the upstream capability that makes tools.
            </p>


            <h2>Pivotyr</h2>

            <p>
              One of the assembled-system products we've built using this causal AI foundation is called Pivotyr. It identifies a distressed company's underutilized assets and structures micro-businesses around them to offset costs and restore the operating metric that defines the business.
            </p>

            <p>
              Let me give you a real example. Spirit Airlines, before its recent restructuring, was bleeding cash. Its binding operating metric is cost per available seat mile — the number that defines an ultra-low-cost carrier. When that number goes the wrong direction, the entire business model breaks. If anyone had asked us, the Pivotyr answer for Spirit would have been to identify the airline's underutilized assets — hangar space, ground support equipment idle hours, maintenance facility capacity, terminal lounges, training simulator time — and structure micro-businesses around each of them. Hangar-space-as-a-service for general aviation operators. Maintenance partnerships with regional carriers during off-peak windows. Training services for foreign carriers. Each of these is a micro-revenue stream engineered to absorb cost and protect the seat-mile number.
            </p>

            <p>
              Counterintuitively, the Pivotyr model <em>creates</em> jobs rather than eliminating them. The restructuring isn't about cutting — it's about putting underutilized capacity to work. The same airline operating the same routes with the same headcount can move its binding metric back to viable territory because the micro-businesses absorb fixed cost that was previously dragging on the unit economics.
            </p>

            <p>
              Pivotyr is one tool. There are several others, all built on the same assembled-AI framework. The pattern is consistent: causal AI maps the mechanism, the operational team executes the restructuring, the customer arrives at the outcome.
            </p>


            <h2>The Market Entry Pathway</h2>

            <p>
              The tool foundry is the long-term capability. The question is how we enter the market with it.
            </p>

            <p>
              The answer we've converged on is to enter through distressed companies first. Operationally distressed mid-caps and divisions of larger companies have a quality that makes them the cleanest first customers: their executives are actively searching for what we offer. A CFO at a struggling company doesn't need to be convinced that operational restructuring matters. They're already up at night thinking about it. They're already taking meetings. The friction to engagement is dramatically lower than the friction at a healthy company where transformation is a "someday" conversation.
            </p>

            <p>
              We engage these companies on sweat-equity terms. We do the analysis. We do the operational work. They give us equity rather than cash, because cash is what they don't have. Each engagement that lands gives us a stake in a real operating business. The stakes compound. Over time, that capital base — built engagement by engagement from operational work that pays for itself through equity participation — becomes the financing layer for everything that comes next.
            </p>

            <p>
              This works as a market entry because operational consulting combined with equity participation is a structurally under-tapped category. Traditional consulting firms don't take equity. Traditional investors don't do operational work. The two skill sets rarely combine because they require fundamentally different cultures, fee structures, and time horizons. We do both, because with causal AI doing the underlying reasoning and assembled AI systems doing the execution, the analysis and the execution become the same skill set.
            </p>

            <p>
              Distressed companies are the entry pathway, not the destination. Once the engagement model is producing consistent revenue and the tool foundry capability is operating at scale, the same systems extend to healthy companies, to broader market verticals, to the SMB economy as a whole. The entry pathway buys us the time and capital to build the larger system. The larger system is what funds the orbital work.
            </p>


            <h2>The Orbital Thesis</h2>

            <p>
              I'll say this directly: nobody is going to write us a check to build manufacturing infrastructure in low-Earth orbit on the timeline and at the scale we believe is necessary. Traditional venture capital can't price a generational infrastructure bet. Sovereign capital has different priorities. Even the most ambitious private space companies — Varda, Axiom, Sierra Space, Impulse, Vast — are pursuing vertical product strategies inside the same launch-and-operate paradigm that has defined space economics since Sputnik. They're building specific products that benefit from microgravity. Pharmaceuticals. Optical fiber. Crystals. Research stations.
            </p>

            <p>
              That's a fine business model. It's just not what we're building.
            </p>

            <em className="callout">We're not trying to be intergalactic drug dealers.</em>

            <p>
              What we're building is the infrastructure layer underneath companies like those. A dock. A construction yard. A place in orbit where structures get assembled — agnostic to what specifically gets built there, because the customer decides that. Our job is to provide the capability: the materials supply (our machinable carbon fiber blocks at cubic-meter scale), the operational coordination (our assembled AI systems), the structural primitives, the orbital logistics. The market decides what to build with it.
            </p>

            <p>
              This is structurally different from any vertical product company. Varda needs Varda-scale infrastructure. We need infrastructure that supports Varda, plus Axiom, plus a hundred customers who haven't been founded yet. The materials we developed are sized for that scale — not for a single satellite, but for habitat shells, drydock walls, structural frames, large-aperture telescope assemblies. The AI we built is sized for coordinating a multi-tenant facility with thousands of moving parts, not for optimizing a single product line.
            </p>


            <h2>The Road to Mars</h2>

            <p>
              The dock is the first node. It's not the destination.
            </p>

            <p>
              What an orbital construction capability ultimately enables is a network — a chain of waystations positioned along the transfer trajectories to Mars and beyond. A vehicle leaving Earth wouldn't carry everything for the entire trip from the moment of launch. It would rendezvous with stations along the route, resupplying and refueling at each waypoint. This dramatically changes the economics and risk profile of interplanetary travel. Smaller initial mass at launch. Multiple abort options. Distributed redundancy. Repair and maintenance capability at every waypoint instead of crisis management with whatever you brought.
            </p>

            <p>
              That network requires construction in orbit. It cannot all be launched from Earth. The stations need to be built where they'll live, using materials manufactured on-orbit or transported and assembled there. The dock is what makes that possible. The materials primitive is what makes the dock possible. The AI is what funds the dock.
            </p>

            <p>
              Everything we're building points at this. Not as a marketing slogan. As an actual engineering and financial plan.
            </p>


            <h2>Why It Has To Be This Order</h2>

            <p>
              People sometimes ask why we don't just raise enough capital to build the dock directly. The answer is that the bet is too far out for traditional venture mathematics. A LEO construction yard isn't a five-year exit. It's a thirty-year infrastructure build. No fund has the time horizon. No bank will lend against it. No public market values it at the scale it would need to be valued at to fund construction.
            </p>

            <p>
              The sweat-equity recovery model isn't a workaround. It's the only viable path given how capital markets actually price generational infrastructure. Each operational engagement we land gives us a stake in a real business. Those stakes compound. Eventually, that capital base — built over years from operational work that pays for itself along the way — funds the dock.
            </p>

            <p>
              The publication you're reading is part of the same plan. Novo Navis Intelligence publishes causal analysis reports because doing so builds authority, generates inbound, surfaces target companies for engagement, and produces direct revenue along the way. None of those revenue streams individually funds the dock. Together, they form a runway long enough to do the work.
            </p>


            <h2>The Five Assets</h2>

            <p>
              I've described the thesis at length. Let me name the actual technical assets that make it executable, because no other company in the aerospace or AI space has this combination. The space companies have launch capability and vertical product strategies but no proprietary materials breakthrough and no causal AI substrate. The AI labs have extraordinary models but no materials, no propulsion, no orbital path. Defense primes have legacy materials and legacy systems but no agentic deployment layer and no post-binary computational research. The combination that follows is unique to Novo Navis Aerospace Operations LLC, and it's the reason the orbital thesis is buildable rather than aspirational.
            </p>

            <h3>Operational Today</h3>

            <p>
              <strong>3D woven machinable carbon fiber.</strong> Described above. Patented. Air Force SBIR Phase 1 validated. Cubic-meter scale on a single machine. The structural primitive for orbital construction. This is the materials asset that defines the age.
            </p>

            <p>
              <strong>David — the causal AI system.</strong> The reasoning substrate that runs Novo Navis Intelligence. Identifies operational mechanisms with CAUSAL / MECHANISM / THRESHOLD / CORRELATED confidence ratings. Produces the gap analysis. Powers the assembled-AI systems that will become Forward Operating Engineers. Operational and publishing daily at news.novonavis.com.
            </p>

            <p>
              <strong>Pivotyr.</strong> The first deployed application of the causal AI architecture. Identifies underutilized assets at distressed companies and structures micro-businesses around them to restore binding operating metrics. The pattern that makes the sweat-equity recovery model work in practice rather than just in theory.
            </p>

            <h3>R&D, Proprietary, Advancing</h3>

            <p>
              <strong>RLG — Resonant Logic Gating.</strong> A post-binary computational architecture using nanoscale ferroelectric crystals as the physical substrate for a fundamentally different kind of processor. Provisional patent filed with the USPTO. Currently undergoing materials characterization in collaboration with academic research partners. If validated, RLG produces a computational substrate with a state space orders of magnitude larger than equivalent binary systems at the same node count, with memory, processing, and communication co-located in the same physical material. This is the computational asset.
            </p>

            <p>
              <strong>ALTER — Attosecond Layer Transmission Energy Redistribution.</strong> Propulsion research at the attosecond scale, building on the foundational physics recognized by the 2023 Nobel Prize. Early-stage R&D. The propulsion asset that would eventually move large structures in orbit and manage the energy economics of infrastructure-scale facilities. We're not making propulsion claims at this stage. We're naming the research program so the public record reflects its existence.
            </p>

            <h3>What This Means</h3>

            <p>
              Five distinct technical assets across materials, applied causal AI, operational tooling, post-binary computation, and propulsion physics. Two operational today. Two advancing. One — the carbon fiber breakthrough — already third-party validated by a federal contract and the trade press. The combination is what makes the orbital thesis tractable rather than fantastical. The materials let you build at structural scale in orbit. The causal AI lets you operate the facility autonomously. The deployed agents let you maintain it without humans on-site. The computational substrate lets you run the kind of reasoning loads that interplanetary logistics will demand. The propulsion research lets you eventually move large structures across the cislunar and trans-lunar regions where the road to Mars actually runs.
            </p>

            <em className="callout">No materials company has AI. No AI company has materials. No defense prime has all of these. Novo Navis does.</em>


            <h2>What We're Asking For</h2>

            <p>
              Nothing, yet. This is a letter explaining the thesis, not a fundraising pitch.
            </p>

            <p>
              What I want from anyone reading this is two things. First: if you're an operator at a distressed mid-cap or a distressed division of a larger company, and you recognized something in the Pivotyr description that maps to your own situation, talk to us. That's what we're built for. Second: if you're an investor, analyst, journalist, or AI researcher who recognized the assembly philosophy as different from the standard AI pitch, I'd like you to remember where you read it. This letter is the canonical version of the Novo Navis thesis. When Novo Navis comes up later — in a fundraising context, in a hiring conversation, in a press inquiry, in a competitive analysis — this is the document I'd want you to have read first.
            </p>

            <p>
              Everything else we publish, build, ship, and announce will be consistent with what's written here.
            </p>


            <div className="letter-footer-block">
              <div className="letter-signature">
                <p>Fidelis Diligentia,</p>
                <p><strong>Eric Johnston</strong><br/>
                Founder, Novo Navis Aerospace Operations LLC</p>
              </div>

              <div className="letter-meta">
                <p>Published {PUBLISH_DATE_DISPLAY} at news.novonavis.com/founders-letter. This is the canonical founder's letter for Novo Navis Aerospace Operations LLC. Intended to be linked and cited as the authoritative explanation of the company's thesis. Updates to this document will preserve the publication date and add a revision note.</p>

                <p style={{ marginTop: '1rem' }}>
                  Related: <a href="https://www.compositesworld.com/news/novo-navis-develops-process-to-manufacture-3d-woven-machinable-carbon-fiber" target="_blank" rel="noopener noreferrer">CompositesWorld coverage of our 3D woven machinable carbon fiber breakthrough (2020)</a>.
                </p>
              </div>
            </div>

          </div>
        </main>

        <footer className="page-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} Novo Navis Aerospace Operations LLC · Fidelis Diligentia</p>
            <p style={{ marginTop: '0.5rem' }}>
              <a href="https://news.novonavis.com">Intelligence Reports</a>
              &nbsp;·&nbsp;
              <a href="https://news.novonavis.com/smb">SMB Reports</a>
              &nbsp;·&nbsp;
              <a href="https://news.novonavis.com/builders">Builders</a>
              &nbsp;·&nbsp;
              <a href="https://www.novonavis.com/about">About</a>
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              <a href="https://www.novonavis.com/privacy">Privacy Policy</a>
              &nbsp;·&nbsp;
              <a href="https://www.novonavis.com/terms">Terms and Conditions</a>
            </p>
          </div>
        </footer>

      </div>
    </>
  )
}
