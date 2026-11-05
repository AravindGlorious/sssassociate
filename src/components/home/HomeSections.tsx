
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
      intro="Coordinated legal, property and financial consultancy support to help you manage important documents and make informed decisions."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li>
          <CategoryOverviewCard
            Icon={Scale}
            title="Legal Services"
            href={categories.legal.path}
            count={byCategory('legal').length}
            text="Legal opinions through qualified advocates, document verification and dispute support."
          />
        </li>
        <li>
          <CategoryOverviewCard
            Icon={House}
            title="Property Services"
            href={categories.property.path}
            count={byCategory('property').length}
            text="Registration, patta, EC, sale deed and property documentation assistance."
          />
        </li>
        <li>
          <CategoryOverviewCard
            Icon={Coins}
            title="Financial Services"
            href={categories.financial.path}
            count={byCategory('financial').length}
            text="Bank settlement support, OTS preparation and loan documentation assistance."
          />
        </li>
        <li>
          <CategoryOverviewCard
            Icon={Languages}
            title="Documentation & Translation"
            href="/services/legal-document-translation"
            text="English to Tamil and Tamil to English translation of legal and property documents."
          />
        </li>
      </ul>
    </Section>
  );
}

const why = [
  {
    Icon: FileSearch,
    title: 'Document-Focused Approach',
    text: 'We carefully review relevant documents to help identify important details and potential issues.',
  },
  {
    Icon: Users,
    title: 'Coordinated Assistance',
    text: 'We help coordinate related legal, property and financial documentation requirements.',
  },
  {
    Icon: MessageSquareText,
    title: 'Clear Communication',
    text: 'We explain requirements and available next steps in simple English and Tamil.',
  },
  {
    Icon: ShieldCheck,
    title: 'Transparent Guidance',
    text: 'We explain the scope and limitations of our services without promising guaranteed outcomes.',
  },
  {
    Icon: MapPin,
    title: 'Tamil Nadu Service Coverage',
    text: 'We assist clients from cities and towns across Tamil Nadu, subject to the requirements of each matter.',
  },
  {
    Icon: FileText,
    title: 'Case-by-Case Support',
    text: 'Every matter is different. We help identify the documentation and professional assistance relevant to your case.',
  },
];

export function WhyChoose() {
  return (
    <Section
      id="why-us"
      tone="mist"
      eyebrow="Why SSS Associate"
      title="Why Choose SSS Associate"
      intro="Professional support built around clear communication, careful documentation and practical guidance."
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
    title: 'Share Your Requirement',
    text: 'Contact us by phone, WhatsApp or enquiry form and briefly explain your requirement.',
  },
  {
    title: 'Submit Relevant Documents',
    text: 'Share the available documents so we can understand your specific matter.',
  },
  {
    title: 'Review Your Options',
    text: 'We explain the relevant requirements, possible next steps and when professional legal advice is needed.',
  },
  {
    title: 'Proceed with Assistance',
    text: 'We help coordinate the relevant documentation and follow-up based on the agreed scope of work.',
  },
];

export function HowWeWork() {
  return (
    <Section
      id="process"
      tone="navy"
      eyebrow="Our process"
      title="How We Work"
      intro="A clear and straightforward process to help you move forward."
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
      title="Legal, Property & Financial Consultancy Across Tamil Nadu"
      intro="SSS Associate supports individuals, families and businesses with property documentation, legal coordination and financial consultancy requirements across Tamil Nadu."
    >
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl bg-navy p-7 text-center text-white shadow-lg sm:p-10">
          <MapPinned
            className="mx-auto text-gold"
            size={34}
            aria-hidden="true"
          />
          <h3 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
            Serving Clients Across Tamil Nadu
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/75">
            Access coordinated assistance for legal, property and financial
            documentation requirements, wherever you are in Tamil Nadu.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="mb-5 text-center font-heading text-lg font-bold text-navy">
            Cities and Locations We Serve
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
            Need Professional Assistance?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Tell us about your legal, property or financial requirement.
            Our team will help you understand the next steps.
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