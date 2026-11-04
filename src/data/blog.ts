export interface BlogTeaser { slug: string; title: string; category: string; excerpt: string; published?: boolean }

/**
 * Planned guides. Set `published: true` only when the article page exists.
 * Until then /blog is marked noindex, kept out of the sitemap, and the homepage blog section is hidden.
 */
export const blogTeasers: BlogTeaser[] = [
  { slug: 'property-legal-verification-before-buying-land', title: 'Why Property Legal Verification Is Important Before Buying Land', category: 'Property Verification', excerpt: 'What a document review looks for, and why it is worth doing before any advance is paid.' },
  { slug: 'documents-to-check-before-buying-agricultural-land', title: 'Documents to Check Before Purchasing Agricultural Land', category: 'Land Documentation', excerpt: 'A practical overview of the land records buyers commonly ask to see.' },
  { slug: 'what-is-an-encumbrance-certificate', title: 'What Is an Encumbrance Certificate?', category: 'Property Documentation', excerpt: 'A plain-language explanation of what an EC shows and what it does not.' },
  { slug: 'patta-and-chitta-understanding-the-difference', title: 'Patta and Chitta: Understanding the Difference', category: 'Patta & Chitta', excerpt: 'Two records that are often mentioned together, and how they differ.' },
  { slug: 'what-is-one-time-settlement-ots', title: 'What Is One Time Settlement (OTS)?', category: 'Bank Settlement & OTS', excerpt: 'How a one time settlement works in general, and what to understand before approaching a lender.' },
  { slug: 'why-old-property-documents-need-verification', title: 'Why Old Property Documents Need Verification', category: 'Legal Awareness', excerpt: 'How gaps in older records can surface years later, and how to spot them early.' },
];

export const publishedPosts = blogTeasers.filter((p) => p.published);
