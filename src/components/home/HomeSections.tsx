
import Link from 'next/link';
import {
  Coins,
  FileSearch,
  Languages,
  MapPin,
  MessageSquareText,
  Scale,
  ShieldCheck,
  Users,
  ArrowRight,
  MapPinned,
} from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { CategoryOverviewCard } from '@/components/services/CategoryOverviewCard';
import { byCategory, categories } from '@/data/services';

export function ServicesOverview() {
  return (
    <Section
      id="services"
      eyebrow="What we do"
      title="Property, Legal Document and Financial Support"
      intro="Explore practical assistance with property records, document checks, registration procedures, translations and bank paperwork."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li>
          <CategoryOverviewCard
            Icon={Scale}
            title="Legal Document Support"
            href={categories.legal.path}
            count={byCategory('legal').length}
            text="Get help reviewing important deeds and property papers. We can coordinate with qualified advocates when legal advice is required."
          />
        </li>

        <li>
          <CategoryOverviewCard
            Icon={MapPin}
            title="Property & Registration"
            href={categories.property.path}
            count={byCategory('property').length}
            text="Understand the paperwork involved in patta transfer, EC applications, sale deeds and property registration."
          />
        </li>

        <li>
          <CategoryOverviewCard
            Icon={Coins}
            title="Bank & Financial Support"
            href={categories.financial.path}
            count={byCategory('financial').length}
            text="Get assistance organizing loan documents, bank files and one-time settlement requests. Final decisions rest with the lender."
          />
        </li>

        <li>
          <CategoryOverviewCard
            Icon={Languages}
            title="Document Translation"
            href="/services/legal-document-translation"
            text="Get assistance translating relevant documents between Tamil and English."
          />
        </li>
      </ul>
    </Section>
  );
}

const why = [
  {
    Icon: FileSearch,
    title: 'Careful Document Review',
    text: 'We help you check important details in your documents and identify points that may need further professional review.',
  },
  {
    Icon: Users,
    title: 'Coordinated Support',
    text: 'We help organize your paperwork and coordinate with suitable professionals when your requirements call for it.',
  },
  {
    Icon: MessageSquareText,
    title: 'Clear Communication',
    text: 'We explain document requirements and process steps in simple English or Tamil.',
  },
  {
    Icon: ShieldCheck,
    title: 'Honest and Transparent',
    text: 'We explain our service scope, applicable charges and limitations. We do not promise guaranteed legal or financial outcomes.',
  },
  {
    Icon: MapPin,
    title: 'Tamil Nadu Service Reach',
    text: 'Customers from different parts of Tamil Nadu can contact us to check service availability for their requirements.',
  },
  {
    Icon: FileSearch,
    title: 'Personal Attention',
    text: 'We first understand your requirement, then explain the relevant documents and practical next steps.',
  },
];

export function WhyChoose() {
  return (
    <Section
      id="why-us"
      tone="mist"
      eyebrow="Why SSS Associate"
      title="Why Choose SSS Associate?"
      intro="We believe good support starts with clear communication, organized paperwork and honest guidance."
    >
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {why.map(({ Icon, title, text }) => (
          <li
            key={title}
            className="flex gap-4 rounded-xl bg-white p-6 shadow-sm"
          >
            <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-full bg-navy text-gold">
              <Icon size={22} aria-hidden="true" />
            </span>

            <div>
              <h3 className="font-heading text-lg font-bold text-navy">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted">
                {text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

const steps = [
  {
    title: 'Tell Us What You Need',
    text: 'Call us, send a WhatsApp message or submit the contact form to explain your requirement.',
  },
  {
    title: 'Share the Available Documents',
    text: 'Share copies of the relevant papers so we can understand your request.',
  },
  {
    title: 'Understand the Next Steps',
    text: 'We explain the process, documents required and when assistance from a qualified advocate or other professional may be needed.',
  },
  {
    title: 'Receive the Agreed Support',
    text: 'We provide the document assistance and coordination agreed for your requirement.',
  },
];

export function HowWeWork() {
  return (
    <Section
      id="process"
      tone="navy"
      eyebrow="Our process"
      title="How Our Process Works"
      intro="A simple process helps us understand your needs and explain the next steps."
    >
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-xl border border-gold/40 bg-white/5 p-6"
          >
            <span className="font-heading text-4xl font-bold text-gold">
              {String(index + 1).padStart(2, '0')}
            </span>

            <h3 className="mt-3 font-heading text-lg font-bold text-white">
              {step.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-white/80">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

const serviceAreas = [
  'Chennai',
  'Coimbatore',
  'Tiruchirappalli',
  'Madurai',
  'Salem',
  'Erode',
  'Tiruppur',
  'Thanjavur',
  'Vellore',
  'Tirunelveli',
  'Dindigul',
  'Namakkal',
  'Karur',
  'Kanchipuram',
  'Tiruvallur',
  'Villupuram',
  'Cuddalore',
  'Thoothukudi',
  'Nagercoil',
];

export function AreasWeServe() {
  return (
    <Section
      id="areas"
      eyebrow="Where we serve"
      title="Supporting Customers Across Tamil Nadu"
      intro="Based in Irugur, Coimbatore, SSS Associate Services welcomes enquiries from customers across Tamil Nadu for property documentation, registration guidance and bank paperwork."
    >
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl bg-navy p-7 text-center text-white shadow-lg sm:p-10">
          <MapPinned
            className="mx-auto text-gold"
            size={34}
            aria-hidden="true"
          />

          <h3 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
            Assistance Across Multiple Cities
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/75">
            Contact our team with your location and requirement. We will help
            you check whether the requested service is available in your area.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="mb-5 text-center font-heading text-lg font-bold text-navy">
            Cities We Receive Enquiries From
          </h3>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {serviceAreas.map((area) => (
              <li
                key={area}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-4 text-sm font-semibold text-navy shadow-sm transition-colors hover:border-gold hover:bg-gray-50"
              >
                <MapPin
                  size={16}
                  className="flex-none text-gold-text"
                  aria-hidden="true"
                />
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-9 rounded-xl border border-gray-200 bg-white p-6 text-center sm:p-8">
          <h3 className="font-heading text-xl font-bold text-navy">
            Need Help With Your Documents?
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-muted">
            Tell us what you need. Our team will explain the available support
            and the next steps.
          </p>

          <Link
            href="/contact"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
          >
            Contact Our Team
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
