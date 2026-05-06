import Head from 'next/head'
import Link from 'next/link'

export default function APropos() {
  return (
    <>
      <Head>
        <title>À propos — Lisible</title>
        <meta name="description" content="Lisible, c'est quoi ? Pourquoi ce service existe et comment il fonctionne." />
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

        <main className="max-w-2xl mx-auto px-4 py-10 space-y-10">

          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-text-primary">À propos de Lisible</h1>
            <p className="text-base text-text-secondary leading-relaxed">
              Lisible est né d'un constat simple : recevoir un courrier de la CAF, un acte d'huissier ou un contrat de travail peut être source d'angoisse, non pas parce que la situation est forcément grave, mais parce qu'on ne comprend pas ce qui est écrit.
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              Le jargon administratif et juridique français est dense, les délais sont souvent flous, et les options disponibles rarement expliquées. Résultat : beaucoup de personnes attendent, s'inquiètent, ou prennent de mauvaises décisions faute d'information claire.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-border-soft p-6 space-y-3">
            <h2 className="font-bold text-text-primary text-lg">Ce que fait Lisible</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Vous uploadez votre document — courrier administratif, bulletin de paie, bail locatif, contrat de travail ou courrier d'huissier. En quelques secondes, vous recevez une explication structurée en langage simple : ce que ça veut dire, ce que vous devez faire, les délais à respecter, les questions à poser, et les ressources gratuites disponibles.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Lisible ne remplace pas un avocat, un service RH ou une administration. Il vous aide à comprendre ce que vous avez reçu pour que vous puissiez agir de façon informée.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-bold text-text-primary text-lg">Comment ça fonctionne</h2>
            <div className="space-y-3">
              {[
                { emoji: '📄', titre: 'Vous déposez votre document', detail: 'Photo, PDF ou texte collé. Nous vous recommandons de masquer vos informations personnelles non nécessaires.' },
                { emoji: '🤖', titre: 'L\'IA analyse le document', detail: 'Votre document est traité par Claude (Anthropic), avec des instructions spécialisées par type de document. Il n\'est pas conservé après analyse.' },
                { emoji: '📋', titre: 'Vous recevez une analyse claire', detail: 'Résumé en clair, points importants, délais, actions possibles, ressources utiles — et un PDF téléchargeable.' },
              ].map((step) => (
                <div key={step.titre} className="flex gap-4 p-4 bg-white rounded-xl border border-border-soft">
                  <span className="text-2xl flex-shrink-0">{step.emoji}</span>
                  <div>
                    <p className="font-semibold text-text-primary text-sm">{step.titre}</p>
                    <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-terracotta/5 border border-terracotta/20 rounded-2xl p-6 space-y-3">
            <h2 className="font-bold text-text-primary text-lg">Une question ? Un problème ?</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Pour toute question technique, problème de paiement ou demande liée à vos données, écrivez-nous à{' '}
              <a href="mailto:contact@lisible.eu" className="text-terracotta hover:underline font-medium">contact@lisible.eu</a>.
              Nous répondons sous 48h.
            </p>
          </div>

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
