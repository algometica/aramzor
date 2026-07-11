import type { Metadata } from "next";
import Link from "next/link";

import { Wordmark } from "@/components/wordmark";

export const metadata: Metadata = {
  title: "Breathing Exercises for Anxiety - What Actually Works",
  description:
    "The physiological reason breathing stops anxiety - and the specific techniques that work fastest. Covers box breathing, physiological sigh, extended exhale, and the Aramzor method.",
  keywords: [
    "breathing exercises for anxiety",
    "anxiety breathing techniques",
    "how to breathe when anxious",
    "breathing to stop anxiety",
    "box breathing for anxiety",
    "physiological sigh anxiety",
    "4-7-8 breathing anxiety",
    "breathwork anxiety relief",
  ],
  alternates: {
    canonical: "https://aramzor.com/breathing/anxiety",
  },
  openGraph: {
    title: "Breathing Exercises for Anxiety - What Actually Works",
    description:
      "The physiological reason breathing stops anxiety - and the specific techniques that work fastest.",
    url: "https://aramzor.com/breathing/anxiety",
  },
};

const TECHNIQUES = [
  {
    name: "Extended exhale (4-6 or 4-8)",
    mechanism: "Activates the vagal brake via baroreceptor stretch during long exhalation. HRV rises within 3-5 cycles.",
    when: "Mid-anxiety spiral, meeting room, before sleep.",
    limit: "Effective but mild. Doesn't reset the underlying activation state, only suppresses it.",
  },
  {
    name: "Box breathing (4-4-4-4)",
    mechanism: "Symmetric breath-hold pattern equalises CO2 and O2 cycling. Calming but also alerting - developed by Navy SEALs for high-stress readiness.",
    when: "Pre-performance anxiety, situational stress. Good for people who need to stay alert.",
    limit: "The symmetric hold pattern is an arbitrary construct. The 4-second holds are not physiologically special.",
  },
  {
    name: "Physiological sigh (double inhale, long exhale)",
    mechanism: "Re-inflates collapsed alveoli, rapidly offloads CO2. Stanford research shows 5 minutes daily outperforms mindfulness for HRV improvement.",
    when: "Fastest single-breath intervention available. Works in seconds.",
    limit: "Addresses the acute spike but not the accumulated tension underneath.",
  },
  {
    name: "Cyclic hyperventilation + empty hold (Tummo-derived)",
    mechanism: "Controlled activation of sympathetic nervous system followed by parasympathetic pivot. Trains chemoreceptors to tolerate CO2 without panic. The most complete reset available.",
    when: "When the anxiety is pervasive, not situational. When you need a full reset, not a quick suppress.",
    limit: "Takes 8-20 minutes. Not something you do in a meeting.",
  },
];

export default function AnxietyBreathingPage() {
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
          Breathing for anxiety
        </p>

        <h1 className="font-display italic font-bold text-5xl md:text-7xl leading-[0.92] tracking-tight mb-8 text-text">
          Why breathing
          <br />
          stops anxiety.
        </h1>

        <p className="text-lg md:text-xl text-text-muted leading-relaxed font-light mb-16 max-w-2xl">
          Anxiety is not a thought problem. It is a physiological state. The nervous system has entered sympathetic dominance - adrenaline is circulating, CO2 is dysregulated, breathing is shallow and fast. Talking about it doesn't fix it. Breathing does, because breath is the only part of the autonomic nervous system you can directly control.
        </p>

        {/* The mechanism */}
        <section className="mb-20">
          <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-8">The mechanism</p>
          <div className="space-y-6 max-w-2xl">
            <p className="text-text-muted leading-relaxed font-light">
              The vagus nerve runs from your brainstem to your abdomen and carries the parasympathetic signal - the system responsible for calm, digestion, and rest. It responds directly to the length and depth of your exhale. Extend your exhale past your inhale for four to five cycles and the vagal brake engages, heart rate slows, and cortisol begins to drop.
            </p>
            <p className="text-text-muted leading-relaxed font-light">
              Separately, the urge to breathe is driven almost entirely by rising CO2, not by falling oxygen. Anxiety produces fast shallow breathing that keeps CO2 low and maintains the sense of urgency. Deliberate slow breathing allows CO2 to rise to its natural resting level, which extinguishes the chemoreceptor alarm signal that sustains the anxiety spiral.
            </p>
            <p className="text-text-muted leading-relaxed font-light">
              This is why breathing works on anxiety. Not because it is calming to think about. Because it directly modifies the biochemical state that anxiety requires to persist.
            </p>
          </div>
        </section>

        {/* Techniques */}
        <section className="mb-20">
          <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-8">Techniques compared</p>
          <div className="space-y-px">
            {TECHNIQUES.map((t) => (
              <div
                key={t.name}
                className="py-8 px-4 border-b border-text-dim/8 first:border-t hover:bg-surface-low transition-colors duration-300"
              >
                <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-4 leading-tight">
                  {t.name}
                </h2>
                <p className="text-text-muted text-sm leading-relaxed font-light mb-2 max-w-2xl">
                  <span className="text-text font-medium">Mechanism: </span>{t.mechanism}
                </p>
                <p className="text-text-muted text-sm leading-relaxed font-light mb-2 max-w-2xl">
                  <span className="text-text font-medium">Best for: </span>{t.when}
                </p>
                <p className="text-text-dim text-sm leading-relaxed font-light max-w-2xl">
                  <span className="text-text-muted font-medium">Limitation: </span>{t.limit}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* The full reset */}
        <section className="mb-20">
          <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-8">The full reset</p>
          <div className="space-y-6 max-w-2xl">
            <p className="text-text-muted leading-relaxed font-light">
              Most breathing techniques suppress anxiety. The Aramzor Method resets it. The difference matters for chronic anxiety - the kind that returns because nothing has changed in the underlying nervous system.
            </p>
            <p className="text-text-muted leading-relaxed font-light">
              The method runs through four beats: forced activation (controlled hyperventilation that depletes CO2 and triggers adrenaline on command), empty-lung retention (training the nervous system to stay calm under real internal pressure), a rescue breath that produces genuine physiological euphoria, and finally extended nasal breathing that restores HRV to its coherent resting state.
            </p>
            <p className="text-text-muted leading-relaxed font-light">
              You are not calming down from the outside in. You are running the activation cycle to completion, which allows the parasympathetic return to land fully rather than being chronically suppressed.
            </p>
          </div>
        </section>

        {/* Attribution */}
        <div className="border-l-2 border-ember/40 pl-6 max-w-2xl mb-16">
          <p className="text-text-muted text-sm leading-relaxed font-light">
            The science behind this page draws from Kox et al. (PNAS, 2014), Balban and Huberman et al. (Cell Reports Medicine, 2023), and McCraty et al. (HeartMath Institute). See the full{" "}
            <Link href="/science" className="text-ember hover:text-ember-hover transition-colors">
              research and lineage page
            </Link>
            .
          </p>
        </div>

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
          <Link href="/breathing/box-breathing" className="caps-tight text-[11px] text-text-muted hover:text-ember transition-colors">Box Breathing</Link>
        </div>
        <p className="caps-wide text-[10px] text-text-dim">
          Aramzor. The Ancient Modernist.
        </p>
      </footer>
    </div>
  );
}
