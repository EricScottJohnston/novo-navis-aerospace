// pages/api/sample.js
// Receives free sample form submission, calls Claude Haiku for a single-workflow
// analysis, and emails Eric with the submission details.
// Rate limited to one analysis per user per 24 hours via cookie.

import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  // Rate limit check — one analysis per 24 hours per browser
  if (req.cookies['nn_sample_used']) {
    return res.status(429).json({ error: 'rate_limited' })
  }

  const { name, email, businessType, workflow } = req.body

  if (!email || !workflow) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const closingParagraph = 'This analysis looked at one workflow. The full Novo Navis report runs your entire business through a Small Psychological Model -- a proprietary system of seven specialized reasoning instances that analyze your operations from different angles simultaneously. One instance builds foundational knowledge about your industry. A second identifies the contextual factors most analysis misses. A third applies domain analysis to your specific situation. A fourth challenges every finding adversarially, looking for weak assumptions and false conclusions. A fifth extrapolates causal chains invisible to conventional analysis. A sixth hunts for outliers and edge cases where normal rules break down. All findings pass through a Causal Reasoning Framework that filters out correlation mistaken for causation -- the most common failure mode in AI-generated business advice. What reaches the final report has been stress-tested at every stage. That is what makes it different from asking ChatGPT.'

  const prompt = 'You are an AI integration consultant for small businesses. A business owner has described one of their workflow problems. Analyze it and provide a specific, practical AI integration recommendation.\n\n'
    + (businessType ? 'Business type: ' + businessType + '\n' : '')
    + 'Workflow problem: ' + workflow + '\n\n'
    + 'Write 2-3 focused paragraphs tailored specifically to this type of business. Be specific -- name actual AI tools (e.g. Zapier, Make.com, ChatGPT, Claude, Calendly, Jobber, ServiceTitan, etc.) that are relevant to this industry, and give a realistic time savings estimate. Do not use bullet points. Write in plain prose. Be direct and practical, not salesy.\n\n'
    + 'After your analysis, close with exactly this paragraph:\n\n'
    + closingParagraph

  let analysis = ''

  try {
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })

    analysis = message.content[0].text
  } catch (err) {
    console.error('Anthropic error:', err)
    return res.status(500).json({ error: 'Analysis failed. Please try again.' })
  }

  // Set 24-hour rate limit cookie
  res.setHeader('Set-Cookie', 'nn_sample_used=1; Max-Age=86400; Path=/; HttpOnly; SameSite=Strict')

  // Send immediate notification to Eric
  let emailError = null
  try {
    const emailResult = await resend.emails.send({
      from: 'Novo Navis <noreply@novonavis.com>',
      to: 'ericjohnston105@gmail.com',
      subject: `Free Sample Submitted — ${name || email}${businessType ? ' (' + businessType + ')' : ''}`,
      html: `
        <h2>Free Sample Analysis Submitted</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Business Type:</strong> ${businessType}</p>
        <hr />
        <h3>Their Workflow Problem</h3>
        <p>${workflow}</p>
        <hr />
        <h3>Analysis Delivered</h3>
        <p>${analysis.replace(/\n/g, '<br/>')}</p>
      `
    })
    if (emailResult.error) {
      emailError = emailResult.error
      console.error('Resend error:', emailResult.error)
    }
  } catch (err) {
    emailError = err.message
    console.error('Eric notification error:', err)
  }

  return res.status(200).json({ analysis, name, emailError })
}
