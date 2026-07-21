import type { Metadata } from "next";
import Link from "next/link";
import { count, eq } from "drizzle-orm";

import { auth } from "@/auth";
import { AppShell } from "@/components/app-shell";
import { db } from "@/db";
import { breathSessions, protocols, subscriptions, users } from "@/db/schema";
import {
  FREE_SESSION_LIMIT,
  hasFullAccess,
  isPremiumMode,
} from "@/lib/access";
import { protocolDurationSec, protocolName } from "@/lib/protocol";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

const GOAL_LABEL: Record<string, string> = {
  calm: "Stop the spiral",
  sleep: "Quiet a racing mind",
  energy: "Wake up without caffeine",
  performance: "Stay steady when performance anxiety hits",
  "natural-high": "Reach an altered state",
};

export default async function DashboardPage() {
  const session = await auth();
  const email = session?.user?.email;

  let isActive = false;
  let sessionsUsed = 0;

  if (email) {
    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user) {
      const [[sub], [sessionCount]] = await Promise.all([
        db
          .select({ status: subscriptions.status })
          .from(subscriptions)
          .where(eq(subscriptions.userId, user.id))
          .limit(1),
        db
          .select({ value: count() })
          .from(breathSessions)
          .where(eq(breathSessions.userId, user.id)),
      ]);
      isActive = hasFullAccess(email, sub?.status === "active");
      sessionsUsed = sessionCount?.value ?? 0;
    } else {
      isActive = hasFullAccess(email, false);
    }
  }

  const trialExhausted = !isActive && sessionsUsed >= FREE_SESSION_LIMIT;
  const sessionsLeft = Math.max(FREE_SESSION_LIMIT - sessionsUsed, 0);

  const rows = await db.select().from(protocols);
  const order = ["calm", "sleep", "energy", "performance", "natural-high"];
  const sorted = rows.sort(
    (a, b) => order.indexOf(a.id) - order.indexOf(b.id),
  );

  return (
    <AppShell>
      <section className="w-full max-w-lg mx-auto px-5 sm:px-6 pt-8 sm:pt-10 pb-16">
        <header className="mb-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-text-dim">
            Practice
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            What do you need?
          </h1>
          <p className="mt-3 max-w-sm text-base leading-relaxed text-text-muted sm:text-[17px]">
            {trialExhausted
              ? "Your free sessions are done. Unlock the full method to continue."
              : isActive
                ? "All five modes are open. Pick a state and begin."
                : "Calm and Sleep are free to start. Three sessions. No card."}
          </p>
          {!isActive && !trialExhausted ? (
            <p className="mt-4 text-sm font-medium text-text-dim">
              {sessionsLeft} free{" "}
              {sessionsLeft === 1 ? "session" : "sessions"} left
            </p>
          ) : null}
        </header>

        {trialExhausted ? (
          <div
            className="mb-10 rounded-lg p-6"
            style={{
              background:
                "linear-gradient(155deg, #145c28 0%, #0d3a1a 48%, #082410 100%)",
              border: "1px solid rgba(57, 255, 20, 0.45)",
              boxShadow: "0 0 28px rgba(57, 255, 20, 0.12)",
            }}
          >
            <p
              className="text-xs font-medium uppercase tracking-[0.12em]"
              style={{ color: "#39FF14" }}
            >
              Full access
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-text">
              Full Aramzor
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-text-muted">
              Unlimited sessions. All five modes. Cancel anytime.
            </p>
            <div className="mt-6 flex flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/subscribe"
                className="inline-flex h-11 w-fit items-center justify-center rounded-full bg-text px-6 text-[14px] font-medium leading-none tracking-normal text-bg transition-opacity hover:opacity-90"
              >
                Subscribe
              </Link>
              <p className="text-[13px] font-medium text-text-dim">$8/month</p>
            </div>
          </div>
        ) : null}

        <ul className="m-0 list-none space-y-3 p-0">
          {sorted.map((p) => {
            const premium = isPremiumMode(p.id);
            const locked = !isActive && (premium || trialExhausted);
            const isNaturalHigh = p.id === "natural-high";
            const href = locked ? "/subscribe" : `/session/${p.id}`;
            const durationMin = Math.max(
              1,
              Math.round(protocolDurationSec(p.id) / 60),
            );
            const name = protocolName(p.id);

            return (
              <li key={p.id}>
                <Link
                  href={href}
                  aria-label={
                    locked
                      ? `Unlock ${name}, ${durationMin} minutes`
                      : `Begin ${name}, ${durationMin} minutes`
                  }
                  className={`flex items-center justify-between gap-4 rounded-lg px-5 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:px-6 sm:py-6 ${
                    isNaturalHigh
                      ? "transition-opacity hover:opacity-95"
                      : "bg-surface-low transition-colors hover:bg-surface"
                  }`}
                  style={
                    isNaturalHigh
                      ? {
                          background:
                            "linear-gradient(155deg, #1f4a40 0%, #16352e 45%, #0f2420 100%)",
                          border: "1px solid rgba(125, 207, 182, 0.45)",
                          boxShadow: "0 12px 32px rgba(20, 60, 50, 0.35)",
                        }
                      : undefined
                  }
                >
                  <div className="min-w-0">
                    {isNaturalHigh ? (
                      <p
                        className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em]"
                        style={{ color: "var(--color-accent-mint)" }}
                      >
                        Signature
                      </p>
                    ) : null}
                    <h2 className="font-display text-[22px] font-semibold tracking-tight text-text sm:text-2xl">
                      {name}
                    </h2>
                    <p className="mt-1.5 text-[15px] leading-snug text-text-muted">
                      {GOAL_LABEL[p.id]}
                    </p>
                    <p className="mt-3 text-sm font-medium text-text-dim">
                      {durationMin} min
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-sm font-medium ${
                      isNaturalHigh ? "" : "text-accent"
                    }`}
                    style={isNaturalHigh ? { color: "#9ee0cb" } : undefined}
                  >
                    {locked ? "Unlock" : "Begin"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <footer className="mt-14 border-t border-white/10 pt-8">
          <p className="max-w-sm text-sm leading-relaxed text-text-dim">
            Change the breath, and the nervous system follows.
          </p>
        </footer>
      </section>
    </AppShell>
  );
}
