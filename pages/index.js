import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import { CATEGORIES, FREE_CODES } from '../lib/prompts'

// ─── Icons ─────────────────────────────────────────────────────────────────
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
const IconCopy = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
)
const IconExternalLink = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

// ─── Exemples statiques ────────────────────────────────────────────────────
const EXAMPLES = {
  administratif: {
    label: 'Courrier administratif', emoji: '🏛️',
    docDescription: 'Notification de trop-perçu CAF — 347 €',
    imageUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=600&q=80',
    analysis: {
      en_clair: "Vous avez reçu une notification de trop-perçu de 347 € de votre organisme social au titre des aides au logement. Cela signifie que l'organisme estime vous avoir versé davantage que ce à quoi vous aviez droit. Ce type de courrier est fréquent et ne signifie pas que vous avez commis une fraude.",
      a_verifier_maintenant: [
        "Vérifier si le montant de 347 € correspond bien à votre situation réelle sur la période mentionnée",
        "Contacter l'organisme avant le délai de 20 jours pour éviter une retenue automatique",
        "Demander un échelonnement si vous ne pouvez pas payer en une seule fois",
        "Rassembler les justificatifs (avis d'imposition, bulletins de salaire) si vous souhaitez contester",
      ],
      grands_chiffres: [
        { label: "Montant réclamé", valeur: "347 €" },
        { label: "Délai de réponse", valeur: "20 jours" },
        { label: "Période concernée", valeur: "Janvier – Mars" },
      ],
      lignes_expliquees: null,
      points_attention: [
        "Si vous pensez que le calcul est erroné, vous avez le droit de contester — un courrier motivé avec justificatifs suffit",
        "Le délai de 20 jours est important : passé ce délai, la retenue peut être effectuée sur vos prochaines allocations",
      ],
      message_pret: `Objet : Contestation trop-perçu — Dossier n° [VOTRE NUMÉRO]

Madame, Monsieur,

J'ai bien reçu votre courrier du [DATE] m'informant d'un trop-perçu de 347 € au titre de mes allocations logement pour la période de janvier à mars.

Après vérification de ma situation, je souhaite contester ce montant pour les raisons suivantes : [PRÉCISEZ VOTRE MOTIF].

Je vous transmets en pièce jointe les justificatifs suivants : [LISTE VOS DOCUMENTS].

Dans l'attente de votre réponse, je reste à votre disposition pour tout renseignement complémentaire.

Cordialement,
[VOTRE NOM]`,
      glossaire: [
        { terme: "Trop-perçu", definition: "Somme versée en trop par rapport à ce à quoi vous aviez droit, que l'organisme vous demande de rembourser." },
        { terme: "Droit à la contestation", definition: "Vous pouvez demander une révision de la décision en envoyant un courrier motivé avec des justificatifs." },
        { terme: "Délai de grâce", definition: "Période pendant laquelle vous pouvez répondre avant que l'organisme procède à une retenue automatique." },
      ],
      ressources: [
        { nom: "France Services", description: "Guichet universel gratuit pour vous aider à répondre au courrier", lien: "https://www.france-services.gouv.fr" },
        { nom: "Point-Justice", description: "Consultations juridiques gratuites en mairie", lien: "https://www.justice.fr" },
      ],
      verdict: { niveau: "a_verifier", message: "Ce courrier nécessite une action dans les 20 jours, mais des solutions existent — vous n'êtes pas seul(e)." },
      niveau_confiance: "élevé",
    },
    questions: [
      "Sur quelle période exacte porte ce trop-perçu ?",
      "Comment l'organisme a-t-il calculé ce montant ?",
      "Est-il possible de le rembourser en plusieurs fois ?",
    ],
  },
  paie: {
    label: 'Bulletin de paie', emoji: '💶',
    docDescription: 'Bulletin de paie — Février 2024, secteur privé',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    analysis: {
      en_clair: "Votre bulletin de paie de février 2024 présente un salaire brut de 2 450 € et un net à payer de 1 759 €. Le ratio net/brut de 71,8 % est légèrement bas — cela peut s'expliquer par le niveau de mutuelle ou de prévoyance. Un point mérite vérification.",
      a_verifier_maintenant: [
        "Vérifier que le nombre d'heures travaillées correspond bien à votre contrat (35h/semaine)",
        "Confirmer que le taux de prélèvement à la source de 8 % est bien à jour",
        "Demander le détail de la ligne 'Prévoyance' si le montant semble élevé",
      ],
      grands_chiffres: [
        { label: "Salaire brut", valeur: "2 450,00 €" },
        { label: "Net avant impôt", valeur: "1 912,00 €" },
        { label: "Net à payer", valeur: "1 759,00 €" },
        { label: "Taux PAS", valeur: "8 %" },
      ],
      lignes_expliquees: [
        { nom: "Cotisations salariales", montant: "538,00 €", explication: "Contributions obligatoires pour financer retraite, chômage, santé. Normal et légal.", statut: "normal" },
        { nom: "Mutuelle entreprise", montant: "32,00 €", explication: "Part salariale de la mutuelle collective. L'employeur prend en charge au moins 50 %.", statut: "normal" },
        { nom: "Remboursement transport", montant: "+37,50 €", explication: "50 % de votre abonnement de transport en commun. Montant conforme à la règle légale.", statut: "normal" },
        { nom: "Prélèvement à la source", montant: "153,00 €", explication: "Impôt sur le revenu prélevé directement sur salaire. Taux de 8 % — à vérifier si votre situation a changé.", statut: "a_verifier" },
      ],
      points_attention: [
        "Le ratio net/brut de 71,8 % est légèrement en dessous de la fourchette habituelle (74-80 % pour un non-cadre) — peut s'expliquer par la mutuelle ou la prévoyance",
        "Si votre situation personnelle (mariage, naissance, changement de revenus) a changé récemment, le taux de prélèvement à la source mérite mise à jour",
      ],
      message_pret: `Objet : Vérification bulletin de paie — Février 2024

Bonjour,

Je souhaite vérifier quelques points sur mon bulletin de paie de février 2024.

Pourriez-vous m'indiquer :
1. À quoi correspond exactement la ligne "Prévoyance" et quel est le montant patronal correspondant ?
2. Le taux de prélèvement à la source de 8 % est-il bien celui transmis par l'administration fiscale ?
3. Le calcul du remboursement transport correspond-il bien à 50 % de mon abonnement mensuel ?

Merci par avance pour vos éclaircissements.

Cordialement,
[VOTRE NOM]`,
      glossaire: [
        { terme: "Salaire brut", definition: "Rémunération avant déduction des cotisations sociales et de l'impôt." },
        { terme: "Net avant impôt", definition: "Salaire après cotisations sociales, mais avant le prélèvement à la source." },
        { terme: "Net à payer", definition: "Somme réellement versée sur votre compte bancaire." },
        { terme: "Prélèvement à la source (PAS)", definition: "Impôt sur le revenu prélevé directement par l'employeur et reversé à l'administration fiscale." },
      ],
      ressources: [
        { nom: "Service RH / bureau des paies", description: "Premier interlocuteur pour toute question sur votre bulletin", lien: null },
        { nom: "impots.gouv.fr", description: "Pour modifier votre taux de prélèvement à la source", lien: "https://www.impots.gouv.fr" },
      ],
      verdict: { niveau: "a_verifier", message: "Bulletin globalement cohérent, un point mérite vérification auprès des RH." },
      niveau_confiance: "moyen",
    },
    questions: [
      "Le nombre d'heures supplémentaires est-il bien pris en compte ?",
      "Mon taux de prélèvement à la source est-il toujours à jour ?",
    ],
  },
  bail: {
    label: 'Bail locatif', emoji: '🏠',
    docDescription: 'Bail nu 3 ans — appartement T3, Paris 11e',
    imageUrl: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&q=80',
    analysis: {
      en_clair: "Vous avez un bail nu de 3 ans pour un T3 à Paris, avec un loyer de 980 € et des charges de 120 €. Une clause de ce bail mérite vérification avant signature : l'interdiction des animaux, qui peut être considérée comme abusive dans ce type de contrat.",
      a_verifier_maintenant: [
        "Vérifier la clause animaux (article 8) avec l'agence — potentiellement non applicable dans un bail nu",
        "Demander le détail des charges : elles doivent être justifiées lors de la régularisation annuelle",
        "Conserver une copie de l'état des lieux d'entrée signé — indispensable en cas de litige",
        "Souscrire une assurance habitation avant la remise des clés",
      ],
      grands_chiffres: [
        { label: "Loyer mensuel", valeur: "980 €" },
        { label: "Charges", valeur: "120 €/mois" },
        { label: "Dépôt de garantie", valeur: "980 €" },
        { label: "Durée du bail", valeur: "3 ans" },
      ],
      lignes_expliquees: [
        { nom: "Loyer + charges", montant: "1 100 €/mois", explication: "Loyer nu + provisions pour charges. La régularisation se fait une fois par an.", statut: "normal" },
        { nom: "Révision loyer", montant: "IRL", explication: "Le loyer peut être révisé chaque année selon l'Indice de Référence des Loyers, publié par l'INSEE.", statut: "normal" },
        { nom: "Clause animaux (art. 8)", montant: "—", explication: "Interdit de détenir tout animal. Cette clause peut être considérée comme abusive dans un bail nu — les animaux domestiques non dangereux sont en principe autorisés.", statut: "inhabituel" },
        { nom: "Préavis", montant: "3 mois", explication: "Délai légal pour prévenir le propriétaire avant de quitter. Réduit à 1 mois en zone tendue (Paris est zone tendue).", statut: "normal" },
      ],
      points_attention: [
        "La clause interdisant les animaux dans un bail nu est potentiellement abusive — un locataire peut légalement détenir des animaux domestiques non dangereux",
        "Paris est en zone tendue : votre préavis est en principe de 1 mois, pas 3 — à confirmer selon votre situation",
      ],
      message_pret: `Objet : Questions sur le bail — [ADRESSE DU LOGEMENT]

Bonjour,

Suite à la lecture du bail pour le logement situé au [ADRESSE], je souhaite clarifier deux points avant signature :

1. Article 8 — Clause animaux : je souhaite savoir si cette clause est applicable dans le cadre d'un bail nu. Pourriez-vous confirmer ou modifier cette disposition ?

2. Détail des charges : pourriez-vous me communiquer le détail des charges récupérables incluses dans les 120 € mensuels ?

Je reste disponible pour en discuter.

Cordialement,
[VOTRE NOM]`,
      glossaire: [
        { terme: "Bail nu", definition: "Location d'un logement vide, sans meubles. Durée légale de 3 ans." },
        { terme: "IRL", definition: "Indice de Référence des Loyers — indice INSEE qui plafonne la révision annuelle du loyer." },
        { terme: "Charges récupérables", definition: "Charges payées par le propriétaire que le locataire rembourse (entretien parties communes, eau froide, etc.)." },
        { terme: "Zone tendue", definition: "Zones où la demande de logement est forte. À Paris, le préavis du locataire est réduit à 1 mois." },
      ],
      ressources: [
        { nom: "ADIL de Paris", description: "Agence d'information gratuite sur le logement", lien: "https://www.anil.org" },
        { nom: "Commission de conciliation", description: "Résolution amiable des litiges locatifs, gratuit", lien: "https://www.service-public.fr" },
      ],
      verdict: { niveau: "a_verifier", message: "Bail standard avec une clause à clarifier avant signature — n'attendez pas pour poser la question." },
      niveau_confiance: "élevé",
    },
    questions: [
      "La clause interdisant les animaux est-elle applicable dans mon cas ?",
      "Dans quels cas mon préavis peut-il être réduit à 1 mois ?",
    ],
  },
  contrat: {
    label: 'Contrat de travail', emoji: '📋',
    docDescription: 'CDI — Chargé de clientèle, secteur services',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
    analysis: {
      en_clair: "C'est un CDI standard dans le secteur des services, avec une rémunération de 2 200 € brut et une période d'essai de 3 mois. Une clause de non-concurrence est présente avec contrepartie financière, ce qui est positif. Le détail de la prime variable mérite d'être demandé par écrit avant signature.",
      a_verifier_maintenant: [
        "Demander par écrit le détail des critères de la prime variable avant de signer",
        "Vérifier si la convention collective Commerce de détail prévoit des avantages supplémentaires",
        "Confirmer les conditions de renouvellement de la période d'essai",
        "Demander une copie du règlement intérieur et de la charte informatique mentionnés en annexe",
      ],
      grands_chiffres: [
        { label: "Salaire brut mensuel", valeur: "2 200 €" },
        { label: "Période d'essai", valeur: "3 mois" },
        { label: "Prise de poste", valeur: "1er mars 2024" },
        { label: "Non-concurrence", valeur: "12 mois, Île-de-France" },
      ],
      lignes_expliquees: [
        { nom: "Période d'essai", montant: "3 mois", explication: "Renouvelable une fois avec accord écrit. Pendant cette période, chaque partie peut mettre fin au contrat avec un préavis court.", statut: "normal" },
        { nom: "Clause de non-concurrence", montant: "30 % du salaire", explication: "Vous interdit d'aller travailler chez un concurrent pendant 12 mois en Île-de-France après départ. La contrepartie financière de 30 % est présente — c'est un point positif et obligatoire.", statut: "normal" },
        { nom: "Prime variable", montant: "Non précisé", explication: "Prime trimestrielle dont les critères renvoient à la 'politique commerciale en vigueur'. Les conditions exactes ne sont pas dans le contrat — à demander.", statut: "a_verifier" },
        { nom: "Confidentialité", montant: "—", explication: "Couvre les informations clients et internes. Durée non précisée mais standard dans ce secteur.", statut: "normal" },
      ],
      points_attention: [
        "La prime variable renvoie à un document externe non joint — demandez les critères écrits avant signature",
        "La convention collective n'est pas jointe : elle peut prévoir des droits supplémentaires (jours de congés, primes, préavis)",
      ],
      message_pret: `Objet : Questions avant signature — Contrat CDI Chargé de clientèle

Bonjour,

Après lecture attentive du contrat, je souhaite clarifier quelques points avant de procéder à la signature :

1. Prime variable : pourriez-vous me communiquer le détail des critères d'atteinte et les modalités de calcul de la prime trimestrielle ?

2. Convention collective : pourriez-vous me transmettre les principaux avantages prévus par la Convention Commerce de détail applicables à mon poste ?

3. Période d'essai : dans quelles conditions précises peut-elle être renouvelée ?

Je vous remercie pour ces précisions.

Cordialement,
[VOTRE NOM]`,
      glossaire: [
        { terme: "CDI", definition: "Contrat à Durée Indéterminée — sans date de fin, sauf démission, licenciement ou rupture conventionnelle." },
        { terme: "Clause de non-concurrence", definition: "Vous interdit de travailler chez un concurrent après votre départ. Elle n'est valide que si une contrepartie financière est prévue." },
        { terme: "Convention collective", definition: "Accord entre organisations d'employeurs et syndicats qui complète le droit du travail pour votre secteur." },
      ],
      ressources: [
        { nom: "Code du travail numérique", description: "Outil officiel pour comprendre vos droits", lien: "https://code.travail.gouv.fr" },
        { nom: "DREETS", description: "Direction régionale chargée des droits au travail", lien: "https://travail-emploi.gouv.fr" },
      ],
      verdict: { niveau: "a_verifier", message: "Contrat globalement standard, deux points méritent clarification avant signature." },
      niveau_confiance: "moyen",
    },
    questions: [
      "Quels sont exactement les critères de la prime variable ?",
      "Dans quelles conditions la période d'essai peut-elle être renouvelée ?",
    ],
  },
  huissier: {
    label: "Courrier d'huissier", emoji: '⚖️',
    docDescription: 'Commandement de payer — dette locative 1 240 €',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
    analysis: {
      en_clair: "Recevoir ce type de courrier peut être stressant — prenons le temps de le comprendre ensemble. Vous avez reçu un commandement de payer signifié par un commissaire de justice pour une dette locative de 1 240 €. Ce n'est pas encore une expulsion : c'est une étape formelle qui vous donne 2 mois pour réagir.",
      a_verifier_maintenant: [
        "Vérifier que le montant de 1 240 € correspond bien aux loyers impayés mentionnés",
        "Contacter le propriétaire ou son mandataire rapidement pour proposer un accord de paiement — par écrit",
        "Ne pas attendre que la situation se règle seule — les délais légaux continuent de courir",
        "Consulter un Point d'Accès au Droit (gratuit) pour connaître toutes vos options",
        "Si vous avez des aides au logement (CAF/MSA), les contacter : elles peuvent parfois verser directement au propriétaire",
      ],
      grands_chiffres: [
        { label: "Montant réclamé", valeur: "1 240 €" },
        { label: "Délai légal", valeur: "2 mois" },
        { label: "Type d'acte", valeur: "Commandement de payer" },
        { label: "Origine", valeur: "Dette locative" },
      ],
      lignes_expliquees: null,
      points_attention: [
        "Tout accord de paiement avec le propriétaire doit être formalisé par écrit — un accord verbal ne suffit pas",
        "Si vous ne réagissez pas dans les 2 mois, une procédure judiciaire peut être engagée",
      ],
      message_pret: `Objet : Réponse au commandement de payer — [ADRESSE DU LOGEMENT]

Madame, Monsieur,

J'ai bien reçu le commandement de payer du [DATE] relatif à une somme de 1 240 €.

Je prends acte de cette situation et souhaite la régler de manière amiable.

Je vous propose de procéder au règlement de la somme selon l'échéancier suivant :
- [MONTANT] € le [DATE 1]
- [MONTANT] € le [DATE 2]
- [MONTANT] € le [DATE 3]

Je vous remercie de bien vouloir me confirmer votre accord par écrit.

Cordialement,
[VOTRE NOM]`,
      glossaire: [
        { terme: "Commandement de payer", definition: "Acte officiel signifié par un commissaire de justice vous demandant de payer une somme dans un délai légal." },
        { terme: "Signification", definition: "Remise officielle d'un document par un commissaire de justice. La date de signification fait partir les délais légaux." },
        { terme: "Titre exécutoire", definition: "Document (souvent un jugement) qui permet de mettre en œuvre une saisie si la dette n'est pas payée." },
        { terme: "SBI (Solde Bancaire Insaisissable)", definition: "Montant minimum garanti sur votre compte bancaire même en cas de saisie-attribution." },
      ],
      ressources: [
        { nom: "Points d'Accès au Droit (PAD)", description: "Consultations juridiques gratuites en mairie", lien: "https://www.justice.fr" },
        { nom: "ADIL", description: "Aide gratuite sur les questions locatives", lien: "https://www.anil.org" },
        { nom: "Commission de surendettement", description: "Si votre situation financière est difficile", lien: "https://www.banque-france.fr" },
      ],
      verdict: { niveau: "urgent", message: "Ce courrier nécessite une action rapide — des solutions existent, ne restez pas seul(e)." },
      niveau_confiance: "élevé",
    },
    questions: [
      "Un accord amiable de paiement échelonné est-il possible ?",
      "Que se passe-t-il si je ne peux pas payer dans les 2 mois ?",
    ],
  },
}

// ─── Parsed result display ─────────────────────────────────────────────────
function parseAnalysis(raw) {
  if (!raw) return null
  // Already an object (from example)
  if (typeof raw === 'object') return raw
  // Try to parse JSON
  try {
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(cleaned)
  } catch {
    // Fallback: wrap markdown in en_clair
    return { en_clair: raw, a_verifier_maintenant: [], points_attention: [], ressources: [], verdict: { niveau: 'a_verifier', message: '' }, niveau_confiance: 'moyen' }
  }
}

function VerdictBadge({ niveau }) {
  const config = {
    normal: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', label: '✅ Document globalement normal' },
    a_verifier: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200', label: '⚠️ Points à vérifier' },
    urgent: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', label: '🔴 Action rapide nécessaire' },
  }
  const c = config[niveau] || config['a_verifier']
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${c.bg} ${c.text} ${c.border}`}>
      {c.label}
    </span>
  )
}

function StatutBadge({ statut }) {
  if (statut === 'normal') return <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Normal</span>
  if (statut === 'a_verifier') return <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">À vérifier</span>
  if (statut === 'inhabituel') return <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">Inhabituel</span>
  return null
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border-soft hover:bg-stone-100 transition-colors text-text-secondary">
      <IconCopy />
      {copied ? '✓ Copié !' : 'Copier'}
    </button>
  )
}

function StructuredResult({ data, catEmoji }) {
  const [showGlossaire, setShowGlossaire] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  if (!data) return null

  return (
    <div className="space-y-4">

      {/* 1. EN CLAIR */}
      <div className="bg-terracotta/8 border border-terracotta/25 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{catEmoji}</span>
          <h3 className="font-bold text-base text-text-primary">En clair</h3>
          {data.verdict?.niveau && <VerdictBadge niveau={data.verdict.niveau} />}
        </div>
        <p className="text-sm text-text-primary leading-relaxed">{data.en_clair}</p>
        {data.verdict?.message && (
          <p className="text-xs text-text-secondary mt-2 italic">{data.verdict.message}</p>
        )}
      </div>

      {/* 2. À VÉRIFIER MAINTENANT */}
      {data.a_verifier_maintenant?.length > 0 && (
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">✅</span>
            <h3 className="font-bold text-base text-text-primary">À vérifier maintenant</h3>
          </div>
          <ul className="space-y-2.5">
            {data.a_verifier_maintenant.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-text-primary">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">{i + 1}</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 3. GRANDS CHIFFRES */}
      {data.grands_chiffres?.length > 0 && (
        <div className="bg-white border border-border-soft rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📊</span>
            <h3 className="font-bold text-base text-text-primary">Les grands chiffres</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {data.grands_chiffres.map((item, i) => (
              <div key={i} className="bg-stone-50 rounded-xl p-3 border border-border-soft">
                <p className="text-xs text-text-secondary mb-0.5">{item.label}</p>
                <p className="font-bold text-text-primary text-sm">{item.valeur}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. LIGNES EXPLIQUÉES */}
      {data.lignes_expliquees?.length > 0 && (
        <div className="bg-white border border-border-soft rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🔍</span>
            <h3 className="font-bold text-base text-text-primary">Ce que signifient les principales lignes</h3>
          </div>
          <div className="space-y-3">
            {data.lignes_expliquees.map((ligne, i) => (
              <div key={i} className={`rounded-xl p-3.5 border ${ligne.statut === 'inhabituel' ? 'bg-red-50 border-red-200' : ligne.statut === 'a_verifier' ? 'bg-amber-50 border-amber-200' : 'bg-stone-50 border-border-soft'}`}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-text-primary">{ligne.nom}</span>
                    {ligne.montant && ligne.montant !== '—' && (
                      <span className="text-xs font-mono text-text-secondary bg-white px-2 py-0.5 rounded border border-border-soft">{ligne.montant}</span>
                    )}
                  </div>
                  <StatutBadge statut={ligne.statut} />
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{ligne.explication}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. POINTS À REGARDER DE PLUS PRÈS */}
      {data.points_attention?.length > 0 && (
        <div className="bg-white border border-border-soft rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">👁️</span>
            <h3 className="font-bold text-base text-text-primary">Points à regarder de plus près</h3>
          </div>
          <ul className="space-y-2.5">
            {data.points_attention.map((point, i) => (
              <li key={i} className="flex gap-3 text-sm text-text-primary leading-relaxed">
                <span className="text-amber-500 flex-shrink-0 mt-0.5">⚠</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 6. MESSAGE PRÊT À ENVOYER */}
      {data.message_pret && (
        <div className="bg-white border border-border-soft rounded-2xl overflow-hidden">
          <button onClick={() => setShowMessage(v => !v)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-stone-50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-lg">✉️</span>
              <h3 className="font-bold text-base text-text-primary">Message prêt à envoyer</h3>
            </div>
            <span className={`text-text-secondary transition-transform duration-200 ${showMessage ? 'rotate-180' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
          </button>
          {showMessage && (
            <div className="px-5 pb-5 border-t border-border-soft">
              <div className="mt-4 flex justify-end mb-2">
                <CopyButton text={data.message_pret} />
              </div>
              <pre className="text-xs text-text-primary leading-relaxed whitespace-pre-wrap font-sans bg-stone-50 rounded-xl p-4 border border-border-soft">
                {data.message_pret}
              </pre>
              <p className="text-xs text-text-secondary mt-2">Remplacez les éléments entre crochets [  ] par vos informations personnelles.</p>
            </div>
          )}
        </div>
      )}

      {/* 7. MINI-GLOSSAIRE */}
      {data.glossaire?.length > 0 && (
        <div className="bg-white border border-border-soft rounded-2xl overflow-hidden">
          <button onClick={() => setShowGlossaire(v => !v)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-stone-50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-lg">📖</span>
              <h3 className="font-bold text-base text-text-primary">Mini-glossaire</h3>
            </div>
            <span className={`text-text-secondary transition-transform duration-200 ${showGlossaire ? 'rotate-180' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
          </button>
          {showGlossaire && (
            <div className="px-5 pb-5 border-t border-border-soft">
              <dl className="mt-4 space-y-3">
                {data.glossaire.map((item, i) => (
                  <div key={i}>
                    <dt className="text-sm font-semibold text-text-primary">{item.terme}</dt>
                    <dd className="text-sm text-text-secondary leading-relaxed mt-0.5">{item.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      )}

      {/* 8. RESSOURCES */}
      {data.ressources?.length > 0 && (
        <div className="bg-white border border-border-soft rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📞</span>
            <h3 className="font-bold text-base text-text-primary">Où obtenir de l'aide</h3>
          </div>
          <ul className="space-y-2.5">
            {data.ressources.map((r, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-terracotta flex-shrink-0 mt-0.5">▸</span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {r.lien ? (
                      <a href={r.lien} target="_blank" rel="noopener noreferrer"
                        className="hover:text-terracotta transition-colors inline-flex items-center gap-1">
                        {r.nom} <IconExternalLink />
                      </a>
                    ) : r.nom}
                  </p>
                  <p className="text-xs text-text-secondary">{r.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Niveau de confiance */}
      {data.niveau_confiance && (
        <p className="text-xs text-text-secondary text-center">
          Niveau de confiance de l'analyse : <span className="font-semibold">{data.niveau_confiance}</span>
          {data.niveau_confiance === 'faible' && ' — document partiel ou peu lisible, résultats à vérifier'}
        </p>
      )}
    </div>
  )
}

// ─── Modal exemple ─────────────────────────────────────────────────────────
function ExampleModal({ categoryId, onClose }) {
  const ex = EXAMPLES[categoryId]
  if (!ex) return null
  const parsed = ex.analysis

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full my-8" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border-soft">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{ex.emoji}</span>
            <div>
              <p className="text-xs text-text-secondary font-medium">Exemple — {ex.label}</p>
              <p className="font-semibold text-text-primary text-sm">{ex.docDescription}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-stone-100 transition-colors"><IconX /></button>
        </div>
        <div className="p-5 space-y-5">
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">Document analysé</p>
            <div className="rounded-xl overflow-hidden border border-border-soft bg-stone-50">
              <img src={ex.imageUrl} alt="" className="w-full h-40 object-cover opacity-80" />
              <div className="px-4 py-2 bg-amber-50 border-t border-amber-100">
                <p className="text-xs text-amber-700">📋 Document fictif à titre illustratif — les données sont inventées</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">Analyse Lisible</p>
            <div className="max-h-96 overflow-y-auto">
              <StructuredResult data={parsed} catEmoji={ex.emoji} />
            </div>
          </div>
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

// ─── Sub-components ────────────────────────────────────────────────────────
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
          {isFreeAccess && <p className="text-xs text-green-700 font-semibold">✅ Code validé — accès gratuit activé</p>}
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

// ─── Constants ──────────────────────────────────────────────────────────────
const STEPS = { HOME: 'home', UPLOAD: 'upload', CHECKING: 'checking', PAYMENT: 'payment', LOADING: 'loading', RESULT: 'result' }
const INPUT_MODES = { FILE: 'file', TEXT: 'text' }
const ACCEPTED_TYPES = {
  'application/pdf': 'pdf',
  'image/jpeg': 'image',
  'image/jpg': 'image',
  'image/png': 'image',
  'image/webp': 'image',
  'image/gif': 'image',
}

// ─── Main component ────────────────────────────────────────────────────────
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
  const [analysisRaw, setAnalysisRaw] = useState(null)
  const [analysisError, setAnalysisError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [followUpQuestion, setFollowUpQuestion] = useState('')
  const [followUpAnswer, setFollowUpAnswer] = useState('')
  const [followUpUsed, setFollowUpUsed] = useState(false)
  const [isFollowUpLoading, setIsFollowUpLoading] = useState(false)
  const [followUpError, setFollowUpError] = useState('')
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)
  const [exampleModal, setExampleModal] = useState(null)

  const fileInputRef = useRef(null)
  const cat = selectedCategory ? CATEGORIES[selectedCategory] : null
  const parsedAnalysis = parseAnalysis(analysisRaw)

  // ─── Retour Stripe ────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    const urlParams = new URLSearchParams(window.location.search)
    const paid = urlParams.get('paid') || localStorage.getItem('lisible_paid')
    const pendingRaw = localStorage.getItem('lisible_pending')
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
      } catch (e) { console.error(e) }
    }
  }, [])

  const launchAnalysis = async (data) => {
    setIsLoading(true)
    setAnalysisError('')
    try {
      const body = { category: data.category, question: data.question || '', paymentVerified: true }
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
      const res = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || "Erreur lors de l'analyse.")
      setAnalysisRaw(result.analysis)
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
      const body = { category: selectedCategory, question: question.trim(), accessCode: accessCode.toUpperCase().trim(), paymentVerified: false }
      if (inputMode === INPUT_MODES.FILE && uploadedFile) {
        if (uploadedFile.fileType === 'image') { body.imageBase64 = uploadedFile.base64; body.imageMediaType = uploadedFile.type }
        else body.pdfBase64 = uploadedFile.base64
      } else {
        body.documentText = documentText.trim()
      }
      const res = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'analyse.")
      setAnalysisRaw(data.analysis)
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
      category: selectedCategory, question: question.trim(), inputMode,
      documentText: documentText.trim(),
      uploadedFile: uploadedFile ? { base64: uploadedFile.base64, type: uploadedFile.type, fileType: uploadedFile.fileType, name: uploadedFile.name, size: uploadedFile.size } : null,
    }))
    try {
      const res = await fetch('/api/create-checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else { alert('Erreur lors de la création du paiement.'); setIsCheckoutLoading(false) }
    } catch { alert('Erreur réseau.'); setIsCheckoutLoading(false) }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const fileType = ACCEPTED_TYPES[file.type]
    if (!fileType) { alert('Format non accepté. Utilisez un PDF, JPG ou PNG.'); return }
    if (file.size > 10 * 1024 * 1024) { alert('Fichier trop lourd (max 10 Mo).'); return }
    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target.result.split(',')[1]
      setUploadedFile({ name: file.name, size: file.size, type: file.type, base64, fileType })
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => { e.preventDefault(); const file = e.dataTransfer.files[0]; if (file) handleFileChange({ target: { files: [file] } }) }
  const canContinue = inputMode === INPUT_MODES.FILE ? uploadedFile !== null : documentText.trim().length >= 20

  // ─── Precheck ─────────────────────────────────────────────────────────────
  const [precheckResult, setPrecheckResult] = useState(null) // { lisible, bonne_categorie, type_detecte, message }
  const [isChecking, setIsChecking] = useState(false)

  const handlePrecheck = async () => {
    setIsChecking(true)
    setPrecheckResult(null)
    setStep(STEPS.CHECKING)
    try {
      const body = { category: selectedCategory, isPrecheck: true }
      if (inputMode === INPUT_MODES.FILE && uploadedFile) {
        if (uploadedFile.fileType === 'image') { body.imageBase64 = uploadedFile.base64; body.imageMediaType = uploadedFile.type }
        else body.pdfBase64 = uploadedFile.base64
      } else {
        body.documentText = documentText.trim()
      }
      const res = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) throw new Error('Erreur de vérification.')
      setPrecheckResult(data.precheck)
    } catch {
      // En cas d'erreur réseau, on laisse passer vers PAYMENT
      setPrecheckResult({ lisible: 'oui', bonne_categorie: 'incertain', message: 'Vérification impossible — vous pouvez continuer.' })
    } finally {
      setIsChecking(false)
    }
  }

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
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory, isFollowUp: true,
          previousAnalysis: typeof analysisRaw === 'string' ? analysisRaw : JSON.stringify(analysisRaw),
          followUpQuestion: followUpQuestion.trim()
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur.')
      setFollowUpAnswer(data.analysis)
      setFollowUpUsed(true)
    } catch (err) { setFollowUpError(err.message) }
    finally { setIsFollowUpLoading(false) }
  }

  const handleReset = () => {
    setStep(STEPS.HOME); setSelectedCategory(null); setInputMode(INPUT_MODES.FILE)
    setDocumentText(''); setUploadedFile(null); setQuestion('')
    setAccessCode(''); setAccessCodeError(''); setIsFreeAccess(false)
    setAnalysisRaw(null); setAnalysisError('')
    setFollowUpQuestion(''); setFollowUpAnswer(''); setFollowUpUsed(false); setFollowUpError('')
    setIsCheckoutLoading(false); setPrecheckResult(null)
  }

  const parsedFollowUp = parseAnalysis(followUpAnswer)

  return (
    <>
      <Head>
        <title>Lisible — Avant de paniquer, comprenez.</title>
        <meta name="description" content="Analysez vos courriers administratifs, bulletins de paie, baux, contrats et actes d'huissier en langage simple. Paiement unique 1,99 €." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {exampleModal && <ExampleModal categoryId={exampleModal} onClose={() => setExampleModal(null)} />}

      <div className="min-h-screen bg-beige" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* Header */}
        <header className="border-b border-border-soft bg-white/80 backdrop-blur-sm sticky top-0 z-10 no-print">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={handleReset} className="flex items-center gap-2 group">
              <span className="text-2xl">📖</span>
              <span className="font-bold text-lg text-text-primary group-hover:text-terracotta transition-colors">Lisible</span>
            </button>
            {step !== STEPS.HOME && step !== STEPS.LOADING && step !== STEPS.CHECKING && (
              <button onClick={step === STEPS.RESULT ? handleReset : () => {
                if (step === STEPS.UPLOAD) setStep(STEPS.HOME)
                if (step === STEPS.PAYMENT) setStep(STEPS.UPLOAD)
              }} className="flex items-center gap-1 text-sm text-text-secondary hover:text-terracotta transition-colors">
                <IconChevronLeft />{step === STEPS.RESULT ? 'Nouvelle analyse' : 'Retour'}
              </button>
            )}
          </div>
        </header>

        {/* Progress bar */}
        {step !== STEPS.HOME && step !== STEPS.LOADING && step !== STEPS.CHECKING && (
          <div className="h-1 bg-border-soft no-print">
            <div className="h-full bg-terracotta transition-all duration-500"
              style={{ width: step === STEPS.UPLOAD ? '33%' : step === STEPS.PAYMENT ? '66%' : '100%' }} />
          </div>
        )}

        <main className="max-w-2xl mx-auto px-4 py-8">

          {/* ─── HOME ───────────────────────────────────────────────────────── */}
          {step === STEPS.HOME && (
            <div className="space-y-8">
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
                <p className="text-sm font-semibold text-terracotta">Paiement unique de 1,99 €.</p>
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

              {/* Ce que vous recevez */}
              <div className="bg-white rounded-2xl border border-border-soft p-5">
                <h3 className="font-semibold text-text-primary text-sm mb-3 flex items-center gap-2">
                  <span>📦</span> Ce que vous recevez
                </h3>
                <ul className="space-y-2">
                  {['Un résumé en clair', 'Les points importants à vérifier', 'Les délais visibles', 'Les questions à poser', 'Les ressources utiles', 'Un message prêt à envoyer si pertinent', 'Un PDF téléchargeable'].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-text-primary">
                      <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Voir des exemples */}
              <div className="bg-white rounded-2xl border border-border-soft p-5">
                <h3 className="font-semibold text-text-primary text-sm mb-3 flex items-center gap-2">
                  <span>👁️</span> Voir des exemples d'analyse
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(EXAMPLES).map(([key, ex]) => (
                    <button key={key} onClick={() => setExampleModal(key)}
                      className="flex items-center gap-3 text-left px-3 py-2.5 rounded-xl hover:bg-stone-50 transition-colors group">
                      <span className="text-lg">{ex.emoji}</span>
                      <span className="text-sm text-text-primary group-hover:text-terracotta transition-colors flex-1">
                        Exemple {ex.label.toLowerCase()}
                      </span>
                      <span className="text-text-secondary group-hover:text-terracotta transition-colors"><IconExternalLink /></span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mini processus */}
              <div className="grid grid-cols-3 gap-3 text-center">
                {[{ icon: '📎', step: '1', label: 'Ajoutez le document' }, { icon: '💳', step: '2', label: 'Validez le prix' }, { icon: '✅', step: '3', label: 'Recevez l\'analyse' }].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-3 border border-border-soft">
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-xs font-bold text-terracotta mb-0.5">{item.step}</div>
                    <div className="text-xs text-text-secondary font-medium leading-tight">{item.label}</div>
                  </div>
                ))}
              </div>

              <button onClick={() => selectedCategory && setStep(STEPS.UPLOAD)} disabled={!selectedCategory}
                className={`w-full py-4 rounded-2xl font-semibold text-base transition-all duration-200
                  ${selectedCategory ? 'bg-terracotta text-white shadow-md hover:bg-terracotta-dark' : 'bg-border-soft text-text-secondary cursor-not-allowed'}`}>
                {selectedCategory ? `Analyser mon document — ${CATEGORIES[selectedCategory].priceLabel}` : 'Sélectionnez un type de document'}
              </button>

              <div className="space-y-2">
                <p className="text-xs text-text-secondary text-center leading-relaxed">
                  Lisible aide à comprendre un document. Il ne remplace pas un avocat, une administration, un service RH ou un professionnel qualifié.
                </p>
                <p className="text-xs text-text-secondary/70 text-center leading-relaxed">
                  Analyse générée par IA, avec des prompts spécialisés et des limites clairement indiquées.
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
                        <button onClick={() => setUploadedFile(null)} className="text-green-600 hover:text-red-500 transition-colors p-1"><IconX /></button>
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

              <button onClick={handlePrecheck} disabled={!canContinue}
                className={`w-full py-4 rounded-2xl font-semibold text-base transition-all duration-200
                  ${canContinue ? 'bg-terracotta text-white shadow-md hover:bg-terracotta-dark' : 'bg-border-soft text-text-secondary cursor-not-allowed'}`}>
                Continuer →
              </button>
            </div>
          )}

          {/* ─── CHECKING ───────────────────────────────────────────────────── */}
          {step === STEPS.CHECKING && (
            <div className="space-y-6">

              {/* En cours de vérification */}
              {isChecking && (
                <div className="flex flex-col items-center justify-center py-20 space-y-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-terracotta/20 border-t-terracotta animate-spin" />
                    <span className="absolute inset-0 flex items-center justify-center text-2xl">🔍</span>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-semibold text-text-primary">Vérification du document…</p>
                    <p className="text-sm text-text-secondary">Quelques secondes pour s'assurer que l'analyse sera possible.</p>
                  </div>
                </div>
              )}

              {/* Résultat precheck — document illisible */}
              {!isChecking && precheckResult?.lisible === 'non' && (
                <div className="space-y-5">
                  <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center space-y-3">
                    <div className="text-4xl">😕</div>
                    <h2 className="font-bold text-lg text-text-primary">Document illisible</h2>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Votre document n'est pas suffisamment lisible pour être analysé. Voici comment y remédier :
                    </p>
                    <div className="bg-white rounded-xl p-4 border border-red-100 text-left space-y-2">
                      <p className="text-xs font-semibold text-text-primary">Pour obtenir une bonne analyse :</p>
                      <ul className="space-y-1.5">
                        {['Prenez la photo en bonne lumière, sans reflet', 'Assurez-vous que tout le texte est visible et net', 'Si c\'est un PDF, vérifiez qu\'il s\'ouvre correctement', 'Vous pouvez aussi coller le texte directement'].map(tip => (
                          <li key={tip} className="flex gap-2 text-xs text-text-secondary">
                            <span className="text-terracotta flex-shrink-0">▸</span>{tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button onClick={() => setStep(STEPS.UPLOAD)}
                    className="w-full py-4 rounded-2xl border-2 border-terracotta text-terracotta font-semibold text-base hover:bg-terracotta/5 transition-all">
                    ← Déposer un autre document
                  </button>
                </div>
              )}

              {/* Résultat precheck — mauvaise catégorie */}
              {!isChecking && precheckResult?.lisible !== 'non' && precheckResult?.bonne_categorie === 'non' && (
                <div className="space-y-5">
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 text-center space-y-3">
                    <div className="text-4xl">🤔</div>
                    <h2 className="font-bold text-lg text-text-primary">Ce document ne semble pas correspondre à la catégorie choisie</h2>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Vérifiez que vous avez sélectionné le bon type de document, ou déposez un autre fichier.
                    </p>
                    {precheckResult.type_detecte && (
                      <div className="bg-white rounded-xl px-4 py-3 border border-amber-100 inline-block">
                        <p className="text-xs text-text-secondary">Type détecté</p>
                        <p className="text-sm font-semibold text-text-primary mt-0.5">{precheckResult.type_detecte}</p>
                      </div>
                    )}
                    <p className="text-xs text-text-secondary">Vous n'êtes pas facturé(e) — aucun paiement n'a été demandé.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setStep(STEPS.UPLOAD)}
                      className="py-3.5 rounded-2xl border-2 border-border-soft text-text-secondary font-semibold text-sm hover:border-terracotta hover:text-terracotta transition-all">
                      ← Changer de document
                    </button>
                    <button onClick={() => { setStep(STEPS.HOME); setSelectedCategory(null) }}
                      className="py-3.5 rounded-2xl border-2 border-terracotta text-terracotta font-semibold text-sm hover:bg-terracotta/5 transition-all">
                      Changer de catégorie
                    </button>
                  </div>
                  {/* Escape hatch : l'utilisateur peut forcer la suite s'il pense que Claude a tort */}
                  <button onClick={() => setStep(STEPS.PAYMENT)}
                    className="w-full text-xs text-text-secondary hover:text-terracotta transition-colors py-2 underline underline-offset-2">
                    Continuer quand même avec cette catégorie →
                  </button>
                </div>
              )}

              {/* Résultat precheck — OK ou incertain → continuer vers paiement */}
              {!isChecking && precheckResult && precheckResult.lisible !== 'non' && precheckResult.bonne_categorie !== 'non' && (
                <div className="space-y-5">
                  <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="font-semibold text-green-800 text-sm">Document vérifié</p>
                        <p className="text-xs text-green-600 mt-0.5">{precheckResult.message || 'Votre document est lisible et correspond à la catégorie.'}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="bg-white rounded-xl px-3 py-2 border border-green-100">
                        <p className="text-xs text-text-secondary">Lisibilité</p>
                        <p className="text-sm font-semibold text-text-primary capitalize">{precheckResult.lisible === 'partiellement' ? '⚠ Partielle' : '✓ Bonne'}</p>
                      </div>
                      <div className="bg-white rounded-xl px-3 py-2 border border-green-100">
                        <p className="text-xs text-text-secondary">Catégorie</p>
                        <p className="text-sm font-semibold text-text-primary">{precheckResult.bonne_categorie === 'incertain' ? '~ À confirmer' : `✓ ${cat?.label}`}</p>
                      </div>
                    </div>
                    {precheckResult.lisible === 'partiellement' && (
                      <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
                        ⚠ Certaines parties du document sont peu lisibles — l'analyse sera partielle sur ces zones.
                      </p>
                    )}
                  </div>
                  <button onClick={() => setStep(STEPS.PAYMENT)}
                    className="w-full py-4 bg-terracotta text-white rounded-2xl font-semibold text-base shadow-md hover:bg-terracotta-dark transition-all">
                    Continuer vers le paiement — {cat?.priceLabel}
                  </button>
                </div>
              )}

            </div>
          )}

          {/* ─── PAYMENT ────────────────────────────────────────────────────── */}
          {step === STEPS.PAYMENT && cat && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-text-primary">Votre document est prêt à être analysé</h2>
              </div>

              <div className="bg-white border border-border-soft rounded-2xl p-5 space-y-3">
                {[
                  { label: 'Document reçu', value: `${cat.emoji} ${cat.label}` },
                  { label: 'Format accepté', value: inputMode === INPUT_MODES.FILE ? (uploadedFile?.fileType === 'image' ? 'Image (JPG / PNG)' : 'PDF') : 'Texte collé' },
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

              <p className="text-xs text-text-secondary leading-relaxed text-center px-2">
                L'analyse vous aide à comprendre le document, sans remplacer un professionnel qualifié.
              </p>

              {analysisError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-sm text-red-700">⚠️ {analysisError}</div>
              )}

              <div className="bg-terracotta/5 border border-terracotta/15 rounded-2xl p-4">
                <p className="text-xs font-semibold text-text-primary mb-2.5">Votre analyse inclut :</p>
                <ul className="space-y-1.5">
                  {['Résumé "En clair" immédiatement lisible', 'Checklist "À vérifier maintenant"', 'Explication des lignes importantes', 'Message prêt à envoyer (mail ou courrier)', 'Mini-glossaire des termes techniques', 'PDF téléchargeable'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-text-primary">
                      <span className="text-terracotta font-bold flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {isFreeAccess ? (
                <button onClick={handleAnalyze} disabled={isLoading}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-semibold text-base transition-all shadow-md">
                  Analyser gratuitement →
                </button>
              ) : (
                <div className="space-y-3">
                  <button onClick={handleStripeCheckout} disabled={isCheckoutLoading}
                    className="w-full py-4 bg-terracotta hover:bg-terracotta-dark text-white rounded-2xl font-semibold text-base transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                    {isCheckoutLoading ? <><IconSpinner /> Redirection vers le paiement…</> : <><IconLock /> Payer {cat.priceLabel} et lancer l'analyse</>}
                  </button>
                  <div className="text-center space-y-1">
                    <p className="text-xs text-text-secondary flex items-center justify-center gap-1">
                      <IconLock /> Paiement sécurisé via Stripe.
                    </p>
                    <p className="text-xs text-text-secondary">Document original supprimé après analyse.</p>
                  </div>
                </div>
              )}

              <CodeAccesSection accessCode={accessCode} setAccessCode={setAccessCode}
                accessCodeError={accessCodeError} setAccessCodeError={setAccessCodeError}
                isFreeAccess={isFreeAccess} setIsFreeAccess={setIsFreeAccess}
                handleApplyAccessCode={handleApplyAccessCode} />
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

              <StructuredResult data={parsedAnalysis} catEmoji={cat?.emoji} />

              {/* Disclaimer */}
              <div className="bg-stone-100 rounded-xl p-4 text-xs text-text-secondary leading-relaxed">
                <strong className="text-text-primary">Rappel important :</strong> Cette analyse est fournie à titre informatif uniquement. Elle ne constitue pas un conseil juridique, administratif ou fiscal. En cas de doute, consultez un professionnel.
              </div>

              {/* Question de suivi */}
              {!followUpUsed && (
                <div className="bg-white rounded-2xl border border-border-soft p-5 no-print">
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

              {/* Réponse question de suivi */}
              {followUpAnswer && (
                <div className="bg-white rounded-2xl border-l-4 border-terracotta p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span>💬</span>
                    <h3 className="font-semibold text-text-primary text-sm">Réponse à votre question</h3>
                  </div>
                  {parsedFollowUp ? (
                    <StructuredResult data={parsedFollowUp} catEmoji={cat?.emoji} />
                  ) : (
                    <p className="text-sm text-text-primary leading-relaxed">{followUpAnswer}</p>
                  )}
                </div>
              )}

              <button onClick={handleReset}
                className="w-full py-3.5 rounded-2xl border-2 border-terracotta text-terracotta font-semibold text-sm hover:bg-terracotta/5 transition-all no-print">
                Analyser un autre document
              </button>
            </div>
          )}

        </main>

        {/* Footer */}
        <footer className="border-t border-border-soft py-8 mt-8 no-print">
          <div className="max-w-2xl mx-auto px-4 space-y-4 text-center">
            <p className="text-xs text-text-secondary">
              Pour toute question technique, problème de paiement ou demande liée à vos données :{' '}
              <a href="mailto:contact@lisible.fr" className="text-terracotta hover:underline font-medium">contact@lisible.fr</a>
            </p>
            <p className="text-xs text-text-secondary">© 2025 Lisible — Aide à la compréhension de documents français</p>
            <p className="text-xs text-text-secondary/60">
              Lisible aide à comprendre un document. Il ne remplace pas un avocat, une administration, un service RH ou un professionnel qualifié.
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
