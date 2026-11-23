import Image from 'next/image';
import Link from 'next/link';

import { categories } from '@/data/services';

const core = [
  {
    label: ['Legal', 'Document Support'],
    href: categories.legal.path,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3v18" />
        <path d="m19 8 3 8a5 5 0 0 1-6 0zV7" />
        <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" />
        <path d="m5 8 3 8a5 5 0 0 1-6 0zV7" />
        <path d="M7 21h10" />
      </svg>
    ),
  },
  {
    label: ['Property', '& Registration'],
    href: categories.property.path,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
  },
  {
    label: ['Bank &', 'Financial Support'],
    href: categories.financial.path,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M13.744 17.736a6 6 0 1 1-7.48-7.48" />
        <path d="M15 6h1v4" />
        <path d="m6.134 14.768.866-.5 2 3.464" />
        <circle cx="16" cy="8" r="6" />
      </svg>
    ),
  },
  {
    label: ['Documents', '& Translation'],
    href: '/services/legal-document-translation',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
        <path d="M10 9H8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
      </svg>
    ),
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
            Based in Irugur, Coimbatore, we help check property records,
            prepare registration files, and organize bank files clearly.
          </p>

          <p>
            We explain steps in simple English and Tamil, and connect you with
            qualified professionals when specialist advice is needed.
          </p>

          <Link href="/about" className="btn btn-sm">
            Learn About Our Services →
          </Link>
        </div>

        <div className="cs">
          <h2>Our Main Service Areas</h2>

          <div className="g">
            {core.map(({ icon, label, href }) => (
              <Link key={label[0]} href={href}>
                {icon}
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