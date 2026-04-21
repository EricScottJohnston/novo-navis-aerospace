// pages/api/send-to-desktop.js
// Emails the visitor a link to the homepage and notifies Eric

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'Email required' })

  try {
    // Email to visitor
    await resend.emails.send({
      from: 'Novo Navis <noreply@novonavis.com>',
      to: email,
      subject: 'Your AI Blueprint link from Novo Navis',
      html: `
        <p>Here's the link you requested — open it on your desktop to get your AI Blueprint.</p>
        <p style="margin: 1.5rem 0;">
          <a href="https://novonavis.com" style="background: #FFD814; color: #111; font-weight: bold; padding: 0.75rem 1.5rem; border-radius: 4px; text-decoration: none;">
            Get My AI Blueprint — $199
          </a>
        </p>
        <p style="color: #888; font-size: 13px;">100% money-back guarantee. Built and delivered in real time.</p>
        <p style="color: #888; font-size: 12px; margin-top: 2rem;">Novo Navis Aerospace Operations LLC · support@novonavis.com · (623) 428-9308</p>
      `
    })

    // Notification to Eric
    await resend.emails.send({
      from: 'Novo Navis <noreply@novonavis.com>',
      to: 'ericjohnston105@gmail.com',
      subject: `Send to Desktop — ${email}`,
      html: `
        <p>A mobile visitor requested a desktop link.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p style="color: #888; font-size: 12px;">This is a warm lead — they were interested enough to ask for a reminder.</p>
      `
    })

    res.status(200).json({ success: true })
  } catch (err) {
    console.error('Send to desktop error:', err)
    res.status(500).json({ error: 'Failed to send' })
  }
}
