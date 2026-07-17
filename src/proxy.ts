import { count, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/db";
import { breathSessions, subscriptions, users } from "@/db/schema";
import {
  FREE_SESSION_LIMIT,
  hasFullAccess,
  isPremiumMode,
} from "@/lib/access";

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

  // Test / admin account: no session cap, every mode unlocked.
  if (hasFullAccess(email, false)) {
    return NextResponse.next();
  }

  const pathname = req.nextUrl.pathname;
  const sessionMatch = pathname.match(/^\/session\/([^/]+)/);
  const modeId = sessionMatch?.[1];

  // Dashboard, account, and session-complete stay available after the free trial.
  // Only starting a new breath session is paywalled.
  if (!modeId || modeId === "complete") {
    return NextResponse.next();
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
    const fullAccess = hasFullAccess(email, isActive);

    if (isPremiumMode(modeId) && !fullAccess) {
      return NextResponse.redirect(new URL("/subscribe", req.url));
    }

    if (sessionsUsed >= FREE_SESSION_LIMIT && !fullAccess) {
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
