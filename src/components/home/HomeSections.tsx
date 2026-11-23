import Link from 'next/link';
import { Coins, Languages, MapPin, Scale } from 'lucide-react';

import { Section } from '@/components/ui/Section';
import { CategoryOverviewCard } from '@/components/services/CategoryOverviewCard';
import { byCategory, categories } from '@/data/services';

export function ServicesOverview() {
  return (
    <Section
      id="services"
      eyebrow="What we do"
      title="Property, Legal & Bank File Support"
      intro="Clear help with property records, registration steps, translations, and bank paperwork."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li>
          <CategoryOverviewCard
            Icon={Scale}
            title="Legal Document Support"
            href={categories.legal.path}
            count={byCategory('legal').length}
            text="Review key deeds and connect with qualified advocates when needed."
          />
        </li>

        <li>
          <CategoryOverviewCard
            Icon={MapPin}
            title="Property & Registration"
            href={categories.property.path}
            count={byCategory('property').length}
            text="Guidance on patta transfer, EC checks, sale deeds, and registration."
          />
        </li>

        <li>
          <CategoryOverviewCard
            Icon={Coins}
            title="Bank & Financial Support"
            href={categories.financial.path}
            count={byCategory('financial').length}
            text="Organize loan files and settlement requests. Lenders decide final terms."
          />
        </li>

        <li>
          <CategoryOverviewCard
            Icon={Languages}
            title="Document Translation"
            href="/services/legal-document-translation"
            text="Translate legal and official papers clearly between Tamil and English."
          />
        </li>
      </ul>
    </Section>
  );
}

const why = [
  {
    title: 'Careful Document Review',
    text: 'We check key details in your papers and flag items needing expert review.',
  },
  {
    title: 'Coordinated Support',
    text: 'We organize files and connect you with qualified professionals when needed.',
  },
  {
    title: 'Clear Communication',
    text: 'We explain required documents and next steps in plain English or Tamil.',
  },
  {
    title: 'Honest and Transparent',
    text: 'We share our scope, fees, and limits upfront without false promises.',
  },
  {
    title: 'Tamil Nadu Service Reach',
    text: 'Clients across Tamil Nadu can reach out to check local support.',
  },
  {
    title: 'Personal Attention',
    text: 'We review your case first, then list exact papers and steps needed.',
  },
];

export function WhyChoose() {
  return (
    <Section
      id="why-us"
      tone="mist"
      eyebrow="Why SSS Associate"
      title="Why Choose SSS Associate?"
      intro="Clear communication, neat paperwork, and honest guidance."
    >
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {why.map(({ title, text }) => (
          <li
            key={title}
            className="rounded-xl border border-navy/10 border-l-4 border-l-gold bg-white p-6 shadow-sm"
          >
            <h3 className="font-heading text-lg font-bold text-navy">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

const steps = [
  {
    title: 'Tell Us What You Need',
    text: 'Call, message on WhatsApp, or use our contact form to share your need.',
  },
  {
    title: 'Share Available Papers',
    text: 'Send copies of current records so we can review your case.',
  },
  {
    title: 'Understand Next Steps',
    text: 'We explain the process, needed files, and advocate involvement.',
  },
  {
    title: 'Get Agreed Support',
    text: 'We complete the agreed document prep and coordination.',
  },
];

export function HowWeWork() {
  return (
    <Section
      id="process"
      tone="navy"
      eyebrow="Our process"
      title="How Our Process Works"
      intro="Four simple steps to understand your case and move forward."
    >
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-xl border border-gold/40 bg-white/5 p-6"
          >
            <span className="font-heading text-3xl font-bold text-gold">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 font-heading text-lg font-bold text-white">
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
  'Karur',
  'Thoothukudi',
  'Nagercoil',
];

export function AreasWeServe() {
  return (
    <Section
      id="areas"
      eyebrow="Where we serve"
      title="Serving Customers Across Tamil Nadu"
      intro="Based in Irugur, Coimbatore, supporting property, registration, and bank file enquiries across Tamil Nadu."
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-navy/10 bg-mist/60 p-6 text-center sm:p-8">
        <h3 className="font-heading text-xl font-bold text-navy">
          Cities We Receive Enquiries From
        </h3>

        <p className="mt-2 text-sm text-muted">
          Share your location and requirement to check service availability.
        </p>

        <p className="mt-5 rounded-xl bg-white p-5 text-sm font-medium leading-loose text-navy shadow-sm">
          {serviceAreas.join(' • ')}
        </p>

        <div className="mt-6">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
          >
            Contact Our Team →
          </Link>
        </div>
      </div>
    </Section>
  );
}