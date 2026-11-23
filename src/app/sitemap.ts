
import type { MetadataRoute } from 'next';

import { services } from '@/data/services';
import { publishedPosts } from '@/data/blog';
import { absoluteUrl } from '@/lib/seo';

const corePages = [
  '/',
  '/about',
  '/services',
  '/legal-services',
  '/property-services',
  '/financial-services',
  '/contact',
];

const policyPages = [
  '/privacy-policy',
  '/terms',
  '/disclaimer',
  '/editorial-policy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...corePages,

    ...(publishedPosts.length > 0 ? ['/blog'] : []),

    ...publishedPosts.map((post) => `/blog/${post.slug}`),

    ...services.map((service) => `/services/${service.slug}`),

    ...policyPages,
  ];

  const uniquePaths = [...new Set(paths)];

  return uniquePaths.map((path) => {
    let priority = 0.7;

    if (path === '/') {
      priority = 1;
    } else if (
      [
        '/services',
        '/legal-services',
        '/property-services',
        '/financial-services',
      ].includes(path)
    ) {
      priority = 0.8;
    } else if (
      path.startsWith('/services/') ||
      path.startsWith('/blog/')
    ) {
      priority = 0.8;
    } else if (policyPages.includes(path)) {
      priority = 0.3;
    }

    return {
      url: absoluteUrl(path),
      changeFrequency: path === '/' ? 'weekly' : 'monthly',
      priority,
    };
  });
}