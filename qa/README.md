# Browser QA scripts (optional, not part of the site)

These drive a real headless Chromium against a running production build:

- `ui.mjs`: layout/overflow at several widths, axe-core accessibility, console errors, tap-target sizes; with `INTERACT=1` also form validation, service pre-selection, WhatsApp fallback URL, and the no-email-credentials path.
- `kb.mjs`: keyboard (Tab) opens the desktop dropdown. `nk.mjs`: form behaviour when email is not configured. `ok.mjs`: success path + double-submit guard (needs a mock mail endpoint). `cls.mjs`: layout shifts. `lh.mjs`: Lighthouse. `off.mjs`: finds overflowing elements.

Setup (outside the project, e.g. a scratch folder): `npm i puppeteer-core @sparticuz/chromium axe-core lighthouse`, then copy these scripts there. Ports default to 3141 (server with a mock mail key) and 3140 (server with no key).
