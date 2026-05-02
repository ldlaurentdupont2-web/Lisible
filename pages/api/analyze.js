// pages/api/analyze.js
import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPTS, PRECHECK_PROMPT, FREE_CODES, CATEGORIES } from '../../lib/prompts'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
  maxDuration: 60,
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function buildContentBlocks({ pdfBase64, imageBase64, imageMediaType, documentText, textLabel }) {
  if (pdfBase64) {
    return [
      { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 } },
      { type: 'text', text: textLabel },
    ]
  }
  if (imageBase64 && imageMediaType) {
    return [
      { type: 'image', source: { type: 'base64', media_type: imageMediaType, data: imageBase64 } },
      { type: 'text', text: textLabel },
    ]
  }
  return null // texte simple
}

// ─── Handler ────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  try {
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
      isPrecheck,
    } = req.body

    if (!category || !CATEGORIES[category]) {
      return res.status(400).json({ error: 'Catégorie invalide.' })
    }

    // ── PRECHECK ────────────────────────────────────────────────────────────
    if (isPrecheck) {
      const contentBlocks = buildContentBlocks({
        pdfBase64, imageBase64, imageMediaType, documentText,
        textLabel: `Évalue ce document pour la catégorie : ${CATEGORIES[category].label}.`,
      })

      let messages
      if (contentBlocks) {
        messages = [{ role: 'user', content: contentBlocks }]
      } else {
        const text = documentText || ''
        if (!text || text.trim().length < 10) {
          return res.status(200).json({
            precheck: { lisible: 'non', bonne_categorie: 'non', message: 'Le texte fourni est trop court pour être analysé.' }
          })
        }
        messages = [{ role: 'user', content: `Évalue ce document pour la catégorie : ${CATEGORIES[category].label}.\n\n${text}` }]
      }

      const precheckResult = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 256,
        system: PRECHECK_PROMPT,
        messages,
      })

      const raw = precheckResult.content.filter(b => b.type === 'text').map(b => b.text).join('')
      try {
        const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
        const parsed = JSON.parse(cleaned)
        return res.status(200).json({ precheck: parsed })
      } catch {
        // Si le JSON ne parse pas, on laisse passer (cas incertain)
        return res.status(200).json({
          precheck: { lisible: 'oui', bonne_categorie: 'incertain', message: 'Impossible de vérifier automatiquement — vous pouvez continuer.' }
        })
      }
    }

    // ── ANALYSE PRINCIPALE ──────────────────────────────────────────────────
    const isFreeCode = accessCode && FREE_CODES.includes(accessCode.toUpperCase().trim())
    const isPaid = paymentVerified === true

    if (!isFreeCode && !isPaid && !isFollowUp) {
      return res.status(402).json({ error: 'Paiement requis.' })
    }

    let messages = []

    if (isFollowUp && previousAnalysis) {
      messages = [{
        role: 'user',
        content: `Voici l'analyse que tu as fournie précédemment :\n\n${previousAnalysis}\n\nQuestion de suivi : ${followUpQuestion}`,
      }]
    } else {
      const questionText = question?.trim() ? `\n\nQuestion spécifique : ${question.trim()}` : ''
      const contentBlocks = buildContentBlocks({
        pdfBase64, imageBase64, imageMediaType, documentText,
        textLabel: `Voici le document à analyser.${questionText}`,
      })

      if (contentBlocks) {
        messages = [{ role: 'user', content: contentBlocks }]
      } else {
        const finalText = documentText || ''
        if (!finalText || finalText.trim().length < 10) {
          return res.status(400).json({ error: 'Document trop court ou vide.' })
        }
        let userMessage = `Voici le document à analyser :\n\n${finalText}`
        if (question?.trim()) userMessage += `\n\nQuestion spécifique : ${question.trim()}`
        messages = [{ role: 'user', content: userMessage }]
      }
    }

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: SYSTEM_PROMPTS[category],
      messages,
    })

    const responseText = message.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n')

    return res.status(200).json({ analysis: responseText, category })

  } catch (error) {
    console.error('Handler error:', error)
    if (error.status === 401) return res.status(500).json({ error: 'Clé API invalide.' })
    if (error.status === 429) return res.status(429).json({ error: 'Trop de requêtes. Réessayez dans quelques secondes.' })
    if (error.status === 404) return res.status(500).json({ error: 'Modèle introuvable. Contactez le support.' })
    return res.status(500).json({ error: "Erreur lors de l'analyse. Réessayez." })
  }
}
