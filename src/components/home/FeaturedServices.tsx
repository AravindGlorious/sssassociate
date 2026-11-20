
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { ServiceCard } from '@/components/services/ServiceCard';

import {
  type CategoryKey,
  categories,
  getService,
  type Service,
} from '@/data/services';

interface Props {
  id: string;
  category: CategoryKey;
  eyebrow: string;
  title: string;
  intro: string;
  slugs: string[];
  tone?: 'white' | 'mist';
}

export function FeaturedServices({
  id,
  category,
  eyebrow,
  title,
  intro,
  slugs,
  tone = 'white',
}: Props) {
  const list = slugs
    .map(getService)
    .filter((service): service is Service => Boolean(service));

  const categoryInfo = categories[category];

  return (
    <Section
      id={id}
      eyebrow={eyebrow}
      title={title}
      intro={intro}
      tone={tone}
    >
      {list.length > 0 && (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 text-center">
        <Link
          href={categoryInfo.path}
          className="btn btn-dark btn-sm"
          aria-label={`Explore all ${categoryInfo.title}`}
        >
          Explore All {categoryInfo.title}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}