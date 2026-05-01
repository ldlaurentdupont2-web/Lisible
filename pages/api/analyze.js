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

async function extractTextFromPdf(base64Data) {
  try {
    const pdfParse = (await import('pdf-parse')).default
    const buffer = Buffer.from(base64Data, 'base64')
    const data = await pdfParse(buffer)
    return data.text
  } catch (err) {
    console.error('PDF parse error:', err)
    throw new Error('Impossible de lire ce PDF. Essayez de coller le texte directement.')
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    category,
    documentText,
    pdfBase64,
    imageBase64,
    imageMediaType,
    question,
    accessCode,
    paymentVerified,
    isFollowUp,
    previousAnalysis,
    followUpQuestion,
  } = req.body

  if (!CATEGORIES[category]) {
    return res.status(400).json({ error: 'Catégorie invalide.' })
  }

  const isFreeCode = accessCode && FREE_CODES.includes(accessCode.toUpperCase().trim())
  const isPaid = paymentVerified === true

  if (!isFreeCode && !isPaid && !isFollowUp) {
    return res.status(402).json({ error: 'Paiement requis.' })
  }

  let messages = []

  if (isFollowUp && previousAnalysis) {
    messages = [
      {
        role: 'user',
        content: `Voici l'analyse que tu as fournie précédemment :\n\n${previousAnalysis}\n\nQuestion de suivi de l'utilisateur : ${followUpQuestion}`,
      },
    ]
  } else if (imageBase64 && imageMediaType) {
    // Image mode — send directly to Claude vision
    const questionText = question && question.trim()
      ? `\n\nQuestion spécifique de l'utilisateur : ${question.trim()}`
      : ''

    messages = [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: imageMediaType,
              data: imageBase64,
            },
          },
          {
            type: 'text',
            text: `Voici le document à analyser (image).${questionText}`,
          },
        ],
      },
    ]
  } else {
    // Text or PDF mode
    let finalText = documentText || ''

    if (pdfBase64) {
      try {
        finalText = await extractTextFromPdf(pdfBase64)
      } catch (err) {
        return res.status(400).json({ error: err.message })
      }
    }

    if (!finalText || finalText.trim().length < 10) {
      return res.status(400).json({ error: 'Document trop court ou vide.' })
    }

    let userMessage = `Voici le document à analyser :\n\n${finalText}`
    if (question && question.trim()) {
      userMessage += `\n\nQuestion spécifique de l'utilisateur : ${question.trim()}`
    }

    messages = [{ role: 'user', content: userMessage }]
  }

  try {
    const message = await client.messages.create({
    model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: SYSTEM_PROMPTS[category],
      messages,
    })

    const responseText = message.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')

    return res.status(200).json({ analysis: responseText, category })
  } catch (error) {
    console.error('Anthropic API error:', error)
    if (error.status === 401) return res.status(500).json({ error: 'Clé API invalide.' })
    if (error.status === 429) return res.status(429).json({ error: 'Trop de requêtes. Réessayez.' })
    return res.status(500).json({ error: "Erreur lors de l'analyse. Réessayez." })
  }
}
