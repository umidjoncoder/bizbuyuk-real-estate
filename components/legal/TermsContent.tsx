"use client";

import { useLang } from "../LanguageProvider";
import { LegalPage } from "./LegalPage";

export function TermsContent() {
  const { t } = useLang();
  const l = t.legal;

  return (
    <LegalPage eyebrow={l.page.eyebrow} title={l.terms.title} updated={l.page.updated} languageNote={l.page.languageNote}>
      <h2>1. Acceptance</h2>
      <p>
        By using bizbuyuk.com you agree to these terms. If you do not agree with them, please do not use the site —
        you are welcome to reach us instead by phone, WhatsApp or email using the details in our{" "}
        <a href="/legal/privacy">Privacy Policy</a>.
      </p>

      <h2>2. Who we are</h2>
      <p>
        BIZBUYUK Real Estate LLC is a licensed real estate brokerage operating across the United Arab Emirates. This
        website presents our services, our current developer partnerships and a way to reach us — it is not itself a
        property listing marketplace or a transaction platform.
      </p>

      <h2>3. Not investment, legal or tax advice</h2>
      <p>
        Nothing on this site — including yield figures, tax notes, payment-plan terms or visa information — is
        investment, legal, tax or immigration advice. Market conditions, developer terms, and government programmes
        such as the Golden Visa change, and eligibility depends on your personal circumstances. Treat every figure on
        this site as illustrative, and confirm current terms with us or with the relevant authority before making a
        decision.
      </p>

      <h2>4. Property and pricing information</h2>
      <p>
        Availability, pricing, payment plans and specifications shown or discussed via this site are supplied by
        developers and third parties and can change without notice. We work to keep information current, but we do
        not guarantee that a specific unit, price or payment plan is still available at the moment you enquire —
        that is confirmed when we speak with you directly.
      </p>

      <h2>5. Renovation renders</h2>
      <p>
        Where this site shows a &ldquo;design vision&rdquo; or &ldquo;concept&rdquo; render of a renovation, it is a
        computer-generated illustration of a style we can deliver, not a photograph of a specific completed project.
        Any section labelled as our actual work uses real, photographed projects only.
      </p>

      <h2>6. Your enquiry</h2>
      <p>
        Submitting a form on this site is a request for us to contact you — it is not a booking, a reservation or a
        contract of any kind. A transaction with us only begins once we have agreed terms with you directly and, where
        applicable, signed the relevant paperwork.
      </p>

      <h2>7. Acceptable use</h2>
      <p>
        Please don&rsquo;t use this site to submit false contact details, attempt to access parts of it that are not
        intended for public use (including our staff systems), or use it in a way that could disrupt the service for
        other visitors.
      </p>

      <h2>8. Intellectual property</h2>
      <p>
        The text, photography, renders and design of this site belong to BIZBUYUK Real Estate LLC or are used with
        permission. Developer names and logos remain the property of their respective owners and appear here to
        describe our working relationships with them.
      </p>

      <h2>9. Third-party links</h2>
      <p>
        This site links out to WhatsApp, Telegram and other services we don&rsquo;t operate. We aren&rsquo;t
        responsible for their content or their own terms and privacy practices.
      </p>

      <h2>10. Liability</h2>
      <p>
        This site is provided as-is. To the extent permitted by law, BIZBUYUK is not liable for losses arising from
        your use of the site or from decisions made based on information published here — always confirm details
        with us directly before acting on them.
      </p>

      <h2>11. Governing law</h2>
      <p>These terms are governed by the laws of the United Arab Emirates, and any dispute falls under the jurisdiction of the Dubai courts.</p>

      <h2>12. Changes</h2>
      <p>We may update these terms as the business or the site changes. The date at the top of this page shows the latest revision.</p>

      <h2>13. Contact</h2>
      <p>
        Questions about these terms go to <a href="mailto:info@bizbuyuk.com">info@bizbuyuk.com</a>.
      </p>
    </LegalPage>
  );
}
