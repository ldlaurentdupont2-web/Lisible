import Head from 'next/head'
import Link from 'next/link'

export default function MentionsLegales() {
  return (
    <>
      <Head>
        <title>Mentions légales — Lisible</title>
        <meta name="description" content="Mentions légales du site Lisible.eu" />
        <meta name="robots" content="noindex" />
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
          <h1 className="text-2xl font-bold text-text-primary">Mentions légales</h1>

          <section className="space-y-3">
            <h2 className="font-semibold text-text-primary">Éditeur du site</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Le site lisible.eu est édité par une micro-entreprise en cours d'immatriculation.<br />
              Contact : <a href="mailto:contact@lisible.eu" className="text-terracotta hover:underline">contact@lisible.eu</a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-text-primary">Hébergement</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Le site est hébergé par Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis.<br />
              Site : <a href="https://vercel.com" className="text-terracotta hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-text-primary">Propriété intellectuelle</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              L'ensemble des contenus présents sur lisible.eu (textes, interfaces, prompts, structure) est la propriété exclusive de l'éditeur. Toute reproduction, même partielle, est interdite sans autorisation préalable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-text-primary">Données personnelles</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Les documents soumis à l'analyse sont transmis à l'API Anthropic (Claude) pour traitement et supprimés immédiatement après génération de l'analyse. Aucune donnée personnelle n'est conservée sur nos serveurs.<br /><br />
              Les paiements sont traités par Stripe Inc. Lisible ne conserve aucune donnée bancaire.<br /><br />
              Pour toute demande relative à vos données : <a href="mailto:contact@lisible.eu" className="text-terracotta hover:underline">contact@lisible.eu</a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-text-primary">Cookies</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Lisible n'utilise pas de cookies publicitaires ou de tracking. Des cookies techniques strictement nécessaires au fonctionnement du service peuvent être utilisés.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-text-primary">Limitation de responsabilité</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Les analyses produites par Lisible sont fournies à titre informatif uniquement. Elles ne constituent pas un conseil juridique, administratif, fiscal ou social. En cas de doute, consultez un professionnel qualifié.
            </p>
          </section>
        </main>

        <footer className="border-t border-border-soft py-8 mt-8">
          <div className="max-w-2xl mx-auto px-4 text-center space-y-2">
            <div className="flex justify-center gap-6 text-xs text-text-secondary">
              <Link href="/mentions-legales" className="hover:text-terracotta transition-colors">Mentions légales</Link>
              <Link href="/cgv" className="hover:text-terracotta transition-colors">CGV</Link>
              <Link href="/a-propos" className="hover:text-terracotta transition-colors">À propos</Link>
            </div>
            <p className="text-xs text-text-secondary">© 2025 Lisible</p>
          </div>
        </footer>
      </div>
    </>
  )
}
