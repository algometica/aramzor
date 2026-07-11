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
      <section className="flex-1 flex flex-col justify-center px-6 md:px-24 py-24 max-w-4xl mx-auto w-full">
        <div className="space-y-14">
          <h1 className="font-display italic font-bold text-5xl md:text-7xl text-text tracking-tight leading-[0.92]">
            You just did
            <br />
            your Aramzor.
          </h1>

          <div className="flex flex-col gap-2">
            <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em]">
              Session count
            </p>
            <p className="font-display italic font-bold text-4xl md:text-5xl text-ember">
              {sessionCount} {sessionCount === 1 ? "Aramzor" : "Aramzors"}.
            </p>
            <p className="text-text-muted font-light text-base mt-1">
              Notice the difference.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-block bg-ember hover:bg-ember-hover text-text caps-tight text-sm font-semibold px-12 py-4 transition-colors duration-300"
          >
            Return
          </Link>

          <p className="font-display italic text-xl text-text-dim pt-4">
            &ldquo;Patience is the anchor of the soul.&rdquo;
          </p>
        </div>
      </section>
    </AppShell>
  );
}
