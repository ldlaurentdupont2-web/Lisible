import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CATEGORIES, FREE_CODES } from '../lib/prompts'

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

const IconX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

function CategoryCard({ cat, selected, onClick }) {
  return (
    <button onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200
        ${selected ? 'border-terracotta bg-terracotta/5 shadow-md' : 'border-border-soft bg-white hover:border-terracotta/40 hover:shadow-sm'}`}>
      <div className="flex items-start gap-3">
        <span className="text-3xl leading-none mt-0.5">{cat.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={`font-semibold text-sm ${selected ? 'text-terracotta' : 'text-text-primary'}`}>{cat.label}</span>
            <span className={`text-sm font-bold whitespace-nowrap ${selected ? 'text-terracotta' : 'text-text-secondary'}`}>{cat.priceLabel}</span>
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

function AnalysisResult({ text }) {
  if (!text) return null
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-text-primary mt-6 mb-3 first:mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-bold text-terracotta-dark mt-6 mb-2 first:mt-0 flex items-center gap-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-bold text-text-primary mt-4 mb-1.5">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-sm text-text-primary leading-relaxed my-2">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="space-y-1.5 my-3 ml-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-1.5 my-3 ml-4 list-decimal">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="flex gap-2 text-sm text-text-primary leading-relaxed">
              <span className="text-terracotta mt-1 flex-shrink-0">▸</span>
              <span>{children}</span>
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-text-primary">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-text-secondary">{children}</em>
          ),
          hr: () => (
            <hr className="border-border-soft my-4" />
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-terracotta/40 pl-4 my-3 text-sm text-text-secondary italic">{children}</blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-terracotta/10">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="text-left px-3 py-2 font-semibold text-text-primary border border-border-soft text-xs">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-text-primary border border-border-soft text-xs leading-relaxed">{children}</td>
          ),
          tr: ({ children }) => (
            <tr className="even:bg-stone-50">{children}</tr>
          ),
          code: ({ children }) => (
            <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono text-text-primary">{children}</code>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  )
}

const STEPS = { HOME: 'home', UPLOAD: 'upload', PAYMENT: 'payment', LOADING: 'loading', RESULT: 'result' }
const INPUT_MODES = { FILE: 'file', TEXT: 'text' }
const ACCEPTED_TYPES = {
  'application/pdf': 'pdf',
  'image/jpeg': 'image',
  'image/jpg': 'image',
  'image/png': 'image',
  'image/webp': 'image',
  'image/gif': 'image',
}

export default function Home() {
  const [step, setStep] = useState(STEPS.HOME)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [inputMode, setInputMode] = useState(INPUT_MODES.FILE)
  const [documentText, setDocumentText] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
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
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)

  const fileInputRef = useRef(null)
  const cat = selectedCategory ? CATEGORIES[selectedCategory] : null

  // ─── Détection retour Stripe après paiement ───────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    const paid = sessionStorage.getItem('lisible_paid')
    const pendingRaw = sessionStorage.getItem('lisible_pending')
    if (paid === '1' && pendingRaw) {
      sessionStorage.removeItem('lisible_paid')
      sessionStorage.removeItem('lisible_pending')
      try {
        const data = JSON.parse(pendingRaw)
        setSelectedCategory(data.category)
        setQuestion(data.question || '')
        setInputMode(data.inputMode || INPUT_MODES.FILE)
        setDocumentText(data.documentText || '')
        setUploadedFile(data.uploadedFile || null)
        setStep(STEPS.LOADING)
        // Lancer l'analyse avec les données récupérées
        launchAnalysis(data)
      } catch (e) {
        console.error('Erreur récupération données pending:', e)
      }
    }
  }, [])

  // ─── Analyse avec données passées en paramètre (pour retour Stripe) ────────
  const launchAnalysis = async (data) => {
    setIsLoading(true)
    setAnalysisError('')
    try {
      const body = {
        category: data.category,
        question: data.question || '',
        paymentVerified: true,
      }
      if (data.inputMode === INPUT_MODES.FILE && data.uploadedFile) {
        if (data.uploadedFile.fileType === 'image') {
          body.imageBase64 = data.uploadedFile.base64
          body.imageMediaType = data.uploadedFile.type
        } else {
          body.pdfBase64 = data.uploadedFile.base64
        }
      } else {
        body.documentText = data.documentText || ''
      }
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || "Erreur lors de l'analyse.")
      setAnalysis(result.analysis)
      setStep(STEPS.RESULT)
    } catch (err) {
      setAnalysisError(err.message)
      setStep(STEPS.PAYMENT)
    } finally {
      setIsLoading(false)
    }
  }

  // ─── Analyse standard (code gratuit) ─────────────────────────────────────
  const handleAnalyze = async () => {
    setIsLoading(true)
    setAnalysisError('')
    setStep(STEPS.LOADING)
    try {
      const body = {
        category: selectedCategory,
        question: question.trim(),
        accessCode: accessCode.toUpperCase().trim(),
        paymentVerified: false,
      }
      if (inputMode === INPUT_MODES.FILE && uploadedFile) {
        if (uploadedFile.fileType === 'image') {
          body.imageBase64 = uploadedFile.base64
          body.imageMediaType = uploadedFile.type
        } else {
          body.pdfBase64 = uploadedFile.base64
        }
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

  // ─── Paiement Stripe ──────────────────────────────────────────────────────
  const handleStripeCheckout = async () => {
    setIsCheckoutLoading(true)
    // Sauvegarder les données du document en sessionStorage
    // pour les récupérer après le retour de Stripe
    sessionStorage.setItem('lisible_pending', JSON.stringify({
      category: selectedCategory,
      question: question.trim(),
      inputMode,
      documentText: documentText.trim(),
      uploadedFile: uploadedFile ? {
        base64: uploadedFile.base64,
        type: uploadedFile.type,
        fileType: uploadedFile.fileType,
        name: uploadedFile.name,
        size: uploadedFile.size,
      } : null,
    }))
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Erreur lors de la création du paiement. Réessayez.')
        setIsCheckoutLoading(false)
      }
    } catch (err) {
      alert('Erreur réseau. Vérifiez votre connexion et réessayez.')
      setIsCheckoutLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const fileType = ACCEPTED_TYPES[file.type]
    if (!fileType) {
      alert('Format non accepté. Utilisez un PDF, JPG ou PNG.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Fichier trop lourd (max 10 Mo).')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target.result.split(',')[1]
      setUploadedFile({ name: file.name, size: file.size, type: file.type, base64, fileType })
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileChange({ target: { files: [file] } })
  }

  const canContinue = inputMode === INPUT_MODES.FILE ? uploadedFile !== null : documentText.trim().length >= 20

  const handleApplyAccessCode = () => {
    const code = accessCode.toUpperCase().trim()
    if (FREE_CODES.includes(code)) { setIsFreeAccess(true); setAccessCodeError('') }
    else { setAccessCodeError('Code invalide.'); setIsFreeAccess(false) }
  }

  const handleFollowUp = async () => {
    if (!followUpQuestion.trim() || followUpUsed) return
    setIsFollowUpLoading(true)
    setFollowUpError('')
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selectedCategory, isFollowUp: true, previousAnalysis: analysis, followUpQuestion: followUpQuestion.trim() }),
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
    setStep(STEPS.HOME); setSelectedCategory(null); setInputMode(INPUT_MODES.FILE)
    setDocumentText(''); setUploadedFile(null); setQuestion('')
    setAccessCode(''); setAccessCodeError(''); setIsFreeAccess(false)
    setAnalysis(''); setAnalysisError('')
    setFollowUpQuestion(''); setFollowUpAnswer(''); setFollowUpUsed(false); setFollowUpError('')
    setIsCheckoutLoading(false)
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
        <header className="border-b border-border-soft bg-white/80 backdrop-blur-sm sticky top-0 z-10 no-print">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={handleReset} className="flex items-center gap-2 group">
              <span className="text-2xl">📖</span>
              <span className="font-bold text-lg text-text-primary group-hover:text-terracotta transition-colors">Lisible</span>
            </button>
            {step !== STEPS.HOME && step !== STEPS.LOADING && (
              <button onClick={step === STEPS.RESULT ? handleReset : () => {
                if (step === STEPS.UPLOAD) setStep(STEPS.HOME)
                if (step === STEPS.PAYMENT) setStep(STEPS.UPLOAD)
              }} className="flex items-center gap-1 text-sm text-text-secondary hover:text-terracotta transition-colors">
                <IconChevronLeft />{step === STEPS.RESULT ? 'Nouvelle analyse' : 'Retour'}
              </button>
            )}
          </div>
        </header>

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
                  Comprenez vos documents<br /><span className="text-terracotta">en langage clair</span>
                </h1>
                <p className="text-text-secondary text-base leading-relaxed max-w-md mx-auto">
                  Photo, PDF ou texte — recevez une analyse simple, rassurante et actionnable en quelques secondes.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">Choisissez le type de document</h2>
                <div className="space-y-2.5">
                  {Object.values(CATEGORIES).map((c) => (
                    <CategoryCard key={c.id} cat={c} selected={selectedCategory === c.id} onClick={() => setSelectedCategory(c.id)} />
                  ))}
                </div>
              </div>

              <button onClick={() => selectedCategory && setStep(STEPS.UPLOAD)} disabled={!selectedCategory}
                className={`w-full py-4 rounded-2xl font-semibold text-base transition-all duration-200
                  ${selectedCategory ? 'bg-terracotta text-white shadow-md hover:bg-terracotta-dark' : 'bg-border-soft text-text-secondary cursor-not-allowed'}`}>
                {selectedCategory ? `Analyser mon document — ${CATEGORIES[selectedCategory].priceLabel}` : 'Sélectionnez un type de document'}
              </button>

              <div className="grid grid-cols-3 gap-3 text-center">
                {[{ icon: '📸', label: 'Photo, PDF ou texte' }, { icon: '🔒', label: 'Données non stockées' }, { icon: '⚡', label: 'Résultat en 10 sec' }].map((item) => (
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
                <p className="text-sm text-text-secondary">Déposez une photo, un PDF, ou collez le texte de votre document.</p>
              </div>

              <div className="flex gap-2 p-1 bg-border-soft rounded-xl">
                <button onClick={() => setInputMode(INPUT_MODES.FILE)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${inputMode === INPUT_MODES.FILE ? 'bg-white text-terracotta shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}>
                  📎 Photo ou PDF
                </button>
                <button onClick={() => setInputMode(INPUT_MODES.TEXT)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${inputMode === INPUT_MODES.TEXT ? 'bg-white text-terracotta shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}>
                  ✏️ Coller le texte
                </button>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex gap-2.5">
                <span className="text-amber-500 text-lg flex-shrink-0">🛡️</span>
                <p className="text-xs text-amber-700 leading-relaxed">
                  <strong className="text-amber-800">Confidentialité :</strong> Pensez à masquer nom, adresse, numéro de sécurité sociale si possible.
                </p>
              </div>

              {inputMode === INPUT_MODES.FILE && (
                <div>
                  {!uploadedFile ? (
                    <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-terracotta/40 rounded-2xl p-10 text-center cursor-pointer hover:border-terracotta hover:bg-terracotta/5 transition-all">
                      <div className="text-4xl mb-3">📸</div>
                      <p className="font-semibold text-text-primary mb-1">Déposez votre document ici</p>
                      <p className="text-sm text-text-secondary mb-4">ou cliquez pour sélectionner</p>
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta text-white rounded-xl text-sm font-semibold">
                        <IconUpload /> Choisir un fichier
                      </span>
                      <p className="text-xs text-text-secondary mt-3">JPG, PNG, PDF · max 10 Mo</p>
                      <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/*" onChange={handleFileChange} className="hidden" />
                    </div>
                  ) : (
                    <div>
                      {uploadedFile.fileType === 'image' && (
                        <div className="mb-3 rounded-xl overflow-hidden border border-border-soft">
                          <img src={`data:${uploadedFile.type};base64,${uploadedFile.base64}`} alt="Aperçu" className="w-full max-h-64 object-contain bg-stone-50" />
                        </div>
                      )}
                      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <span className="text-2xl">{uploadedFile.fileType === 'image' ? '🖼️' : '📄'}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-green-800 text-sm truncate">{uploadedFile.name}</p>
                          <p className="text-xs text-green-600">{(uploadedFile.size / 1024).toFixed(0)} Ko — prêt à analyser</p>
                        </div>
                        <button onClick={() => setUploadedFile(null)} className="text-green-600 hover:text-red-500 transition-colors p-1">
                          <IconX />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {inputMode === INPUT_MODES.TEXT && (
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Texte du document <span className="text-terracotta">*</span>
                  </label>
                  <textarea value={documentText} onChange={(e) => setDocumentText(e.target.value)}
                    placeholder="Collez ici le texte de votre document…" rows={10}
                    className="w-full px-4 py-3 bg-white border-2 border-border-soft rounded-xl text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-terracotta transition-colors resize-y leading-relaxed" />
                  <p className="text-xs text-text-secondary mt-1.5 text-right">{documentText.length} caractères</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Votre question spécifique <span className="text-text-secondary font-normal">(facultatif)</span>
                </label>
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ex : Quel est le délai pour répondre ?"
                  className="w-full px-4 py-3 bg-white border-2 border-border-soft rounded-xl text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-terracotta transition-colors" />
              </div>

              <button onClick={() => setStep(STEPS.PAYMENT)} disabled={!canContinue}
                className={`w-full py-4 rounded-2xl font-semibold text-base transition-all duration-200
                  ${canContinue ? 'bg-terracotta text-white shadow-md hover:bg-terracotta-dark' : 'bg-border-soft text-text-secondary cursor-not-allowed'}`}>
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
                  <input type="text" value={accessCode}
                    onChange={(e) => { setAccessCode(e.target.value.toUpperCase()); setAccessCodeError(''); setIsFreeAccess(false) }}
                    placeholder="ADMIN, TEST, INVITE…"
                    className="flex-1 px-4 py-2.5 bg-beige border-2 border-border-soft rounded-xl text-sm font-mono uppercase focus:outline-none focus:border-terracotta transition-colors"
                    maxLength={20} />
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
                <button onClick={() => handleAnalyze()} disabled={isLoading}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-semibold text-base transition-all shadow-md">
                  Analyser gratuitement →
                </button>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleStripeCheckout}
                    disabled={isCheckoutLoading}
                    className="w-full py-4 bg-terracotta hover:bg-terracotta-dark text-white rounded-2xl font-semibold text-base transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                    {isCheckoutLoading
                      ? <><IconSpinner /> Redirection vers le paiement…</>
                      : <><IconLock /> Payer {cat.priceLabel} et analyser</>
                    }
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
                  className="no-print flex items-center gap-1.5 text-sm text-text-secondary hover:text-terracotta transition-colors px-3 py-1.5 rounded-lg border border-border-soft">
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
                    <input type="text" value={followUpQuestion} onChange={(e) => setFollowUpQuestion(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleFollowUp() }}
                      placeholder="Posez une question sur ce document…" disabled={isFollowUpLoading}
                      className="flex-1 px-4 py-2.5 bg-beige border-2 border-border-soft rounded-xl text-sm focus:outline-none focus:border-terracotta transition-colors disabled:opacity-50" />
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
            <p className="text-xs text-text-secondary">© 2024 Lisible — Aide à la compréhension de documents français</p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @media print { .no-print { display: none !important; } header { display: none !important; } footer { display: none !important; } }
        .markdown-body ol > li { list-style-type: decimal; margin-left: 1rem; }
        .markdown-body ol > li::marker { color: #c0714a; font-weight: 600; }
      `}</style>
    </>
  )
}
