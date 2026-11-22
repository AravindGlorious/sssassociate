import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Editorial Policy',
  description:
    'How SSS Associate Services writes, reviews, and updates guides on land records, deed registration, and bank documentation in Tamil Nadu.',
  path: '/editorial-policy',
});

export default function EditorialPolicyPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-gold-text">
        Standards &amp; Transparency
      </p>

      <h1 className="mt-2 font-heading text-3xl font-bold text-navy sm:text-4xl">
        Editorial Policy
      </h1>

      <p className="mt-4 text-base leading-relaxed text-muted">
        Guides, checklists, and articles published on SSS Associate Services are
        written to help readers understand general documentation steps around
        land records, property registration, translations, and bank files in
        Tamil Nadu.
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-navy/90">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy">
            1. How Content Is Prepared and Reviewed
          </h2>
          <p className="mt-2">
            Our team prepares informational guides based on common document
            workflows, public procedures, and practical experience handling
            records. Where legal interpretation or advocate review is needed,
            qualified advocates handle that review.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-navy">
            2. Updates and Corrections
          </h2>
          <p className="mt-2">
            Procedures, portals, and documentation requirements can change over
            time. When we spot outdated details or inaccuracies, we update the
            relevant page and revise the update note where applicable.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-navy">
            3. Not Legal or Financial Advice
          </h2>
          <p className="mt-2">
            Articles and checklists on this site are for general information
            only. They do not replace formal legal opinion from a licensed
            advocate or final decisions made by banks and financial
            institutions. Please see our{' '}
            <Link href="/disclaimer" className="font-semibold underline">
              Disclaimer
            </Link>{' '}
            for full details.
          </p>
        </div>
      </div>
    </section>
  );
}