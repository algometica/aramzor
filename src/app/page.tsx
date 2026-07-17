import Link from "next/link";

import { auth } from "@/auth";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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

export default async function LandingPage() {
  const session = await auth();
  const signedIn = Boolean(session?.user?.email);
  const startHref = signedIn ? "/dashboard" : "/login";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Aramzor",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    url: "https://aramzor.com",
    description:
      "Science-backed breathwork for anxiety, sleep, and energy. Peace in. Stress out.",
    offers: {
      "@type": "Offer",
      price: "8.00",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader variant="marketing" />

      <main id="main-content">
        {/*
          Mobile: orb sits above copy in a stacked first viewport.
          Desktop: cinematic full-bleed orb with copy overlaid lower-left.
        */}
        <section className="relative flex min-h-[100dvh] min-h-[100svh] flex-col overflow-hidden md:justify-center px-5 sm:px-6 md:px-16 max-w-6xl mx-auto w-full">
          {/* Mobile orb zone */}
          <div className="relative flex min-h-[38dvh] flex-1 items-center justify-center px-4 md:hidden">
            <HeroOrb className="h-[min(70vw,300px)] w-[min(70vw,300px)]" />
          </div>

          {/* Desktop orb - right side, keeps copy readable */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-[-6%] z-0 hidden -translate-y-1/2 md:block lg:right-[2%]"
          >
            <HeroOrb className="h-[min(48vw,520px)] w-[min(48vw,520px)]" />
          </div>

          <div className="relative z-10 max-w-lg pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2 md:pb-24 md:pt-0">
            <h1 className="hero-fade mb-4 font-display text-[48px] font-semibold leading-[0.96] tracking-[-0.045em] text-text sm:mb-5 sm:text-[72px] md:text-[80px]">
              Peace in.
              <br />
              Stress out.
            </h1>
            <p className="hero-fade hero-fade-delay-1 mb-7 max-w-md text-[16px] leading-relaxed text-text-muted sm:mb-9 sm:text-[18px] md:text-[20px]">
              When panic hits, start with one breath.
            </p>
            <div className="hero-fade hero-fade-delay-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href={startHref}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-text px-8 py-3.5 text-[15px] font-medium text-bg transition-opacity hover:opacity-90 sm:w-auto"
              >
                Breathe in calm
              </Link>
              <p className="text-center text-[13px] font-medium text-text-dim sm:text-left">
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
          <div className="max-w-6xl mx-auto">
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
          <div className="max-w-6xl mx-auto flex flex-col gap-7 sm:gap-8">
            <h3 className="font-display font-semibold text-[30px] sm:text-[36px] md:text-[52px] text-text leading-[1.08] tracking-[-0.04em]">
              When your chest is tight, your breath is still with you.
            </h3>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 sm:gap-5">
              <Link
                href={startHref}
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

      <SiteFooter />
    </div>
  );
}
