#!/usr/bin/env node
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const articlesDir = join(__dirname, '../src/content/articles');
const imagesDir = join(__dirname, '../public/images/articles');

if (!existsSync(imagesDir)) mkdirSync(imagesDir, { recursive: true });

const articles = readdirSync(articlesDir).filter((f) => f.endsWith('.md'));

const colors = [
  ['#0158a1', '#4ade80'],
  ['#072849', '#7cc5fc'],
  ['#16a34a', '#dcfce9'],
  ['#0c8ce9', '#e0effe'],
];

articles.forEach((file, i) => {
  const slug = file.replace('.md', '');
  const [primary, secondary] = colors[i % colors.length];
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg-${i}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${primary}"/>
      <stop offset="100%" style="stop-color:${secondary}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="url(#bg-${i})"/>
  <path d="M80 350 L200 250 L320 300 L440 180 L560 220 L680 120 L720 150" stroke="white" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.6"/>
  <text x="40" y="60" font-family="system-ui,sans-serif" font-size="28" font-weight="700" fill="white" opacity="0.9">${title.length > 40 ? title.slice(0, 40) + '...' : title}</text>
  <text x="40" y="400" font-family="system-ui,sans-serif" font-size="16" fill="white" opacity="0.7">WealthHarbor Educational Guide</text>
</svg>`;

  writeFileSync(join(imagesDir, `${slug}.svg`), svg);
});

console.log(`Generated ${articles.length} article images`);

// Author placeholders
const authorsDir = join(__dirname, '../public/images/authors');
if (!existsSync(authorsDir)) mkdirSync(authorsDir, { recursive: true });

const authors = [
  { slug: 'sarah-mitchell', color: '#0158a1', initials: 'SM' },
  { slug: 'james-chen', color: '#16a34a', initials: 'JC' },
  { slug: 'priya-sharma', color: '#7c3aed', initials: 'PS' },
  { slug: 'michael-torres', color: '#ea580c', initials: 'MT' },
];

authors.forEach(({ slug, color, initials }) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Author avatar">
  <circle cx="48" cy="48" r="48" fill="${color}"/>
  <text x="48" y="56" font-family="system-ui,sans-serif" font-size="32" font-weight="700" fill="white" text-anchor="middle">${initials}</text>
</svg>`;
  writeFileSync(join(authorsDir, `${slug}.svg`), svg);
});

console.log(`Generated ${authors.length} author images`);
