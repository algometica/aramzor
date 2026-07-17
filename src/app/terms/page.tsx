import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of Aramzor, including subscription billing and important safety information.",
  alternates: {
    canonical: "https://aramzor.com/terms",
  },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "July 16, 2026";

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-6">
        {label}
      </p>
      <div className="space-y-4 text-base text-text-muted leading-relaxed font-light max-w-3xl">
        {children}
      </div>
    </section>
  );
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-deep">
      <SiteHeader variant="marketing" />

      <main
        id="main-content"
        className="flex-1 px-6 md:px-24 py-24 md:py-32 max-w-6xl mx-auto w-full"
      >
        <p className="caps-wide text-[11px] text-accent tracking-[0.38em] mb-6">
          Legal
        </p>
        <h1 className="font-display font-semibold text-5xl md:text-7xl leading-[0.95] tracking-tight mb-4 text-text">
          Terms of Service
        </h1>
        <p className="text-text-dim text-sm mb-16">
          Effective {EFFECTIVE_DATE}
        </p>

        <Section label="Agreement to terms">
          <p>
            These Terms of Service (&quot;Terms&quot;) form a binding
            agreement between you and Aramzor (&quot;Aramzor,&quot;
            &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), an
            individually operated service based in British Columbia, Canada.
            By creating an account, starting a free session, or subscribing
            to Aramzor, you agree to these Terms. If you do not agree, do not
            use the Service.
          </p>
          <p>
            You must be at least 16 years old to use Aramzor. If you are
            under the age of majority in your jurisdiction, you may only use
            the Service with the involvement and consent of a parent or
            guardian.
          </p>
        </Section>

        <Section label="Important safety and medical disclaimer">
          <p className="text-text font-medium">
            Read this section before practicing any breathing exercise on
            Aramzor.
          </p>
          <p>
            Aramzor guides voluntary, cyclic breathing exercises, including
            breath holds and controlled hyperventilation. These techniques
            can cause lightheadedness, tingling, and, in some people, a brief
            loss of consciousness (a &quot;fainting&quot; response) during or
            immediately after a breath hold.
          </p>
          <p>
            <span className="text-text font-medium">
              Never practice Aramzor in or near water,
            </span>{" "}
            including a bathtub, pool, or open water, and never while
            driving, cycling, or operating machinery. Loss of consciousness
            near water can be fatal.
          </p>
          <p>
            Do not use Aramzor if you are pregnant, or if you have a
            cardiovascular condition, epilepsy or another seizure disorder,
            a history of fainting, a respiratory condition, glaucoma, a
            recent surgery, or any other condition where a rapid change in
            blood pressure, oxygen, or carbon dioxide levels could be harmful.
            If you have any health condition or are uncertain whether this
            practice is appropriate for you, consult a physician before
            using the Service.
          </p>
          <p>
            Aramzor is a wellness and performance breathwork utility. It is
            not a medical device, is not intended to diagnose, treat, cure,
            or prevent any disease, and is not a substitute for professional
            medical or mental health care. If you are experiencing a
            medical or psychiatric emergency, contact emergency services or
            a crisis line in your area immediately, not this app.
          </p>
          <p>
            You use Aramzor entirely at your own risk. By using the Service,
            you acknowledge that you have read and understood this section
            in full.
          </p>
        </Section>

        <Section label="The service">
          <p>
            Aramzor provides guided breathwork sessions across several
            protocols (&quot;modes&quot;). New accounts receive a limited
            number of free sessions in the Calm and Sleep modes. Continued
            or full access, including additional modes, requires an active
            paid subscription. We may add, remove, or modify modes, features,
            or session content at any time.
          </p>
        </Section>

        <Section label="Accounts">
          <p>
            You are responsible for maintaining the confidentiality of your
            account and for all activity that occurs under it. Notify us
            promptly at{" "}
            <a
              href="mailto:support@aramzor.com"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              support@aramzor.com
            </a>{" "}
            if you suspect unauthorized use of your account. You agree to
            provide an accurate, currently reachable email address, since it
            is used both for sign-in and for service-related communication.
          </p>
        </Section>

        <Section label="Subscriptions and billing">
          <p>
            Aramzor is offered on a free-trial-then-subscription basis. The
            free trial consists of a limited number of sessions in the Calm
            and Sleep modes only, as displayed on the pricing and dashboard
            pages at the time. Continued access after the free trial, and
            access to all modes, requires a paid subscription billed monthly
            in U.S. dollars at the price displayed at checkout.
          </p>
          <p>
            All payments are processed by Lemon Squeezy, which acts as
            merchant of record for the transaction. Your subscription
            renews automatically each billing period until you cancel. You
            can cancel at any time from your{" "}
            <Link
              href="/profile"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              account page
            </Link>
            . Cancellation stops future renewals; it does not retroactively
            refund the current billing period.
          </p>
          <p>
            Fees are non-refundable except where required by applicable law
            or at our sole discretion. If you believe you were charged in
            error, contact{" "}
            <a
              href="mailto:support@aramzor.com"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              support@aramzor.com
            </a>{" "}
            within 14 days of the charge. We may change subscription
            pricing going forward; we will provide reasonable notice before
            any price increase applies to your account.
          </p>
        </Section>

        <Section label="Acceptable use">
          <p>You agree not to:</p>
          <ul className="list-disc list-outside pl-5 space-y-2">
            <li>
              use the Service in a way that violates any applicable law or
              regulation;
            </li>
            <li>
              attempt to gain unauthorized access to any account, system, or
              network connected to the Service;
            </li>
            <li>
              interfere with, disrupt, or place undue load on the Service or
              its infrastructure;
            </li>
            <li>
              reverse engineer, scrape, or resell the Service or its content
              without our written permission;
            </li>
            <li>
              misrepresent your identity or age, or create accounts through
              automated means.
            </li>
          </ul>
          <p>
            We may suspend or terminate access for any account that violates
            this section.
          </p>
        </Section>

        <Section label="Intellectual property">
          <p>
            The Aramzor name, the four-beat protocol structure, session
            content, design, and underlying software are owned by Aramzor or
            its licensors and protected by applicable intellectual property
            laws. We grant you a limited, non-exclusive, non-transferable
            license to use the Service for your personal, non-commercial
            wellness practice. All other rights are reserved.
          </p>
        </Section>

        <Section label="Third-party services">
          <p>
            The Service relies on third-party providers, including Neon
            (database), Resend (email delivery), Lemon Squeezy (payments),
            and Vercel (hosting), described further in our{" "}
            <Link
              href="/privacy"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              Privacy Policy
            </Link>
            . We are not responsible for outages, errors, or issues that
            originate from these third-party providers, though we will make
            reasonable efforts to address their impact on the Service.
          </p>
        </Section>

        <Section label="Disclaimer of warranties">
          <p>
            The Service is provided &quot;as is&quot; and &quot;as
            available,&quot; without warranties of any kind, whether express,
            implied, or statutory, including implied warranties of
            merchantability, fitness for a particular purpose, and
            non-infringement. We do not warrant that the Service will be
            uninterrupted, error-free, or that it will produce any specific
            physical, mental, or performance outcome for you.
          </p>
        </Section>

        <Section label="Limitation of liability">
          <p>
            To the maximum extent permitted by law, Aramzor and its operator
            will not be liable for any indirect, incidental, special,
            consequential, or punitive damages, or any loss of data, health,
            or income, arising from your use of, or inability to use, the
            Service, including any injury resulting from a breathing
            exercise performed contrary to the safety instructions in these
            Terms. Where liability cannot be fully excluded under applicable
            law, our total aggregate liability for any claim relating to the
            Service is limited to the amount you paid us in the three months
            preceding the claim.
          </p>
        </Section>

        <Section label="Indemnification">
          <p>
            You agree to indemnify and hold harmless Aramzor and its
            operator from any claim, loss, or expense, including reasonable
            legal fees, arising from your use of the Service, your violation
            of these Terms, or your violation of the safety instructions
            described above.
          </p>
        </Section>

        <Section label="Termination">
          <p>
            You may stop using the Service and cancel your subscription at
            any time. We may suspend or terminate your access to the Service,
            with or without notice, if we reasonably believe you have
            violated these Terms or created risk or legal exposure for
            Aramzor or other users. Provisions that by their nature should
            survive termination, including the safety disclaimer, disclaimer
            of warranties, limitation of liability, and indemnification,
            will survive.
          </p>
        </Section>

        <Section label="Changes to these terms">
          <p>
            We may update these Terms from time to time. If we make material
            changes, we will update the effective date above and, where
            appropriate, notify you by email. Continued use of the Service
            after an update constitutes acceptance of the revised Terms.
          </p>
        </Section>

        <Section label="Governing law">
          <p>
            These Terms are governed by the laws of the Province of British
            Columbia and the federal laws of Canada applicable therein,
            without regard to conflict-of-law principles. Any dispute
            arising from these Terms or the Service will be subject to the
            exclusive jurisdiction of the courts located in British
            Columbia, Canada, except where mandatory consumer protection
            laws in your jurisdiction of residence require otherwise.
          </p>
        </Section>

        <Section label="Contact">
          <p>
            Questions about these Terms can be sent to{" "}
            <a
              href="mailto:support@aramzor.com"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              support@aramzor.com
            </a>
            .
          </p>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}
