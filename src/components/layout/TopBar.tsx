import { Mail, MapPin, Phone } from 'lucide-react';
import { business, whatsappPlainLink } from '@/config/business';
import { SocialLinks, WhatsAppGlyph } from '@/components/ui/SocialIcons';

export function TopBar() {
  const a = business.address;
  return (
    <section className="topbar" aria-label="Business contact details">
      <div className="wrap">
        <span className="item hide-md"><MapPin aria-hidden="true" />{`${a.street}, ${a.city}, ${a.locality}, ${a.region} – ${a.postalCode}`}</span>
        <a className="item hide-md" href={`mailto:${business.email}`}><Mail aria-hidden="true" />{business.email}</a>
        <span className="item">
          <Phone aria-hidden="true" />
          <a href={`tel:${business.phones[0].tel}`}>{business.phones[0].display}</a>
          <span aria-hidden="true">|</span>
          <a href={`tel:${business.phones[1].tel}`}>{business.phones[1].display}</a>
        </span>
        <span className="flex items-center gap-3">
          <SocialLinks />
          <a href={whatsappPlainLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp (opens in a new tab)" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#25D366] transition hover:-translate-y-0.5">
            <WhatsAppGlyph />
          </a>
        </span>
      </div>
    </section>
  );
}
