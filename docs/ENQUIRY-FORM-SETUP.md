# Enquiry form: how it works and how to switch on email

**Why visitors saw "not set up yet":** `/api/contact` sends email through Resend and needs `RESEND_API_KEY`. The deployment had none, so the route correctly refused to pretend. The code itself is fine.

## Behaviour now
- Email configured and accepted by Resend: green "Your enquiry has been sent" (only after a genuine 2xx from Resend).
- No key, provider error or network failure: a red message, the visitor's text stays in the form, and **Send on WhatsApp** (pre-filled with name, phone, service, message; sends only after the visitor presses send in WhatsApp), call and email links are offered. Success is never shown.
- **Send on WhatsApp** is also available beside **Send Enquiry** at all times.
- Form is on `/contact` and the bottom of all 23 service pages (service pre-selected). `/contact?service=<slug>` pre-selects too.

## Important: default sender limitation
If `CONTACT_FROM_EMAIL` is not set, the route uses Resend's shared test sender `onboarding@resend.dev`. Resend only delivers that sender's mail to **the email address that owns your Resend account**. So either:
- create the Resend account with `sssassociateservices@gmail.com` (then the defaults just work), or
- verify a domain you own in Resend and set `CONTACT_FROM_EMAIL="SSS Associate <enquiries@your-domain>"`. (A `*.vercel.app` address cannot be verified as a sending domain.)

Exact Vercel/Resend steps are in `DEPLOYMENT-CHECKLIST.md`.

## Security
Key is server-side only (verified absent from browser bundles). Server re-validates everything (Indian mobile, email, service, lengths), honeypot, same-origin check, 20 KB body limit, escaped email HTML, no visitor data in logs. The rate limiter is in-memory per serverless instance, so it only slows basic abuse; strict limits need a shared store (Upstash/Vercel KV).
