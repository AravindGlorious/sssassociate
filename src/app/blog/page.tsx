import { PageHero } from '@/components/layout/PageHero';
import { BlogCard } from '@/components/blog/BlogCard';
import { ContactCta } from '@/components/contact/ContactCta';
import { PageSchema } from '@/components/seo/PageSchema';
import { blogTeasers, publishedPosts } from '@/data/blog';
import { pageMetadata } from '@/lib/seo';

const description = 'Plain-language guides from SSS Associate on property documents, registration, patta and chitta, Encumbrance Certificates and bank settlements in Coimbatore.';
// Thin until real articles exist, so keep it out of search results (and the sitemap) until then.
export const metadata = pageMetadata({ title: 'Property & Legal Guides Blog | SSS Associate', description, path: '/blog', fullTitle: true, index: publishedPosts.length > 0 });

export default function BlogPage() {
  const hasPosts = publishedPosts.length > 0;
  return (
    <>
      <PageSchema type="CollectionPage" name="Blog" description={description} path="/blog" crumbs={[{ name: 'Blog', path: '/blog' }]} />
      <PageHero title="Blog" intro={hasPosts ? 'Plain-language guides on property documents, registration and settlements.' : 'Our first plain-language guides on property documents, registration and settlements are being prepared.'} crumbs={[{ label: 'Blog' }]} />
      <section className="bg-mist py-14"><div className="wrap">
        {!hasPosts && <h2 className="mb-6 text-center text-2xl font-bold text-navy">Guides we are preparing</h2>}
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{(hasPosts ? publishedPosts : blogTeasers).map((p) => <li key={p.slug}><BlogCard post={p} /></li>)}</ul>
      </div></section>
      <ContactCta />
    </>
  );
}
