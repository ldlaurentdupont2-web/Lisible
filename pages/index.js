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

const IconExternalLink = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

// ─── Données des exemples ──────────────────────────────────────────────────
const EXAMPLES = {
  administratif: {
    label: 'Courrier administratif',
    emoji: '🏛️',
    docDescription: 'Notification de trop-perçu CAF — 347 €',
    imageUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=600&q=80',
    imageAlt: 'Exemple de courrier administratif',
    analysis: `## 📄 Ce que vous avez reçu

Vous avez reçu une notification d'un organisme social vous informant d'un trop-perçu de **347 €** au titre des aides au logement versées entre janvier et mars. Cela signifie que l'organisme estime vous avoir versé davantage que ce à quoi vous aviez droit sur cette période.

## 🎯 Ce que ça signifie concrètement

Ce courrier vous demande de rembourser une somme qui a été versée en trop. Ce type de situation est fréquent et arrive souvent suite à un changement de situation non signalé (emploi, revenus, déménagement) ou à une régularisation annuelle. **Cela ne signifie pas que vous avez commis une fraude.**

## ⏰ Délai à respecter

Le courrier mentionne un délai de **20 jours** à compter de sa réception pour contester ou prendre contact. Passé ce délai, la retenue peut être effectuée directement sur vos prochaines allocations.

## ✅ Ce que vous pouvez faire

- **Vérifier** si le montant réclamé vous semble juste au regard de votre situation réelle
- **Contacter** l'organisme pour demander un échelonnement si vous ne pouvez pas payer en une fois
- **Contester** si vous pensez que le calcul est erroné, en envoyant un courrier motivé avec les justificatifs correspondants

## 📞 Où obtenir de l'aide

En cas de doute, **France Services** (guichet de proximité, gratuit) peut vous aider à rédiger une réponse ou à comprendre votre dossier.`,
    questions: [
      'Sur quelle période exacte porte ce trop-perçu ?',
      'Comment l\'organisme a-t-il calculé ce montant ?',
      'Est-il possible de le rembourser en plusieurs fois ?',
      'Où envoyer ma contestation et sous quelle forme ?',
    ],
  },
  paie: {
    label: 'Bulletin de paie',
    emoji: '💶',
    docDescription: 'Bulletin de paie — Février 2024, secteur privé',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    imageAlt: 'Exemple de bulletin de paie',
    analysis: `## 💶 Synthèse du bulletin

Bulletin du mois de **février 2024**. Salarié non cadre, temps plein 35h.

| | Montant |
|---|---|
| Salaire brut | 2 450,00 € |
| Net avant impôt | 1 912,00 € |
| Prélèvement à la source (8 %) | 153,00 € |
| **Net à payer** | **1 759,00 €** |

## 🔍 Les principales lignes expliquées

**Cotisations salariales (538 €)** : Ce sont les contributions prélevées sur votre salaire brut pour financer la retraite, l'assurance chômage, la santé et la prévoyance. C'est normal et obligatoire.

**Mutuelle entreprise (32 €)** : Part salariale de la mutuelle collective. Votre employeur en prend en charge au moins 50 % — la part patronale n'apparaît pas sur votre fiche.

**Remboursement transport (37,50 €)** : Remboursement de 50 % de votre abonnement de transport en commun. Montant conforme à la règle légale.

## ⚠️ Point à regarder de plus près

Le ratio net/brut est de **78,2 %**, ce qui est dans la fourchette habituelle (75–80 % pour un non-cadre). Rien d'inhabituel à signaler sur ce bulletin.`,
    questions: [
      'Le nombre d\'heures supplémentaires est-il bien pris en compte ?',
      'La mutuelle correspond-elle bien au contrat collectif en vigueur ?',
      'Mon taux de prélèvement à la source est-il toujours à jour ?',
      'Où trouver le détail des cotisations retraite complémentaire ?',
    ],
  },
  bail: {
    label: 'Bail locatif',
    emoji: '🏠',
    docDescription: 'Bail nu 3 ans — appartement T3, Paris 11e',
    imageUrl: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&q=80',
    imageAlt: 'Exemple de bail locatif',
    analysis: `## 🏠 Type de bail

**Bail nu** — durée 3 ans, reconductible tacitement par périodes de 3 ans. Loi du 6 juillet 1989.

## 💰 Loyer et charges

- Loyer mensuel : **980 €**
- Charges : **120 €** (provisions avec régularisation annuelle)
- Dépôt de garantie : **980 €** (1 mois de loyer, conforme)
- Révision : indexée sur l'IRL (Indice de Référence des Loyers)

## ✅ Obligations principales

**Locataire** : Payer le loyer à date fixe, entretenir le logement, souscrire une assurance habitation, respecter le voisinage.

**Propriétaire** : Délivrer un logement décent, assurer les grosses réparations, remettre les quittances de loyer.

## ⚠️ Clause à surveiller

L'article 8 du bail indique **"interdiction formelle de détenir tout animal"**. Or, dans un bail nu, cette clause est considérée comme **potentiellement abusive** : un locataire peut légalement détenir des animaux domestiques non dangereux, sauf animaux de catégorie 1 ou 2. Ce point mérite vérification avant signature.

## 📋 Points importants

- Préavis de départ : **3 mois** (réduit à 1 mois en zone tendue)
- État des lieux obligatoire à l'entrée et à la sortie
- Assurance habitation obligatoire — justificatif à fournir chaque année`,
    questions: [
      'La clause interdisant les animaux est-elle applicable dans mon cas ?',
      'Comment se calcule la régularisation annuelle des charges ?',
      'Dans quels cas mon préavis peut-il être réduit à 1 mois ?',
      'Que faire si le propriétaire ne restitue pas le dépôt de garantie à temps ?',
    ],
  },
  contrat: {
    label: 'Contrat de travail',
    emoji: '📋',
    docDescription: 'CDI — Chargé de clientèle, secteur services',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
    imageAlt: 'Exemple de contrat de travail',
    analysis: `## 📋 Type de contrat

**CDI** — Contrat à durée indéterminée, temps plein 35h/semaine. Prise de poste : 1er mars 2024.

## 🔑 Éléments clés

| | |
|---|---|
| Période d'essai | 3 mois (renouvelable une fois) |
| Salaire brut mensuel | 2 200 € |
| Convention collective | Commerce de détail |
| Lieu de travail | Paris — clause de mobilité absente |

## 📌 Clauses analysées

**Clause de confidentialité** *(normale)* : Couvre les informations clients et internes. Durée non précisée — standard dans ce secteur.

**Clause de non-concurrence** *(à surveiller)* : Durée 12 mois, zone Île-de-France, secteur identique. La contrepartie financière est mentionnée (30 % du salaire mensuel brut). Ce point est important : **sans contrepartie, une clause de non-concurrence ne serait pas valable**. Ici elle est présente, ce qui est positif.

**Variable sur objectifs** *(à surveiller)* : Une prime trimestrielle est prévue mais les critères sont renvoyés à "la politique commerciale en vigueur". Il serait utile d'en demander le détail par écrit avant signature.

## ❓ Ce qui n'est pas visible

La convention collective n'est pas jointe — elle peut prévoir des droits supplémentaires (primes, jours de congés, délais de préavis).`,
    questions: [
      'Quels sont exactement les critères de la prime variable ?',
      'La convention collective prévoit-elle des avantages supplémentaires ?',
      'Dans quelles conditions la période d\'essai peut-elle être renouvelée ?',
      'Quelle est la durée de préavis en cas de démission après la période d\'essai ?',
    ],
  },
  huissier: {
    label: 'Courrier d\'huissier',
    emoji: '⚖️',
    docDescription: 'Commandement de payer — dette locative 1 240 €',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
    imageAlt: 'Exemple de courrier d\'huissier',
    analysis: `## ⚖️ Recevoir ce type de courrier peut inquiéter — prenons le temps de le comprendre ensemble.

## Ce que c'est

Vous avez reçu un **commandement de payer** signifié par un commissaire de justice. Il s'agit d'un acte officiel demandant le règlement d'une dette locative de **1 240 €** (2 mois de loyer impayés + frais).

Ce n'est pas encore une expulsion. C'est une étape formelle qui précède une éventuelle procédure judiciaire.

## ⏰ Délai important

Le commandement mentionne un délai de **2 mois** pour régulariser la situation. Ce délai est **fixé par la loi** pour les dettes de loyer. Il court à compter de la date de signification indiquée sur l'acte.

## ✅ Ce que vous pouvez faire

- **Régler la totalité** de la somme si vous le pouvez
- **Contacter directement le propriétaire ou son mandataire** pour proposer un calendrier de remboursement — obtenir tout accord **par écrit**
- **Solliciter la CAF ou la MSA** si vous avez des aides au logement — elles peuvent dans certains cas verser directement au propriétaire
- **Consulter un Point d'Accès au Droit** (gratuit) pour connaître vos options

## ⚠️ Erreur fréquente à éviter

Ne pas réagir dans le délai de 2 mois, en pensant que la situation va se régler d'elle-même. Le délai continue de courir indépendamment de votre situation.

## 📞 Ressources gratuites

**Point d'Accès au Droit (PAD)** — consultations gratuites en mairie · **ADIL** de votre département pour les questions locatives · **CCAS** de votre mairie pour un accompagnement social`,
    questions: [
      'Le montant réclamé correspond-il bien aux loyers impayés ?',
      'Un accord amiable de paiement échelonné est-il possible ?',
      'Que se passe-t-il si je ne peux pas payer dans les 2 mois ?',
      'Puis-je contester ce commandement si je pense qu\'il y a une erreur ?',
    ],
  },
}

function CodeAccesSection({ accessCode, setAccessCode, accessCodeError, setAccessCodeError, isFreeAccess, setIsFreeAccess, handleApplyAccessCode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border-soft rounded-xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-stone-50 transition-colors">
        <span>{isFreeAccess ? '✅ Code validé — accès gratuit activé' : 'J\'ai un code d\'accès'}</span>
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 space-y-2 border-t border-border-soft bg-stone-50">
          <div className="flex gap-2">
            <input type="text" value={accessCode}
              onChange={(e) => { setAccessCode(e.target.value.toUpperCase()); setAccessCodeError(''); setIsFreeAccess(false) }}
              placeholder="Entrez votre code"
              className="flex-1 px-4 py-2.5 bg-white border-2 border-border-soft rounded-xl text-sm font-mono uppercase focus:outline-none focus:border-terracotta transition-colors"
              maxLength={20} />
            <button onClick={handleApplyAccessCode} className="px-4 py-2.5 bg-terracotta text-white rounded-xl text-sm font-semibold hover:bg-terracotta-dark transition-colors">
              Valider
            </button>
          </div>
          {accessCodeError && <p className="text-xs text-red-600">{accessCodeError}</p>}
          {isFreeAccess && (
            <p className="text-xs text-green-700 font-semibold">✅ Code validé — accès gratuit activé</p>
          )}
        </div>
      )}
    </div>
  )
}

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
            {/* Badge prix visible */}
            <span className={`text-xs font-bold whitespace-nowrap px-2.5 py-1 rounded-full border ${selected ? 'bg-terracotta text-white border-terracotta' : 'bg-terracotta/10 text-terracotta border-terracotta/20'}`}>
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

// ─── Modal exemple ─────────────────────────────────────────────────────────
function ExampleModal({ categoryId, onClose }) {
  const ex = EXAMPLES[categoryId]
  if (!ex) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full my-8" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border-soft">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{ex.emoji}</span>
            <div>
              <p className="text-xs text-text-secondary font-medium">Exemple — {ex.label}</p>
              <p className="font-semibold text-text-primary text-sm">{ex.docDescription}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-stone-100 transition-colors">
            <IconX />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Image faux document */}
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">Document analysé</p>
            <div className="rounded-xl overflow-hidden border border-border-soft bg-stone-50">
              <img src={ex.imageUrl} alt={ex.imageAlt} className="w-full h-40 object-cover opacity-80" />
              <div className="px-4 py-2 bg-amber-50 border-t border-amber-100">
                <p className="text-xs text-amber-700">📋 Document fictif à titre illustratif — les données sont inventées</p>
              </div>
            </div>
          </div>

          {/* Analyse */}
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">Analyse Lisible</p>
            <div className="bg-stone-50 rounded-xl p-4 text-sm text-text-primary leading-relaxed space-y-3 max-h-64 overflow-y-auto">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => <h2 className="font-bold text-terracotta-dark text-sm mt-3 mb-1 first:mt-0">{children}</h2>,
                  p: ({ children }) => <p className="text-sm leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="space-y-1 ml-2">{children}</ul>,
                  li: ({ children }) => <li className="flex gap-2 text-sm"><span className="text-terracotta flex-shrink-0">▸</span><span>{children}</span></li>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  table: ({ children }) => <table className="w-full text-xs border-collapse my-2">{children}</table>,
                  th: ({ children }) => <th className="text-left px-2 py-1 bg-stone-100 border border-stone-200 text-xs">{children}</th>,
                  td: ({ children }) => <td className="px-2 py-1 border border-stone-200 text-xs">{children}</td>,
                }}
              >{ex.analysis}</ReactMarkdown>
            </div>
          </div>

          {/* Questions */}
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">Questions suggérées</p>
            <ul className="space-y-2">
              {ex.questions.map((q, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-primary">
                  <span className="text-terracotta font-bold flex-shrink-0">{i + 1}.</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-terracotta/5 border border-terracotta/20 rounded-xl p-4 text-center space-y-2">
            <p className="text-sm font-semibold text-text-primary">Vous avez un document de ce type ?</p>
            <p className="text-xs text-text-secondary">Obtenez votre analyse personnalisée pour 1,99 €</p>
            <button onClick={onClose} className="mt-1 px-5 py-2.5 bg-terracotta text-white rounded-xl text-sm font-semibold hover:bg-terracotta-dark transition-colors">
              Analyser mon document →
            </button>
          </div>
        </div>
      </div>
    </div>
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
  const [exampleModal, setExampleModal] = useState(null) // categoryId ou null

  const fileInputRef = useRef(null)
  const cat = selectedCategory ? CATEGORIES[selectedCategory] : null

  // ─── Détection retour Stripe après paiement ───────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    const urlParams = new URLSearchParams(window.location.search)
    const paid = urlParams.get('paid') || localStorage.getItem('lisible_paid')
    const pendingRaw = localStorage.getItem('lisible_pending')
    console.log('[Lisible] paid:', paid, '| pendingRaw:', pendingRaw ? 'PRESENT (' + pendingRaw.length + ' chars)' : 'NULL')
    console.log('[Lisible] all localStorage keys:', Object.keys(localStorage))
    if (paid === '1' && pendingRaw) {
      window.history.replaceState({}, '', '/')
      localStorage.removeItem('lisible_paid')
      localStorage.removeItem('lisible_pending')
      try {
        const data = JSON.parse(pendingRaw)
        setSelectedCategory(data.category)
        setQuestion(data.question || '')
        setInputMode(data.inputMode || INPUT_MODES.FILE)
        setDocumentText(data.documentText || '')
        setUploadedFile(data.uploadedFile || null)
        setStep(STEPS.LOADING)
        launchAnalysis(data)
      } catch (e) {
        console.error('Erreur récupération données pending:', e)
      }
    }
  }, [])

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

  const handleStripeCheckout = async () => {
    setIsCheckoutLoading(true)
    localStorage.setItem('lisible_pending', JSON.stringify({
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
        <title>Lisible — Avant de paniquer, comprenez.</title>
        <meta name="description" content="Analysez vos courriers administratifs, bulletins de paie, baux, contrats et actes d'huissier en langage simple. Paiement unique 1,99 €." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      {/* Modal exemple */}
      {exampleModal && (
        <ExampleModal categoryId={exampleModal} onClose={() => setExampleModal(null)} />
      )}

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

          {/* ─── HOME ───────────────────────────────────────────────────────── */}
          {step === STEPS.HOME && (
            <div className="space-y-8">

              {/* Hero */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full text-terracotta text-sm font-medium">
                  <span>⚡</span><span>Sans compte · Sans abonnement · PDF inclus</span>
                </div>
                <h1 className="text-3xl font-bold text-text-primary leading-tight">
                  Avant de paniquer,<br /><span className="text-terracotta">comprenez.</span>
                </h1>
                <p className="text-text-secondary text-base leading-relaxed max-w-md mx-auto">
                  Photo, PDF ou texte : recevez une explication claire de votre document, avec les points importants, les questions à poser et un PDF inclus.
                </p>
                <p className="text-sm font-semibold text-terracotta">
                  Paiement unique de 1,99 €.
                </p>
              </div>

              {/* Sélection catégorie */}
              <div>
                <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">Choisissez le type de document</h2>
                <div className="space-y-2.5">
                  {Object.values(CATEGORIES).map((c) => (
                    <CategoryCard key={c.id} cat={c} selected={selectedCategory === c.id} onClick={() => setSelectedCategory(c.id)} />
                  ))}
                </div>
              </div>

              {/* CTA principal — juste après les cartes */}
              <button onClick={() => selectedCategory && setStep(STEPS.UPLOAD)} disabled={!selectedCategory}
                className={`w-full py-4 rounded-2xl font-semibold text-base transition-all duration-200
                  ${selectedCategory ? 'bg-terracotta text-white shadow-md hover:bg-terracotta-dark' : 'bg-border-soft text-text-secondary cursor-not-allowed'}`}>
                {selectedCategory ? `Analyser mon document — ${CATEGORIES[selectedCategory].priceLabel}` : 'Sélectionnez un type de document'}
              </button>

              {/* Bloc "Ce que vous recevez" */}
              <div className="bg-white rounded-2xl border border-border-soft p-5">
                <h3 className="font-semibold text-text-primary text-sm mb-3 flex items-center gap-2">
                  <span>📦</span> Ce que vous recevez
                </h3>
                <ul className="space-y-2">
                  {[
                    'Un résumé en clair',
                    'Les points importants à vérifier',
                    'Les délais visibles',
                    'Les questions à poser',
                    'Les ressources utiles',
                    'Un message prêt à envoyer si pertinent',
                    'Un PDF téléchargeable',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-text-primary">
                      <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bloc "Voir des exemples d'analyse" */}
              <div className="bg-white rounded-2xl border border-border-soft p-5">
                <h3 className="font-semibold text-text-primary text-sm mb-3 flex items-center gap-2">
                  <span>👁️</span> Voir des exemples d'analyse
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {Object.values(EXAMPLES).map((ex) => (
                    <button key={ex.label} onClick={() => setExampleModal(Object.keys(EXAMPLES).find(k => EXAMPLES[k] === ex))}
                      className="flex items-center gap-3 text-left px-3 py-2.5 rounded-xl hover:bg-stone-50 transition-colors group">
                      <span className="text-lg">{ex.emoji}</span>
                      <span className="text-sm text-text-primary group-hover:text-terracotta transition-colors flex-1">
                        Exemple {ex.label.toLowerCase()}
                      </span>
                      <span className="text-text-secondary group-hover:text-terracotta transition-colors">
                        <IconExternalLink />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mini-processus en 3 étapes */}
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { icon: '📎', step: '1', label: 'Ajoutez le document' },
                  { icon: '💳', step: '2', label: 'Validez le prix' },
                  { icon: '✅', step: '3', label: 'Recevez l\'analyse' },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-3 border border-border-soft">
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-xs font-bold text-terracotta mb-0.5">{item.step}</div>
                    <div className="text-xs text-text-secondary font-medium leading-tight">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA secondaire */}
              <button onClick={() => selectedCategory && setStep(STEPS.UPLOAD)} disabled={!selectedCategory}
                className={`w-full py-4 rounded-2xl font-semibold text-base transition-all duration-200
                  ${selectedCategory ? 'bg-terracotta text-white shadow-md hover:bg-terracotta-dark' : 'bg-border-soft text-text-secondary cursor-not-allowed'}`}>
                {selectedCategory ? `Analyser mon document — ${CATEGORIES[selectedCategory].priceLabel}` : 'Sélectionnez un type de document'}
              </button>
              {/* Disclaimer légal */}
              <div className="space-y-2">
                <p className="text-xs text-text-secondary text-center leading-relaxed">
                  Lisible aide à comprendre un document. Il ne remplace pas un avocat, une administration, un service RH ou un professionnel qualifié.
                </p>
                <p className="text-xs text-text-secondary/70 text-center leading-relaxed">
                  Analyse générée par IA à partir de consignes spécialisées, avec des limites clairement indiquées.
                </p>
              </div>
            </div>
          )}

          {/* ─── UPLOAD ─────────────────────────────────────────────────────── */}
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

          {/* ─── PAYMENT ────────────────────────────────────────────────────── */}
          {step === STEPS.PAYMENT && cat && (
            <div className="space-y-5">

              {/* Titre */}
              <div>
                <h2 className="text-xl font-bold text-text-primary">Votre document est prêt à être analysé</h2>
              </div>

              {/* Mini-diagnostic en checklist */}
              <div className="bg-white border border-border-soft rounded-2xl p-5 space-y-3">
                {[
                  { label: 'Document reçu', value: `${cat.emoji} ${cat.label}` },
                  {
                    label: 'Format accepté',
                    value: inputMode === INPUT_MODES.FILE
                      ? (uploadedFile?.fileType === 'image' ? 'Image (JPG / PNG)' : 'PDF')
                      : 'Texte collé',
                  },
                  { label: 'Analyse proposée', value: 'Analyse complète + PDF + 1 question complémentaire' },
                  { label: 'Prix', value: cat.priceLabel, highlight: true },
                ].map(({ label, value, highlight }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    <div className="flex-1 flex items-center justify-between gap-2">
                      <span className="text-sm text-text-secondary">{label}</span>
                      <span className={`text-sm font-semibold ${highlight ? 'text-terracotta text-base' : 'text-text-primary'}`}>{value}</span>
                    </div>
                  </div>
                ))}
                {question && (
                  <div className="mt-1 bg-stone-50 rounded-xl px-3 py-2.5 border border-border-soft">
                    <p className="text-xs text-text-secondary mb-0.5">Votre question</p>
                    <p className="text-sm text-text-primary italic">"{question}"</p>
                  </div>
                )}
              </div>

              {/* Note de réassurance */}
              <p className="text-xs text-text-secondary leading-relaxed text-center px-2">
                Avant paiement, Lisible vérifie que votre document est dans un format accepté.<br />
                L'analyse vous aide à comprendre le document, sans remplacer un professionnel qualifié.
              </p>

              {analysisError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-sm text-red-700">⚠️ {analysisError}</div>
              )}

              {/* Ce que vous recevez */}
              <div className="bg-terracotta/5 border border-terracotta/15 rounded-2xl p-4">
                <p className="text-xs font-semibold text-text-primary mb-2.5">Votre analyse inclut :</p>
                <ul className="space-y-1.5">
                  {[
                    'Un résumé en clair',
                    'Les points importants à vérifier',
                    'Les questions à poser',
                    'Un message prêt à envoyer si pertinent',
                    'Un PDF téléchargeable',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-text-primary">
                      <span className="text-terracotta font-bold flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA principal ou gratuit */}
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
                      : <><IconLock /> Payer {cat.priceLabel} et lancer l'analyse</>
                    }
                  </button>
                  <div className="text-center space-y-1">
                    <p className="text-xs text-text-secondary flex items-center justify-center gap-1">
                      <IconLock /> Paiement sécurisé via Stripe.
                    </p>
                    <p className="text-xs text-text-secondary">Document original supprimé après analyse.</p>
                  </div>
                </div>
              )}

              {/* Code d'accès — replié par défaut */}
              <CodeAccesSection
                accessCode={accessCode}
                setAccessCode={setAccessCode}
                accessCodeError={accessCodeError}
                setAccessCodeError={setAccessCodeError}
                isFreeAccess={isFreeAccess}
                setIsFreeAccess={setIsFreeAccess}
                handleApplyAccessCode={handleApplyAccessCode}
              />

            </div>
          )}

          {/* ─── LOADING ─────────────────────────────────────────────────────── */}
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

          {/* ─── RESULT ──────────────────────────────────────────────────────── */}
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

        {/* ─── FOOTER ──────────────────────────────────────────────────────── */}
        <footer className="border-t border-border-soft py-8 mt-8 no-print">
          <div className="max-w-2xl mx-auto px-4 space-y-4 text-center">
            <p className="text-xs text-text-secondary">
              Pour toute question technique, problème de paiement ou demande liée à vos données :{' '}
              <a href="mailto:contact@lisible.fr" className="text-terracotta hover:underline font-medium">contact@lisible.fr</a>
            </p>
            <p className="text-xs text-text-secondary">
              © 2024 Lisible — Aide à la compréhension de documents français
            </p>
            <p className="text-xs text-text-secondary/60">
              Lisible aide à comprendre un document. Il ne remplace pas un avocat, une administration, un service RH ou un professionnel qualifié.
            </p>
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
