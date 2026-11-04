#!/usr/bin/env node
// Usage: node scripts/seo-audit.mjs http://localhost:3000 [out.json]
// Crawls the sitemap + internal links of a RUNNING build and reports real, measured SEO facts.
import { writeFileSync } from 'node:fs';

const BASE = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '');
const OUT = process.argv[3];
// Production origin that canonicals/sitemap should use (the audit itself fetches from BASE).
const SITE = (process.env.SITE_URL ?? 'https://sss-associate.vercel.app').replace(/\/$/, '');
const get = (p, opts = {}) => fetch(BASE + p, { redirect: 'manual', ...opts });
const dec = (s = '') => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const meta = (h, attr, name) => { const m = h.match(new RegExp(`<meta[^>]+${attr}="${name}"[^>]*content="([^"]*)"`, 'i')) ?? h.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]*${attr}="${name}"`, 'i')); return m ? dec(m[1]) : ''; };
const pathOf = (u) => { try { const x = new URL(u, BASE + '/'); return x.origin === BASE || x.origin === SITE ? x.pathname + x.search : null; } catch { return null; } };

const robotsTxt = await (await get('/robots.txt')).text();
const disallow = [];
let ua = false;
for (const line of robotsTxt.split('\n')) { const [k, ...v] = line.split(':'); const val = v.join(':').trim(); if (/^user-agent$/i.test(k.trim())) ua = val === '*'; else if (ua && /^disallow$/i.test(k.trim()) && val) disallow.push(val); }
const blocked = (p) => disallow.some((d) => p.startsWith(d));

const sm = await (await get('/sitemap.xml')).text();
const sitemap = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => pathOf(m[1]) ?? m[1]);
const smSet = new Set(sitemap.map((p) => p.replace(/\/$/, '') || '/'));

// crawl
const queue = ['/', ...sitemap];
const seen = new Set();
const pages = [];
while (queue.length) {
  const p = queue.shift();
  const key = p.split('#')[0].replace(/(.)\/$/, '$1');
  if (seen.has(key)) continue;
  seen.add(key);
  const res = await get(key);
  const type = res.headers.get('content-type') ?? '';
  const row = { route: key, status: res.status, redirect: res.headers.get('location') ?? '', xRobots: res.headers.get('x-robots-tag') ?? '' };
  if (type.includes('text/html')) {
    const h = await res.text();
    const links = [...h.matchAll(/<a[^>]+href="([^"]+)"/g)].map((m) => pathOf(dec(m[1]))).filter(Boolean).map((l) => l.split('#')[0]).filter((l) => l && !/^\/(_next|images)\//.test(l) && !/\.(jpg|png|svg|ico|xml|txt)$/.test(l));
    links.forEach((l) => queue.push(l));
    row.links = [...new Set(links)];
    row.title = dec((h.match(/<title>([^<]*)<\/title>/) ?? [])[1] ?? '');
    row.description = meta(h, 'name', 'description');
    row.canonical = dec((h.match(/<link rel="canonical" href="([^"]+)"/) ?? [])[1] ?? '');
    row.robots = meta(h, 'name', 'robots');
    row.keywordsTag = !!meta(h, 'name', 'keywords');
    row.lang = (h.match(/<html[^>]*lang="([^"]+)"/) ?? [])[1] ?? '';
    row.h1 = (h.match(/<h1[\s>]/g) ?? []).length;
    row.h1Text = dec(((h.match(/<h1[^>]*>(.*?)<\/h1>/s) ?? [])[1] ?? '').replace(/<[^>]+>/g, ''));
    row.og = { title: !!meta(h, 'property', 'og:title'), description: !!meta(h, 'property', 'og:description'), image: !!meta(h, 'property', 'og:image'), url: meta(h, 'property', 'og:url') };
    row.twitter = meta(h, 'name', 'twitter:card');
    const imgs = [...h.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
    row.imgs = imgs.length; row.imgsNoAlt = imgs.filter((i) => !/\balt="/.test(i)).length; row.imgsNoSize = imgs.filter((i) => !/\bwidth="/.test(i) && !/data-nimg="fill"/.test(i)).length;
    row.schema = [];
    for (const m of h.matchAll(/application\/ld\+json">(.*?)<\/script>/gs)) { try { const j = JSON.parse(dec(m[1])); (Array.isArray(j) ? j : [j]).forEach((x) => row.schema.push(x['@type'])); } catch { row.schema.push('INVALID_JSON'); } }
    row.words = dec(h.replace(/<script.*?<\/script>|<style.*?<\/style>/gs, '').replace(/<[^>]+>/g, ' ')).split(/\s+/).filter(Boolean).length;
    row.indexable = res.status === 200 && !/noindex/i.test(row.robots + row.xRobots) && !blocked(key) && row.canonical.replace(/\/$/, '') === (SITE + key).replace(/\/$/, '');
  }
  pages.push(row);
}
const html = pages.filter((p) => p.title !== undefined);
// link check
const linkStatus = {};
for (const p of new Set(html.flatMap((x) => x.links))) { const k = p.replace(/(.)\/$/, '$1'); const r = pages.find((x) => x.route === k); linkStatus[p] = r ? r.status : (await get(p)).status; }
const brokenLinks = Object.entries(linkStatus).filter(([, s]) => s !== 200);
const dupes = (f) => { const c = {}; html.filter((p) => p.indexable).forEach((p) => (c[p[f]] ??= []).push(p.route)); return Object.entries(c).filter(([k, v]) => k && v.length > 1); };
const extra = {
  notFound: (await get('/this-page-does-not-exist')).status,
  apiGet: (await get('/api/contact')).status,
  robotsTxt, sitemapCount: sitemap.length,
};
const report = { base: BASE, pages: html.map(({ links, ...r }) => r), nonHtml: pages.filter((p) => p.title === undefined).map(({ route, status, redirect }) => ({ route, status, redirect })), dupes: { title: dupes('title'), description: dupes('description'), canonical: dupes('canonical'), h1: dupes('h1Text') }, brokenLinks, notInSitemapButIndexable: html.filter((p) => p.indexable && !smSet.has(p.route)).map((p) => p.route), inSitemapButNotIndexable: html.filter((p) => !p.indexable && smSet.has(p.route)).map((p) => p.route), extra };
if (OUT) writeFileSync(OUT, JSON.stringify(report, null, 1));
const pad = (s, n) => String(s).slice(0, n).padEnd(n);
console.log(pad('ROUTE', 44), pad('ST', 4), pad('IDX', 4), pad('TL', 3), pad('DL', 4), 'H1', 'ALT', 'SCHEMA');
for (const p of report.pages) console.log(pad(p.route, 44), pad(p.status, 4), pad(p.indexable ? 'Y' : 'N', 4), pad(p.title.length, 3), pad(p.description.length, 4), p.h1, p.imgsNoAlt === 0 ? ' ok' : ' NO', (p.schema ?? []).join(','));
console.log('\nnon-HTML:', JSON.stringify(report.nonHtml));
console.log('duplicates:', JSON.stringify(report.dupes));
console.log('broken links:', JSON.stringify(brokenLinks));
console.log('indexable but not in sitemap:', report.notInSitemapButIndexable, '| in sitemap but not indexable:', report.inSitemapButNotIndexable);
console.log('404 status:', extra.notFound, '| GET /api/contact:', extra.apiGet, '| keywords tag on pages:', report.pages.filter((p) => p.keywordsTag).length);
console.log('robots.txt:\n' + robotsTxt);
