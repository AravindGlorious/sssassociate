import { ChevronDown } from 'lucide-react';
import type { Faq } from '@/data/faqs';

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((f) => (
        <details key={f.question} className="faq rounded-lg border border-navy/10 bg-white shadow-sm">
          <summary className="flex items-center justify-between gap-4 p-5 text-left font-semibold text-navy">
            <h3 className="font-sans text-base font-semibold">{f.question}</h3>
            <ChevronDown className="chev flex-none text-gold-text transition" size={20} aria-hidden="true" />
          </summary>
          <p className="px-5 pb-5 leading-relaxed text-muted">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
