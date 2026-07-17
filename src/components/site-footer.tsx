import Link from "next/link";

import { auth } from "@/auth";

import { Wordmark } from "./wordmark";

function FooterLink({
  href,
  children,
  accent = false,
}: {
  href: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center text-[14px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
        accent
          ? "text-accent hover:text-accent-hover"
          : "text-text-muted hover:text-text"
      }`}
    >
      {children}
    </Link>
  );
}

export async function SiteFooter({
  showDisclaimer = true,
}: {
  showDisclaimer?: boolean;
}) {
  const session = await auth();
  const signedIn = Boolean(session?.user?.email);
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t border-text-dim/10 px-6 pb-safe sm:px-8 md:px-10 py-8 md:py-10"
      style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Single row layout */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
          {/* Brand - left */}
          <div className="flex items-center gap-3 shrink-0">
            <Wordmark size="sm" href={signedIn ? "/dashboard" : "/"} />
            <div className="h-6 w-px bg-text-dim/20" />
            <p className="text-[12px] text-text-muted font-light">
              The breathwork that earns your calm.
            </p>
          </div>

          {/* Navigation - center */}
          <nav aria-label="Footer Navigation" className="flex items-center gap-6 md:gap-8">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/science">Science</FooterLink>
            {signedIn ? (
              <>
                <FooterLink href="/dashboard">Dashboard</FooterLink>
                <FooterLink href="/profile">Archive</FooterLink>
              </>
            ) : (
              <FooterLink href="/login" accent>
                Sign In
              </FooterLink>
            )}
          </nav>

          {/* Copyright - right */}
          <p className="caps-tight text-[11px] text-text-dim shrink-0">
            © {year} Aramzor
          </p>
        </div>

        {/* Disclaimer - optional secondary row */}
        {showDisclaimer && (
          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-text-dim/10">
            <p className="text-[11px] leading-relaxed text-text-dim font-light max-w-4xl">
              Performance breathwork utility – not medical advice. Consult a physician before high-intensity CO2 tolerance training.
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
