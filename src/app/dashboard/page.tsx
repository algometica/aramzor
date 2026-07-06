import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { db } from "@/db";
import { protocols } from "@/db/schema";

const CATEGORY_LABEL: Record<string, string> = {
  calm: "Active Ritual",
  sleep: "Recovery",
  energy: "Vitality",
  performance: "Flow State",
  "natural-high": "Expansion",
};

const CARD_SPAN: Record<string, string> = {
  calm: "md:col-span-7",
  sleep: "md:col-span-5",
  energy: "md:col-span-4",
  performance: "md:col-span-8",
  "natural-high": "md:col-span-12",
};

const CARD_HEIGHT: Record<string, string> = {
  calm: "min-h-[360px]",
  sleep: "min-h-[360px]",
  energy: "min-h-[400px]",
  performance: "min-h-[400px]",
  "natural-high": "min-h-[260px]",
};

export default async function DashboardPage() {
  const rows = await db.select().from(protocols);
  const order = ["calm", "sleep", "energy", "performance", "natural-high"];
  const sorted = rows.sort(
    (a, b) => order.indexOf(a.id) - order.indexOf(b.id),
  );

  return (
    <AppShell>
      <section className="px-6 md:px-10 pt-12 md:pt-20 pb-16 max-w-7xl w-full mx-auto">
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row items-start md:items-baseline justify-between gap-6">
          <h1 className="font-display italic text-5xl md:text-7xl font-light text-text leading-none tracking-tight">
            Select your
            <br />
            ritual.
          </h1>
          <p className="text-text-muted max-w-xs md:text-right border-l-2 md:border-l-0 md:border-r-2 border-ember pl-4 md:pl-0 md:pr-6 py-2 leading-relaxed">
            Breath is the bridge between the physical and the metaphysical.
            Choose the frequency for your current state.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-14 md:mb-20 border-t border-text-dim/10 pt-10 md:pt-14">
          {[
            { num: "01", beat: "The Zor", role: "Activation", body: "Connected breathing clears stress chemistry and generates inner heat through controlled hyperventilation." },
            { num: "02", beat: "The Threshold", role: "Retention", body: "Empty lung hold. CO2 tolerance expands. The mind learns to remain still under physical pressure." },
            { num: "03", beat: "The Return", role: "Rescue Breath", body: "One deep inhale, held at the top. Oxygenation rebound. Euphoria lives in this beat." },
            { num: "04", beat: "The Aram", role: "Landing", body: "Extended exhale ratio. Vagal brake engages. Cortisol drops within four to five cycles." },
          ].map((b) => (
            <div key={b.beat} className="flex flex-col gap-4">
              <span className="font-display italic text-3xl text-ember/30 leading-none">{b.num}</span>
              <div className="space-y-1">
                <p className="caps-wide text-[8px] text-ember/60 tracking-[0.32em]">{b.role}</p>
                <p className="font-display italic text-xl md:text-2xl text-text font-light">{b.beat}</p>
              </div>
              <p className="text-text-muted text-sm leading-relaxed font-light">{b.body}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {sorted.map((p) => (
            <Link
              key={p.id}
              href={`/session/${p.id}`}
              className={`group relative bg-surface-low hover:bg-surface p-8 md:p-12 flex flex-col justify-between ${CARD_SPAN[p.id]} ${CARD_HEIGHT[p.id]} transition-colors duration-700 rounded-sm`}
            >
              <div>
                <span className="caps-wide text-[10px] text-ember mb-4 block">
                  {CATEGORY_LABEL[p.id]}
                </span>
                <h2 className="font-display italic text-4xl md:text-5xl text-text group-hover:text-ember transition-colors duration-500">
                  {p.name}
                </h2>
              </div>
              <div className="mt-8 flex flex-col gap-4">
                <p className="text-text-muted leading-relaxed max-w-sm">
                  {p.description}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display italic text-2xl text-ember">
                    {p.durationMin}
                  </span>
                  <span className="caps-tight text-[10px] text-text-muted">
                    Minutes
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-24 md:mt-32 text-center">
          <p className="font-display italic text-xl md:text-2xl text-text-dim max-w-2xl mx-auto leading-relaxed">
            &ldquo;The breath is the only part of the autonomic nervous system
            that we can control. By changing the breath, we change the
            mind.&rdquo;
          </p>
        </footer>
      </section>
    </AppShell>
  );
}
