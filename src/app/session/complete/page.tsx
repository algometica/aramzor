import Link from "next/link";
import { count, eq } from "drizzle-orm";

import { auth } from "@/auth";
import { AppShell } from "@/components/app-shell";
import { db } from "@/db";
import { breathSessions, users } from "@/db/schema";

export default async function SessionCompletePage() {
  const session = await auth();
  const email = session?.user?.email;

  let sessionCount = 0;
  if (email) {
    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (user) {
      const [row] = await db
        .select({ value: count() })
        .from(breathSessions)
        .where(eq(breathSessions.userId, user.id));
      sessionCount = row?.value ?? 0;
    }
  }

  return (
    <AppShell>
      <section className="flex-1 flex flex-col justify-center px-6 md:px-24 py-24 max-w-3xl mx-auto w-full">
        <div className="space-y-10">
          <h1 className="font-display font-semibold text-[48px] md:text-[64px] text-text tracking-[-0.04em] leading-[1.02]">
            You just did your Aramzor.
          </h1>

          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-medium text-text-dim">
              Session count
            </p>
            <p className="font-display font-semibold text-[40px] md:text-[48px] text-text tracking-[-0.035em]">
              {sessionCount} {sessionCount === 1 ? "Aramzor" : "Aramzors"}.
            </p>
            <p className="text-text-muted text-[17px] mt-1">
              Notice the difference.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex rounded-full bg-text text-bg hover:opacity-90 text-[15px] font-medium px-8 py-3.5 transition-opacity"
          >
            Return
          </Link>

          <p className="text-[17px] text-text-dim pt-2">
            Patience is the anchor of the soul.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
