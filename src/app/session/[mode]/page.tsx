import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { SessionPlayer } from "@/components/session-player";
import { db } from "@/db";
import { subscriptions, users } from "@/db/schema";
import { isPremiumMode } from "@/lib/access";
import { PROTOCOL_BEATS, protocolDurationSec } from "@/lib/protocol";

export default async function SessionPage({
  params,
}: {
  params: Promise<{ mode: string }>;
}) {
  const { mode } = await params;
  const beats = PROTOCOL_BEATS[mode];
  if (!beats) notFound();

  if (isPremiumMode(mode)) {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) redirect("/login");

    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) redirect("/login");

    const [sub] = await db
      .select({ status: subscriptions.status })
      .from(subscriptions)
      .where(eq(subscriptions.userId, user.id))
      .limit(1);

    if (sub?.status !== "active") {
      redirect("/subscribe");
    }
  }

  return (
    <SessionPlayer
      modeId={mode}
      beats={beats}
      totalDurationSec={protocolDurationSec(mode)}
    />
  );
}
