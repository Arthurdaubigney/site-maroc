# site-maroc

Site de François Secula, antiquaire et expert en objets d'art au Maroc. Site statique multi-pages pensé pour le
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
| `src/site/content/objets.mjs` | Les 20 catégories d'objets recherchés (une page chacune) |
| `src/site/content/services.mjs` | Les 4 services (estimation, expertise, achat, successions) |
| `src/site/content/villes.mjs` | Les 6 pages ville (Marrakech, Casablanca, Rabat, Tanger, Fès, Agadir) |
| `src/site/pages.mjs` | Accueil, présentation, pages hub, contact, pages légales, 404 |
| `src/site/layout.mjs` | `<head>` SEO, header, fil d'Ariane, pied de page, composants |
| `scripts/build.mjs` | Génère les pages, `sitemap.xml`, `robots.txt` et `llms.txt` |
| `design-tokens.json` | Source unique des couleurs, rayons, ombres et durées (clair et sombre) |

Plan du site généré :

```
/                                   Accueil
/presentation                       François Secula
/expertise-achat                    + 4 services
/objets-recherches                  + 20 catégories
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

1. **Domaine** (`url`), `geo`, `sameAs`. Téléphone (06 58 59 66 73) et bureaux (42 Q.I Sidi Ghanem 158, 40000 Marrakech) renseignés. Pas de WhatsApp ni d'horaires ; l'e-mail (`SITE.editeur.email`) n'apparaît que dans les mentions légales et la politique de confidentialité : le contact principal passe par le formulaire Tally.
2. **Formulaire Tally** : renseigner `tallyFormId`. L'iframe et le script Tally sont alors générés sur `/contact`.
3. **Photos** (`IMAGES`) : les 6 photos de Florian sont en place (`public/images/`, WebP 896 px + variante 448 px,
   image de partage `antiquaire-maroc-og.jpg`). Les autres catégories, la page Successions, Marrakech et Casablanca
   utilisent des photos libres de droits (CC0 : The Met, Cleveland Museum of Art, WordPress Photo Directory ;
   crédits dans les mentions légales), en WebP 1200 px + variante 600 px (map `LIBRES`).
   Photos fournies par le client (map `FOURNIES`) : briquets et stylos, Rabat, Tanger, Fès, Agadir.
   Tous les emplacements photo sont remplis.
   Pour en ajouter une : déposer le fichier dans `public/images/` et remplacer `null` par `'/images/nom-du-fichier.webp'`.
4. **Nom** : le site est au nom de **François Secula** (directeur). Les photos montrent **Florian**, expert de l'équipe : il est toujours nommé par son prénom dans les textes alternatifs et légendes, jamais présenté comme François Secula. Le nom de famille de Florian n'apparaît plus.
5. **Métier** : François Secula rachète auprès des particuliers et ne revend pas au public ; l'authenticité repose sur les
   documents apportés par le client. Le mot « débarras » n'est pas utilisé.
6. **Parcours de François Secula** : rédigé sans dates ni références précises (« quelques années dans le métier ») ; à enrichir si des éléments vérifiables deviennent disponibles.
7. **Choix éditoriaux** : aucun délai chiffré (« réponse rapide »), aucune mention de paiement, de tarif ni de devis, et aucune promesse sur les frais (l'enlèvement et le transport sont « organisés », jamais « pris en charge »). Seuls l'estimation et le déplacement sont annoncés gratuits (« Déplacement gratuit et expertise rapide », demande du client, octobre 2026) : le reste se précise après le formulaire. La page Vins et spiritueux est centrée sur l'estimation, sans engagement de rachat. Positionnement : « antiquaire français installé au Maroc », présent dans tout le Maroc (jamais « antiquaire à Marrakech » seul) ; l'âme marocaine passe par le motif zellige (`.zellige`, `.zellige-frieze`) et les cadres en arc (`.arch`, token `radius.arch`).
8. **Page /merci et conversion Google Ads** : `/merci` n'apparaît ni dans le menu, ni dans le sitemap, ni dans Google
   (noindex), mais s'ouvre directement. La conversion n'est comptée qu'après un envoi réel du formulaire (formulaire
   intégré, ou redirection de fin réglée dans Tally vers `/merci`), une seule fois : un rechargement ou une visite
   directe ne comptent pas. Pour l'activer : renseigner `googleAds.id` (`AW-...`) et `googleAds.conversionLabel`.
   Avec Google Tag Manager : déclencheur sur l'événement `formulaire_envoye`.
9. **Mentions légales et confidentialité** : éditeur = François Secula, entrepreneur individuel actif (SIREN 529 601 486, `SITE.editeur` dans `config.mjs`) ; ne jamais reprendre l'ancienne entreprise SIREN 517 211 017, radiée en 2009. Par ailleurs, les champs inconnus (raison sociale, RC, ICE, IF, patente, numéro CNDP, durée de conservation chiffrée) ne sont pas affichés ; les ajouter dans `src/site/pages.mjs` s'ils deviennent disponibles.
