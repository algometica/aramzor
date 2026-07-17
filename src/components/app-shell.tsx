import { SiteHeader } from "./site-header";

export async function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-bg">
      <SiteHeader variant="app" />
      <main className="flex-1 flex flex-col pb-[max(2rem,env(safe-area-inset-bottom))]">
        {children}
      </main>
    </div>
  );
}
