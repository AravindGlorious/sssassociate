
import { business } from '@/config/business';
import { services } from '@/data/services';
import { absoluteUrl } from '@/lib/seo';

const businessId = `${business.url}/#business`;
const websiteId = `${business.url}/#website`;

const sameAs = Object.values(business.social).filter(Boolean);

/**
 * Main business entity.
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': businessId,

  name: business.name,
  alternateName: business.shortName,

  description:
    'SSS Associate Services provides property document review, registration process guidance, document translation and bank-related paperwork support across Tamil Nadu, with its primary business location in Irugur, Coimbatore.',

  url: `${business.url}/`,
  image: absoluteUrl('/images/og-sss-associate.jpg'),
  logo: absoluteUrl('/images/sss-associate-services-logo.jpg'),

  email: business.email,

  telephone: business.phones.map((phone) => phone.tel),

  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.locality,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: business.address.countryCode,
  },

  hasMap: business.mapsUrl,

  contactPoint: business.phones.map((phone) => ({
    '@type': 'ContactPoint',
    telephone: phone.tel,
    email: business.email,
    contactType: 'customer service',
    areaServed: 'Tamil Nadu',
    availableLanguage: ['English', 'Tamil'],
  })),

  areaServed: business.serviceAreas.map((name) => ({
    '@type': 'AdministrativeArea',
    name,
  })),

  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${business.shortName} Services`,
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        url: absoluteUrl(`/services/${service.slug}`),
      },
    })),
  },

  ...(sameAs.length > 0 ? { sameAs } : {}),
};

/**
 * Website entity connected to the main business entity.
 */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': websiteId,

  url: `${business.url}/`,
  name: business.shortName,
  inLanguage: 'en-IN',

  publisher: {
    '@id': businessId,
  },
};

/**
 * Breadcrumb structured data.
 */
export const breadcrumbSchema = (
  items: { name: string; path: string }[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',

  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

type PageType =
  | 'WebPage'
  | 'AboutPage'
  | 'ContactPage'
  | 'CollectionPage';

/**
 * Page-level structured data.
 */
export const webPageSchema = (
  type: PageType,
  name: string,
  description: string,
  path: string
) => ({
  '@context': 'https://schema.org',
  '@type': type,

  '@id': `${absoluteUrl(path)}#webpage`,
  url: absoluteUrl(path),
  name,
  description,
  inLanguage: 'en-IN',

  isPartOf: {
    '@id': websiteId,
  },

  about: {
    '@id': businessId,
  },
});

/**
 * Blog article structured data.
 */

interface BlogPostingSchemaProps {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    type: 'Person' | 'Organization';
    url?: string;
  };
  image?: string;
}

export const blogPostingSchema = ({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  author,
  image,
}: BlogPostingSchemaProps) => {
  const articleUrl = absoluteUrl(path);
  const webpageId = `${articleUrl}#webpage`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',

    '@id': `${articleUrl}#article`,

    mainEntityOfPage: {
      '@id': webpageId,
    },

    headline: title,
    description,
    inLanguage: 'en-IN',
    datePublished: publishedAt,

    ...(updatedAt ? { dateModified: updatedAt } : {}),

    author: {
      '@type': author.type,
      name: author.name,
      ...(author.url
        ? { url: new URL(author.url, business.url).toString() }
        : {}),
    },

    publisher: {
      '@id': businessId,
    },

    ...(image ? { image: absoluteUrl(image) } : {}),
  };
};