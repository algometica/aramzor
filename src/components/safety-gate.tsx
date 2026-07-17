"use client";

import { useEffect, useState } from "react";

import { Wordmark } from "./wordmark";

const HOLD_MS = 3000;

export function SafetyGate({ onEnter }: { onEnter: () => void }) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setArmed(true), HOLD_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="h-dvh max-h-dvh bg-bg-deep flex flex-col overflow-y-auto overscroll-contain pt-safe">
      <header className="px-5 sm:px-6 md:px-10 py-5 sm:py-7 flex justify-center shrink-0">
        <Wordmark size="sm" />
      </header>

      <main
        id="main-content"
        className="flex flex-1 flex-col items-center justify-center px-5 py-6 sm:px-6 md:px-12"
      >
        <div className="w-full max-w-lg space-y-7 sm:space-y-10">
          <h1 className="text-[13px] font-medium tracking-[-0.01em] text-text-muted">
            Before you begin
          </h1>

          <div className="space-y-4 sm:space-y-5" role="note" aria-label="Safety warnings">
            <p className="font-display text-[24px] font-semibold leading-snug tracking-[-0.03em] text-text sm:text-[28px] md:text-[34px]">
              Never practice Aramzor near or in water - bathtub, pool, or open
              water. Brief loss of consciousness is possible during breath holds.
              It is fatal near water.
            </p>
            <p className="text-[15px] leading-relaxed text-text-muted sm:text-[17px]">
              Do not practice while driving or operating machinery. If you are
              pregnant, have cardiovascular disease, epilepsy, or recent surgery
              - consult a physician first. This is not medical treatment.
            </p>
          </div>

          <button
            type="button"
            onClick={onEnter}
            disabled={!armed}
            aria-disabled={!armed}
            className={`min-h-12 w-full rounded-full px-8 py-3.5 text-[15px] font-medium transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto ${
              armed
                ? "cursor-pointer bg-text text-bg hover:opacity-90 active:opacity-80"
                : "cursor-not-allowed bg-surface-low text-text-dim"
            }`}
          >
            {armed ? "I understand. Begin" : "Read carefully..."}
          </button>
        </div>
      </main>

      <div className="pb-safe shrink-0 h-4" />
    </div>
  );
}
