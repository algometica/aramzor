/** Modes available during the free trial (3 sessions). */
export const FREE_MODE_IDS = ["calm", "sleep"] as const;

/** Modes that always require an active subscription. */
export const PREMIUM_MODE_IDS = [
  "energy",
  "performance",
  "natural-high",
] as const;

export type FreeModeId = (typeof FREE_MODE_IDS)[number];
export type PremiumModeId = (typeof PREMIUM_MODE_IDS)[number];

export function isPremiumMode(modeId: string): boolean {
  return (PREMIUM_MODE_IDS as readonly string[]).includes(modeId);
}

export function isFreeMode(modeId: string): boolean {
  return (FREE_MODE_IDS as readonly string[]).includes(modeId);
}
