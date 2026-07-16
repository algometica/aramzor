import { Wordmark } from "@/components/wordmark";

import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="min-h-dvh flex flex-col bg-bg pt-safe pb-safe">
      <header className="px-5 sm:px-8 py-6 sm:py-8 flex justify-center">
        <Wordmark size="md" />
      </header>

      <main className="flex-1 flex items-center justify-center px-5 sm:px-8">
        <div className="w-full max-w-md">
          <h1 className="font-display font-semibold text-[40px] sm:text-[48px] md:text-[56px] text-text mb-3 tracking-[-0.04em]">
            Enter.
          </h1>
          <p className="text-text-muted mb-8 sm:mb-10 text-[16px] sm:text-[17px] leading-relaxed">
            Your email. We send a link. No password.
          </p>

          <form action={login} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="text-[13px] font-medium text-text-muted block mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                className="w-full rounded-xl bg-surface-low text-text px-4 py-3.5 min-h-12 text-[16px] focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/40 transition-colors placeholder:text-text-dim"
              />
            </div>
            {callbackUrl ? (
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
            ) : null}
            <button
              type="submit"
              className="w-full rounded-full bg-text text-bg hover:opacity-90 active:opacity-80 text-[15px] font-medium py-3.5 min-h-12 transition-opacity"
            >
              Send link
            </button>
          </form>
        </div>
      </main>

      <footer className="px-5 sm:px-8 py-6 sm:py-8 text-center">
        <p className="text-[12px] font-medium text-text-dim">
          The Ancient Modernist
        </p>
      </footer>
    </div>
  );
}
