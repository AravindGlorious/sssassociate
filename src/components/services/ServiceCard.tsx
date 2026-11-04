import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { type Service, serviceHref } from '@/data/services';

export function ServiceCard({ service, anchor = false }: { service: Service; anchor?: boolean }) {
  return (
    <article id={anchor ? service.slug : undefined} className="scroll-mt-32 flex h-full flex-col rounded-xl border border-navy/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <h3 className="font-heading text-xl font-bold text-navy">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{service.summary}</p>
      {!anchor && (
        <Link href={serviceHref(service)} className="mt-3 inline-flex items-center gap-2 py-2 text-sm font-semibold text-gold-text transition hover:gap-3">
          Learn more<span className="sr-only"> about {service.title}</span> <ArrowRight size={16} aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}
