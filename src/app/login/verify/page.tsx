import { Wordmark } from "@/components/wordmark";

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-8 py-10 flex justify-center">
        <Wordmark size="md" />
      </header>

      <main className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-md text-center">
          <h1 className="font-display italic font-bold text-5xl md:text-6xl text-text mb-6 tracking-tight">
            Check your email.
          </h1>
          <p className="text-text-muted text-base leading-relaxed font-light">
            A link has been sent. Click it to enter.
          </p>
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
