"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { db } from "@/db";
import { subscriptions, users } from "@/db/schema";

export async function cancelSubscription() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect("/login");

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email));
  if (!user) redirect("/login");

  const [sub] = await db
    .select({ id: subscriptions.id, lsSubscriptionId: subscriptions.lsSubscriptionId })
    .from(subscriptions)
    .where(eq(subscriptions.userId, user.id));

  if (!sub?.lsSubscriptionId) return;

  await fetch(`https://api.lemonsqueezy.com/v1/subscriptions/${sub.lsSubscriptionId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      Accept: "application/vnd.api+json",
    },
  });

  await db
    .update(subscriptions)
    .set({ status: "cancelled", updatedAt: new Date() })
    .where(eq(subscriptions.id, sub.id));

  redirect("/profile");
}
