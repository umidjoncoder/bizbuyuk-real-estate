"use client";

import { useLang } from "../LanguageProvider";
import { LegalPage } from "./LegalPage";

/* Written to match what the site actually does today, not a generic template:
   the two forms it runs (the homepage enquiry and the renovation quote),
   what fields they collect, where that data lands (our CRM, and — only where
   the team has switched them on — a Telegram alert and an email via Resend),
   and that the site currently sets no analytics or advertising cookies.
   Update this file, not just the wording, if any of that changes. */
export function PrivacyContent() {
  const { t } = useLang();
  const l = t.legal;

  return (
    <LegalPage eyebrow={l.page.eyebrow} title={l.privacy.title} updated={l.page.updated} languageNote={l.page.languageNote}>
      <h2>1. Who we are</h2>
      <p>
        BIZBUYUK Real Estate LLC (&ldquo;BIZBUYUK&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a licensed real estate
        brokerage operating from Business Bay, Jumeirah Village Circle and Palm Jumeirah, Dubai, United Arab Emirates.
        This policy explains what information we collect through bizbuyuk.com, why we collect it, and what rights you
        have over it.
      </p>

      <h2>2. What we collect</h2>
      <p>We only collect what you give us directly, through one of two forms on this site:</p>
      <ul>
        <li><strong>Enquiry form</strong> — your name, phone number, and optionally your email address and preferred way to be contacted (call, WhatsApp, Telegram or email).</li>
        <li><strong>Renovation quote form</strong> — the same contact details, plus the property details you choose to share: location, property type, size, condition, style and budget.</li>
      </ul>
      <p>
        When you submit a form, we also record the page you were on, how you arrived at the site (for example, from a
        search engine or an ad) and your browser&rsquo;s language setting. This helps us understand which enquiries
        need which kind of follow-up — it is not used to identify you individually beyond the enquiry itself.
      </p>
      <p>
        We do not ask for payment details, identity documents or any other sensitive information through this
        website. If you go on to work with us, we will collect what a property transaction or visa application
        legally requires directly, at that stage, through secure channels — never through the public website.
      </p>

      <h2>3. Cookies</h2>
      <p>
        The public website does not currently set analytics, advertising or tracking cookies. The only cookie in use
        belongs to our staff CRM login, and it is only ever set for our own team members signing in to manage leads —
        it plays no part in your visit as a site visitor. If we add analytics or advertising tools in the future, we
        will update this section before we do.
      </p>

      <h2>4. How we use your information</h2>
      <ul>
        <li>To respond to your enquiry, by the channel you asked for.</li>
        <li>To match you with the right specialist on our team — by language, location or the type of service you asked about.</li>
        <li>To keep a record of our conversation in our internal CRM, so you do not have to repeat yourself if you write to us again.</li>
      </ul>

      <h2>5. Who sees it</h2>
      <p>
        Your enquiry is visible to our own staff — the team members handling client relationships and property
        transactions. Depending on how a given enquiry is configured, a summary may also be delivered to our team by
        Telegram or by email (sent through Resend, an email delivery service). We do not sell your information, and
        we do not share it with developers, advertisers or any other third party without asking you first.
      </p>

      <h2>6. How long we keep it</h2>
      <p>
        We keep enquiry records for as long as reasonably useful for the relationship — typically for the life of a
        potential or ongoing transaction, and for a period afterwards in case you return. You can ask us to delete
        your record at any time; see section 8.
      </p>

      <h2>7. Where it is stored</h2>
      <p>
        Your data is stored in our CRM database and, where applicable, in Telegram and our email provider&rsquo;s
        systems. These services may process data outside the UAE; where they do, they are required by their own
        terms to protect it to a comparable standard.
      </p>

      <h2>8. Your rights</h2>
      <p>You can ask us, at any time, to:</p>
      <ul>
        <li>tell you what information we hold about you;</li>
        <li>correct anything that is wrong;</li>
        <li>delete your information, unless we are required to keep it by law.</li>
      </ul>
      <p>
        Write to <a href="mailto:info@bizbuyuk.com">info@bizbuyuk.com</a> and we will action your request within a
        reasonable time.
      </p>

      <h2>9. Children</h2>
      <p>This website is not directed at children, and we do not knowingly collect information from anyone under 18.</p>

      <h2>10. Changes to this policy</h2>
      <p>
        If we change what we collect or how we use it, we will update this page and change the date at the top.
        Significant changes will be reflected here before they take effect.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about this policy or your data go to{" "}
        <a href="mailto:info@bizbuyuk.com">info@bizbuyuk.com</a>.
      </p>
    </LegalPage>
  );
}
