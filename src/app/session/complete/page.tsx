import Link from "next/link";
import { eq } from "drizzle-orm";

import { auth } from "@/auth";
import { AppShell } from "@/components/app-shell";
import { db } from "@/db";
import { breathSessions, users } from "@/db/schema";

export default async function SessionCompletePage() {
  const session = await auth();
  const email = session?.user?.email;

  let count = 0;
  if (email) {
    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email));
    if (user) {
      const rows = await db
        .select()
        .from(breathSessions)
        .where(eq(breathSessions.userId, user.id));
      count = rows.length;
    }
  }

  return (
    <AppShell>
      <section className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-24 text-center">
        <div className="max-w-3xl w-full space-y-16">
          <div className="space-y-8">
            <div className="w-px h-32 bg-gradient-to-b from-transparent via-text-dim to-transparent mx-auto" />
            <h1 className="font-display italic text-5xl md:text-7xl font-light text-text tracking-tight leading-tight">
              You just did
              <br />
              your Aramzor.
            </h1>
            <p className="font-display text-lg md:text-xl text-text-muted leading-relaxed max-w-xl mx-auto">
              The ritual is etched into the archive. Your breath has returned
              to the root, leaving only the record of your presence.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-px bg-text-dim" />
            <p className="caps-wide text-[11px] text-text-muted">
              Session count
            </p>
            <p className="font-display italic text-3xl md:text-4xl text-ember">
              {count} {count === 1 ? "Aramzor" : "Aramzors"}.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="/dashboard"
              className="inline-block bg-ember hover:bg-ember-hover text-text caps-tight text-sm font-semibold px-12 py-4 transition-colors rounded-sm"
            >
              Return
            </Link>
          </div>

          <p className="font-display italic text-lg text-text-dim pt-12">
            &ldquo;Patience is the anchor of the soul.&rdquo;
          </p>
        </div>
      </section>
    </AppShell>
  );
}
