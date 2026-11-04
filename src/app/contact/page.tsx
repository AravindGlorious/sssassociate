import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { FaqList } from '@/components/faq/FaqList';
import { PageSchema } from '@/components/seo/PageSchema';
import { business, whatsappLink } from '@/config/business';
import { pageMetadata } from '@/lib/seo';

const description = 'Call, WhatsApp, email or send an enquiry to SSS Associate, 9 Gandhi Nagar, Irugur, Coimbatore 641103, for legal, property and financial assistance.';
export const metadata = pageMetadata({ title: 'Contact SSS Associate in Irugur, Coimbatore | Enquiry', description, path: '/contact', fullTitle: true });

export default function ContactPage() {
  const a = business.address;
  const faqs = [
    { question: 'Where is SSS Associate located?', answer: `Our office is at ${business.oneLineAddress}, India. We assist clients from Irugur, Coimbatore and nearby areas such as Sulur, Singanallur, Ondipudur and Pallapalayam.` },
    { question: 'How can I contact SSS Associate?', answer: `Call ${business.phones[0].display} or ${business.phones[1].display}, message us on WhatsApp, email ${business.email}, or send the enquiry form on this page.` },
    { question: 'What should I include in my enquiry?', answer: 'Tell us which service you need, briefly describe the property or matter, and mention any deadline. We confirm which documents are needed for your case after we understand it.' },
  ];
  return (
    <>
      <PageSchema type="ContactPage" name="Contact SSS Associate" description={description} path="/contact" crumbs={[{ name: 'Contact Us', path: '/contact' }]} />
      <PageHero title="Contact Us" intro="Tell us what you need and we will respond with the next steps." crumbs={[{ label: 'Contact Us' }]} />
      <section className="bg-mist py-14"><div className="wrap grid gap-10 lg:grid-cols-[1fr_380px]">
        <ContactForm />
        <aside className="space-y-5 rounded-xl bg-navy p-7 text-white" aria-label="Contact details">
          <h2 className="font-heading text-2xl font-bold text-gold-light">Reach us directly</h2>
          {business.phones.map((p) => <p key={p.tel}><a href={`tel:${p.tel}`} className="flex items-center gap-3 py-1 hover:text-gold-light"><Phone size={20} className="text-gold" aria-hidden="true" />{p.display}</a></p>)}
          <p><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-1 hover:text-gold-light"><MessageCircle size={20} className="text-gold" aria-hidden="true" />WhatsApp us</a></p>
          <p><a href={`mailto:${business.email}`} className="flex items-center gap-3 break-all py-1 hover:text-gold-light"><Mail size={20} className="text-gold" aria-hidden="true" />{business.email}</a></p>
          <address className="flex gap-3 not-italic"><MapPin size={20} className="mt-1 flex-none text-gold" aria-hidden="true" /><span>{business.name}<br />{a.street},<br />{a.city}, {a.locality},<br />{a.region} – {a.postalCode}, {a.country}.</span></address>
          <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm">Get Directions</a>
        </aside>
      </div></section>
      <section className="py-14" aria-labelledby="contact-faq"><div className="wrap">
        <h2 id="contact-faq" className="mb-8 text-center text-3xl font-bold text-navy">Contact and location questions</h2>
        <FaqList faqs={faqs} />
      </div></section>
    </>
  );
}
