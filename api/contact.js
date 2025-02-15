export async function sendContactMessage(data) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Failed to send message')
    }

    return await response.json()
  } catch (error) {
    console.error('Error:', error)
    throw new Error('Failed to send message')
  }
} 