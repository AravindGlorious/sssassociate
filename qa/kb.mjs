import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: 'shell' });
const p = await b.newPage(); await p.setViewport({ width: 1440, height: 900 }); await p.goto('http://localhost:3141/', { waitUntil: 'networkidle2' });
await p.mouse.click(5, 5);
let found = false;
for (let i = 0; i < 25; i++) { await p.keyboard.press('Tab'); const t = await p.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 30)); if (t === 'Property Services') { found = true; break; } }
await new Promise((r) => setTimeout(r, 500));
const vis = await p.evaluate(() => { const li = document.activeElement.closest('li'); const d = li.querySelector('.dropdown'); const r = d.getBoundingClientRect(); const cs = getComputedStyle(d); return { visibility: cs.visibility, opacity: cs.opacity, items: d.querySelectorAll('a').length, h: Math.round(r.height) }; });
console.log('tabbed to Property Services:', found, JSON.stringify(vis));
await p.keyboard.press('Tab'); const next = await p.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 30)); console.log('next Tab focus (dropdown item expected):', next);
await b.close();
