import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { business, whatsappLink } from '@/config/business';
import { footerServices, legalLinks, quickLinks } from '@/config/navigation';
import { getService, serviceHref } from '@/data/services';
import { SocialLinks } from '@/components/ui/SocialIcons';
import { BackToTop } from './BackToTop';

const h = 'mb-4 font-heading text-lg font-bold text-gold-light';
const link = 'inline-block py-1 text-sm text-white/80 transition hover:text-gold-light';

export function Footer() {
  const a = business.address;
  return (
    <footer className="bg-navy text-white">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/logo.jpg" alt="" width={100} height={94} className="h-16 w-auto rounded-sm" />
            <div>
              <p className="font-heading text-2xl font-bold leading-none">{business.name}</p>
              <p className="mt-1 text-xs text-gold-light">{business.tagline}</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-white/80">
            We help individuals and families in Irugur and across Coimbatore with property paperwork, legal opinions through qualified advocates, and bank-related settlement matters.
          </p>
        </div>
        <nav aria-label="Quick links">
          <h2 className={h}>Quick Links</h2>
          <ul className="space-y-2.5">{quickLinks.map((l) => <li key={l.label}><Link className={link} href={l.href}>{l.label}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Our services">
          <h2 className={h}>Our Services</h2>
          <ul className="space-y-2.5">
            {footerServices.map((f) => {
              const s = getService(f.slug);
              return s ? <li key={f.slug}><Link className={link} href={serviceHref(s)}>{f.label}</Link></li> : null;
            })}
          </ul>
        </nav>
        <div>
          <h2 className={h}>Contact Us</h2>
          <address className="space-y-3 text-sm not-italic text-white/80">
            <p className="flex gap-3"><MapPin size={18} className="mt-0.5 flex-none text-gold" aria-hidden="true" />
              <a className="inline-block py-1 hover:text-gold-light" href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
                {a.street},<br />{a.city}, {a.locality},<br />{a.region} – {a.postalCode},<br />{a.country}.
              </a></p>
            {business.phones.map((p) => (
              <p key={p.tel} className="flex gap-3"><Phone size={18} className="flex-none text-gold" aria-hidden="true" /><a className="inline-block py-1 hover:text-gold-light" href={`tel:${p.tel}`}>{p.display}</a></p>
            ))}
            <p className="flex gap-3"><Mail size={18} className="flex-none text-gold" aria-hidden="true" /><a className="inline-block break-all py-1 hover:text-gold-light" href={`mailto:${business.email}`}>{business.email}</a></p>
            <p className="flex gap-3"><MessageCircle size={18} className="flex-none text-gold" aria-hidden="true" /><a className="inline-block py-1 hover:text-gold-light" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="wrap flex flex-col items-center justify-between gap-4 py-5 text-sm text-white/70 md:flex-row">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {legalLinks.map((l) => <li key={l.href}><Link className="inline-block py-1.5 hover:text-gold-light" href={l.href}>{l.label}</Link></li>)}
          </ul>
          <div className="flex items-center gap-4"><SocialLinks /><BackToTop /></div>
        </div>
      </div>
    </footer>
  );
}
