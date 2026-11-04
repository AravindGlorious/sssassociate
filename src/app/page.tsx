import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { Highlights } from '@/components/home/Highlights';
import { AboutCore } from '@/components/home/AboutCore';
import { FeaturedServices } from '@/components/home/FeaturedServices';
import { AreasWeServe, HowWeWork, ServicesOverview, WhyChoose } from '@/components/home/HomeSections';
import { Section } from '@/components/ui/Section';
import { FaqList } from '@/components/faq/FaqList';
import { BlogCard } from '@/components/blog/BlogCard';
import { ContactCta } from '@/components/contact/ContactCta';
import { homeFaqs } from '@/data/faqs';
import { publishedPosts } from '@/data/blog';
import { PageSchema } from '@/components/seo/PageSchema';
import { pageMetadata } from '@/lib/seo';

const description = 'SSS Associate in Irugur, Coimbatore helps with property documents, legal opinions through qualified advocates, registration support and financial settlement.';
export const metadata: Metadata = pageMetadata({ title: 'Legal, Property & Financial Services in Coimbatore | SSS Associate', description, path: '/', fullTitle: true });

export default function HomePage() {
  return (
    <>
      <PageSchema name="SSS Associate – Legal, Property & Financial Services in Coimbatore" description={description} path="/" />
      <Hero />
      <Highlights />
      <AboutCore />
      <ServicesOverview />
      <FeaturedServices id="featured-legal" category="legal" tone="mist" eyebrow="Legal" title="Featured Legal Services" intro="Opinions and document checks that help you understand a property before you commit to it." slugs={['legal-opinion', 'agricultural-land-legal-opinion', 'old-document-verification', 'property-litigation']} />
      <FeaturedServices id="featured-property" category="property" eyebrow="Property" title="Featured Property Services" intro="Help with the records and registrations that come with owning, buying or selling property." slugs={['property-opinion', 'property-registration', 'patta-transfer-registration', 'encumbrance-certificate']} />
      <FeaturedServices id="financial" category="financial" tone="mist" eyebrow="Financial" title="Financial Services" intro="Support with bank-related matters. Approvals and settlement terms are decided by the lender, not by us." slugs={['financial-opinion', 'bank-litigation-settlement', 'one-time-settlement', 'private-bank-loan-assistance']} />
      <WhyChoose />
      <HowWeWork />
      <AreasWeServe />
      <Section id="faq" tone="mist" eyebrow="Questions" title="Frequently Asked Questions" intro="Straight answers to what people ask us most.">
        <FaqList faqs={homeFaqs} />
      </Section>
      {publishedPosts.length > 0 && (
      <Section id="blog" eyebrow="Guides" title="Latest Blog Articles" intro="Plain-language explainers on property documents, registration and settlements.">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publishedPosts.slice(0, 3).map((p) => <li key={p.slug}><BlogCard post={p} /></li>)}
        </ul>
        <div className="mt-10 text-center"><Link href="/blog" className="btn btn-dark btn-sm">Visit the Blog</Link></div>
      </Section>
      )}
      <ContactCta />
    </>
  );
}
