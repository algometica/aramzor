"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { logCompletedSession } from "@/app/session/[mode]/actions";
import {
  type Beat,
  PHASE_LABEL,
  PHASE_SUBTITLE,
  POSITION_HINT,
} from "@/lib/protocol";

import { SafetyGate } from "./safety-gate";
import { Wordmark } from "./wordmark";

type Stage = "safety" | "running" | "paused" | "completing";

function scaleFor(action: Beat["action"], intensity?: Beat["intensity"]): number {
  if (action === "inhale") return intensity === "reduced" ? 0.72 : 1.0;
  if (action === "exhale") return 0.38;
  if (action === "hold-full") return 1.0;
  return 0.38;
}

type GlowConfig = { color: string; opacity: number; shadow: number };

function glowFor(phase: Beat["phase"]): GlowConfig {
  if (phase === "zor") return { color: "#C4522A", opacity: 0.32, shadow: 0.28 };
  if (phase === "threshold") return { color: "#7A3018", opacity: 0.12, shadow: 0.08 };
  if (phase === "return") return { color: "#E8703A", opacity: 0.62, shadow: 0.55 };
  return { color: "#A34525", opacity: 0.20, shadow: 0.16 };
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
  const beatTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const beatStartRef = useRef<number>(0);

  const beat = beats[idx];

  useEffect(() => {
    if (stage !== "running") return;
    if (idx >= beats.length) {
      setStage("completing");
      return;
    }
    beatStartRef.current = Date.now();
    setElapsedSec(0);
    beatTimerRef.current = setTimeout(() => setIdx((i) => i + 1), beats[idx].durationMs);
    return () => {
      if (beatTimerRef.current) clearTimeout(beatTimerRef.current);
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
    }, 1000);
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
      setStage("paused");
    } else if (stage === "paused") {
      setStage("running");
    }
  }, [stage]);

  if (stage === "safety") return <SafetyGate onEnter={() => setStage("running")} />;

  if (stage === "completing" || !beat) {
    return (
      <div className="min-h-screen bg-bg-deep flex items-center justify-center">
        <p className="caps-wide text-xs text-text-muted">Closing the ritual...</p>
      </div>
    );
  }

  const isPaused = stage === "paused";
  const isHold = beat.action === "hold-full" || beat.action === "hold-empty";
  const targetScale = scaleFor(beat.action, beat.intensity);
  const transitionMs = isHold ? 900 : beat.durationMs;
  const glow = glowFor(beat.phase);
  const glowOpacity = isPaused ? glow.opacity * 0.25 : glow.opacity;
  const shadowOpacity = isPaused ? 0.06 : glow.shadow;
  const progressPct = Math.round((idx / beats.length) * 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const counter = useMemo(() => phaseCounterFor(beats, idx), [idx]);
  const positionHint = POSITION_HINT[modeId];
  const showBuildHint =
    !isPaused &&
    beat.phase === "zor" &&
    beat.intensity === "reduced" &&
    beat.action === "inhale";

  return (
    <div className="min-h-screen bg-bg-deep flex flex-col select-none">
      <header className="flex justify-between items-center px-6 md:px-10 py-7 shrink-0">
        <button
          onClick={() => router.push("/dashboard")}
          className="caps-tight text-[11px] text-text-muted hover:text-ember transition-colors"
        >
          Exit
        </button>
        <Wordmark size="sm" />
        <div className="w-10" />
      </header>

      <div className="w-full h-px bg-surface-low shrink-0">
        <div
          className="h-full bg-ember/25 transition-all duration-[3000ms] ease-linear"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <main className="flex-1 relative flex flex-col bg-bg-deep px-6 py-8">
        {/* Top section - phase info, fixed height */}
        <div className="h-24 flex flex-col items-center justify-center">
          <p className="caps-wide text-[10px] text-ember/60 tracking-[0.4em] font-semibold">
            {PHASE_SUBTITLE[beat.phase]}
          </p>
          <h2 className="font-display italic font-bold text-5xl md:text-6xl tracking-widest text-text mt-1">
            {PHASE_LABEL[beat.phase]}
          </h2>
        </div>

        {/* Breathing circle - absolutely centered, never moves */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <div
            className="relative flex items-center justify-center shrink-0"
            style={{
              width: 380,
              height: 380,
            }}
          >
            {/* Outer ambient bloom */}
            <div
              className="absolute rounded-full"
              style={{
                width: 500,
                height: 500,
                backgroundColor: glow.color,
                opacity: glowOpacity * 0.22,
                filter: "blur(80px)",
                transform: `scale(${targetScale * 1.15})`,
                transition: `transform ${transitionMs}ms ease-in-out, opacity 1200ms ease`,
              }}
            />

            {/* Mid glow ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: 400,
                height: 400,
                backgroundColor: glow.color,
                opacity: glowOpacity * 0.30,
                filter: "blur(40px)",
                transform: `scale(${targetScale * 1.05})`,
                transition: `transform ${transitionMs}ms ease-in-out, opacity 1000ms ease`,
              }}
            />

            {/* Main sphere */}
            <div
              className="absolute rounded-full"
              style={{
                width: 320,
                height: 320,
                background:
                  "radial-gradient(circle at 34% 30%, #E87048 0%, #C4522A 38%, #8B3A1E 68%, #3E1608 100%)",
                boxShadow: `0 0 100px 30px rgba(196, 82, 42, ${shadowOpacity}), inset 0 2px 6px rgba(255,255,255,0.08)`,
                transform: `scale(${targetScale})`,
                transition: `transform ${transitionMs}ms ease-in-out, box-shadow 900ms ease`,
              }}
            />

            {/* Inner glass ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: 240,
                height: 240,
                border: "1px solid rgba(255,255,255,0.05)",
                transform: `scale(${targetScale * 0.88})`,
                transition: `transform ${transitionMs}ms ease-in-out`,
              }}
            />

            {/* Outer ring - barely visible structural detail */}
            <div
              className="absolute rounded-full"
              style={{
                width: 338,
                height: 338,
                border: "1px solid rgba(255,255,255,0.03)",
                transform: `scale(${targetScale})`,
                transition: `transform ${transitionMs}ms ease-in-out`,
              }}
            />
          </div>
        </div>

        {/* Bottom section - instructions, fixed height, positioned at bottom */}
        <div className="relative mt-auto">
          <div
            key={idx}
            className="fade-up text-center flex flex-col items-center gap-6 py-8 w-full"
          >
            <p
              className="font-display italic font-normal text-3xl md:text-4xl leading-snug max-w-2xl text-center"
              style={{
                color: isPaused
                  ? "#9E9189"
                  : beat.action === "inhale"
                    ? "#D4603A"
                    : beat.action === "exhale"
                      ? "#F5EFE6"
                      : "#9E9189",
              }}
            >
              {isPaused ? "Paused" : beat.instruction}
            </p>

            {showBuildHint && (
              <p className="caps-wide text-[10px] text-ember/70 tracking-[0.35em] font-semibold">
                Build to full intensity
              </p>
            )}

            <div className="flex flex-col items-center gap-3">
              {!isPaused && beat.phase === "threshold" && (
                <p className={`font-display text-3xl md:text-4xl text-ember tabular-nums font-bold ${stage === "running" ? "tick-pulse" : ""}`}>
                  {fmtSec(elapsedSec)}
                </p>
              )}

              {!isPaused && counter && (beat.phase === "zor" || beat.phase === "aram") && (
                <p className="caps-tight text-[11px] text-text-muted/70 tracking-[0.25em] font-semibold">
                  {beat.phase === "zor" ? `Breath ${counter.current} of ${counter.total}` : `Cycle ${counter.current} of ${counter.total}`}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 md:py-10 flex flex-col items-center gap-3 shrink-0">
        <button
          onClick={handlePause}
          className="caps-tight text-[12px] text-text font-semibold hover:text-ember transition-colors px-8 py-3 cursor-pointer"
        >
          {isPaused ? "Resume Practice" : "Pause Practice"}
        </button>
        {positionHint && (
          <p className="caps-tight text-[11px] text-text-muted tracking-[0.3em] font-semibold">
            {positionHint}
          </p>
        )}
      </footer>
    </div>
  );
}
