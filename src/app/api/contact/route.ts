import { NextResponse } from 'next/server';
import { business } from '@/config/business';
import { services } from '@/data/services';
import { validateEnquiry } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Per-instance, in-memory limiter. On serverless hosts each instance has its own memory, so this only
// slows basic abuse. A shared store (e.g. Upstash/Vercel KV) would be needed for strict limits.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
const json = (body: object, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(req: Request) {
  // Same-origin only: reject cross-site form posts.
  const origin = req.headers.get('origin');
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host');
  if (origin && host && new URL(origin).host !== host) return json({ error: 'Invalid request.' }, 403);
  if (Number(req.headers.get('content-length') ?? 0) > 20_000) return json({ error: 'Request too large.' }, 413);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return json({ error: 'Invalid request.' }, 400); }

  // Honeypot: real visitors never fill this. Bots get a silent, non-delivering 200.
  if (typeof body.website === 'string' && body.website.trim()) return json({ ok: true });

  const { errors, clean } = validateEnquiry(body);
  if (Object.keys(errors).length) return json({ error: 'Please correct the highlighted fields.', fields: errors }, 400);

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const now = Date.now();
  for (const [k, v] of hits) { const f = v.filter((t) => now - t < WINDOW_MS); f.length ? hits.set(k, f) : hits.delete(k); }
  const recent = hits.get(ip) ?? [];
  if (recent.length >= MAX_HITS) return json({ error: 'Too many enquiries from this connection. Please try again later, or call or WhatsApp us.' }, 429);

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return json({ code: 'email_unavailable', error: 'We could not send your enquiry by email right now.' }, 503);
  }
  const to = process.env.CONTACT_TO_EMAIL || business.email;
  const from = process.env.CONTACT_FROM_EMAIL || `${business.shortName} Website <onboarding@resend.dev>`;
  // RESEND_API_URL exists only so the route can be tested against a local mock. It is ignored on Vercel.
  const endpoint = (!process.env.VERCEL && process.env.RESEND_API_URL) || 'https://api.resend.com/emails';
  const serviceTitle = services.find((s) => s.slug === clean.service)?.title ?? 'General enquiry';

  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        from,
        to: [to],
        ...(clean.email ? { reply_to: clean.email } : {}),
        subject: `New website enquiry: ${serviceTitle}`,
        html: `<p><b>Name:</b> ${esc(clean.name)}</p><p><b>Mobile:</b> ${esc(clean.phone)}</p><p><b>Email:</b> ${esc(clean.email || 'not provided')}</p><p><b>Service:</b> ${esc(serviceTitle)}</p><p><b>Message:</b><br>${esc(clean.message).replace(/\n/g, '<br>')}</p>`,
        text: `Name: ${clean.name}\nMobile: ${clean.phone}\nEmail: ${clean.email || 'not provided'}\nService: ${serviceTitle}\n\n${clean.message}`,
      }),
    });
  } catch {
    console.error('[contact] email provider unreachable');
    return json({ code: 'email_failed', error: 'We could not send your enquiry by email right now.' }, 502);
  }
  if (!res.ok) {
    // Log only the status, never visitor details or the key.
    console.error(`[contact] email provider returned HTTP ${res.status}`);
    return json({ code: 'email_failed', error: 'We could not send your enquiry by email right now.' }, 502);
  }

  hits.set(ip, [...recent, now]);
  return json({ ok: true });
}
