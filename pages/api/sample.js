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

  if (!name || !email || !businessType || !workflow) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  let analysis = ''

  try {
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are an AI integration consultant for small businesses. A business owner has described one of their workflow problems. Analyze it and provide a specific, practical AI integration recommendation.

Business type: ${businessType}
Workflow problem: ${workflow}

Write 2-3 focused paragraphs tailored specifically to this type of business. Be specific — name actual AI tools (e.g. Zapier, Make.com, ChatGPT, Claude, Calendly, Jobber, ServiceTitan, etc.) that are relevant to this industry, and give a realistic time savings estimate. Do not use bullet points. Write in plain prose. Be direct and practical, not salesy. End by noting that a full 10-page report would analyze all their workflows and deliver a complete 90-day implementation roadmap.`
        }
      ]
    })

    analysis = message.content[0].text
  } catch (err) {
    console.error('Anthropic error:', err)
    return res.status(500).json({ error: 'Analysis failed. Please try again.' })
  }

  // Set 24-hour rate limit cookie
  res.setHeader('Set-Cookie', 'nn_sample_used=1; Max-Age=86400; Path=/; HttpOnly; SameSite=Strict')

  // Send immediate notification to Eric
  try {
    await resend.emails.send({
      from: 'Novo Navis <noreply@novonavis.com>',
      to: 'ericjohnston105@gmail.com',
      subject: `Free Sample Submitted — ${name} (${businessType})`,
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
  } catch (err) {
    // Non-fatal — don't fail the request if Eric's notification fails
    console.error('Eric notification error:', err)
  }

  return res.status(200).json({ analysis, name })
}
