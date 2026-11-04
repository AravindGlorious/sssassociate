'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { business, whatsappLink } from '@/config/business';
import { categories, byCategory, services, type CategoryKey } from '@/data/services';
import { validateEnquiry, type EnquiryErrors } from '@/lib/validation';

type Status = 'idle' | 'sending' | 'success' | 'unavailable' | 'error';

const input = 'mt-1 w-full rounded-lg border border-navy/30 bg-white px-4 py-3 text-ink focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40';
const label = 'block text-sm font-semibold text-navy';
const fieldIds = ['name', 'phone', 'email', 'service', 'message', 'consent'] as const;

interface Props { defaultService?: string; heading?: string }

export function ContactForm({ defaultService = '', heading }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const sendingRef = useRef(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [serverError, setServerError] = useState('');
  const [service, setService] = useState(defaultService);

  // Pre-select from /contact?service=<slug> (links from service pages and cards).
  useEffect(() => {
    if (defaultService) return;
    const q = new URLSearchParams(window.location.search).get('service');
    if (q && services.some((s) => s.slug === q)) setService(q);
  }, [defaultService]);

  const read = () => {
    const f = new FormData(formRef.current!);
    return validateEnquiry({ name: f.get('name'), phone: f.get('phone'), email: f.get('email'), service, message: f.get('message'), consent: f.get('consent') === 'on' });
  };

  const focusFirst = (errs: EnquiryErrors) => {
    const first = fieldIds.find((k) => errs[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const waText = () => {
    const f = new FormData(formRef.current!);
    const title = services.find((s) => s.slug === service)?.title ?? 'General enquiry';
    return `Hello SSS Associate,\nName: ${String(f.get('name') ?? '').trim()}\nPhone: ${String(f.get('phone') ?? '').trim()}\nService: ${title}\nMessage: ${String(f.get('message') ?? '').trim()}`;
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sendingRef.current) return; // block double submits
    const { errors: errs, clean } = read();
    setErrors(errs);
    if (Object.keys(errs).length) { focusFirst(errs); return; }

    sendingRef.current = true;
    setStatus('sending');
    setServerError('');
    try {
      const hp = (new FormData(formRef.current!).get('website') as string) ?? '';
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...clean, website: hp }) });
      const json = (await res.json().catch(() => ({}))) as { error?: string; code?: string; fields?: EnquiryErrors };
      if (res.ok) { setStatus('success'); formRef.current?.reset(); setService(defaultService); return; }
      if (json.fields) setErrors(json.fields);
      setServerError(json.error ?? 'Something went wrong. Please call us or use WhatsApp.');
      setStatus(json.code === 'email_unavailable' || json.code === 'email_failed' ? 'unavailable' : 'error');
    } catch {
      setServerError('We could not reach the server. Please check your connection, or call us or use WhatsApp.');
      setStatus('error');
    } finally {
      sendingRef.current = false;
    }
  }

  function sendWhatsApp() {
    const { errors: errs } = read();
    // WhatsApp needs a name, a phone number and a message; the other checks are for the email route.
    const needed: EnquiryErrors = {};
    (['name', 'phone', 'message'] as const).forEach((k) => { if (errs[k]) needed[k] = errs[k]; });
    setErrors(needed);
    if (Object.keys(needed).length) { focusFirst(needed); return; }
    window.open(whatsappLink(waText()), '_blank', 'noopener,noreferrer');
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-xl border border-green-700/30 bg-green-50 p-6 text-green-900">
        <p className="font-semibold">Thank you. Your enquiry has been sent.</p>
        <p className="mt-1 text-sm">We will get back to you on the mobile number you provided.</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-4 text-sm font-semibold underline">Send another enquiry</button>
      </div>
    );
  }

  const err = (k: keyof EnquiryErrors) => errors[k] && <p id={`${k}-err`} className="mt-1 text-sm text-red-700">{errors[k]}</p>;
  const a = (k: keyof EnquiryErrors) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined });
  const busy = status === 'sending';

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-5 rounded-xl border border-navy/10 bg-white p-6 shadow-sm md:p-8" aria-labelledby="enquiry-form-title">
      <h2 id="enquiry-form-title" className="font-heading text-2xl font-bold text-navy">{heading ?? 'Send us an enquiry'}</h2>
      <div><label htmlFor="name" className={label}>Full Name *</label><input id="name" name="name" autoComplete="name" required className={input} {...a('name')} />{err('name')}</div>
      <div className="grid gap-5 md:grid-cols-2">
        <div><label htmlFor="phone" className={label}>Mobile Number *</label><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. 98765 43210" required className={input} {...a('phone')} />{err('phone')}</div>
        <div><label htmlFor="email" className={label}>Email Address (optional)</label><input id="email" name="email" type="email" autoComplete="email" className={input} {...a('email')} />{err('email')}</div>
      </div>
      <div>
        <label htmlFor="service" className={label}>Select Service</label>
        <select id="service" name="service" value={service} onChange={(e) => setService(e.target.value)} className={input} {...a('service')}>
          <option value="">Not sure / General enquiry</option>
          {(Object.keys(categories) as CategoryKey[]).map((k) => (
            <optgroup key={k} label={categories[k].title}>
              {byCategory(k).map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
            </optgroup>
          ))}
        </select>
        {err('service')}
      </div>
      <div><label htmlFor="message" className={label}>Message / Enquiry *</label><textarea id="message" name="message" rows={5} required className={input} {...a('message')} />{err('message')}</div>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div>
        <label className="flex items-start gap-3 text-sm text-muted"><input type="checkbox" name="consent" className="mt-0.5 h-6 w-6 flex-none accent-[#8A6A1F]" {...a('consent')} /><span>I agree that SSS Associate may use these details to respond to my enquiry, as described in the <a href="/privacy-policy" className="font-semibold text-gold-text underline">Privacy Policy</a>. *</span></label>
        {err('consent')}
      </div>

      {(status === 'error' || status === 'unavailable') && (
        <div role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-900">
          <p>{serverError}</p>
          {status === 'unavailable' && <p className="mt-2">Your details are still in the form. Send them on WhatsApp with one tap, or call or email us:</p>}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={busy} aria-busy={busy} className="btn disabled:cursor-not-allowed disabled:opacity-60">{busy ? 'Sending…' : 'Send Enquiry'}</button>
        <button type="button" onClick={sendWhatsApp} className="inline-flex items-center gap-2 rounded-full border-2 border-[#1a8f4a] px-6 py-3 font-semibold text-[#146c38] transition hover:bg-[#1a8f4a] hover:text-white"><MessageCircle size={18} aria-hidden="true" />Send on WhatsApp</button>
      </div>
      <p className="text-xs text-muted">WhatsApp opens in a new tab with your name, service and message already typed. Nothing is sent until you press send there.</p>

      {status === 'unavailable' && (
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-navy">
          <a href={`tel:${business.phones[0].tel}`} className="inline-flex items-center gap-2 py-2 underline"><Phone size={16} aria-hidden="true" />{business.phones[0].display}</a>
          <a href={`mailto:${business.email}`} className="inline-flex items-center gap-2 py-2 underline"><Mail size={16} aria-hidden="true" />{business.email}</a>
        </div>
      )}
    </form>
  );
}
