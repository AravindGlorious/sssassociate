import Link from 'next/link';
import { type CategoryKey, byCategory, categories } from '@/data/services';
import { PageHero } from '@/components/layout/PageHero';
import { ServiceCard } from './ServiceCard';
import { ContactCta } from '@/components/contact/ContactCta';
import { PageSchema } from '@/components/seo/PageSchema';

export function CategoryPage({ category, description }: { category: CategoryKey; description: string }) {
  const c = categories[category];
  const list = byCategory(category);
  return (
    <>
      <PageSchema type="CollectionPage" name={c.title} description={description} path={c.path} crumbs={[{ name: 'Our Services', path: '/services' }, { name: c.title, path: c.path }]} />
      <PageHero title={c.title} intro={c.intro} crumbs={[{ label: 'Our Services', href: '/services' }, { label: c.title }]} />
      <section className="bg-mist py-14" aria-label={`${c.title} list`}>
        <div className="wrap">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => <li key={s.slug}><ServiceCard service={s} /></li>)}
          </ul>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-muted">
            Document requirements and timelines vary from case to case and are confirmed individually. See our <Link className="font-semibold text-gold-text underline" href="/disclaimer">disclaimer</Link>.
          </p>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
