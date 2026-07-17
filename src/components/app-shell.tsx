import { SiteHeader } from "./site-header";

export async function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip bg-bg">
      <SiteHeader variant="app" />
      <main
        id="main-content"
        className="flex flex-1 flex-col pb-[max(2rem,env(safe-area-inset-bottom))]"
      >
        {children}
      </main>
    </div>
  );
}
