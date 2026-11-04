import type { MetadataRoute } from 'next';
import { business } from '@/config/business';

// CSS, JS and images are intentionally NOT blocked so search engines can render pages.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/', disallow: '/api/' }, sitemap: `${business.url}/sitemap.xml` };
}
