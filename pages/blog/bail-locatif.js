import Head from 'next/head'
import Link from 'next/link'

export default function BailLocatif() {
  return (
    <>
      <Head>
        <title>Bail locatif : les clauses à vérifier avant de signer</title>
        <meta name="description" content="Loyer, charges, dépôt de garantie, préavis, clauses abusives : ce qu'il faut vérifier dans votre bail locatif avant de signer ou en cours de location." />
        <link rel="canonical" href="https://lisible.eu/blog/bail-locatif" />
        <meta property="og:title" content="Bail locatif : les clauses à vérifier avant de signer" />
        <meta property="og:description" content="Loyer, charges, dépôt de garantie, préavis, clauses abusives : ce qu'il faut vérifier dans votre bail locatif avant de signer ou en cours de location." />
        <meta property="og:url" content="https://lisible.eu/blog/bail-locatif" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Bail locatif : les clauses à vérifier avant de signer",
          "description": "Loyer, charges, dépôt de garantie, préavis, clauses abusives : ce qu'il faut vérifier dans votre bail locatif avant de signer ou en cours de location.",
          "url": "https://lisible.eu/blog/bail-locatif",
          "publisher": { "@type": "Organization", "name": "Lisible", "url": "https://lisible.eu" },
          "datePublished": "2025-05-14",
          "inLanguage": "fr"
        })}} />
      </Head>

      <div className="min-h-screen bg-beige" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <header className="border-b border-border-soft bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">📖</span>
              <span className="font-bold text-lg text-text-primary group-hover:text-terracotta transition-colors">Lisible</span>
            </Link>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-10">
          <nav className="text-xs text-text-secondary mb-6">
            <Link href="/" className="hover:text-terracotta transition-colors">Accueil</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-terracotta transition-colors">Blog</Link>
            <span className="mx-2">›</span>
            <span>Bail locatif</span>
          </nav>

          <article className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta text-xs font-medium px-3 py-1 rounded-full">
                🏠 Bail locatif
              </div>
              <h1 className="text-2xl font-bold text-text-primary leading-snug">
                Bail locatif : les clauses à vérifier avant de signer
              </h1>
              <p className="text-base text-text-secondary leading-relaxed">
                Signer un bail locatif sans le lire attentivement, c'est l'erreur la plus fréquente des locataires. Un bail peut contenir des clauses contraignantes, voire abusives, que vous acceptez sans le savoir. Voici ce qu'il faut absolument vérifier.
              </p>
            </header>

            <nav className="bg-white border border-border-soft rounded-2xl p-5 space-y-2">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Dans cet article</p>
              <ul className="space-y-1.5 text-sm">
                {[
                  ["#types", "Bail nu ou bail meublé : quelle différence ?"],
                  ["#loyer", "Loyer et charges : ce qu'il faut vérifier"],
                  ["#depot", "Le dépôt de garantie"],
                  ["#preavis", "Le préavis : durées légales"],
                  ["#clauses", "Les clauses inhabituelles ou abusives"],
                  ["#droits", "Vos droits en tant que locataire"],
                  ["#questions", "Les questions à poser avant de signer"],
                ].map(([href, label]) => (
                  <li key={href}><a href={href} className="text-terracotta hover:underline">{label}</a></li>
                ))}
              </ul>
            </nav>

            <section id="types" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Bail nu ou bail meublé : quelle différence ?</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Le type de bail détermine vos droits et vos obligations. Il est indiqué en général dès les premières lignes du contrat.
              </p>
              <div className="space-y-2">
                {[
                  { type: "Bail nu (vide)", duree: "3 ans renouvelables", preavis: "3 mois (locataire) / 6 mois (propriétaire)", depot: "1 mois de loyer hors charges" },
                  { type: "Bail meublé", duree: "1 an renouvelable", preavis: "1 mois (locataire) / 3 mois (propriétaire)", depot: "2 mois de loyer hors charges" },
                  { type: "Bail mobilité", duree: "1 à 10 mois (non renouvelable)", preavis: "1 mois (locataire) / non applicable (propriétaire)", depot: "Aucun dépôt de garantie autorisé" },
                ].map((item) => (
                  <div key={item.type} className="p-4 bg-white border border-border-soft rounded-xl space-y-2">
                    <p className="font-semibold text-text-primary text-sm">{item.type}</p>
                    <div className="grid grid-cols-1 gap-1 text-xs text-text-secondary">
                      <span>⏱ Durée : {item.duree}</span>
                      <span>📋 Préavis : {item.preavis}</span>
                      <span>💰 Dépôt de garantie : {item.depot}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="loyer" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Loyer et charges : ce qu'il faut vérifier</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Le loyer et les charges doivent être clairement distingués dans le bail. Plusieurs points méritent attention.
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                {[
                  "Le montant du loyer hors charges est-il clairement indiqué ?",
                  "Les charges sont-elles forfaitaires (montant fixe) ou provisionnelles (avec régularisation annuelle) ? Les provisions avec régularisation sont plus transparentes.",
                  "En zone tendue, le loyer respecte-t-il l'encadrement des loyers ? Vous pouvez vérifier sur le site du gouvernement.",
                  "La clause de révision du loyer mentionne-t-elle l'Indice de Référence des Loyers (IRL) ? C'est la seule révision légalement permise.",
                  "Si le bail mentionne un loyer de référence majoré, le propriétaire doit pouvoir le justifier.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-terracotta flex-shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="depot" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Le dépôt de garantie</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Le dépôt de garantie est encadré par la loi. Son montant maximum dépend du type de bail (voir tableau ci-dessus). Il vous est restitué dans un délai légal après votre départ.
              </p>
              <div className="space-y-2">
                {[
                  { situation: "Pas de dégradation constatée", delai: "1 mois après remise des clés" },
                  { situation: "Dégradations constatées à l'état des lieux de sortie", delai: "2 mois après remise des clés" },
                ].map((item) => (
                  <div key={item.situation} className="flex gap-3 p-3 bg-white border border-border-soft rounded-xl">
                    <span className="text-sm text-text-secondary flex-1">{item.situation}</span>
                    <span className="text-sm text-terracotta font-semibold flex-shrink-0">{item.delai}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                ⚠️ <strong>Important :</strong> faites toujours un état des lieux d'entrée détaillé et conservez-en une copie. C'est votre meilleure protection en cas de litige sur le dépôt de garantie.
              </div>
            </section>

            <section id="preavis" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Le préavis : durées légales</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Pour un bail nu, le préavis locataire est de 3 mois — mais il peut être réduit à 1 mois dans plusieurs situations légales.
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                {[
                  "Zone tendue (Paris, Lyon, Bordeaux et de nombreuses autres villes)",
                  "Perte d'emploi ou mutation professionnelle",
                  "Obtention d'un premier emploi",
                  "État de santé justifiant un changement de domicile",
                  "Attribution d'un logement social",
                  "Violences conjugales",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-500 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-text-secondary leading-relaxed">
                Si vous êtes dans l'une de ces situations, le préavis réduit à 1 mois s'applique de droit — vérifiez que votre bail ne tente pas d'y déroger.
              </p>
            </section>

            <section id="clauses" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Les clauses inhabituelles ou abusives</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Certaines clauses sont fréquentes dans les baux mais méritent attention. D'autres sont carrément interdites par la loi.
              </p>
              <div className="space-y-2">
                {[
                  { clause: "Interdiction d'avoir des animaux de compagnie", eval: "potentiellement abusive", exp: "Dans un bail nu, cette clause est réputée non écrite. Vous pouvez avoir des animaux domestiques, sauf troubles de voisinage." },
                  { clause: "Clause pénale en cas de retard de loyer", eval: "à surveiller", exp: "Légale si elle est raisonnable, mais certains montants peuvent être excessifs." },
                  { clause: "Obligation de souscrire une assurance chez un assureur désigné", eval: "abusive", exp: "Le propriétaire peut exiger une assurance habitation, mais ne peut pas imposer un assureur particulier." },
                  { clause: "Interdiction de sous-louer", eval: "normale", exp: "La sous-location sans accord du propriétaire est effectivement interdite par défaut." },
                  { clause: "Frais de relance en cas d'impayé", eval: "à surveiller", exp: "Ces frais doivent être proportionnés. Des montants excessifs peuvent être contestés." },
                ].map((item) => (
                  <div key={item.clause} className="p-4 bg-white border border-border-soft rounded-xl space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-text-primary text-sm">{item.clause}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                        item.eval === 'abusive' || item.eval === 'potentiellement abusive' ? 'bg-red-100 text-red-700' :
                        item.eval === 'à surveiller' ? 'bg-amber-100 text-amber-700' :
                        'bg-green-100 text-green-700'
                      }`}>{item.eval}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{item.exp}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="droits" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Vos droits en tant que locataire</h2>
              <ul className="space-y-2 text-sm text-text-secondary">
                {[
                  "Droit à un logement décent : le propriétaire est tenu de maintenir le logement en bon état.",
                  "Droit à la tranquillité : le propriétaire ne peut pas entrer dans le logement sans votre accord.",
                  "Droit au renouvellement automatique du bail à son terme, sauf congé donné dans les formes légales.",
                  "Droit de contester une clause abusive devant la commission départementale de conciliation.",
                  "Droit à l'ADIL (Agence Départementale d'Information sur le Logement) pour une consultation gratuite.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-terracotta flex-shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="questions" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Les questions à poser avant de signer</h2>
              <div className="space-y-2">
                {[
                  "Le logement est-il situé en zone tendue ? (important pour le préavis et l'encadrement des loyers)",
                  "Les charges sont-elles provisionnelles ou forfaitaires ? Quel était le montant de la dernière régularisation ?",
                  "Y a-t-il des travaux prévus dans l'immeuble susceptibles d'affecter les charges ?",
                  "Le dépôt de garantie est-il bien plafonné légalement ?",
                  "Y a-t-il une annexe avec l'inventaire du mobilier si c'est un meublé ?",
                ].map((q, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-white border border-border-soft rounded-xl">
                    <span className="text-terracotta flex-shrink-0">→</span>
                    <span className="text-sm text-text-secondary italic">"{q}"</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-terracotta/5 border border-terracotta/20 rounded-2xl p-6 space-y-4 text-center">
              <p className="text-base font-semibold text-text-primary">Vous avez un bail locatif et vous ne comprenez pas certaines clauses ?</p>
              <p className="text-sm text-text-secondary">
                Uploadez votre bail sur Lisible et recevez une analyse complète en langage simple : type de bail, loyer, charges, clauses inhabituelles, points à vérifier et questions à poser.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 bg-terracotta text-white font-semibold px-6 py-3 rounded-xl hover:bg-terracotta/90 transition-colors text-sm">
                Analyser mon bail locatif — 1,99 €
              </Link>
              <p className="text-xs text-text-secondary">Sans compte · Sans abonnement · PDF inclus</p>
            </div>

          </article>
        </main>

        <footer className="border-t border-border-soft py-8 mt-8">
          <div className="max-w-2xl mx-auto px-4 text-center space-y-2">
            <div className="flex justify-center gap-6 text-xs text-text-secondary">
              <Link href="/mentions-legales" className="hover:text-terracotta transition-colors">Mentions légales</Link>
              <Link href="/cgv" className="hover:text-terracotta transition-colors">CGV</Link>
              <Link href="/a-propos" className="hover:text-terracotta transition-colors">À propos</Link>
            </div>
            <p className="text-xs text-text-secondary">© 2025 Lisible — Aide à la compréhension de documents français</p>
          </div>
        </footer>
      </div>
    </>
  )
}
