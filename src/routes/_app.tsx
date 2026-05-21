import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/crm/Sidebar";
import { Header } from "@/components/crm/Header";
import { CommandBar } from "@/components/crm/CommandBar";
import { GuidedTour } from "@/components/crm/GuidedTour";
import { getSession } from "@/lib/session";

export const Route = createFileRoute("/_app")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (!getSession()) throw redirect({ to: "/login" });
  },
  component: AppShell,
});

function AppShell() {
  return (
    <div className="min-h-screen flex bg-[var(--surface-base)] text-[var(--text-primary)]">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Header />
        <main className="flex-1 min-w-0 animate-fade-in">
          <Outlet />
        </main>
      </div>
      <CommandBar />
      <GuidedTour />
    </div>
  );
}

