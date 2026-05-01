// pages/api/analyze.js
import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPTS, FREE_CODES, CATEGORIES } from '../../lib/prompts'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    category,
    documentText,
    question,
    accessCode,
    paymentVerified,
    isFollowUp,
    previousAnalysis,
    followUpQuestion,
  } = req.body

  // Validate category
  if (!CATEGORIES[category]) {
    return res.status(400).json({ error: 'Catégorie invalide.' })
  }

  // Access control
  const isFreeCode = accessCode && FREE_CODES.includes(accessCode.toUpperCase().trim())
  const isPaid = paymentVerified === true

  if (!isFreeCode && !isPaid && !isFollowUp) {
    return res.status(402).json({ error: 'Paiement requis.' })
  }

  // Build messages
  let messages = []

  if (isFollowUp && previousAnalysis) {
    // Follow-up question: include prior analysis as context
    messages = [
      {
        role: 'user',
        content: `Voici l'analyse que tu as fournie précédemment :\n\n${previousAnalysis}\n\nQuestion de suivi de l'utilisateur : ${followUpQuestion}`,
      },
    ]
  } else {
    // First analysis
    let userMessage = ''

    if (!documentText || documentText.trim().length < 10) {
      return res.status(400).json({ error: 'Document trop court ou vide.' })
    }

    userMessage = `Voici le document à analyser :\n\n${documentText}`
    if (question && question.trim()) {
      userMessage += `\n\nQuestion spécifique de l'utilisateur : ${question.trim()}`
    }

    messages = [{ role: 'user', content: userMessage }]
  }

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: SYSTEM_PROMPTS[category],
      messages,
    })

    const responseText = message.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')

    return res.status(200).json({
      analysis: responseText,
      category,
      tokens: message.usage,
    })
  } catch (error) {
    console.error('Anthropic API error:', error)
    if (error.status === 401) {
      return res.status(500).json({ error: 'Clé API invalide. Contactez le support.' })
    }
    if (error.status === 429) {
      return res.status(429).json({ error: 'Trop de requêtes. Réessayez dans quelques secondes.' })
    }
    return res.status(500).json({ error: "Une erreur est survenue lors de l'analyse. Réessayez." })
  }
}
