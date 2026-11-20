
import type { MetadataRoute } from 'next';

import { services } from '@/data/services';
import { publishedPosts } from '@/data/blog';
import { absoluteUrl } from '@/lib/seo';

// Main indexable website pages.
const corePages = [
  '/',
  '/about',
  '/services',
  '/legal-services',
  '/property-services',
  '/financial-services',
  '/contact',
];

// Important policy and information pages.
const policyPages = [
  '/privacy-policy',
  '/terms',
  '/disclaimer',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...corePages,

    ...(publishedPosts.length > 0 ? ['/blog'] : []),

    ...services.map((service) => `/services/${service.slug}`),

    ...policyPages,
  ];

  const uniquePaths = [...new Set(paths)];

  return uniquePaths.map((path) => {
    let priority = 0.7;

    if (path === '/') {
      priority = 1;
    } else if (
      path === '/services' ||
      path === '/legal-services' ||
      path === '/property-services' ||
      path === '/financial-services'
    ) {
      priority = 0.8;
    } else if (path.startsWith('/services/')) {
      priority = 0.8;
    } else if (policyPages.includes(path)) {
      priority = 0.3;
    }

    return {
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: path === '/' ? 'weekly' : 'monthly',
      priority,
    };
  });
}