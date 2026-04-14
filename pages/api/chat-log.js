// pages/api/chat-log.js
// Receives a chat transcript after 10 minutes of inactivity and emails it via Resend

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { messages } = req.body

  if (!messages || messages.length < 2) {
    return res.status(200).json({ ok: true }) // nothing worth logging
  }

  // Filter out the opening assistant message — only log real exchanges
  const conversation = messages.filter((m, i) => !(i === 0 && m.role === 'assistant'))
  if (!conversation.some(m => m.role === 'user')) {
    return res.status(200).json({ ok: true }) // no user messages
  }

  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Phoenix',
    dateStyle: 'medium',
    timeStyle: 'short'
  })

  const rows = messages.map(m => `
    <tr>
      <td style="padding: 8px 12px; vertical-align: top; white-space: nowrap; color: ${m.role === 'user' ? '#4caf50' : '#c8a96e'}; font-weight: bold; font-size: 13px; width: 80px;">
        ${m.role === 'user' ? 'Visitor' : 'Bot'}
      </td>
      <td style="padding: 8px 12px; color: #d0d8e8; font-size: 14px; line-height: 1.6;">
        ${m.content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#c8a96e">$1</a>')}
      </td>
    </tr>
  `).join('')

  const html = `
    <div style="background: #0a0f1a; padding: 24px; font-family: monospace;">
      <h2 style="color: #c8a96e; margin: 0 0 4px 0; font-size: 16px;">Novo Navis Chat Transcript</h2>
      <p style="color: #8a95aa; font-size: 12px; margin: 0 0 20px 0;">${timestamp} · ${messages.filter(m => m.role === 'user').length} visitor message(s)</p>
      <table style="width: 100%; border-collapse: collapse; background: #0d1221; border: 1px solid #1e2a45; border-radius: 6px;">
        ${rows}
      </table>
    </div>
  `

  try {
    await resend.emails.send({
      from: 'Novo Navis <noreply@novonavis.com>',
      to: 'ericjohnston105@gmail.com',
      subject: `Chat Transcript — ${timestamp}`,
      html
    })
  } catch (err) {
    console.error('Chat log email error:', err)
  }

  res.status(200).json({ ok: true })
}
