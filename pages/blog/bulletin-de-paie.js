import Head from 'next/head'
import Link from 'next/link'

export default function BulletinDePaie() {
  return (
    <>
      <Head>
        <title>Bulletin de paie : comment le lire et quoi vérifier en 5 minutes</title>
        <meta name="description" content="Vous ne comprenez pas votre bulletin de paie ? On vous explique les lignes principales, ce qu'il faut vérifier et les questions à poser à vos RH." />
        <link rel="canonical" href="https://lisible.eu/blog/bulletin-de-paie" />
        <meta property="og:title" content="Bulletin de paie : comment le lire et quoi vérifier en 5 minutes" />
        <meta property="og:description" content="Vous ne comprenez pas votre bulletin de paie ? On vous explique les lignes principales, ce qu'il faut vérifier et les questions à poser à vos RH." />
        <meta property="og:url" content="https://lisible.eu/blog/bulletin-de-paie" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Bulletin de paie : comment le lire et quoi vérifier en 5 minutes",
          "description": "Vous ne comprenez pas votre bulletin de paie ? On vous explique les lignes principales, ce qu'il faut vérifier et les questions à poser à vos RH.",
          "url": "https://lisible.eu/blog/bulletin-de-paie",
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
            <span>Bulletin de paie</span>
          </nav>

          <article className="space-y-8">
            <header className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta text-xs font-medium px-3 py-1 rounded-full">
                💼 Bulletin de paie
              </div>
              <h1 className="text-2xl font-bold text-text-primary leading-snug">
                Bulletin de paie : comment le lire et quoi vérifier en 5 minutes
              </h1>
              <p className="text-base text-text-secondary leading-relaxed">
                Chaque mois vous recevez votre bulletin de paie, et chaque mois vous le rangez sans vraiment le lire. Pourtant, une erreur sur un bulletin de paie peut vous coûter de l'argent — ou vous en faire perdre sans que vous le sachiez. Voici les points essentiels à vérifier.
              </p>
            </header>

            <nav className="bg-white border border-border-soft rounded-2xl p-5 space-y-2">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Dans cet article</p>
              <ul className="space-y-1.5 text-sm">
                {[
                  ["#structure", "La structure d'un bulletin de paie"],
                  ["#montants", "Les 4 montants clés à connaître"],
                  ["#lignes", "Les lignes principales expliquées"],
                  ["#ratio", "Le ratio brut / net : est-ce normal ?"],
                  ["#verifier", "Ce qu'il faut vérifier chaque mois"],
                  ["#anomalies", "Les anomalies les plus fréquentes"],
                  ["#questions", "Les questions à poser à vos RH"],
                ].map(([href, label]) => (
                  <li key={href}><a href={href} className="text-terracotta hover:underline">{label}</a></li>
                ))}
              </ul>
            </nav>

            <section id="structure" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">La structure d'un bulletin de paie</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Un bulletin de paie français se lit de haut en bas et se divise en trois grandes parties :
              </p>
              <div className="space-y-2">
                {[
                  { titre: "En-tête", desc: "Informations sur l'employeur, le salarié, la période, le poste et la convention collective." },
                  { titre: "Corps du bulletin", desc: "Toutes les lignes de salaire, cotisations, primes, absences et avantages. C'est la partie la plus complexe." },
                  { titre: "Bas du bulletin", desc: "Les montants clés : net à payer, net imposable, net social, et parfois le cumul annuel." },
                ].map((item) => (
                  <div key={item.titre} className="flex gap-3 p-3 bg-white border border-border-soft rounded-xl">
                    <span className="text-terracotta font-semibold text-sm flex-shrink-0">{item.titre}</span>
                    <span className="text-sm text-text-secondary">{item.desc}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="montants" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Les 4 montants clés à connaître</h2>
              <div className="space-y-2">
                {[
                  { nom: "Salaire brut", def: "Votre salaire avant déduction des cotisations sociales. C'est le montant négocié dans votre contrat." },
                  { nom: "Net avant impôt", def: "Votre salaire après déduction des cotisations sociales, mais avant le prélèvement à la source. C'est le montant de référence pour comparer votre salaire net." },
                  { nom: "Net imposable", def: "La base sur laquelle est calculé votre impôt sur le revenu. Il peut différer du net avant impôt selon les avantages en nature ou les remboursements de frais." },
                  { nom: "Net à payer", def: "La somme réellement virée sur votre compte bancaire, après prélèvement à la source." },
                ].map((item) => (
                  <div key={item.nom} className="p-4 bg-white border border-border-soft rounded-xl space-y-1">
                    <p className="font-semibold text-text-primary text-sm">{item.nom}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.def}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="lignes" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Les lignes principales expliquées</h2>
              <div className="space-y-2">
                {[
                  { nom: "Salaire de base", exp: "Votre rémunération fixe mensuelle, calculée sur la base de votre temps de travail contractuel." },
                  { nom: "Heures supplémentaires", exp: "Les heures travaillées au-delà de la durée légale (35h), généralement majorées de 25% ou 50% selon la convention collective." },
                  { nom: "Cotisations salariales", exp: "Les charges que vous payez sur votre salaire : retraite, assurance maladie, chômage... Elles apparaissent en déduction du brut." },
                  { nom: "Mutuelle / prévoyance", exp: "La part salariale de votre complémentaire santé obligatoire. L'employeur prend en charge au moins 50% du total." },
                  { nom: "Prélèvement à la source", exp: "L'impôt sur le revenu prélevé directement sur votre salaire chaque mois. Le taux est visible sur votre bulletin." },
                  { nom: "Remboursement transport", exp: "L'employeur doit rembourser 50% de votre abonnement de transport en commun domicile-travail. Vérifiez qu'il apparaît bien." },
                  { nom: "Titres-restaurant", exp: "Si vous en bénéficiez, la part employeur apparaît comme un avantage, et votre part salariale en déduction." },
                ].map((item) => (
                  <div key={item.nom} className="flex gap-3 p-3 bg-white border border-border-soft rounded-xl">
                    <span className="text-terracotta font-semibold text-sm flex-shrink-0 w-40">{item.nom}</span>
                    <span className="text-sm text-text-secondary leading-relaxed">{item.exp}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="ratio" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Le ratio brut / net : est-ce normal ?</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                En France, le net avant impôt représente en général entre <strong className="text-text-primary">75% et 80%</strong> du salaire brut pour un salarié du secteur privé. Ce ratio varie selon votre statut.
              </p>
              <div className="space-y-2">
                {[
                  { statut: "Non-cadre", ratio: "~78-80% du brut" },
                  { statut: "Cadre", ratio: "~75-77% du brut (cotisations plus élevées)" },
                  { statut: "Temps partiel", ratio: "Peut varier selon les cotisations minimales" },
                ].map((item) => (
                  <div key={item.statut} className="flex justify-between items-center p-3 bg-white border border-border-soft rounded-xl">
                    <span className="text-sm font-medium text-text-primary">{item.statut}</span>
                    <span className="text-sm text-terracotta font-semibold">{item.ratio}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                💡 Si votre ratio est inférieur à 70%, cela mérite vérification — une cotisation inhabituelle ou une erreur peut en être la cause.
              </div>
            </section>

            <section id="verifier" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Ce qu'il faut vérifier chaque mois</h2>
              <ul className="space-y-2 text-sm text-text-secondary">
                {[
                  "Votre nom, prénom et numéro de sécurité sociale sont-ils corrects ?",
                  "La période de paie correspond-elle bien au mois concerné ?",
                  "Le salaire brut correspond-il à votre contrat ou à la dernière augmentation convenue ?",
                  "Les heures supplémentaires effectuées apparaissent-elles bien ?",
                  "Le remboursement transport est-il présent si vous avez un abonnement ?",
                  "Le taux de prélèvement à la source est-il celui que vous avez déclaré aux impôts ?",
                  "Y a-t-il des lignes inhabituelles que vous ne reconnaissez pas ?",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-terracotta flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="anomalies" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Les anomalies les plus fréquentes</h2>
              <ul className="space-y-2 text-sm text-text-secondary">
                {[
                  "Oubli du remboursement transport alors que vous avez un abonnement",
                  "Heures supplémentaires non majorées ou absentes",
                  "Mutuelle prélevée deux fois suite à un changement de contrat",
                  "Taux de prélèvement à la source incorrect après un changement de situation",
                  "Prime ou augmentation convenue verbalement non répercutée",
                  "Absence déduite en trop ou en moins suite à un arrêt maladie",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-amber-500 flex-shrink-0">⚠</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                📋 <strong>Important :</strong> une anomalie ne signifie pas forcément une erreur. Certaines lignes dépendent de votre convention collective ou d'un accord d'entreprise que vous ne connaissez peut-être pas. En cas de doute, la première étape est toujours de demander une explication à votre service RH.
              </div>
            </section>

            <section id="questions" className="space-y-3">
              <h2 className="text-xl font-bold text-text-primary">Les questions à poser à vos RH</h2>
              <div className="space-y-2">
                {[
                  "Pouvez-vous m'expliquer la ligne X de mon bulletin ?",
                  "Pourquoi mon net avant impôt a-t-il baissé par rapport au mois dernier ?",
                  "Mon remboursement transport n'apparaît pas ce mois-ci, est-ce normal ?",
                  "Quelle est la convention collective applicable à mon poste ?",
                  "Comment puis-je modifier mon taux de prélèvement à la source ?",
                ].map((q, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-white border border-border-soft rounded-xl">
                    <span className="text-terracotta flex-shrink-0">→</span>
                    <span className="text-sm text-text-secondary italic">"{q}"</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-terracotta/5 border border-terracotta/20 rounded-2xl p-6 space-y-4 text-center">
              <p className="text-base font-semibold text-text-primary">Vous avez reçu votre bulletin de paie et vous ne comprenez pas certaines lignes ?</p>
              <p className="text-sm text-text-secondary">
                Uploadez votre bulletin sur Lisible et recevez une explication ligne par ligne en quelques secondes, avec les points à vérifier et les questions à poser à vos RH.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 bg-terracotta text-white font-semibold px-6 py-3 rounded-xl hover:bg-terracotta/90 transition-colors text-sm">
                Analyser mon bulletin de paie — 1,99 €
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
