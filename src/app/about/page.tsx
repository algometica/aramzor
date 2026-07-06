import Link from "next/link";

import { Wordmark } from "@/components/wordmark";

export const metadata = {
  title: "About Aramzor",
  description:
    "Aramzor is a breathwork app with a dark edge. One proprietary method. Five modes. $8/month.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-deep">
      <header className="sticky top-0 z-50 px-6 md:px-10 py-6 flex justify-between items-center bg-gradient-to-b from-bg-deep to-transparent">
        <Wordmark size="md" />
        <nav className="flex gap-6 md:gap-12">
          <Link
            href="/science"
            className="caps-tight text-[11px] text-text-muted hover:text-ember transition-colors"
          >
            Science
          </Link>
          <Link
            href="/login"
            className="caps-tight text-[11px] text-ember hover:text-ember-hover transition-colors"
          >
            Sign In
          </Link>
        </nav>
      </header>

      <main className="flex-1 px-6 md:px-24 py-24 md:py-32 max-w-4xl mx-auto w-full">
        <h1 className="font-display italic text-5xl md:text-7xl font-light leading-[0.95] tracking-tight mb-16">
          The Ancient
          <br />
          Modernist.
        </h1>

        <div className="space-y-12 text-lg md:text-xl text-text-muted leading-relaxed font-light">
          <p>
            Aramzor is a breathwork app with a <span className="text-text font-semibold">dark edge</span>. The name comes from two ancient Indian words: <span className="text-text font-semibold">Aram</span> (peace, rest) and <span className="text-text font-semibold">Zor</span> (force, power). Words rooted in Sanskrit and Persian traditions of India for centuries. The name is the protocol: <span className="font-semibold">Zor goes in. Aram comes out.</span>
          </p>
          <p>
            The method has four beats. <span className="text-text font-semibold">Ignite</span> the nervous system with controlled activation. <span className="text-text font-semibold">Dissolve</span> into the void of breath retention. <span className="text-text font-semibold">Return</span> with a rescue breath that produces genuine euphoria. <span className="text-text font-semibold">Land</span> in deep parasympathetic calm.
          </p>
          <p>
            It draws from <span className="text-text font-semibold">Tibetan Tummo, Kundalini pranayama, Stanford HRV research,</span> and the <span className="text-text font-semibold">bhramari tradition</span>. These traditions have been combined, not owned.
          </p>
          <p>
            It costs <span className="text-text font-semibold">$8/month</span> - the <span className="text-text font-semibold">cheapest serious breathwork</span> app on the market. It is not Calm. It is not Headspace. It doesn&apos;t apologize for the intensity.
          </p>
          <p className="font-display italic text-2xl md:text-3xl text-ember pt-4">
            Force in. Peace out.
          </p>
        </div>

        <div className="mt-20">
          <Link
            href="/login"
            className="inline-block border border-ember/40 hover:border-ember hover:bg-surface px-12 py-6 caps-wide text-xs md:text-sm transition-all duration-700 rounded-sm"
          >
            Begin Practice
          </Link>
        </div>
      </main>

      <footer className="bg-bg-deep w-full py-12 px-6 flex flex-col items-center gap-4 border-t border-text-dim/10">
        <p className="font-display italic text-base text-ember">ARAMZOR</p>
        <p className="caps-wide text-[10px] text-text-dim">
          Aramzor. The Ancient Modernist.
        </p>
      </footer>
    </div>
  );
}
