import Link from "next/link";

import { Wordmark } from "@/components/wordmark";

export const metadata = {
  title: "Full Aramzor - Subscribe",
  description: "Full Aramzor. $8/month. No fluff.",
};

export default function SubscribePage() {
  const checkoutUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL ?? "#";

  return (
    <div className="min-h-screen bg-bg-deep flex flex-col">
      <header className="px-6 md:px-10 py-7 flex justify-between items-center">
        <Wordmark size="md" />
        <Link
          href="/dashboard"
          className="caps-tight text-[11px] text-text-muted hover:text-ember transition-colors"
        >
          Back
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-lg w-full space-y-10">
          <div className="space-y-4">
            <p className="caps-wide text-[9px] text-ember tracking-[0.38em]">
              Full Access
            </p>
            <h1 className="font-display italic text-5xl md:text-7xl font-light leading-[0.95] tracking-tight text-text">
              Full Aramzor.
            </h1>
          </div>

          <div className="space-y-3">
            <p className="font-display text-4xl md:text-5xl font-light text-text">
              $8
              <span className="text-xl text-text-muted font-light">/month</span>
            </p>
            <p className="caps-wide text-[9px] text-text-dim tracking-[0.3em]">
              No fluff. Cancel anytime.
            </p>
          </div>

          <div className="space-y-4 text-left max-w-xs mx-auto">
            {[
              "All five modes",
              "Unlimited sessions",
              "The Natural High protocol",
              "Performance mode with humming exhale",
              "No ads. No newsletter. Dark.",
            ].map((line) => (
              <div key={line} className="flex items-start gap-3">
                <span className="text-ember mt-0.5 shrink-0">-</span>
                <p className="text-text-muted text-sm leading-relaxed font-light">
                  {line}
                </p>
              </div>
            ))}
          </div>

          <a
            href={checkoutUrl}
            className="inline-block bg-ember hover:bg-ember-hover text-text caps-tight text-sm px-16 py-5 transition-all duration-500 rounded-sm"
          >
            Begin - $8/month
          </a>

          <p className="caps-tight text-[10px] text-text-dim">
            You have used your 3 free sessions.
          </p>
        </div>
      </main>

      <footer className="py-10 px-6 flex justify-center">
        <p className="caps-wide text-[10px] text-text-dim">
          Aramzor. The Ancient Modernist.
        </p>
      </footer>
    </div>
  );
}
