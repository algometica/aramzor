import Link from "next/link";

import { signOut } from "@/auth";

import { Wordmark } from "./wordmark";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-bg">
      <header className="sticky top-0 z-50 px-5 sm:px-6 md:px-10 pt-safe bg-bg/80 backdrop-blur-xl">
        <div className="py-4 flex justify-between items-center">
          <Wordmark size="md" />
          <nav className="flex items-center gap-5 sm:gap-7 md:gap-8">
            <Link
              href="/profile"
              className="text-[13px] font-medium text-text-muted hover:text-text transition-colors min-h-11 inline-flex items-center"
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
                className="text-[13px] font-medium text-text-muted hover:text-text transition-colors min-h-11 inline-flex items-center"
              >
                Sign Out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col pb-safe">{children}</main>
    </div>
  );
}
