import Link from 'next/link';
import { business, whatsappLink } from '@/config/business';

export function ContactCta({
  title = 'Need help with property, legal, or bank papers?',
  text = 'Tell us what you need. We will explain your options and list the exact documents required for your case.',
  whatsappMessage,
}: {
  title?: string;
  text?: string;
  whatsappMessage?: string;
}) {
  return (
    <section
      aria-labelledby="cta-title"
      className="bg-gradient-to-r from-[#0d2145] via-[#14305a] to-[#0d2145] py-14 text-white"
    >
      <div className="wrap text-center">
        <h2 id="cta-title" className="text-3xl font-bold md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/85">{text}</p>

        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn">
            Send an Enquiry
          </Link>
          <a href={`tel:${business.phones[0].tel}`} className="btn btn-outline">
            Call {business.phones[0].display}
          </a>
          <a
            href={whatsappLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            WhatsApp Us →
          </a>
        </div>
      </div>
    </section>
  );
}