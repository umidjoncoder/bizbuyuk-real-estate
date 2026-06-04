# BIZBUYUK Real Estate — Landing Page

Premium, conversion-focused single-page site for **BIZBUYUK Real Estate (Dubai)**.
Cinematic dark-luxury aesthetic — layered black + champagne gold, editorial serif
typography, smooth motion, and a lead-capture form that delivers to **Telegram + email**.

Built with **Next.js 15 (App Router)** · **TypeScript** · **Tailwind CSS v4** · **Motion**.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production
```

---

## Lead delivery (important)

Form submissions hit `POST /api/lead`, which sends each lead to **both** channels:

| Channel  | Env vars |
|----------|----------|
| Telegram | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` |
| Email (Resend) | `RESEND_API_KEY`, `LEAD_EMAIL_FROM`, `LEAD_EMAIL_TO` |

Copy `.env.example` → `.env.local` and fill in the values.

- If **no** channel is configured, leads are written to the server log (so the form
  still works in preview) — configure at least one before going live.
- Built-in **honeypot** + basic validation guard against spam bots.

### Telegram setup
1. Message **@BotFather** → `/newbot` → copy the token into `TELEGRAM_BOT_TOKEN`.
2. Add the bot to your group/channel (or DM it), send any message, then open
   `https://api.telegram.org/bot<token>/getUpdates` and copy the `chat.id` into
   `TELEGRAM_CHAT_ID`.

### Email setup (Resend)
1. Create an account at [resend.com](https://resend.com) and **verify your domain**.
2. Create an API key → `RESEND_API_KEY`.
3. `LEAD_EMAIL_FROM` must use the verified domain, e.g. `"BIZBUYUK <leads@bizbuyuk.com>"`.
   `LEAD_EMAIL_TO` defaults to `info@bizbuyuk.com`.

---

## Internationalisation

English + Russian, toggled in the navbar (choice is remembered, and the browser
language is auto-detected on first visit).

**To add a language:** edit `lib/i18n.ts` — add the code to `locales`, a label to
`localeNames`, and a full block to `dictionary`. It appears in the switcher
automatically. The `Dict` type guarantees every string is translated.

---

## Project structure

```
app/
  layout.tsx          fonts, SEO metadata, JSON-LD (RealEstateAgent)
  page.tsx            section composition
  globals.css         design system (colors, type, motion, components)
  api/lead/route.ts   Telegram + email delivery
  opengraph-image.tsx social share card (Instagram/social previews)
  icon.svg            favicon
  sitemap.ts / robots.ts
components/            Nav, Hero, Services, Stats, Why, Partners, LeadForm, Footer …
lib/i18n.ts           dictionaries + shared contact/developer constants
```

---

## Editing content

- **Contacts / socials / developers** → `lib/i18n.ts` (`CONTACT`, `DEVELOPERS`).
- **All copy** → `dictionary` in `lib/i18n.ts`.
- **Brand colors / fonts / motion** → `@theme` and component classes in `app/globals.css`.
- **Hero background** is a custom CSS + SVG skyline (no external assets — keeps
  PageSpeed green). To use a video instead, drop one in `public/` and render it
  inside `components/Hero.tsx`'s `<Atmosphere />`.

---

## Deploy (Vercel)

```bash
vercel            # preview
vercel --prod     # production
```

Add the env vars above in **Project → Settings → Environment Variables**, then
point the `bizbuyuk.com` domain at the project.

SEO: H1/H2 hierarchy, alt text, `robots.txt`, `sitemap.xml`, Open Graph, and
JSON-LD structured data are all included.
