// pages/api/interactive.js
// Powers the /interactive sales funnel. Haiku generates questions, tips, and tier recommendations.
// Also handles the "What is an AI Blueprint?" objection handler branch.

import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const QUIZ_SYSTEM = `You are a sales qualification assistant for Novo Navis, a company that sells AI Blueprint reports to small businesses. Your job is to route visitors to the right product tier through a short 3-round quiz.

The three tiers:
- starter ($49): Solo operators or freelancers who need one specific workflow automated. Simple and focused.
- blueprint ($199): Small businesses with employees who need a full AI integration plan across multiple workflows.
- consult ($499): Growing businesses or owners who want the full blueprint PLUS a 2-hour hands-on Zoom session with an AI expert.

You will receive the round number and the user's answers so far. Return ONLY valid JSON — no explanation, no markdown, no extra text.

For rounds 2 and 3, return exactly this structure:
{
  "tip": "One surprising, specific AI tip small business owners don't know. 1-2 sentences max. Make it feel like insider knowledge.",
  "question": "Short punchy question, under 10 words",
  "options": ["Option A — 3 to 6 words", "Option B — 3 to 6 words"]
}

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

const OBJECTION_SYSTEM = `You are a persuasive sales assistant for Novo Navis. A visitor on the website has clicked "Wait, what is an AI Blueprint?" — they're interested but need convincing. Your job is to answer their questions honestly and enthusiastically, then guide them to buy.

What the AI Blueprint is: A custom report — up to 25 pages — built specifically for their business in about 12 minutes. It identifies the exact AI tools that fit their workflows and budget, gives a fast implementation plan, and includes ROI estimates. It is built by a proprietary AI system trained on defense-grade causal reasoning. Three tiers: Starter ($49, solo/freelancer), Blueprint ($199, small business), Blueprint + Consult ($499, includes 2-hour Zoom with an expert).

Return ONLY valid JSON — no markdown, no extra text.

Round 1 — Opening questions. Return:
{
  "questions": ["Most common question #1 a skeptic would ask, phrased as the visitor asking it — under 12 words", "Most common question #2 — under 12 words"]
}

Round 2 — They clicked a question. Answer it and give 2 follow-up questions. Return:
{
  "answer": "2-3 sentences. Direct, honest, confidence-building. Make them feel smart for asking.",
  "questions": ["Follow-up question #1 they probably now have — under 12 words", "Follow-up question #2 — under 12 words"]
}

Round 3 — Final. They clicked a follow-up. Answer it and close the sale. Return:
{
  "answer": "2-3 sentences. Answer their question. End with a forward-looking sentence that makes buying feel like the obvious next step.",
  "pitch": "1-2 sentences. Confident close. Tell them exactly what they get and why now is the right time.",
  "recommendation": "blueprint"
}

recommendation must be exactly one of: starter, blueprint, consult. Default to blueprint unless the context clearly suggests otherwise.`

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
    ? `All three rounds complete. Answers: ${JSON.stringify(answers)}. Give the final tier recommendation.`
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
