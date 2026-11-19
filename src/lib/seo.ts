
import type { Metadata } from 'next';
import { business } from '@/config/business';

export const SITE_SUFFIX = ' | SSS Associate';

/**
 * Creates an absolute URL using the primary website domain.
 * Homepage canonical uses the bare domain.
 */
export const absoluteUrl = (path: string): string => {
  const origin = business.url.replace(/\/+$/, '');

  if (path === '/') {
    return `${origin}/`;
  }

  return `${origin}/${path.replace(/^\/+/, '')}`;
};

interface PageMeta {
  title: string;
  description: string;
  path: string;
  fullTitle?: boolean;
  index?: boolean;
}

/**
 * Generates consistent SEO metadata for every page:
 * title, description, canonical, robots, Open Graph and Twitter.
 */
export function pageMetadata({
  title,
  description,
  path,
  fullTitle = false,
  index = true,
}: PageMeta): Metadata {
  const full = fullTitle ? title : `${title}${SITE_SUFFIX}`;

  const url = absoluteUrl(path);

  const imageUrl = absoluteUrl('/images/og-sss-associate.jpg');

  const image = {
    url: imageUrl,
    width: 1200,
    height: 630,
    alt: 'SSS Associate Services – Legal documentation and financial assistance',
  };

  return {
    title: {
      absolute: full,
    },

    description,

    alternates: {
      canonical: url,
    },

    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        }
      : {
          index: false,
          follow: true,
        },

    openGraph: {
      title: full,
      description,
      url,
      siteName: business.shortName,
      locale: 'en_IN',
      type: 'website',
      images: [image],
    },

    twitter: {
      card: 'summary_large_image',
      title: full,
      description,
      images: [imageUrl],
    },
  };
}
