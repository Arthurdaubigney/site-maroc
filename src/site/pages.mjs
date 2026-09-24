// Definition de toutes les pages du site. Chaque entree : path, title, description, trail, body, jsonld.
import { SITE, IMAGES, whatsappLink } from './config.mjs';
import { OBJETS, bySlug } from './content/objets.mjs';
import { SERVICES } from './content/services.mjs';
import { VILLES } from './content/villes.mjs';
import {
  esc, abs, icon, photo, eyebrow, faq, ctaBand, linkList, pageHero, businessId, expertId,
} from './layout.mjs';

const HOME = { name: 'Accueil', href: '/' };
const areaServed = { '@type': 'Country', name: 'Maroc' };

/* ---------- Donnees structurees de l'entreprise ---------- */
const businessNode = () => ({
  '@type': 'AntiqueStore',
  '@id': businessId,
  name: SITE.name,
  description: `${SITE.tagline}. Achat, vente, estimation et expertise d'antiquités et d'objets d'art dans tout le Maroc.`,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/favicon.svg`,
  image: `${IMAGES.og}?auto=format&fit=crop&w=1200&h=630&q=80`,
  telephone: SITE.phone.e164,
  email: SITE.email,
  address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, addressLocality: SITE.address.city, postalCode: SITE.address.postalCode, addressCountry: SITE.address.country },
  ...(SITE.geo ? { geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng } } : {}),
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: SITE.hours.days, opens: SITE.hours.opens, closes: SITE.hours.closes }],
  areaServed: [areaServed, ...VILLES.map((v) => ({ '@type': 'City', name: v.ville }))],
  founder: { '@id': expertId },
  knowsAbout: OBJETS.map((o) => o.nav),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services de Florian Messeau, antiquaire',
    itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.nav, url: abs(`/expertise-achat/${s.slug}`) } })),
  },
  contactPoint: { '@type': 'ContactPoint', telephone: `+${SITE.whatsapp.digits}`, contactType: 'customer service', availableLanguage: ['French', 'Arabic', 'English'], areaServed: 'MA' },
  ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
});
const personNode = () => ({
  '@type': 'Person', '@id': expertId, name: SITE.expert.name, jobTitle: SITE.expert.jobTitle,
  worksFor: { '@id': businessId }, url: abs('/presentation'),
  knowsAbout: ['Antiquités', 'Expertise d\'objets d\'art', 'Art marocain ancien', 'Mobilier ancien', 'Tapis berbères'],
});
const websiteNode = () => ({ '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.name, inLanguage: 'fr-MA', publisher: { '@id': businessId } });
const serviceNode = (name, path, description, area = areaServed) => ({
  '@type': 'Service', name, serviceType: name, description, url: abs(path), provider: { '@id': businessId }, areaServed: area,
});

/* ---------- Blocs partages ---------- */
const steps = () => `<ol class="grid gap-x-10 gap-y-10 sm:grid-cols-2">
  ${[
    ['Envoyez quelques photos', 'Vue d\'ensemble, signature, poinçons, dessous et défauts éventuels.'],
    ['Recevez un premier avis', 'Rapidement, par retour : intérêt de l\'objet et fourchette de valeur.'],
    ['Examen de l\'objet', 'Chez vous ou à la galerie, partout au Maroc, sur rendez-vous.'],
    ['Offre ou rapport écrit', 'Proposition de rachat ou rapport d\'expertise. Vous restez libre de refuser.'],
  ].map(([t, d], i) => `<li class="border-t border-control pt-6">
    <span class="font-display text-5xl font-semibold text-link" aria-hidden="true">${i + 1}</span>
    <h3 class="mt-3 font-sans text-lg font-semibold">${t}</h3>
    <p class="mt-2 text-muted">${d}</p>
  </li>`).join('\n  ')}
</ol>`;

const guarantees = () => `<ul class="grid gap-x-10 gap-y-8 sm:grid-cols-2">
  ${[
    ['shield-check', 'Authenticité garantie', 'Chaque pièce vendue est accompagnée d\'un certificat : époque, matériaux, provenance connue, restaurations.'],
    ['lock', 'Discrétion absolue', 'Rendez-vous privés, aucune publicité sur vos biens ni sur votre identité, données jamais transmises.'],
    ['scale', 'Prix argumenté', 'Chaque estimation s\'appuie sur des ventes comparables récentes, que Florian Messeau vous présente.'],
    ['truck', 'Partout au Maroc', 'Déplacement à domicile, enlèvement, emballage et transport pris en charge.'],
  ].map(([ic, t, d]) => `<li>
    ${icon(ic, 'size-7 text-ornament')}
    <h3 class="mt-3 font-sans text-lg font-semibold text-on-deep">${t}</h3>
    <p class="mt-2 text-sm text-on-deep-muted">${d}</p>
  </li>`).join('\n  ')}
</ul>`;

const portraitPlaceholder = (cls = 'aspect-[4/5]') => `<!-- PHOTO COMMERCIAL : Portrait de Florian Messeau dans sa galerie, format portrait 4:5, 800 x 1000 px.
     Remplacer le <div role="img"> par :
     <img src="/images/florian-messeau.jpg" width="800" height="1000" loading="lazy" decoding="async" alt="Florian Messeau, antiquaire et expert en objets d'art, dans sa galerie au Maroc">
     puis retirer la classe is-missing. Jamais de photo de banque d'images ici. -->
<figure class="photo-frame is-missing ${cls}">
  <div class="h-full w-full" role="img" aria-label="Portrait de Florian Messeau, photo à venir"></div>
  <figcaption class="photo-fallback">Portrait de Florian Messeau à venir</figcaption>
</figure>`;

const objetCard = (o, big = false) => `<article class="group relative flex flex-col overflow-hidden rounded-card border border-hairline bg-card ${big ? 'md:col-span-2 lg:col-span-6 lg:row-span-2' : 'lg:col-span-3'}">
  ${photo({ key: o.img.key, w: big ? 900 : 600, h: big ? 900 : 450, ratio: big ? '1/1' : '4/3', alt: o.img.alt, note: o.img.note, fallback: o.img.fallback, sizes: big ? '(min-width: 1024px) 45vw, 92vw' : '(min-width: 1024px) 22vw, 92vw', frameClass: `rounded-none ${big ? 'lg:aspect-auto lg:flex-1' : ''}` })}
  <div class="p-5">
    <h3 class="${big ? 'text-3xl' : 'text-2xl'} leading-tight"><a href="/objets-recherches/${o.slug}" class="text-ink no-underline after:absolute after:inset-0 group-hover:text-link">${o.nav}</a></h3>
    ${big ? `<p class="mt-2 max-w-[52ch] text-muted">${o.intro}</p>` : ''}
  </div>
</article>`;

const generalFaq = [
  ['L\'estimation est-elle payante ?', 'Non. Le premier avis sur photos et l\'examen en vue d\'un achat sont gratuits et sans engagement. Seul le rapport d\'expertise écrit fait l\'objet d\'un devis préalable.'],
  // Pas de liens dans les reponses repliees : le maillage vers ces pages passe par les sections Objets et Zones.
  ['Quels objets achetez-vous ?', 'Mobilier, tableaux, tapis, argenterie, bijoux et montres, bronzes, verrerie d\'art, luminaires, arts asiatiques et africains, vêtements et sacs de marque, instruments de musique, et bien d\'autres objets de collection.'],
  ['Vous déplacez-vous à domicile ?', `Oui, partout au Maroc, sur rendez-vous : ${VILLES.map((v) => v.ville).join(', ')} et ailleurs.`],
  ['Combien de temps faut-il pour avoir un avis ?', 'Peu de temps : Florian Messeau répond rapidement, dès réception de photos exploitables.'],
  ['Mes informations restent-elles confidentielles ?', 'Oui. Vos photos et coordonnées servent uniquement à répondre à votre demande et ne sont jamais publiées ni transmises.'],
];

/* ---------- Accueil ---------- */
function home() {
  const featured = ['mobilier-ancien-contemporain', 'tableaux-tapisseries', 'tapis', 'montres-bijoux', 'pate-de-verre'].map((s) => bySlug[s]);
  const body = `
<section aria-labelledby="hero-titre">
  <div class="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-20">
    <div class="lg:col-span-7 lg:pe-8 lg:pt-8">
      ${eyebrow('Antiquaire à Marrakech, partout au Maroc')}
      <h1 id="hero-titre" class="mt-5 max-w-[16ch] text-[2.75rem] leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">Antiquaire et expert en objets d'art au Maroc</h1>
      <p class="mt-7 max-w-[58ch] text-lg text-muted">Estimation gratuite, expertise et achat d'antiquités : mobilier, tableaux, tapis, argenterie, bijoux, bronzes et objets de collection. Basé à Marrakech, Florian Messeau se déplace chez vous partout au Maroc.</p>
      <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href="/contact" class="btn btn-primary min-h-12 px-6 text-base">Demander une estimation gratuite ${icon('arrow-right')}</a>
        <a href="/objets-recherches" class="btn btn-secondary min-h-12 px-6 text-base">Voir les objets recherchés</a>
      </div>
      <ul class="mt-12 grid gap-4 border-t border-hairline pt-8 sm:grid-cols-3" aria-label="Nos engagements">
        <li class="flex items-start gap-3">${icon('search', 'mt-0.5 size-5 flex-none text-link')}<span class="text-sm text-muted"><strong class="block font-semibold text-ink">Avis gratuit</strong>sur simples photos</span></li>
        <li class="flex items-start gap-3">${icon('clock', 'mt-0.5 size-5 flex-none text-link')}<span class="text-sm text-muted"><strong class="block font-semibold text-ink">Réponse rapide</strong>par un seul interlocuteur</span></li>
        <li class="flex items-start gap-3">${icon('truck', 'mt-0.5 size-5 flex-none text-link')}<span class="text-sm text-muted"><strong class="block font-semibold text-ink">À domicile</strong>partout au Maroc</span></li>
      </ul>
    </div>
    <div class="relative lg:col-span-5">
      ${photo({ key: 'vitrine', w: 960, h: 1200, ratio: '4/5', priority: true, sizes: '(min-width: 1024px) 40vw, 92vw', alt: 'Commode ancienne, miroir doré et céramiques présentés dans une galerie d\'antiquités', note: 'Vitrine ou galerie de Florian Messeau, format portrait 4:5', fallback: 'la galerie', frameClass: 'shadow-raised' })}
      <div class="relative -mt-10 ms-6 max-w-72 rounded-card border border-hairline bg-card p-5 shadow-overlay sm:ms-auto sm:me-6 lg:-ms-10 lg:me-0">
        <p class="font-display text-xl font-semibold leading-snug">Une expertise argumentée, jamais une estimation à la volée.</p>
        <p class="mt-2 text-sm text-muted">Florian Messeau vous explique comment il arrive au prix.</p>
      </div>
    </div>
  </div>
</section>

<section aria-labelledby="services-titre" class="bg-band py-20 lg:py-28">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="grid gap-6 lg:grid-cols-12 lg:items-end">
      <div class="lg:col-span-7">
        ${eyebrow('Expertise & achat')}
        <h2 id="services-titre" class="mt-4 max-w-[20ch] text-4xl leading-[1.1] sm:text-5xl">Estimer, expertiser, acheter : un seul interlocuteur</h2>
      </div>
      <p class="max-w-[52ch] text-muted lg:col-span-5">Du premier avis à l'enlèvement, vous traitez avec Florian Messeau en personne. Pas d'intermédiaire, et un avis toujours expliqué.</p>
    </div>
    <div class="mt-14 grid gap-5 lg:grid-cols-12">
      ${SERVICES.map((s, i) => `<article class="relative flex flex-col rounded-card border border-hairline bg-card p-6 sm:p-8 ${i === 0 ? 'lg:col-span-6 lg:row-span-3' : 'lg:col-span-6'}">
        ${icon(s.icon, 'size-7 text-link')}
        <h3 class="mt-5 ${i === 0 ? 'text-4xl' : 'text-2xl sm:text-3xl'} leading-tight"><a href="/expertise-achat/${s.slug}" class="text-ink no-underline after:absolute after:inset-0 hover:text-link">${s.nav}</a></h3>
        <p class="mt-3 max-w-[56ch] text-muted">${i === 0 ? s.lead : s.summary}</p>
        ${i === 0 ? `<ul class="mt-6 space-y-2 text-sm">${['Premier avis rapide sur simples photos', 'Examen à domicile partout au Maroc', 'Aucune obligation de vendre'].map((t) => `<li class="flex items-start gap-2">${icon('check', 'mt-0.5 size-4 flex-none text-link')}${t}</li>`).join('')}</ul>` : ''}
        <span class="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-link">En savoir plus ${icon('arrow-right', 'size-4')}</span>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>

<section aria-labelledby="objets-titre" class="py-20 lg:py-28">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        ${eyebrow('Objets recherchés')}
        <h2 id="objets-titre" class="mt-4 max-w-[22ch] text-4xl leading-[1.1] sm:text-5xl">Quinze familles d'objets, une même exigence</h2>
      </div>
      <a href="/objets-recherches" class="link inline-flex items-center gap-2 font-semibold">Tous les objets recherchés ${icon('arrow-right', 'size-4')}</a>
    </div>
    <div class="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
      ${featured.map((o, i) => objetCard(o, i === 0)).join('\n      ')}
    </div>
    <div class="mt-12 border-t border-hairline pt-8">
      <h3 class="font-sans text-base font-semibold">Florian Messeau recherche aussi</h3>
      <div class="mt-5">${linkList(OBJETS.filter((o) => !featured.includes(o)).map((o) => ({ href: `/objets-recherches/${o.slug}`, label: o.nav })), 'sm:grid-cols-2 lg:grid-cols-4')}</div>
    </div>
  </div>
</section>

<section aria-labelledby="deroulement-titre" class="border-y border-hairline bg-band py-20 lg:py-28">
  <div class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
    <div class="lg:col-span-4">
      ${eyebrow('Estimation gratuite')}
      <h2 id="deroulement-titre" class="mt-4 text-4xl leading-[1.1] sm:text-5xl">Comment se déroule une estimation</h2>
      <p class="mt-5 max-w-[45ch] text-muted">Quatre étapes, sans engagement. Vous décidez à chaque étape de poursuivre ou non.</p>
      <a href="/expertise-achat/estimation-gratuite" class="link mt-6 inline-flex items-center gap-2 font-semibold">Tout savoir sur l'estimation ${icon('arrow-right', 'size-4')}</a>
    </div>
    <div class="lg:col-span-8">${steps()}</div>
  </div>
</section>

<section aria-labelledby="florian-titre" class="on-deep bg-deep py-20 text-on-deep lg:py-28">
  <div class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
    <div class="lg:col-span-5">${portraitPlaceholder()}</div>
    <div class="lg:col-span-7 lg:pt-6">
      ${eyebrow('Présentation')}
      <h2 id="florian-titre" class="mt-4 max-w-[20ch] text-4xl leading-[1.1] sm:text-5xl">Florian Messeau, un métier de regard et de discrétion</h2>
      <div class="mt-6 max-w-[62ch] space-y-4 text-on-deep-muted">
        <p>Être antiquaire, c'est savoir regarder : reconnaître un bois, une patine, un geste d'artisan, et distinguer l'objet d'époque de la belle copie. Florian Messeau met cette exigence au service des familles, des collectionneurs et des notaires, partout au Maroc.</p>
        <p>Sa règle est simple : chaque prix est expliqué, chaque objet est traité avec le soin qu'il mérite, et rien de ce que vous lui confiez ne sort du cadre de votre demande.</p>
      </div>
      <div class="mt-12">${guarantees()}</div>
      <a href="/presentation" class="btn btn-secondary mt-12 min-h-12 px-6">Découvrir Florian Messeau ${icon('arrow-right')}</a>
    </div>
  </div>
</section>

<section aria-labelledby="zones-titre" class="py-20 lg:py-28">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
    <div class="lg:col-span-4">
      ${eyebrow('Zones d\'intervention')}
      <h2 id="zones-titre" class="mt-4 text-4xl leading-[1.1] sm:text-5xl">Antiquaire dans tout le Maroc</h2>
      <p class="mt-5 max-w-[45ch] text-muted">Florian Messeau se déplace à domicile dans tout le royaume pour examiner vos objets.</p>
    </div>
    <div class="lg:col-span-8">${linkList(VILLES.map((v) => ({ href: `/zones-intervention/${v.slug}`, label: `Antiquaire à ${v.ville}` })), 'sm:grid-cols-2')}</div>
  </div>
</section>

${faq(generalFaq)}
${ctaBand()}`;
  return {
    path: '/',
    title: 'Florian Messeau, antiquaire à Marrakech et partout au Maroc',
    description: 'Antiquaire et expert à Marrakech : estimation gratuite, expertise et achat d\'antiquités, tableaux, tapis, bijoux. Déplacement partout au Maroc.',
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
    h1: 'Florian Messeau, antiquaire et expert en objets d\'art',
    lead: 'Estimer juste, expliquer chaque décision, traiter chaque objet avec soin : voici la manière dont Florian Messeau exerce le métier d\'antiquaire, depuis Marrakech et partout au Maroc.',
    aside: portraitPlaceholder(),
  })}
<section aria-labelledby="parcours-titre" class="bg-band py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
    <h2 id="parcours-titre" class="text-4xl leading-[1.1] lg:col-span-4">Le parcours</h2>
    <div class="prose-site lg:col-span-8">
      <!-- Parcours redige sans dates ni references precises : a enrichir si des elements verifiables
           (formation, annee d'installation, affiliations) deviennent disponibles. -->
      <p>Voilà quelques années que Florian Messeau a fait des antiquités son métier. Une passion d'abord, née du goût des beaux objets et des histoires qu'ils portent, devenue au fil des rencontres une véritable expertise.</p>
      <p>Chaque estimation, chaque maison visitée, chaque pièce tenue en main a affûté son regard : reconnaître une essence de bois ou une patine d'origine, lire un poinçon, repérer la restauration discrète ou la copie habile. C'est ce savoir patiemment accumulé qu'il met aujourd'hui au service de ses clients.</p>
      <p>Installé à Marrakech, il sillonne tout le Maroc à la rencontre des familles, des collectionneurs et des professionnels. Il suit de près le marché de l'art et des antiquités, au Maroc comme en Europe, pour que chaque avis de valeur colle à la réalité des ventes du moment.</p>
      <p>Sa façon de travailler n'a pas changé depuis ses débuts : un seul interlocuteur du premier message jusqu'à l'enlèvement, des explications franches, et le respect absolu de la discrétion de chacun.</p>
    </div>
  </div>
</section>
<section aria-labelledby="methode-titre" class="py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
    <h2 id="methode-titre" class="text-4xl leading-[1.1] lg:col-span-4">La méthode</h2>
    <div class="lg:col-span-8">
      <dl class="grid gap-8 sm:grid-cols-2">
        ${[
    ['Regarder avant de chiffrer', 'Chaque objet est examiné : matériaux, techniques, marques, usure. Le prix vient après, jamais avant.'],
    ['Comparer au marché réel', 'Les estimations s\'appuient sur des ventes comparables récentes, en galerie et en ventes publiques.'],
    ['Expliquer', 'Vous savez pourquoi un objet vaut ce prix, et pourquoi un autre ne vaut pas ce que l\'on croyait.'],
    ['Laisser le choix', 'Estimer n\'oblige jamais à vendre. Vous décidez, à chaque étape.'],
  ].map(([t, d]) => `<div class="border-t border-control pt-5"><dt class="font-display text-2xl font-semibold">${t}</dt><dd class="mt-2 text-muted">${d}</dd></div>`).join('\n        ')}
      </dl>
    </div>
  </div>
</section>
<section aria-labelledby="engagements-titre" class="on-deep bg-deep py-16 text-on-deep lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
    <h2 id="engagements-titre" class="text-4xl leading-[1.1] lg:col-span-4">Les engagements</h2>
    <div class="lg:col-span-8">${guarantees()}</div>
  </div>
</section>
${ctaBand()}`;
  return {
    path: '/presentation', trail,
    title: 'Florian Messeau, antiquaire et expert au Maroc | Présentation',
    description: 'Découvrez Florian Messeau, antiquaire et expert en objets d\'art au Maroc : sa méthode d\'estimation, ses engagements d\'authenticité et de discrétion.',
    body,
    jsonld: [{ ...personNode(), description: 'Antiquaire et expert en objets d\'art au Maroc.' }],
  };
}

/* ---------- Expertise & achat ---------- */
function expertiseHub() {
  const trail = [HOME, { name: 'Expertise & achat', href: '/expertise-achat' }];
  const body = `
${pageHero({ kicker: 'Expertise & achat', h1: 'Expertise, estimation et achat d\'antiquités au Maroc', lead: 'Quatre services, un seul interlocuteur. Que vous souhaitiez connaître la valeur d\'un objet, obtenir un rapport écrit, vendre une pièce ou vider une maison, Florian Messeau vous accompagne.' })}
<section aria-label="Nos services" class="bg-band py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
    ${SERVICES.map((s) => `<article class="relative flex flex-col rounded-card border border-hairline bg-card p-6 sm:p-8">
      ${icon(s.icon, 'size-7 text-link')}
      <h2 class="mt-5 text-3xl leading-tight"><a href="/expertise-achat/${s.slug}" class="text-ink no-underline after:absolute after:inset-0 hover:text-link">${s.nav}</a></h2>
      <p class="mt-3 text-muted">${s.lead}</p>
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
    title: 'Expertise et achat d\'antiquités au Maroc | Florian Messeau',
    description: 'Estimation gratuite, rapport d\'expertise écrit, achat d\'antiquités, successions et débarras : les services de Florian Messeau au Maroc.',
    body,
    jsonld: [{ '@type': 'ItemList', name: 'Services', itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/expertise-achat/${s.slug}`), name: s.nav })) }],
  };
}

function servicePage(s) {
  const path = `/expertise-achat/${s.slug}`;
  const trail = [HOME, { name: 'Expertise & achat', href: '/expertise-achat' }, { name: s.nav, href: path }];
  const others = SERVICES.filter((x) => x !== s);
  const body = `
${pageHero({ kicker: 'Expertise & achat', h1: s.h1, lead: s.lead, aside: photo({ key: s.slug === 'succession-debarras' ? 'succession' : 'loupe', w: 800, h: 1000, ratio: '4/5', alt: s.slug === 'succession-debarras' ? 'Salon ancien meublé d\'antiquités avant un inventaire de succession' : 'Loupe d\'expert posée sur un objet d\'art ancien, près d\'une signature', note: s.slug === 'succession-debarras' ? 'Interieur de maison ou objets en cours d\'inventaire, sans personne identifiable' : 'Objet examine a la loupe, sans personne identifiable', fallback: s.nav.toLowerCase(), sizes: '(min-width: 1024px) 38vw, 92vw' }) })}
<section class="bg-band py-16 lg:py-24">
  <div class="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
    ${s.sections.map(([h, p, list], i) => `<div class="grid gap-6 lg:grid-cols-12">
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
${pageHero({ kicker: 'Objets recherchés', h1: 'Les objets que Florian Messeau recherche et achète', lead: 'Quinze familles d\'objets, de l\'ancien au contemporain. Pour chacune, découvrez ce qui est recherché, ce qui fait la valeur, et comment photographier votre objet pour un premier avis gratuit.' })}
<section aria-label="Catégories d'objets" class="bg-band py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
    ${OBJETS.map((o) => `<article class="group relative flex flex-col overflow-hidden rounded-card border border-hairline bg-card">
      ${photo({ key: o.img.key, w: 600, h: 450, ratio: '4/3', alt: o.img.alt, note: o.img.note, fallback: o.img.fallback, sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw', frameClass: 'rounded-none' })}
      <div class="flex flex-1 flex-col p-5">
        <h2 class="text-2xl leading-tight"><a href="/objets-recherches/${o.slug}" class="text-ink no-underline after:absolute after:inset-0 group-hover:text-link">${o.nav}</a></h2>
        <p class="mt-2 text-sm text-muted">${o.recherche.slice(0, 2).map((r) => r.replace(/ :.*$/, '').replace(/\s*\(.*?\)/g, '')).join(' · ')}</p>
      </div>
    </article>`).join('\n    ')}
  </div>
</section>
<section class="py-16">
  <div class="mx-auto max-w-3xl px-4 text-center sm:px-6">
    <h2 class="text-3xl">Votre objet n'est pas dans la liste ?</h2>
    <p class="mt-4 text-muted">Envoyez-en une photo : Florian Messeau vous dira s'il mérite une estimation. Beaucoup de belles découvertes commencent par un objet inclassable.</p>
    <a href="/contact" class="btn btn-primary mt-6 min-h-12 px-6">Envoyer une photo ${icon('arrow-right')}</a>
  </div>
</section>
${ctaBand()}`;
  return {
    path: '/objets-recherches', trail,
    title: 'Objets recherchés : ce que rachète Florian Messeau, antiquaire',
    description: 'Mobilier, pâte de verre, argenterie, bronzes, pendules, montres, bijoux, tableaux, tapis, sacs de luxe : les 15 familles d\'objets rachetés au Maroc.',
    body,
    jsonld: [{ '@type': 'ItemList', name: 'Objets recherchés', itemListElement: OBJETS.map((o, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/objets-recherches/${o.slug}`), name: o.nav })) }],
  };
}

function objetPage(o) {
  const path = `/objets-recherches/${o.slug}`;
  const trail = [HOME, { name: 'Objets recherchés', href: '/objets-recherches' }, { name: o.nav, href: path }];
  const body = `
${pageHero({ kicker: 'Objets recherchés', h1: o.h1, lead: o.intro, aside: photo({ key: o.img.key, w: 800, h: 1000, ratio: '4/5', alt: o.img.alt, note: o.img.note, fallback: o.img.fallback, sizes: '(min-width: 1024px) 38vw, 92vw' }) })}
<section class="bg-band py-16 lg:py-24">
  <div class="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
    <div class="grid gap-6 lg:grid-cols-12">
      <h2 class="text-3xl leading-tight sm:text-4xl lg:col-span-4">Ce que nous recherchons</h2>
      <ul class="grid gap-3 lg:col-span-8">
        ${o.recherche.map((r) => `<li class="flex items-start gap-3 text-muted">${icon('check', 'mt-1 size-4 flex-none text-link')}<span>${r}</span></li>`).join('\n        ')}
      </ul>
    </div>
    <div class="grid gap-6 lg:grid-cols-12">
      <h2 class="text-3xl leading-tight sm:text-4xl lg:col-span-4">Ce qui fait la valeur</h2>
      <dl class="grid gap-8 sm:grid-cols-2 lg:col-span-8">
        ${o.valeur.map(([t, d]) => `<div class="border-t border-control pt-5"><dt class="font-sans text-lg font-semibold">${t}</dt><dd class="mt-2 text-muted">${d}</dd></div>`).join('\n        ')}
      </dl>
    </div>
    <div class="grid gap-6 lg:grid-cols-12">
      <h2 class="text-3xl leading-tight sm:text-4xl lg:col-span-4">Faire estimer votre objet</h2>
      <div class="rounded-card border border-hairline bg-card p-6 sm:p-8 lg:col-span-8">
        <p class="flex items-start gap-3">${icon('camera', 'mt-0.5 size-5 flex-none text-link')}<span>${o.photos}</span></p>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href="${whatsappLink(`Bonjour Florian, je souhaite faire estimer : ${o.nav.toLowerCase()}.`)}" class="btn btn-primary min-h-12 px-6" rel="noopener" target="_blank">${icon('message')} Envoyer mes photos sur WhatsApp<span class="sr-only"> (nouvel onglet)</span></a>
          <a href="/contact" class="btn btn-secondary min-h-12 px-6">Autres moyens de contact</a>
        </div>
      </div>
    </div>
  </div>
</section>
${faq(o.faq)}
<section aria-labelledby="liens-titre" class="border-t border-hairline py-16">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 id="liens-titre" class="text-3xl">Florian Messeau recherche aussi</h2>
    <div class="mt-6">${linkList([...o.related.map((s) => ({ href: `/objets-recherches/${s}`, label: bySlug[s].nav })), { href: '/objets-recherches', label: 'Tous les objets recherchés' }], 'sm:grid-cols-2 lg:grid-cols-4')}</div>
  </div>
</section>
${ctaBand()}`;
  return { path, trail, title: o.title, description: o.description, body, jsonld: [serviceNode(`Achat et estimation : ${o.nav}`, path, o.description)] };
}

/* ---------- Zones d'intervention ---------- */
function zonesHub() {
  const trail = [HOME, { name: 'Zones d\'intervention', href: '/zones-intervention' }];
  const body = `
${pageHero({ kicker: 'Zones d\'intervention', h1: 'Antiquaire à domicile dans tout le Maroc', lead: `Basé à ${SITE.address.city}, Florian Messeau se déplace chez vous pour examiner vos objets, où que vous soyez au Maroc. Voici les villes où il intervient le plus souvent.` })}
<section aria-label="Villes" class="bg-band py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
    ${VILLES.map((v) => `<article class="relative flex flex-col rounded-card border border-hairline bg-card p-6">
      ${icon('map-pin', 'size-6 text-link')}
      <h2 class="mt-4 text-3xl"><a href="/zones-intervention/${v.slug}" class="text-ink no-underline after:absolute after:inset-0 hover:text-link">Antiquaire à ${v.ville}</a></h2>
      <p class="mt-2 text-sm text-muted">${v.quartiers.slice(0, 4).join(', ')}...</p>
    </article>`).join('\n    ')}
  </div>
</section>
<section class="py-16">
  <div class="mx-auto max-w-3xl px-4 text-center sm:px-6">
    <h2 class="text-3xl">Votre ville n'apparaît pas ?</h2>
    <p class="mt-4 text-muted">Florian Messeau se déplace aussi à Meknès, Essaouira, El Jadida, Oujda, Tétouan, Ouarzazate et partout ailleurs, dès que les objets le justifient.</p>
  </div>
</section>
${ctaBand()}`;
  return {
    path: '/zones-intervention', trail,
    title: 'Antiquaire à domicile dans tout le Maroc | Florian Messeau',
    description: 'Florian Messeau, antiquaire, se déplace à Marrakech, Casablanca, Rabat, Tanger, Fès, Agadir et partout au Maroc pour estimer et acheter vos antiquités.',
    body,
    jsonld: [{ '@type': 'ItemList', name: 'Zones d\'intervention', itemListElement: VILLES.map((v, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/zones-intervention/${v.slug}`), name: `Antiquaire à ${v.ville}` })) }],
  };
}

function villePage(v) {
  const path = `/zones-intervention/${v.slug}`;
  const trail = [HOME, { name: 'Zones d\'intervention', href: '/zones-intervention' }, { name: v.ville, href: path }];
  const body = `
${pageHero({ kicker: `Antiquaire à ${v.ville}`, h1: `Antiquaire et expert en objets d'art à ${v.ville}`, lead: v.lead })}
<section class="bg-band py-16 lg:py-24">
  <div class="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
    <div class="grid gap-6 lg:grid-cols-12">
      <h2 class="text-3xl leading-tight sm:text-4xl lg:col-span-4">Les antiquités à ${v.ville}</h2>
      <div class="prose-site lg:col-span-8">${v.contexte.map((p) => `<p>${p}</p>`).join('')}</div>
    </div>
    <div class="grid gap-6 lg:grid-cols-12">
      <h2 class="text-3xl leading-tight sm:text-4xl lg:col-span-4">Quartiers et environs</h2>
      <div class="lg:col-span-8">
        <ul class="flex flex-wrap gap-2" aria-label="Quartiers desservis à ${v.ville}">
          ${v.quartiers.map((q) => `<li class="rounded-pill border border-control px-4 py-1.5 text-sm">${q}</li>`).join('\n          ')}
        </ul>
        <p class="mt-5 text-muted">Examen à domicile sur rendez-vous, enlèvement et transport pris en charge.</p>
      </div>
    </div>
    <div class="grid gap-6 lg:grid-cols-12">
      <h2 class="text-3xl leading-tight sm:text-4xl lg:col-span-4">Souvent rencontrés à ${v.ville}</h2>
      <div class="lg:col-span-8">${linkList(v.objets.map((s) => ({ href: `/objets-recherches/${s}`, label: bySlug[s].nav })), 'sm:grid-cols-2')}</div>
    </div>
  </div>
</section>
<section aria-labelledby="services-ville" class="py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
    <h2 id="services-ville" class="text-3xl leading-tight sm:text-4xl lg:col-span-4">Services à ${v.ville}</h2>
    <div class="lg:col-span-8">${linkList(SERVICES.map((s) => ({ href: `/expertise-achat/${s.slug}`, label: s.nav })), 'sm:grid-cols-2')}</div>
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
  const tally = SITE.tallyFormId
    ? `<iframe data-tally-src="https://tally.so/embed/${SITE.tallyFormId}?alignLeft=1&amp;hideTitle=1&amp;transparentBackground=1&amp;dynamicHeight=1" loading="lazy" width="100%" height="700" title="Formulaire de demande d'estimation" class="w-full"></iframe>`
    : `<!-- FORMULAIRE TALLY (A REMPLACER une fois la charte validee) : renseigner tallyFormId dans src/site/config.mjs.
     L'iframe et le script Tally sont alors generes automatiquement a la place de ce bloc. -->
      <div>
        <h2 class="font-sans text-lg font-semibold">Le formulaire en ligne arrive bientôt</h2>
        <p class="mt-3 max-w-[56ch] text-muted">En attendant, contactez directement Florian Messeau. Décrivez votre objet et joignez quelques photos : vue d'ensemble, signature, poinçons, dessous et défauts éventuels.</p>
        <div class="mt-8 grid gap-3 sm:grid-cols-2">
          <a href="${whatsappLink()}" class="btn btn-primary min-h-12" rel="noopener" target="_blank">${icon('message')} Photos sur WhatsApp<span class="sr-only"> (nouvel onglet)</span></a>
          <a href="mailto:${SITE.email}?subject=${encodeURIComponent('Demande d\'estimation')}" class="btn btn-secondary min-h-12">${icon('mail')} Écrire un e-mail</a>
        </div>
      </div>`;
  const body = `
<section class="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pb-28 lg:pt-10">
  <div class="lg:col-span-5">
    ${eyebrow('Contact')}
    <h1 class="mt-5 text-[2.5rem] leading-[1.05] tracking-tight sm:text-6xl">Faire estimer un objet</h1>
    <p class="mt-6 max-w-[48ch] text-lg text-muted">Florian Messeau vous répond personnellement avec un premier avis, gratuit et sans engagement.</p>
    <ul class="mt-10 space-y-5">
      <li class="flex items-start gap-3">${icon('phone', 'mt-0.5 size-5 flex-none text-link')}<div><p class="font-semibold">Téléphone</p><a href="tel:${SITE.phone.e164}" class="link tabular-nums">${SITE.phone.display}</a></div></li>
      <li class="flex items-start gap-3">${icon('message', 'mt-0.5 size-5 flex-none text-link')}<div><p class="font-semibold">WhatsApp</p><a href="${whatsappLink()}" class="link tabular-nums" rel="noopener" target="_blank">${SITE.whatsapp.display}<span class="sr-only"> (nouvel onglet)</span></a></div></li>
      <li class="flex items-start gap-3">${icon('mail', 'mt-0.5 size-5 flex-none text-link')}<div><p class="font-semibold">E-mail</p><a href="mailto:${SITE.email}" class="link [overflow-wrap:anywhere]">${SITE.email}</a></div></li>
      <li class="flex items-start gap-3">${icon('map-pin', 'mt-0.5 size-5 flex-none text-link')}<div><p class="font-semibold">Galerie, sur rendez-vous</p><p class="text-muted">${SITE.address.street}<br>${SITE.address.postalCode} ${SITE.address.city}, ${SITE.address.countryName}</p></div></li>
      <li class="flex items-start gap-3">${icon('clock', 'mt-0.5 size-5 flex-none text-link')}<div><p class="font-semibold">Horaires</p><p class="text-muted">${SITE.hours.label}</p></div></li>
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
    title: 'Contact et estimation gratuite | Florian Messeau, antiquaire',
    description: 'Contactez Florian Messeau, antiquaire au Maroc : estimation gratuite par téléphone, WhatsApp ou e-mail. Envoyez vos photos, réponse rapide et personnalisée.',
    body,
    jsonld: [businessNode()],
    scripts: SITE.tallyFormId ? '  <script src="https://tally.so/widgets/embed.js" async></script>' : '',
  };
}

/* ---------- Pages legales et 404 ---------- */
const legal = (path, name, description, sections) => ({
  path, trail: [HOME, { name, href: path }], noindex: true, title: `${name} | Florian Messeau`, description,
  body: `<section class="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6">
  <h1 class="text-[2.5rem] leading-tight sm:text-5xl">${name}</h1>
  <!-- A REMPLACER : informations legales reelles, a faire valider par un professionnel du droit -->
  <div class="prose-site mt-10">${sections.map(([h, ...ps]) => `<h2>${h}</h2>${ps.map((p) => `<p>${p}</p>`).join('')}`).join('\n')}</div>
</section>`,
});

const mentions = () => legal('/mentions-legales', 'Mentions légales', 'Mentions légales du site de Florian Messeau, antiquaire et expert en objets d\'art au Maroc.', [
  ['Éditeur du site', 'Florian Messeau, [raison sociale], [forme juridique] au capital de [montant] MAD.', `Siège : ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, ${SITE.address.countryName}.`, 'RC : [numéro] · ICE : [numéro] · IF : [numéro] · Patente : [numéro].', `Téléphone : ${SITE.phone.display} · E-mail : ${SITE.email}.`, 'Directeur de la publication : Florian Messeau.'],
  ['Conception et réalisation', ...(() => {
    const r = SITE.realisation;
    return [
      `Site conçu et réalisé par ${r.name}${r.legalForm ? `, ${r.legalForm}` : ''}.`,
      [`SIREN : ${r.siren}`, r.rcs && `RCS : ${r.rcs}`].filter(Boolean).join(' · ') + '.',
      ...(r.address ? [`Siège : ${r.address}.`] : []),
    ];
  })()],
  ['Hébergement', 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.'],
  ['Propriété intellectuelle', 'Les textes, photographies et éléments graphiques de ce site sont la propriété de Florian Messeau ou de leurs auteurs. Toute reproduction sans autorisation écrite est interdite.'],
  ['Estimations', 'Les avis de valeur donnés à distance sont indicatifs. Seul l\'examen physique de l\'objet permet une estimation ou une offre ferme.'],
]);

const confidentialite = () => legal('/confidentialite', 'Politique de confidentialité', 'Politique de confidentialité et protection des données personnelles (loi 09-08) du site de Florian Messeau, antiquaire.', [
  ['Données collectées', 'Le formulaire de contact (service Tally) et les échanges par téléphone, WhatsApp ou e-mail recueillent votre nom, vos coordonnées, la description et les photos de votre objet.'],
  ['Finalité', 'Ces données servent uniquement à répondre à votre demande d\'estimation ou de contact. Elles ne sont ni vendues, ni publiées, ni transmises à des tiers à des fins commerciales.'],
  ['Sous-traitants', 'Formulaire : Tally (Tally BV, Belgique). Hébergement du site : Vercel Inc. (États-Unis).'],
  ['Durée de conservation', 'Vos données sont conservées [durée] après notre dernier échange, puis supprimées.'],
  ['Vos droits (loi 09-08)', `Vous disposez d\'un droit d\'accès, de rectification et d\'opposition. Écrivez à ${SITE.email}.`, 'Traitement déclaré auprès de la CNDP sous le numéro [numéro].'],
  ['Cookies', 'Ce site n\'utilise pas de cookie de mesure d\'audience ni de publicité.'],
]);

const notFound = () => ({
  path: '/404', noindex: true, title: 'Page introuvable | Florian Messeau, antiquaire', description: 'Cette page n\'existe pas ou a été déplacée.',
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
    contact(), mentions(), confidentialite(), notFound(),
  ];
}

export const footerContext = { objets: OBJETS, villes: VILLES, services: SERVICES };
