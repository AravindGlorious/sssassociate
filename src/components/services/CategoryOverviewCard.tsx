import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface Props { title: string; text: string; href: string; count?: number; Icon: LucideIcon }

export function CategoryOverviewCard({ title, text, href, count, Icon }: Props) {
  return (
    <Link href={href} className="group flex h-full flex-col rounded-xl border border-navy/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy text-gold"><Icon size={28} aria-hidden="true" /></span>
      <h3 className="font-heading text-xl font-bold text-navy">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{text}</p>
      <span className="mt-3 inline-flex items-center gap-2 py-2 text-sm font-semibold text-gold-text">
        {count ? `${count} services` : 'View services'} <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
