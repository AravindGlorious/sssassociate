import { business } from '@/config/business';
import { services } from '@/data/services';
import { absoluteUrl } from '@/lib/seo';

const sameAs = Object.values(business.social).filter(Boolean);

/**
 * The one business entity for the whole site. Every page references it by @id.
 * Only verified facts are included: no ratings, reviews, prices, opening hours or coordinates.
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${business.url}/#business`,
  name: business.name,
  alternateName: business.shortName,
  description: `${business.tagline} in ${business.primaryArea}, Tamil Nadu: property documentation, legal opinions through qualified advocates, and financial settlement assistance.`,
  url: `${business.url}/`,
  image: absoluteUrl('/images/og-sss-associate.jpg'),
  logo: absoluteUrl('/images/logo.jpg'),
  email: business.email,
  telephone: business.phones.map((p) => p.tel),
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${business.address.street}, ${business.address.locality}`,
    addressLocality: business.address.city,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: business.address.countryCode,
  },
  hasMap: business.mapsUrl,
  contactPoint: business.phones.map((p) => ({ '@type': 'ContactPoint', telephone: p.tel, email: business.email, contactType: 'customer service', areaServed: 'IN', availableLanguage: ['English', 'Tamil'] })),
  areaServed: business.serviceAreas.map((name) => ({ '@type': 'Place', name })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${business.shortName} services`,
    itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, url: absoluteUrl(`/services/${s.slug}`) } })),
  },
  ...(sameAs.length ? { sameAs } : {}),
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${business.url}/#website`,
  url: `${business.url}/`,
  name: business.shortName,
  inLanguage: 'en-IN',
  publisher: { '@id': `${business.url}/#business` },
};

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
});

type PageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';

export const webPageSchema = (type: PageType, name: string, description: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': type,
  '@id': `${absoluteUrl(path)}#webpage`,
  url: absoluteUrl(path),
  name,
  description,
  inLanguage: 'en-IN',
  isPartOf: { '@id': `${business.url}/#website` },
  about: { '@id': `${business.url}/#business` },
});
