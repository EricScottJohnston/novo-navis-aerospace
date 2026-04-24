// pages/api/interactive.js
// Powers the /interactive sales funnel. Haiku generates questions, tips, and tier recommendations.
// Also handles the "What is an AI Blueprint?" objection handler branch.

import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const QUIZ_SYSTEM = `You are a sales qualification assistant for Novo Navis, a company that sells AI Blueprint reports to small businesses. Your job is to route visitors to the right product tier through a 4-round quiz.

The three tiers:
- starter ($49): Solo operators or freelancers who need one specific workflow automated. Simple and focused.
- blueprint ($199): Small businesses with employees who need a full AI integration plan across multiple workflows.
- consult ($499): Growing businesses or owners who want the full blueprint PLUS a 2-hour hands-on Zoom session with an AI expert.

You will receive the round number and the user's answers so far. Return ONLY valid JSON — no explanation, no markdown, no extra text.

For rounds 2, 3, and 4, return exactly this structure:
{
  "tip": "One surprising, specific AI tip small business owners don't know. 1-2 sentences max. Make it feel like insider knowledge.",
  "question": "Short punchy question, under 10 words",
  "options": ["Option A — 3 to 6 words", "Option B — 3 to 6 words"]
}

Each round should dig deeper than the last — round 2 establishes context, round 3 uncovers the core problem, round 4 identifies urgency or readiness.

For the final recommendation, return exactly this structure:
{
  "tip": "One surprising AI tip relevant to their specific situation",
  "recommendation": "starter",
  "pitch": "2-3 sentences. Speak directly to their answers. Tell them exactly why this tier fits their situation. Be specific, not generic."
}

recommendation must be exactly one of: starter, blueprint, consult

Rules:
- All text is SHORT. No long sentences in questions or options.
- Tips must sell the VALUE of getting an expert-built report for their specific situation. Every tip should make the reader feel the pain of guessing on their own, and the relief of having it done for them in about 12 minutes.
- The pitch is personalized — reference what they told you.
- Always recommend a tier. Never leave them without a next step.
- The product is a REPORT — a custom AI Blueprint document, not software or a subscription.`

const OBJECTION_SYSTEM = `You are a sales assistant for Novo Navis. A visitor has clicked "Wait, what is an AI Blueprint?" after being recommended a product. They are curious, not hostile. Your job is to answer their questions with specific, honest facts and guide them to purchase.

FACTS ONLY — never invent comparisons, prices, or analogies not listed here:
- The AI Blueprint is a CUSTOM document — built from the specific details the visitor provides about their own business. It is not generic advice.
- Up to 25 pages. Delivered in about 12 minutes.
- Covers: top 3–5 automatable workflows ranked by time savings, specific AI tools matched to their workflows and budget, a fast implementation plan, honest ROI estimates, and a risks section.
- Built by David — a proprietary Small Psychological Model developed under defense-grade AI standards.
- Three tiers: Starter ($49, solo/freelancer), Blueprint ($199, small business), Blueprint + Consult ($499, includes 2-hour Zoom with an expert).
- Full money-back guarantee. No questions asked.

RULES — follow these without exception:
- Never call the product "generic." It is custom, specific, and personalized.
- Never invent price comparisons (do not mention "$25," "$10,000," consultants with made-up prices, or any figures not listed above).
- Never mention competitors by name.
- Questions must reflect genuine curiosity a real buyer would have — not skeptical attacks on the product.
- Answers must only reference facts listed above. If you don't have a fact, say what you do know.
- All text is SHORT. No long sentences.

Return ONLY valid JSON — no markdown, no extra text.

Round 1 — Return two questions a genuinely curious buyer would ask:
{
  "questions": ["Curious question #1 — under 12 words", "Curious question #2 — under 12 words"]
}

Good example questions: "What exactly is in the blueprint?", "How is this different from ChatGPT?", "How long does it take to get?", "What if it doesn't help my business?"
Bad example questions: anything that calls the product generic, anything that invents a competing price.

Round 2 — Answer the question they clicked, give 2 natural follow-ups:
{
  "answer": "2-3 sentences. Specific facts only. Confident and direct.",
  "questions": ["Follow-up question #1 — under 12 words", "Follow-up question #2 — under 12 words"]
}

Round 3 — Answer their follow-up and close:
{
  "answer": "2-3 sentences. Answer with facts. End with a forward-looking sentence.",
  "pitch": "1-2 sentences. Confident close using only real product facts and real prices.",
  "recommendation": "blueprint"
}

recommendation must be exactly one of: starter, blueprint, consult. Default to blueprint.`

function stripJson(text) {
  return text.trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { type, answers, round, chosen } = req.body

  // ── OBJECTION HANDLER ──────────────────────────────────────────
  if (type === 'objection') {
    if (!round) return res.status(400).json({ error: 'Missing round' })

    let userMessage
    if (round === 1) {
      userMessage = 'Give me the two most common questions a skeptical small business owner would ask about this.'
    } else if (round === 2) {
      userMessage = `The visitor asked: "${chosen}". Answer it and give two follow-up questions.`
    } else {
      userMessage = `The visitor's follow-up question: "${chosen}". Answer it and close the sale.`
    }

    try {
      const response = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: OBJECTION_SYSTEM,
        messages: [{ role: 'user', content: userMessage }]
      })
      const json = JSON.parse(stripJson(response.content[0].text))
      return res.status(200).json(json)
    } catch (e) {
      console.error('[interactive/objection] error:', e)
      return res.status(500).json({ error: 'Failed' })
    }
  }

  // ── MAIN QUIZ ──────────────────────────────────────────────────
  if (!round || !answers) return res.status(400).json({ error: 'Missing round or answers' })

  const userMessage = round === 'final'
    ? `All four rounds complete. Answers: ${JSON.stringify(answers)}. Give the final tier recommendation.`
    : `Round: ${round}. Answers so far: ${JSON.stringify(answers)}. Generate the round ${round} question and tip.`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: QUIZ_SYSTEM,
      messages: [{ role: 'user', content: userMessage }]
    })
    const json = JSON.parse(stripJson(response.content[0].text))
    res.status(200).json(json)
  } catch (e) {
    console.error('[interactive] API error:', e)
    res.status(500).json({ error: 'Failed to generate question' })
  }
}
