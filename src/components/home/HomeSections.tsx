import Link from 'next/link';
import { Coins, FileSearch, FileText, House, Languages, MapPin, MessageSquareText, Scale, ShieldCheck, Users } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { CategoryOverviewCard } from '@/components/services/CategoryOverviewCard';
import { byCategory, categories } from '@/data/services';
import { business } from '@/config/business';

export function ServicesOverview() {
  return (
    <Section id="services" eyebrow="What we do" title="Our Services" intro="Four areas of support under one roof, so your documents, legal questions and financial paperwork stay coordinated.">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li><CategoryOverviewCard Icon={Scale} title="Legal Services" href={categories.legal.path} count={byCategory('legal').length} text="Legal opinions through qualified advocates, old document verification and dispute support." /></li>
        <li><CategoryOverviewCard Icon={House} title="Property Services" href={categories.property.path} count={byCategory('property').length} text="Registration, patta, EC, sale deed and approval-related paperwork." /></li>
        <li><CategoryOverviewCard Icon={Coins} title="Financial Services" href={categories.financial.path} count={byCategory('financial').length} text="Bank settlement support, OTS preparation and loan paperwork assistance." /></li>
        <li><CategoryOverviewCard Icon={Languages} title="Documentation & Translation" href="/services/legal-document-translation" text="English to Tamil and Tamil to English translation of legal and property documents." /></li>
      </ul>
    </Section>
  );
}

const why = [
  { Icon: FileSearch, title: 'Document-focused approach', text: 'We start with the paperwork, because most property problems are visible in the records long before they become disputes.' },
  { Icon: Users, title: 'One point of contact', text: 'Legal, property and financial matters often overlap. We help you coordinate them instead of chasing each office separately.' },
  { Icon: MessageSquareText, title: 'Clear communication in English and Tamil', text: 'We explain findings in plain language and can work with documents and opinions in both languages.' },
  { Icon: ShieldCheck, title: 'Honest about limits', text: 'We do not promise outcomes or approvals. Opinions and representation come from qualified advocates, and we tell you what each matter really depends on.' },
  { Icon: MapPin, title: 'Local presence in Irugur', text: 'Our office is in Irugur, Coimbatore, and we serve clients across nearby areas.' },
  { Icon: FileText, title: 'Case-by-case guidance', text: 'Requirements differ for every property and every dispute, so we confirm what applies to you before you spend time or money.' },
];

export function WhyChoose() {
  return (
    <Section id="why-us" tone="mist" eyebrow="Why SSS Associate" title="Why Choose SSS Associate" intro="What you can expect when you work with us.">
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {why.map(({ Icon, title, text }) => (
          <li key={title} className="flex gap-4 rounded-xl bg-white p-6 shadow-sm">
            <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-full bg-navy text-gold"><Icon size={22} aria-hidden="true" /></span>
            <div><h3 className="font-heading text-lg font-bold text-navy">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{text}</p></div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

const steps = [
  { title: 'Tell us what you need', text: 'Call, message us on WhatsApp or send an enquiry. A short description of the property or matter is enough to begin.' },
  { title: 'Share your documents', text: 'We review what you have and confirm which additional documents your particular case may need.' },
  { title: 'Understand your options', text: 'We explain what the documents show, what the next steps could be, and where an advocate\u2019s opinion is needed.' },
  { title: 'Support through the process', text: 'We help coordinate the paperwork and follow-up with the relevant parties until the matter is taken forward.' },
];

export function HowWeWork() {
  return (
    <Section id="process" tone="navy" eyebrow="Our process" title="How We Work" intro="A simple, transparent path from first call to follow-through.">
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-xl border border-gold/40 bg-white/5 p-6">
            <span className="font-heading text-4xl font-bold text-gold">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 font-heading text-lg font-bold text-white">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function AreasWeServe() {
  const nearby = business.serviceAreas.filter((a) => a !== 'Irugur' && a !== 'Coimbatore');
  return (
    <Section id="areas" eyebrow="Service coverage" title="Areas We Serve Across Tamil Nadu" intro="SSS Associate provides Legal, Property and Financial Consultancy Services to individuals, families and businesses across Tamil Nadu.

We assist clients from major cities, towns and surrounding areas throughout Tamil Nadu. Whether you need property legal verification, documentation support, patta and chitta services, registration assistance, legal opinions or financial consultancy, our team is here to help.">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl bg-navy p-6 text-center text-white">
          <p className="flex items-center justify-center gap-2 font-heading text-xl font-bold"><MapPin className="text-gold" size={22} aria-hidden="true" />Irugur, Coimbatore</p>
          <p className="mt-1 text-sm text-white/80">{business.oneLineAddress}</p>
        </div>
        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {nearby.map((a) => <li key={a} className="rounded-full border border-gold/60 bg-white px-5 py-2 text-sm font-semibold text-navy">{a}</li>)}
        </ul>
        <p className="mt-6 text-center text-sm text-muted">Not in this list? <Link href="/contact" className="font-semibold text-gold-text underline">Get in touch</Link> and we will tell you how we can help.</p>
      </div>
    </Section>
  );
}
