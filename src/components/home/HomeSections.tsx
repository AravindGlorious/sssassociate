import Link from 'next/link';
import {
  Coins,
  FileSearch,
  FileText,
  House,
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
      title="Our Services"
      intro="Practical assistance with important documents, registration procedures and financial matters to help you make informed decisions."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li>
          <CategoryOverviewCard
            Icon={Scale}
            title="Legal Services"
            href={categories.legal.path}
            count={byCategory('legal').length}
            text="Document review assistance, legal process guidance and support in connecting with qualified advocates when required."
          />
        </li>

        <li>
          <CategoryOverviewCard
            Icon={House}
            title="Land & Registration"
            href={categories.property.path}
            count={byCategory('property').length}
            text="Assistance with patta, EC, sale deeds, land records and registration procedures."
          />
        </li>

        <li>
          <CategoryOverviewCard
            Icon={Coins}
            title="Financial Services"
            href={categories.financial.path}
            count={byCategory('financial').length}
            text="Support with bank-related paperwork, one-time settlement documentation and loan matters."
          />
        </li>

        <li>
          <CategoryOverviewCard
            Icon={Languages}
            title="Documentation & Translation"
            href="/services/legal-document-translation"
            text="Tamil to English and English to Tamil translation assistance for relevant legal and official documents."
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
    text: 'We help you understand important details in the documents you share and identify points that may need further attention.',
  },
  {
    Icon: Users,
    title: 'Coordinated Support',
    text: 'We help organise related paperwork and connect you with the appropriate professional support when needed.',
  },
  {
    Icon: MessageSquareText,
    title: 'Simple Communication',
    text: 'We explain processes, document requirements and next steps in clear English and Tamil.',
  },
  {
    Icon: ShieldCheck,
    title: 'Honest and Transparent',
    text: 'We explain our services, fees and limitations clearly. We do not promise guaranteed approvals or outcomes.',
  },
  {
    Icon: MapPin,
    title: 'Support Across Tamil Nadu',
    text: 'We assist customers from different cities and towns across Tamil Nadu, depending on the service and requirements.',
  },
  {
    Icon: FileText,
    title: 'Individual Attention',
    text: 'We understand your requirement first and help identify the documents and assistance relevant to your situation.',
  },
];

export function WhyChoose() {
  return (
    <Section
      id="why-us"
      tone="mist"
      eyebrow="Why SSS Associate"
      title="Why Work With Us?"
      intro="Our approach focuses on clear communication, organised paperwork and dependable customer support."
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
    text: 'Call, send a WhatsApp message or use our enquiry form to explain your requirement.',
  },
  {
    title: 'Share the Documents',
    text: 'Provide the available paperwork related to your enquiry so we can understand the matter.',
  },
  {
    title: 'Understand the Next Steps',
    text: 'We explain the relevant process, document requirements and when specialist advice may be necessary.',
  },
  {
    title: 'Get the Agreed Support',
    text: 'We assist with the agreed documentation and follow-up based on the nature of your request.',
  },
];

export function HowWeWork() {
  return (
    <Section
      id="process"
      tone="navy"
      eyebrow="Our process"
      title="How We Work"
      intro="Four simple steps to help you understand and manage your requirements."
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
      eyebrow="Our reach"
      title="Serving Customers Across Tamil Nadu"
      intro="We provide assistance with document-related requirements, registration procedures and financial paperwork for customers across Tamil Nadu."
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
            Contact our team to discuss your requirements and
            check the availability of assistance in your location.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="mb-5 text-center font-heading text-lg font-bold text-navy">
            Cities and Locations
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
            How Can We Help You?
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-muted">
            Tell us what assistance you need. Our team will
            explain the available services and the next steps.
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