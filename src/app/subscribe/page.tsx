import Link from "next/link";

import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Full Aramzor - Subscribe",
  description: "Full Aramzor. $8/month. No fluff.",
  robots: { index: false, follow: false },
};

export default function SubscribePage() {
  const checkoutUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL ?? "#";

  return (
    <div className="min-h-dvh bg-bg flex flex-col">
      <SiteHeader variant="app" />

      <main id="main-content" className="flex-1 flex flex-col justify-center px-5 sm:px-6 md:px-24 py-16 max-w-6xl mx-auto w-full">
        <div className="space-y-10">
          <div className="space-y-3">
            <p className="text-[13px] font-medium text-accent">Full access</p>
            <h1 className="font-display font-semibold text-[48px] md:text-[64px] leading-[1.02] tracking-[-0.04em] text-text">
              Full Aramzor.
            </h1>
            <p className="text-text-muted text-[16px] sm:text-[17px] leading-relaxed max-w-md">
              Your free sessions are done. Subscribe to keep every mode open.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-display font-semibold text-[48px] md:text-[56px] text-text tracking-[-0.04em] leading-none">
              $8
              <span className="font-medium text-[22px] text-text-muted">
                /month
              </span>
            </p>
            <p className="text-[13px] font-medium text-text-dim">
              Cancel anytime.
            </p>
          </div>

          <div className="space-y-3 max-w-sm">
            {[
              "All five modes",
              "Unlimited sessions",
              "Natural High, Steady, and Energy",
              "Calm and Sleep included",
              "No ads. No newsletter.",
            ].map((line) => (
              <div key={line} className="flex items-start gap-3">
                <span className="text-accent mt-1 shrink-0 text-[13px]">-</span>
                <p className="text-text-muted text-[15px] leading-relaxed">
                  {line}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={checkoutUrl}
              className="inline-flex items-center justify-center rounded-full bg-text text-bg hover:opacity-90 text-[15px] font-medium px-10 py-3.5 min-h-12 transition-opacity"
            >
              Begin - $8/month
            </a>
            <div className="flex items-center gap-5">
              <Link
                href="/dashboard"
                className="text-[13px] font-medium text-text-muted hover:text-text transition-colors min-h-11 inline-flex items-center"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="text-[13px] font-medium text-text-muted hover:text-text transition-colors min-h-11 inline-flex items-center"
              >
                Account
              </Link>
            </div>
          </div>

          <p className="text-[12px] font-medium text-text-dim">
            Free trial covers Calm and Sleep only. Premium modes stay locked
            until you subscribe.
          </p>
        </div>
      </main>

      <footer className="py-10 px-6 flex justify-center pb-safe">
        <p className="text-[12px] font-medium text-text-dim">
          Aramzor. The Ancient Modernist.
        </p>
      </footer>
    </div>
  );
}
