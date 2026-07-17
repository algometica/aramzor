import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Aramzor collects, uses, and protects your personal information.",
  alternates: {
    canonical: "https://aramzor.com/privacy",
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

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-text-dim text-sm mb-16">
          Effective {EFFECTIVE_DATE}
        </p>

        <Section label="Who we are">
          <p>
            Aramzor (&quot;Aramzor,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) is operated by an individual based in British
            Columbia, Canada. Aramzor is not incorporated as a company. This
            Privacy Policy explains what information we collect through
            aramzor.com and the Aramzor application (the &quot;Service&quot;),
            why we collect it, and what rights you have over it.
          </p>
          <p>
            If you have questions about this policy or want to exercise any
            of the rights described below, contact us at{" "}
            <a
              href="mailto:support@aramzor.com"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              support@aramzor.com
            </a>
            .
          </p>
        </Section>

        <Section label="Information we collect">
          <p>We collect the minimum information needed to run the Service.</p>
          <p>
            <span className="text-text font-medium">
              Account information.
            </span>{" "}
            Your email address, collected when you sign in through a magic
            link or, for a small number of test accounts, a password. We do
            not collect your name, date of birth, or physical address unless
            you send it to us directly, for example in a support email.
          </p>
          <p>
            <span className="text-text font-medium">Usage information.</span>{" "}
            Which breathwork protocol you started, when a session began and
            ended, and its duration. This lets us show you your practice
            history and enforce the free-session limit. We do not record
            audio, video, camera, or microphone data at any point. We do not
            collect biometric data such as heart rate, breathing rate, or
            blood oxygen level. Aramzor has no sensors and does not connect to
            wearable devices.
          </p>
          <p>
            <span className="text-text font-medium">
              Payment information.
            </span>{" "}
            Subscriptions are processed by Lemon Squeezy, our payment
            provider. We never see or store your full card number, expiry
            date, or CVC. We receive and store only your subscription status,
            plan, and renewal date, so we can determine whether your account
            has active access.
          </p>
          <p>
            <span className="text-text font-medium">Technical data.</span>{" "}
            Standard server logs (IP address, browser type, timestamps)
            generated automatically by our hosting provider for security and
            debugging. We do not use advertising trackers, third-party
            analytics scripts, or cross-site tracking cookies.
          </p>
        </Section>

        <Section label="How we use your information">
          <p>We use the information above only to:</p>
          <ul className="list-disc list-outside pl-5 space-y-2">
            <li>authenticate you and keep your account secure;</li>
            <li>
              track your free-session usage and unlock premium modes once you
              subscribe;
            </li>
            <li>process and verify subscription payments and renewals;</li>
            <li>
              respond to support requests you send us;
            </li>
            <li>
              maintain, secure, and improve the Service, including
              diagnosing technical issues.
            </li>
          </ul>
          <p>
            We do not sell your personal information. We do not share it with
            advertisers. We do not use it to build advertising profiles.
          </p>
        </Section>

        <Section label="Who we share information with">
          <p>
            We rely on a small number of service providers to operate
            Aramzor. Each processes only the data needed for its function.
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2">
            <li>
              <span className="text-text font-medium">Neon</span>
              , our database provider, stores your account and session
              records.
            </li>
            <li>
              <span className="text-text font-medium">Resend</span>, our
              email provider, delivers magic-link sign-in emails.
            </li>
            <li>
              <span className="text-text font-medium">Lemon Squeezy</span>,
              our payment processor, handles checkout, billing, and
              subscription management, and acts as merchant of record.
            </li>
            <li>
              <span className="text-text font-medium">Vercel</span>, our
              hosting provider, serves the application and stores standard
              server logs.
            </li>
          </ul>
          <p>
            We do not otherwise disclose your personal information to third
            parties, except where required to comply with a valid legal
            process, protect the rights and safety of Aramzor or its users,
            or in connection with a merger, acquisition, or sale of assets, in
            which case we will make reasonable efforts to notify affected
            users first.
          </p>
        </Section>

        <Section label="Cookies">
          <p>
            We use only the cookies strictly necessary to keep you signed in
            and to remember your session state. We do not use cookies for
            advertising or third-party tracking purposes.
          </p>
        </Section>

        <Section label="Data retention">
          <p>
            We retain your account and session data for as long as your
            account remains active. If you delete your account, we delete
            your personal information and session history within 30 days,
            except where we are required to retain limited billing records
            for tax or accounting purposes, or where retention is necessary
            to resolve disputes or enforce our agreements.
          </p>
        </Section>

        <Section label="Data security">
          <p>
            We use industry-standard safeguards, including encrypted
            connections (TLS) between your browser and our servers, hashed
            credentials, and access-restricted databases. No method of
            transmission or storage is completely secure, and we cannot
            guarantee absolute security. If you believe your account has
            been compromised, contact us immediately at{" "}
            <a
              href="mailto:support@aramzor.com"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              support@aramzor.com
            </a>
            .
          </p>
        </Section>

        <Section label="International data transfers">
          <p>
            Our service providers may store or process data in countries
            other than your own, including the United States. Where this
            occurs, those providers maintain their own contractual and
            technical safeguards for cross-border data transfers.
          </p>
        </Section>

        <Section label="Your rights">
          <p>
            Depending on where you live, you may have the right to access,
            correct, export, or delete your personal information, or to
            object to or restrict certain processing. This includes rights
            available under Canada&apos;s Personal Information Protection and
            Electronic Documents Act (PIPEDA), the EU/UK General Data
            Protection Regulation (GDPR), and the California Consumer Privacy
            Act (CCPA), where applicable to you.
          </p>
          <p>
            To exercise any of these rights, email{" "}
            <a
              href="mailto:support@aramzor.com"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              support@aramzor.com
            </a>
            . We will respond within 30 days. You can also delete your own
            session history and cancel your subscription directly from your{" "}
            <Link
              href="/profile"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              account page
            </Link>
            .
          </p>
        </Section>

        <Section label="Children's privacy">
          <p>
            Aramzor is not directed at children and is not intended for use
            by anyone under 16 years of age. We do not knowingly collect
            personal information from children under 16. If you believe a
            child has provided us with personal information, contact us and
            we will delete it.
          </p>
        </Section>

        <Section label="Health information">
          <p>
            Aramzor is a breathwork utility, not a medical device or health
            care service, and the session data we store (protocol name,
            timestamps, duration) is not health information under HIPAA or
            equivalent regulations. We do not collect biometric or medical
            data. For details on the risks and limitations of the practice
            itself, see our{" "}
            <Link
              href="/terms"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              Terms of Service
            </Link>
            .
          </p>
        </Section>

        <Section label="Changes to this policy">
          <p>
            We may update this Privacy Policy from time to time. If we make
            material changes, we will update the effective date above and,
            where appropriate, notify you by email. Continued use of the
            Service after an update constitutes acceptance of the revised
            policy.
          </p>
        </Section>

        <Section label="Contact">
          <p>
            Questions about this Privacy Policy can be sent to{" "}
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
