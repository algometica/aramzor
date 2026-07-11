import { count, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/db";
import { breathSessions, subscriptions, users } from "@/db/schema";

const FREE_SESSION_LIMIT = 3;

export default auth(async (req) => {
  if (!req.auth) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const email = req.auth.user?.email;
  if (!email) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Fetch session count and subscription status in parallel - one round trip each, simultaneous
  const [[sessionCount], [subRow]] = await Promise.all([
    db.select({ value: count() }).from(breathSessions).where(eq(breathSessions.userId, user.id)),
    db.select({ status: subscriptions.status }).from(subscriptions).where(eq(subscriptions.userId, user.id)).limit(1),
  ]);

  const sessionsUsed = sessionCount?.value ?? 0;
  const isActive = subRow?.status === "active";

  if (sessionsUsed >= FREE_SESSION_LIMIT && !isActive) {
    return NextResponse.redirect(new URL("/subscribe", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/session/:path*", "/profile"],
};
