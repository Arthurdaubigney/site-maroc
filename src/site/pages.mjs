// Definition de toutes les pages du site. Chaque entree : path, title, description, trail, body, jsonld.
import { SITE, IMAGES } from './config.mjs';
import { OBJETS, bySlug } from './content/objets.mjs';
import { SERVICES } from './content/services.mjs';
import { VILLES } from './content/villes.mjs';
import {
  esc, abs, asset, icon, photo, card, sectionHead, eyebrow, faq, ctaBand, linkList, pageHero, businessId, expertId,
} from './layout.mjs';

const HOME = { name: 'Accueil', href: '/' };
const areaServed = { '@type': 'Country', name: 'Maroc' };

/* ---------- Donnees structurees de l'entreprise ---------- */
const businessNode = () => ({
  '@type': 'AntiqueStore',
  '@id': businessId,
  name: SITE.name,
  description: `${SITE.tagline}. Estimation, expertise rapide et rachat d'antiquités et d'objets d'art auprès des particuliers, avec déplacement gratuit dans tout le Maroc.`,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/favicon.svg`,
  ...(IMAGES.og ? { image: abs(IMAGES.og) } : {}),
  telephone: SITE.phone.e164,
  address: { '@type': 'PostalAddress', ...(SITE.address.street ? { streetAddress: SITE.address.street, postalCode: SITE.address.postalCode } : {}), addressLocality: SITE.address.city, addressCountry: SITE.address.country },
  ...(SITE.geo ? { geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng } } : {}),
  areaServed: [areaServed, ...VILLES.map((v) => ({ '@type': 'City', name: v.ville }))],
  founder: { '@id': expertId },
  knowsAbout: OBJETS.map((o) => o.nav),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services de François Secula, antiquaire',
    itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.nav, url: abs(`/expertise-achat/${s.slug}`) } })),
  },
  ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
});
const personNode = () => ({
  '@type': 'Person', '@id': expertId, name: SITE.expert.name, jobTitle: SITE.expert.jobTitle,
  worksFor: { '@id': businessId }, url: abs('/presentation'),
  knowsAbout: ['Antiquités', 'Expertise d\'objets d\'art', 'Art marocain ancien', 'Bijoux berbères', 'Peinture orientaliste', 'Mobilier ancien', 'Tapis berbères'],
  homeLocation: { '@type': 'Place', name: 'Marrakech, Maroc' },
});
const websiteNode = () => ({ '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.name, inLanguage: 'fr-MA', publisher: { '@id': businessId } });
const serviceNode = (name, path, description, area = areaServed) => ({
  '@type': 'Service', name, serviceType: name, description, url: abs(path), provider: { '@id': businessId }, areaServed: area,
});

/* ---------- Blocs partages ---------- */
// Deroulement en 3 etapes, sur bandeau rouge : grands chiffres or, une ligne chacun
const steps = () => `<ol class="grid gap-px overflow-hidden border border-on-deep-muted/20 bg-on-deep-muted/20 md:grid-cols-3">
  ${[
    ['camera', 'Envoyez des photos', 'Via le formulaire, en quelques minutes : vue d\'ensemble, signature, poinçons.'],
    ['search', 'Recevez un avis gratuit', 'François Secula vous répond rapidement, sans engagement.'],
    ['home', 'Rachat ou expertise chez vous', 'Il se déplace gratuitement partout au Maroc, au moment qui vous convient.'],
  ].map(([ic, t, d], i) => `<li class="flex flex-col gap-4 bg-deep p-8 lg:p-10">
    <span class="flex items-center justify-between"><span class="font-display text-6xl font-semibold leading-none text-ornament" aria-hidden="true">0${i + 1}</span>${icon(ic, 'size-7 text-on-deep-muted')}</span>
    <h3 class="text-xl leading-tight text-on-deep">${t}</h3>
    <p class="text-on-deep-muted">${d}</p>
  </li>`).join('\n  ')}
</ol>`;

// Engagements : une ligne chacun
const guarantees = (deep = false) => `<ul class="grid gap-x-8 gap-y-4 sm:grid-cols-2">
  ${[
    ['scale', 'Prix expliqué, jamais à la volée'],
    ['lock', 'Discrétion totale'],
    ['truck', 'Déplacement gratuit, enlèvement organisé'],
    ['shield-check', 'Aucune obligation de vendre'],
  ].map(([ic, t]) => `<li class="flex items-center gap-3 border-b ${deep ? 'border-on-deep-muted/20' : 'border-hairline'} pb-4 font-semibold">${icon(ic, `size-6 flex-none ${deep ? 'text-ornament' : 'text-accent'}`)}<span>${t}</span></li>`).join('\n  ')}
</ul>`;

const florianPhoto = (key = 'florian-portrait') => photo({
  key, w: 800, h: 1000, ratio: '4/5', sizes: '(min-width: 1024px) 38vw, 92vw',
  alt: 'Florian, expert de l\'équipe',
  note: 'Photo de Florian, expert de l\'équipe (vraie photo, jamais de banque d\'images)',
  fallback: 'Florian, expert de l\'équipe',
});

// Cartes photo (titre sous l'image). Objets : format carre ; villes : paysage 4:3.
const objetTile = (o, { level = 'h3' } = {}) => card({
  href: `/objets-recherches/${o.slug}`, title: o.nav, level,
  photoHtml: photo({ key: o.img.key, w: 600, h: 600, ratio: '1/1', alt: o.img.alt, note: o.img.note, fallback: o.img.fallback, sizes: '(min-width: 1024px) 22vw, 46vw' }),
});

const villeTile = (v, { level = 'h3' } = {}) => card({
  href: `/zones-intervention/${v.slug}`, title: `Antiquaire à ${v.ville}`, sub: `${v.quartiers.slice(0, 3).join(', ')}…`, level,
  photoHtml: photo({ key: v.photo.key, w: 800, h: 600, ratio: '4/3', alt: v.photo.alt, note: v.photo.note, fallback: v.ville, sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw' }),
});

const villesGrid = (level = 'h3') => `<div class="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
  ${VILLES.map((v) => villeTile(v, { level })).join('\n  ')}
</div>`;

const generalFaq = [
  ['Qui est François Secula ?', 'Un antiquaire et expert en objets d\'art qui intervient partout au Maroc. Depuis ses bureaux de Marrakech, cet acheteur d\'antiquités chez les particuliers estime, expertise et rachète objets anciens et objets d\'art dans tout le royaume.'],
  ['L\'estimation est-elle payante ?', 'Non. Le premier avis sur photos et l\'examen en vue d\'un achat sont gratuits et sans engagement.'],
  ['Le déplacement est-il payant ?', 'Non. François Secula se déplace gratuitement à votre domicile, partout au Maroc.'],
  // Pas de liens dans les reponses repliees : le maillage vers ces pages passe par les sections Objets et Zones.
  ['Quels objets achetez-vous ?', 'Bijoux berbères, tableaux orientalistes, argenterie, meubles anciens, pièces de monnaie, vases et verres en cristal, livres anciens, tapis, montres et bijoux, bronzes, manteaux de fourrure, sacs de marque, et bien d\'autres objets de collection.'],
  ['Vous déplacez-vous à domicile ?', `Oui, gratuitement, depuis Marrakech et partout au Maroc : ${VILLES.filter((v) => v.ville !== 'Marrakech').map((v) => v.ville).join(', ')} et ailleurs.`],
  ['Combien de temps faut-il pour avoir un avis ?', 'Peu de temps : l\'expertise est rapide. François Secula répond dès réception de photos exploitables.'],
  ['Mes informations restent-elles confidentielles ?', 'Oui. Vos photos et coordonnées servent uniquement à répondre à votre demande et ne sont jamais publiées ni transmises.'],
];

/* ---------- Accueil ---------- */
function home() {
  // Les familles d'objets mises en avant : celles que François Secula recherche le plus au Maroc
  const featured = ['bijoux-berberes', 'tableaux-tapisseries', 'vaisselle-verre-argenterie', 'mobilier-ancien-contemporain', 'pieces-de-monnaie', 'cristallerie', 'tapis', 'montres-bijoux'].map((s) => bySlug[s]);
  const body = `
<section aria-labelledby="hero-titre" class="on-deep zellige bg-deep text-on-deep">
  <div class="mx-auto grid max-w-7xl items-center gap-14 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-20">
    <div class="lg:col-span-7">
      ${eyebrow('Antiquaire · Partout au Maroc')}
      <h1 id="hero-titre" class="mt-6 max-w-[16ch] text-[2.5rem] leading-[1.05] sm:text-6xl xl:text-7xl">Antiquaire et expert en objets d'art partout au Maroc</h1>
      <p class="mt-7 max-w-[50ch] text-lg text-on-deep-muted sm:text-xl">François Secula, antiquaire et expert en objets d'art partout au Maroc, se déplace gratuitement chez vous pour estimer et racheter vos antiquités. Expertise rapide, avis gratuit sur photos.</p>
      <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href="/contact" class="btn btn-primary">Estimation gratuite ${icon('arrow-right', 'size-4')}</a>
        <a href="tel:${SITE.phone.e164}" class="btn btn-secondary">${icon('phone', 'size-4')} ${SITE.phone.display}</a>
      </div>
      <div class="mt-10 border-t border-on-deep-muted/20 pt-6">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-ornament">Présent dans tout le Maroc</p>
        <ul class="mt-4 flex flex-wrap gap-2" aria-label="Villes où François Secula se déplace">
          ${VILLES.map((v) => `<li><a href="/zones-intervention/${v.slug}" class="inline-flex min-h-8 items-center gap-1.5 rounded-pill border border-on-deep-muted/40 px-3.5 text-sm font-semibold text-on-deep no-underline transition-colors hover:border-ornament hover:text-ornament">${icon('map-pin', 'size-3.5 text-ornament')}${v.ville}</a></li>`).join('\n          ')}
        </ul>
      </div>
    </div>
    <div class="mx-auto w-full max-w-sm p-2.5 sm:max-w-md lg:col-span-5 lg:max-w-none">
      <div class="arch-frame">
        ${photo({ key: 'florian-portrait', w: 1067, h: 1334, ratio: '4/5', priority: true, sizes: '(min-width: 1024px) 38vw, (min-width: 640px) 448px, 92vw', alt: 'Florian, expert de l\'équipe, assis dans un fauteuil ancien parmi des antiquités', note: 'Photo de Florian, expert de l\'équipe (vraie photo)', fallback: 'Florian, expert de l\'équipe', frameClass: 'arch' })}
      </div>
      <p class="mt-6 text-center text-sm text-on-deep-muted">Florian, expert de l'équipe</p>
    </div>
  </div>
</section>

<section aria-label="Nos engagements" class="border-b border-hairline">
  <ul class="mx-auto grid max-w-7xl gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
    ${[
    ['truck', 'Déplacement gratuit', 'partout au Maroc'],
    ['clock', 'Expertise rapide', 'réponse sans attendre'],
    ['search', 'Avis gratuit', 'sur simples photos'],
    ['lock', 'Discrétion', 'aucune publicité sur vos biens'],
  ].map(([ic, t, d]) => `<li class="flex items-center gap-4 bg-page px-4 py-6 sm:px-6 lg:px-8">${icon(ic, 'size-7 flex-none text-accent')}<span class="min-w-0 [overflow-wrap:anywhere]"><strong class="block font-bold text-ink">${t}</strong><span class="text-sm text-muted">${d}</span></span></li>`).join('\n    ')}
  </ul>
</section>

<section aria-labelledby="zones-titre" class="py-20 lg:py-28">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    ${sectionHead({ kicker: 'Zones d\'intervention', title: 'De Tanger à Agadir, François Secula vient chez vous', id: 'zones-titre', link: { href: '/zones-intervention', label: 'Toutes les zones' }, lead: 'Ses bureaux sont à Marrakech, mais il se déplace gratuitement dans tout le royaume pour examiner vos objets à domicile.' })}
    <div class="mt-14">${villesGrid()}</div>
  </div>
</section>

<section aria-labelledby="objets-titre" class="bg-band py-20 lg:py-28">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    ${sectionHead({ kicker: 'Ce que François Secula rachète', title: 'Objets recherchés', id: 'objets-titre', link: { href: '/objets-recherches', label: `Les ${OBJETS.length} catégories` }, lead: 'Bijoux berbères, tableaux orientalistes, argenterie, meubles anciens, pièces de monnaie, cristal : il achète aux particuliers, dans tout le Maroc.' })}
    <div class="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
      ${featured.map((o) => objetTile(o)).join('\n      ')}
    </div>
  </div>
</section>

<section aria-labelledby="florian-titre" class="py-20 lg:py-28">
  <div class="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-20 lg:px-8">
    <div class="mx-auto w-full max-w-sm p-2.5 sm:max-w-md lg:col-span-5 lg:max-w-none">
      <div class="arch-frame arch-frame-light">
        ${photo({ key: 'maroc-medersa', w: 900, h: 1200, ratio: '4/5', sizes: '(min-width: 1024px) 38vw, (min-width: 640px) 448px, 92vw', alt: 'Cour de la médersa Ben Youssef à Marrakech vue à travers un arc en stuc ciselé', note: 'Architecture marocaine', fallback: 'Marrakech', frameClass: 'arch' })}
      </div>
    </div>
    <div class="lg:col-span-7">
      ${eyebrow('Un antiquaire partout au Maroc')}
      <h2 id="florian-titre" class="mt-4 max-w-[18ch] text-[2rem] leading-[1.1] sm:text-5xl">L'œil d'un antiquaire, partout au Maroc</h2>
      <p class="mt-6 max-w-[56ch] text-lg text-muted">Depuis ses bureaux de Marrakech, François Secula se déplace dans tout le Maroc. Il allie la rigueur du marché de l'art international et une vraie connaissance des objets marocains : bijoux berbères, tapis, orfèvrerie, peinture orientaliste.</p>
      <p class="mt-4 max-w-[56ch] text-lg text-muted">Chaque objet est examiné en personne, et le prix toujours expliqué. Acheteur d'antiquités sérieux, il reste votre seul interlocuteur du premier message jusqu'à l'enlèvement.</p>
      <div class="mt-10">${guarantees()}</div>
      <a href="/presentation" class="btn btn-secondary mt-10">Découvrir François Secula ${icon('arrow-right', 'size-4')}</a>
    </div>
  </div>
</section>

<section aria-labelledby="deroulement-titre" class="on-deep zellige bg-deep py-20 text-on-deep lg:py-28">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    ${sectionHead({ kicker: 'Estimation gratuite', title: 'Comment se déroule une estimation', id: 'deroulement-titre', link: { href: '/expertise-achat/estimation-gratuite', label: 'Tout sur l\'estimation' }, deep: true })}
    <div class="mt-14">${steps()}</div>
  </div>
</section>

<section aria-labelledby="services-titre" class="py-20 lg:py-28">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    ${sectionHead({ kicker: 'Expertise & achat', title: 'Quatre services, un seul interlocuteur', id: 'services-titre', link: { href: '/expertise-achat', label: 'Tous les services' } })}
    <ol class="mt-14 grid gap-px border-y border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
      ${SERVICES.map((s, i) => `<li class="group relative flex flex-col bg-page py-8 sm:px-6 lg:first:ps-0">
        <span class="font-display text-4xl font-semibold text-accent" aria-hidden="true">0${i + 1}</span>
        <h3 class="mt-5 text-xl leading-tight"><a href="/expertise-achat/${s.slug}" class="text-ink no-underline after:absolute after:inset-0 group-hover:text-link">${s.nav}</a></h3>
        <p class="mt-3 text-muted">${s.summary}</p>
        <span class="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold uppercase tracking-[0.08em] text-link">Découvrir ${icon('arrow-right', 'size-4 transition-transform group-hover:translate-x-1')}</span>
      </li>`).join('\n      ')}
    </ol>
  </div>
</section>

${faq(generalFaq)}
${ctaBand()}`;
  return {
    path: '/',
    title: 'François Secula, antiquaire partout au Maroc',
    description: 'Antiquaire partout au Maroc : expertise rapide et rachat d\'antiquités, bijoux berbères, tableaux, argenterie. Déplacement gratuit dans tout le Maroc.',
    body,
    jsonld: [businessNode(), personNode(), websiteNode()],
  };
}

/* ---------- Presentation ---------- */
function presentation() {
  const trail = [HOME, { name: 'Présentation', href: '/presentation' }];
  const body = `
${pageHero({
    kicker: 'Présentation',
    h1: 'François Secula, antiquaire partout au Maroc',
    lead: 'Estimer juste, expliquer chaque décision, traiter chaque objet avec soin : voici la manière dont François Secula exerce son métier d\'antiquaire partout au Maroc, de Marrakech à Tanger.',
    aside: `<figure>${florianPhoto()}<figcaption class="mt-4 text-sm text-on-deep-muted">Florian, expert de l'équipe</figcaption></figure>`,
  })}
<section aria-label="François Secula au travail" class="py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl grid-cols-3 gap-3 px-4 sm:px-6 lg:px-8">
    ${['florian-vase-vertical', 'maroc-arc', 'florian-livre'].map((k) => photo({ key: k, w: 600, h: 750, ratio: '4/5', alt: '', note: '', fallback: 'Florian, expert de l\'équipe', sizes: '(min-width: 1024px) 32vw, 31vw' })).join('\n    ')}
  </div>
</section>
<section aria-labelledby="parcours-titre" class="bg-band py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
    <h2 id="parcours-titre" class="text-4xl leading-[1.05] lg:col-span-4">Le parcours</h2>
    <div class="prose-site text-lg lg:col-span-8">
      <!-- Parcours redige sans dates ni references precises : a enrichir si des elements verifiables
           (formation, annee d'installation, affiliations) deviennent disponibles. -->
      <p>Voilà quelques années que François Secula a fait des antiquités son métier : une passion devenue, au fil des maisons visitées et des pièces tenues en main, une véritable expertise.</p>
      <p>Depuis ses bureaux de Marrakech, il se déplace gratuitement dans tout le royaume et suit de près le marché, au Maroc comme à l'international, pour que chaque avis de valeur colle aux ventes du moment.</p>
      <p>Sa force : l'exigence du marché de l'art international et l'amour des objets marocains, des bijoux berbères aux tapis anciens en passant par l'orfèvrerie et la peinture orientaliste. Il échange aussi simplement avec les familles marocaines qu'avec les résidents étrangers du Maroc.</p>
    </div>
  </div>
</section>
<section aria-labelledby="methode-titre" class="py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
    <h2 id="methode-titre" class="text-4xl leading-[1.05] lg:col-span-4">La méthode</h2>
    <div class="lg:col-span-8">
      <ol class="grid gap-3 sm:grid-cols-2">
        ${[
    ['Regarder avant de chiffrer', 'Matériaux, marques, usure : le prix vient après.'],
    ['Comparer au marché réel', 'Des ventes comparables récentes, jamais une cote au hasard.'],
    ['Expliquer', 'Vous savez toujours pourquoi un objet vaut ce prix.'],
    ['Laisser le choix', 'Estimer n\'oblige jamais à vendre.'],
  ].map(([t, d], n) => `<li class="rounded-card border border-hairline p-6"><span class="text-sm font-extrabold text-link">0${n + 1}</span><h3 class="mt-2 text-xl leading-tight">${t}</h3><p class="mt-2 text-muted">${d}</p></li>`).join('\n        ')}
      </ol>
    </div>
  </div>
</section>
${ctaBand()}`;
  return {
    path: '/presentation', trail,
    title: 'François Secula, antiquaire partout au Maroc | Présentation',
    description: 'Découvrez François Secula, antiquaire et expert en objets d\'art partout au Maroc : sa méthode d\'estimation, son expertise rapide et ses engagements de discrétion.',
    body,
    jsonld: [{ ...personNode(), description: 'Antiquaire et expert en objets d\'art partout au Maroc.' }],
  };
}

/* ---------- Expertise & achat ---------- */
function expertiseHub() {
  const trail = [HOME, { name: 'Expertise & achat', href: '/expertise-achat' }];
  const body = `
${pageHero({ kicker: 'Expertise & achat', h1: 'Expertise, estimation et achat d\'antiquités au Maroc', lead: 'Quatre services, un seul interlocuteur. Que vous souhaitiez connaître la valeur d\'un objet, faire expertiser une pièce, la vendre ou vider une maison, François Secula vous accompagne. Une alternative simple à la vente aux enchères au Maroc : un seul interlocuteur, une proposition claire, un enlèvement organisé.' })}
<section aria-label="Nos services" class="bg-band py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
    ${SERVICES.map((s) => `<article class="relative flex flex-col rounded-card border border-hairline bg-card p-6 sm:p-8">
      ${icon(s.icon, 'size-7 text-link')}
      <h2 class="mt-5 text-3xl leading-tight"><a href="/expertise-achat/${s.slug}" class="text-ink no-underline after:absolute after:inset-0 hover:text-link">${s.nav}</a></h2>
      <p class="mt-3 text-muted">${s.summary}</p>
      <span class="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-link">En savoir plus ${icon('arrow-right', 'size-4')}</span>
    </article>`).join('\n    ')}
  </div>
</section>
<section aria-labelledby="deroulement-titre" class="py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
    <h2 id="deroulement-titre" class="text-4xl leading-[1.1] lg:col-span-4">Le déroulement, pas à pas</h2>
    <div class="lg:col-span-8">${steps()}</div>
  </div>
</section>
${faq(generalFaq)}
${ctaBand()}`;
  return {
    path: '/expertise-achat', trail,
    title: 'Expertise et achat d\'antiquités au Maroc | François Secula',
    description: 'Estimation gratuite, expertise d\'objets d\'art, rachat d\'antiquités, successions et inventaires : les services de François Secula au Maroc.',
    body,
    jsonld: [{ '@type': 'ItemList', name: 'Services', itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/expertise-achat/${s.slug}`), name: s.nav })) }],
  };
}

function servicePage(s) {
  const path = `/expertise-achat/${s.slug}`;
  const trail = [HOME, { name: 'Expertise & achat', href: '/expertise-achat' }, { name: s.nav, href: path }];
  const others = SERVICES.filter((x) => x !== s);
  const body = `
${pageHero({ kicker: 'Expertise & achat', h1: s.h1, lead: s.lead, aside: photo({ key: s.slug === 'successions-inventaires' ? 'succession' : 'loupe', w: 800, h: 1000, ratio: '4/5', alt: s.slug === 'successions-inventaires' ? 'Salon ancien meublé d\'antiquités avant un inventaire de succession' : 'Loupe d\'expert posée sur un objet d\'art ancien, près d\'une signature', note: s.slug === 'successions-inventaires' ? 'Interieur de maison ou objets en cours d\'inventaire, sans personne identifiable' : 'Objet examine a la loupe, sans personne identifiable', fallback: s.nav.toLowerCase(), sizes: '(min-width: 1024px) 38vw, 92vw' }) })}
<section class="bg-band py-16 lg:py-24">
  <div class="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
    ${s.sections.map(([h, p, list], i) => `<div class="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12">
      <h2 class="text-3xl leading-tight sm:text-4xl lg:col-span-4">${h}</h2>
      <div class="prose-site lg:col-span-8">
        ${p ? `<p>${p}</p>` : ''}
        ${list ? `<${i === 0 && s.slug === 'estimation-gratuite' ? 'ol' : 'ul'}>${list.map((l) => `<li>${l}</li>`).join('')}</${i === 0 && s.slug === 'estimation-gratuite' ? 'ol' : 'ul'}>` : ''}
        ${h === 'Ce que nous achetons' ? '<p><a href="/objets-recherches" class="link">Voir tous les objets recherchés</a></p>' : ''}
      </div>
    </div>`).join('\n    ')}
  </div>
</section>
${faq(s.faq)}
<section aria-labelledby="autres-titre" class="border-t border-hairline py-16">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 id="autres-titre" class="text-3xl">Les autres services</h2>
    <div class="mt-6">${linkList(others.map((o) => ({ href: `/expertise-achat/${o.slug}`, label: o.nav })))}</div>
  </div>
</section>
${ctaBand()}`;
  return { path, trail, title: s.title, description: s.description, body, jsonld: [serviceNode(s.nav, path, s.description)] };
}

/* ---------- Objets recherches ---------- */
function objetsHub() {
  const trail = [HOME, { name: 'Objets recherchés', href: '/objets-recherches' }];
  const body = `
${pageHero({ kicker: 'Objets recherchés', h1: 'Les objets que François Secula recherche et achète', lead: 'Vingt familles d\'objets, des bijoux berbères aux livres anciens. Pour chacune, découvrez ce qui est recherché, ce qui fait la valeur, et comment photographier votre objet pour un premier avis gratuit.' })}
<section aria-label="Catégories d'objets" class="py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-10 px-4 sm:gap-x-6 sm:px-6 lg:grid-cols-3 lg:px-8">
    ${OBJETS.map((o) => objetTile(o, { level: 'h2' })).join('\n    ')}
  </div>
</section>
${ctaBand({ title: 'Votre objet n\'est pas dans la liste ?', text: 'Vous vous demandez quels objets anciens ont de la valeur ? Les objets anciens qui valent cher ne sont pas toujours ceux qu\'on croit. Envoyez une photo : François Secula vous dit si le vôtre mérite une estimation.' })}`;
  return {
    path: '/objets-recherches', trail,
    title: 'Objets recherchés : ce que rachète François Secula, antiquaire',
    description: `Bijoux berbères, tableaux orientalistes, argenterie, meubles, pièces de monnaie, cristal, tapis, fourrures : les ${OBJETS.length} familles d\'objets rachetés au Maroc.`,
    body,
    jsonld: [{ '@type': 'ItemList', name: 'Objets recherchés', itemListElement: OBJETS.map((o, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/objets-recherches/${o.slug}`), name: o.nav })) }],
  };
}

function objetPage(o) {
  const path = `/objets-recherches/${o.slug}`;
  const trail = [HOME, { name: 'Objets recherchés', href: '/objets-recherches' }, { name: o.nav, href: path }];
  const body = `
${pageHero({ kicker: 'Objets recherchés', h1: o.h1, lead: o.intro, aside: photo({ key: o.hero ?? o.img.key, w: 800, h: 1000, ratio: '4/5', alt: o.img.alt, note: o.img.note, fallback: o.img.fallback, sizes: '(min-width: 1024px) 38vw, 92vw' }) })}
<section class="bg-band py-16 lg:py-24">
  <div class="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12">
      <h2 class="text-3xl leading-tight sm:text-4xl lg:col-span-4">Ce que nous recherchons</h2>
      <ul class="grid gap-3 lg:col-span-8">
        ${o.recherche.map((r) => `<li class="flex items-start gap-3 text-muted">${icon('check', 'mt-1 size-4 flex-none text-link')}<span>${r}</span></li>`).join('\n        ')}
      </ul>
    </div>
    <div class="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12">
      <h2 class="text-3xl leading-tight sm:text-4xl lg:col-span-4">Ce qui fait la valeur</h2>
      <dl class="grid gap-8 sm:grid-cols-2 lg:col-span-8">
        ${o.valeur.map(([t, d]) => `<div class="border-t border-control pt-5"><dt class="font-sans text-lg font-semibold">${t}</dt><dd class="mt-2 text-muted">${d}</dd></div>`).join('\n        ')}
      </dl>
    </div>
    <div class="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12">
      <h2 class="text-3xl leading-tight sm:text-4xl lg:col-span-4">Faire estimer votre objet</h2>
      <div class="rounded-card border border-hairline bg-card p-5 sm:p-8 lg:col-span-8">
        <p class="flex items-start gap-3">${icon('camera', 'mt-0.5 size-5 flex-none text-link')}<span>${o.photos}</span></p>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href="/contact" class="btn btn-primary min-h-12 px-4 sm:px-6">Demander une estimation ${icon('arrow-right')}</a>
          <a href="tel:${SITE.phone.e164}" class="btn btn-secondary min-h-12 px-4 sm:px-6">${icon('phone')} ${SITE.phone.display}</a>
        </div>
      </div>
    </div>
  </div>
</section>
${faq(o.faq)}
<section aria-labelledby="liens-titre" class="border-t border-hairline py-16">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <h2 id="liens-titre" class="text-3xl sm:text-4xl">François Secula recherche aussi</h2>
      <a href="/objets-recherches" class="link inline-flex items-center gap-2">Tous les objets recherchés ${icon('arrow-right', 'size-4')}</a>
    </div>
    <div class="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">${o.related.map((s) => objetTile(bySlug[s])).join('')}</div>
  </div>
</section>
${ctaBand()}`;
  return { path, trail, title: o.title, description: o.description, body, jsonld: [serviceNode(`Achat et estimation : ${o.nav}`, path, o.description)] };
}

/* ---------- Zones d'intervention ---------- */
function zonesHub() {
  const trail = [HOME, { name: 'Zones d\'intervention', href: '/zones-intervention' }];
  const body = `
${pageHero({ kicker: 'Zones d\'intervention', h1: 'Antiquaire à domicile dans tout le Maroc', lead: `Basé à ${SITE.address.city}, François Secula se déplace chez vous pour examiner vos objets, où que vous soyez au Maroc. Voici les villes où il intervient le plus souvent.` })}
<section aria-label="Villes" class="py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">${villesGrid('h2')}</div>
</section>
${ctaBand({ title: 'Votre ville n\'apparaît pas ?', text: 'Meknès, Essaouira, El Jadida, Kénitra, Mohammedia, Oujda, Tétouan, Ouarzazate : François Secula se déplace comme antiquaire partout au Maroc, avec un déplacement gratuit.' })}`;
  return {
    path: '/zones-intervention', trail,
    title: 'Antiquaire à domicile dans tout le Maroc | François Secula',
    description: 'François Secula, antiquaire, se déplace à Marrakech, Casablanca, Rabat, Tanger, Fès, Agadir et partout au Maroc pour estimer et acheter vos antiquités.',
    body,
    jsonld: [{ '@type': 'ItemList', name: 'Zones d\'intervention', itemListElement: VILLES.map((v, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/zones-intervention/${v.slug}`), name: `Antiquaire à ${v.ville}` })) }],
  };
}

function villePage(v) {
  const path = `/zones-intervention/${v.slug}`;
  const trail = [HOME, { name: 'Zones d\'intervention', href: '/zones-intervention' }, { name: v.ville, href: path }];
  const body = `
${pageHero({ kicker: `Antiquaire à ${v.ville}`, h1: `Antiquaire et expert en objets d'art à ${v.ville}`, lead: v.lead, aside: photo({ key: v.photo.key, w: 1000, h: 750, ratio: '4/3', priority: true, alt: v.photo.alt, note: v.photo.note, fallback: v.ville, sizes: '(min-width: 1024px) 38vw, 92vw' }) })}
<section aria-labelledby="objets-ville" class="py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 id="objets-ville" class="text-3xl sm:text-4xl">Souvent rencontrés à ${v.ville}</h2>
    <div class="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">${v.objets.map((s) => objetTile(bySlug[s])).join('')}</div>
  </div>
</section>
<section class="bg-band py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
    <div class="lg:col-span-7">
      <h2 class="text-3xl leading-tight sm:text-4xl">Les antiquités à ${v.ville}</h2>
      <div class="prose-site mt-6">${v.contexte.map((p) => `<p>${p}</p>`).join('')}</div>
    </div>
    <div class="lg:col-span-5">
      <h2 class="text-2xl leading-tight">Quartiers et environs</h2>
      <ul class="mt-5 flex flex-wrap gap-2" aria-label="Quartiers desservis à ${v.ville}">
        ${v.quartiers.map((q) => `<li class="rounded-pill border border-control bg-card px-4 py-1.5 text-sm font-semibold">${q}</li>`).join('\n        ')}
      </ul>
      <h2 class="mt-10 text-2xl leading-tight">Services à ${v.ville}</h2>
      <div class="mt-5">${linkList(SERVICES.map((s) => ({ href: `/expertise-achat/${s.slug}`, label: s.nav })), '')}</div>
    </div>
  </div>
</section>
${ctaBand({ title: `Un objet à faire estimer à ${v.ville} ?` })}`;
  return {
    path, trail, title: v.title, description: v.description, body,
    jsonld: [serviceNode(`Antiquaire à ${v.ville}`, path, v.description, { '@type': 'City', name: v.ville, containedInPlace: areaServed })],
  };
}

/* ---------- Contact (Tally) ---------- */
function contact() {
  const trail = [HOME, { name: 'Contact', href: '/contact' }];
  // Tout contact passe par le formulaire Tally ; le telephone reste en secours.
  const tally = SITE.tallyFormId
    ? `<iframe data-tally-src="https://tally.so/embed/${SITE.tallyFormId}?alignLeft=1&amp;hideTitle=1&amp;transparentBackground=1&amp;dynamicHeight=1" loading="lazy" width="100%" height="700" title="Formulaire de demande d'estimation" class="w-full"></iframe>`
    : `<!-- FORMULAIRE TALLY (A REMPLACER) : renseigner tallyFormId dans src/site/config.mjs.
     L'iframe et le script Tally sont alors generes automatiquement a la place de ce bloc. -->
      <div>
        <h2 class="font-sans text-lg font-semibold">Le formulaire de demande arrive très bientôt</h2>
        <p class="mt-3 max-w-[56ch] text-muted">Vous pourrez y décrire votre objet et joindre vos photos : vue d'ensemble, signature, poinçons, dessous et défauts éventuels. En attendant, François Secula reste joignable par téléphone.</p>
        <a href="tel:${SITE.phone.e164}" class="btn btn-primary mt-8 min-h-12 px-6">${icon('phone')} Appeler le ${SITE.phone.display}</a>
      </div>`;
  const body = `
<section class="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pb-28 lg:pt-10">
  <div class="lg:col-span-5">
    ${eyebrow('Contact')}
    <h1 class="mt-5 text-[2.5rem] leading-[1.05] tracking-tight sm:text-6xl">Faire estimer un objet</h1>
    <p class="mt-6 max-w-[48ch] text-lg text-muted">Décrivez votre objet dans le formulaire : François Secula vous répond personnellement et rapidement, avec un premier avis gratuit et sans engagement : une estimation en ligne de votre objet d'art ou de votre objet ancien.</p>
    <ul class="mt-10 space-y-5">
      <li class="flex items-start gap-3">${icon('camera', 'mt-0.5 size-5 flex-none text-link')}<div><p class="font-semibold">Joignez des photos</p><p class="text-muted">Vue d'ensemble, puis les détails : signature, poinçons, dessous, défauts.</p></div></li>
      <li class="flex items-start gap-3">${icon('map-pin', 'mt-0.5 size-5 flex-none text-link')}<div><p class="font-semibold">Nos bureaux</p><p class="text-muted">${SITE.address.street}<br>${SITE.address.postalCode} ${SITE.address.city}, ${SITE.address.countryName}<br>Déplacement à domicile dans tout le Maroc.</p></div></li>
      <li class="flex items-start gap-3">${icon('phone', 'mt-0.5 size-5 flex-none text-link')}<div><p class="font-semibold">Par téléphone</p><a href="tel:${SITE.phone.e164}" class="link tabular-nums">${SITE.phone.display}</a></div></li>
    </ul>
  </div>
  <div class="lg:col-span-7">
    <div class="rounded-card border border-hairline bg-card p-6 shadow-raised sm:p-8 lg:p-10">
      ${tally}
      <p class="mt-6 text-sm text-subtle">Vos informations servent uniquement à répondre à votre demande (<a href="/confidentialite" class="link">politique de confidentialité</a>, loi 09-08).</p>
    </div>
  </div>
</section>
${faq(generalFaq)}`;
  return {
    path: '/contact', trail,
    title: 'Contact et estimation gratuite | François Secula, antiquaire',
    description: 'Contactez François Secula, antiquaire partout au Maroc : décrivez votre objet dans le formulaire pour une estimation gratuite, rapide et sans engagement.',
    body,
    jsonld: [businessNode()],
    scripts: SITE.tallyFormId ? '  <script src="https://tally.so/widgets/embed.js" async></script>' : '',
  };
}

/* ---------- Pages legales et 404 ---------- */
// Pages legales. Un paragraphe qui commence par "<" (liste, etc.) est insere tel quel.
// Aucune information inventee : les numeros non communiques (RC, ICE, IF, CNDP) ne sont pas affiches.
const LEGAL_MAJ = '19 octobre 2026';
const legal = (path, name, description, sections) => ({
  path, trail: [HOME, { name, href: path }], noindex: true, title: `${name} | François Secula`, description,
  body: `<section class="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6">
  <h1 class="text-[2.5rem] leading-tight sm:text-5xl">${name}</h1>
  <p class="mt-4 text-sm text-subtle">Dernière mise à jour : ${LEGAL_MAJ}</p>
  <div class="prose-site mt-10">${sections.map(([h, ...ps]) => `<h2>${h}</h2>${ps.map((p) => (p.startsWith('<') ? p : `<p>${p}</p>`)).join('')}`).join('\n')}</div>
</section>`,
});

const adresse = `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, ${SITE.address.countryName}`;
const lienContact = '<a href="/contact" class="link">formulaire de contact</a>';
const lienConfidentialite = '<a href="/confidentialite" class="link">politique de confidentialité</a>';

const mentions = () => legal('/mentions-legales', 'Mentions légales', 'Mentions légales du site de François Secula, antiquaire et expert en objets d\'art au Maroc : éditeur, hébergement, propriété intellectuelle et droit applicable.', [
  ['Éditeur du site', `Le site ${SITE.url.replace('https://', '')} est édité par ${SITE.editeur.name}, ${SITE.editeur.legalForm.toLowerCase()}.`,
    `<ul><li>Siège : ${SITE.editeur.address}</li><li>SIREN : ${SITE.editeur.siren} · SIRET : ${SITE.editeur.siret}</li><li>Immatriculation : ${SITE.editeur.registre}</li><li>TVA intracommunautaire : ${SITE.editeur.tva}</li><li>Bureaux au Maroc : ${adresse}</li><li>Téléphone : <a href="tel:${SITE.phone.e164}" class="link">${SITE.phone.display}</a></li><li>E-mail : <a href="mailto:${SITE.editeur.email}" class="link [overflow-wrap:anywhere]">${SITE.editeur.email}</a></li><li>Contact écrit : via le ${lienContact}</li></ul>`],
  ['Directeur de la publication', `${SITE.editeur.name}.`],
  ['Activité', 'Estimation, expertise et rachat d\'antiquités et d\'objets d\'art auprès des particuliers, à Marrakech et partout au Maroc. Aucun objet n\'est vendu au public par l\'intermédiaire de ce site.'],
  ['Conception et réalisation', ...(() => {
    const r = SITE.realisation;
    return [
      `Site conçu et réalisé par ${r.name}${r.legalForm ? `, ${r.legalForm}` : ''}.`,
      [`SIREN : ${r.siren}`, r.rcs && `RCS : ${r.rcs}`, r.tva && `TVA intracommunautaire : ${r.tva}`].filter(Boolean).join(' · ') + '.',
      ...(r.address ? [`Siège : ${r.address}.`] : []),
    ];
  })()],
  ['Hébergement', 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (vercel.com).'],
  ['Propriété intellectuelle', 'L\'ensemble des contenus de ce site (textes, photographies, logo, mise en page) est protégé par la loi n° 2-00 relative aux droits d\'auteur et droits voisins. Ils sont la propriété de François Secula ou de leurs auteurs respectifs.', 'Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.'],
  ['Crédits photos', 'Les photographies de l\'équipe et des objets présentés ne peuvent être reproduites sans autorisation.', 'Certaines illustrations de catégories d\'objets et de pages ville proviennent de collections en libre accès, placées dans le domaine public (licence CC0) : The Metropolitan Museum of Art (New York), The Cleveland Museum of Art et WordPress Photo Directory. Les photographies de sacs sont publiées sous licence Creative Commons : « Louis Vuitton Handbag » par Prayitno (Flickr, CC BY 2.0) et « Hermes Ostrich Birkin Bag » par Wen-Cheng Liu (Wikimedia Commons, CC BY-SA 2.0), recadrées. Ces photographies illustrent un type d\'objet ou un lieu ; elles ne représentent pas des objets rachetés par François Secula.'],
  ['Estimations et informations', 'Les avis de valeur donnés à distance, sur photos, sont indicatifs. Seul l\'examen de l\'objet permet une estimation ou une offre ferme.', 'Les informations publiées sur ce site sont données à titre général et peuvent évoluer sans préavis ; elles ne constituent pas une offre contractuelle.'],
  ['Services et liens externes', 'Le formulaire de contact est fourni par Tally (Tally BV, Belgique). Les liens vers des sites tiers sont proposés pour votre information ; François Secula n\'est pas responsable de leur contenu.'],
  ['Données personnelles', `Le traitement des informations que vous transmettez est décrit dans la ${lienConfidentialite}.`],
  ['Droit applicable', 'Les présentes mentions légales sont régies par le droit marocain. Tout litige relatif à l\'utilisation du site relève des juridictions marocaines compétentes.'],
]);

const confidentialite = () => legal('/confidentialite', 'Politique de confidentialité', 'Politique de confidentialité et protection des données personnelles (loi 09-08) du site de François Secula, antiquaire : données collectées, finalités, destinataires, durée et vos droits.', [
  ['Responsable du traitement', `${SITE.editeur.name}, ${SITE.editeur.legalForm.toLowerCase()} (SIREN ${SITE.editeur.siren}), ${SITE.editeur.address} ; bureaux au Maroc : ${adresse}. Contact : via le ${lienContact}, au <a href="tel:${SITE.phone.e164}" class="link">${SITE.phone.display}</a> ou par e-mail à <a href="mailto:${SITE.editeur.email}" class="link [overflow-wrap:anywhere]">${SITE.editeur.email}</a>.`],
  ['Données collectées', 'Lorsque vous remplissez le formulaire de contact ou que vous nous appelez, nous recueillons :',
    '<ul><li>vos nom et prénom ;</li><li>vos coordonnées : adresse e-mail, téléphone, code postal ;</li><li>la description et les photos de votre objet.</li></ul>',
    'Aucune autre donnée n\'est demandée. Ne transmettez pas d\'informations sensibles (pièces d\'identité, coordonnées bancaires) par le formulaire.'],
  ['Finalités', '<ul><li>Répondre à votre demande d\'estimation ou de contact ;</li><li>organiser, si vous le souhaitez, l\'examen de l\'objet et le déplacement ;</li><li>assurer le suivi de nos échanges.</li></ul>', 'Vos données ne sont jamais vendues, publiées, ni utilisées pour de la prospection commerciale.'],
  ['Base du traitement', 'Le traitement repose sur votre consentement, exprimé lorsque vous envoyez le formulaire ou nous contactez, conformément à la loi n° 09-08 relative à la protection des personnes physiques à l\'égard du traitement des données à caractère personnel.'],
  ['Destinataires', 'Vos données sont destinées à François Secula, pour traiter votre demande. Deux prestataires techniques interviennent :',
    '<ul><li>Tally (Tally BV, Belgique) recueille et conserve les réponses au formulaire de contact ;</li><li>Vercel Inc. (États-Unis) héberge les pages du site, sans accès aux réponses du formulaire.</li></ul>'],
  ['Transferts hors du Maroc', 'Tally étant établi dans l\'Union européenne, les réponses au formulaire sont conservées hors du Maroc.'],
  ['Durée de conservation', 'Vos données sont conservées le temps nécessaire au traitement de votre demande et au suivi de nos échanges, puis supprimées.'],
  ['Sécurité', 'Le site et le formulaire fonctionnent exclusivement en connexion chiffrée (HTTPS).'],
  ['Vos droits', `Conformément à la loi n° 09-08, vous disposez d'un droit d'accès, de rectification et d'opposition, pour des motifs légitimes, au traitement de vos données. Pour l'exercer, écrivez-nous via le ${lienContact} en précisant votre demande.`,
    'Vous pouvez également adresser une réclamation à la Commission nationale de contrôle de la protection des données à caractère personnel (CNDP, www.cndp.ma).'],
  ['Cookies', SITE.googleAds.id
    ? 'Ce site intègre sur toutes ses pages la balise Google Ads (Google Ireland Ltd), qui peut déposer des cookies servant à mesurer l\'efficacité de nos annonces publicitaires et à en améliorer la diffusion. Vous pouvez les refuser ou les supprimer à tout moment dans les réglages de votre navigateur, et gérer la personnalisation des annonces sur adssettings.google.com. Le formulaire intégré Tally peut utiliser des traceurs techniques nécessaires à son fonctionnement.'
    : 'Ce site n\'utilise pas de cookie de mesure d\'audience ni de publicité. Le formulaire intégré Tally peut utiliser des traceurs techniques nécessaires à son fonctionnement.'],
  ['Modifications', 'Cette politique peut être mise à jour ; la date de dernière mise à jour figure en haut de cette page.'],
]);

/* ---------- Remerciement apres envoi du formulaire (/merci) ----------
   Page hors navigation, hors sitemap et noindex, accessible directement. merci.js ne compte la
   conversion Google Ads (SITE.googleAds dans config.mjs) qu'apres un envoi reel du formulaire Tally. */
const merci = () => {
  const ads = SITE.googleAds;
  const cfg = JSON.stringify({ adsId: ads.id, conversionLabel: ads.conversionLabel }).replace(/</g, '\\u003c');
  return {
    path: '/merci', noindex: true,
    title: 'Demande envoyée | François Secula, antiquaire',
    description: 'Votre demande d\'estimation a bien été transmise à François Secula.',
    head: `  <script id="merci-config" type="application/json">${cfg}</script>
  <script src="${asset('/assets/js/merci.js')}"></script>`,
    body: `
<section class="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8 lg:pb-28 lg:pt-16">
  <div class="lg:col-span-7">
    ${eyebrow('Demande envoyée')}
    <h1 class="mt-5 text-[2.5rem] leading-[1.05] tracking-tight sm:text-6xl">Merci, votre demande est bien arrivée</h1>
    <p class="mt-6 max-w-[52ch] text-lg text-muted">François Secula examine personnellement chaque objet qu'on lui confie. Il revient vers vous rapidement avec un premier avis, gratuit et sans engagement.</p>
    <ol class="mt-10 space-y-6">
      <li class="flex items-start gap-4"><span class="flex size-9 flex-none items-center justify-center rounded-full border border-hairline bg-card font-semibold tabular-nums text-link" aria-hidden="true">1</span><div><p class="font-semibold">Étude de votre description</p><p class="text-muted">Photos, signature, poinçons, provenance : chaque détail compte pour situer l'objet.</p></div></li>
      <li class="flex items-start gap-4"><span class="flex size-9 flex-none items-center justify-center rounded-full border border-hairline bg-card font-semibold tabular-nums text-link" aria-hidden="true">2</span><div><p class="font-semibold">Premier avis</p><p class="text-muted">François Secula vous recontacte avec une première estimation ou quelques questions complémentaires.</p></div></li>
      <li class="flex items-start gap-4"><span class="flex size-9 flex-none items-center justify-center rounded-full border border-hairline bg-card font-semibold tabular-nums text-link" aria-hidden="true">3</span><div><p class="font-semibold">Examen sur place si besoin</p><p class="text-muted">Pour une offre ferme, il se déplace chez vous, partout au Maroc.</p></div></li>
    </ol>
    <div class="mt-12 flex flex-wrap gap-3">
      <a href="/objets-recherches" class="btn btn-primary min-h-12 px-6">Voir les objets recherchés ${icon('arrow-right', 'size-4')}</a>
      <a href="/" class="btn btn-secondary min-h-12 px-6">Retour à l'accueil</a>
    </div>
    <p class="mt-8 text-sm text-subtle">Une précision à ajouter ? Appelez le <a href="tel:${SITE.phone.e164}" class="link tabular-nums">${SITE.phone.display}</a>.</p>
  </div>
  <div class="mx-auto w-full max-w-md lg:col-span-5">${florianPhoto()}</div>
</section>`,
  };
};

const notFound = () => ({
  path: '/404', noindex: true, title: 'Page introuvable | François Secula, antiquaire', description: 'Cette page n\'existe pas ou a été déplacée.',
  body: `<section class="mx-auto max-w-3xl px-4 py-24 sm:px-6">
  ${eyebrow('Erreur 404')}
  <h1 class="mt-5 text-[2.5rem] leading-tight sm:text-6xl">Cette page est introuvable</h1>
  <p class="mt-6 text-lg text-muted">Elle a peut-être été déplacée. Voici les pages les plus consultées :</p>
  <div class="mt-8">${linkList([{ href: '/', label: 'Accueil' }, { href: '/objets-recherches', label: 'Objets recherchés' }, { href: '/expertise-achat/estimation-gratuite', label: 'Estimation gratuite' }, { href: '/contact', label: 'Contact' }], 'sm:grid-cols-2')}</div>
</section>`,
});

export function allPages() {
  return [
    home(), presentation(), expertiseHub(), ...SERVICES.map(servicePage),
    objetsHub(), ...OBJETS.map(objetPage), zonesHub(), ...VILLES.map(villePage),
    contact(), merci(), mentions(), confidentialite(), notFound(),
  ];
}

export const footerContext = { objets: OBJETS, villes: VILLES, services: SERVICES };
