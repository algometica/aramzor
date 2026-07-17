import Link from "next/link";

import { auth } from "@/auth";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "The Science Behind Breathwork for Anxiety and Stress Relief",
  description:
    "The Aramzor Method synthesizes Tibetan Tummo, Kundalini pranayama, Stanford HRV research, and HeartMath coherence breathing. Science citations included. Combined, not owned.",
  keywords: [
    "breathwork science",
    "breathing exercises anxiety science",
    "Wim Hof science",
    "Tummo breathing Harvard",
    "Huberman breathing",
    "HRV breathing",
    "coherence breathing HeartMath",
    "physiological sigh research",
    "pranayama neuroscience",
  ],
};

const LINEAGE = [
  {
    name: "Tibetan Tummo meditation",
    detail: "Herbert Benson, Harvard Medical School, 1982",
  },
  {
    name: "Kundalini pranayama",
    detail: "Hatha Yoga Pradipika, 15th century",
  },
  {
    name: "Shaivite tantric breathwork",
    detail: "Kashmir Shaivism tradition",
  },
  {
    name: "Breath of Fire / Agni Prana",
    detail: "Kundalini and Hatha yoga tradition",
  },
  {
    name: "Physiological Sigh and Cyclic Sighing",
    detail: "Stanford - Huberman et al., 2023",
  },
  {
    name: "Coherence Breathing",
    detail: "HeartMath Institute",
  },
  {
    name: "Bhramari pranayama",
    detail: "Vedic humming exhale tradition",
  },
  {
    name: "Tactical breathing",
    detail: "Military and Navy SEAL tradition",
  },
];

const MECHANISM = [
  {
    beat: "The Zor",
    number: "01",
    subtitle: "Forced activation",
    body: "Cyclic forced breathing drives CO2 out of the bloodstream, producing mild hypocapnia and triggering adrenaline release from the adrenal medulla. Oxygen saturation rises sharply. The blood alkalizes. This produces the physiological state of alert activation - without any external stressor. The body's sympathetic system fires on command.",
    mechanism: "Hypocapnia - sympathetic activation - adrenaline secretion",
  },
  {
    beat: "The Threshold",
    number: "02",
    subtitle: "Chemoreceptor training",
    body: "The body's urge to breathe is driven almost entirely by rising CO2, not falling oxygen. At full-lung retention, the chemoreceptors signal urgency while the blood is still oxygen-rich. Remaining calm in this state trains the nervous system to tolerate internal pressure without panic. Over repeated sessions, CO2 tolerance expands, BDNF is released, and HIF-1 alpha activates adaptive cellular responses.",
    mechanism: "CO2 tolerance - HIF-1a activation - BDNF release",
  },
  {
    beat: "The Aram",
    number: "03",
    subtitle: "Vagal restoration",
    body: "Extended exhales with humming activate the vagus nerve directly. The humming resonance generates nitric oxide in the nasal cavities and paranasal sinuses - vasodilating the airways and bloodstream simultaneously. Cardiovascular coherence is restored. HRV rises. The nervous system is not simply calmed; it is recalibrated from an activated baseline.",
    mechanism: "Nitric oxide synthesis - vagal tone - HRV coherence",
  },
];

const STUDIES = [
  {
    authors: "Kox et al.",
    venue: "PNAS, 2014",
    title:
      "Voluntary activation of the sympathetic nervous system and attenuation of the innate immune response in humans",
    finding:
      "Demonstrated for the first time that cyclic breathing techniques allow voluntary control over the autonomic nervous system - including measurable suppression of inflammatory cytokines.",
  },
  {
    authors: "Huberman, Balban et al.",
    venue: "Cell Reports Medicine, 2023",
    title:
      "Brief structured respiration practices enhance mood and reduce physiological arousal",
    finding:
      "Cyclic sighing outperformed mindfulness meditation and box breathing for real-time reduction in physiological stress - 5 minutes daily produced measurable HRV and mood improvements over one month.",
  },
  {
    authors: "McCraty et al.",
    venue: "HeartMath Institute",
    title: "Heart rate variability coherence and autonomic function",
    finding:
      "Paced breathing near 5 breaths per minute produces optimal HRV coherence, synchronized cardiac, respiratory, and blood pressure rhythms, and measurable improvement in cognitive performance.",
  },
  {
    authors: "Weitzberg and Lundberg",
    venue: "Acta Physiologica, 2002",
    title: "Humming greatly increases nasal nitric oxide",
    finding:
      "Humming during exhalation increases nasal nitric oxide production 15-fold compared to quiet exhalation. Nitric oxide is a potent vasodilator critical to cardiovascular regulation and airway function.",
  },
  {
    authors: "Benson et al.",
    venue: "Nature, 1982",
    title:
      "Body temperature changes during the practice of Tum-mo yoga (Tummo meditation)",
    finding:
      "First Western documentation of Tibetan Tummo practitioners generating measurable core and peripheral heat through breathwork alone - verified under controlled laboratory conditions at Harvard Medical School.",
  },
];

export default async function SciencePage() {
  const session = await auth();
  const startHref = session?.user?.email ? "/dashboard" : "/login";

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep">
      <SiteHeader variant="marketing" />

      <main className="flex-1 px-6 md:px-24 py-24 md:py-32 max-w-5xl mx-auto w-full">

        {/* Hero */}
        <p className="caps-wide text-xs text-accent mb-6">Lineage + Mechanism</p>
        <h1 className="font-display font-semibold text-5xl md:text-7xl leading-[0.92] tracking-tight mb-12">
          Combined,
          <br />
          not owned.
        </h1>
        <p className="text-lg md:text-xl text-text-muted leading-relaxed font-light mb-24 max-w-2xl">
          The Aramzor method synthesizes eight verified traditions into one
          structured protocol. Every element traces to a source. Nothing is
          invented. Everything is attributed.
        </p>

        {/* Lineage table */}
        <section className="mb-28">
          <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-8">Source traditions</p>
          <div className="space-y-px">
            {LINEAGE.map((row) => (
              <div
                key={row.name}
                className="flex flex-col md:flex-row md:items-baseline justify-between py-5 px-4 hover:bg-surface-low transition-colors duration-500 gap-2 border-b border-text-dim/8 first:border-t"
              >
                <span className="font-display font-normal text-2xl md:text-3xl text-text">
                  {row.name}
                </span>
                <span className="text-sm text-text-muted font-light">{row.detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Mechanism */}
        <section className="mb-28">
          <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-8">What is happening in your body</p>
          <div className="space-y-16">
            {MECHANISM.map((m) => (
              <div key={m.beat} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                <div className="md:col-span-4 flex flex-col gap-2">
                  <span className="font-display text-3xl text-accent/40">{m.number}</span>
                  <h2 className="font-display font-semibold text-4xl md:text-5xl text-text leading-tight">
                    {m.beat}
                  </h2>
                  <p className="caps-wide text-[11px] text-accent/70 tracking-[0.3em] mt-1">
                    {m.subtitle}
                  </p>
                </div>
                <div className="md:col-span-8 flex flex-col gap-4 md:pt-10">
                  <p className="text-text-muted leading-relaxed font-light">
                    {m.body}
                  </p>
                  <p className="caps-wide text-[11px] text-text-dim tracking-[0.28em] leading-loose">
                    {m.mechanism}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Studies */}
        <section className="mb-24">
          <p className="caps-wide text-[11px] text-text-dim tracking-[0.38em] mb-8">Key research</p>
          <div className="space-y-px">
            {STUDIES.map((s) => (
              <div
                key={s.title}
                className="py-8 px-4 border-b border-text-dim/8 first:border-t hover:bg-surface-low transition-colors duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-3">
                  <span className="font-display font-semibold text-2xl md:text-3xl text-text">
                    {s.authors}
                  </span>
                  <span className="caps-tight text-[10px] text-accent/60">{s.venue}</span>
                </div>
                <p className="text-sm text-text-muted font-light mb-3 max-w-2xl">
                  {s.title}
                </p>
                <p className="text-sm text-text-dim font-light leading-relaxed max-w-2xl">
                  {s.finding}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Attribution note */}
        <div className="border-l-2 border-accent/40 pl-6 max-w-2xl mb-20">
          <p className="text-text-muted leading-relaxed font-light">
            Many modern wellness brands charge thousands for retreats built
            entirely on these publicly documented traditions - without
            attribution to their origins. Aramzor attributes. The price
            reflects the protocol, not a personality.
          </p>
        </div>

        <Link
          href={startHref}
          className="inline-block border border-accent/40 hover:border-accent hover:bg-surface px-12 py-6 caps-wide text-xs md:text-sm transition-all duration-500"
        >
          Begin Practice
        </Link>
      </main>

      <footer className="bg-bg-deep w-full py-12 px-6 flex flex-col items-center gap-4 border-t border-text-dim/10">
        <p className="font-display text-base text-accent">ARAMZOR</p>
        <p className="caps-wide text-[10px] text-text-dim">
          Aramzor. The Ancient Modernist.
        </p>
      </footer>
    </div>
  );
}
