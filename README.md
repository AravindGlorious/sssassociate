# SSS Associate website (Next.js)

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY (see docs/ENQUIRY-FORM-SETUP.md)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
node scripts/seo-audit.mjs http://localhost:3000   # crawl + SEO checks of a running build
```

- Business details and social URLs: `src/config/business.ts` (leave social URLs empty until the owner supplies them; icons appear automatically once set)
- Services (23) and their content: `src/data/services.ts`, `src/data/service-content/`
- Enquiry form + API: `src/components/contact/ContactForm.tsx`, `src/app/api/contact/route.ts`, `src/lib/validation.ts`
- SEO helpers and schema: `src/lib/seo.ts`, `src/lib/schema.ts`
- Docs: `docs/KEYWORD-MAP.md`, `docs/SEO-AUDIT-REPORT.md`, `docs/ENQUIRY-FORM-SETUP.md`
- Blog: set `published: true` on a post in `src/data/blog.ts` only after its article page exists (the blog index is noindex until then)
