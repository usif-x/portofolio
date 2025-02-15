import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const { name, email, message } = await readBody(event)

    const messageText = `
New Contact Form Submission:
---------------------------
Name: ${name}
Email: ${email}
Message: ${message}
---------------------------
Sent from: Portfolio Website
`

    const response = await fetch(`https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: config.TELEGRAM_CHAT_ID,
        text: messageText,
        parse_mode: 'HTML'
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Telegram API Error:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to send to Telegram'
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to send message'
    })
  }
}) 