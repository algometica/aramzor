import Link from "next/link";

import { auth, signOut } from "@/auth";

import { Wordmark } from "./wordmark";

const linkMuted =
  "text-[13px] font-medium text-text-muted hover:text-text transition-colors min-h-11 inline-flex items-center";
const linkAccent =
  "text-[13px] font-medium text-accent hover:text-accent-hover transition-colors min-h-11 inline-flex items-center";

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/" });
}

export async function SiteHeader({
  variant = "marketing",
}: {
  variant?: "marketing" | "app";
}) {
  const session = await auth();
  const signedIn = Boolean(session?.user?.email);

  return (
    <header className="sticky top-0 z-50 px-5 sm:px-6 md:px-10 pt-safe bg-bg/75 backdrop-blur-xl">
      <div className="py-4 w-full flex justify-between items-center gap-4">
        <Wordmark size="md" href={signedIn ? "/dashboard" : "/"} />
        <nav className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {variant === "marketing" ? (
            <>
              <Link
                href="/science"
                className={`${linkMuted} hidden md:inline-flex`}
              >
                Science
              </Link>
              <Link
                href="/about"
                className={`${linkMuted} hidden md:inline-flex`}
              >
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
              <form action={signOutAction}>
                <button type="submit" className={linkMuted}>
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className={linkAccent}>
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
