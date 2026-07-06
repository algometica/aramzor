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

  const userRows = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  const user = userRows[0];
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const [sessionCount] = await db
    .select({ value: count() })
    .from(breathSessions)
    .where(eq(breathSessions.userId, user.id));

  const sessionsUsed = sessionCount?.value ?? 0;

  if (sessionsUsed < FREE_SESSION_LIMIT) {
    return NextResponse.next();
  }

  const subRows = await db
    .select({ status: subscriptions.status })
    .from(subscriptions)
    .where(eq(subscriptions.userId, user.id))
    .limit(1);

  const isActive = subRows[0]?.status === "active";

  if (!isActive) {
    return NextResponse.redirect(new URL("/subscribe", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/session/:path*", "/profile"],
};
