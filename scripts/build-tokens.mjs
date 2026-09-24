#!/usr/bin/env node
// Genere src/tokens.css depuis design-tokens.json (source unique du theme).
// Couleurs semantiques -> --color-<groupe>-<nom> ; mode sombre via
// prefers-color-scheme ET [data-theme="dark"] (forcage manuel ou tests).
// Tokens "system" -> --ds-<groupe>-<nom>.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(resolve(root, 'design-tokens.json'), 'utf8'));

function lookup(path) {
  let node = tokens;
  for (const key of path.split('.')) {
    node = node?.[key];
    if (node === undefined) throw new Error(`Alias introuvable : {${path}}`);
  }
  return node;
}

function resolveValue(value, depth = 0) {
  if (depth > 10) throw new Error(`Alias circulaire : ${value}`);
  const alias = typeof value === 'string' && value.match(/^\{(.+)\}$/);
  return alias ? resolveValue(lookup(alias[1]).$value, depth + 1) : value;
}

// Aplatit un groupe DTCG en [[chemin, valeur]], en ignorant les cles $meta.
function flatten(group, prefix = []) {
  return Object.entries(group).flatMap(([key, node]) => {
    if (key.startsWith('$')) return [];
    if (node && typeof node === 'object' && '$value' in node) return [[[...prefix, key], resolveValue(node.$value)]];
    return flatten(node, [...prefix, key]);
  });
}

const decl = (entries, prefix) =>
  entries.map(([path, value]) => `  --${prefix}${path.join('-')}: ${value};`).join('\n');

const light = decl(flatten(tokens.semantic), 'color-');
const dark = decl(flatten(tokens.dark), 'color-');
const system = decl(flatten(tokens.system), 'ds-');

const css = `/* Fichier genere par scripts/build-tokens.mjs depuis design-tokens.json. Ne pas editer. */
:root {
  color-scheme: light dark;
${light}
${system}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${dark.replace(/^/gm, '  ')}
  }
}

:root[data-theme="dark"] {
${dark}
}
`;

writeFileSync(resolve(root, 'src/tokens.css'), css);
console.log(`tokens.css : ${flatten(tokens.semantic).length} couleurs, ${flatten(tokens.system).length} tokens systeme`);
