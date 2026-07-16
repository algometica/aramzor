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

      <main className="flex-1 flex flex-col items-center justify-center px-5 sm:px-6 md:px-12 py-6">
        <div className="max-w-lg w-full space-y-7 sm:space-y-10">
          <p className="text-[13px] font-medium text-text-muted tracking-[-0.01em]">
            Before you begin
          </p>

          <div className="space-y-4 sm:space-y-5">
            <p className="font-display font-semibold text-[24px] sm:text-[28px] md:text-[34px] leading-snug tracking-[-0.03em] text-text">
              Never practice Aramzor near or in water - bathtub, pool, or open
              water. Brief loss of consciousness is possible during breath holds.
              It is fatal near water.
            </p>
            <p className="text-text-muted text-[15px] sm:text-[17px] leading-relaxed">
              Do not practice while driving or operating machinery. If you are
              pregnant, have cardiovascular disease, epilepsy, or recent surgery
              - consult a physician first. This is not medical treatment.
            </p>
          </div>

          <button
            onClick={onEnter}
            disabled={!armed}
            className={`rounded-full text-[15px] font-medium w-full sm:w-auto px-8 py-3.5 min-h-12 transition-all duration-500 ${
              armed
                ? "bg-text text-bg hover:opacity-90 active:opacity-80 cursor-pointer"
                : "bg-surface-low text-text-dim cursor-not-allowed"
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
