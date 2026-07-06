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
    <div className="min-h-screen bg-bg-deep flex flex-col">
      <header className="px-6 md:px-10 py-7 flex justify-center">
        <Wordmark size="sm" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12">
        <div className="max-w-xl w-full space-y-10">
          <p className="caps-wide text-[9px] text-ember tracking-[0.38em]">
            Before you begin
          </p>

          <div className="space-y-6">
            <p className="font-display text-2xl md:text-3xl leading-relaxed text-text font-light">
              Never practice Aramzor near or in water - bathtub, pool, or open
              water. Brief loss of consciousness is possible during breath holds.
              It is fatal near water.
            </p>
            <p className="font-body text-text-muted text-base leading-relaxed font-light">
              Do not practice while driving or operating machinery. If you are
              pregnant, have cardiovascular disease, epilepsy, or recent surgery
              - consult a physician first. This is not medical treatment.
            </p>
          </div>

          <button
            onClick={onEnter}
            disabled={!armed}
            className={`caps-tight text-sm px-12 py-4 transition-all duration-700 rounded-sm ${
              armed
                ? "bg-ember hover:bg-ember-hover text-text cursor-pointer"
                : "bg-surface-low text-text-dim cursor-not-allowed"
            }`}
          >
            {armed ? "I Understand. Begin." : "Read carefully..."}
          </button>
        </div>
      </main>
    </div>
  );
}
