
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Coins,
  FileText,
  House,
  Scale,
} from 'lucide-react';

import { categories } from '@/data/services';

const core = [
  {
    Icon: Scale,
    label: ['Legal', 'Services'],
    href: categories.legal.path,
  },
  {
    Icon: House,
    label: ['Land &', 'Registration'],
    href: categories.property.path,
  },
  {
    Icon: Coins,
    label: ['Financial', 'Support'],
    href: categories.financial.path,
  },
  {
    Icon: FileText,
    label: ['Documentation &', 'Translation'],
    href: '/services/legal-document-translation',
  },
];

export function AboutCore() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="photo">
          <Image
            src="/images/about.jpg"
            alt="Legal documents, a model house and scales of justice"
            fill
            sizes="(max-width: 900px) 100vw, 40vw"
          />
        </div>

        <div>
          <p className="kick">About SSS Associate</p>

          <h2 id="about-title">
            Practical Guidance for Legal &amp;{' '}
            <em>Financial Matters</em>
          </h2>

          <p>
            SSS Associate Services helps individuals and families
            with important documents, registration procedures and
            financial matters. We offer assistance with document
            checks, legal processes, land records and bank-related
            paperwork. Our focus is on clear communication,
            dependable support and helping customers understand
            each step. We serve customers in Coimbatore and Irugur.
          </p>

          <Link href="/about" className="btn btn-sm">
            Know More About Us
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="cs">
          <h2>Our Core Services</h2>

          <div className="g">
            {core.map(({ Icon, label, href }) => (
              <Link key={label[0]} href={href}>
                <Icon strokeWidth={1.8} aria-hidden="true" />
                {label[0]}
                <br />
                {label[1]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}