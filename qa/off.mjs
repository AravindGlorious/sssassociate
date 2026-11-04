import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: 'shell' });
for (const w of [1440, 1280, 1200, 360]) {
  const p = await b.newPage(); await p.setViewport({ width: w, height: 800 }); await p.goto('http://localhost:3141/', { waitUntil: 'networkidle2' });
  const r = await p.evaluate(() => ({ over: document.documentElement.scrollWidth - innerWidth, off: [...document.querySelectorAll('body *')].filter((e) => { const r = e.getBoundingClientRect(); return r.right > innerWidth + 0.5 && r.width > 0 && !e.closest('.hero') && getComputedStyle(e).position !== 'fixed'; }).slice(0, 6).map((e) => `${e.tagName}.${(e.className + '').slice(0, 40)} right=${Math.round(e.getBoundingClientRect().right)}`) }));
  console.log(w, JSON.stringify(r)); await p.close();
}
await b.close();
