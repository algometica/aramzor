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
      className="w-full border-t border-text-dim/10 px-6 pb-safe sm:px-8 md:px-10 py-8 md:py-12"
      style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* 3-column grid on desktop, stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 mb-6">
          {/* Left column: Brand */}
          <div className="flex flex-col gap-3">
            <Wordmark size="sm" href={signedIn ? "/dashboard" : "/"} />
            <p className="text-[12px] text-text-muted font-light max-w-xs">
              When panic hits, start with one breath.
            </p>
          </div>

          {/* Center column: Navigation */}
          <nav aria-label="Footer Navigation" className="flex flex-col gap-3 md:items-center">
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

          {/* Right column: Copyright */}
          <div className="flex flex-col justify-start md:items-end md:justify-start">
            <p className="caps-tight text-[11px] text-text-dim">
              © {year} Aramzor
            </p>
          </div>
        </div>

        {/* Disclaimer - spans full width below */}
        {showDisclaimer && (
          <div className="pt-6 border-t border-text-dim/10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <p className="text-[11px] leading-relaxed text-text-dim font-light max-w-4xl">
              Performance breathwork utility - not medical advice. Consult a physician before high-intensity CO2 tolerance training.
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <FooterLink href="/privacy">Privacy</FooterLink>
              <FooterLink href="/terms">Terms</FooterLink>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
