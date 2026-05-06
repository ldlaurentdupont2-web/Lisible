import Head from 'next/head'
import Link from 'next/link'

export default function CGV() {
  return (
    <>
      <Head>
        <title>Conditions générales de vente — Lisible</title>
        <meta name="description" content="Conditions générales de vente du service Lisible.eu" />
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
          <h1 className="text-2xl font-bold text-text-primary">Conditions générales de vente</h1>
          <p className="text-xs text-text-secondary">Dernière mise à jour : mai 2025</p>

          <section className="space-y-3">
            <h2 className="font-semibold text-text-primary">1. Objet</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Les présentes conditions régissent l'utilisation du service Lisible, accessible sur lisible.eu. Lisible est un service d'aide à la compréhension de documents administratifs, juridiques et contractuels français, généré par intelligence artificielle.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-text-primary">2. Service proposé</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              L'utilisateur soumet un document (photo, PDF ou texte) et reçoit une analyse structurée en langage simple. L'analyse est générée par le modèle Claude (Anthropic) via des prompts spécialisés par type de document.<br /><br />
              Lisible fournit une aide à la compréhension, pas un conseil juridique, administratif ou fiscal. L'analyse ne remplace pas l'avis d'un professionnel qualifié.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-text-primary">3. Prix et paiement</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Le prix est de <strong className="text-text-primary">1,99 € TTC</strong> par analyse (prix de lancement).<br /><br />
              Le paiement est effectué en une seule fois, avant la génération de l'analyse, via Stripe. Aucun abonnement, aucune reconduction automatique.<br /><br />
              Le paiement est sécurisé par Stripe Inc. Lisible ne conserve aucune donnée bancaire.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-text-primary">4. Droit de rétractation</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux contenus numériques dont l'exécution a commencé avec l'accord préalable du consommateur.<br /><br />
              En validant le paiement, l'utilisateur accepte expressément que l'analyse soit générée immédiatement et renonce à son droit de rétractation.<br /><br />
              En cas de problème technique empêchant la génération de l'analyse, contactez-nous à <a href="mailto:contact@lisible.eu" className="text-terracotta hover:underline">contact@lisible.eu</a> pour un remboursement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-text-primary">5. Données et confidentialité</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Les documents soumis sont transmis à l'API Anthropic pour traitement et ne sont pas conservés après génération de l'analyse. Nous vous recommandons de masquer les informations personnelles non nécessaires (nom, adresse, numéro de sécurité sociale, coordonnées bancaires) avant soumission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-text-primary">6. Limitation de responsabilité</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Lisible ne peut être tenu responsable des décisions prises par l'utilisateur sur la base des analyses fournies. Les analyses sont indicatives et peuvent comporter des inexactitudes selon la qualité du document soumis.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-text-primary">7. Contact</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Pour toute question : <a href="mailto:contact@lisible.eu" className="text-terracotta hover:underline">contact@lisible.eu</a>
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
