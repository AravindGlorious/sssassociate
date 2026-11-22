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
  'SSS Associate Services offers document checks, land registration guidance and bank file support across Tamil Nadu. Contact us today.';

export const metadata: Metadata = pageMetadata({
  title: 'Property Document Support in Tamil Nadu | SSS Associate',
  description,
  path: '/',
  fullTitle: true,
});

export default function HomePage() {
  return (
    <>
      <PageSchema
        name="SSS Associate Services – Land Documents and Financial Support"
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
        title="Legal Document Review"
        intro="Check key deeds before you decide. Our team helps you verify records and understand every step clearly."
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
        title="Land Records & Registration"
        intro="Get clear guidance on patta, encumbrance certificates, and registration steps when buying or selling land."
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
        intro="Get help organizing bank files and settlement requests. Final approvals and terms rest solely with the lender."
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
        intro="Read simple, clear answers about our services and how the process works."
      >
        <FaqList faqs={homeFaqs} />
      </Section>

      {publishedPosts.length > 0 && (
        <Section
          id="blog"
          eyebrow="Guides"
          title="Latest Helpful Guides"
          intro="Read practical guides on land records, deed registration, and bank settlements."
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