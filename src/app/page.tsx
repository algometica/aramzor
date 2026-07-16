import Link from "next/link";

import { Wordmark } from "@/components/wordmark";

export const dynamic = "force-static";

function HeroOrb({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-[-12%] soft-breathe"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(125,207,182,0.38) 0%, rgba(125,207,182,0.14) 32%, transparent 64%)",
        }}
      />
      <div
        className="absolute inset-[16%] rounded-full hero-orb-core"
        style={{
          background:
            "radial-gradient(circle at 38% 32%, #f2fff8 0%, #c8f0dc 18%, #7dcfb6 48%, #2a6b56 72%, #0a1f1a 100%)",
          boxShadow:
            "0 0 56px 10px rgba(125,207,182,0.22), 0 0 100px 24px rgba(125,207,182,0.1)",
        }}
      />
      <div
        className="absolute inset-[27%] rounded-full border border-white/15"
        style={{ opacity: 0.45 }}
      />
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-bg">
      <header className="sticky top-0 z-50 px-5 sm:px-6 md:px-10 pt-safe flex justify-between items-center bg-bg/75 backdrop-blur-xl">
        <div className="py-4 w-full flex justify-between items-center">
          <Wordmark size="md" />
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/science"
              className="text-[13px] font-medium text-text-muted hover:text-text transition-colors"
            >
              Science
            </Link>
            <Link
              href="/about"
              className="text-[13px] font-medium text-text-muted hover:text-text transition-colors"
            >
              About
            </Link>
            <Link
              href="/login"
              className="text-[13px] font-medium text-accent hover:text-accent-hover transition-colors"
            >
              Sign In
            </Link>
          </nav>
          <Link
            href="/login"
            className="md:hidden inline-flex items-center min-h-11 text-[14px] font-medium text-accent"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main>
        {/*
          Mobile: orb sits above copy in a stacked first viewport.
          Desktop: cinematic full-bleed orb with copy overlaid lower-left.
        */}
        <section className="relative min-h-[100dvh] min-h-[100svh] flex flex-col md:justify-center overflow-hidden">
          {/* Mobile orb zone */}
          <div className="md:hidden relative flex-1 flex items-center justify-center px-4 min-h-[42dvh]">
            <HeroOrb className="w-[min(78vw,340px)] h-[min(78vw,340px)]" />
          </div>

          {/* Desktop full-bleed orb */}
          <div className="hidden md:flex absolute inset-0 z-0 pointer-events-none items-center justify-center">
            <HeroOrb className="w-[min(70vw,720px)] h-[min(70vw,720px)]" />
          </div>

          <div className="relative z-10 px-5 sm:px-6 md:px-16 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:pb-24 pt-2 md:pt-0 max-w-3xl">
            <h1 className="hero-fade font-display font-semibold text-[48px] sm:text-[72px] md:text-[92px] leading-[0.96] tracking-[-0.045em] mb-4 sm:mb-5 text-text">
              Peace in.
              <br />
              Stress out.
            </h1>
            <p className="hero-fade hero-fade-delay-1 text-[16px] sm:text-[18px] md:text-[20px] text-text-muted max-w-md mb-7 sm:mb-9 leading-relaxed">
              When panic hits, start with one breath.
            </p>
            <div className="hero-fade hero-fade-delay-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-text text-bg hover:opacity-90 w-full sm:w-auto px-8 py-3.5 min-h-12 text-[15px] font-medium transition-opacity"
              >
                Breathe in calm
              </Link>
              <p className="text-[13px] font-medium text-text-dim text-center sm:text-left">
                Three free sessions. No card required.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28 md:py-36 px-5 sm:px-6 md:px-16 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto">
            <p className="text-[12px] sm:text-[13px] font-medium text-text-dim tracking-[0.12em] uppercase mb-10 sm:mb-14">
              One method. Four beats.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-14 md:gap-12">
              {[
                {
                  n: "01",
                  title: "The Zor",
                  body: "Wake the body up. Give the stress a clear path out instead of trapping it in your chest.",
                },
                {
                  n: "02",
                  title: "The Threshold",
                  body: "Hold on empty lungs. Stay with the wave while the urge to flee rises - then let it pass.",
                },
                {
                  n: "03",
                  title: "The Aram",
                  body: "Long, slow exhales. Land in a calm your nervous system can actually hold.",
                },
              ].map((item) => (
                <div key={item.n} className="flex flex-col gap-3">
                  <span className="text-[12px] font-medium text-accent tracking-[0.08em]">
                    {item.n}
                  </span>
                  <h2 className="font-display font-semibold text-[26px] sm:text-[28px] md:text-[32px] text-text tracking-[-0.03em]">
                    {item.title}
                  </h2>
                  <p className="text-text-muted leading-relaxed text-[16px] md:text-[17px]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 md:py-40 px-5 sm:px-6 md:px-16">
          <div className="max-w-3xl">
            <p className="font-display font-semibold text-[34px] sm:text-[40px] md:text-[64px] text-text leading-[1.05] tracking-[-0.04em] mb-5 sm:mb-6">
              Aram means rest.
              <br />
              <span className="text-text-muted">Zor means force.</span>
            </p>
            <p className="text-text-muted text-[16px] sm:text-[18px] max-w-lg leading-relaxed mb-4">
              Peace in. Stress out. The name is the method.
            </p>
            <p className="text-[13px] font-medium text-text-dim">
              $8 / month - Calm and Sleep free to start
            </p>
          </div>
        </section>

        <section className="py-20 sm:py-28 md:py-32 px-5 sm:px-6 md:px-16 border-t border-white/[0.06] pb-[max(5rem,env(safe-area-inset-bottom))]">
          <div className="max-w-3xl flex flex-col gap-7 sm:gap-8">
            <h3 className="font-display font-semibold text-[30px] sm:text-[36px] md:text-[52px] text-text leading-[1.08] tracking-[-0.04em]">
              When your chest is tight, your breath is still with you.
            </h3>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 sm:gap-5">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-text text-bg hover:opacity-90 w-full sm:w-auto px-8 py-3.5 min-h-12 text-[15px] font-medium transition-opacity"
              >
                Breathe in calm
              </Link>
              <p className="text-text-muted text-[14px] sm:text-[15px] self-center text-center sm:text-left">
                Three free sessions. $8/month after.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 sm:py-14 px-5 flex flex-col items-center justify-center space-y-5 border-t border-white/[0.06] pb-safe">
        <Wordmark size="md" href="/" />
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          <Link href="/about" className="text-[13px] font-medium text-text-muted hover:text-text transition-colors min-h-11 inline-flex items-center">
            About
          </Link>
          <Link href="/science" className="text-[13px] font-medium text-text-muted hover:text-text transition-colors min-h-11 inline-flex items-center">
            Science
          </Link>
          <Link href="/login" className="text-[13px] font-medium text-text-muted hover:text-text transition-colors min-h-11 inline-flex items-center">
            Sign In
          </Link>
        </div>
        <p className="text-[12px] font-medium text-text-dim">
          Aramzor. The Ancient Modernist.
        </p>
        <p className="max-w-md text-center text-[11px] text-text-dim leading-relaxed px-2">
          Disclaimer: Aramzor is a performance breathwork utility. Consult a
          physician before engaging in high-intensity CO2 tolerance training.
        </p>
      </footer>
    </div>
  );
}
