import { count, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/db";
import { breathSessions, subscriptions, users } from "@/db/schema";
import { isPremiumMode } from "@/lib/access";

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

  try {
    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const [[sessionCount], [subRow]] = await Promise.all([
      db
        .select({ value: count() })
        .from(breathSessions)
        .where(eq(breathSessions.userId, user.id)),
      db
        .select({ status: subscriptions.status })
        .from(subscriptions)
        .where(eq(subscriptions.userId, user.id))
        .limit(1),
    ]);

    const sessionsUsed = sessionCount?.value ?? 0;
    const isActive = subRow?.status === "active";

    const pathname = req.nextUrl.pathname;
    const sessionMatch = pathname.match(/^\/session\/([^/]+)/);
    const modeId = sessionMatch?.[1];

    // Premium modes (Natural High + Performance + Energy) always require subscription.
    if (modeId && modeId !== "complete" && isPremiumMode(modeId) && !isActive) {
      return NextResponse.redirect(new URL("/subscribe", req.url));
    }

    if (sessionsUsed >= FREE_SESSION_LIMIT && !isActive) {
      return NextResponse.redirect(new URL("/subscribe", req.url));
    }
  } catch {
    // If DB is unreachable, let the page render - it will handle auth itself
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/session/:path*", "/profile"],
};
