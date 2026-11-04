#!/usr/bin/env node
/**
 * Production-readiness checks against a RUNNING build.
 *   node scripts/production-check.mjs http://localhost:3000 [--api] [--expect-no-key]
 * Run from the project root. Exits 1 if any check fails.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const BASE = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '');
const FLAGS = new Set(process.argv.slice(3));
const SITE = (process.env.SITE_URL ?? 'https://sss-associate.vercel.app').replace(/\/$/, '');
const BIZ = { email: 'sssassociateservices@gmail.com', tels: ['+919385954338', '+919087853733'], wa: '919385954338', phoneText: ['+91 93859 54338', '+91 90878 53733'] };
const results = [];
const check = (id, ok, detail = '') => { results.push({ id, ok, detail }); if (!ok) console.log(`  FAIL ${id}: ${detail}`); };
const get = (p, o = {}) => fetch(BASE + p, { redirect: 'manual', ...o });
const dec = (s = '') => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const meta = (h, a, n) => { const m = h.match(new RegExp(`<meta[^>]+${a}="${n}"[^>]*content="([^"]*)"`, 'i')); return m ? dec(m[1]) : ''; };
const toPath = (u) => { try { const x = new URL(dec(u), BASE + '/'); return [BASE, SITE].includes(x.origin) ? x.pathname : null; } catch { return null; } };

// ---------- expected route set (from source of truth)
const svc = readFileSync('src/data/services.ts', 'utf8');
const slugs = [...svc.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);
const core = ['/', '/about', '/services', '/legal-services', '/property-services', '/financial-services', '/contact'];
const policy = ['/privacy-policy', '/terms', '/disclaimer'];
const expected = [...core, ...slugs.map((s) => `/services/${s}`), ...policy];
check('23 services defined', slugs.length === 23, String(slugs.length));
check('33 intended indexable URLs', expected.length === 33, String(expected.length));

// ---------- sitemap
const smRes = await get('/sitemap.xml'); const sm = await smRes.text();
const smPaths = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => { const u = new URL(m[1]); check(`sitemap origin ${u.pathname}`, u.origin === SITE, u.origin); return u.pathname; });
check('sitemap 200', smRes.status === 200);
check('sitemap == 33 expected URLs', smPaths.length === 33 && expected.every((p) => smPaths.includes(p)) && smPaths.every((p) => expected.includes(p)), `${smPaths.length} urls; missing ${expected.filter((p) => !smPaths.includes(p))}; extra ${smPaths.filter((p) => !expected.includes(p))}`);
check('sitemap has no /blog and no /api', !smPaths.some((p) => p.startsWith('/blog') || p.startsWith('/api')));
const rb = await (await get('/robots.txt')).text();
check('robots.txt allows / and sitemap URL', /Allow: \//.test(rb) && rb.includes(`Sitemap: ${SITE}/sitemap.xml`) && !/Disallow: \/(_next|images|fonts)?\s*$/m.test(rb), rb.replace(/\n/g, ' | '));
check('robots.txt disallows only /api/', (rb.match(/Disallow:.*/g) ?? []).join() === 'Disallow: /api/');

// ---------- pages
const pages = {}; const titles = new Map(); const descs = new Map();
for (const p of [...expected, '/blog']) {
  const r = await get(p); const h = await r.text(); pages[p] = h;
  const title = dec((h.match(/<title>([^<]*)<\/title>/) ?? [])[1] ?? ''); const d = meta(h, 'name', 'description');
  const canon = dec((h.match(/<link rel="canonical" href="([^"]+)"/) ?? [])[1] ?? ''); const robots = meta(h, 'name', 'robots');
  check(`${p} status 200`, r.status === 200, String(r.status));
  check(`${p} title 25-65 chars`, title.length >= 25 && title.length <= 66, `${title.length}: ${title}`);
  check(`${p} description 120-165 chars`, d.length >= 120 && d.length <= 165, `${d.length}`);
  check(`${p} canonical self`, canon === SITE + (p === '/' ? '' : p), canon);
  check(`${p} og+twitter`, !!meta(h, 'property', 'og:title') && !!meta(h, 'property', 'og:description') && meta(h, 'property', 'og:image').startsWith(SITE) && meta(h, 'name', 'twitter:card') === 'summary_large_image');
  check(`${p} one h1`, (h.match(/<h1[\s>]/g) ?? []).length === 1);
  check(`${p} lang en-IN`, /<html[^>]*lang="en-IN"/.test(h));
  check(`${p} no keywords tag`, !/name="keywords"/.test(h));
  check(`${p} x-robots-tag not noindex`, !/noindex/i.test(r.headers.get('x-robots-tag') ?? ''));
  if (p === '/blog') check('/blog is noindex (no published articles)', /noindex/.test(robots) && !smPaths.includes('/blog'), robots);
  else check(`${p} index,follow`, robots === 'index, follow', robots);
  const imgs = [...h.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]); check(`${p} images have alt`, imgs.every((i) => /\balt="/.test(i)));
  if (p !== '/blog') { titles.set(title, [...(titles.get(title) ?? []), p]); descs.set(d, [...(descs.get(d) ?? []), p]); }
}
check('titles unique', [...titles.values()].every((v) => v.length === 1), JSON.stringify([...titles].filter(([, v]) => v.length > 1)));
check('descriptions unique', [...descs.values()].every((v) => v.length === 1), JSON.stringify([...descs].filter(([, v]) => v.length > 1).map(([, v]) => v)));

// ---------- 404, API, redirects
const nf = await get('/definitely-not-a-page'); const nfh = await nf.text();
check('404 status + noindex', nf.status === 404 && /noindex/.test(meta(nfh, 'name', 'robots')) && !/index, follow/.test(nfh));
check('GET /api/contact is 405', (await get('/api/contact')).status === 405);
const rd = await get('/services/loan-assistance'); check('old slug 308/301 to new', [301, 308].includes(rd.status) && rd.headers.get('location') === '/services/private-bank-loan-assistance', `${rd.status} ${rd.headers.get('location')}`);
const ts = await get('/about/'); check('trailing slash redirects to clean URL', [301, 308].includes(ts.status) && ts.headers.get('location') === '/about', `${ts.status} ${ts.headers.get('location')}`);
check('unknown service slug is 404', (await get('/services/nope')).status === 404);

// ---------- links, contact details
const linkSet = new Set(); const tels = new Set(), mails = new Set(), was = new Set(); const dev = [];
for (const [p, h] of Object.entries(pages)) {
  for (const m of h.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = dec(m[1]);
    if (href.startsWith('tel:')) tels.add(href.slice(4)); else if (href.startsWith('mailto:')) mails.add(href.slice(7).split('?')[0]); else if (/wa\.me/.test(href)) was.add(href);
    else { const q = toPath(href); if (q !== null && !/^\/(_next|images|fonts)\//.test(q)) linkSet.add(q.replace(/(.)\/$/, '$1')); }
  }
  if (/localhost|127\.0\.0\.1|lorem ipsum|undefined|\[object Object\]|NaN</i.test(h.replace(/<script[\s\S]*?<\/script>/g, ''))) dev.push(p);
}
const bad = []; for (const l of linkSet) { const r = await get(l); if (r.status !== 200) bad.push(`${l}:${r.status}`); }
check(`internal links all 200 (${linkSet.size} checked)`, bad.length === 0, bad.join(', '));
check('tel: links only the two business numbers', [...tels].every((t) => BIZ.tels.includes(t)) && BIZ.tels.every((t) => tels.has(t)), [...tels].join(' '));
check('mailto: only the business email', [...mails].every((m) => m === BIZ.email) && mails.size === 1, [...mails].join(' '));
check('wa.me links all use the business number', [...was].every((w) => new RegExp(`^https://wa\\.me/${BIZ.wa}(\\?text=.*)?$`).test(w)) && was.size > 0, `${was.size} links`);
check('no localhost/lorem/undefined text in rendered pages', dev.length === 0, dev.join(', '));
const nap = []; for (const [p, h] of Object.entries(pages)) {
  const text = dec(h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
  const phones = text.match(/\+91 \d{5} \d{5}/g) ?? []; if (phones.some((x) => !BIZ.phoneText.includes(x))) nap.push(`${p} phone ${phones}`);
  if (/\b\d{5} \d{5}\b/.test(text.replace(/\+91 \d{5} \d{5}/g, '').replace(/e\.g\. \d{5} \d{5}/g, ''))) nap.push(`${p} stray number`);
  const em = text.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? []; if (em.some((x) => x !== BIZ.email)) nap.push(`${p} email ${em}`);
  if (!text.includes('9, Gandhi Nagar') || !text.includes('641103') || !text.includes('SSS ASSOCIATE')) nap.push(`${p} missing name/address in footer`);
  if (!BIZ.phoneText.every((x) => text.includes(x))) nap.push(`${p} missing phone`);
}
check('name/address/phones/email consistent on every page', nap.length === 0, nap.join(' | '));

// ---------- JSON-LD
const ld = [];
for (const [p, h] of Object.entries(pages)) {
  const blocks = [...h.matchAll(/application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(dec(m[1])); } catch { check(`${p} JSON-LD parses`, false); return null; } }).filter(Boolean);
  const flat = blocks.flatMap((b) => (Array.isArray(b) ? b : [b])); const ids = flat.map((x) => x['@id']).filter(Boolean);
  check(`${p} JSON-LD ids unique`, new Set(ids).size === ids.length, ids.join());
  const biz = flat.filter((x) => x['@type'] === 'ProfessionalService'); check(`${p} exactly one business entity`, biz.length === 1);
  const b = biz[0]; if (b) check(`${p} business NAP in JSON-LD`, b.name === 'SSS ASSOCIATE' && JSON.stringify(b.telephone) === JSON.stringify(BIZ.tels) && b.email === BIZ.email && b.address?.postalCode === '641103' && b.address?.addressLocality === 'Coimbatore' && !('aggregateRating' in b) && !('review' in b) && !('openingHours' in b) && !('openingHoursSpecification' in b) && !('priceRange' in b) && !('geo' in b));
  const str = JSON.stringify(flat); check(`${p} JSON-LD urls use production origin`, !/localhost|127\.0\.0\.1/.test(str) && [...str.matchAll(/"(?:url|item|@id|logo|image)":"(https?:[^"]+)"/g)].every((m) => m[1].startsWith(SITE) || m[1].startsWith('https://www.google.com/maps')));
  const bc = flat.find((x) => x['@type'] === 'BreadcrumbList'); if (p !== '/' && bc) { const items = bc.itemListElement; check(`${p} breadcrumb valid`, items.every((it, i) => it.position === i + 1 && it.name && it.item) && items.at(-1).item === SITE + p, items.map((i) => i.item).join(' > ')); }
  if (p.startsWith('/services/')) { const s = flat.find((x) => x['@type'] === 'Service'); check(`${p} Service schema`, !!s && s.url === SITE + p && s.provider?.['@id'] === b?.['@id'] && !('offers' in s) && !('aggregateRating' in s)); }
  ld.push(flat.length);
}

// ---------- headers
for (const p of ['/', '/services/legal-opinion', '/images/hero.jpg', '/fonts/inter-latin-wght-normal.woff2', '/api/contact']) {
  const r = await get(p); const hd = (n) => r.headers.get(n);
  check(`${p} security headers`, hd('x-content-type-options') === 'nosniff' && hd('x-frame-options') === 'SAMEORIGIN' && hd('referrer-policy') === 'strict-origin-when-cross-origin' && !!hd('permissions-policy') && !hd('x-powered-by'), `${hd('x-content-type-options')}|${hd('x-frame-options')}|${hd('referrer-policy')}|${hd('x-powered-by')}`);
}

// ---------- source / repo hygiene
const walk = (d, out = []) => { for (const f of readdirSync(d)) { if (['node_modules', '.next', '.git'].includes(f)) continue; const p = join(d, f); statSync(p).isDirectory() ? walk(p, out) : out.push(p); } return out; };
const files = walk('.'); const text = files.filter((f) => /\.(ts|tsx|mjs|cjs|js|json|md|css|example|svg)$/.test(f) || f.endsWith('.gitignore'));
const secrets = []; const devRefs = [];
for (const f of text) { if (f.endsWith('production-check.mjs')) continue; const s = readFileSync(f, 'utf8'); if (/re_[A-Za-z0-9_]{20,}|sk_(live|test)_|AKIA[0-9A-Z]{12,}|-----BEGIN [A-Z ]*PRIVATE KEY|RESEND_API_KEY\s*=\s*[^\s#]+/.test(s)) secrets.push(f);
  if (f.startsWith('src') && /localhost|127\.0\.0\.1|lorem ipsum|TODO|FIXME|test-key|xxx@|example\.com/i.test(s)) devRefs.push(f); }
check('no secrets/keys in repo files', secrets.length === 0, secrets.join(', '));
check('no localhost/TODO/placeholder/test credentials in src/', devRefs.length === 0, devRefs.join(', '));
check('only .env.example is present (no .env files)', files.filter((f) => /(^|\/)\.env/.test(f)).every((f) => f.endsWith('.env.example')), files.filter((f) => /\.env/.test(f)).join());
check('.gitignore excludes .env*.local, node_modules, .next', ['.env*.local', 'node_modules', '.next'].every((x) => readFileSync('.gitignore', 'utf8').includes(x)));
check('.env.example has no values for secrets', /RESEND_API_KEY=\s*$/m.test(readFileSync('.env.example', 'utf8')));
check('no NEXT_PUBLIC_ secret variables', !/NEXT_PUBLIC_[A-Z_]*(KEY|SECRET|TOKEN)/.test(text.map((f) => readFileSync(f, 'utf8')).join('\n').replace(/RESEND_API_KEY/g, '')));
const staticChunks = existsSync('.next/static') ? walk('.next/static').filter((f) => /\.(js|css)$/.test(f)) : [];
check('no API key reference in browser bundles', staticChunks.every((f) => !/RESEND_API_KEY|api\.resend\.com/.test(readFileSync(f, 'utf8'))), `${staticChunks.length} chunks scanned`);

// ---------- API (never sends real email: only invalid / honeypot / GET cases, plus the no-key case)
if (FLAGS.has('--api')) {
  const post = (b, h = {}) => get('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json', ...h }, body: JSON.stringify(b) });
  const ok = { name: 'Check Runner', phone: '9876543210', email: '', service: '', message: 'This is an automated check message.', consent: true };
  for (const [n, patch] of [['bad mobile', { phone: '12345' }], ['landline-style 5xxxx', { phone: '5876543210' }], ['bad email', { email: 'nope' }], ['unknown service', { service: 'x' }], ['short message', { message: 'hi' }], ['no consent', { consent: false }], ['no name', { name: '' }]]) { const r = await post({ ...ok, ...patch }); check(`API rejects ${n}`, r.status === 400, String(r.status)); }
  const hp = await post({ ...ok, website: 'http://spam' }); check('API honeypot returns silent 200 (no email attempted)', hp.status === 200);
  const xo = await post(ok, { origin: 'https://evil.example' }); check('API rejects cross-origin', xo.status === 403, String(xo.status));
  if (FLAGS.has('--expect-no-key')) { const r = await post(ok); const j = await r.json(); check('no key: 503 email_unavailable, never ok:true', r.status === 503 && j.code === 'email_unavailable' && !j.ok, `${r.status} ${JSON.stringify(j)}`); }
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed against ${BASE}${failed.length ? '' : '  (all green)'}`);
if (failed.length) { console.log('FAILED:\n' + failed.map((f) => ` - ${f.id}: ${f.detail}`).join('\n')); process.exit(1); }
