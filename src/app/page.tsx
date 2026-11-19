
import type { Metadata } from 'next';
import Link from 'next/link';

import { Hero } from '@/components/home/Hero';
import { Highlights } from '@/components/home/Highlights';
import { AboutCore } from '@/components/home/AboutCore';
import { FeaturedServices } from '@/components/home/FeaturedServices';
import {
  AreasWeServe,
  HowWeWork,
  ServicesOverview,
  WhyChoose,
} from '@/components/home/HomeSections';

import { Section } from '@/components/ui/Section';
import { FaqList } from '@/components/faq/FaqList';
import { BlogCard } from '@/components/blog/BlogCard';
import { ContactCta } from '@/components/contact/ContactCta';

import { homeFaqs } from '@/data/faqs';
import { publishedPosts } from '@/data/blog';

import { PageSchema } from '@/components/seo/PageSchema';
import { pageMetadata } from '@/lib/seo';

const description =
  'SSS Associate Services offers document verification, legal documentation and financial assistance across Tamil Nadu. Contact our team for support.';

export const metadata: Metadata = pageMetadata({
  title: 'Legal & Document Services in Tamil Nadu | SSS Associate',
  description,
  path: '/',
  fullTitle: true,
});

export default function HomePage() {
  return (
    <>
      <PageSchema
        name="SSS Associate Services – Legal Documentation and Financial Support"
        description={description}
        path="/"
      />

      <Hero />

      <Highlights />

      <AboutCore />

      <ServicesOverview />

      <FeaturedServices
        id="featured-legal"
        category="legal"
        tone="mist"
        eyebrow="Legal"
        title="Legal Documentation Services"
        intro="Understand important documents before making a decision. Get assistance with document checks and related legal processes."
        slugs={[
          'legal-opinion',
          'agricultural-land-legal-opinion',
          'old-document-verification',
          'property-litigation',
        ]}
      />

      <FeaturedServices
        id="featured-property"
        category="property"
        eyebrow="Registration"
        title="Document & Registration Support"
        intro="Get help with land records, registration procedures and the documents involved in buying or selling property."
        slugs={[
          'property-opinion',
          'property-registration',
          'patta-transfer-registration',
          'encumbrance-certificate',
        ]}
      />

      <FeaturedServices
        id="financial"
        category="financial"
        tone="mist"
        eyebrow="Financial"
        title="Financial Documentation Support"
        intro="Get assistance with bank-related documentation and settlement processes. Final approvals and settlement terms are decided by the lender."
        slugs={[
          'financial-opinion',
          'bank-litigation-settlement',
          'one-time-settlement',
          'private-bank-loan-assistance',
        ]}
      />

      <WhyChoose />

      <HowWeWork />

      <AreasWeServe />

      <Section
        id="faq"
        tone="mist"
        eyebrow="Questions"
        title="Frequently Asked Questions"
        intro="Find clear answers to common questions about our services and processes."
      >
        <FaqList faqs={homeFaqs} />
      </Section>

      {publishedPosts.length > 0 && (
        <Section
          id="blog"
          eyebrow="Guides"
          title="Latest Helpful Guides"
          intro="Explore simple guides about documents, registration procedures and financial settlements."
        >
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publishedPosts.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <Link href="/blog" className="btn btn-dark btn-sm">
              Visit the Blog
            </Link>
          </div>
        </Section>
      )}

      <ContactCta />
    </>
  );
}