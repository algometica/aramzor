import Link from "next/link";

import { Wordmark } from "@/components/wordmark";

export const metadata = {
  title: "Full Aramzor - Subscribe",
  description: "Full Aramzor. $8/month. No fluff.",
};

export default function SubscribePage() {
  const checkoutUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL ?? "#";

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="px-6 md:px-10 py-6 flex justify-between items-center">
        <Wordmark size="md" />
        <Link
          href="/dashboard"
          className="text-[13px] font-medium text-text-muted hover:text-text transition-colors"
        >
          Back
        </Link>
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 md:px-24 py-16 max-w-3xl mx-auto w-full">
        <div className="space-y-10">
          <div className="space-y-3">
            <p className="text-[13px] font-medium text-accent">Full access</p>
            <h1 className="font-display font-semibold text-[48px] md:text-[64px] leading-[1.02] tracking-[-0.04em] text-text">
              Full Aramzor.
            </h1>
          </div>

          <div className="space-y-2">
            <p className="font-display font-semibold text-[48px] md:text-[56px] text-text tracking-[-0.04em] leading-none">
              $8
              <span className="font-medium text-[22px] text-text-muted">/month</span>
            </p>
            <p className="text-[13px] font-medium text-text-dim">
              Cancel anytime.
            </p>
          </div>

          <div className="space-y-3 max-w-sm">
            {[
              "All five modes",
              "Unlimited sessions",
              "Natural High, Performance, and Energy",
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

          <a
            href={checkoutUrl}
            className="inline-flex rounded-full bg-text text-bg hover:opacity-90 text-[15px] font-medium px-10 py-3.5 transition-opacity"
          >
            Begin - $8/month
          </a>

          <p className="text-[12px] font-medium text-text-dim">
            Free trial covers Calm and Sleep only. Premium modes stay locked until you subscribe.
          </p>
        </div>
      </main>

      <footer className="py-10 px-6 flex justify-center">
        <p className="text-[12px] font-medium text-text-dim">
          Aramzor. The Ancient Modernist.
        </p>
      </footer>
    </div>
  );
}
