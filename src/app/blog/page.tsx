
import { PageHero } from '@/components/layout/PageHero';
import { BlogCard } from '@/components/blog/BlogCard';
import { ContactCta } from '@/components/contact/ContactCta';
import { PageSchema } from '@/components/seo/PageSchema';

import { blogTeasers, publishedPosts } from '@/data/blog';
import { pageMetadata } from '@/lib/seo';

const description =
  'Read practical guides on property documents, land records, registration, patta, chitta and bank settlements in Coimbatore and Tamil Nadu.';

const hasPublishedPosts = publishedPosts.length > 0;

export const metadata = pageMetadata({
  title: 'Property & Legal Guides Blog | SSS Associate',
  description,
  path: '/blog',
  fullTitle: true,
  index: hasPublishedPosts,
});

export default function BlogPage() {
  const postsToDisplay = hasPublishedPosts
    ? publishedPosts
    : blogTeasers;

  return (
    <>
      <PageSchema
        type="CollectionPage"
        name="SSS Associate Services Blog"
        description={description}
        path="/blog"
        crumbs={[
          { name: 'Blog', path: '/blog' },
        ]}
      />

      <PageHero
        title="Property & Legal Guides"
        intro={
          hasPublishedPosts
            ? 'Explore plain-language guides about property documents, registration procedures, land records and financial settlements.'
            : 'We are preparing practical guides about property documents, registration procedures, land records and financial settlements.'
        }
        crumbs={[{ label: 'Blog' }]}
      />

      <section
        className="bg-mist py-14"
        aria-labelledby="blog-list-heading"
      >
        <div className="wrap">
          <h2
            id="blog-list-heading"
            className="mb-8 text-center text-2xl font-bold text-navy"
          >
            {hasPublishedPosts
              ? 'Latest Guides'
              : 'Guides We Are Preparing'}
          </h2>

          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {postsToDisplay.map((post) => (
              <li key={post.slug}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta />
    </>
  );
}