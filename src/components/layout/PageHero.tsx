import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Crumb { label: string; href?: string }

export function PageHero({ title, intro, crumbs }: { title: string; intro?: string; crumbs?: Crumb[] }) {
  return (
    <section className="bg-gradient-to-r from-[#0d2145] via-[#14305a] to-[#0d2145] py-14 text-white">
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/70">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link href="/" className="inline-block py-1 hover:text-gold-light">Home</Link></li>
            {(crumbs ?? []).map((c) => (
              <li key={c.label} className="flex items-center gap-1">
                <ChevronRight size={14} aria-hidden="true" />
                {c.href ? <Link href={c.href} className="inline-block py-1 hover:text-gold-light">{c.label}</Link> : <span aria-current="page" className="text-gold-light">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/85">{intro}</p>}
      </div>
    </section>
  );
}
