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
    label: ['Legal', 'Document Support'],
    href: categories.legal.path,
  },
  {
    Icon: House,
    label: ['Property', '& Registration'],
    href: categories.property.path,
  },
  {
    Icon: Coins,
    label: ['Bank &', 'Financial Support'],
    href: categories.financial.path,
  },
  {
    Icon: FileText,
    label: ['Documents', '& Translation'],
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
            alt="Property documents, a model house and scales representing document support"
            width={800}
            height={404}
            loading="eager"
            sizes="(max-width: 900px) 100vw, 40vw"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="kick">About SSS Associate Services</p>

          <h2 id="about-title">
            Clear Help for Key
            <em> Property &amp; Financial Papers</em>
          </h2>

          <p>
            Based in Irugur, Coimbatore, we help people check property
            records, prepare registration files, and organize bank documents.
            We guide you through each step without confusion.
          </p>

          <p>
            We explain requirements in simple English and Tamil. When legal
            or specialist advice is needed, we connect you with qualified
            professionals.
          </p>

          <Link href="/about" className="btn btn-sm">
            Learn About Our Services
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="cs">
          <h2>Our Main Service Areas</h2>

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