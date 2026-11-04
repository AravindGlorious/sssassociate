import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { business } from '@/config/business';
import { categories, getService, services } from '@/data/services';
import { getServiceContent } from '@/data/service-content';
import { breadcrumbSchema } from '@/lib/schema';
import { absoluteUrl, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { ServicePage } from '@/components/services/ServicePage';

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getServiceContent(slug);
  if (!content) return {};
  return pageMetadata({ title: content.metaTitle, description: content.metaDescription, path: `/services/${slug}` });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  const content = getServiceContent(slug);
  if (!service || !content) notFound();

  const cat = categories[service.category];
  const path = `/services/${slug}`;
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${absoluteUrl(path)}#service`,
      name: service.title,
      serviceType: service.title,
      description: content.metaDescription,
      url: absoluteUrl(path),
      category: cat.title,
      provider: { '@id': `${business.url}/#business` },
      areaServed: business.serviceAreas.map((name) => ({ '@type': 'Place', name })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${absoluteUrl(path)}#webpage`,
      url: absoluteUrl(path),
      name: content.h1,
      description: content.metaDescription,
      isPartOf: { '@id': `${business.url}/#website` },
      about: { '@id': `${absoluteUrl(path)}#service` },
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Our Services', path: '/services' },
      { name: cat.title, path: cat.path },
      { name: service.title, path },
    ]),
  ];

  return (
    <>
      {schema.map((s, i) => <JsonLd key={i} data={s} />)}
      <ServicePage service={service} content={content} />
    </>
  );
}
