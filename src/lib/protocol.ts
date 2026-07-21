export type BeatPhase = "zor" | "threshold" | "return" | "aram";
export type BeatAction = "inhale" | "exhale" | "hold-full" | "hold-empty";

export type Beat = {
  phase: BeatPhase;
  action: BeatAction;
  durationMs: number;
  instruction: string;
  intensity?: "reduced" | "full";
};

export const PHASE_LABEL: Record<BeatPhase, string> = {
  zor: "The Zor",
  threshold: "The Threshold",
  return: "The Return",
  aram: "The Aram",
};

export const PHASE_SUBTITLE: Record<BeatPhase, string> = {
  zor: "Activation",
  threshold: "Retention",
  return: "Rescue Breath",
  aram: "Landing",
};

export const POSITION_HINT: Record<string, string> = {
  calm: "Seated or lying",
  sleep: "Lying down - lights off",
  energy: "Seated - spine straight",
  performance: "Lying or seated",
  "natural-high": "Lying down - mandatory",
};

/** Display names. Internal ids stay stable (`performance`, etc.). */
export const PROTOCOL_NAME: Record<string, string> = {
  calm: "Calm",
  sleep: "Sleep",
  energy: "Energy",
  performance: "Steady",
  "natural-high": "Natural High",
};

export function protocolName(modeId: string): string {
  return PROTOCOL_NAME[modeId] ?? modeId;
}

function zorBeats(
  count: number,
  perBreathMs: number,
  inInstruction: string,
): Beat[] {
  const halfMs = Math.round(perBreathMs / 2);
  const out: Beat[] = [];
  for (let i = 0; i < count; i++) {
    const intensity: Beat["intensity"] = i < 10 ? "reduced" : "full";
    out.push({
      phase: "zor",
      action: "inhale",
      durationMs: halfMs,
      instruction: inInstruction,
      intensity,
    });
    out.push({
      phase: "zor",
      action: "exhale",
      durationMs: halfMs,
      instruction: "Let it go",
      intensity,
    });
  }
  return out;
}

function aramCycles(
  count: number,
  inhaleMs: number,
  exhaleMs: number,
  bottomPauseMs = 0,
  exhaleInstruction = "Out through your nose",
): Beat[] {
  const out: Beat[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      phase: "aram",
      action: "inhale",
      durationMs: inhaleMs,
      instruction: "In through your nose",
    });
    out.push({
      phase: "aram",
      action: "exhale",
      durationMs: exhaleMs,
      instruction: exhaleInstruction,
    });
    if (bottomPauseMs > 0) {
      out.push({
        phase: "aram",
        action: "hold-empty",
        durationMs: bottomPauseMs,
        instruction: "Pause at the bottom",
      });
    }
  }
  return out;
}

function returnBeat(holdSec: number, mouthExhale = false): Beat[] {
  return [
    {
      phase: "return",
      action: "inhale",
      durationMs: 5000,
      instruction: mouthExhale
        ? "One breath in. Mouth. Full."
        : "One breath in. Nose. Full.",
    },
    {
      phase: "return",
      action: "hold-full",
      durationMs: holdSec * 1000,
      instruction: "Hold. Top of the breath.",
    },
    {
      phase: "return",
      action: "exhale",
      durationMs: 5000,
      instruction: mouthExhale ? "Sharp release. Mouth." : "Release slowly. Nose.",
    },
  ];
}

function thresholdBeat(durationSec: number): Beat[] {
  return [
    {
      phase: "threshold",
      action: "hold-empty",
      durationMs: durationSec * 1000,
      instruction: "Hold. Empty lungs. Scan your body.",
    },
  ];
}

const CALM: Beat[] = [
  ...zorBeats(40, 3500, "Inhale through your nose"),
  ...thresholdBeat(45),
  ...returnBeat(15),
  ...aramCycles(15, 5000, 8000),
];

const SLEEP: Beat[] = [
  ...zorBeats(30, 3500, "Inhale through your nose"),
  ...thresholdBeat(40),
  ...returnBeat(10),
  ...aramCycles(18, 5000, 10000, 3000),
];

const ENERGY: Beat[] = [
  ...zorBeats(40, 2500, "Inhale through your mouth"),
  ...thresholdBeat(40),
  ...returnBeat(15, true),
  ...aramCycles(8, 4000, 6000),
];

const PERFORMANCE: Beat[] = [
  ...zorBeats(30, 3500, "Inhale through your nose"),
  ...thresholdBeat(60),
  ...returnBeat(15),
  ...aramCycles(12, 4000, 8000, 0, "Hum. Out through your nose."),
];

const NATURAL_HIGH: Beat[] = [
  ...zorBeats(40, 3500, "Inhale through your nose"),
  ...thresholdBeat(55),
  ...returnBeat(20),
  ...aramCycles(5, 4000, 7000),
  ...zorBeats(40, 3500, "Inhale through your nose"),
  ...thresholdBeat(60),
  ...returnBeat(20),
  ...aramCycles(5, 4000, 7000),
  ...zorBeats(40, 3500, "Inhale through your nose"),
  ...thresholdBeat(75),
  ...returnBeat(20),
  ...aramCycles(12, 5000, 9000),
];

export const PROTOCOL_BEATS: Record<string, Beat[]> = {
  calm: CALM,
  sleep: SLEEP,
  energy: ENERGY,
  performance: PERFORMANCE,
  "natural-high": NATURAL_HIGH,
};

export function protocolDurationSec(modeId: string): number {
  const beats = PROTOCOL_BEATS[modeId];
  if (!beats) return 0;
  return Math.round(beats.reduce((sum, b) => sum + b.durationMs, 0) / 1000);
}
