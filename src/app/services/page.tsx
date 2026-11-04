import Link from 'next/link';
import { Coins, House, Scale } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { CategoryOverviewCard } from '@/components/services/CategoryOverviewCard';
import { ContactCta } from '@/components/contact/ContactCta';
import { PageSchema } from '@/components/seo/PageSchema';
import { byCategory, categories, serviceHref, type CategoryKey } from '@/data/services';
import { pageMetadata } from '@/lib/seo';

const description = 'Browse all 23 services from SSS Associate in Coimbatore: legal opinions, property registration, patta and EC help, translation and bank settlement support.';
export const metadata = pageMetadata({ title: 'All Services: Legal, Property & Finance | SSS Associate', description, path: '/services', fullTitle: true });

export default function ServicesPage() {
  return (
    <>
      <PageSchema type="CollectionPage" name="Our Services" description={description} path="/services" crumbs={[{ name: 'Our Services', path: '/services' }]} />
      <PageHero title="Our Services" intro="Legal, property and financial support from our office in Irugur, Coimbatore, coordinated in one place." crumbs={[{ label: 'Our Services' }]} />
      <section className="bg-mist py-16" aria-labelledby="service-categories"><div className="wrap">
        <h2 id="service-categories" className="sr-only">Service categories</h2>
        <ul className="grid gap-6 md:grid-cols-3">
          <li><CategoryOverviewCard Icon={Scale} title={categories.legal.title} href={categories.legal.path} count={byCategory('legal').length} text={categories.legal.intro} /></li>
          <li><CategoryOverviewCard Icon={House} title={categories.property.title} href={categories.property.path} count={byCategory('property').length} text={categories.property.intro} /></li>
          <li><CategoryOverviewCard Icon={Coins} title={categories.financial.title} href={categories.financial.path} count={byCategory('financial').length} text={categories.financial.intro} /></li>
        </ul>
      </div></section>
      <section className="py-16" aria-labelledby="all-services"><div className="wrap">
        <h2 id="all-services" className="mb-8 text-center text-3xl font-bold text-navy">All services at a glance</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {(Object.keys(categories) as CategoryKey[]).map((k) => (
            <div key={k}>
              <h3 className="mb-3 font-heading text-xl font-bold text-navy"><Link href={categories[k].path} className="hover:text-gold-text">{categories[k].title}</Link></h3>
              <ul className="space-y-1">{byCategory(k).map((s) => <li key={s.slug}><Link href={serviceHref(s)} className="inline-block py-1 text-sm text-ink underline-offset-2 hover:text-gold-text hover:underline">{s.title}</Link></li>)}</ul>
            </div>
          ))}
        </div>
      </div></section>
      <ContactCta />
    </>
  );
}
