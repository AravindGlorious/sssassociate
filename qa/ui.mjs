import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core'; import fs from 'node:fs';
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);
const axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const OK = process.env.OK_URL ?? 'http://localhost:3141', NOKEY = process.env.NOKEY_URL ?? 'http://localhost:3140';
const b = await puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: 'shell' });
const sizes = (process.env.WIDTHS ?? '1440,1280,768,390,360').split(',').map((w) => [Number(w), Number(w) > 700 ? 900 : 800]);
const pages = ['/', '/about', '/services', '/property-services', '/services/legal-opinion', '/services/one-time-settlement', '/contact', '/blog', '/disclaimer'];
const out = { layout: [], axe: {}, console: [], broken: [], small: {} };
for (const [w, h] of sizes) {
  const p = await b.newPage(); await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) out.console.push(`${w} ${m.type()} ${m.text().slice(0, 150)}`); });
  p.on('pageerror', (e) => out.console.push(`${w} PAGEERROR ${e.message.slice(0, 150)}`));
  p.on('requestfailed', (r) => out.console.push(`${w} REQFAIL ${r.url().slice(0, 100)}`));
  for (const path of pages) {
    await p.goto(OK + path, { waitUntil: 'networkidle2', timeout: 30000 });
    const r = await p.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      brokenImgs: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src.slice(-50)),
      small: [...document.querySelectorAll('a,button,input,select,textarea,summary')].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && (r.width < 24 || r.height < 24) && !e.closest('[aria-hidden="true"]') && !(e.classList.contains('sr-only')); }).map((e) => (e.textContent || e.getAttribute('aria-label') || e.name || '').trim().slice(0, 30) + `(${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)})`),
    }));
    out.layout.push({ w, path, overflow: r.overflow }); if (r.brokenImgs.length) out.broken.push({ w, path, imgs: r.brokenImgs }); if (r.small.length) (out.small[`${w}${path}`] = r.small);
    if ((w === 1280 || w === 390) && ['/', '/services/legal-opinion', '/contact', '/services', '/about'].includes(path)) {
      await p.evaluate(axeSrc); const res = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] })).violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, ex: v.nodes[0].target.join(' ').slice(0, 80) })));
      out.axe[`${w}${path}`] = res;
    }
    if ([390, 1440].includes(w) && ['/', '/services/legal-opinion', '/contact'].includes(path)) await p.screenshot({ path: `/tmp/shot-${w}-${path.replace(/\W+/g, '_')}.png`, fullPage: false });
  }
  await p.close();
}
console.log('OVERFLOW >0:', JSON.stringify(out.layout.filter((l) => l.overflow > 0)));
console.log('layout checks:', out.layout.length, '| broken images:', JSON.stringify(out.broken));
console.log('console/network issues:', JSON.stringify([...new Set(out.console)].slice(0, 15)));
console.log('AXE:'); for (const [k, v] of Object.entries(out.axe)) console.log(' ', k, v.length ? JSON.stringify(v) : 'no violations');
const smallAgg = {}; Object.entries(out.small).forEach(([k, v]) => v.forEach((x) => (smallAgg[x.replace(/\(.*/, '') + ' ' + x.match(/\(.*/)] = (smallAgg[x.replace(/\(.*/, '') + ' ' + x.match(/\(.*/)] || 0) + 1)));
console.log('targets <24px:', JSON.stringify(Object.entries(smallAgg).slice(0, 12)));

if (!process.env.INTERACT) { await b.close(); process.exit(0); }
// ---------- interaction tests
const p = await b.newPage(); await p.setViewport({ width: 390, height: 844 });
await p.goto(OK + '/'); await p.click('.menu-btn'); const navOpen = await p.$eval('#main-nav', (n) => getComputedStyle(n).display !== 'none'); console.log('mobile menu opens:', navOpen, '| links in menu:', await p.$$eval('#main-nav a', (a) => a.length));
await p.setViewport({ width: 1440, height: 900 }); await p.goto(OK + '/');
await p.focus('#main-nav > li:nth-child(4) > a'); const dd = await p.$eval('#main-nav > li:nth-child(4) > .dropdown', (d) => getComputedStyle(d).visibility); console.log('desktop dropdown opens on keyboard focus:', dd === 'visible');
// service-page form
await p.goto(OK + '/services/legal-opinion'); console.log('service preselected:', await p.$eval('#service', (s) => s.value), '| options:', await p.$$eval('#service option', (o) => o.length - 1));
await p.click('button[type=submit]'); console.log('empty submit errors:', await p.$$eval('[id$="-err"]', (e) => e.length), '| focus on:', await p.evaluate(() => document.activeElement?.id));
await p.type('#name', 'Test User'); await p.type('#phone', '12345'); await p.type('#message', 'I need a legal opinion on a plot.'); await p.click('input[name=consent]'); await p.click('button[type=submit]');
console.log('bad mobile message:', await p.$eval('#phone-err', (e) => e.textContent.slice(0, 40)));
await p.evaluate(() => { window.__wa = []; window.open = (u) => { window.__wa.push(u); return null; }; });
await p.click('button[type=button]:not(.menu-btn)', {}).catch(()=>{});
const btns = await p.$$eval('button', (bs) => bs.map((x) => x.textContent.trim()));
await p.$eval('#phone', (e) => (e.value = '')); await p.type('#phone', '98765 43210');
await p.evaluate(() => [...document.querySelectorAll('button')].find((x) => x.textContent.includes('WhatsApp')).click());
const wa = await p.evaluate(() => window.__wa.at(-1)); console.log('whatsapp url:', decodeURIComponent(wa ?? 'NONE').replace(/\n/g, ' | '));
await p.click('button[type=submit]'); await p.waitForSelector('[role=status]', { timeout: 8000 }).catch(() => {}); console.log('success shown after real 200:', await p.$eval('[role=status]', (e) => e.textContent.slice(0, 45)).catch(() => 'NO'));
// double-submit guard
await p.goto(OK + '/contact?service=property-registration'); console.log('query preselect:', await p.$eval('#service', (s) => s.value));
await p.type('#name', 'Double Click'); await p.type('#phone', '9876543210'); await p.type('#message', 'Double click test message'); await p.click('input[name=consent]');
await p.evaluate(() => { const b = document.querySelector('button[type=submit]'); b.click(); b.click(); b.click(); }); await new Promise((r) => setTimeout(r, 1500));
console.log('mock log entries total:', fs.readFileSync('/tmp/mock.log', 'utf8').trim().split('\n').length, '(expect 2: one earlier success + one for double click test)');
// no-key server
await p.goto(NOKEY + '/services/property-registration'); await p.type('#name', 'No Key'); await p.type('#phone', '9876543210'); await p.type('#message', 'Testing without email config'); await p.click('input[name=consent]'); await p.click('button[type=submit]');
await p.waitForSelector('[role=alert]', { timeout: 8000 }); const txt = await p.$eval('form', (f) => f.innerText); console.log('no-key: alert shown:', /could not send your enquiry by email/.test(txt), '| success shown:', /enquiry has been sent/.test(txt), '| form data kept:', await p.$eval('#name', (e) => e.value), '| whatsapp btn present:', /Send on WhatsApp/.test(txt), '| "not set up" text:', /not set up/.test(txt));
await b.close();
