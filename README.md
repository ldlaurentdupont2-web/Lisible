# Lisible

Application d'aide à la compréhension de documents français en langage clair.

## Stack

- **Framework** : Next.js 14 (Pages Router)
- **IA** : Anthropic Claude Sonnet via API route
- **Style** : Tailwind CSS + Plus Jakarta Sans
- **Hébergement** : Vercel
- **Paiement** : Stripe (à intégrer)

## Catégories disponibles

| Catégorie | Prix | Code prompt |
|-----------|------|-------------|
| Courrier administratif | 3,90 € | `administratif` |
| Bulletin de paie | 3,90 € | `paie` |
| Bail locatif | 5,90 € | `bail` |
| Contrat de travail | 5,90 € | `contrat` |
| Courrier d'huissier | 7,90 € | `huissier` |

## Codes d'accès gratuits

`ADMIN`, `INVITE`, `TEST`

## Installation locale

```bash
npm install
cp .env.local.example .env.local
# Ajoutez votre ANTHROPIC_API_KEY dans .env.local
npm run dev
```

## Déploiement Vercel

1. Poussez le code sur GitHub (`ldlaurentdupont2-web/lisible`)
2. Sur [vercel.com](https://vercel.com), importez le dépôt
3. Ajoutez la variable d'environnement : `ANTHROPIC_API_KEY=sk-ant-...`
4. Déployez

## Structure

```
lisible/
├── pages/
│   ├── _app.js          # App wrapper
│   ├── index.js         # Page principale (toute l'UI)
│   └── api/
│       └── analyze.js   # Route API → Anthropic
├── lib/
│   └── prompts.js       # 5 system prompts + config catégories
├── styles/
│   └── globals.css      # Tailwind + variables
├── vercel.json
└── package.json
```

## Intégration Stripe (prochaine étape)

Remplacer le bouton "Payer" dans `pages/index.js` (step PAYMENT) par :
1. Une route `/api/create-checkout-session.js` qui crée une session Stripe
2. `@stripe/stripe-js` côté client pour rediriger
3. Un webhook `/api/stripe-webhook.js` pour valider le paiement et déclencher l'analyse

## Fonctionnalités v1

- [x] 5 catégories avec prompts dédiés
- [x] Tunnel : accueil → upload → paiement → analyse → résultat
- [x] Codes d'accès gratuits
- [x] Question de suivi gratuite incluse
- [x] Analyse contextuelle du texte collé
- [x] Formatage intelligent du résultat
- [x] Impression du résultat
- [x] Identité visuelle beige/terracotta + Plus Jakarta Sans
- [ ] Upload PDF/image (à ajouter)
- [ ] Stripe réel (placeholder inclus)
- [ ] Auth Clerk (optionnel)
