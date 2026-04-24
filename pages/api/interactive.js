// pages/api/interactive.js
// Powers the /interactive sales funnel. Haiku generates questions, tips, and tier recommendations.

import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM = `You are a sales qualification assistant for Novo Navis, a company that sells AI Blueprint reports to small businesses. Your job is to route visitors to the right product tier through a short 3-round quiz.

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
- Tips feel like secrets — things they haven't heard before.
- The pitch is personalized — reference what they told you.
- Always recommend a tier. Never leave them without a next step.`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { answers, round } = req.body

  if (!round || !answers) return res.status(400).json({ error: 'Missing round or answers' })

  const userMessage = round === 'final'
    ? `All three rounds complete. Answers: ${JSON.stringify(answers)}. Give the final tier recommendation.`
    : `Round: ${round}. Answers so far: ${JSON.stringify(answers)}. Generate the round ${round} question and tip.`

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: SYSTEM,
      messages: [{ role: 'user', content: userMessage }]
    })

    const text = response.content[0].text.trim()
    const json = JSON.parse(text)
    res.status(200).json(json)
  } catch (e) {
    console.error('[interactive] API error:', e)
    res.status(500).json({ error: 'Failed to generate question' })
  }
}
