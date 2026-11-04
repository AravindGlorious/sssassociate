import chromium from '@sparticuz/chromium'; import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: 'shell' });
for (const path of ['/services/legal-opinion', '/services/one-time-settlement', '/']) {
  const p = await b.newPage(); await p.setViewport({ width: 412, height: 823, deviceScaleFactor: 2, isMobile: true });
  await p.setCacheEnabled(false);
  const cdp = await p.createCDPSession(); await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 }); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.evaluateOnNewDocument(() => { window.__cls = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls.push({ v: +e.value.toFixed(3), t: Math.round(e.startTime), src: (e.sources || []).map((s) => (s.node?.nodeName || '') + '.' + (s.node?.className || '').toString().slice(0, 30) + ' ' + JSON.stringify(s.previousRect?.y) + '->' + JSON.stringify(s.currentRect?.y)) }); }).observe({ type: 'layout-shift', buffered: true }); });
  await p.goto('http://localhost:3140' + path, { waitUntil: 'networkidle0' }); await new Promise((r) => setTimeout(r, 1000));
  const r = await p.evaluate(() => window.__cls); console.log(path, 'total', r.reduce((a, x) => a + x.v, 0).toFixed(3), JSON.stringify(r).slice(0, 700)); await p.close();
}
await b.close();
