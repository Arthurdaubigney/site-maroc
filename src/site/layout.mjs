// Gabarit commun a toutes les pages : <head> SEO, header, fil d'Ariane, pied de page, composants.
import { SITE, IMAGES } from './config.mjs';

export const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Empreintes des fichiers /assets (remplies par scripts/build.mjs) : l'URL change a chaque modification,
// le cache navigateur d'un an (vercel.json) ne sert donc jamais une ancienne version.
export const ASSET_HASH = {};
export const asset = (path) => (ASSET_HASH[path] ? `${path}?v=${ASSET_HASH[path]}` : path);

export const abs = (path) => SITE.url + (path === '/' ? '/' : path);
export const businessId = `${SITE.url}/#business`;
export const expertId = `${SITE.url}/#francois-secula`;

// La page Contact n'est pas dans le menu : le bouton « Faire estimer » (en-tete et menu mobile) y mene.
export const NAV = [
  { href: '/presentation', label: 'Présentation' },
  { href: '/expertise-achat', label: 'Expertise & achat' },
  { href: '/objets-recherches', label: 'Objets recherchés' },
  { href: '/zones-intervention', label: 'Zones d\'intervention' },
];

/* ---------- Icones (lucide, MIT) ---------- */
const ICONS = {
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  'arrow-right': '<path d="M5 12h14M12 5l7 7-7 7"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  banknote: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/>',
  home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  'shield-check': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
  truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  logo: '<path d="M18 52V30c0-9 6-16 14-18 8 2 14 9 14 18v22Z"/><path d="M25 52V33c0-5 3-9 7-10 4 1 7 5 7 10v19"/>',
};

const sprite = () => `<svg xmlns="http://www.w3.org/2000/svg" class="hidden" aria-hidden="true" focusable="false"><defs>
${Object.entries(ICONS).map(([id, body]) => id === 'logo'
    ? `<symbol id="i-logo" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round">${body}</symbol>`
    : `<symbol id="i-${id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${body}</symbol>`).join('\n')}
</defs></svg>`;

export const icon = (name, cls = 'size-5') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

/* ---------- Composants ---------- */

// Photo a dimensions exactes ; sans fichier, panneau zellige (aucun libelle visible).
// Une entree IMAGES peut etre une URL, ou un objet { src, small, alt, position } :
// small = petite variante (srcset), widths = [petite, grande] en px (defaut 448 / 896),
// alt = description reelle de la photo (prioritaire),
// position = cadrage object-position quand le format du cadre coupe la photo.
// variant = 'tile' : une entree IMAGES peut fournir un recadrage dedie aux vignettes ({ tile: { src, small, widths, position } }).
export function photo({ key, src, w, h, alt, note, fallback, ratio, priority = false, sizes = '(min-width: 1024px) 50vw, 92vw', frameClass = '', variant = '' }) {
  const raw = src ?? IMAGES[key];
  const base = typeof raw === 'string' ? { src: raw } : raw;
  const entry = variant && base?.[variant] ? { ...base, ...base[variant] } : base;
  if (!entry?.src) {
    return `<!-- Emplacement photo : ${note} (format ${w} x ${h} px). Deposer le fichier dans public/images/ puis renseigner IMAGES['${key}'] dans src/site/config.mjs. -->
<figure class="photo-frame is-missing aspect-[${ratio}] ${frameClass}">
  <div class="h-full w-full" aria-hidden="true"></div>
</figure>`;
  }
  const [sw, bw] = entry.widths ?? [448, 896];
  const srcset = entry.small ? ` srcset="${entry.small} ${sw}w, ${entry.src} ${bw}w" sizes="${sizes}"` : '';
  const style = entry.position ? ` style="object-position: ${entry.position}"` : '';
  return `<figure class="photo-frame aspect-[${ratio}] ${frameClass}">
  <img src="${entry.src}"${srcset} width="${w}" height="${h}" ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${style} alt="${esc(entry.alt ?? alt)}">
</figure>`;
}

// Tuile photo cliquable : l'image porte le titre (voile sombre pour la lecture).
export const tile = ({ href, title, sub = '', photoHtml, level = 'h3', size = 'md', cls = '' }) => `<article class="tile ${cls}">
  ${photoHtml}
  <div class="tile-body">
    <${level} class="${size === 'lg' ? 'text-2xl sm:text-4xl' : size === 'sm' ? 'text-base sm:text-lg' : 'text-base sm:text-xl lg:text-2xl'} leading-tight"><a href="${href}">${title}</a></${level}>
    ${sub ? `<p class="hidden text-sm text-on-deep-muted sm:block">${sub}</p>` : ''}
  </div>
</article>`;

export const eyebrow = (text) => `<p class="eyebrow">${text}</p>`;

// Carte photo : image au format choisi, titre dessous et fleche ; toute la carte est cliquable.
export const card = ({ href, title, sub = '', photoHtml, level = 'h3', cls = '' }) => `<article class="card-photo group ${cls}">
  ${photoHtml}
  <div class="mt-4 flex items-start justify-between gap-4">
    <div class="min-w-0">
      <${level} class="card-title text-base font-bold leading-snug transition-colors sm:text-lg"><a href="${href}">${title}</a></${level}>
      ${sub ? `<p class="mt-1 text-sm text-subtle">${sub}</p>` : ''}
    </div>
    ${icon('arrow-right', 'mt-1 size-5 flex-none text-accent transition-transform group-hover:translate-x-1')}
  </div>
</article>`;

// En-tete de section : surtitre, titre serif, lien optionnel a droite
export const sectionHead = ({ kicker, title, id, link = null, lead = '', deep = false }) => `<div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
  <div class="max-w-2xl">
    ${eyebrow(kicker)}
    <h2 id="${id}" class="mt-4 text-[2rem] leading-[1.1] sm:text-5xl">${title}</h2>
    ${lead ? `<p class="mt-5 max-w-[56ch] text-lg ${deep ? 'text-on-deep-muted' : 'text-muted'}">${lead}</p>` : ''}
  </div>
  ${link ? `<a href="${link.href}" class="${deep ? 'text-on-deep underline underline-offset-4 font-semibold' : 'link'} inline-flex flex-none items-center gap-2">${link.label} ${icon('arrow-right', 'size-4')}</a>` : ''}
</div>`;

export const breadcrumbs = (trail) => `<nav aria-label="Fil d'Ariane" class="border-b border-hairline bg-band">
  <ol class="mx-auto flex max-w-7xl flex-wrap items-center gap-x-2 gap-y-1 px-4 py-3 text-sm text-muted sm:px-6 lg:px-8">
    ${trail.map((c, i) => i < trail.length - 1
      ? `<li class="flex items-center gap-2"><a href="${c.href}" class="text-muted underline-offset-4 hover:text-ink hover:underline">${esc(c.name)}</a>${icon('chevron-right', 'size-4 text-subtle')}</li>`
      : `<li aria-current="page" class="font-semibold text-ink">${esc(c.name)}</li>`).join('\n    ')}
  </ol>
</nav>`;

export const faq = (items, { title = 'Questions fréquentes', id = 'faq' } = {}) => `<section id="${id}" aria-labelledby="${id}-titre" class="py-20 lg:py-28">
  <div class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
    <div class="lg:col-span-4">
      ${eyebrow('Vos questions')}
      <h2 id="${id}-titre" class="mt-4 text-[2rem] leading-[1.1] sm:text-5xl">${title}</h2>
      <p class="mt-5 text-muted">Une autre question ? <a href="/contact" class="link">Écrivez-nous</a> ou appelez le <a href="tel:${SITE.phone.e164}" class="link whitespace-nowrap">${SITE.phone.display}</a>.</p>
    </div>
    <div class="divide-y divide-hairline border-y border-hairline lg:col-span-8">
      ${items.map(([q, a]) => `<details class="faq-item">
        <summary><h3 class="faq-q text-lg transition-colors">${q}</h3>${icon('chevron-down', 'faq-icon size-5 flex-none text-accent')}</summary>
        <p class="max-w-[65ch] pb-6 text-muted">${a}</p>
      </details>`).join('\n      ')}
    </div>
  </div>
</section>`;

export const ctaBand = ({ title = 'Un objet à faire estimer ?', text = 'Décrivez votre objet à François Secula : avis gratuit, expertise rapide et déplacement gratuit partout au Maroc.' } = {}) => `<section aria-labelledby="cta-titre" class="on-deep zellige bg-deep text-on-deep">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8 lg:py-24">
    <div class="lg:col-span-7">
      ${eyebrow('Estimation gratuite')}
      <h2 id="cta-titre" class="mt-4 text-[2rem] leading-[1.1] sm:text-5xl">${title}</h2>
      <p class="mt-5 max-w-[52ch] text-lg text-on-deep-muted">${text}</p>
    </div>
    <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
      <a href="/contact" class="btn btn-primary px-4 sm:px-6">Estimation gratuite ${icon('arrow-right', 'size-4')}</a>
      <a href="tel:${SITE.phone.e164}" class="btn btn-secondary px-4 sm:px-6">${icon('phone', 'size-4')} ${SITE.phone.display}</a>
    </div>
  </div>
</section>`;

// Grille de liens vers d'autres pages (maillage interne)
export const linkList = (items, cols = 'sm:grid-cols-2 lg:grid-cols-3') => `<ul class="grid gap-px border border-hairline bg-hairline ${cols}">
  ${items.map((it) => `<li><a href="${it.href}" class="group flex h-full min-h-14 items-center justify-between gap-3 bg-card px-5 py-4 text-ink no-underline transition-colors hover:bg-band">
    <span class="font-semibold">${esc(it.label)}</span>${icon('arrow-right', 'size-4 flex-none text-accent transition-transform group-hover:translate-x-1')}
  </a></li>`).join('\n  ')}
</ul>`;

// En-tete de page interieure : bandeau rouge, titre serif, photo a droite
export const pageHero = ({ kicker, h1, lead, aside = '' }) => `<section class="on-deep zellige zellige-fade bg-deep text-on-deep">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-8 lg:py-20">
    <div class="${aside ? 'lg:col-span-7' : 'lg:col-span-9'}">
      ${eyebrow(kicker)}
      <h1 class="mt-5 max-w-[20ch] text-[2.5rem] leading-[1.08] sm:text-6xl">${h1}</h1>
      <p class="mt-6 max-w-[56ch] text-lg text-on-deep-muted">${lead}</p>
      <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href="/contact" class="btn btn-primary">Estimation gratuite ${icon('arrow-right', 'size-4')}</a>
        <a href="tel:${SITE.phone.e164}" class="btn btn-secondary">${icon('phone', 'size-4')} ${SITE.phone.display}</a>
      </div>
    </div>
    ${aside ? `<div class="lg:col-span-5">${aside}</div>` : ''}
  </div>
</section>`;

/* ---------- Header / footer ---------- */

const wordmark = (deep = false) => `<span class="flex min-w-0 flex-col leading-none">
  <span class="truncate font-display text-[1.375rem] font-semibold tracking-tight ${deep ? 'text-on-deep' : 'text-ink'}">François Secula</span>
  <span class="mt-1.5 truncate text-[0.6875rem] font-bold uppercase tracking-[0.24em] ${deep ? 'text-ornament' : 'text-accent'}">Antiquaire · Maroc</span>
</span>`;

function header(current) {
  const isCurrent = (href) => current === href || current.startsWith(href + '/');
  const desk = NAV.map((n) => `<li><a href="${n.href}" class="relative whitespace-nowrap px-2 py-2 text-[0.9375rem] font-semibold no-underline transition-colors hover:text-ink xl:px-3 ${isCurrent(n.href) ? 'text-ink after:absolute after:inset-x-2 after:-bottom-0.5 after:h-0.5 after:bg-action xl:after:inset-x-3' : 'text-muted'}"${isCurrent(n.href) ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('\n          ');
  const mob = NAV.map((n) => `<li><a href="${n.href}" class="flex min-h-14 items-center justify-between border-b border-hairline font-display text-2xl no-underline ${isCurrent(n.href) ? 'text-link' : 'text-ink'}"${isCurrent(n.href) ? ' aria-current="page"' : ''}>${n.label}${icon('arrow-right', 'size-5 text-accent')}</a></li>`).join('\n          ');
  return `<div class="on-deep bg-deeper text-sm text-on-deep-muted">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
      <p class="hidden items-center gap-2 sm:flex">${icon('map-pin', 'size-4 flex-none text-ornament')}Antiquaire français installé au Maroc · Déplacement gratuit dans tout le royaume</p>
      <p class="flex items-center gap-5"><span class="hidden lg:inline">Expertise rapide, avis gratuit</span><a href="tel:${SITE.phone.e164}" class="inline-flex min-h-6 items-center gap-2 font-semibold text-on-deep no-underline hover:underline">${icon('phone', 'size-4 text-ornament')}${SITE.phone.display}</a></p>
    </div>
  </div>
  <header class="sticky top-0 z-40 border-b border-hairline bg-page">
    <div class="mx-auto flex h-header max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <!-- A REMPLACER : logo definitif une fois la charte validee -->
      <a href="/" class="flex min-w-0 items-center gap-3 rounded-control no-underline xl:flex-none"${current === '/' ? ' aria-current="page"' : ''}>
        ${icon('logo', 'size-10 flex-none text-accent')}
        ${wordmark()}
      </a>
      <nav aria-label="Navigation principale" class="hidden xl:block">
        <ul class="flex items-center gap-1">
          ${desk}
        </ul>
      </nav>
      <div class="flex flex-none items-center gap-2">
        <a href="/contact" class="btn btn-primary hidden whitespace-nowrap md:inline-flex">Faire estimer</a>
        <button type="button" class="btn btn-secondary px-3 xl:hidden" aria-expanded="false" aria-controls="menu-mobile" data-menu-toggle>
          <svg class="size-5" aria-hidden="true" data-menu-icon="open"><use href="#i-menu"/></svg>
          <svg class="hidden size-5" aria-hidden="true" data-menu-icon="close"><use href="#i-x"/></svg>
          <span class="sr-only" data-menu-label>Ouvrir le menu</span>
        </button>
      </div>
    </div>
    <div id="menu-mobile" class="border-t border-hairline bg-page xl:hidden" hidden>
      <nav aria-label="Navigation mobile" class="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <ul class="flex flex-col">
          ${mob}
        </ul>
        <div class="mt-6 flex flex-col gap-3">
          <a href="/contact" class="btn btn-primary w-full">Faire estimer un objet</a>
          <a href="tel:${SITE.phone.e164}" class="btn btn-secondary w-full">${icon('phone', 'size-4')} ${SITE.phone.display}</a>
        </div>
      </nav>
    </div>
  </header>`;
}

function footer({ objets, villes, services }) {
  const a = (href, label) => `<li><a href="${href}" class="inline-block py-1.5 leading-snug text-on-deep-muted no-underline hover:text-on-deep hover:underline">${esc(label)}</a></li>`;
  const col = (title, items, cls) => `<nav aria-label="${esc(title)}" class="${cls}">
        <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-ornament">${title}</h3>
        <ul class="mt-4 text-sm">${items.join('')}</ul>
      </nav>`;
  return `<div class="bg-deeper py-3" aria-hidden="true"><div class="zellige-frieze"></div></div>
  <footer class="on-deep bg-deeper text-on-deep" aria-labelledby="footer-titre">
    <h2 id="footer-titre" class="sr-only">Informations, coordonnées et plan du site</h2>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-8 border-b border-on-deep-muted/20 py-12 lg:flex-row lg:items-center lg:justify-between">
        <a href="/" class="inline-flex items-center gap-3 rounded-control no-underline">${icon('logo', 'size-10 text-ornament')}${wordmark(true)}</a>
        <p class="max-w-[46ch] text-sm text-on-deep-muted lg:text-end">${SITE.tagline}. Estimation, expertise et rachat d'antiquités auprès des particuliers, à domicile dans tout le Maroc, déplacement gratuit.</p>
      </div>
      <div class="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-ornament">Bureaux</h3>
          <!-- A REMPLACER : NAP reel (voir src/site/config.mjs) -->
          <address class="mt-4 space-y-3 text-sm not-italic text-on-deep-muted">
            <p>François Secula<br>${SITE.address.street ? `${SITE.address.street}<br>${SITE.address.postalCode} ` : ''}${SITE.address.city}, ${SITE.address.countryName}</p>
            <p>Déplacement gratuit dans tout le Maroc</p>
            <p><a href="tel:${SITE.phone.e164}" class="tabular-nums text-on-deep underline underline-offset-4 hover:decoration-2">${SITE.phone.display}</a></p>
          </address>
        </div>
        ${col('Expertise & achat', [a('/expertise-achat', 'Tous nos services'), ...services.map((s) => a(`/expertise-achat/${s.slug}`, s.nav))], 'lg:col-span-2')}
        ${col('Objets recherchés', objets.map((o) => a(`/objets-recherches/${o.slug}`, o.nav)), 'lg:col-span-3')}
        ${col('Antiquaire au Maroc', villes.map((v) => a(`/zones-intervention/${v.slug}`, `Antiquaire à ${v.ville}`)), 'lg:col-span-2')}
        ${col('Informations', [a('/presentation', 'Présentation'), a('/contact', 'Contact et estimation'), a('/mentions-legales', 'Mentions légales'), a('/confidentialite', 'Confidentialité'), a('/sitemap.xml', 'Plan du site')], 'lg:col-span-2')}
      </div>
    </div>
    <div class="border-t border-on-deep-muted/20">
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-on-deep-muted sm:px-6 md:flex-row md:justify-between lg:px-8">
        <p>&copy; <span data-year>2026</span> François Secula, antiquaire et expert en objets d'art au Maroc. Tous droits réservés.</p>
        <p>Marrakech, Casablanca, Rabat, Tanger, Fès, Agadir et tout le Maroc.</p>
      </div>
    </div>
  </footer>`;
}

/* ---------- Document complet ---------- */

export function renderPage(page, ctx) {
  const { path, title, description, body, jsonld = [], trail, noindex = false, ogImage } = page;
  const canonical = abs(path);
  const img = ogImage ?? (IMAGES.og ? abs(IMAGES.og) : null);
  const graph = [...jsonld];
  if (trail) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.href) })),
    });
  }
  graph.push({
    '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: title, description,
    isPartOf: { '@id': `${SITE.url}/#website` }, about: { '@id': businessId }, inLanguage: 'fr-MA',
  });

  return `<!doctype html>
<html lang="fr-MA">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
  <meta name="theme-color" content="#8B1E1A" media="(prefers-color-scheme: light)"> <!-- ds-allow-hardcode : meta theme-color exige une valeur litterale -->
  <meta name="theme-color" content="#120706" media="(prefers-color-scheme: dark)"> <!-- ds-allow-hardcode : meta theme-color exige une valeur litterale -->
  <meta name="format-detection" content="telephone=no">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="fr_MA">
  <meta property="og:site_name" content="François Secula, antiquaire">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  ${img ? `<meta property="og:image" content="${esc(img)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">` : `<!-- Image de partage a renseigner : 1200 x 630 px (IMAGES.og dans src/site/config.mjs) -->
  <meta name="twitter:card" content="summary">`}
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&amp;family=Playfair+Display:wght@500;600;700&amp;display=swap">
  <link rel="stylesheet" href="${asset('/assets/styles.css')}">
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
${page.head ?? ''}
</head>
<body class="bg-page text-ink">
  ${sprite()}
  <a href="#contenu" class="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-card focus:px-4 focus:py-3 focus:text-ink focus:shadow-overlay">Aller au contenu</a>
  ${header(path)}
  <main id="contenu" tabindex="-1">
${trail ? breadcrumbs(trail) : ''}
${body}
  </main>
  ${footer(ctx)}
  <script src="${asset('/assets/js/main.js')}" defer></script>
${page.scripts ?? ''}
</body>
</html>
`;
}
