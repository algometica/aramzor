import Link from "next/link";

import { Wordmark } from "@/components/wordmark";

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
        <section className="relative min-h-[80vh] md:min-h-[88vh] flex flex-col justify-center items-start px-6 md:px-24 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-ember rounded-full blur-[180px] opacity-[0.07]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-ember-deep rounded-full blur-[160px] opacity-[0.08]" />
          </div>
          <div className="relative z-10 max-w-5xl">
            <h1 className="font-display italic text-6xl md:text-[9rem] font-light leading-[0.95] tracking-tight mb-8 text-text">
              Force in.
              <br />
              Peace out.
            </h1>
            <p className="font-display font-light text-xl md:text-3xl text-text-muted max-w-2xl mb-12 leading-relaxed">
              The breathwork that earns your calm.
            </p>
            <Link
              href="/login"
              className="inline-block border border-ember text-ember hover:bg-ember hover:text-text px-10 md:px-12 py-5 md:py-6 caps-wide text-xs md:text-sm transition-all duration-500 rounded-sm"
            >
              Begin your Aramzor - $8/month
            </Link>
          </div>
          <div className="absolute bottom-0 right-0 w-1/3 h-px bg-ember/20" />
        </section>

        {/* Social proof bar */}
        <section className="bg-surface-low py-12 flex justify-center items-center px-6 text-center">
          <p className="caps-wide text-[10px] md:text-xs text-text-muted">
            Used by people who are done with <span className="text-text font-semibold">meditation fluff</span>
          </p>
        </section>

        {/* Three beats */}
        <section className="py-24 md:py-32 px-6 md:px-24 bg-bg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 max-w-7xl mx-auto">
            <div className="md:col-span-4 flex flex-col gap-6 md:pt-12">
              <span className="font-display italic text-4xl text-ember/50">01</span>
              <h2 className="font-display italic text-4xl md:text-5xl font-light text-text">
                The Zor
              </h2>
              <p className="text-text-muted leading-relaxed text-lg font-light">
                <span className="text-text font-semibold">Force is required.</span> The Zor represents the rigorous physical activation of the nervous system. We do not whisper to your stress; we <span className="text-text font-semibold">command it to exit</span> through structural respiratory mechanics.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-6 md:mt-24">
              <span className="font-display italic text-4xl text-ember/50">02</span>
              <h2 className="font-display italic text-4xl md:text-5xl font-light text-text">
                The Threshold
              </h2>
              <p className="text-text-muted leading-relaxed text-lg font-light">
                <span className="text-text font-semibold">Where modern biology meets ancient stillness.</span> The Threshold is the precise moment of carbon dioxide tolerance expansion, where the mind learns to <span className="text-text font-semibold">remain unshakeable</span> under physical pressure.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-6 md:pt-32">
              <span className="font-display italic text-4xl text-ember/50">03</span>
              <h2 className="font-display italic text-4xl md:text-5xl font-light text-text">
                The Aram
              </h2>
              <p className="text-text-muted leading-relaxed text-lg font-light">
                The resolution. <span className="text-text font-semibold">Peace is not found; it is synthesized.</span> Following the intensity, The Aram provides the deep, resinous resonance of a nervous system that has been <span className="text-text font-semibold">recalibrated for true depth.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Price statement - replaces competitor table */}
        <section className="py-32 md:py-40 px-6 md:px-24 bg-bg-deep">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 md:gap-24 border-t border-text-dim/10 pt-16 md:pt-20">
              <div className="space-y-6">
                <p className="caps-wide text-[9px] text-ember/60 tracking-[0.38em]">
                  The Market of Noise
                </p>
                <h2 className="font-display italic text-6xl md:text-8xl font-light text-text leading-none">
                  $8.
                </h2>
                <p className="font-display text-xl md:text-2xl font-light text-text-muted max-w-sm leading-relaxed">
                  The cheapest serious breathwork on the market.
                </p>
              </div>
              <div className="space-y-6 max-w-sm">
                <p className="text-text-muted leading-relaxed font-light">
                  Most apps are selling you a <span className="text-text font-semibold">feeling.</span> We are selling you a <span className="text-text font-semibold">result.</span> One method. Five modes. No content library to scroll through. No ambient sounds to choose from. <span className="text-text font-semibold">Just the protocol.</span>
                </p>
                <p className="caps-wide text-[9px] text-text-dim tracking-[0.3em] leading-loose">
                  We are not a toy. <span className="text-text-muted font-semibold">We are a utility.</span> The cost reflects the discipline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 md:py-40 px-6 md:px-24 flex flex-col items-center text-center">
          <div className="w-16 h-px bg-ember/40 mb-16" />
          <h3 className="font-display italic text-4xl md:text-6xl font-light mb-6 max-w-4xl leading-tight text-text">
            Breath is the only tool
            <br />
            you cannot leave at home.
          </h3>
          <p className="text-text-muted font-light mb-12 text-lg">
            <span className="text-text font-semibold">Three free sessions.</span> No card required.
          </p>
          <Link
            href="/login"
            className="inline-block bg-ember hover:bg-ember-hover text-text px-12 md:px-16 py-5 md:py-6 caps-wide text-xs md:text-sm transition-all duration-500 rounded-sm"
          >
            Practice Now
          </Link>
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
