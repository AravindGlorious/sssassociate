import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronRight, Info, MessageCircle, Phone } from 'lucide-react';
import { business, whatsappLink } from '@/config/business';
import { categories, getService, type Service } from '@/data/services';
import type { ServiceContent } from '@/data/service-content';
import { FaqList } from '@/components/faq/FaqList';
import { ContactForm } from '@/components/contact/ContactForm';
import { ServiceCard } from './ServiceCard';

const h2 = 'font-heading text-2xl font-bold text-navy md:text-3xl';

export function ServicePage({ service, content }: { service: Service; content: ServiceContent }) {
  const cat = categories[service.category];
  const related = content.related.map(getService).filter((s): s is Service => Boolean(s));
  const waMessage = `Hello SSS Associate, I would like to enquire about ${service.title}.`;

  return (
    <>
      <section className="bg-gradient-to-r from-[#0d2145] via-[#14305a] to-[#0d2145] text-white" aria-labelledby="service-title">
        <div className="wrap grid items-center gap-10 py-12 lg:grid-cols-[1.15fr_1fr] lg:py-16">
          <div>
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/70">
              <ol className="flex flex-wrap items-center gap-1">
                <li><Link href="/" className="inline-block py-1 hover:text-gold-light">Home</Link></li>
                <li className="flex items-center gap-1"><ChevronRight size={14} aria-hidden="true" /><Link href="/services" className="inline-block py-1 hover:text-gold-light">Our Services</Link></li>
                <li className="flex items-center gap-1"><ChevronRight size={14} aria-hidden="true" /><Link href={cat.path} className="inline-block py-1 hover:text-gold-light">{cat.title}</Link></li>
                <li className="flex items-center gap-1"><ChevronRight size={14} aria-hidden="true" /><span aria-current="page" className="text-gold-light">{service.title}</span></li>
              </ol>
            </nav>
            <p className="kick">{cat.title}</p>
            <h1 id="service-title" className="mt-4 text-3xl font-bold leading-tight md:text-5xl">{content.h1}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{content.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={`tel:${business.phones[0].tel}`} className="btn"><Phone size={18} aria-hidden="true" />Call {business.phones[0].display}</a>
              <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><MessageCircle size={18} aria-hidden="true" />WhatsApp Us</a>
            </div>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-gold/40 shadow-2xl">
            <Image src={`/images/services/${service.slug}.svg`} alt={content.imageAlt} fill priority fetchPriority="high" sizes="(max-width: 1024px) 100vw, 45vw" />
          </div>
        </div>
      </section>

      <div className="wrap grid gap-10 py-14 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 space-y-14">
          <section aria-labelledby="overview">
            <h2 id="overview" className={h2}>Overview of {service.title}</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-ink">{content.intro.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
          </section>

          <section aria-labelledby="meaning" className="rounded-xl border-l-4 border-gold bg-mist p-6">
            <h2 id="meaning" className={h2}>What is {service.title}?</h2>
            <p className="mt-3 leading-relaxed">{content.meaning}</p>
          </section>

          <section aria-labelledby="why">
            <h2 id="why" className={h2}>Why you may need this service</h2>
            <ul className="mt-4 space-y-3">
              {content.why.map((w) => <li key={w} className="flex gap-3 leading-relaxed"><CheckCircle2 size={22} className="mt-0.5 flex-none text-gold-text" aria-hidden="true" />{w}</li>)}
            </ul>
          </section>

          <section aria-labelledby="who" className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 id="who" className={h2}>Who may need it</h2>
              <ul className="mt-4 space-y-2.5">{content.who.map((w) => <li key={w} className="flex gap-3"><span className="mt-2 h-2 w-2 flex-none rounded-full bg-gold" aria-hidden="true" />{w}</li>)}</ul>
            </div>
            <div>
              <h2 className={h2}>Where it is relevant</h2>
              <ul className="mt-4 space-y-2.5">{content.situations.map((w) => <li key={w} className="flex gap-3"><span className="mt-2 h-2 w-2 flex-none rounded-full bg-gold" aria-hidden="true" />{w}</li>)}</ul>
            </div>
          </section>

          <section aria-labelledby="process" className="rounded-2xl bg-navy p-6 text-white md:p-8">
            <h2 id="process" className="font-heading text-2xl font-bold text-gold-light md:text-3xl">How our assistance works</h2>
            <ol className="mt-6 grid gap-5 sm:grid-cols-2">
              {content.steps.map((s, i) => (
                <li key={s.title} className="rounded-xl border border-gold/40 bg-white/5 p-5">
                  <span className="font-heading text-3xl font-bold text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 font-heading text-lg font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="documents" className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 id="documents" className={h2}>Documents and information that may be needed</h2>
              <ul className="mt-4 space-y-2.5">{content.documents.map((d) => <li key={d} className="flex gap-3"><CheckCircle2 size={20} className="mt-0.5 flex-none text-gold-text" aria-hidden="true" />{d}</li>)}</ul>
              <p className="mt-4 text-sm text-muted">This is a general guide. Exact requirements depend on your case and the applicable rules, and are confirmed individually.</p>
            </div>
            <div className="rounded-xl border border-gold/50 bg-[#FFFBF2] p-6">
              <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-navy"><Info size={22} className="text-gold-text" aria-hidden="true" />Important considerations</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed">{content.considerations.map((c) => <li key={c} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold" aria-hidden="true" />{c}</li>)}</ul>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-32 lg:self-start" aria-label="Enquire about this service">
          <div className="rounded-2xl bg-navy p-6 text-white shadow-xl">
            <h2 className="font-heading text-xl font-bold text-gold-light">Talk to SSS Associate</h2>
            <p className="mt-2 text-sm text-white/80">Tell us about your {service.title.toLowerCase()} requirement. We will confirm what applies to your case.</p>
            <div className="mt-5 space-y-3">
              {business.phones.map((p) => <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-3 rounded-lg border border-gold/40 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"><Phone size={18} className="text-gold" aria-hidden="true" />{p.display}</a>)}
              <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg bg-[#14753A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0f5f2e]"><MessageCircle size={18} aria-hidden="true" />Enquire on WhatsApp</a>
              <a href="#enquiry" className="btn w-full justify-center text-sm">Send an Enquiry <ArrowRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </aside>
      </div>

      <section className="bg-mist py-14" aria-labelledby="faq-title">
        <div className="wrap">
          <h2 id="faq-title" className={`${h2} mb-8 text-center`}>Frequently asked questions about {service.title}</h2>
          <FaqList faqs={content.faqs} />
        </div>
      </section>

      <section className="py-14" aria-labelledby="related-title">
        <div className="wrap">
          <h2 id="related-title" className={`${h2} mb-8 text-center`}>Related services</h2>
          <ul className="grid gap-6 md:grid-cols-3">{related.map((s) => <li key={s.slug}><ServiceCard service={s} /></li>)}</ul>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-muted">
            This page is general information, not legal or financial advice. Opinions and representation are provided by appropriately qualified advocates where applicable, and no outcome or approval is guaranteed. See our <Link href="/disclaimer" className="font-semibold text-gold-text underline">disclaimer</Link>.
          </p>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-32 bg-gradient-to-r from-[#0d2145] via-[#14305a] to-[#0d2145] py-16 text-white" aria-labelledby="enquiry-title">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 id="enquiry-title" className="text-3xl font-bold md:text-4xl">Ready to discuss {service.title}?</h2>
            <p className="mt-4 leading-relaxed text-white/85">Share a few details about your situation. We will explain how we can help and which documents your case is likely to need.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${business.phones[0].tel}`} className="btn btn-outline btn-sm"><Phone size={16} aria-hidden="true" />Call us</a>
              <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm"><MessageCircle size={16} aria-hidden="true" />WhatsApp</a>
            </div>
          </div>
          <div className="text-ink"><ContactForm defaultService={service.slug} heading={`Enquire about ${service.title}`} /></div>
        </div>
      </section>
    </>
  );
}
