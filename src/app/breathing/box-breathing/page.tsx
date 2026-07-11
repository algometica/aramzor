import type { Metadata } from "next";
import Link from "next/link";

import { Wordmark } from "@/components/wordmark";

export const metadata: Metadata = {
  title: "Box Breathing - The 4-4-4-4 Technique Explained",
  description:
    "Box breathing (4-4-4-4) is a CO2-balancing technique used by Navy SEALs and athletes. How it works, when to use it, and how it compares to other breathwork protocols.",
  keywords: [
    "box breathing",
    "4-4-4-4 breathing",
    "box breathing technique",
    "Navy SEAL breathing",
    "box breathing for anxiety",
    "box breathing how to",
    "tactical breathing",
    "square breathing",
    "breathwork technique",
  ],
  alternates: {
    canonical: "https://aramzor.com/breathing/box-breathing",
  },
  openGraph: {
    title: "Box Breathing - The 4-4-4-4 Technique Explained",
    description:
      "Box breathing is a CO2-balancing technique used by Navy SEALs and athletes. How it works, when to use it, and its limitations.",
    url: "https://aramzor.com/breathing/box-breathing",
  },
};

const STEPS = [
  { label: "01", name: "Inhale", detail: "4 seconds through your nose. Fill the lungs from the bottom up - diaphragm first, then chest." },
  { label: "02", name: "Hold full", detail: "4 seconds at the top. Lungs full. Body still. The hold at the top is the most alerting part of this pattern." },
  { label: "03", name: "Exhale", detail: "4 seconds through your nose or mouth. Slow and controlled. Empty the chest first, then the diaphragm." },
  { label: "04", name: "Hold empty", detail: "4 seconds at the bottom. Lungs empty. This is the hardest part. Staying calm here is what trains the chemoreceptors." },
];

export default function BoxBreathingPage() {
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
            Try Free
          </Link>
        </nav>
      </header>

      <main className="flex-1 px-6 md:px-24 py-20 md:py-28 max-w-4xl mx-auto w-full">

        <p className="caps-wide text-[11px] text-ember tracking-[0.38em] mb-6">
          Box breathing
        </p>

        <h1 className="font-display italic font-bold text-5xl md:text-7xl leading-[0.92] tracking-tight mb-8 text-text">
          Four counts.
          <br />
          Four sides.
        </h1>

        <p className="text-lg md:text-xl text-text-muted leading-relaxed font-light mb-16 max-w-2xl">
          Box breathing - also called tactical breathing or square breathing - is a 4-4-4-4 pattern: four seconds inhale, four hold, four exhale, four hold. It was adopted by Navy SEALs for pre-mission stress control and is now used by athletes, surgeons, and executives. Here is what it actually does to your nervous system.
        </p>

        {/* How to do it */}
        <section className="mb-20">
          <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-8">How to do it</p>
          <div className="space-y-px">
            {STEPS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col md:flex-row gap-4 md:gap-12 py-8 border-b border-text-dim/8 first:border-t"
              >
                <div className="flex items-baseline gap-4 md:w-52 shrink-0">
                  <span className="font-display italic text-2xl text-ember/40 font-bold">{s.label}</span>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-text leading-tight">{s.name}</h2>
                </div>
                <p className="text-text-muted text-base leading-relaxed font-light max-w-lg">{s.detail}</p>
              </div>
            ))}
          </div>
          <p className="caps-tight text-[10px] text-text-dim mt-6">
            Repeat for 4-8 cycles. 5-10 minutes total.
          </p>
        </section>

        {/* What it actually does */}
        <section className="mb-20">
          <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-8">What is happening in your body</p>
          <div className="space-y-6 max-w-2xl">
            <p className="text-text-muted leading-relaxed font-light">
              The symmetric 4-4-4-4 pattern moderates CO2 cycling. During normal breathing, CO2 rises during exhale and drops during inhale in small oscillations. Box breathing smooths these oscillations by introducing breath holds that allow CO2 to stabilise at both the top and bottom of the breath cycle.
            </p>
            <p className="text-text-muted leading-relaxed font-light">
              The result is a dual effect: the hold-full (lungs full) phase is mildly stimulating and increases alertness, while the hold-empty (lungs empty) phase triggers the parasympathetic pivot. Combined, the pattern produces a state of calm alertness - not sedation. This is why it was adopted for high-stakes performance situations rather than sleep.
            </p>
            <p className="text-text-muted leading-relaxed font-light">
              The hold-empty phase is also where CO2 tolerance training occurs. Staying still and calm while the body signals increasing urgency to breathe directly trains the chemoreceptors to tolerate pressure without escalating into anxiety. Repeated over sessions, this reduces the baseline reactivity that underlies chronic anxiety and performance anxiety.
            </p>
          </div>
        </section>

        {/* Limits */}
        <section className="mb-20">
          <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-8">Limitations</p>
          <div className="space-y-6 max-w-2xl">
            <p className="text-text-muted leading-relaxed font-light">
              Box breathing manages an activated state. It does not reset it. The symmetric hold pattern is a useful tool for acute stress management but it does not produce the parasympathetic depth of a full activation-and-reset cycle.
            </p>
            <p className="text-text-muted leading-relaxed font-light">
              For situational anxiety - before a presentation, during a difficult moment - box breathing is effective and fast. For chronic anxiety or accumulated tension, a more complete protocol is required: one that activates the sympathetic system deliberately, runs the cycle to completion, and allows the parasympathetic return to be full rather than partial.
            </p>
          </div>
        </section>

        {/* Beyond box breathing */}
        <section className="mb-16">
          <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-8">Beyond box breathing</p>
          <div className="space-y-6 max-w-2xl">
            <p className="text-text-muted leading-relaxed font-light">
              The Aramzor Method incorporates the CO2 tolerance training of box breathing (the empty-hold phase is central to the Threshold beat) but goes further. The full protocol activates the sympathetic system first through controlled hyperventilation, then holds at empty lungs, then resets with a rescue breath that produces measurable physiological euphoria.
            </p>
            <p className="text-text-muted leading-relaxed font-light">
              The result is not calm in the suppressed sense. It is a nervous system that has been run through its full range and landed cleanly. Three free sessions to try it.
            </p>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          <Link
            href="/login"
            className="inline-block bg-ember hover:bg-ember-hover text-text px-12 py-5 caps-wide text-xs md:text-sm transition-all duration-300"
          >
            Try the Aramzor Method Free
          </Link>
          <p className="text-text-muted text-sm font-light self-center">
            Three free sessions. No card required.
          </p>
        </div>
      </main>

      <footer className="bg-bg-deep w-full py-12 px-6 flex flex-col items-center gap-4 border-t border-text-dim/10">
        <p className="font-display italic text-base text-ember">ARAMZOR</p>
        <div className="flex gap-8">
          <Link href="/" className="caps-tight text-[11px] text-text-muted hover:text-ember transition-colors">Home</Link>
          <Link href="/science" className="caps-tight text-[11px] text-text-muted hover:text-ember transition-colors">Science</Link>
          <Link href="/breathing/anxiety" className="caps-tight text-[11px] text-text-muted hover:text-ember transition-colors">Breathing for Anxiety</Link>
        </div>
        <p className="caps-wide text-[10px] text-text-dim">
          Aramzor. The Ancient Modernist.
        </p>
      </footer>
    </div>
  );
}
