/** Modes available during the free trial (3 sessions). */
export const FREE_MODE_IDS = ["calm", "sleep"] as const;

/** Free sessions before the subscribe gate. */
export const FREE_SESSION_LIMIT = 3;

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

/**
 * Env-gated test / admin account.
 * Set DEV_ADMIN_EMAIL (+ DEV_ADMIN_PASSWORD for password login).
 * That email skips session limits and unlocks every mode.
 */
export function isUnlimitedAccess(email: string | null | undefined): boolean {
  const admin = process.env.DEV_ADMIN_EMAIL?.trim().toLowerCase();
  if (!admin || !email) return false;
  return email.trim().toLowerCase() === admin;
}

export function hasFullAccess(
  email: string | null | undefined,
  subscriptionActive: boolean,
): boolean {
  return subscriptionActive || isUnlimitedAccess(email);
}
