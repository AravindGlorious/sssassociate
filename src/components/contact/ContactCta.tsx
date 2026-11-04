import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';
import { business, whatsappLink } from '@/config/business';

export function ContactCta({ title = 'Need help with a property, legal or financial matter?', text = 'Tell us what you need. We will listen, explain the options and confirm the documents required for your specific case.', whatsappMessage }: { title?: string; text?: string; whatsappMessage?: string }) {
  return (
    <section aria-labelledby="cta-title" className="bg-gradient-to-r from-[#0d2145] via-[#14305a] to-[#0d2145] py-16 text-white">
      <div className="wrap text-center">
        <h2 id="cta-title" className="text-3xl font-bold md:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/85">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn">Send an Enquiry</Link>
          <a href={`tel:${business.phones[0].tel}`} className="btn btn-outline"><Phone size={18} aria-hidden="true" />{business.phones[0].display}</a>
          <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><MessageCircle size={18} aria-hidden="true" />WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
