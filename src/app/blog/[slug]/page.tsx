import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { PageHero } from '@/components/layout/PageHero';
import { ContactCta } from '@/components/contact/ContactCta';
import { PageSchema } from '@/components/seo/PageSchema';
import { JsonLd } from '@/components/seo/JsonLd';

import { blogTeasers, publishedPosts } from '@/data/blog';
import { blogPostingSchema } from '@/lib/schema';
import { absoluteUrl, pageMetadata } from '@/lib/seo';
import { business } from '@/config/business';

const ARTICLE_SLUG = 'property-legal-verification-before-buying-land';

const description =
  'Learn which property documents to check before buying land in Tamil Nadu, including title deeds, EC, patta, survey records and land classification.';

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = publishedPosts.find((item) => item.slug === slug);

  if (!post) {
    return pageMetadata({
      title: 'Article Not Available',
      description: 'This article is not currently available.',
      path: `/blog/${slug}`,
      index: false,
    });
  }

  const title =
    'Why Property Legal Verification Matters Before Buying Land';

  const baseMetadata = pageMetadata({
    title,
    description,
    path: `/blog/${slug}`,
    fullTitle: true,
  });

  return {
    ...baseMetadata,
    openGraph: {
      type: 'article',
      title,
      description,
      url: absoluteUrl(`/blog/${slug}`),
      siteName: business.shortName,
      locale: 'en_IN',
      publishedTime: post.publishedAt,
      ...(post.updatedAt
        ? { modifiedTime: post.updatedAt }
        : {}),
      images: [
        {
          url: absoluteUrl('/images/og-sss-associate.jpg'),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;

  const post = publishedPosts.find((item) => item.slug === slug);

  if (
    !post ||
    slug !== ARTICLE_SLUG ||
    !post.author ||
    !post.publishedAt
  ) {
    notFound();
  }

  const articleSchema = blogPostingSchema({
    title: post.title,
    description,
    path: `/blog/${post.slug}`,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: {
      name: post.author.name,
      type: 'Organization',
    },
  });

  return (
    <>
      <PageSchema
        type="WebPage"
        name={post.title}
        description={description}
        path={`/blog/${post.slug}`}
        crumbs={[
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <JsonLd data={articleSchema} />

      <PageHero
        title={post.title}
        intro="A practical guide to reviewing property documents and understanding important checks before purchasing land in Tamil Nadu."
        crumbs={[
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <article className="bg-white py-12 sm:py-16">
        <div className="wrap max-w-4xl">

          {/* Optimized responsive blog image */}
          <Image
            src="/images/blog/property-legal-verification.webp"
            alt="Property document verification with title deed, encumbrance certificate, patta and land survey records"
            width={1600}
            height={900}
            sizes="(max-width: 768px) 100vw, 896px"
            preload
            className="mb-8 h-auto w-full rounded-2xl object-cover"
          />

          <div className="mb-8 border-b border-navy/10 pb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-text">
              {post.category}
            </p>

            <p className="mt-3 text-sm text-muted">
              By {post.author.name}
            </p>

            <p className="mt-1 text-xs text-muted">
              Published:{' '}
              <time dateTime={post.publishedAt}>
                {new Intl.DateTimeFormat('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).format(new Date(post.publishedAt))}
              </time>
            </p>

            {post.updatedAt && (
              <p className="mt-1 text-xs text-muted">
                Updated:{' '}
                <time dateTime={post.updatedAt}>
                  {new Intl.DateTimeFormat('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }).format(new Date(post.updatedAt))}
                </time>
              </p>
            )}
          </div>

          <div className="space-y-6 text-base leading-8 text-muted">
            <p>
              Buying land is an important financial decision. A property
              may look attractive, have a reasonable price and appear to
              have all the necessary documents. However, the visible
              condition of a plot does not always tell you whether the
              seller has a clear and transferable title or whether the
              land has other issues.
            </p>

            <p>
              Property document verification helps buyers identify
              possible concerns before paying an advance or signing an
              agreement. It involves reviewing ownership records,
              registration documents, revenue records, survey details
              and applicable approvals.
            </p>

            <h2 className="pt-4 font-heading text-2xl font-bold text-navy">
              1. Verify the Ownership and Title Documents
            </h2>

            <p>
              Ask for the current title deed and relevant previous
              documents. Depending on the property history, these may
              include previous sale deeds, parent documents, partition
              deeds, settlement deeds, gift deeds, release deeds and
              inheritance-related documents.
            </p>

            <p>
              The purpose is to understand the chain of ownership and
              check whether the seller&apos;s claim is supported by the
              available documents. Pay attention to differences in
              names, survey numbers, property descriptions, measurements
              and boundaries.
            </p>

            <p>
              A registered document alone does not resolve every
              possible title issue. A qualified property advocate
              should examine the title and relevant legal records.
            </p>

            <h2 className="pt-4 font-heading text-2xl font-bold text-navy">
              2. Check the Encumbrance Certificate (EC)
            </h2>

            <p>
              An Encumbrance Certificate is an important record to
              review when purchasing property. It can show certain
              registered transactions and encumbrances recorded against
              the property for the period searched.
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Check that the property and survey details match.</li>
              <li>Review an appropriate period based on the property history.</li>
              <li>Examine the names of the parties and transaction details.</li>
              <li>Investigate unfamiliar entries or discrepancies.</li>
            </ul>

            <p>
              An EC is not a complete guarantee that a property has no
              legal issues. It may not disclose every unregistered
              claim, pending dispute or other matter affecting the
              property.
            </p>

            <h2 className="pt-4 font-heading text-2xl font-bold text-navy">
              3. Verify Patta, Chitta and Other Land Records
            </h2>

            <p>
              Revenue records are important when checking land details
              in Tamil Nadu. Depending on the location and type of
              property, relevant records may include Patta, Chitta or
              applicable land record extracts, A-Register, Town Survey
              Land Register and Field Measurement Book sketch.
            </p>

            <p>
              Compare the owner name, survey number, subdivision
              number, extent and land classification with the documents
              provided by the seller.
            </p>

            <p>
              Patta is useful for checking revenue records, but it
              should not be treated as conclusive proof of legal title
              on its own. It should be considered along with title
              deeds and other relevant records.
            </p>

            <h2 className="pt-4 font-heading text-2xl font-bold text-navy">
              4. Match Survey Numbers, Boundaries and Measurements
            </h2>

            <p>
              A property description in a document should correspond
              with the land being offered for sale. Check survey and
              subdivision numbers, total extent, four boundaries, road
              access, pathway details and measurements shown in
              relevant sketches.
            </p>

            <p>
              Where necessary, arrange for a qualified surveyor to
              inspect and measure the property. Clarify discrepancies
              through the appropriate records and professionals
              before proceeding.
            </p>

            <h2 className="pt-4 font-heading text-2xl font-bold text-navy">
              5. Check Land Classification and Applicable Approvals
            </h2>

            <p>
              The permitted use of land is important. Agricultural
              land, residential plots and other categories may be
              subject to different requirements.
            </p>

            <p>Depending on the property, check whether the following apply:</p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Land classification and revenue records</li>
              <li>Layout approval and planning permission</li>
              <li>Local-body approval</li>
              <li>Building approval, if an existing building is included</li>
              <li>Applicable restrictions or conditions affecting the land</li>
            </ul>

            <p>
              Do not assume that a plot can automatically be used for
              residential construction just because nearby properties
              have houses. Confirm the applicable requirements with
              the relevant planning authority or local body.
            </p>

            <h2 className="pt-4 font-heading text-2xl font-bold text-navy">
              6. Check for Disputes, Claims and Other Risks
            </h2>

            <p>
              Depending on the property history, further checks may be
              needed for pending court cases, claims by co-owners or
              legal heirs, mortgages, restrictions on transfer,
              government acquisition proceedings, access rights and
              possession-related issues.
            </p>

            <p>
              The appropriate checks depend on the property and its
              circumstances. A qualified advocate can advise which
              searches and legal enquiries are necessary.
            </p>

            <h2 className="pt-4 font-heading text-2xl font-bold text-navy">
              7. Verify the Seller&apos;s Identity and Authority to Sell
            </h2>

            <p>
              Confirm that the person selling the property is legally
              entitled to do so. If someone is acting on behalf of the
              owner, examine the relevant Power of Attorney or other
              authority documents and obtain professional advice about
              their validity and scope.
            </p>

            <p>
              If there are multiple owners, inherited interests or
              co-owners, clarify who must participate in the
              transaction. Avoid paying a substantial advance until
              the seller&apos;s authority and the property title position
              have been properly reviewed.
            </p>

            <h2 className="pt-4 font-heading text-2xl font-bold text-navy">
              Property Document Verification Checklist
            </h2>

            <ul className="list-disc space-y-2 pl-6">
              <li>Current title deed</li>
              <li>Relevant parent and previous title documents</li>
              <li>Encumbrance Certificate for an appropriate search period</li>
              <li>Patta and applicable revenue records</li>
              <li>A-Register or TSLR, where relevant</li>
              <li>FMB sketch or relevant survey records</li>
              <li>Survey number, subdivision and land extent</li>
              <li>Physical boundaries and access</li>
              <li>Land classification and applicable approvals</li>
              <li>Seller identity and authority to sell</li>
              <li>Relevant dispute, mortgage and restriction checks</li>
              <li>Review by a qualified property advocate</li>
            </ul>

            <p>
              This is a general checklist. The documents required may
              differ depending on the type, location and history of
              the property.
            </p>

            <h2 className="pt-4 font-heading text-2xl font-bold text-navy">
              Common Mistakes Buyers Should Avoid
            </h2>

            <ol className="list-decimal space-y-2 pl-6">
              <li>Paying an advance before reviewing title documents.</li>
              <li>Assuming that Patta alone proves clear ownership.</li>
              <li>Treating an EC as a guarantee that no dispute exists.</li>
              <li>Ignoring differences in survey numbers or measurements.</li>
              <li>Assuming every plot can be used for residential construction.</li>
              <li>Relying only on photocopies without checking relevant original or certified records.</li>
              <li>Skipping independent legal review because the seller says the documents are clear.</li>
            </ol>

            <h2 className="pt-4 font-heading text-2xl font-bold text-navy">
              How SSS Associate Services Can Help
            </h2>

            <p>
              SSS Associate Services provides property documentation
              support and assistance with reviewing commonly used
              property records, including document details, EC
              information, Patta-related records and registration
              documentation.
            </p>

            <p>
              We help customers understand the documents they have
              and identify details that may need further clarification.
              Where a matter requires a legal opinion, title
              certification or legal representation, customers should
              consult a qualified advocate.
            </p>

            <h2 className="pt-4 font-heading text-2xl font-bold text-navy">
              Frequently Asked Questions
            </h2>

            <h3 className="pt-2 font-semibold text-navy">
              Is Patta alone enough to confirm property ownership?
            </h3>
            <p>
              No. Patta is an important revenue record, but it should
              not be treated as conclusive proof of title by itself.
              Relevant title deeds and other records should also be
              examined.
            </p>

            <h3 className="pt-2 font-semibold text-navy">
              Is an Encumbrance Certificate enough before buying land?
            </h3>
            <p>
              No. An EC can show certain registered transactions and
              encumbrances for the period searched, but it may not
              reveal every possible claim, dispute or legal issue.
            </p>

            <h3 className="pt-2 font-semibold text-navy">
              How many years of EC should I check?
            </h3>
            <p>
              The appropriate search period depends on the property
              title history, previous transactions and the advice of
              the reviewing advocate. There is no single period
              suitable for every property.
            </p>

            <h3 className="pt-2 font-semibold text-navy">
              Can I buy land if the survey number differs between documents?
            </h3>
            <p>
              Do not proceed based on assumptions. Clarify the
              discrepancy using relevant revenue, registration and
              survey records, with professional assistance where
              necessary.
            </p>

            <h3 className="pt-2 font-semibold text-navy">
              Should I consult an advocate before buying land?
            </h3>
            <p>
              Yes. A qualified advocate experienced in property
              matters can examine the title chain, relevant legal
              records and potential risks and advise you before you
              commit to the purchase.
            </p>

            <h2 className="pt-4 font-heading text-2xl font-bold text-navy">
              Conclusion
            </h2>

            <p>
              Buying land requires more than checking its location,
              price and physical boundaries. Reviewing title documents,
              EC, revenue records, survey details, land classification
              and the seller&apos;s authority can help identify issues
              that deserve attention before a transaction.
            </p>

            <p>
              Do not rush into an advance payment or sale agreement
              without understanding the available records. For a
              property-specific legal opinion, consult a qualified
              advocate.
            </p>
          </div>

          <section className="mt-12 rounded-xl border border-navy/10 bg-mist p-6">
            <h2 className="font-heading text-xl font-bold text-navy">
              Official References
            </h2>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-sm leading-6 text-muted">
              <li>
                <a
                  href="https://eservices.tn.gov.in/eservicesnew/home.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gold-text underline"
                >
                  Tamil Nadu Government Land e-Services
                </a>
              </li>
              <li>
                <a
                  href="https://tnreginet.gov.in/portal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gold-text underline"
                >
                  Tamil Nadu Registration Department (TNREGINET)
                </a>
              </li>
              <li>
                <a
                  href="https://www.indiacode.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gold-text underline"
                >
                  India Code – Government of India legislation portal
                </a>
              </li>
            </ul>
          </section>

          <p className="mt-8 border-l-4 border-gold bg-mist p-5 text-sm leading-7 text-muted">
            <strong className="text-navy">Disclaimer:</strong>{' '}
            This article is intended for general public awareness only.
            It is not legal advice, a title certificate or a guarantee
            that any property is free from disputes or encumbrances.
            Property requirements and applicable rules may vary
            according to the facts and location. Obtain independent
            advice from a qualified advocate and verify records with
            the relevant government authorities before making a
            purchase.
          </p>
        </div>
      </article>

      <ContactCta />
    </>
  );
}