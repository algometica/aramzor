import Link from "next/link";

import { signOutAction } from "@/app/auth-actions";
import { auth } from "@/auth";

import { MobileNav } from "./mobile-nav";
import { Wordmark } from "./wordmark";

const linkMuted =
  "inline-flex min-h-11 items-center text-[13px] font-medium text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";
const linkAccent =
  "inline-flex min-h-11 items-center text-[13px] font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export async function SiteHeader({
  variant = "marketing",
}: {
  variant?: "marketing" | "app";
}) {
  const session = await auth();
  const signedIn = Boolean(session?.user?.email);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.04] bg-bg/80 px-4 pt-safe backdrop-blur-xl sm:px-6 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 py-3 sm:gap-4 sm:py-3.5">
        <Wordmark
          size="md"
          className="min-w-0"
          href={signedIn ? "/dashboard" : "/"}
        />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 sm:flex md:gap-8"
        >
          {variant === "marketing" ? (
            <>
              <Link href="/science" className={linkMuted}>
                Science
              </Link>
              <Link href="/about" className={linkMuted}>
                About
              </Link>
            </>
          ) : null}

          {signedIn ? (
            <>
              <Link href="/dashboard" className={linkMuted}>
                Dashboard
              </Link>
              <Link href="/profile" className={linkMuted}>
                Account
              </Link>
              <form action={signOutAction} className="inline-flex">
                <button type="submit" className={linkMuted}>
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className={linkAccent}>
              Sign In
            </Link>
          )}
        </nav>

        <MobileNav signedIn={signedIn} variant={variant} />
      </div>
    </header>
  );
}
