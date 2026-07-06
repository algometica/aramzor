"use server";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { db } from "@/db";
import { breathSessions, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function logCompletedSession(modeId: string, durationSec: number) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    redirect("/login");
  }

  const [userRow] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email));

  if (!userRow) {
    redirect("/login");
  }

  await db.insert(breathSessions).values({
    userId: userRow.id,
    protocolId: modeId,
    durationSec,
  });

  redirect("/session/complete");
}
