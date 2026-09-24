// Gabarit commun a toutes les pages : <head> SEO, header, fil d'Ariane, pied de page, composants.
import { SITE, IMAGES, whatsappLink } from './config.mjs';

export const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const abs = (path) => SITE.url + (path === '/' ? '/' : path);
export const businessId = `${SITE.url}/#business`;
export const expertId = `${SITE.url}/#florian-messeau`;

export const NAV = [
  { href: '/presentation', label: 'Présentation' },
  { href: '/expertise-achat', label: 'Expertise & achat' },
  { href: '/objets-recherches', label: 'Objets recherchés' },
  { href: '/zones-intervention', label: 'Zones d\'intervention' },
  { href: '/contact', label: 'Contact' },
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

// Photo a dimensions exactes, avec commentaire de remplacement et repli "Photo a venir".
export function photo({ key, src, w, h, alt, note, fallback, ratio, priority = false, sizes = '(min-width: 1024px) 50vw, 92vw', frameClass = '' }) {
  const base = src ?? IMAGES[key];
  const q = (ww, hh) => `${base}?auto=format&amp;fit=crop&amp;w=${ww}&amp;h=${hh}&amp;q=80`;
  const srcset = base.startsWith('http') ? ` srcset="${q(Math.round(w / 2), Math.round(h / 2))} ${Math.round(w / 2)}w, ${q(w, h)} ${w}w" sizes="${sizes}"` : '';
  const url = base.startsWith('http') ? q(w, h) : base;
  return `<!-- PHOTO COMMERCIAL : ${note} (format ${w} x ${h} px). Mettre a jour le alt. -->
<figure class="photo-frame aspect-[${ratio}] ${frameClass}">
  <img src="${url}"${srcset} width="${w}" height="${h}" ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" alt="${esc(alt)}">
  <figcaption class="photo-fallback">Photo à venir : ${esc(fallback)}</figcaption>
</figure>`;
}

export const eyebrow = (text) => `<p class="eyebrow">${text}</p>`;

export const breadcrumbs = (trail) => `<nav aria-label="Fil d'Ariane" class="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
  <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
    ${trail.map((c, i) => i < trail.length - 1
      ? `<li class="flex items-center gap-2"><a href="${c.href}" class="link">${esc(c.name)}</a>${icon('chevron-right', 'size-4 text-subtle')}</li>`
      : `<li aria-current="page" class="text-ink">${esc(c.name)}</li>`).join('\n    ')}
  </ol>
</nav>`;

export const faq = (items, { title = 'Questions fréquentes', id = 'faq' } = {}) => `<section id="${id}" aria-labelledby="${id}-titre" class="py-16 lg:py-24">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
    <div class="lg:col-span-4">
      ${eyebrow('Vos questions')}
      <h2 id="${id}-titre" class="mt-4 text-4xl leading-[1.1]">${title}</h2>
    </div>
    <div class="divide-y divide-hairline border-y border-hairline lg:col-span-8">
      ${items.map(([q, a]) => `<details class="faq-item">
        <summary><h3 class="faq-q font-sans text-lg font-semibold transition-colors">${q}</h3>${icon('chevron-down', 'faq-icon size-5 flex-none text-muted')}</summary>
        <p class="max-w-[65ch] pb-6 text-muted">${a}</p>
      </details>`).join('\n      ')}
    </div>
  </div>
</section>`;

export const ctaBand = ({ title = 'Un objet à faire estimer ?', text = 'Envoyez quelques photos à Florian Messeau : premier avis gratuit, sans engagement et en toute discrétion.' } = {}) => `<section aria-labelledby="cta-titre" class="on-deep bg-deep text-on-deep">
  <div class="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8 lg:py-20">
    <div class="lg:col-span-7">
      <h2 id="cta-titre" class="text-4xl leading-[1.1] sm:text-5xl">${title}</h2>
      <p class="mt-4 max-w-[56ch] text-on-deep-muted">${text}</p>
    </div>
    <div class="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
      <a href="/contact" class="btn btn-primary min-h-12 px-6">Demander une estimation ${icon('arrow-right')}</a>
      <a href="${whatsappLink()}" class="btn btn-secondary min-h-12 px-6" rel="noopener" target="_blank">${icon('message')} WhatsApp<span class="sr-only"> (nouvel onglet)</span></a>
    </div>
  </div>
</section>`;

// Grille de liens vers d'autres pages (maillage interne)
export const linkList = (items, cols = 'sm:grid-cols-2 lg:grid-cols-3') => `<ul class="grid gap-3 ${cols}">
  ${items.map((it) => `<li><a href="${it.href}" class="group flex min-h-14 items-center justify-between gap-3 rounded-control border border-hairline bg-card px-4 py-3 text-ink no-underline transition-colors hover:border-control">
    <span class="font-medium">${esc(it.label)}</span>${icon('arrow-right', 'size-4 flex-none text-link transition-transform group-hover:translate-x-0.5')}
  </a></li>`).join('\n  ')}
</ul>`;

// En-tete de page interieure (H1 + chapo)
export const pageHero = ({ kicker, h1, lead, aside = '' }) => `<section class="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-8 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pb-20 lg:pt-10">
  <div class="${aside ? 'lg:col-span-7' : 'lg:col-span-9'}">
    ${eyebrow(kicker)}
    <h1 class="mt-5 max-w-[20ch] text-[2.5rem] leading-[1.05] tracking-tight sm:text-6xl">${h1}</h1>
    <p class="mt-6 max-w-[60ch] text-lg text-muted">${lead}</p>
    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
      <a href="/contact" class="btn btn-primary min-h-12 px-6">Demander une estimation gratuite ${icon('arrow-right')}</a>
      <a href="tel:${SITE.phone.e164}" class="btn btn-secondary min-h-12 px-6">${icon('phone')} ${SITE.phone.display}</a>
    </div>
  </div>
  ${aside ? `<div class="lg:col-span-5">${aside}</div>` : ''}
</section>`;

/* ---------- Header / footer ---------- */

function header(current) {
  const isCurrent = (href) => current === href || current.startsWith(href + '/');
  const desk = NAV.map((n) => `<li><a href="${n.href}" class="whitespace-nowrap rounded-control px-2 py-2 no-underline transition-colors hover:text-ink xl:px-3 ${isCurrent(n.href) ? 'text-ink underline decoration-link decoration-2 underline-offset-8' : 'text-muted'}"${isCurrent(n.href) ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('\n          ');
  const mob = NAV.map((n) => `<li><a href="${n.href}" class="flex min-h-12 items-center border-b border-hairline font-display text-2xl no-underline ${isCurrent(n.href) ? 'text-link' : 'text-ink'}"${isCurrent(n.href) ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('\n          ');
  return `<header class="sticky top-0 z-40 border-b border-hairline bg-page">
    <div class="mx-auto flex h-header max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <!-- A REMPLACER : logo definitif une fois la charte validee -->
      <a href="/" class="flex min-w-0 items-center gap-3 rounded-control text-ink no-underline xl:flex-none"${current === '/' ? ' aria-current="page"' : ''}>
        ${icon('logo', 'size-9 flex-none text-link')}
        <span class="flex min-w-0 flex-col leading-tight">
          <span class="truncate font-display text-2xl font-semibold">Florian Messeau</span>
          <span class="hidden truncate text-xs uppercase tracking-[0.2em] text-muted sm:block">Antiquaire · Maroc</span>
        </span>
      </a>
      <nav aria-label="Navigation principale" class="hidden xl:block">
        <ul class="flex items-center gap-0.5">
          ${desk}
        </ul>
      </nav>
      <div class="flex flex-none items-center gap-2">
        <a href="${whatsappLink()}" class="btn btn-secondary px-3 xl:hidden 2xl:inline-flex 2xl:px-4" rel="noopener" target="_blank">
          ${icon('message')}<span class="sr-only 2xl:not-sr-only">WhatsApp</span><span class="sr-only"> (ouvre WhatsApp dans un nouvel onglet)</span>
        </a>
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
        <div class="mt-5 flex flex-col gap-3">
          <a href="/contact" class="btn btn-primary w-full">Faire estimer un objet</a>
          <a href="tel:${SITE.phone.e164}" class="btn btn-secondary w-full">${icon('phone')} Appeler le ${SITE.phone.display}</a>
        </div>
      </nav>
    </div>
  </header>`;
}

function footer({ objets, villes, services }) {
  const a = (href, label) => `<li><a href="${href}" class="inline-block py-2 leading-snug text-on-deep-muted no-underline hover:text-on-deep hover:underline">${esc(label)}</a></li>`;
  const col = (title, items, cls) => `<nav aria-label="${esc(title)}" class="${cls}">
        <h3 class="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-ornament">${title}</h3>
        <ul class="mt-3 text-sm">${items.join('')}</ul>
      </nav>`;
  return `<footer class="on-deep bg-deep text-on-deep" aria-labelledby="footer-titre">
    <h2 id="footer-titre" class="sr-only">Informations, coordonnées et plan du site</h2>
    <div class="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
      <div class="lg:col-span-3">
        <a href="/" class="inline-flex items-center gap-3 rounded-control text-on-deep no-underline">
          ${icon('logo', 'size-9 text-ornament')}
          <span class="font-display text-2xl font-semibold">Florian Messeau</span>
        </a>
        <p class="mt-4 max-w-[34ch] text-sm text-on-deep-muted">${SITE.tagline}. Achat, vente, estimation et expertise d'antiquités, partout au Maroc.</p>
        <!-- A REMPLACER : NAP reel (voir src/site/config.mjs) -->
        <address class="mt-6 space-y-3 text-sm not-italic text-on-deep-muted">
          <p class="flex items-start gap-3">${icon('map-pin', 'mt-0.5 size-5 flex-none text-ornament')}<span>Florian Messeau<br>${SITE.address.street}<br>${SITE.address.postalCode} ${SITE.address.city}, ${SITE.address.countryName}</span></p>
          <p class="flex items-center gap-3">${icon('phone', 'size-5 flex-none text-ornament')}<a href="tel:${SITE.phone.e164}" class="tabular-nums text-on-deep underline underline-offset-4 hover:decoration-2">${SITE.phone.display}</a></p>
          <p class="flex items-center gap-3">${icon('message', 'size-5 flex-none text-ornament')}<a href="${whatsappLink()}" class="tabular-nums text-on-deep underline underline-offset-4 hover:decoration-2" rel="noopener" target="_blank">${SITE.whatsapp.display} (WhatsApp)<span class="sr-only">, nouvel onglet</span></a></p>
          <p class="flex items-center gap-3">${icon('mail', 'size-5 flex-none text-ornament')}<a href="mailto:${SITE.email}" class="text-on-deep underline underline-offset-4 [overflow-wrap:anywhere] hover:decoration-2">${SITE.email}</a></p>
          <p class="flex items-start gap-3">${icon('clock', 'mt-0.5 size-5 flex-none text-ornament')}<span>${SITE.hours.label}</span></p>
        </address>
      </div>
      ${col('Expertise & achat', [a('/expertise-achat', 'Tous nos services'), ...services.map((s) => a(`/expertise-achat/${s.slug}`, s.nav))], 'lg:col-span-2')}
      ${col('Objets recherchés', objets.map((o) => a(`/objets-recherches/${o.slug}`, o.nav)), 'lg:col-span-3 lg:columns-1')}
      ${col('Antiquaire au Maroc', villes.map((v) => a(`/zones-intervention/${v.slug}`, `Antiquaire à ${v.ville}`)), 'lg:col-span-2')}
      ${col('Informations', [a('/presentation', 'Présentation'), a('/contact', 'Contact'), a('/mentions-legales', 'Mentions légales'), a('/confidentialite', 'Confidentialité'), a('/sitemap.xml', 'Plan du site')], 'lg:col-span-2')}
    </div>
    <div class="border-t border-on-deep-muted/20">
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-on-deep-muted sm:px-6 md:flex-row md:justify-between lg:px-8">
        <p>&copy; <span data-year>2026</span> Florian Messeau, antiquaire au Maroc. Tous droits réservés.</p>
        <p>Déplacements à Marrakech, Casablanca, Rabat, Tanger, Fès, Agadir et dans tout le Maroc.</p>
      </div>
    </div>
  </footer>`;
}

/* ---------- Document complet ---------- */

export function renderPage(page, ctx) {
  const { path, title, description, body, jsonld = [], trail, noindex = false, ogImage } = page;
  const canonical = abs(path);
  const img = ogImage ?? `${IMAGES.og}?auto=format&fit=crop&w=1200&h=630&q=80`;
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
  <meta name="theme-color" content="#FBF8F3" media="(prefers-color-scheme: light)"> <!-- ds-allow-hardcode : meta theme-color exige une valeur litterale -->
  <meta name="theme-color" content="#15110E" media="(prefers-color-scheme: dark)"> <!-- ds-allow-hardcode : meta theme-color exige une valeur litterale -->
  <meta name="format-detection" content="telephone=no">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="fr_MA">
  <meta property="og:site_name" content="Florian Messeau, antiquaire">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <!-- PHOTO COMMERCIAL : image de partage 1200 x 630 px, a deposer dans public/images/og-image.jpg puis a referencer dans src/site/config.mjs -->
  <meta property="og:image" content="${esc(img)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&amp;family=Work+Sans:wght@400;500;600&amp;display=swap">
  <link rel="stylesheet" href="/assets/styles.css">
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
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
  <script src="/assets/js/main.js" defer></script>
${page.scripts ?? ''}
</body>
</html>
`;
}
