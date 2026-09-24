#!/usr/bin/env node
// Assemble le site statique dans dist/ : pages HTML, JS, fichiers publics, puis CSS Tailwind.
// Seul dist/ est publie par Vercel, donc .claude/, src/ et scripts/ ne sont jamais servis.
import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');

rmSync(dist, { recursive: true, force: true });
mkdirSync(resolve(dist, 'assets'), { recursive: true });

for (const page of ['index.html', 'mentions-legales.html', 'confidentialite.html']) {
  cpSync(resolve(root, page), resolve(dist, page));
}
cpSync(resolve(root, 'assets/js'), resolve(dist, 'assets/js'), { recursive: true });
cpSync(resolve(root, 'public'), dist, { recursive: true });

execFileSync(
  resolve(root, 'node_modules/.bin/tailwindcss'),
  ['-i', 'src/styles.css', '-o', 'dist/assets/styles.css', '--minify'],
  { cwd: root, stdio: 'inherit' },
);

console.log('Build termine : dist/');
