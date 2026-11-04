import type { ReactNode } from 'react';

interface Props { id?: string; eyebrow?: string; title: ReactNode; intro?: string; tone?: 'white' | 'mist' | 'navy'; children: ReactNode; headingId?: string }

export function Section({ id, eyebrow, title, intro, tone = 'white', children, headingId }: Props) {
  const bg = tone === 'mist' ? 'bg-mist' : tone === 'navy' ? 'bg-navy text-white' : 'bg-white';
  const hid = headingId ?? (id ? `${id}-title` : undefined);
  return (
    <section id={id} aria-labelledby={hid} className={`${bg} py-16 md:py-20`}>
      <div className="wrap">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          {eyebrow && <p className={`mb-2 text-sm font-semibold uppercase tracking-wider ${tone === 'navy' ? 'text-gold' : 'text-gold-text'}`}>{eyebrow}</p>}
          <h2 id={hid} className={`text-3xl font-bold md:text-4xl ${tone === 'navy' ? 'text-white' : 'text-navy'}`}>{title}</h2>
          {intro && <p className={`mt-4 leading-relaxed ${tone === 'navy' ? 'text-white/80' : 'text-muted'}`}>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
