
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
  'SSS Associate Services offers property document checks, registration guidance and bank documentation support across Tamil Nadu. Contact us for assistance.';

export const metadata: Metadata = pageMetadata({
  title: 'Property Documents & Registration Support in Tamil Nadu | SSS Associate',
  description,
  path: '/',
  fullTitle: true,
});

export default function HomePage() {
  return (
    <>
      <PageSchema
        name="SSS Associate Services – Property Documents and Financial Support"
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
        eyebrow="Document Review"
        title="Property Document Review"
        intro="Review important papers before making a decision. Our team helps you understand document details and the steps involved."
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
        title="Property Records & Registration"
        intro="Get guidance on land records, registration procedures and the paperwork involved in buying or selling property."
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
        title="Bank & Financial Documentation"
        intro="Get support with bank paperwork and settlement procedures. Final approvals and settlement terms are decided by the lender."
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
        intro="Find straightforward answers about our services and the steps involved."
      >
        <FaqList faqs={homeFaqs} />
      </Section>

      {publishedPosts.length > 0 && (
        <Section
          id="blog"
          eyebrow="Guides"
          title="Latest Helpful Guides"
          intro="Explore practical guides about property records, registration and financial settlements."
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