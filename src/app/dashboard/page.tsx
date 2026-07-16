import Link from "next/link";
import { eq } from "drizzle-orm";

import { auth } from "@/auth";
import { AppShell } from "@/components/app-shell";
import { db } from "@/db";
import { protocols, subscriptions, users } from "@/db/schema";
import { hasFullAccess, isPremiumMode } from "@/lib/access";

const CATEGORY_LABEL: Record<string, string> = {
  calm: "Active ritual",
  sleep: "Recovery",
  energy: "Vitality",
  performance: "Flow state",
  "natural-high": "Expansion",
};

const GOAL_LABEL: Record<string, string> = {
  calm: "I need to stop spiraling right now",
  sleep: "It's late and my brain won't shut off",
  energy: "Morning energy without another coffee",
  performance: "I freeze up when it matters most",
  "natural-high": "Show me what this body can do",
};

export default async function DashboardPage() {
  const session = await auth();
  const email = session?.user?.email;

  let isActive = false;
  if (email) {
    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (user) {
      const [sub] = await db
        .select({ status: subscriptions.status })
        .from(subscriptions)
        .where(eq(subscriptions.userId, user.id))
        .limit(1);
      isActive = hasFullAccess(email, sub?.status === "active");
    } else {
      isActive = hasFullAccess(email, false);
    }
  }

  const rows = await db.select().from(protocols);
  const order = ["calm", "sleep", "energy", "performance", "natural-high"];
  const sorted = rows.sort(
    (a, b) => order.indexOf(a.id) - order.indexOf(b.id),
  );

  return (
    <AppShell>
      <section className="px-5 sm:px-6 md:px-10 pt-8 sm:pt-10 md:pt-16 pb-16 sm:pb-20 max-w-5xl w-full mx-auto">
        <header className="mb-12 md:mb-16">
          <h1 className="font-display font-semibold text-[36px] sm:text-[44px] md:text-[64px] text-text leading-[1.05] tracking-[-0.04em]">
            Choose your practice.
          </h1>
          <p className="mt-4 text-[17px] text-text-muted max-w-md leading-relaxed">
            Two modes free to start. Energy, Performance, and Natural High unlock with Full Aramzor.
          </p>
        </header>

        <div className="flex flex-col gap-3">
          {sorted.map((p) => {
            const premium = isPremiumMode(p.id);
            const locked = premium && !isActive;
            const href = locked ? "/subscribe" : `/session/${p.id}`;

            return (
              <Link
                key={p.id}
                href={href}
                className="group relative rounded-2xl bg-surface-low hover:bg-surface px-5 sm:px-6 md:px-8 py-6 sm:py-7 md:py-8 active:bg-surface transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[12px] font-medium text-text-dim tracking-[0.06em] uppercase">
                        {CATEGORY_LABEL[p.id]}
                      </span>
                      {premium && (
                        <span className="text-[11px] font-medium text-accent">
                          {locked ? "Full access" : "Included"}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display font-semibold text-[28px] sm:text-[32px] md:text-[40px] text-text tracking-[-0.035em] leading-none">
                      {p.name}
                    </h2>
                    <p className="mt-3 text-[15px] text-text-muted leading-relaxed max-w-xl">
                      {GOAL_LABEL[p.id]}
                    </p>
                    {p.description && (
                      <p className="mt-2 text-[14px] text-text-dim leading-relaxed max-w-xl">
                        {p.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 shrink-0 md:flex-col md:items-end md:gap-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display font-semibold text-[28px] text-text tracking-[-0.03em]">
                        {p.durationMin}
                      </span>
                      <span className="text-[13px] text-text-dim font-medium">min</span>
                    </div>
                    <span className="text-[14px] font-medium text-accent group-hover:text-accent-hover transition-colors">
                      {locked ? "Unlock" : "Begin"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <footer className="mt-16 md:mt-24">
          <p className="text-[17px] text-text-dim max-w-lg leading-relaxed">
            The breath is the only part of the autonomic nervous system that we can control. By changing the breath, we change the mind.
          </p>
        </footer>
      </section>
    </AppShell>
  );
}
