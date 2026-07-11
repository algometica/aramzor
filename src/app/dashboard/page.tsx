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

const GOAL_LABEL: Record<string, string> = {
  calm: "I need to stop spiraling right now",
  sleep: "It's late and my brain won't shut off",
  energy: "Morning energy without another coffee",
  performance: "I freeze up when it matters most",
  "natural-high": "Show me what this body can do",
};

const CARD_SPAN: Record<string, string> = {
  calm: "md:col-span-7",
  sleep: "md:col-span-5",
  energy: "md:col-span-4",
  performance: "md:col-span-8",
  "natural-high": "md:col-span-12",
};

const CARD_HEIGHT: Record<string, string> = {
  calm: "min-h-[400px]",
  sleep: "min-h-[400px]",
  energy: "min-h-[440px]",
  performance: "min-h-[440px]",
  "natural-high": "min-h-[300px]",
};

export default async function DashboardPage() {
  const rows = await db.select().from(protocols);
  const order = ["calm", "sleep", "energy", "performance", "natural-high"];
  const sorted = rows.sort(
    (a, b) => order.indexOf(a.id) - order.indexOf(b.id),
  );

  return (
    <AppShell>
      <section className="px-6 md:px-10 pt-10 md:pt-16 pb-16 max-w-7xl w-full mx-auto">
        <header className="mb-10 md:mb-14">
          <h1 className="font-display italic font-bold text-5xl md:text-7xl text-text leading-none tracking-tight">
            Select your
            <br />
            ritual.
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {sorted.map((p) => (
            <Link
              key={p.id}
              href={`/session/${p.id}`}
              className={`group relative bg-surface-low hover:bg-surface-high flex flex-col justify-between ${CARD_SPAN[p.id]} ${CARD_HEIGHT[p.id]} transition-colors duration-300 overflow-hidden`}
            >
              <div className="p-8 md:p-10">
                <span className="caps-wide text-[11px] text-ember mb-5 block tracking-[0.35em]">
                  {CATEGORY_LABEL[p.id]}
                </span>
                <h2 className="font-display italic font-bold text-5xl md:text-6xl text-text group-hover:text-ember transition-colors duration-300 leading-none mb-5">
                  {p.name}
                </h2>
                <p className="font-label text-[10px] text-text-muted tracking-wide uppercase">
                  {GOAL_LABEL[p.id]}
                </p>
              </div>

              <div className="p-8 md:p-10 pt-0">
                <p className="text-text-muted text-sm leading-relaxed font-light mb-5 max-w-xs">
                  {p.description}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display italic font-bold text-xl text-ember/70 group-hover:text-ember transition-colors duration-300">
                    {p.durationMin}
                  </span>
                  <span className="caps-tight text-[11px] text-text-muted/60">
                    min
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-20 md:mt-28">
          <p className="font-display italic text-lg text-text-dim max-w-lg leading-relaxed">
            &ldquo;The breath is the only part of the autonomic nervous system
            that we can control. By changing the breath, we change the
            mind.&rdquo;
          </p>
        </footer>
      </section>
    </AppShell>
  );
}
