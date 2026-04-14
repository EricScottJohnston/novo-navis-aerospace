// components/ChatWidget.js
// Novo Navis embedded Claude sales chatbot

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

// Parse [text](url) markdown links into clickable elements
function MessageContent({ text }) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) })
    }
    parts.push({ type: 'link', label: match[1], href: match[2] })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) })
  }

  return (
    <span>
      {parts.map((part, i) => {
        if (part.type === 'link') {
          const isInternal = part.href.startsWith('/')
          const linkStyle = {
            color: '#c8a96e',
            fontWeight: 'bold',
            textDecoration: 'underline',
            textUnderlineOffset: '3px'
          }
          if (isInternal) {
            return <Link key={i} href={part.href} style={linkStyle}>{part.label}</Link>
          }
          return (
            <a key={i} href={part.href} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              {part.label}
            </a>
          )
        }
        return <span key={i}>{part.content}</span>
      })}
    </span>
  )
}

const OPENING_MESSAGE = {
  role: 'assistant',
  content: "Hey — what can I help you figure out? Whether you're wondering if AI actually applies to your business, or you want to know how the report works, I'm here."
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([OPENING_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const hasOpened = useRef(false)
  const recognitionRef = useRef(null)
  const logTimer = useRef(null)
  const logSent = useRef(false)
  const messagesRef = useRef(messages)

  // Keep ref in sync so the timer closure always sees current messages
  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  // Scroll to bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      hasOpened.current = true
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const toggleVoice = () => {
    if (typeof window === 'undefined') return
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser. Please use Chrome.')
      return
    }

    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      setInput(prev => prev ? prev + ' ' + transcript : transcript)
    }

    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
  }

  const sendLog = () => {
    if (logSent.current) return
    const msgs = messagesRef.current
    if (!msgs || msgs.length < 2) return
    if (!msgs.some((m, i) => i > 0 && m.role === 'user')) return

    logSent.current = true
    clearTimeout(logTimer.current)

    const data = JSON.stringify({ messages: msgs })
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([data], { type: 'application/json' })
      navigator.sendBeacon('/api/chat-log', blob)
    } else {
      fetch('/api/chat-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
        keepalive: true
      }).catch(() => {})
    }
  }

  // Send log when user leaves the page (tab close, navigate away, etc.)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') sendLog()
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', sendLog)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', sendLog)
    }
  }, [])

  const resetLogTimer = () => {
    if (logSent.current) return
    clearTimeout(logTimer.current)
    logTimer.current = setTimeout(sendLog, 10 * 60 * 1000) // 10 min inactivity fallback
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMessage = { role: 'user', content: text }
    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    // Add placeholder for streaming response
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content }))
        })
      })

      if (!res.ok) throw new Error('Request failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop()

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') break

          try {
            const parsed = JSON.parse(data)
            if (parsed.text) {
              fullText += parsed.text
              setMessages(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = { role: 'assistant', content: fullText }
                return updated
              })
            }
            if (parsed.error) {
              setMessages(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = { role: 'assistant', content: parsed.error }
                return updated
              })
            }
          } catch {}
        }
      }
    } catch (err) {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: "Something went wrong on my end. Try again or email us at support@novonavis.com."
        }
        return updated
      })
    }

    setLoading(false)
    resetLogTimer()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '16px',
          width: 'min(380px, calc(100vw - 32px))',
          height: 'min(520px, calc(100vh - 120px))',
          background: '#0a0f1a',
          border: '1px solid #1e2a45',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9999,
          overflow: 'hidden'
        }}>

          {/* Header */}
          <div style={{
            background: '#0d1221',
            borderBottom: '1px solid #1e2a45',
            padding: '0.875rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#1e2a45',
                border: '1px solid #c8a96e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                color: '#c8a96e',
                fontWeight: 'bold',
                letterSpacing: '0.05em'
              }}>
                NN
              </div>
              <div>
                <div style={{ color: '#c8a96e', fontSize: '0.85rem', fontWeight: 'bold', lineHeight: 1.2 }}>
                  Novo Navis
                </div>
                <div style={{ color: '#4caf50', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: '#4caf50', display: 'inline-block'
                  }} />
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#8a95aa',
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '4px',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.875rem'
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '85%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: msg.role === 'user' ? '#1e3a1e' : '#0d1221',
                  border: msg.role === 'user' ? '1px solid #2d5a2d' : '1px solid #1e2a45',
                  color: '#d0d8e8',
                  fontSize: '0.9rem',
                  lineHeight: '1.55'
                }}>
                  {msg.content === '' && loading && i === messages.length - 1 ? (
                    <span style={{ color: '#8a95aa', fontSize: '0.85rem' }}>
                      <span style={{ animation: 'chatDot 1.2s ease-in-out infinite' }}>·</span>
                      <span style={{ animation: 'chatDot 1.2s ease-in-out 0.4s infinite' }}>·</span>
                      <span style={{ animation: 'chatDot 1.2s ease-in-out 0.8s infinite' }}>·</span>
                    </span>
                  ) : (
                    <MessageContent text={msg.content} />
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            borderTop: '1px solid #1e2a45',
            padding: '0.75rem 1rem',
            display: 'flex',
            gap: '0.5rem',
            flexShrink: 0,
            background: '#0d1221'
          }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={listening ? 'Listening...' : 'Ask me anything...'}
              disabled={loading}
              style={{
                flex: 1,
                background: '#0a0f1a',
                border: `1px solid ${listening ? '#e53935' : '#1e2a45'}`,
                borderRadius: '6px',
                padding: '0.5rem 0.75rem',
                color: '#d0d8e8',
                fontSize: '0.9rem',
                outline: 'none',
                opacity: loading ? 0.6 : 1,
                transition: 'border-color 0.2s'
              }}
            />
            <button
              type="button"
              onClick={toggleVoice}
              disabled={loading}
              title={listening ? 'Stop listening' : 'Tap to speak'}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: listening ? '2px solid #e53935' : '2px solid #1e2a45',
                background: listening ? '#1a0000' : '#0d1221',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                padding: 0,
                flexShrink: 0,
                animation: listening ? 'micPulse 1s ease-in-out infinite' : 'none',
                transition: 'border-color 0.2s',
                opacity: loading ? 0.4 : 1
              }}
            >
              {listening ? '🔴' : '🎤'}
            </button>
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                background: input.trim() && !loading ? '#c8a96e' : '#1e2a45',
                border: 'none',
                borderRadius: '6px',
                padding: '0.5rem 0.875rem',
                color: input.trim() && !loading ? '#0a0f1a' : '#4a5568',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                transition: 'background 0.15s',
                flexShrink: 0
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label={open ? 'Close chat' : 'Chat with us'}
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#c8a96e',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(200, 169, 110, 0.4)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.08)'
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(200, 169, 110, 0.6)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(200, 169, 110, 0.4)'
        }}
      >
        {open ? '✕' : '💬'}
      </button>

      <style>{`
        @keyframes chatDot {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
        @keyframes micPulse {
          0%   { box-shadow: 0 0 0 0 rgba(229, 57, 53, 0.6); }
          70%  { box-shadow: 0 0 0 8px rgba(229, 57, 53, 0); }
          100% { box-shadow: 0 0 0 0 rgba(229, 57, 53, 0); }
        }
      `}</style>
    </>
  )
}
