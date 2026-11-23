import Link from 'next/link';
import { type Service, serviceHref } from '@/data/services';

export function ServiceCard({
  service,
  anchor = false,
}: {
  service: Service;
  anchor?: boolean;
}) {
  return (
    <article
      id={anchor ? service.slug : undefined}
      className="scroll-mt-32 flex h-full flex-col rounded-xl border border-navy/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <h3 className="font-heading text-lg font-bold text-navy">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {service.summary}
      </p>
      {!anchor && (
        <Link
          href={serviceHref(service)}
          aria-label={`Learn more about ${service.title}`}
          className="mt-3 inline-block py-1 text-sm font-semibold text-gold-text hover:underline"
        >
          Learn more →
        </Link>
      )}
    </article>
  );
}