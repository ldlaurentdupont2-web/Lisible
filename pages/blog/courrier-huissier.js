import Head from 'next/head'
import Link from 'next/link'

export default function CourrierHuissier() {
  return (
    <>
      <Head>
        <title>Courrier d'huissier : que faire quand vous en recevez un ?</title>
        <meta name="description" content="Commandement de payer, saisie, assignation : comment comprendre un courrier d'huissier, quels délais respecter et où trouver de l'aide gratuitement." />
        <link rel="canonical" href="https://lisible.eu/blog/courrier-huissier" />
        <meta property="og:title" content="Courrier d'huissier : que faire quand vous en recevez un ?" />
        <meta property="og:description" content="Commandement de payer, saisie, assignation : comment comprendre un courrier d'huissier, quels délais respecter et où trouver de l'aide gratuitement." />
        <meta property="og:url" content="https://lisible.eu/blog/courrier-huissier" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Courrier d'huissier : que faire quand vous en recevez un ?",
          "description": "Commandement de payer, saisie, assignation : comment comprendre un courrier d'huissier, quels délais respecter et où trouver de l'aide gratuitement.",
          "url": "https://lisible.eu/blog/courrier-huissier",
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
            <span>Courrier d'huissier</span>
          </nav>

          <article className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta text-xs font-medium px-3 py-1 rounded-full">
                ⚖️ Courrier d'huissier
              </div>
              <h1 className="text-2xl font-bold text-text-primary leading-snug">
                Courrier d'huissier : que faire quand vous en recevez un ?
              </h1>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                Ce type de courrier peut sembler très inquiétant. Prenons le temps de comprendre ensemble ce que vous avez reçu, étape par étape.
              </div>
              <p className="text-base text-text-secondary leading-relaxed">
                Recevoir un acte d'huissier est souvent source de stress. Pourtant, comprendre exactement ce que vous avez reçu est la première étape indispensable — et dans bien des cas, des solutions existent.
              </p>
            </header>

            <nav className="bg-white border border-border-soft rounded-2xl p-5 space-y-2">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Dans cet article</p>
              <ul className="space-y-1.5 text-sm">
                {[
                  ["#types", "Les différents types d'actes d'huissier"],
                  ["#commandement", "Le commandement de payer"],
                  ["#saisie", "La saisie sur compte ou sur salaire"],
                  ["#assignation", "L'assignation en justice"],
                  ["#delais", "Les délais à respecter absolument"],
                  ["#erreurs", "Les erreurs à éviter"],
                  ["#aide", "Où trouver de l'aide gratuitement"],
                ].map(([href, label]) => (
                  <li key={href}><a href={href} className="text-terracotta hover:underline">{label}</a></li>
                ))}
              </ul>
            </nav>

            <section id="types" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Les différents types d'actes d'huissier</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Tous les courriers d'huissier ne sont pas identiques. Le type d'acte détermine ce que vous devez faire et dans quel délai.
              </p>
              <div className="space-y-2">
                {[
                  { type: "Commandement de payer", urgence: "🟠 Urgent", desc: "Mise en demeure de payer une somme dans un délai précis. C'est souvent une étape avant une procédure plus contraignante." },
                  { type: "Saisie-attribution", urgence: "🔴 Très urgent", desc: "Blocage de votre compte bancaire pour récupérer une somme due. Des délais très courts s'appliquent pour contester." },
                  { type: "Saisie sur salaire", urgence: "🟠 Urgent", desc: "Prélèvement direct d'une partie de votre salaire à la source. Votre employeur en est informé." },
                  { type: "Assignation en justice", urgence: "🟠 Urgent", desc: "Convocation devant un tribunal. Ne pas se présenter conduit souvent à un jugement défavorable par défaut." },
                  { type: "Signification de jugement", urgence: "🟠 Urgent", desc: "Notification d'une décision de justice. Le délai d'appel court à partir de cette date." },
                  { type: "Commandement de quitter les lieux", urgence: "🔴 Très urgent", desc: "Ordonne de libérer un logement dans un délai précis. Une aide juridique urgente est recommandée." },
                ].map((item) => (
                  <div key={item.type} className="p-4 bg-white border border-border-soft rounded-xl space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-text-primary text-sm">{item.type}</p>
                      <span className="text-xs flex-shrink-0">{item.urgence}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="commandement" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Le commandement de payer</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                C'est l'acte le plus fréquent. Il vous notifie une somme à payer dans un délai précis mentionné dans le document. Ce délai varie selon la nature de la dette.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Recevoir un commandement de payer ne signifie pas que vous devez obligatoirement payer immédiatement et en totalité. Plusieurs options existent.
              </p>
              <div className="space-y-2">
                {[
                  { option: "Payer en totalité", desc: "Met fin à la procédure. Demandez toujours un reçu ou une quittance." },
                  { option: "Négocier un échéancier", desc: "Contactez le créancier ou son huissier pour proposer un paiement échelonné. Demandez un accord écrit." },
                  { option: "Contester la dette", desc: "Si vous estimez ne pas devoir cette somme ou que le montant est erroné, vous pouvez contester. Un délai légal s'applique." },
                  { option: "Demander un délai au juge", desc: "En cas de difficultés financières, le juge peut accorder des délais de paiement (article 1343-5 du Code civil)." },
                ].map((item) => (
                  <div key={item.option} className="flex gap-3 p-3 bg-white border border-border-soft rounded-xl">
                    <span className="text-terracotta font-semibold text-sm flex-shrink-0">{item.option}</span>
                    <span className="text-sm text-text-secondary leading-relaxed">{item.desc}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="saisie" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">La saisie sur compte ou sur salaire</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                La saisie-attribution bloque les fonds présents sur votre compte bancaire à la date de la saisie. Mais la loi protège un montant minimum.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800 space-y-2">
                <p><strong>Le Solde Bancaire Insaisissable (SBI)</strong></p>
                <p>Quel que soit votre niveau d'endettement, un montant minimum doit toujours rester disponible sur votre compte. Il correspond au montant du RSA socle pour une personne seule. En 2025, ce montant est d'environ 635 €.</p>
                <p>Si votre banque ne l'a pas appliqué automatiquement, contactez-la immédiatement.</p>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Pour la saisie sur salaire, seule une fraction de votre salaire peut être prélevée. Le reste est protégé selon un barème légal tenant compte de vos revenus et charges de famille.
              </p>
            </section>

            <section id="assignation" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">L'assignation en justice</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Une assignation vous convoque devant un tribunal à une date précise. C'est une étape sérieuse qui nécessite une réaction rapide.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
                ⚠️ <strong>Ne pas se présenter à l'audience</strong> conduit presque systématiquement à un jugement par défaut en faveur de la partie adverse. Même si vous contestez la dette, présentez-vous ou faites-vous représenter.
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Si vous ne pouvez pas vous faire représenter par un avocat, vous pouvez vous présenter seul. Des Points d'Accès au Droit peuvent vous aider à préparer votre défense gratuitement.
              </p>
            </section>

            <section id="delais" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Les délais à respecter absolument</h2>
              <div className="space-y-2">
                {[
                  { acte: "Saisie-attribution", delai: "1 mois", action: "Pour contester auprès du juge de l'exécution" },
                  { acte: "Signification de jugement", delai: "1 mois", action: "Pour faire appel (en général)" },
                  { acte: "Commandement de payer (loyer)", delai: "2 mois", action: "Pour régulariser avant que la clause résolutoire joue" },
                  { acte: "Commandement de quitter les lieux", delai: "2 mois minimum", action: "Délai légal avant expulsion effective" },
                ].map((item) => (
                  <div key={item.acte} className="p-3 bg-white border border-border-soft rounded-xl">
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-semibold text-text-primary text-sm">{item.acte}</p>
                      <span className="text-terracotta font-bold text-sm flex-shrink-0">{item.delai}</span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">{item.action}</p>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                💡 Ces délais sont donnés à titre indicatif. Le délai exact qui vous concerne est mentionné dans votre acte — lisez-le attentivement ou faites-le analyser.
              </div>
            </section>

            <section id="erreurs" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Les erreurs à éviter</h2>
              <ul className="space-y-2 text-sm text-text-secondary">
                {[
                  "Ignorer l'acte en espérant que ça se règle seul — les délais continuent de courir et la situation s'aggrave.",
                  "Payer une partie de la somme sans accord écrit — cela peut être interprété comme une reconnaissance totale de la dette.",
                  "Contacter directement la banque pour la saisie sans avoir compris vos droits au préalable, notamment sur le SBI.",
                  "Ne pas informer votre employeur à temps en cas de saisie sur salaire, ce qui peut créer des complications administratives.",
                  "Attendre la dernière minute pour chercher de l'aide — plus tôt vous agissez, plus les options sont nombreuses.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-red-400 flex-shrink-0">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="aide" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Où trouver de l'aide gratuitement</h2>
              <div className="space-y-2">
                {[
                  { nom: "Points d'Accès au Droit (PAD)", desc: "Consultations juridiques gratuites en mairie avec des professionnels du droit. Trouvez le vôtre sur justice.fr." },
                  { nom: "ADIL", desc: "Si la dette est liée au logement (loyer, charges), l'Agence Départementale d'Information sur le Logement propose des consultations gratuites." },
                  { nom: "Commission de surendettement", desc: "Si vous êtes en situation de surendettement, la Banque de France peut vous accompagner gratuitement." },
                  { nom: "CCAS de votre mairie", desc: "Le Centre Communal d'Action Sociale peut vous orienter et vous accompagner dans vos démarches." },
                  { nom: "Défenseur des droits", desc: "Si le litige implique un organisme public ou une administration, le Défenseur des droits peut intervenir gratuitement." },
                ].map((ressource) => (
                  <div key={ressource.nom} className="flex gap-3 p-3 bg-white border border-border-soft rounded-xl">
                    <span className="text-terracotta font-semibold text-sm flex-shrink-0 w-40">{ressource.nom}</span>
                    <span className="text-sm text-text-secondary leading-relaxed">{ressource.desc}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-terracotta/5 border border-terracotta/20 rounded-2xl p-6 space-y-4 text-center">
              <p className="text-base font-semibold text-text-primary">Vous avez reçu un acte d'huissier et vous ne comprenez pas ce qu'il signifie ?</p>
              <p className="text-sm text-text-secondary">
                Uploadez votre document sur Lisible et recevez une explication claire : type d'acte, montant, délai à respecter, actions possibles et ressources gratuites.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 bg-terracotta text-white font-semibold px-6 py-3 rounded-xl hover:bg-terracotta/90 transition-colors text-sm">
                Analyser mon courrier d'huissier — 1,99 €
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
