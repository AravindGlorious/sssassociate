import type { ReactNode } from 'react';
import { PageHero } from './PageHero';

export function LegalDoc({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <>
      <PageHero title={title} intro={intro} crumbs={[{ label: title }]} />
      <div className="wrap max-w-3xl space-y-6 py-14 leading-relaxed text-ink [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-navy [&_a]:font-semibold [&_a]:text-gold-text [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6">{children}</div>
    </>
  );
}
