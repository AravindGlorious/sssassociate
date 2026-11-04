// Generates one distinct illustration (SVG) per service into public/images/services/.
// Replace any file with a real photograph of the same name (e.g. .jpg) and update imagePath() if desired.
const fs = require('fs');
const path = require('path');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const L = require('lucide-react');

const defs = {
  'legal-opinion': ['ScrollText', 'Scale', 'FileText', 'Search'],
  'panel-advocate-opinion': ['Users', 'BadgeCheck', 'ScrollText', 'Landmark'],
  'english-tamil-legal-opinion': ['Languages', 'ScrollText', 'Users', 'FileText'],
  'agricultural-land-legal-opinion': ['Sprout', 'Wheat', 'Map', 'ScrollText'],
  'house-site-legal-opinion': ['LandPlot', 'House', 'Ruler', 'ScrollText'],
  'property-litigation': ['Gavel', 'Scale', 'Building2', 'FileText'],
  'litigation-resolution': ['Handshake', 'Scale', 'FileSignature', 'Users'],
  'old-document-verification': ['FileSearch', 'Search', 'FileText', 'Link2'],
  'legal-document-translation': ['BookText', 'Languages', 'FileText', 'BadgeCheck'],
  'english-to-tamil-translation': ['FileInput', 'Languages', 'BookText', 'ArrowLeftRight'],
  'tamil-to-english-translation': ['FileOutput', 'Languages', 'BookText', 'ArrowLeftRight'],
  'property-opinion': ['Building2', 'Search', 'ScrollText', 'ShieldCheck'],
  'property-registration': ['Stamp', 'House', 'FileSignature', 'Landmark'],
  'patta-transfer-registration': ['ArrowLeftRight', 'FileSpreadsheet', 'KeyRound', 'Map'],
  'sale-deed-preparation-verification': ['FileSignature', 'Search', 'House', 'Stamp'],
  'encumbrance-certificate': ['ShieldCheck', 'FileSearch', 'Landmark', 'FileText'],
  'patta-chitta-services': ['FileSpreadsheet', 'Map', 'Ruler', 'FileText'],
  'property-approval-assistance': ['ClipboardCheck', 'Building2', 'Stamp', 'Compass'],
  'survey-number-issues': ['Compass', 'Ruler', 'Map', 'LandPlot'],
  'financial-opinion': ['TrendingUp', 'Coins', 'ScrollText', 'Scale'],
  'bank-litigation-settlement': ['Landmark', 'Gavel', 'Handshake', 'FileText'],
  'one-time-settlement': ['IndianRupee', 'Handshake', 'FileSignature', 'Landmark'],
  'private-bank-loan-assistance': ['Banknote', 'FileSpreadsheet', 'Landmark', 'ClipboardCheck'],
};
const tint = { legal: ['#0b1d42', '#173560'], property: ['#0f2a52', '#1b4170'], financial: ['#101d35', '#1d3358'] };
const cat = (s) => (['legal-opinion','panel-advocate-opinion','english-tamil-legal-opinion','agricultural-land-legal-opinion','house-site-legal-opinion','property-litigation','litigation-resolution','old-document-verification','legal-document-translation','english-to-tamil-translation','tamil-to-english-translation'].includes(s) ? 'legal' : ['financial-opinion','bank-litigation-settlement','one-time-settlement','private-bank-loan-assistance'].includes(s) ? 'financial' : 'property');

const inner = (name, color, sw) => {
  if (!L[name]) throw new Error('missing icon ' + name);
  const svg = renderToStaticMarkup(React.createElement(L[name], { size: 24, color, strokeWidth: sw }));
  const body = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  return `<g fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${body}</g>`;
};
const slots = [[170, 150], [930, 130], [150, 560], [940, 570]];

Object.entries(defs).forEach(([slug, icons], idx) => {
  const [c1, c2] = tint[cat(slug)];
  const [p, ...sec] = icons;
  const rot = idx % 4;
  const secG = sec.map((n, i) => {
    const [x, y] = slots[(i + rot) % 4];
    return `<g transform="translate(${x} ${y}) scale(4)" opacity=".4">${inner(n, '#C6A15B', 1.4)}</g>`;
  }).join('');
  const arcStart = 40 + (idx % 5) * 14;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800" role="img" aria-hidden="true">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
<pattern id="d" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#C6A15B" opacity=".25"/></pattern></defs>
<rect width="1200" height="800" fill="url(#g)"/><rect width="1200" height="800" fill="url(#d)"/>
<path d="M ${arcStart * 10} 0 A 760 760 0 0 1 1200 ${620 - idx * 6}" fill="none" stroke="#C6A15B" stroke-width="5" opacity=".7"/>
<path d="M ${arcStart * 10 + 40} 0 A 730 730 0 0 1 1200 ${660 - idx * 6}" fill="none" stroke="#E8C777" stroke-width="1.5" opacity=".4"/>
<circle cx="600" cy="400" r="225" fill="#ffffff" fill-opacity=".05" stroke="#C6A15B" stroke-width="2.5"/>
<circle cx="600" cy="400" r="260" fill="none" stroke="#C6A15B" stroke-width="1" stroke-dasharray="4 10" opacity=".6"/>
${secG}
<g transform="translate(456 256) scale(12)">${inner(p, '#E8C777', 1.1)}</g>
</svg>`;
  fs.writeFileSync(path.join(__dirname, '..', 'public/images/services', slug + '.svg'), svg);
});
console.log(Object.keys(defs).length + ' images');
