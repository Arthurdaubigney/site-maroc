# site-maroc

Site de Florian Messeau, antiquaire et expert en objets d'art au Maroc. Site statique multi-pages pensé pour le
référencement : HTML5 + Tailwind CSS v4, généré par un petit script Node, déployé sur Vercel.

## Développement

```bash
npm install
npm run build   # genere src/tokens.css puis les 34 pages dans dist/
npm run dev     # build + serveur local sur dist/
```

## Architecture

| Fichier | Rôle |
|---|---|
| `src/site/config.mjs` | **Toutes les informations à remplacer** : domaine, coordonnées, horaires, formulaire Tally, photos |
| `src/site/content/objets.mjs` | Les 15 catégories d'objets recherchés (une page chacune) |
| `src/site/content/services.mjs` | Les 4 services (estimation, expertise, achat, successions) |
| `src/site/content/villes.mjs` | Les 6 pages ville (Marrakech, Casablanca, Rabat, Tanger, Fès, Agadir) |
| `src/site/pages.mjs` | Accueil, présentation, pages hub, contact, pages légales, 404 |
| `src/site/layout.mjs` | `<head>` SEO, header, fil d'Ariane, pied de page, composants |
| `scripts/build.mjs` | Génère les pages, `sitemap.xml`, `robots.txt` et `llms.txt` |
| `design-tokens.json` | Source unique des couleurs, rayons, ombres et durées (clair et sombre) |

Plan du site généré :

```
/                                   Accueil
/presentation                       Florian Messeau
/expertise-achat                    + 4 services
/objets-recherches                  + 15 catégories
/zones-intervention                 + 6 villes
/contact                            Formulaire Tally (a brancher)
/mentions-legales, /confidentialite, /404
```

Chaque page a son titre, sa description, son URL canonique, son fil d'Ariane (visible et en JSON-LD
`BreadcrumbList`) et ses données structurées (`AntiqueStore`, `Person`, `Service`, `ItemList`).

## Déploiement Vercel

Importer le dépôt dans Vercel : `vercel.json` fixe la commande de build et le dossier publié (`dist/`), avec des
URL propres (`/objets-recherches/tapis`). Seul `dist/` est servi.

## Avant la mise en ligne

Tout se règle dans `src/site/config.mjs`, sauf mention contraire :

1. **Domaine** (`url`), **téléphone** (conservé en secours), adresse facultative, `geo`, `sameAs`. Pas de WhatsApp, d'e-mail ni d'horaires : tout contact passe par le formulaire Tally.
2. **Formulaire Tally** : renseigner `tallyFormId`. L'iframe et le script Tally sont alors générés sur `/contact`.
3. **Photos** (`IMAGES`) : tous les emplacements sont vides (cadre « Photo à venir »). Chaque clé décrit la photo
   attendue ; déposer le fichier dans `public/images/` et remplacer `null` par `'/images/nom-du-fichier.jpg'`.
   Photos de Florian : `florian-hero`, `florian-portrait`, `florian-loupe`, `florian-visite` (vraies photos uniquement).
   Villes : `ville-marrakech`, `ville-casablanca`, `ville-rabat`, `ville-tanger`, `ville-fes`, `ville-agadir`.
4. **Métier** : Florian rachète auprès des particuliers et ne revend pas au public ; l'authenticité repose sur les
   documents apportés par le client. Le mot « débarras » n'est pas utilisé.
5. **Parcours de Florian Messeau** : rédigé sans dates ni références précises (« quelques années dans le métier ») ; à enrichir si des éléments vérifiables deviennent disponibles.
6. **Choix éditoriaux** : aucun délai chiffré (« réponse rapide ») et aucune mention de paiement. La page Vins et spiritueux est centrée sur l'estimation, sans engagement de rachat.
7. **Mentions légales et confidentialité** : RC, ICE, IF, numéro CNDP (loi 09-08), durée de conservation.
