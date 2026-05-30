import Head from 'next/head'
import Link from 'next/link'

const articles = [
  {
    slug: "trop-percu-caf",
    emoji: "🏛️",
    categorie: "Courrier administratif",
    titre: "Trop-perçu CAF : que faire quand vous recevez cette lettre ?",
    description: "Ce que ça veut dire, vos options, les erreurs à éviter et où trouver de l'aide gratuitement.",
    date: "7 mai 2025",
  },
  {
    slug: "bulletin-de-paie",
    emoji: "💼",
    categorie: "Bulletin de paie",
    titre: "Bulletin de paie : comment le lire et quoi vérifier en 5 minutes",
    description: "Les lignes principales expliquées, le ratio brut/net, les anomalies fréquentes et les questions à poser à vos RH.",
    date: "14 mai 2025",
  },
  {
    slug: "bail-locatif",
    emoji: "🏠",
    categorie: "Bail locatif",
    titre: "Bail locatif : les clauses à vérifier avant de signer",
    description: "Loyer, charges, dépôt de garantie, préavis, clauses abusives : tout ce qu'il faut vérifier.",
    date: "14 mai 2025",
  },
  {
    slug: "contrat-de-travail",
    emoji: "📋",
    categorie: "Contrat de travail",
    titre: "Contrat de travail : ce qu'il faut vérifier avant de signer",
    description: "Période d'essai, salaire, clause de non-concurrence, mobilité et préavis : les points essentiels.",
    date: "14 mai 2025",
  },
  {
    slug: "courrier-huissier",
    emoji: "⚖️",
    categorie: "Courrier d'huissier",
    titre: "Courrier d'huissier : que faire quand vous en recevez un ?",
    description: "Commandement de payer, saisie, assignation : comprendre l'acte, les délais et où trouver de l'aide.",
    date: "14 mai 2025",
  },
]

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog Lisible — Guides pratiques sur vos documents administratifs</title>
        <meta name="description" content="Guides pratiques pour comprendre vos documents administratifs : courriers CAF, bulletins de paie, baux locatifs, contrats de travail, courriers d'huissier." />
        <link rel="canonical" href="https://lisible.eu/blog" />
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

        <main className="max-w-2xl mx-auto px-4 py-10 space-y-8">
          <header className="space-y-2">
            <h1 className="text-2xl font-bold text-text-primary">Guides pratiques</h1>
            <p className="text-sm text-text-secondary leading-relaxed">
              Des explications claires sur vos documents administratifs, juridiques et contractuels — pour comprendre ce que vous avez reçu et savoir quoi faire.
            </p>
          </header>

          <div className="space-y-3">
            {articles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="flex items-start gap-4 bg-white border border-border-soft rounded-2xl p-5 hover:border-terracotta/30 hover:shadow-sm transition-all group">
                <span className="text-2xl flex-shrink-0">{article.emoji}</span>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-terracotta font-medium">{article.categorie}</span>
                    <span className="text-xs text-text-secondary">· {article.date}</span>
                  </div>
                  <p className="text-sm font-semibold text-text-primary group-hover:text-terracotta transition-colors leading-snug">
                    {article.titre}
                  </p>
                  <p className="text-xs text-text-secondary leading-relaxed">{article.description}</p>
                </div>
                <span className="text-terracotta flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1">→</span>
              </Link>
            ))}
          </div>

          <div className="bg-terracotta/5 border border-terracotta/20 rounded-2xl p-6 space-y-3 text-center">
            <p className="text-sm font-semibold text-text-primary">Vous avez un document à analyser ?</p>
            <p className="text-xs text-text-secondary">Uploadez-le sur Lisible et recevez une explication claire en quelques secondes.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-terracotta text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-terracotta/90 transition-colors text-sm">
              Analyser un document — 1,99 €
            </Link>
          </div>
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
