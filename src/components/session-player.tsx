"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

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
  if (phase === "zor") return { color: "#C4522A", opacity: 0.30, shadow: 0.25 };
  if (phase === "threshold") return { color: "#8B3A1E", opacity: 0.14, shadow: 0.10 };
  if (phase === "return") return { color: "#D4603A", opacity: 0.44, shadow: 0.38 };
  return { color: "#A34525", opacity: 0.18, shadow: 0.14 };
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
  const counter = phaseCounterFor(beats, idx);
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

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative">
        {/* Phase label - fixed at top */}
        <div className="absolute top-8 text-center">
          <p className="caps-wide text-[11px] text-ember tracking-[0.38em] font-semibold">
            {PHASE_SUBTITLE[beat.phase]}
          </p>
          <h2 className="font-display italic font-bold text-6xl md:text-7xl tracking-wider text-text uppercase">
            {PHASE_LABEL[beat.phase]}
          </h2>
        </div>

        {/* Breathing circle - locked in center, never moves */}
        <div
          className="relative flex items-center justify-center shrink-0 rounded-2xl"
          style={{
            width: 380,
            height: 380,
            backgroundColor: `rgba(${glow.color === "#C4522A" ? "196, 82, 42" : glow.color === "#8B3A1E" ? "139, 58, 30" : glow.color === "#D4603A" ? "212, 96, 58" : "163, 69, 37"}, 0.08)`,
            transition: "background-color 1000ms ease",
          }}
        >
          {/* Main sphere */}
          <div
            className="absolute rounded-full"
            style={{
              width: 300,
              height: 300,
              background:
                "radial-gradient(circle at 34% 30%, #DE6840 0%, #C4522A 35%, #8B3A1E 70%, #4A1C0A 100%)",
              boxShadow: `0 0 60px 10px rgba(196, 82, 42, ${shadowOpacity})`,
              transform: `scale(${targetScale})`,
              transition: `transform ${transitionMs}ms ease-in-out, box-shadow 900ms ease`,
            }}
          />
          {/* Inner glass ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 222,
              height: 222,
              border: "1px solid rgba(255,255,255,0.04)",
              transform: `scale(${targetScale * 0.9})`,
              transition: `transform ${transitionMs}ms ease-in-out`,
            }}
          />
        </div>

        {/* Instructions - fixed at bottom, never moves */}
        <div
          key={idx}
          className="absolute bottom-24 md:bottom-32 fade-up text-center flex flex-col items-center gap-4 w-full px-6"
        >
          <p className="font-display text-2xl md:text-3xl text-text font-bold leading-relaxed uppercase tracking-wide">
            {isPaused ? "Paused" : beat.instruction}
          </p>

          {showBuildHint && (
            <p className="caps-tight text-[11px] text-ember font-semibold">
              Build to full intensity
            </p>
          )}

          {!isPaused && beat.phase === "threshold" && (
            <p className={`caps-tight text-[15px] text-ember tabular-nums font-semibold ${stage === "running" ? "tick-pulse" : ""}`}>
              {fmtSec(elapsedSec)}
            </p>
          )}

          {!isPaused && counter && beat.phase === "zor" && (
            <p className="caps-tight text-[12px] text-text-muted font-semibold">
              Breath {counter.current} of {counter.total}
            </p>
          )}

          {!isPaused && counter && beat.phase === "aram" && (
            <p className="caps-tight text-[12px] text-text-muted font-semibold">
              Cycle {counter.current} of {counter.total}
            </p>
          )}
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
