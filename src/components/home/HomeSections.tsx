
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
      title="Our Services"
      intro="Explore practical support for property records, registration procedures, important paperwork and financial matters."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li>
          <CategoryOverviewCard
            Icon={Scale}
            title="Legal Services"
            href={categories.legal.path}
            count={byCategory('legal').length}
            text="Understand important documents, review relevant details and connect with qualified advocates when required."
          />
        </li>

        <li>
          <CategoryOverviewCard
            Icon={MapPin}
            title="Land & Registration"
            href={categories.property.path}
            count={byCategory('property').length}
            text="Get guidance on patta, EC, sale deeds, land records and property registration procedures."
          />
        </li>

        <li>
          <CategoryOverviewCard
            Icon={Coins}
            title="Financial Services"
            href={categories.financial.path}
            count={byCategory('financial').length}
            text="Find help with bank paperwork, one-time settlement documents and loan-related matters."
          />
        </li>

        <li>
          <CategoryOverviewCard
            Icon={Languages}
            title="Documentation & Translation"
            href="/services/legal-document-translation"
            text="Translate relevant official and legal documents between Tamil and English."
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
    text: 'We help you understand the details in your paperwork and identify points that may need further attention.',
  },
  {
    Icon: Users,
    title: 'Coordinated Support',
    text: 'We organise related paperwork and help you connect with the right professional when needed.',
  },
  {
    Icon: MessageSquareText,
    title: 'Clear Communication',
    text: 'We explain processes, required documents and next steps in simple English and Tamil.',
  },
  {
    Icon: ShieldCheck,
    title: 'Honest and Transparent',
    text: 'We explain our services, fees and limitations clearly. We never promise guaranteed approvals or outcomes.',
  },
  {
    Icon: MapPin,
    title: 'Serving Tamil Nadu',
    text: 'Customers from different cities and towns can contact us. Availability depends on the service and location.',
  },
  {
    Icon: FileSearch,
    title: 'Personal Attention',
    text: 'We first understand your situation and then identify the paperwork and guidance relevant to your needs.',
  },
];

export function WhyChoose() {
  return (
    <Section
      id="why-us"
      tone="mist"
      eyebrow="Why SSS Associate"
      title="Why Work With Us?"
      intro="We focus on clear communication, organised paperwork and dependable customer care."
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
    text: 'Call us, send a WhatsApp message or use the enquiry form to explain your requirement.',
  },
  {
    title: 'Share the Documents',
    text: 'Send the available paperwork so we can understand your request.',
  },
  {
    title: 'Review the Next Steps',
    text: 'We explain the process, required documents and when specialist advice may be needed.',
  },
  {
    title: 'Receive the Agreed Support',
    text: 'We help with the agreed paperwork and follow-up based on your request.',
  },
];

export function HowWeWork() {
  return (
    <Section
      id="process"
      tone="navy"
      eyebrow="Our process"
      title="How We Work"
      intro="Here is what to expect when you contact our team."
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
      intro="Customers across Tamil Nadu can contact us about property records, registration procedures and financial paperwork."
    >
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl bg-navy p-7 text-center text-white shadow-lg sm:p-10">
          <MapPinned
            className="mx-auto text-gold"
            size={34}
            aria-hidden="true"
          />

          <h3 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
            Support Across Multiple Cities
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/75">
            Contact us to discuss your requirement and check whether the
            requested service is available in your area.
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
            Have a Question?
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-muted">
            Tell us what you need. Our team will explain the available options
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