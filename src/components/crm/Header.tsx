import { useRouterState, Link } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";
import { inboxUnreadCount } from "@/lib/crm-data";

const dealNames: Record<string, string> = {
  "acme-corp": "Acme Corp",
  "techventures": "TechVentures",
  "buildfast": "Buildfast",
  "novapay": "NovaPay",
  "fincore-systems": "FinCore Systems",
  "databridge": "DataBridge",
};

const contactNames: Record<string, string> = {
  "priya-mehta": "Priya Mehta",
  "rohan-shah": "Rohan Shah",
  "rahul-nair": "Rahul Nair",
  "sneha-pillai": "Sneha Pillai",
  "vikram-shetty": "Vikram Shetty",
  "anita-rao": "Anita Rao",
  "karan-mehta": "Karan Mehta",
  "aditya-kumar": "Aditya Kumar",
  "pooja-singh": "Pooja Singh",
  "mohit-jain": "Mohit Jain",
};

const sectionLabels: Record<string, string> = {
  "": "Home",
  briefing: "Briefing",
  deals: "Deals",
  contacts: "Contacts",
  tasks: "Tasks",
};

function useCrumbs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "crm") return [] as { label: string; to?: string }[];

  const section = parts[1] ?? "";
  const sectionLabel = sectionLabels[section] ?? section;
  const crumbs: { label: string; to?: string }[] = [
    { label: sectionLabel, to: section ? `/crm/${section}` : "/crm" },
  ];

  if (parts[1] === "deals" && parts[2]) {
    crumbs.push({ label: dealNames[parts[2]] ?? parts[2] });
  } else if (parts[1] === "contacts" && parts[2]) {
    crumbs.push({ label: contactNames[parts[2]] ?? parts[2] });
  }
  return crumbs;
}

function todayLabel() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function Header() {
  const crumbs = useCrumbs();
  const isHome = crumbs.length === 1 && crumbs[0].label === "Home";

  return (
    <header className="sticky top-0 z-30 h-14 flex items-center gap-6 pl-8 pr-6 bg-[var(--surface-base)]/85 backdrop-blur-md border-b border-[var(--border-default)]">
      <nav className="flex items-center gap-2 text-sm min-w-0">
        {crumbs.map((c, i) => (
          <div key={i} className="flex items-center gap-2 min-w-0">
            {i > 0 && <span className="text-[var(--text-muted)] text-xs">/</span>}
            {c.to && i < crumbs.length - 1 ? (
              <Link
                to={c.to}
                className="font-display text-[15px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors truncate"
              >
                {c.label}
              </Link>
            ) : (
              <span className="font-display text-[15px] text-[var(--text-primary)] truncate">
                {c.label}
              </span>
            )}
          </div>
        ))}
        {isHome && (
          <span className="ml-3 text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {todayLabel()}
          </span>
        )}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => window.dispatchEvent(new Event("superpilot:replay-tour"))}
          className="text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--text-muted)] hover:text-[var(--text-primary)] px-2 py-1 rounded border border-[var(--border-default)] transition-colors"
        >
          Tour
        </button>
        <button
          className="relative size-8 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-sidebar)] transition-colors"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          {inboxUnreadCount > 0 && (
            <span className="absolute -top-1 -right-1 size-4 rounded-full bg-sp text-[9px] text-zinc-950 font-bold grid place-items-center">
              {inboxUnreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => window.dispatchEvent(new Event("superpilot:open-command"))}
          className="group flex items-center gap-2 h-8 px-3 rounded-full bg-[var(--surface-sidebar)] border border-[var(--border-default)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]/30 transition-colors"
          aria-label="Search"
        >
          <Search className="size-3.5" strokeWidth={2} />
          <span className="text-xs">Search</span>
          <kbd className="text-[10px] font-mono text-[var(--text-muted)] bg-white border border-[var(--border-default)] rounded px-1.5 py-px">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
}
