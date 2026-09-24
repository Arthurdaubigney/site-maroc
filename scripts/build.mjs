#!/usr/bin/env node
// Genere le site statique dans dist/ : une page HTML par entree de src/site/pages.mjs,
// sitemap.xml, robots.txt et llms.txt derives des memes donnees, puis le CSS Tailwind.
// Seul dist/ est publie par Vercel : .claude/, src/ et scripts/ ne sont jamais servis.
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from '../src/site/config.mjs';
import { renderPage, abs } from '../src/site/layout.mjs';
import { allPages, footerContext } from '../src/site/pages.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
rmSync(dist, { recursive: true, force: true });
mkdirSync(resolve(dist, 'assets'), { recursive: true });

const pages = allPages();
const seen = new Set();
for (const page of pages) {
  if (seen.has(page.path)) throw new Error(`Chemin en double : ${page.path}`);
  seen.add(page.path);
  // "/" -> index.html ; "/a/b" -> a/b.html (servi en /a/b grace a cleanUrls)
  const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`;
  const out = resolve(dist, file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, renderPage(page, footerContext));
}

const indexable = pages.filter((p) => !p.noindex);
writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${SITE.lastmod}</lastmod></url>`).join('\n')}
</urlset>
`);

writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`);

const section = (title, prefix) => indexable.filter((p) => p.path.startsWith(prefix) && p.path !== prefix)
  .map((p) => `- [${p.title.split(' | ')[0]}](${abs(p.path)}): ${p.description}`).join('\n');
writeFileSync(resolve(dist, 'llms.txt'), `# ${SITE.name}, antiquaire au Maroc

> ${SITE.tagline}. Estimation gratuite, expertise, achat d'antiquités et d'objets d'art, successions et inventaires, avec déplacement à domicile dans tout le Maroc.

- [Accueil](${abs('/')})
- [Présentation de Florian Messeau](${abs('/presentation')})
- [Contact et estimation](${abs('/contact')}) : formulaire de demande d'estimation (téléphone ${SITE.phone.display})

## Services
${section('Services', '/expertise-achat')}

## Objets recherchés
${section('Objets', '/objets-recherches')}

## Zones d'intervention
${section('Villes', '/zones-intervention')}
`);

cpSync(resolve(root, 'assets/js'), resolve(dist, 'assets/js'), { recursive: true });
cpSync(resolve(root, 'public'), dist, { recursive: true });

execFileSync(resolve(root, 'node_modules/.bin/tailwindcss'), ['-i', 'src/styles.css', '-o', 'dist/assets/styles.css', '--minify'], { cwd: root, stdio: 'inherit' });
console.log(`Build termine : ${pages.length} pages (${indexable.length} indexables) dans dist/`);
