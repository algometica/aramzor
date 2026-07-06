import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AppShell } from "@/components/app-shell";
import { db } from "@/db";
import { breathSessions, subscriptions, users } from "@/db/schema";

import { cancelSubscription } from "./actions";

export const metadata = { title: "Your Archive - Aramzor" };

const MODE_NAME: Record<string, string> = {
  calm: "Calm",
  sleep: "Sleep",
  energy: "Energy",
  performance: "Performance",
  "natural-high": "Natural High",
};

function fmtDate(d: Date | null | undefined): string {
  if (!d) return "-";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(d));
}

function fmtDuration(sec: number | null | undefined): string {
  if (!sec) return "-";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

export default async function ProfilePage() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect("/login");

  const [user] = await db
    .select({ id: users.id, email: users.email, createdAt: users.createdAt })
    .from(users)
    .where(eq(users.email, email));

  if (!user) redirect("/login");

  const allSessions = await db
    .select()
    .from(breathSessions)
    .where(eq(breathSessions.userId, user.id))
    .orderBy(desc(breathSessions.completedAt));

  const recentSessions = allSessions.slice(0, 8);
  const totalSessions = allSessions.length;

  const [sub] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, user.id));

  const isActive = sub?.status === "active";

  return (
    <AppShell>
      <section className="px-6 md:px-10 pt-12 md:pt-20 pb-24 max-w-3xl mx-auto w-full">

        <header className="mb-16 md:mb-20">
          <p className="caps-wide text-[9px] text-ember tracking-[0.38em] mb-4">Your Archive</p>
          <h1 className="font-display italic text-5xl md:text-6xl font-light text-text leading-none tracking-tight">
            {totalSessions} {totalSessions === 1 ? "Aramzor" : "Aramzors"}.
          </h1>
          <p className="text-text-muted text-sm mt-4 font-light">{user.email}</p>
          {user.createdAt && (
            <p className="caps-tight text-[10px] text-text-dim mt-1">
              Member since {fmtDate(user.createdAt)}
            </p>
          )}
        </header>

        {/* Subscription */}
        <div className="mb-16">
          <p className="caps-wide text-[9px] text-text-dim tracking-[0.32em] mb-6">Subscription</p>
          <div className="bg-surface-low p-6 md:p-8 rounded-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-1">
              {sub ? (
                <>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full ${isActive ? "bg-ember" : "bg-text-dim"}`}
                    />
                    <span className="caps-tight text-[11px] text-text">
                      {isActive ? "Active" : sub.status ?? "Inactive"}
                    </span>
                  </div>
                  {sub.plan && (
                    <p className="text-text-muted text-sm font-light pl-4">{sub.plan}</p>
                  )}
                  {sub.currentPeriodEnd && (
                    <p className="caps-tight text-[10px] text-text-dim pl-4">
                      {isActive ? "Renews" : "Ends"} {fmtDate(sub.currentPeriodEnd)}
                    </p>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-text-dim" />
                  <span className="caps-tight text-[11px] text-text-muted">No active subscription</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 items-start md:items-end">
              {!sub && (
                <Link
                  href="/subscribe"
                  className="caps-tight text-[11px] bg-ember hover:bg-ember-hover text-text px-6 py-3 transition-colors rounded-sm"
                >
                  Subscribe - $8/month
                </Link>
              )}
              {isActive && (
                <form action={cancelSubscription}>
                  <button
                    type="submit"
                    className="caps-tight text-[11px] text-text-muted hover:text-error transition-colors"
                  >
                    Cancel Subscription
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Session history */}
        <div>
          <p className="caps-wide text-[9px] text-text-dim tracking-[0.32em] mb-6">Recent Sessions</p>

          {recentSessions.length === 0 ? (
            <p className="text-text-muted text-sm font-light">
              No sessions yet.{" "}
              <Link href="/dashboard" className="text-ember hover:text-ember-hover transition-colors">
                Start your first Aramzor.
              </Link>
            </p>
          ) : (
            <div className="space-y-px">
              {recentSessions.map((s) => (
                <div
                  key={s.id}
                  className="flex items-baseline justify-between py-4 border-b border-text-dim/8 first:border-t"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display italic text-lg text-text">
                      {MODE_NAME[s.protocolId ?? ""] ?? s.protocolId}
                    </span>
                    <span className="caps-tight text-[10px] text-text-dim">
                      {fmtDuration(s.durationSec)}
                    </span>
                  </div>
                  <span className="caps-tight text-[10px] text-text-dim">
                    {fmtDate(s.completedAt)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {totalSessions > 8 && (
            <p className="caps-tight text-[10px] text-text-dim mt-4">
              Showing 8 of {totalSessions} sessions
            </p>
          )}
        </div>

      </section>
    </AppShell>
  );
}
