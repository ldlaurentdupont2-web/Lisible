import Head from 'next/head'
import Link from 'next/link'

export default function TropPercuCAF() {
  return (
    <>
      <Head>
        <title>Trop-perçu CAF : que faire quand vous recevez cette lettre ?</title>
        <meta name="description" content="Vous avez reçu un courrier de la CAF vous réclamant un trop-perçu ? On vous explique ce que ça veut dire, ce que vous devez faire, et comment contester si besoin." />
        <link rel="canonical" href="https://lisible.eu/blog/trop-percu-caf" />
        <meta property="og:title" content="Trop-perçu CAF : que faire quand vous recevez cette lettre ?" />
        <meta property="og:description" content="Vous avez reçu un courrier de la CAF vous réclamant un trop-perçu ? On vous explique ce que ça veut dire, ce que vous devez faire, et comment contester si besoin." />
        <meta property="og:url" content="https://lisible.eu/blog/trop-percu-caf" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Trop-perçu CAF : que faire quand vous recevez cette lettre ?",
          "description": "Vous avez reçu un courrier de la CAF vous réclamant un trop-perçu ? On vous explique ce que ça veut dire, ce que vous devez faire, et comment contester si besoin.",
          "url": "https://lisible.eu/blog/trop-percu-caf",
          "publisher": {
            "@type": "Organization",
            "name": "Lisible",
            "url": "https://lisible.eu"
          },
          "datePublished": "2025-05-07",
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

          {/* Breadcrumb */}
          <nav className="text-xs text-text-secondary mb-6">
            <Link href="/" className="hover:text-terracotta transition-colors">Accueil</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-terracotta transition-colors">Blog</Link>
            <span className="mx-2">›</span>
            <span>Trop-perçu CAF</span>
          </nav>

          <article className="space-y-8">

            {/* Header */}
            <header className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta text-xs font-medium px-3 py-1 rounded-full">
                🏛️ Courrier administratif
              </div>
              <h1 className="text-2xl font-bold text-text-primary leading-snug">
                Trop-perçu CAF : que faire quand vous recevez cette lettre ?
              </h1>
              <p className="text-base text-text-secondary leading-relaxed">
                Vous avez reçu un courrier de la CAF vous informant d'un trop-perçu. C'est souvent une mauvaise surprise — et la lettre n'est pas toujours facile à comprendre. Voici ce que ça veut dire concrètement, et ce que vous pouvez faire.
              </p>
            </header>

            {/* Sommaire */}
            <nav className="bg-white border border-border-soft rounded-2xl p-5 space-y-2">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Dans cet article</p>
              <ul className="space-y-1.5 text-sm">
                {[
                  ["#definition", "C'est quoi un trop-perçu CAF ?"],
                  ["#raisons", "Pourquoi la CAF réclame cet argent ?"],
                  ["#delai", "Quel délai pour rembourser ?"],
                  ["#options", "Quelles sont vos options ?"],
                  ["#contester", "Peut-on contester un trop-perçu ?"],
                  ["#erreurs", "Les erreurs à éviter"],
                  ["#aide", "Où trouver de l'aide gratuitement ?"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="text-terracotta hover:underline">{label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Section 1 */}
            <section id="definition" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">C'est quoi un trop-perçu CAF ?</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Un trop-perçu, c'est simplement de l'argent que la CAF vous a versé et qu'elle considère ne pas vous être dû. Cela peut concerner n'importe quelle prestation : le RSA, les APL, les allocations familiales, la prime d'activité...
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                La CAF calcule régulièrement vos droits en fonction de vos ressources et de votre situation. Si elle constate qu'elle vous a versé plus que ce à quoi vous aviez droit, elle vous envoie un courrier de notification de trop-perçu — et vous demande de rembourser la différence.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                💡 <strong>À savoir :</strong> un trop-perçu ne signifie pas forcément que vous avez fait quelque chose de mal. Dans la majorité des cas, c'est lié à un changement de situation qui n'a pas été pris en compte à temps.
              </div>
            </section>

            {/* Section 2 */}
            <section id="raisons" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Pourquoi la CAF réclame cet argent ?</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Les raisons les plus fréquentes sont :
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                {[
                  "Une hausse de revenus non déclarée à temps (reprise d'emploi, augmentation, prime)",
                  "Un changement de situation familiale (mise en couple, séparation, déménagement)",
                  "Une erreur dans vos déclarations trimestrielles de ressources",
                  "Un délai de traitement : vos droits ont été recalculés rétroactivement",
                  "Une erreur de la CAF elle-même (cela arrive)",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-terracotta flex-shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 3 */}
            <section id="delai" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Quel délai pour rembourser ?</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Le courrier de la CAF mentionne généralement un délai de remboursement. Lisez-le attentivement — il peut aller de quelques semaines à plusieurs mois selon les cas.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Si vous ne réagissez pas dans ce délai, la CAF peut commencer à récupérer le trop-perçu directement en déduisant un montant de vos prochaines allocations — c'est ce qu'on appelle une <strong className="text-text-primary">retenue sur prestations</strong>.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
                ⏰ <strong>Important :</strong> ne laissez pas ce courrier sans réponse. Même si vous ne pouvez pas rembourser immédiatement, contactez la CAF — des arrangements sont possibles.
              </div>
            </section>

            {/* Section 4 */}
            <section id="options" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Quelles sont vos options ?</h2>
              <div className="space-y-3">
                {[
                  {
                    titre: "1. Rembourser en une fois",
                    texte: "Si le montant est raisonnable et que vous pouvez le payer, c'est la solution la plus simple. Vous pouvez le faire directement sur votre espace Caf.fr."
                  },
                  {
                    titre: "2. Demander un échelonnement",
                    texte: "Si vous ne pouvez pas rembourser en une fois, vous pouvez demander un plan de remboursement sur plusieurs mois. La CAF accepte généralement ces demandes — appelez le 3230 ou faites la demande via votre espace personnel."
                  },
                  {
                    titre: "3. Demander une remise de dette",
                    texte: "Dans certaines situations de difficultés financières importantes, vous pouvez demander une remise partielle ou totale du trop-perçu. Cette demande s'adresse à la commission de recours amiable de votre CAF."
                  },
                  {
                    titre: "4. Contester le montant",
                    texte: "Si vous pensez que le montant est erroné ou que le trop-perçu n'est pas justifié, vous avez le droit de contester (voir section suivante)."
                  },
                ].map((option) => (
                  <div key={option.titre} className="bg-white border border-border-soft rounded-xl p-4 space-y-1">
                    <p className="font-semibold text-text-primary text-sm">{option.titre}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{option.texte}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5 */}
            <section id="contester" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Peut-on contester un trop-perçu ?</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Oui. Si vous pensez que la CAF a fait une erreur dans son calcul, ou que le trop-perçu n'est pas justifié, vous pouvez saisir la <strong className="text-text-primary">Commission de Recours Amiable (CRA)</strong> de votre CAF.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Vous disposez en général de <strong className="text-text-primary">deux mois</strong> à compter de la notification pour déposer votre recours. Passé ce délai, la contestation devient plus difficile.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                La demande se fait par courrier recommandé avec accusé de réception, adressé à votre CAF locale. Expliquez clairement pourquoi vous contestez, et joignez tous les justificatifs utiles.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                📋 <strong>Conseil :</strong> conservez toujours une copie de votre courrier et de l'accusé de réception. Si la CRA ne vous donne pas satisfaction, vous pouvez ensuite saisir le tribunal judiciaire — mais cette étape nécessite souvent un accompagnement.
              </div>
            </section>

            {/* Section 6 */}
            <section id="erreurs" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Les erreurs à éviter</h2>
              <ul className="space-y-2 text-sm text-text-secondary">
                {[
                  "Ignorer le courrier en espérant que ça se règle seul — les délais continuent de courir",
                  "Payer une partie de la somme sans accord écrit, ce qui peut être interprété comme une reconnaissance totale de la dette",
                  "Attendre trop longtemps avant de demander un échelonnement — agir tôt facilite les négociations",
                  "Contester sans justificatifs — une contestation sans preuves a peu de chances d'aboutir",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-red-400 flex-shrink-0">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 7 */}
            <section id="aide" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Où trouver de l'aide gratuitement ?</h2>
              <div className="space-y-2">
                {[
                  { nom: "France Services", desc: "Guichet universel de proximité, présent dans toute la France. Ils peuvent vous aider à comprendre votre courrier et à rédiger une réponse." },
                  { nom: "Point-Justice", desc: "Consultations juridiques gratuites avec des professionnels du droit. Utile si vous souhaitez contester." },
                  { nom: "CCAS de votre mairie", desc: "Le Centre Communal d'Action Sociale peut vous accompagner si vous êtes en difficulté financière." },
                  { nom: "Défenseur des droits", desc: "Si vous estimez que la CAF n'a pas respecté vos droits, le Défenseur des droits peut intervenir gratuitement." },
                ].map((ressource) => (
                  <div key={ressource.nom} className="flex gap-3 p-3 bg-white border border-border-soft rounded-xl">
                    <span className="text-terracotta flex-shrink-0 font-semibold text-sm">{ressource.nom}</span>
                    <span className="text-sm text-text-secondary">{ressource.desc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Lisible */}
            <div className="bg-terracotta/5 border border-terracotta/20 rounded-2xl p-6 space-y-4 text-center">
              <p className="text-base font-semibold text-text-primary">Vous avez reçu un courrier de la CAF et vous ne le comprenez pas ?</p>
              <p className="text-sm text-text-secondary">
                Uploadez votre document sur Lisible et recevez une explication claire en quelques secondes : ce que ça veut dire, ce que vous devez faire, les délais à respecter.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 bg-terracotta text-white font-semibold px-6 py-3 rounded-xl hover:bg-terracotta/90 transition-colors text-sm">
                Analyser mon courrier CAF — 1,99 €
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
