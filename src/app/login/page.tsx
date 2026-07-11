import { Wordmark } from "@/components/wordmark";

import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-8 py-10 flex justify-center">
        <Wordmark size="md" />
      </header>

      <main className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <h1 className="font-display italic font-bold text-5xl md:text-6xl text-text mb-4 tracking-tight">
            Enter.
          </h1>
          <p className="text-text-muted mb-12 text-base leading-relaxed font-light">
            Your email. We send a link. No password.
          </p>

          <form action={login} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="caps-tight text-[10px] text-text-muted block mb-3"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full bg-surface-high text-text px-4 py-4 focus:bg-surface-highest focus:outline-none transition-colors placeholder:text-text-dim"
              />
            </div>
            {callbackUrl ? (
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
            ) : null}
            <button
              type="submit"
              className="w-full bg-ember hover:bg-ember-hover text-text caps-tight text-sm font-semibold py-4 transition-colors duration-300"
            >
              Send Link
            </button>
          </form>
        </div>
      </main>

      <footer className="px-8 py-8 text-center">
        <p className="caps-wide text-xs text-text-dim">
          The Ancient Modernist
        </p>
      </footer>
    </div>
  );
}
