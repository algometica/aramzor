import Link from "next/link";

import { signOut } from "@/auth";

import { Wordmark } from "./wordmark";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 px-6 md:px-10 py-6 flex justify-between items-center bg-gradient-to-b from-bg to-transparent">
        <Wordmark size="md" />
        <nav className="flex items-center gap-6 md:gap-8">
          <Link
            href="/profile"
            className="caps-tight text-[11px] text-text-muted hover:text-ember transition-colors"
          >
            Archive
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="caps-tight text-[11px] text-text-muted hover:text-ember transition-colors"
            >
              Sign Out
            </button>
          </form>
        </nav>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
