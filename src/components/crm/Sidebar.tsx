import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Home,
  Briefcase,
  Users,
  CheckSquare,
  Sun,
  LogOut,
  Settings,
  Cpu,
  TrendingUp,
  GitBranch,
  Target,
  Globe,
} from "lucide-react";
import { signOut } from "@/lib/session";
import { openTaskCount } from "@/lib/crm-data";

type NavItem = {
  to: string;
  label: string;
  icon: typeof Home;
  exact: boolean;
  badge?: number;
};

const coreNav: NavItem[] = [
  { to: "/crm", label: "Home", icon: Home, exact: true },
  { to: "/crm/briefing", label: "Briefing", icon: Sun, exact: false },
  { to: "/crm/deals", label: "Deals", icon: Briefcase, exact: false },
  { to: "/crm/contacts", label: "Contacts", icon: Users, exact: false },
  { to: "/crm/tasks", label: "Tasks", icon: CheckSquare, exact: false, badge: openTaskCount },
];

const spNav: NavItem[] = [
  { to: "/crm/roi", label: "ROI", icon: TrendingUp, exact: false },
  { to: "/crm/roadmap", label: "Roadmap", icon: GitBranch, exact: false },
  { to: "/crm/gtm", label: "GTM", icon: Target, exact: false },
  { to: "/crm/industries", label: "Industries", icon: Globe, exact: false },
  { to: "/crm/architecture", label: "Architecture", icon: Cpu, exact: false },
];

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      className="group relative size-9 grid place-items-center rounded-[10px] transition-colors"
      title={item.label}
    >
      <span
        className={`absolute inset-0 rounded-[10px] transition-colors ${
          active ? "bg-[var(--surface-sp)]" : "group-hover:bg-[var(--surface-sidebar)]"
        }`}
        aria-hidden
      />
      <Icon
        className={`relative size-[18px] transition-colors ${
          active ? "text-[var(--sp)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
        }`}
        strokeWidth={1.75}
      />
      {item.badge && item.badge > 0 ? (
        <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[var(--sp)] text-[9px] font-medium text-white grid place-items-center tabular-nums">
          {item.badge}
        </span>
      ) : null}
      <span className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-[var(--text-primary)] px-2 py-1 text-[11px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-md">
        {item.label}
      </span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  return (
    <aside className="w-14 shrink-0 h-screen sticky top-0 flex flex-col items-center bg-[var(--surface-sidebar)] border-r border-[var(--border-default)]">
      {/* Brand */}
      <Link
        to="/crm"
        className="mt-3 mb-6 size-9 rounded-[10px] bg-[var(--text-primary)] grid place-items-center"
        aria-label="SuperPilot"
      >
        <span className="text-[10px] font-mono font-semibold text-white tracking-tight">SP</span>
      </Link>

      {/* Core nav group */}
      <nav className="flex flex-col items-center gap-1.5">
        {coreNav.map((item) => <NavLink key={item.to} item={item} pathname={pathname} />)}
      </nav>

      {/* Divider */}
      <div className="w-6 h-px bg-[var(--border-default)] my-2" />

      {/* SuperPilot status */}
      <div
        className="relative size-9 grid place-items-center rounded-[10px]"
        title="SuperPilot Active"
      >
        <span className="text-[9px] font-mono font-bold text-sp">SP</span>
        <span className="absolute top-1 right-1 size-1.5 rounded-full bg-emerald-400">
          <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
        </span>
      </div>

      {/* Divider */}
      <div className="w-6 h-px bg-[var(--border-default)] my-2" />

      {/* SuperPilot intelligence pages group */}
      <nav className="flex-1 flex flex-col items-center gap-1.5">
        {spNav.map((item) => <NavLink key={item.to} item={item} pathname={pathname} />)}
      </nav>

      {/* Profile + sign out */}
      <div className="mb-3 flex flex-col items-center gap-1.5">
        <button
          className="size-9 grid place-items-center rounded-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-sp)] transition-colors"
          aria-label="Settings"
          title="Settings"
        >
          <Settings className="size-[17px]" strokeWidth={1.75} />
        </button>
        <button
          onClick={() => {
            signOut();
            navigate({ to: "/" });
          }}
          className="size-9 grid place-items-center rounded-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-sp)] transition-colors"
          aria-label="Sign out"
          title="Sign out"
        >
          <LogOut className="size-[17px]" strokeWidth={1.75} />
        </button>
        <div
          className="mt-1 size-8 rounded-full bg-[var(--surface-sp)] grid place-items-center text-[10px] font-medium text-[var(--sp)]"
          title="Dilith"
        >
          DI
        </div>
      </div>
    </aside>
  );
}
