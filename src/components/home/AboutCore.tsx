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
    label: ['Documents &', 'Translation'],
    href: '/services/legal-document-translation',
  },
];

export function AboutCore() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="photo">
          <Image
            src="/images/sss-associate-property-documentation.jpg"
            alt="Property paperwork, a model house and scales of justice"
            width={800}
            height={404}
            sizes="(max-width: 900px) 100vw, 40vw"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="kick">About SSS Associate</p>

          <h2 id="about-title">
            Clear Guidance for Important
            <em> Property &amp; Financial Matters</em>
          </h2>

          <p>
            SSS Associate Services helps families review land
            records, registration steps, and bank files. We
            explain each step in plain words and share clear
            next options. Based in Irugur, Coimbatore, our team
            supports clients across Tamil Nadu with care.
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