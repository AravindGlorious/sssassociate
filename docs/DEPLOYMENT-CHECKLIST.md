# SSS Associate: final deployment checklist

Legend: **[LOCAL]** verified on a local production build by me. **[LIVE]** can only be verified on the deployed site; do these yourself after deploying. Nothing here claims Google has indexed or ranks the site; that can only be confirmed in Search Console.

## A. Pre-flight (all done locally)
- [x] [LOCAL] `rm -rf .next && npm run build` succeeds (Next 16, 40 static pages); `npx tsc --noEmit` clean; `npm audit` 0 vulnerabilities.
- [x] [LOCAL] `npm run check -- http://localhost:3000 --api --expect-no-key`: 641/641 checks.
- [x] [LOCAL] axe-core: 0 violations on 5 key pages at 1280 and 390 px; no horizontal overflow at 1440/1280/768/390/360 px.

## B. Deploy to Vercel
The site already exists at https://sss-associate.vercel.app/. Update it; do not create a new project.

**Option 1: Git (recommended)**
1. Unzip `sss-associate-web.zip`. Copy its contents over your existing repository's working tree (keep the `.git` folder), or create a new GitHub repo from it.
2. `git add -A && git commit -m "Production update" && git push`.
3. In Vercel, open the project already connected to that repo; the push triggers a Production deployment. (If the repo is new: vercel.com → Add New → Project → Import → Framework "Next.js" (auto) → set env vars (section C) → Deploy.)
4. Project → Settings → General → **Node.js Version: 22.x**.

**Option 2: CLI**
```bash
npm i -g vercel
cd sss-associate-web
vercel login
vercel link          # choose the existing project (sss-associate)
vercel --prod
```

## C. Environment variables (Vercel → Project → Settings → Environment Variables → add for **Production**; Preview optional)
| Name | Required? | Value | Notes |
|---|---|---|---|
| `RESEND_API_KEY` | **Yes**, for email | `re_…` from Resend | Mark **Sensitive**. Never commit it. |
| `CONTACT_TO_EMAIL` | No | `sssassociateservices@gmail.com` | Defaults to this. |
| `CONTACT_FROM_EMAIL` | No / Yes with own domain | `SSS Associate <enquiries@your-domain>` | If blank: Resend test sender, which only delivers to the Resend account owner's email. |
| `NEXT_PUBLIC_SITE_URL` | Only with a custom domain | `https://your-domain` (no trailing slash) | Baked in at build time; redeploy after changing. Default is `https://sss-associate.vercel.app`. |
| `GOOGLE_SITE_VERIFICATION` | Optional | token from Search Console HTML tag | Only the `content` value. Redeploy after adding. |
Do **not** set `RESEND_API_URL` (test-only; ignored on Vercel). After adding or changing any variable: Deployments → latest → ⋯ → **Redeploy**.

## D. Resend API key
1. Go to https://resend.com → Sign up **with sssassociateservices@gmail.com** (so the default test sender can deliver to it). Verify the email.
2. Left menu **API Keys** → **Create API Key** → Name `sss-associate-website`, Permission **Sending access**, Domain **All domains** → Add.
3. Copy the key now (starts `re_`; shown once).
4. Vercel → Settings → Environment Variables → Name `RESEND_API_KEY`, Value (paste), Environment **Production**, tick **Sensitive** → Save.
5. Redeploy (section C). Optional for own-domain sending: Resend → Domains → Add Domain → add the DNS records at your registrar → wait for "Verified" → set `CONTACT_FROM_EMAIL`.

## E. Test a real enquiry email [LIVE]
1. Open https://sss-associate.vercel.app/contact in a private window.
2. Enter your real name, a valid 10-digit mobile (6–9…), your own email, choose a service, a message of 10+ chars, tick consent → **Send Enquiry**.
3. Expect the green "Your enquiry has been sent." Then check sssassociateservices@gmail.com (also Spam). Subject: `New website enquiry: <service>`; Reply-To is the visitor's email.
4. Repeat from a service page (e.g. `/services/legal-opinion`): the service must be pre-selected and appear in the subject.
5. Resend dashboard → **Emails**: status *Delivered*.
6. If you see the red "could not send by email" message: Vercel → project → **Logs** (Runtime), search `[contact]`. `HTTP 401` = wrong/missing key; `403` = sender/recipient not allowed (see section D); `422` = invalid `CONTACT_FROM_EMAIL` format. Fix, redeploy, retest. The WhatsApp fallback keeps working meanwhile.
7. Test the fallback too: press **Send on WhatsApp**; WhatsApp must open with name, service and message typed in (not sent until you press send).

## F. Post-deploy automated check [LIVE]
```bash
node scripts/production-check.mjs https://sss-associate.vercel.app --api
```
(The `--api` cases are invalid/honeypot inputs and never send an email.) Expect all green. Also run `node scripts/seo-audit.mjs https://sss-associate.vercel.app`. Note: it fetches the live site and checks canonicals against the production domain.
Manually confirm: `curl -sI https://sss-associate.vercel.app/` shows `x-content-type-options`, `x-frame-options`, `referrer-policy`, `permissions-policy` and Vercel's `strict-transport-security`; `http://` redirects to `https://`; `/blog` shows `noindex`; `/sitemap.xml` lists 33 URLs.

## G. Google Search Console [LIVE]
1. https://search.google.com/search-console → property selector → **Add property**.
2. A `*.vercel.app` address has no DNS access, so choose **URL prefix** and enter `https://sss-associate.vercel.app/` → Continue.
3. Under **Other verification methods** choose **HTML tag**; copy only the value inside `content="…"`.
4. Vercel → add `GOOGLE_SITE_VERIFICATION` = that value (Production) → Redeploy.
5. Back in Search Console press **Verify**. (Keep the variable; removing it can un-verify the property.)
   With a custom domain later: add a **Domain** property and verify with the DNS TXT record.

## H. Submit the sitemap [LIVE]
1. Search Console → **Sitemaps** (left menu).
2. "Add a new sitemap": type `sitemap.xml` → **Submit**.
3. Status should show **Success** with **33 discovered pages**. (If "Couldn't fetch", wait a few minutes and retry; confirm the URL opens in a browser.)
4. Optional: **URL inspection** → paste the homepage → **Request indexing**; repeat for a few key pages.
5. Indexing takes days to weeks and is not guaranteed. Track progress only in **Pages** (Indexing) and **Performance**. `/blog` should appear under "Excluded by noindex" until articles are published.

## I. PageSpeed Insights [LIVE]
1. https://pagespeed.web.dev/ → paste `https://sss-associate.vercel.app/` → **Analyze**.
2. Read **Mobile** and **Desktop** tabs. Repeat for `/services/legal-opinion` and `/contact`. Run each 2–3 times; lab scores vary by a few points.
3. "Discover what your real users experience" (field data) stays empty until the site has enough Chrome-user traffic. That is normal for a new/low-traffic site.
For reference only, my **local** Lighthouse results (not live): mobile 95–100 performance, 100 accessibility/best-practices/SEO; desktop 96–99; CLS 0. Live results will differ.

## J. Structured data [LIVE]
1. https://search.google.com/test/rich-results → enter the page URL → **Test URL**. Expect the page to be fetched and **Breadcrumbs** detected without errors. ProfessionalService/Service/WebPage have no Google rich result; this is normal.
2. https://validator.schema.org → **Fetch URL** → paste the URL → **Run test**. Expect 0 errors (warnings about optional properties are acceptable). Test: `/`, `/services/legal-opinion`, `/contact`.
3. Search Console → **Enhancements → Breadcrumbs** appears after Google has crawled pages.

## K. Open items before/after launch
- [ ] Facebook/Instagram URLs → `src/config/business.ts` → `social` (icons appear automatically; don't invent URLs).
- [ ] Replace the screenshot-cropped logo/hero/about images with the original files (same filenames or update `Image` src). Logo in schema is 100×94; Google prefers ≥112×112 for logo.
- [ ] Have an advocate review all legal/financial wording and the Privacy, Terms and Disclaimer pages.
- [ ] Confirm the maps pin from "Get Directions"; once a Google Business Profile exists, add its URL (not done: none exists in the project).
- [ ] Write real blog articles, then set `published: true` per post in `src/data/blog.ts` (this also makes `/blog` indexable and adds it to the sitemap).
- [ ] Replace the in-memory rate limiter with a shared store if spam appears.
- [ ] Test on a real iPhone and a real Android phone (only headless Chrome was available here).
- [ ] After 2–4 weeks, review Search Console data. Do not assume rankings.
