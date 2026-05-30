import Head from 'next/head'
import Link from 'next/link'

export default function ContratDeTravail() {
  return (
    <>
      <Head>
        <title>Contrat de travail : ce qu'il faut vérifier avant de signer</title>
        <meta name="description" content="Période d'essai, salaire, clause de non-concurrence, mobilité, préavis : les points essentiels à vérifier dans votre contrat de travail avant de signer." />
        <link rel="canonical" href="https://lisible.eu/blog/contrat-de-travail" />
        <meta property="og:title" content="Contrat de travail : ce qu'il faut vérifier avant de signer" />
        <meta property="og:description" content="Période d'essai, salaire, clause de non-concurrence, mobilité, préavis : les points essentiels à vérifier dans votre contrat de travail avant de signer." />
        <meta property="og:url" content="https://lisible.eu/blog/contrat-de-travail" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Contrat de travail : ce qu'il faut vérifier avant de signer",
          "description": "Période d'essai, salaire, clause de non-concurrence, mobilité, préavis : les points essentiels à vérifier dans votre contrat de travail avant de signer.",
          "url": "https://lisible.eu/blog/contrat-de-travail",
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
            <span>Contrat de travail</span>
          </nav>

          <article className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta text-xs font-medium px-3 py-1 rounded-full">
                📋 Contrat de travail
              </div>
              <h1 className="text-2xl font-bold text-text-primary leading-snug">
                Contrat de travail : ce qu'il faut vérifier avant de signer
              </h1>
              <p className="text-base text-text-secondary leading-relaxed">
                On signe souvent un contrat de travail dans l'enthousiasme d'une nouvelle opportunité, sans le lire vraiment. Pourtant certaines clauses peuvent limiter votre liberté professionnelle pour des années. Voici ce qu'il faut absolument vérifier.
              </p>
            </header>

            <nav className="bg-white border border-border-soft rounded-2xl p-5 space-y-2">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Dans cet article</p>
              <ul className="space-y-1.5 text-sm">
                {[
                  ["#types", "Les types de contrats"],
                  ["#periode-essai", "La période d'essai"],
                  ["#remuneration", "La rémunération"],
                  ["#duree-travail", "La durée du travail"],
                  ["#clauses", "Les clauses à surveiller"],
                  ["#absentes", "Ce qui devrait être dans le contrat"],
                  ["#questions", "Les questions à poser avant de signer"],
                ].map(([href, label]) => (
                  <li key={href}><a href={href} className="text-terracotta hover:underline">{label}</a></li>
                ))}
              </ul>
            </nav>

            <section id="types" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Les types de contrats</h2>
              <div className="space-y-2">
                {[
                  { type: "CDI", desc: "Contrat à durée indéterminée. Pas de date de fin. C'est la forme normale d'emploi — tout le reste est une exception légale." },
                  { type: "CDD", desc: "Contrat à durée déterminée. Doit mentionner un motif précis (remplacement, surcroît d'activité, saisonnier...). Sans motif valable, il peut être requalifié en CDI." },
                  { type: "Alternance", desc: "Contrat d'apprentissage ou de professionnalisation. Lie une formation et un emploi. Des règles spécifiques s'appliquent sur le salaire et la durée." },
                  { type: "Intérim", desc: "Contrat de mission via une agence. La durée est encadrée et le taux horaire doit inclure l'indemnité de fin de mission (10%)." },
                ].map((item) => (
                  <div key={item.type} className="flex gap-3 p-4 bg-white border border-border-soft rounded-xl">
                    <span className="text-terracotta font-bold text-sm flex-shrink-0 w-20">{item.type}</span>
                    <span className="text-sm text-text-secondary leading-relaxed">{item.desc}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="periode-essai" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">La période d'essai</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                La période d'essai permet à chacune des parties de mettre fin au contrat sans motif ni indemnité. Sa durée maximale dépend du statut et de la convention collective.
              </p>
              <div className="space-y-2">
                {[
                  { statut: "Ouvriers / Employés", duree: "2 mois (renouvelable 1 fois)" },
                  { statut: "Agents de maîtrise / Techniciens", duree: "3 mois (renouvelable 1 fois)" },
                  { statut: "Cadres", duree: "4 mois (renouvelable 1 fois)" },
                ].map((item) => (
                  <div key={item.statut} className="flex justify-between items-center p-3 bg-white border border-border-soft rounded-xl">
                    <span className="text-sm text-text-primary">{item.statut}</span>
                    <span className="text-sm text-terracotta font-semibold">{item.duree}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                ⚠️ Une convention collective peut prévoir des durées plus courtes. Si votre contrat mentionne une durée plus longue que le maximum légal, ce point mérite vérification.
              </div>
            </section>

            <section id="remuneration" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">La rémunération</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Le contrat doit mentionner clairement votre rémunération. Plusieurs points méritent attention.
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                {[
                  "Le salaire brut mensuel ou annuel est-il clairement indiqué ? Les deux peuvent figurer — vérifiez la cohérence.",
                  "S'il y a une part variable (primes, commissions), les critères de calcul sont-ils définis dans le contrat ou dans une annexe ?",
                  "Les avantages mentionnés (voiture, téléphone, tickets-restaurant, mutuelle) sont-ils précisés ?",
                  "Le salaire est-il au moins égal au minimum conventionnel de votre classification ? La convention collective s'applique même si elle n'est pas dans le contrat.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-terracotta flex-shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="duree-travail" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">La durée du travail</h2>
              <div className="space-y-2">
                {[
                  { type: "Temps plein classique", desc: "35h hebdomadaires. Les heures supplémentaires sont majorées." },
                  { type: "Temps partiel", desc: "La durée hebdomadaire ou mensuelle doit être précisée. Vérifiez les conditions de modification des horaires et les heures complémentaires." },
                  { type: "Forfait jours", desc: "Réservé aux cadres et certains non-cadres autonomes. Un nombre de jours annuels est fixé (souvent 218 jours). Vérifiez qu'un accord collectif encadre ce dispositif." },
                ].map((item) => (
                  <div key={item.type} className="p-4 bg-white border border-border-soft rounded-xl space-y-1">
                    <p className="font-semibold text-text-primary text-sm">{item.type}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="clauses" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Les clauses à surveiller</h2>
              <div className="space-y-2">
                {[
                  {
                    nom: "Clause de non-concurrence",
                    eval: "point_sensible",
                    desc: "Interdit d'exercer une activité concurrente après la rupture du contrat. Pour être valable, elle doit être limitée dans le temps, dans l'espace et dans le secteur, et prévoir une contrepartie financière. Son absence de contrepartie la rend nulle."
                  },
                  {
                    nom: "Clause de mobilité",
                    eval: "a_surveiller",
                    desc: "Vous oblige à accepter une mutation géographique. Vérifiez la zone géographique couverte et le délai de prévenance. Une clause trop large peut être contestée."
                  },
                  {
                    nom: "Clause d'exclusivité",
                    eval: "a_surveiller",
                    desc: "Interdit tout autre activité professionnelle. Elle peut être légitime mais doit être justifiée par la nature du poste."
                  },
                  {
                    nom: "Clause de dédit-formation",
                    eval: "a_surveiller",
                    desc: "Vous oblige à rembourser le coût d'une formation si vous partez avant un certain délai. Vérifiez le montant et la durée d'engagement."
                  },
                  {
                    nom: "Clause de confidentialité",
                    eval: "normale",
                    desc: "Interdit de divulguer des informations confidentielles de l'entreprise. Généralement normale et légitime."
                  },
                ].map((item) => (
                  <div key={item.nom} className="p-4 bg-white border border-border-soft rounded-xl space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-text-primary text-sm">{item.nom}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                        item.eval === 'point_sensible' ? 'bg-red-100 text-red-700' :
                        item.eval === 'a_surveiller' ? 'bg-amber-100 text-amber-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {item.eval === 'point_sensible' ? 'point sensible' : item.eval === 'a_surveiller' ? 'à surveiller' : 'normale'}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="absentes" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Ce qui devrait être dans le contrat</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Certaines informations sont parfois absentes du contrat mais importantes à connaître avant de signer.
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                {[
                  "La convention collective applicable — elle détermine vos droits sur le salaire minimum, les congés, le préavis et bien d'autres points.",
                  "La classification ou le coefficient — votre niveau dans la grille de la convention collective.",
                  "Le lieu de travail habituel et les conditions de télétravail si applicables.",
                  "La durée du préavis en cas de démission ou de licenciement.",
                  "Les annexes mentionnées mais non jointes : fiche de poste, plan de commissionnement, règlement intérieur.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-amber-500 flex-shrink-0">⚠</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="questions" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Les questions à poser avant de signer</h2>
              <div className="space-y-2">
                {[
                  "Quelle est la convention collective applicable à mon poste ?",
                  "Quel est mon coefficient ou ma classification dans cette convention ?",
                  "La clause de non-concurrence prévoit-elle bien une contrepartie financière ?",
                  "Quelle est la zone géographique exacte couverte par la clause de mobilité ?",
                  "Y a-t-il des objectifs variables définis quelque part ? Dans quel document ?",
                  "Quelles sont les conditions de renouvellement de la période d'essai ?",
                ].map((q, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-white border border-border-soft rounded-xl">
                    <span className="text-terracotta flex-shrink-0">→</span>
                    <span className="text-sm text-text-secondary italic">"{q}"</span>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                📋 <strong>Ressources gratuites :</strong> en cas de doute sérieux avant signature, vous pouvez consulter le <strong>Code du travail numérique</strong> (codetravail.fr), contacter la <strong>DREETS</strong> de votre région, ou consulter un <strong>Point-Justice</strong> gratuitement.
              </div>
            </section>

            <div className="bg-terracotta/5 border border-terracotta/20 rounded-2xl p-6 space-y-4 text-center">
              <p className="text-base font-semibold text-text-primary">Vous avez reçu un contrat de travail et vous ne comprenez pas certaines clauses ?</p>
              <p className="text-sm text-text-secondary">
                Uploadez votre contrat sur Lisible et recevez une analyse complète : type de contrat, clauses importantes, points sensibles et questions à poser avant de signer.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 bg-terracotta text-white font-semibold px-6 py-3 rounded-xl hover:bg-terracotta/90 transition-colors text-sm">
                Analyser mon contrat de travail — 1,99 €
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
