import { services } from '@/data/services';

export interface EnquiryInput { name: string; phone: string; email: string; service: string; message: string; consent: boolean }
export type EnquiryErrors = Partial<Record<'name' | 'phone' | 'email' | 'service' | 'message' | 'consent', string>>;

/** Returns the 10-digit Indian mobile number (starts 6-9) or null. Accepts +91, 91 or 0 prefixes and common separators. */
export function normalizeIndianMobile(input: string): string | null {
  let d = input.replace(/[\s().-]/g, '');
  if (d.startsWith('+')) d = d.slice(1);
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const strip = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, ' ').trim().slice(0, max) : '');

/** Shared by the browser form and the API route so both apply identical rules. */
export function validateEnquiry(raw: Record<string, unknown>): { errors: EnquiryErrors; clean: EnquiryInput } {
  const clean: EnquiryInput = {
    name: strip(raw.name, 100),
    phone: strip(raw.phone, 20),
    email: strip(raw.email, 120),
    service: strip(raw.service, 100),
    message: strip(raw.message, 3000),
    consent: raw.consent === true || raw.consent === 'on',
  };
  const errors: EnquiryErrors = {};
  if (clean.name.length < 2) errors.name = 'Please enter your full name.';
  const mobile = normalizeIndianMobile(clean.phone);
  if (!mobile) errors.phone = 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8 or 9).';
  else clean.phone = mobile;
  if (clean.email && !EMAIL.test(clean.email)) errors.email = 'Please enter a valid email address, or leave it blank.';
  if (clean.service && !services.some((s) => s.slug === clean.service)) errors.service = 'Please choose a service from the list.';
  if (clean.message.length < 10) errors.message = 'Please tell us a little about what you need (at least 10 characters).';
  if (!clean.consent) errors.consent = 'Please tick the box so we can contact you about your enquiry.';
  return { errors, clean };
}
