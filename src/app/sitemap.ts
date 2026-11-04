import type { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { publishedPosts } from '@/data/blog';
import { absoluteUrl } from '@/lib/seo';

// Only indexable, canonical URLs belong here. /blog joins automatically once an article is published.
const core = ['/', '/about', '/services', '/legal-services', '/property-services', '/financial-services', '/contact'];
const policy = ['/privacy-policy', '/terms', '/disclaimer'];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...core,
    ...(publishedPosts.length ? ['/blog'] : []),
    ...services.map((s) => `/services/${s.slug}`),
    ...policy,
  ];
  return paths.map((p) => ({ url: absoluteUrl(p), priority: p === '/' ? 1 : p.startsWith('/services/') ? 0.8 : policy.includes(p) ? 0.3 : 0.7 }));
}
