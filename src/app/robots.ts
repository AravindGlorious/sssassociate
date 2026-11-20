
import type { MetadataRoute } from 'next';
import { business } from '@/config/business';

const siteUrl = business.url.replace(/\/+$/, '');

/**
 * Allow search engines to crawl public website pages and assets.
 * Block API routes from crawling.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}