import crypto from "crypto";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { subscriptions, users } from "@/db/schema";

type LSSubscriptionEvent = {
  meta: {
    event_name: string;
    custom_data?: { user_email?: string };
  };
  data: {
    id: string;
    attributes: {
      status: string;
      variant_name: string;
      renews_at: string | null;
      ends_at: string | null;
      user_email: string;
    };
  };
};

function verifySignature(body: string, signature: string): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) return false;
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(body).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-signature") ?? "";

  if (!verifySignature(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: LSSubscriptionEvent;
  try {
    payload = JSON.parse(body) as LSSubscriptionEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { event_name } = payload.meta;
  const { id: lsSubId, attributes } = payload.data;
  const email = attributes.user_email;

  if (!event_name.startsWith("subscription_")) {
    return NextResponse.json({ received: true });
  }

  const userRows = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  const user = userRows[0];
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const periodEnd = attributes.renews_at ?? attributes.ends_at;

  const existing = await db
    .select({ id: subscriptions.id })
    .from(subscriptions)
    .where(eq(subscriptions.lsSubscriptionId, lsSubId))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(subscriptions)
      .set({
        status: attributes.status,
        plan: attributes.variant_name,
        currentPeriodEnd: periodEnd ? new Date(periodEnd) : null,
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.lsSubscriptionId, lsSubId));
  } else {
    await db.insert(subscriptions).values({
      userId: user.id,
      lsSubscriptionId: lsSubId,
      status: attributes.status,
      plan: attributes.variant_name,
      currentPeriodEnd: periodEnd ? new Date(periodEnd) : null,
    });
  }

  return NextResponse.json({ received: true });
}
