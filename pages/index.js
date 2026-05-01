import { useState, useRef } from 'react'
import Head from 'next/head'
import { CATEGORIES, FREE_CODES } from '../lib/prompts'

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const IconPrint = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
  </svg>
)

const IconLock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const IconSpinner = () => (
  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
  </svg>
)

const IconUpload = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
)

const IconFile = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
)

const IconX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

// ─── Category Card ────────────────────────────────────────────────────────────

function CategoryCard({ cat, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200
        ${selected
          ? 'border-terracotta bg-terracotta/5 shadow-md'
          : 'border-border-soft bg-white hover:border-terracotta/40 hover:shadow-sm'
        }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl leading-none mt-0.5">{cat.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={`font-semibold text-sm ${selected ? 'text-terracotta' : 'text-text-primary'}`}>
              {cat.label}
            </span>
            <span className={`text-sm font-bold whitespace-nowrap ${selected ? 'text-terracotta' : 'text-text-secondary'}`}>
              {cat.priceLabel}
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5 leading-snug">{cat.description}</p>
        </div>
        {selected && (
          <div className="w-5 h-5 rounded-full bg-terracotta flex items-center justify-center flex-shrink-0 mt-0.5">
            <IconCheck />
          </div>
        )}
      </div>
    </button>
  )
}

// ─── Analysis Result Renderer ─────────────────────────────────────────────────

function AnalysisResult({ text }) {
  if (!text) return null
  const lines = text.split('\n')
  const rendered = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line) { i++; continue }

    const emojiHeaderMatch = line.match(/^(📄|🎯|⏰|✅|📞|⚠️|ℹ️|🔍|📌|💡|❗|🚨)\s*(.+)/)
    if (emojiHeaderMatch) {
      rendered.push(
        <div key={i} className="mt-5 first:mt-0">
          <h3 className="text-base font-semibold text-terracotta-dark flex items-center gap-2 mb-2">
            <span className="text-lg">{emojiHeaderMatch[1]}</span>
            <span>{emojiHeaderMatch[2]}</span>
          </h3>
        </div>
      )
      i++; continue
    }

    if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      rendered.push(
        <h3 key={i} className="text-sm font-bold text-text-primary mt-4 mb-1">
          {line.replace(/\*\*/g, '')}
        </h3>
      )
      i++; continue
    }

    if (line.startsWith('- ') || line.startsWith('• ') || line.startsWith('* ')) {
      const bulletItems = []
      while (i < lines.length) {
        const bLine = lines[i].trim()
        if (bLine.startsWith('- ') || bLine.startsWith('• ') || bLine.startsWith('* ')) {
          bulletItems.push(bLine.replace(/^[-•*]\s+/, ''))
          i++
        } else break
      }
      rendered.push(
        <ul key={`ul-${i}`} className="space-y-1.5 my-2">
          {bulletItems.map((item, idx) => (
            <li key={idx} className="flex gap-2 text-sm text-text-primary leading-relaxed">
              <span className="text-terracotta mt-1 flex-shrink-0">▸</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ul>
      )
      continue
    }

    rendered.push(
      <p key={i} className="text-sm text-text-primary leading-relaxed my-1.5"
        dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
    )
    i++
  }

  return <div className="space-y-0.5">{rendered}</div>
}

function formatInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
}

// ─── Main App ─────────────────────────────────────────────────────────────────

const STEPS = { HOME: 'home', UPLOAD: 'upload', PAYMENT: 'payment', LOADING: 'loading', RESULT: 'result' }
const INPUT_MODES = { TEXT: 'text', PDF: 'pdf' }

export default function Home() {
  const [step, setStep] = useState(STEPS.HOME)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [inputMode, setInputMode] = useState(INPUT_MODES.TEXT)
  const [documentText, setDocumentText] = useState('')
  const [pdfFile, setPdfFile] = useState(null)
  const [pdfBase64, setPdfBase64] = useState(null)
  const [question, setQuestion] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [accessCodeError, setAccessCodeError] = useState('')
  const [isFreeAccess, setIsFreeAccess] = useState(false)
  const [analysis, setAnalysis] = useState('')
  const [analysisError, setAnalysisError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [followUpQuestion, setFollowUpQuestion] = useState('')
  const [followUpAnswer, setFollowUpAnswer] = useState('')
  const [followUpUsed, setFollowUpUsed] = useState(false)
  const [isFollowUpLoading, setIsFollowUpLoading] = useState(false)
  const [followUpError, setFollowUpError] = useState('')

  const fileInputRef = useRef(null)
  const cat = selectedCategory ? CATEGORIES[selectedCategory] : null

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      alert('Seuls les fichiers PDF sont acceptés.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Fichier trop lourd (max 10 Mo).')
      return
    }
    setPdfFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target.result.split(',')[1]
      setPdfBase64(base64)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      const fakeEvent = { target: { files: [file] } }
      handleFileChange(fakeEvent)
    }
  }

  const canContinue = inputMode === INPUT_MODES.TEXT
    ? documentText.trim().length >= 20
    : pdfBase64 !== null

  const handleApplyAccessCode = () => {
    const code = accessCode.toUpperCase().trim()
    if (FREE_CODES.includes(code)) {
      setIsFreeAccess(true)
      setAccessCodeError('')
    } else {
      setAccessCodeError('Code invalide. Vérifiez et réessayez.')
      setIsFreeAccess(false)
    }
  }

  const handleAnalyze = async (paymentVerified = false) => {
    setIsLoading(true)
    setAnalysisError('')
    setStep(STEPS.LOADING)

    try {
      const body = {
        category: selectedCategory,
        question: question.trim(),
        accessCode: accessCode.toUpperCase().trim(),
        paymentVerified,
      }

      if (inputMode === INPUT_MODES.PDF && pdfBase64) {
        body.pdfBase64 = pdfBase64
      } else {
        body.documentText = documentText.trim()
      }

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'analyse.")

      setAnalysis(data.analysis)
      setStep(STEPS.RESULT)
    } catch (err) {
      setAnalysisError(err.message)
      setStep(STEPS.PAYMENT)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFollowUp = async () => {
    if (!followUpQuestion.trim() || followUpUsed) return
    setIsFollowUpLoading(true)
    setFollowUpError('')
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          isFollowUp: true,
          previousAnalysis: analysis,
          followUpQuestion: followUpQuestion.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur.')
      setFollowUpAnswer(data.analysis)
      setFollowUpUsed(true)
    } catch (err) {
      setFollowUpError(err.message)
    } finally {
      setIsFollowUpLoading(false)
    }
  }

  const handleReset = () => {
    setStep(STEPS.HOME)
    setSelectedCategory(null)
    setInputMode(INPUT_MODES.TEXT)
    setDocumentText('')
    setPdfFile(null)
    setPdfBase64(null)
    setQuestion('')
    setAccessCode('')
    setAccessCodeError('')
    setIsFreeAccess(false)
    setAnalysis('')
    setAnalysisError('')
    setFollowUpQuestion('')
    setFollowUpAnswer('')
    setFollowUpUsed(false)
    setFollowUpError('')
  }

  return (
    <>
      <Head>
        <title>Lisible — Comprendre vos documents en clair</title>
        <meta name="description" content="Analysez vos courriers administratifs, bulletins de paie, baux, contrats et actes d'huissier en langage simple." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <div className="min-h-screen bg-beige" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Header */}
        <header className="border-b border-border-soft bg-white/80 backdrop-blur-sm sticky top-0 z-10 no-print">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={handleReset} className="flex items-center gap-2 group">
              <span className="text-2xl">📖</span>
              <span className="font-bold text-lg text-text-primary group-hover:text-terracotta transition-colors">Lisible</span>
            </button>
            {step !== STEPS.HOME && step !== STEPS.LOADING && (
              <button
                onClick={step === STEPS.RESULT ? handleReset : () => {
                  if (step === STEPS.UPLOAD) setStep(STEPS.HOME)
                  if (step === STEPS.PAYMENT) setStep(STEPS.UPLOAD)
                }}
                className="flex items-center gap-1 text-sm text-text-secondary hover:text-terracotta transition-colors"
              >
                <IconChevronLeft />
                {step === STEPS.RESULT ? 'Nouvelle analyse' : 'Retour'}
              </button>
            )}
          </div>
        </header>

        {/* Progress bar */}
        {step !== STEPS.HOME && step !== STEPS.LOADING && (
          <div className="h-1 bg-border-soft no-print">
            <div className="h-full bg-terracotta transition-all duration-500"
              style={{ width: step === STEPS.UPLOAD ? '33%' : step === STEPS.PAYMENT ? '66%' : '100%' }} />
          </div>
        )}

        <main className="max-w-2xl mx-auto px-4 py-8">

          {/* HOME */}
          {step === STEPS.HOME && (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full text-terracotta text-sm font-medium">
                  <span>✨</span><span>Analyse par intelligence artificielle</span>
                </div>
                <h1 className="text-3xl font-bold text-text-primary leading-tight">
                  Comprenez vos documents<br />
                  <span className="text-terracotta">en langage clair</span>
                </h1>
                <p className="text-text-secondary text-base leading-relaxed max-w-md mx-auto">
                  Déposez votre PDF ou collez votre texte. Recevez une analyse simple, rassurante et actionnable en quelques secondes.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
                  Choisissez le type de document
                </h2>
                <div className="space-y-2.5">
                  {Object.values(CATEGORIES).map((c) => (
                    <CategoryCard key={c.id} cat={c} selected={selectedCategory === c.id} onClick={() => setSelectedCategory(c.id)} />
                  ))}
                </div>
              </div>

              <button
                onClick={() => selectedCategory && setStep(STEPS.UPLOAD)}
                disabled={!selectedCategory}
                className={`w-full py-4 rounded-2xl font-semibold text-base transition-all duration-200
                  ${selectedCategory ? 'bg-terracotta text-white shadow-md hover:bg-terracotta-dark' : 'bg-border-soft text-text-secondary cursor-not-allowed'}`}
              >
                {selectedCategory ? `Analyser mon document — ${CATEGORIES[selectedCategory].priceLabel}` : 'Sélectionnez un type de document'}
              </button>

              <div className="grid grid-cols-3 gap-3 text-center">
                {[{ icon: '📎', label: 'PDF ou texte acceptés' }, { icon: '🔒', label: 'Données non stockées' }, { icon: '⚡', label: 'Résultat en 10 sec' }].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-3 border border-border-soft">
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-xs text-text-secondary font-medium leading-tight">{item.label}</div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-text-secondary text-center leading-relaxed">
                Lisible est un outil d'aide à la compréhension. Il ne constitue pas un conseil juridique ou administratif personnalisé.
              </p>
            </div>
          )}

          {/* UPLOAD */}
          {step === STEPS.UPLOAD && cat && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{cat.emoji}</span>
                  <h2 className="text-xl font-bold text-text-primary">{cat.label}</h2>
                </div>
                <p className="text-sm text-text-secondary">Déposez votre PDF ou collez le texte de votre document.</p>
              </div>

              {/* Mode selector */}
              <div className="flex gap-2 p-1 bg-border-soft rounded-xl">
                <button
                  onClick={() => setInputMode(INPUT_MODES.PDF)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${inputMode === INPUT_MODES.PDF ? 'bg-white text-terracotta shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  📎 Déposer un PDF
                </button>
                <button
                  onClick={() => setInputMode(INPUT_MODES.TEXT)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${inputMode === INPUT_MODES.TEXT ? 'bg-white text-terracotta shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  ✏️ Coller le texte
                </button>
              </div>

              {/* Privacy notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex gap-2.5">
                <span className="text-amber-500 text-lg flex-shrink-0">🛡️</span>
                <p className="text-xs text-amber-700 leading-relaxed">
                  <strong className="text-amber-800">Confidentialité :</strong> Pensez à masquer nom, adresse, numéro de sécurité sociale et toute référence personnelle si possible.
                </p>
              </div>

              {/* PDF upload zone */}
              {inputMode === INPUT_MODES.PDF && (
                <div>
                  {!pdfFile ? (
                    <div
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-terracotta/40 rounded-2xl p-10 text-center cursor-pointer hover:border-terracotta hover:bg-terracotta/5 transition-all"
                    >
                      <div className="text-4xl mb-3">📄</div>
                      <p className="font-semibold text-text-primary mb-1">Déposez votre PDF ici</p>
                      <p className="text-sm text-text-secondary mb-4">ou cliquez pour sélectionner</p>
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta text-white rounded-xl text-sm font-semibold">
                        <IconUpload /> Choisir un fichier
                      </span>
                      <p className="text-xs text-text-secondary mt-3">PDF uniquement · max 10 Mo</p>
                      <input ref={fileInputRef} type="file" accept=".pdf,application/pdf" onChange={handleFileChange} className="hidden" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <span className="text-2xl">✅</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-green-800 text-sm truncate">{pdfFile.name}</p>
                        <p className="text-xs text-green-600">{(pdfFile.size / 1024).toFixed(0)} Ko — prêt à analyser</p>
                      </div>
                      <button onClick={() => { setPdfFile(null); setPdfBase64(null) }} className="text-green-600 hover:text-red-500 transition-colors">
                        <IconX />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Text input */}
              {inputMode === INPUT_MODES.TEXT && (
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Texte du document <span className="text-terracotta">*</span>
                  </label>
                  <textarea
                    value={documentText}
                    onChange={(e) => setDocumentText(e.target.value)}
                    placeholder="Collez ici le texte de votre document…"
                    rows={10}
                    className="w-full px-4 py-3 bg-white border-2 border-border-soft rounded-xl text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-terracotta transition-colors resize-y leading-relaxed"
                  />
                  <p className="text-xs text-text-secondary mt-1.5 text-right">{documentText.length} caractères</p>
                </div>
              )}

              {/* Optional question */}
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Votre question spécifique <span className="text-text-secondary font-normal">(facultatif)</span>
                </label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ex : Quel est le délai pour répondre ?"
                  className="w-full px-4 py-3 bg-white border-2 border-border-soft rounded-xl text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-terracotta transition-colors"
                />
              </div>

              <button
                onClick={() => setStep(STEPS.PAYMENT)}
                disabled={!canContinue}
                className={`w-full py-4 rounded-2xl font-semibold text-base transition-all duration-200
                  ${canContinue ? 'bg-terracotta text-white shadow-md hover:bg-terracotta-dark' : 'bg-border-soft text-text-secondary cursor-not-allowed'}`}
              >
                Continuer →
              </button>
            </div>
          )}

          {/* PAYMENT */}
          {step === STEPS.PAYMENT && cat && (
            <div className="space-y-6">
              <div className="card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{cat.emoji}</span>
                  <div>
                    <h2 className="font-bold text-text-primary">{cat.label}</h2>
                    <p className="text-sm text-text-secondary">Analyse complète + 1 question de suivi incluse</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-border-soft">
                  <span className="text-sm text-text-secondary">Total</span>
                  <span className="text-xl font-bold text-terracotta">{cat.priceLabel}</span>
                </div>
              </div>

              {analysisError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-sm text-red-700">⚠️ {analysisError}</div>
              )}

              <div className="card p-5 space-y-4">
                <h3 className="font-semibold text-text-primary text-sm">Vous avez un code d'accès ?</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={accessCode}
                    onChange={(e) => { setAccessCode(e.target.value.toUpperCase()); setAccessCodeError(''); setIsFreeAccess(false) }}
                    placeholder="ADMIN, TEST, INVITE…"
                    className="flex-1 px-4 py-2.5 bg-beige border-2 border-border-soft rounded-xl text-sm font-mono uppercase focus:outline-none focus:border-terracotta transition-colors"
                    maxLength={20}
                  />
                  <button onClick={handleApplyAccessCode} className="px-4 py-2.5 bg-terracotta text-white rounded-xl text-sm font-semibold hover:bg-terracotta-dark transition-colors">
                    Valider
                  </button>
                </div>
                {accessCodeError && <p className="text-xs text-red-600">{accessCodeError}</p>}
                {isFreeAccess && (
                  <p className="text-xs text-green-700 font-semibold flex items-center gap-1.5">
                    <IconCheck /> Code validé — accès gratuit activé
                  </p>
                )}
              </div>

              {isFreeAccess ? (
                <button onClick={() => handleAnalyze(false)} disabled={isLoading}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-semibold text-base transition-all shadow-md">
                  Analyser gratuitement →
                </button>
              ) : (
                <div className="space-y-3">
                  <button onClick={() => handleAnalyze(true)}
                    className="w-full py-4 bg-terracotta hover:bg-terracotta-dark text-white rounded-2xl font-semibold text-base transition-all shadow-md flex items-center justify-center gap-2">
                    <IconLock /> Payer {cat.priceLabel} et analyser
                  </button>
                  <p className="text-xs text-text-secondary text-center flex items-center justify-center gap-1">
                    <IconLock /> Paiement sécurisé via Stripe — votre document n'est pas conservé
                  </p>
                </div>
              )}
            </div>
          )}

          {/* LOADING */}
          {step === STEPS.LOADING && (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-terracotta/20 border-t-terracotta animate-spin" />
                <span className="absolute inset-0 flex items-center justify-center text-2xl">{cat?.emoji}</span>
              </div>
              <div className="text-center space-y-1">
                <p className="font-semibold text-text-primary">Analyse en cours…</p>
                <p className="text-sm text-text-secondary">Cela prend généralement 10 à 20 secondes.</p>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-terracotta animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}

          {/* RESULT */}
          {step === STEPS.RESULT && (
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{cat?.emoji}</span>
                    <h2 className="font-bold text-xl text-text-primary">Analyse de votre document</h2>
                  </div>
                  <p className="text-sm text-text-secondary">{cat?.label}</p>
                </div>
                <button onClick={() => window.print()}
                  className="no-print flex items-center gap-1.5 text-sm text-text-secondary hover:text-terracotta transition-colors px-3 py-1.5 rounded-lg border border-border-soft hover:border-terracotta/30">
                  <IconPrint /> Imprimer
                </button>
              </div>

              <div className="card p-5 md:p-6">
                <AnalysisResult text={analysis} />
              </div>

              <div className="bg-stone-100 rounded-xl p-4 text-xs text-text-secondary leading-relaxed">
                <strong className="text-text-primary">Rappel important :</strong> Cette analyse est fournie à titre informatif uniquement. Elle ne constitue pas un conseil juridique, administratif ou fiscal.
              </div>

              {!followUpUsed && (
                <div className="card p-5 no-print">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">💬</span>
                    <h3 className="font-semibold text-text-primary text-sm">Une question de suivi incluse</h3>
                    <span className="ml-auto text-xs text-terracotta font-semibold bg-terracotta/10 px-2 py-0.5 rounded-full">Gratuit</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={followUpQuestion}
                      onChange={(e) => setFollowUpQuestion(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleFollowUp() }}
                      placeholder="Posez une question sur ce document…"
                      disabled={isFollowUpLoading}
                      className="flex-1 px-4 py-2.5 bg-beige border-2 border-border-soft rounded-xl text-sm focus:outline-none focus:border-terracotta transition-colors disabled:opacity-50"
                    />
                    <button onClick={handleFollowUp} disabled={!followUpQuestion.trim() || isFollowUpLoading}
                      className="px-4 py-2.5 bg-terracotta text-white rounded-xl text-sm font-semibold hover:bg-terracotta-dark transition-colors disabled:opacity-40 flex items-center gap-1.5">
                      {isFollowUpLoading ? <IconSpinner /> : '→'}
                    </button>
                  </div>
                  {followUpError && <p className="text-xs text-red-600 mt-2">{followUpError}</p>}
                </div>
              )}

              {followUpAnswer && (
                <div className="card p-5 border-l-4 border-terracotta">
                  <div className="flex items-center gap-2 mb-3">
                    <span>💬</span>
                    <h3 className="font-semibold text-text-primary text-sm">Réponse à votre question</h3>
                  </div>
                  <AnalysisResult text={followUpAnswer} />
                </div>
              )}

              <button onClick={handleReset}
                className="w-full py-3.5 rounded-2xl border-2 border-terracotta text-terracotta font-semibold text-sm hover:bg-terracotta/5 transition-all no-print">
                Analyser un autre document
              </button>
            </div>
          )}

        </main>

        <footer className="border-t border-border-soft py-6 mt-8 no-print">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <p className="text-xs text-text-secondary">
              © 2024 Lisible — Aide à la compréhension de documents français
            </p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @media print { .no-print { display: none !important; } header { display: none !important; } footer { display: none !important; } }
      `}</style>
    </>
  )
}
