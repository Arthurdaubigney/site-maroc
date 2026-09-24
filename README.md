# site-maroc

Site vitrine d'antiquaire et expert en objets d'art au Maroc : HTML5 + Tailwind CSS v4, déployé sur Vercel.

## Développement

```bash
npm install
npm run build   # genere src/tokens.css puis assemble dist/
npm run dev     # build + serveur local sur dist/
```

- `index.html` : page d'accueil. `mentions-legales.html`, `confidentialite.html` : pages légales.
- `design-tokens.json` : **source unique** des couleurs, rayons, ombres et durées (clair et sombre).
  `scripts/build-tokens.mjs` en génère `src/tokens.css` ; ne pas éditer ce fichier à la main.
- `src/styles.css` : point d'entrée Tailwind (utilitaires sémantiques : `bg-page`, `text-ink`, `btn-primary`...).
- `assets/js/main.js` : menu mobile, repli des photos, année du pied de page.
- `public/` : favicon, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `llms.txt`.

## Déploiement Vercel

Importer le dépôt dans Vercel : `vercel.json` fixe la commande de build (`npm run build`) et le dossier publié
(`dist/`). Seul `dist/` est servi ; `.claude/`, `src/` et `scripts/` ne sont jamais exposés.

## Avant la mise en ligne

Rechercher `A REMPLACER`, `A CONFIRMER` et `PHOTO COMMERCIAL` dans le code :

1. **Florian Messeau** : parcours réel à compléter dans la section « L'antiquaire », portrait à fournir.
2. **Domaine** : `https://site-maroc.vercel.app` (canonical, OpenGraph, JSON-LD, `robots.txt`, `sitemap.xml`).
3. **Coordonnées (NAP)** : téléphone, WhatsApp, e-mail, adresse, horaires. Identiques dans le header,
   le formulaire, le pied de page, le JSON-LD et la fiche Google Business Profile. Ajouter `geo` et `sameAs` au JSON-LD.
4. **Photos** : 9 emplacements `PHOTO COMMERCIAL` avec les formats exacts. Mettre à jour le `alt` de chaque photo.
   Les visuels Unsplash actuels sont provisoires ; si l'un ne charge pas, le cadre affiche « Photo à venir ».
5. **Formulaire Tally** : suivre le commentaire de la section `#estimation` (identifiant `TALLY_FORM_ID`,
   attribut `data-tally-pending` à renommer en `data-tally-src`). En attendant, la section propose WhatsApp et e-mail.
6. **Engagements commerciaux** à valider : délai de réponse (48 h), modes de paiement, véhicule banalisé, certificat.
7. **Mentions légales et confidentialité** : RC, ICE, IF, numéro CNDP (loi 09-08), durée de conservation.
