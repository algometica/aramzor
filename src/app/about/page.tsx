import type { Metadata } from "next";
import Link from "next/link";

import { auth } from "@/auth";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About Aramzor - Breathwork for Anxiety, Sleep & Natural Energy",
  description:
    "Aramzor is a breathwork app built on a four-beat proprietary protocol drawing from Tibetan Tummo, Kundalini pranayama, Stanford HRV research, and ancient Indian breathing traditions. One method. Five modes. $8/month.",
  keywords: [
    "breathwork app",
    "breathwork for anxiety",
    "breathing app",
    "Aramzor method",
    "four beat breathing",
    "Tummo breathing app",
    "pranayama app",
    "HRV breathing",
    "natural high breathing",
    "breathing for sleep",
    "breathing for performance anxiety",
  ],
  alternates: {
    canonical: "https://aramzor.com/about",
  },
  openGraph: {
    title: "About Aramzor - Breathwork for Anxiety, Sleep & Natural Energy",
    description:
      "One proprietary breathwork method. Four beats. Five modes. Built on Tibetan Tummo, Kundalini pranayama, and Stanford HRV research.",
    url: "https://aramzor.com/about",
  },
};

const MODES = [
  {
    name: "Calm",
    goal: "Stop the spiral",
    body: "Forty connected breaths at 1.75s each side, a 45-second empty-lung hold, a 15-second rescue breath, then fifteen extended-exhale cycles. A complete anxiety reset in about seven minutes.",
  },
  {
    name: "Sleep",
    goal: "Quiet a racing mind",
    body: "Thirty activation breaths, a 40-second hold, a gentler 10-second rescue breath, then eighteen closing cycles with a long exhale and bottom pause. Designed to put you under before it ends - about eight minutes.",
  },
  {
    name: "Energy",
    goal: "Wake up without caffeine",
    body: "Forty fast mouth breaths at 1.25s each side, a 40-second hold, a sharp mouth return, and eight short landing cycles. Energising without a full parasympathetic shutdown - about four minutes.",
  },
  {
    name: "Steady",
    goal: "Stay steady when performance anxiety hits",
    body: "Thirty measured breaths, a 60-second hold with pelvic-floor emphasis, a 15-second rescue breath, and twelve humming exhales. Built for freeze under pressure - closeness, speaking, and high-stakes moments - about six minutes.",
  },
  {
    name: "Natural High",
    goal: "Reach an altered state",
    body: "Three complete rounds of activation, retention, and return. Thresholds climb to 75 seconds; round three lands with a long Aram. Tingling, phosphenes, euphoria on the rescue hold. Lying down is mandatory - about sixteen minutes.",
  },
];

export default async function AboutPage() {
  const session = await auth();
  const startHref = session?.user?.email ? "/dashboard" : "/login";

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep">
      <SiteHeader variant="marketing" />

      <main id="main-content" className="flex-1 px-6 md:px-24 py-24 md:py-32 max-w-6xl mx-auto w-full">

        <p className="caps-wide text-[11px] text-accent tracking-[0.38em] mb-6">The Ancient Modernist</p>

        <h1 className="font-display font-semibold text-6xl md:text-8xl leading-[0.92] tracking-tight mb-16 text-text">
          Peace in.
          <br />
          Stress out.
        </h1>

        {/* The name */}
        <section className="mb-20">
          <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-8">The name</p>
          <div className="space-y-5 text-base md:text-lg text-text-muted leading-relaxed font-light max-w-2xl">
            <p>
              The name comes from two ancient words found across South Asia.{" "}
              <span className="text-text font-medium">Aram</span> - rest, peace, ease.{" "}
              <span className="text-text font-medium">Zor</span> - force, power, strength.
              Words that have lived in the languages of the Indian subcontinent for centuries.
            </p>
            <p>
              The name is the protocol. Zor goes in. Aram comes out.
            </p>
          </div>
        </section>

        {/* What breathwork actually does */}
        <section className="mb-20">
          <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-8">What breathwork actually does</p>
          <div className="space-y-5 text-base md:text-lg text-text-muted leading-relaxed font-light max-w-2xl">
            <p>
              Anxiety, stress, and racing thoughts are not primarily cognitive problems. They are physiological states. The nervous system has shifted into sympathetic dominance - adrenaline is circulating, CO2 is dysregulated, and the body is running a threat response that no amount of positive thinking will interrupt.
            </p>
            <p>
              Breath is the only part of the autonomic nervous system that is under voluntary control. By deliberately changing the breathing pattern, you can directly modify the biochemical state that anxiety requires to persist. Extend the exhale and the vagal brake engages. Raise CO2 gently and the chemoreceptor alarm signal quiets. Run a full activation cycle to completion and the parasympathetic return is deep rather than partial.
            </p>
            <p>
              This is not relaxation. It is recalibration.
            </p>
            <p>
              <Link href="/breathing/anxiety" className="text-accent hover:text-accent-hover transition-colors">
                Read the full mechanism behind breathing and anxiety relief.
              </Link>
            </p>
          </div>
        </section>

        {/* The four beats */}
        <section className="mb-20">
          <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-8">The four beats</p>
          <div className="space-y-px max-w-2xl">
            {[
              {
                num: "01",
                name: "The Zor",
                role: "Activation",
                body: "Twenty to thirty connected breaths at full intensity. Controlled hyperventilation drives CO2 out, adrenaline releases, the blood alkalizes, inner heat builds. The nervous system fires on command rather than in reaction to an external stressor.",
              },
              {
                num: "02",
                name: "The Threshold",
                role: "Retention",
                body: "Hold on empty lungs after the last passive exhale. The body's urge to breathe is driven by CO2, not oxygen - so the blood is still oxygen-rich while the signal to panic rises. Remaining calm here is the training. CO2 tolerance expands. The freeze response dissolves.",
              },
              {
                num: "03",
                name: "The Return",
                role: "Rescue breath",
                body: "One full inhale, held at the top for 10-20 seconds. Oxygenation rebound, pulmonary stretch receptor activation, and measurable physiological euphoria. This beat is not optional. It bridges the Threshold to the Aram.",
              },
              {
                num: "04",
                name: "The Aram",
                role: "Landing",
                body: "Extended nasal exhale cycles. The vagal brake engages, HRV rises, cortisol drops within four to five cycles. Nasal breathing produces nitric oxide that vasodilates the airways. The nervous system does not just calm - it lands.",
              },
            ].map((b) => (
              <div key={b.num} className="flex flex-col gap-3 py-10 border-b border-text-dim/8 first:border-t">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-2xl text-accent/40 font-bold">{b.num}</span>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-text leading-tight">{b.name}</h2>
                  <span className="caps-wide text-[8px] text-accent/60 tracking-[0.3em]">{b.role}</span>
                </div>
                <p className="text-text-muted text-base leading-relaxed font-light">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The five modes */}
        <section className="mb-20">
          <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-8">The five modes</p>
          <div className="space-y-px max-w-2xl">
            {MODES.map((m) => (
              <div key={m.name} className="flex flex-col gap-3 py-10 border-b border-text-dim/8 first:border-t">
                <div className="flex flex-col gap-1">
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-text leading-tight">{m.name}</h2>
                  <p className="font-label text-[10px] text-accent/70 uppercase tracking-wide">{m.goal}</p>
                </div>
                <p className="text-text-muted text-base leading-relaxed font-light">{m.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lineage */}
        <section className="mb-20">
          <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-8">Where it comes from</p>
          <div className="space-y-5 text-base text-text-muted leading-relaxed font-light max-w-2xl">
            <p>
              India has one of the oldest documented relationships with conscious breathing on the planet. Pranayama traditions from the Hatha Yoga Pradipika, Kundalini kriya, Shaivite tantric breathwork, and bhramari humming - these are not wellness trends, they are ancient technologies. The Aramzor Method draws directly from these traditions.
            </p>
            <p>
              It also integrates Tibetan Tummo meditation (documented at Harvard Medical School, 1982), the physiological sigh research from Stanford University (Huberman et al., 2023), and coherence breathing from the HeartMath Institute. Eight verified traditions, combined into one structured sequence. Nothing is invented. Everything is attributed.
            </p>
            <p>
              <Link href="/science" className="text-accent hover:text-accent-hover transition-colors">
                Read the full research and lineage.
              </Link>
            </p>
          </div>
        </section>

        {/* Further reading */}
        <section className="mb-20">
          <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-8">Further reading</p>
          <div className="space-y-px">
            <Link href="/breathing/anxiety" className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 py-6 border-b border-text-dim/8 first:border-t hover:bg-surface-low px-2 transition-colors group">
              <span className="font-display font-bold text-2xl md:text-3xl text-text group-hover:text-accent transition-colors">Breathing for anxiety</span>
              <span className="caps-tight text-[10px] text-text-dim">Why breathing stops anxiety spirals</span>
            </Link>
            <Link href="/breathing/box-breathing" className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 py-6 border-b border-text-dim/8 hover:bg-surface-low px-2 transition-colors group">
              <span className="font-display font-bold text-2xl md:text-3xl text-text group-hover:text-accent transition-colors">Box breathing explained</span>
              <span className="caps-tight text-[10px] text-text-dim">The 4-4-4-4 technique and its limits</span>
            </Link>
            <Link href="/science" className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 py-6 border-b border-text-dim/8 hover:bg-surface-low px-2 transition-colors group">
              <span className="font-display font-bold text-2xl md:text-3xl text-text group-hover:text-accent transition-colors">The science and lineage</span>
              <span className="caps-tight text-[10px] text-text-dim">Eight traditions, five key studies</span>
            </Link>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          <Link
            href={startHref}
            className="inline-block rounded-full bg-text text-bg hover:opacity-90 px-12 py-5 caps-wide text-xs md:text-sm transition-all duration-300"
          >
            Begin Practice
          </Link>
          <p className="text-text-muted text-sm font-light self-center">
            Three free sessions of Calm and Sleep. No card required.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
