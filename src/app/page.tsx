import Link from "next/link";

import { Wordmark } from "@/components/wordmark";

export const dynamic = "force-static";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-deep">
      <header className="sticky top-0 z-50 px-6 md:px-10 py-6 flex justify-between items-center bg-gradient-to-b from-bg-deep to-transparent backdrop-blur-sm">
        <Wordmark size="md" />
        <nav className="hidden md:flex gap-12">
          <Link
            href="/science"
            className="caps-tight text-[11px] text-text-muted hover:text-ember transition-colors"
          >
            Science
          </Link>
          <Link
            href="/about"
            className="caps-tight text-[11px] text-text-muted hover:text-ember transition-colors"
          >
            About
          </Link>
          <Link
            href="/login"
            className="caps-tight text-[11px] text-ember hover:text-ember-hover transition-colors"
          >
            Sign In
          </Link>
        </nav>
        <Link href="/login" className="md:hidden caps-tight text-[11px] text-ember">
          Sign In
        </Link>
      </header>

      <main>
        {/* Hero */}
        <section className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center items-start px-6 md:px-24 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute -top-60 -left-60 w-[900px] h-[900px] bg-ember rounded-full blur-[280px] opacity-[0.08]" />
          </div>
          <div className="relative z-10 max-w-5xl">
            <h1 className="font-display italic text-7xl md:text-[10rem] font-bold leading-[0.92] tracking-tight mb-8 text-text">
              Force in.
              <br />
              Peace out.
            </h1>
            <p className="font-label text-sm md:text-base text-text-muted max-w-lg mb-12 leading-loose tracking-widest uppercase">
              The breathwork that earns your calm.
            </p>
            <Link
              href="/login"
              className="inline-block border border-ember text-ember hover:bg-ember hover:text-text px-10 md:px-12 py-5 md:py-6 caps-wide text-xs md:text-sm transition-all duration-500"
            >
              Earn your calm
            </Link>
          </div>
          <div className="absolute bottom-0 right-0 w-1/3 h-px bg-ember/15" />
        </section>

        {/* Three beats */}
        <section className="py-24 md:py-32 px-6 md:px-24 bg-bg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 max-w-7xl mx-auto">
            <div className="md:col-span-4 flex flex-col gap-6 md:pt-12">
              <span className="font-display italic text-4xl text-ember/40 font-bold">01</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-text leading-tight">
                The Zor
              </h2>
              <p className="text-text-muted leading-relaxed text-base font-light">
                <span className="text-text font-medium">Force is required.</span> The Zor represents the rigorous physical activation of the nervous system. We do not whisper to your stress; we <span className="text-text font-medium">command it to exit</span> through structural respiratory mechanics.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-6 md:mt-24">
              <span className="font-display italic text-4xl text-ember/40 font-bold">02</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-text leading-tight">
                The Threshold
              </h2>
              <p className="text-text-muted leading-relaxed text-base font-light">
                <span className="text-text font-medium">Where modern biology meets ancient stillness.</span> The precise moment of carbon dioxide tolerance expansion, where the mind learns to <span className="text-text font-medium">remain unshakeable</span> under physical pressure.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-6 md:pt-32">
              <span className="font-display italic text-4xl text-ember/40 font-bold">03</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-text leading-tight">
                The Aram
              </h2>
              <p className="text-text-muted leading-relaxed text-base font-light">
                <span className="text-text font-medium">Peace is not found; it is synthesized.</span> The Aram provides the deep, resinous resonance of a nervous system that has been <span className="text-text font-medium">recalibrated for true depth.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Method statement */}
        <section className="py-48 md:py-64 px-6 md:px-24 bg-bg-deep">
          <div className="max-w-4xl mx-auto flex flex-col gap-12">
            <p className="font-display italic font-bold text-5xl md:text-8xl text-text leading-[0.9]">
              One method.
              <br />
              <span className="text-text-muted font-light">No substitutes.</span>
            </p>
            <p className="text-text-muted font-light text-lg md:text-xl max-w-lg leading-relaxed">
              Aram means rest. Zor means force.
              The name is the protocol.
              You already know what to do.
            </p>
            <p className="caps-wide text-[11px] text-text-dim tracking-[0.4em]">
              $8 / month - Three sessions free
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 md:py-40 px-6 md:px-24 bg-bg">
          <div className="max-w-4xl mx-auto flex flex-col gap-10">
            <h3 className="font-display font-bold text-5xl md:text-7xl text-text leading-[0.92]">
              Breath is the only tool
              <br />
              <span className="italic font-light text-text-muted">you cannot leave at home.</span>
            </h3>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Link
                href="/login"
                className="inline-block bg-ember hover:bg-ember-hover text-text px-12 py-5 caps-wide text-xs md:text-sm transition-all duration-300"
              >
                Practice Now
              </Link>
              <p className="text-text-muted font-light text-sm self-center">
                <span className="text-text font-medium">Three free sessions.</span> <span className="text-text">$8/month</span> after. No card required.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-bg-deep w-full py-16 px-6 flex flex-col items-center justify-center space-y-6 border-t border-text-dim/8">
        <p className="font-display italic text-lg text-ember">ARAMZOR</p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <Link href="/about" className="caps-tight text-[11px] text-text-muted hover:text-ember transition-colors">
            About
          </Link>
          <Link href="/science" className="caps-tight text-[11px] text-text-muted hover:text-ember transition-colors">
            Science
          </Link>
          <Link href="/login" className="caps-tight text-[11px] text-text-muted hover:text-ember transition-colors">
            Sign In
          </Link>
        </div>
        <p className="caps-wide text-[10px] text-text-dim">
          Aramzor. The Ancient Modernist.
        </p>
        <p className="max-w-md text-center text-[10px] text-text-dim caps-wide leading-loose px-4">
          Disclaimer: Aramzor is a performance breathwork utility. Consult a
          physician before engaging in high-intensity CO2 tolerance training.
        </p>
      </footer>
    </div>
  );
}
