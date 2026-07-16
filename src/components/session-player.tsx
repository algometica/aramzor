"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { logCompletedSession } from "@/app/session/[mode]/actions";
import {
  type Beat,
  type BeatPhase,
  PHASE_LABEL,
  PHASE_SUBTITLE,
  POSITION_HINT,
} from "@/lib/protocol";

import { SafetyGate } from "./safety-gate";
import { Wordmark } from "./wordmark";

type Stage = "safety" | "running" | "paused" | "completing";

const PHASE_ORDER: BeatPhase[] = ["zor", "threshold", "return", "aram"];

const PHASE_SHORT: Record<BeatPhase, string> = {
  zor: "Zor",
  threshold: "Threshold",
  return: "Return",
  aram: "Aram",
};

function scaleFor(action: Beat["action"], intensity?: Beat["intensity"]): number {
  if (action === "inhale") return intensity === "reduced" ? 0.7 : 1.0;
  if (action === "exhale") return 0.36;
  if (action === "hold-full") return 1.0;
  return 0.36;
}

function bloomFor(phase: Beat["phase"]): { inner: string; outer: string } {
  if (phase === "zor") {
    return {
      inner: "rgba(41,151,255,0.35)",
      outer: "rgba(41,151,255,0.12)",
    };
  }
  if (phase === "threshold") {
    return {
      inner: "rgba(161,161,166,0.22)",
      outer: "rgba(161,161,166,0.08)",
    };
  }
  if (phase === "return") {
    return {
      inner: "rgba(100,181,255,0.45)",
      outer: "rgba(100,181,255,0.16)",
    };
  }
  return {
    inner: "rgba(210,210,215,0.28)",
    outer: "rgba(210,210,215,0.1)",
  };
}

function ringColorFor(phase: Beat["phase"]): string {
  if (phase === "zor") return "#2997ff";
  if (phase === "threshold") return "#a1a1a6";
  if (phase === "return") return "#64b5ff";
  return "#d2d2d7";
}

function phaseCounterFor(
  beats: Beat[],
  idx: number,
): { current: number; total: number } | null {
  const beat = beats[idx];
  if (!beat) return null;
  if (beat.phase !== "zor" && beat.phase !== "aram") return null;
  if (beat.action === "hold-full" || beat.action === "hold-empty") return null;

  const refIdx = beat.action === "exhale" ? idx - 1 : idx;
  if (refIdx < 0) return null;
  const ref = beats[refIdx];
  if (!ref || ref.action !== "inhale" || ref.phase !== beat.phase) return null;

  let start = refIdx;
  while (start > 0 && beats[start - 1].phase === beat.phase) {
    start--;
  }

  const inhales: number[] = [];
  for (let i = start; i < beats.length; i++) {
    if (beats[i].phase !== beat.phase) break;
    if (beats[i].action === "inhale") inhales.push(i);
  }

  const pos = inhales.indexOf(refIdx);
  if (pos === -1) return null;
  return { current: pos + 1, total: inhales.length };
}

function fmtSec(s: number): string {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function phaseIndexOf(phase: BeatPhase): number {
  return PHASE_ORDER.indexOf(phase);
}

export function SessionPlayer({
  modeId,
  beats,
  totalDurationSec,
}: {
  modeId: string;
  beats: Beat[];
  totalDurationSec: number;
}) {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("safety");
  const [idx, setIdx] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [beatProgress, setBeatProgress] = useState(0);
  const beatTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef = useRef<number | null>(null);
  const beatStartRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);
  const pausedProgressRef = useRef<number>(0);

  const beat = beats[idx];

  useEffect(() => {
    if (stage !== "running") return;
    if (idx >= beats.length) {
      setStage("completing");
      return;
    }

    const duration = beats[idx].durationMs;
    const already = pausedProgressRef.current;
    const remaining = Math.max(16, duration * (1 - already));
    beatStartRef.current = Date.now() - duration * already;
    if (already === 0) setElapsedSec(0);

    const tick = () => {
      const p = Math.min(1, (Date.now() - beatStartRef.current) / duration);
      setBeatProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    beatTimerRef.current = setTimeout(() => {
      pausedProgressRef.current = 0;
      setBeatProgress(0);
      setIdx((i) => i + 1);
    }, remaining);

    return () => {
      if (beatTimerRef.current) clearTimeout(beatTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [stage, idx, beats]);

  useEffect(() => {
    const isThreshold = beat?.phase === "threshold" && stage === "running";
    if (!isThreshold) {
      if (elapsedRef.current) clearInterval(elapsedRef.current);
      return;
    }
    elapsedRef.current = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - beatStartRef.current) / 1000));
    }, 250);
    return () => {
      if (elapsedRef.current) clearInterval(elapsedRef.current);
    };
  }, [stage, beat]);

  useEffect(() => {
    if (stage !== "completing") return;
    logCompletedSession(modeId, totalDurationSec).catch(() => {
      router.push("/dashboard");
    });
  }, [stage, modeId, totalDurationSec, router]);

  const handlePause = useCallback(() => {
    if (stage === "running") {
      if (beatTimerRef.current) clearTimeout(beatTimerRef.current);
      if (elapsedRef.current) clearInterval(elapsedRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      pausedAtRef.current = Date.now();
      pausedProgressRef.current = beatProgress;
      setStage("paused");
    } else if (stage === "paused") {
      setStage("running");
    }
  }, [stage, beatProgress]);

  const progressPct = Math.round((idx / Math.max(beats.length, 1)) * 100);
  const counter = useMemo(() => phaseCounterFor(beats, idx), [beats, idx]);

  const roundInfo = useMemo(() => {
    if (modeId !== "natural-high") return null;
    let rounds = 0;
    for (let i = 0; i <= idx; i++) {
      if (
        beats[i]?.phase === "zor" &&
        (i === 0 || beats[i - 1]?.phase !== "zor")
      ) {
        rounds++;
      }
    }
    return { current: Math.max(1, rounds), total: 3 };
  }, [modeId, beats, idx]);

  if (stage === "safety") return <SafetyGate onEnter={() => setStage("running")} />;

  if (stage === "completing" || !beat) {
    return (
      <div className="h-dvh bg-bg-deep flex items-center justify-center px-6">
        <p className="text-[15px] text-text-muted font-medium tracking-[-0.01em]">
          Closing session...
        </p>
      </div>
    );
  }

  const isPaused = stage === "paused";
  const isHold = beat.action === "hold-full" || beat.action === "hold-empty";
  const targetScale = scaleFor(beat.action, beat.intensity);
  const transitionMs = isHold ? 900 : beat.durationMs;
  const bloom = bloomFor(beat.phase);
  const ringColor = ringColorFor(beat.phase);
  const positionHint = POSITION_HINT[modeId];
  const showBuildHint =
    !isPaused &&
    beat.phase === "zor" &&
    beat.intensity === "reduced" &&
    beat.action === "inhale";

  const currentPhaseIdx = phaseIndexOf(beat.phase);

  // SVG ring geometry
  const ringSize = 100;
  const stroke = 1.6;
  const radius = (ringSize - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - (isPaused ? pausedProgressRef.current : beatProgress));

  return (
    <div className="h-dvh max-h-dvh bg-bg-deep flex flex-col select-none overflow-hidden overscroll-none pt-safe">
      <header className="relative z-20 flex justify-between items-center px-4 sm:px-6 md:px-10 shrink-0">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-[14px] font-medium text-text-muted hover:text-text transition-colors min-h-11 min-w-14 inline-flex items-center"
        >
          Exit
        </button>
        <Wordmark size="sm" />
        <button
          onClick={handlePause}
          className="text-[14px] font-medium text-text-muted hover:text-text transition-colors min-h-11 min-w-14 inline-flex items-center justify-end"
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
      </header>

      <div className="w-full h-px bg-white/[0.06] shrink-0">
        <div
          className="h-full bg-white/35 transition-all duration-700 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Phase journey */}
      <div className="relative z-20 px-3 sm:px-6 md:px-10 pt-3 sm:pt-5 shrink-0 flex flex-col items-center gap-1.5 sm:gap-2">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 max-w-full overflow-x-auto">
          {PHASE_ORDER.map((phase, i) => {
            const done = i < currentPhaseIdx;
            const active = i === currentPhaseIdx;
            return (
              <div key={phase} className="flex items-center gap-2 md:gap-3">
                {i > 0 && (
                  <div
                    className={`h-px w-3 sm:w-4 md:w-8 transition-colors ${
                      done || active ? "bg-white/25" : "bg-white/8"
                    }`}
                  />
                )}
                <span
                  className={`text-[10px] sm:text-[11px] md:text-[12px] font-medium tracking-[-0.01em] whitespace-nowrap transition-colors ${
                    active
                      ? "text-text"
                      : done
                        ? "text-text-muted"
                        : "text-text-dim/70"
                  }`}
                >
                  {PHASE_SHORT[phase]}
                </span>
              </div>
            );
          })}
        </div>
        {roundInfo && (
          <p className="text-[11px] font-medium text-text-dim tabular-nums">
            Round {roundInfo.current} of {roundInfo.total}
          </p>
        )}
      </div>

      <main className="flex-1 relative flex flex-col min-h-0">
        <div className="pt-3 sm:pt-6 md:pt-8 flex flex-col items-center gap-1 relative z-10 px-4">
          <p className="text-[11px] sm:text-[12px] font-medium text-text-dim tracking-[0.1em] uppercase">
            {PHASE_SUBTITLE[beat.phase]}
          </p>
          <h2 className="font-display font-semibold text-[24px] sm:text-[30px] md:text-[40px] tracking-[-0.035em] text-text text-center">
            {PHASE_LABEL[beat.phase]}
          </h2>
        </div>

        {/* Orb stage - oversized stage so bloom never clips square */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="relative flex items-center justify-center"
            style={{
              // Fit between chrome + copy on short phones; grow on larger screens.
              width: "min(78vw, 46dvh, 420px)",
              height: "min(78vw, 46dvh, 420px)",
            }}
          >
            {/* Outer bloom via radial gradient only */}
            <div
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: isPaused ? 0.35 : 1,
                background: `radial-gradient(circle at 50% 50%, ${bloom.inner} 0%, ${bloom.outer} 32%, transparent 58%)`,
                transform: `scale(${0.85 + targetScale * 0.2})`,
                transition: `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1), opacity 800ms ease`,
              }}
            />

            {/* Beat progress ring */}
            <svg
              className="absolute"
              viewBox={`0 0 ${ringSize} ${ringSize}`}
              style={{
                width: "78%",
                height: "78%",
                transform: "rotate(-90deg)",
                opacity: isPaused ? 0.4 : 0.9,
              }}
            >
              <circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={stroke}
              />
              <circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={radius}
                fill="none"
                stroke={ringColor}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ transition: isPaused ? "none" : "stroke-dashoffset 80ms linear" }}
              />
            </svg>

            {/* Core orb */}
            <div
              className="absolute rounded-full"
              style={{
                width: "58%",
                height: "58%",
                background:
                  "radial-gradient(circle at 38% 32%, #ffffff 0%, #e4e4e8 24%, #8e8e93 58%, #2c2c2e 82%, #0a0a0a 100%)",
                boxShadow: isPaused
                  ? "0 0 40px 4px rgba(255,255,255,0.04)"
                  : `0 0 50px 6px rgba(255,255,255,0.1), 0 0 90px 20px ${bloom.outer}`,
                transform: `scale(${targetScale})`,
                transition: `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 700ms ease, opacity 500ms ease`,
                opacity: isPaused ? 0.5 : 0.96,
              }}
            />

            {/* Inner glass rim */}
            <div
              className="absolute rounded-full border border-white/[0.12]"
              style={{
                width: "42%",
                height: "42%",
                transform: `scale(${targetScale})`,
                transition: `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                opacity: isPaused ? 0.3 : 0.65,
              }}
            />
          </div>
        </div>

        <div className="relative z-10 mt-auto px-4 sm:px-6 pb-1">
          <div
            key={idx}
            className="fade-up text-center flex flex-col items-center gap-2 sm:gap-3 py-4 sm:py-6 w-full"
          >
            <p
              className="font-display font-medium text-[22px] sm:text-[26px] md:text-[34px] leading-snug tracking-[-0.03em] max-w-xl text-center"
              style={{
                color: isPaused
                  ? "#86868b"
                  : beat.action === "inhale"
                    ? "#f5f5f7"
                    : beat.action === "exhale"
                      ? "#d2d2d7"
                      : "#a1a1a6",
              }}
            >
              {isPaused ? "Paused" : beat.instruction}
            </p>

            {showBuildHint && (
              <p className="text-[13px] font-medium text-text-dim">
                Build to full intensity
              </p>
            )}

            <div className="flex flex-col items-center gap-1.5 min-h-[2.25rem]">
              {!isPaused && beat.phase === "threshold" && (
                <p
                  className={`font-display text-[30px] md:text-[36px] text-text tabular-nums font-semibold tracking-[-0.03em] ${
                    stage === "running" ? "tick-pulse" : ""
                  }`}
                >
                  {fmtSec(elapsedSec)}
                </p>
              )}

              {!isPaused && counter && (beat.phase === "zor" || beat.phase === "aram") && (
                <p className="text-[13px] font-medium text-text-dim tabular-nums">
                  {beat.phase === "zor"
                    ? `Breath ${counter.current} of ${counter.total}`
                    : `Cycle ${counter.current} of ${counter.total}`}
                </p>
              )}

              {!isPaused && (beat.action === "hold-full" || beat.action === "hold-empty") && beat.phase !== "threshold" && (
                <p className="text-[13px] font-medium text-text-dim">
                  Holding
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-20 w-full pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:py-9 flex flex-col items-center gap-2 sm:gap-3 shrink-0 px-4">
        <button
          onClick={handlePause}
          className="rounded-full bg-surface-low hover:bg-surface active:bg-surface-high text-text text-[15px] font-medium px-8 py-3.5 min-h-12 min-w-[200px] transition-colors cursor-pointer"
        >
          {isPaused ? "Resume practice" : "Pause practice"}
        </button>
        {positionHint && (
          <p className="text-[11px] sm:text-[12px] font-medium text-text-dim text-center">
            {positionHint}
          </p>
        )}
      </footer>
    </div>
  );
}
