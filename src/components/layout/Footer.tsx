import Image from 'next/image';
import Link from 'next/link';

import { business, whatsappLink } from '@/config/business';
import { footerServices, legalLinks, quickLinks } from '@/config/navigation';
import { getService, serviceHref } from '@/data/services';
import { SocialLinks } from '@/components/ui/SocialIcons';
import { BackToTop } from './BackToTop';

const headingClass = 'mb-4 font-heading text-lg font-bold text-gold-light';
const linkClass =
  'inline-block py-1 text-sm text-white/80 transition hover:text-gold-light';

export function Footer() {
  const a = business.address;

  return (
    <footer className="bg-navy text-white">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Business Information */}
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/sss-associate-services-logo.jpg"
              alt={`${business.name} logo`}
              width={100}
              height={94}
              className="h-16 w-auto rounded-sm"
            />
            <div>
              <p className="font-heading text-2xl font-bold leading-none">
                {business.name}
              </p>
              <p className="mt-1 text-xs text-gold-light">
                {business.tagline}
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-white/80">
            We help families in Irugur and Coimbatore with property papers and
            bank files. We also connect you with qualified advocates when legal
            opinions are needed.
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick links">
          <h2 className={headingClass}>Quick Links</h2>
          <ul className="space-y-2">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link className={linkClass} href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label="Our services">
          <h2 className={headingClass}>Our Services</h2>
          <ul className="space-y-2">
            {footerServices.map((f) => {
              const s = getService(f.slug);
              return s ? (
                <li key={f.slug}>
                  <Link className={linkClass} href={serviceHref(s)}>
                    {f.label}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </nav>

        {/* Contact Information */}
        <div>
          <h2 className={headingClass}>Contact Us</h2>
          <address className="space-y-2.5 text-sm not-italic text-white/80">
            <p>
              <a
                className="inline-block py-1 hover:text-gold-light"
                href={business.mapsUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label="View SSS Associate office location on Google Maps"
              >
                {`${a.street}, ${a.locality}, ${a.city}, ${a.region} – ${a.postalCode}, ${a.country}.`}
              </a>
            </p>

            {business.phones.map((p) => (
              <p key={p.tel}>
                <a
                  className="inline-block py-1 hover:text-gold-light"
                  href={`tel:${p.tel}`}
                  aria-label={`Call SSS Associate at ${p.display}`}
                >
                  {p.display}
                </a>
              </p>
            ))}

            <p>
              <a
                className="inline-block break-all py-1 hover:text-gold-light"
                href={`mailto:${business.email}`}
                aria-label={`Email SSS Associate at ${business.email}`}
              >
                {business.email}
              </a>
            </p>

            <p>
              <a
                className="inline-block py-1 font-medium text-gold-light hover:underline"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact SSS Associate through WhatsApp"
              >
                Chat on WhatsApp →
              </a>
            </p>
          </address>
        </div>
      </div>

      {/* Copyright and Bottom Navigation */}
      <div className="border-t border-white/15">
        <div className="wrap flex flex-col items-center justify-between gap-4 py-5 text-sm text-white/70 md:flex-row">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>

          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  className="inline-block py-1.5 hover:text-gold-light"
                  href={l.href}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <SocialLinks />
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}