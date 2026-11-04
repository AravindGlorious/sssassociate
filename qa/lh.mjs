import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core'; import lighthouse from 'lighthouse'; import fs from 'node:fs';
const targets = (process.env.TARGETS ?? '/').split(','); const preset = process.env.PRESET ?? 'mobile';
const b = await puppeteer.launch({ args: [...chromium.args, '--remote-debugging-port=9333'], executablePath: await chromium.executablePath(), headless: 'shell' });
for (const t of targets) {
  const cfg = preset === 'desktop' ? { extends: 'lighthouse:default', settings: { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false }, throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 } } } : undefined;
  const r = await lighthouse('http://localhost:3140' + t, { port: 9333, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] }, cfg);
  const c = r.lhr.categories, a = r.lhr.audits;
  console.log(preset, t, JSON.stringify({ perf: Math.round(c.performance.score * 100), a11y: Math.round(c.accessibility.score * 100), bp: Math.round(c['best-practices'].score * 100), seo: Math.round(c.seo.score * 100) }), 'LCP', a['largest-contentful-paint'].displayValue, 'CLS', a['cumulative-layout-shift'].displayValue, 'TBT', a['total-blocking-time'].displayValue, 'FCP', a['first-contentful-paint'].displayValue);
  const fails = Object.values(a).filter((x) => x.score !== null && x.score < 0.9 && x.scoreDisplayMode !== 'informative' && x.scoreDisplayMode !== 'notApplicable' && x.scoreDisplayMode !== 'manual').map((x) => `${x.id}:${x.score}`); console.log('   below 0.9:', fails.slice(0, 10).join(', '));
}
await b.close();
