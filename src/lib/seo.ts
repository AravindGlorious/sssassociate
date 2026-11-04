import type { Metadata } from 'next';
import { business } from '@/config/business';

export const SITE_SUFFIX = ' | SSS Associate';

/** Absolute URL for a site path. No trailing slashes anywhere (the homepage is just the bare origin), matching how Next.js renders canonicals. */
export const absoluteUrl = (path: string) => (path === '/' ? business.url : `${business.url}${path}`);

interface PageMeta {
  /** Page title. The brand suffix is added unless `fullTitle` is true. */
  title: string;
  description: string;
  path: string;
  fullTitle?: boolean;
  /** Set false for pages that should not appear in search results. They stay out of the sitemap too. */
  index?: boolean;
}

/** Builds per-page metadata: title, description, self-referencing canonical, robots, Open Graph and Twitter card. */
export function pageMetadata({ title, description, path, fullTitle = false, index = true }: PageMeta): Metadata {
  const full = fullTitle ? title : `${title}${SITE_SUFFIX}`;
  const url = absoluteUrl(path);
  const image = { url: absoluteUrl('/images/og-sss-associate.jpg'), width: 1200, height: 630, alt: `${business.shortName} – ${business.tagline} in Irugur, Coimbatore` };
  return {
    title: { absolute: full },
    description,
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: { title: full, description, url, siteName: business.shortName, locale: 'en_IN', type: 'website', images: [image] },
    twitter: { card: 'summary_large_image', title: full, description, images: [image.url] },
  };
}
