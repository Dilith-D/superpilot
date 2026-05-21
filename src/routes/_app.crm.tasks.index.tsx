import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Search,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Flame,
  Calendar,
  ArrowRight,
  Filter,
  Plus,
  Clock,
  Check,
  Flag,
} from "lucide-react";
import { tasks, type Task, type TaskKind, type TaskPriority } from "@/lib/crm-data";
import { getDealLogo } from "@/lib/crm-logos";

export const Route = createFileRoute("/_app/crm/tasks/")({
  component: TasksPage,
});

function TasksPage() {
  const [query, setQuery] = useState("");
  const [kindFilter, setKindFilter] = useState<TaskKind | "All">("All");
  const [statusFilter, setStatusFilter] = useState<"open" | "done" | "all">("open");
  const [dueFilter, setDueFilter] = useState<Task["dueGroup"] | "all">("all");

  const [taskList, setTaskList] = useState(tasks);

  const filtered = useMemo(() => {
    let rows = taskList.filter((t) => {
      if (statusFilter === "open" && t.status !== "open") return false;
      if (statusFilter === "done" && t.status !== "done") return false;
      if (kindFilter !== "All" && t.kind !== kindFilter) return false;
      if (dueFilter !== "all" && t.dueGroup !== dueFilter) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          t.headline.toLowerCase().includes(q) ||
          t.dealLabel.toLowerCase().includes(q) ||
          (t.contactLabel?.toLowerCase() ?? "").includes(q)
        );
      }
      return true;
    });
    // Sort: today first, then this-week, then later; within group, critical first
    const groupOrder = { today: 0, "this-week": 1, later: 2 };
    const prioOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return rows.sort((a, b) => {
      const g = groupOrder[a.dueGroup] - groupOrder[b.dueGroup];
      if (g !== 0) return g;
      return prioOrder[a.priority] - prioOrder[b.priority];
    });
  }, [taskList, statusFilter, kindFilter, dueFilter, query]);

  const counts = useMemo(() => {
    const open = taskList.filter((t) => t.status === "open");
    return {
      today: open.filter((t) => t.dueGroup === "today").length,
      week: open.filter((t) => t.dueGroup === "this-week").length,
      later: open.filter((t) => t.dueGroup === "later").length,
      done: taskList.filter((t) => t.status === "done").length,
    };
  }, [taskList]);

  function toggleStatus(id: string) {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === "done" ? "open" : "done" } : t)),
    );
  }

  return (
    <div className="px-8 py-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <header className="flex items-end justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
            Actions
          </p>
          <h1 className="text-3xl font-display font-medium tracking-tight">
            Tasks
          </h1>
          <p className="text-sm text-text-secondary">
            {counts.today} due today · {counts.week} this week · {counts.later} later · {counts.done} completed
          </p>
        </div>
        <button className="flex items-center gap-2 bg-sp text-zinc-950 text-sm font-medium px-4 py-2 rounded-md hover:brightness-110 shadow-[0_0_24px_var(--sp-glow)] transition-all">
          <Plus className="size-4" />
          New task
        </button>
      </header>

      {/* Due group strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border-default border border-border-default rounded-lg overflow-hidden">
        <DueCard
          label="Due today"
          count={counts.today}
          active={statusFilter === "open" && dueFilter === "today"}
          icon={<Clock className="size-3.5" />}
          onClick={() => { setStatusFilter("open"); setDueFilter("today"); setKindFilter("All"); setQuery(""); }}
        />
        <DueCard
          label="This week"
          count={counts.week}
          active={statusFilter === "open" && dueFilter === "this-week"}
          icon={<Calendar className="size-3.5" />}
          onClick={() => { setStatusFilter("open"); setDueFilter("this-week"); setKindFilter("All"); setQuery(""); }}
        />
        <DueCard
          label="Later"
          count={counts.later}
          active={statusFilter === "open" && dueFilter === "later"}
          icon={<Flag className="size-3.5" />}
          onClick={() => { setStatusFilter("open"); setDueFilter("later"); setKindFilter("All"); setQuery(""); }}
        />
        <DueCard
          label="Completed"
          count={counts.done}
          active={statusFilter === "done"}
          icon={<Check className="size-3.5" />}
          onClick={() => { setStatusFilter("done"); setDueFilter("all"); setKindFilter("All"); setQuery(""); }}
        />
      </section>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="size-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search task, deal, contact…"
            className="w-full bg-surface-card border border-border-default rounded-md pl-9 pr-3 py-2 text-sm placeholder:text-text-muted focus:outline-none focus:border-sp focus:ring-2 focus:ring-sp/30 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1 bg-surface-card border border-border-default rounded-md p-1">
          <FilterPill label="All" active={kindFilter === "All"} onClick={() => setKindFilter("All")} />
          <FilterPill label="Commitment" active={kindFilter === "commitment"} onClick={() => setKindFilter("commitment")} />
          <FilterPill label="Follow-up" active={kindFilter === "follow-up"} onClick={() => setKindFilter("follow-up")} />
          <FilterPill label="Risk" active={kindFilter === "risk"} onClick={() => setKindFilter("risk")} />
          <FilterPill label="Next step" active={kindFilter === "next-step"} onClick={() => setKindFilter("next-step")} />
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setStatusFilter("open")}
            className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-[0.14em] transition-colors ${
              statusFilter === "open" ? "bg-surface-sp text-text-primary" : "text-text-muted hover:text-text-primary"
            }`}
          >
            Open
          </button>
          <button
            onClick={() => setStatusFilter("done")}
            className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-[0.14em] transition-colors ${
              statusFilter === "done" ? "bg-surface-sp text-text-primary" : "text-text-muted hover:text-text-primary"
            }`}
          >
            Done
          </button>
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-[0.14em] transition-colors ${
              statusFilter === "all" ? "bg-surface-sp text-text-primary" : "text-text-muted hover:text-text-primary"
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((t) => (
          <TaskRow key={t.id} task={t} onToggle={() => toggleStatus(t.id)} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-sm text-text-muted">
            No tasks match your filters.
          </div>
        )}
      </div>
    </div>
  );
}

function DueCard({
  label,
  count,
  active,
  icon,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-3 transition-colors ${
        active ? "bg-surface-sp" : "bg-surface-card hover:bg-surface-card/60"
      }`}
    >
      <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-muted flex items-center gap-1.5">
        {icon}
        {label}
      </p>
      <p className="text-2xl font-display font-medium text-text-primary tabular-nums mt-1">
        {count}
      </p>
    </button>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-[0.14em] transition-colors whitespace-nowrap ${
        active ? "bg-surface-sp text-text-primary" : "text-text-muted hover:text-text-primary"
      }`}
    >
      {label}
    </button>
  );
}

function TaskRow({ task, onToggle }: { task: Task; onToggle: () => void }) {
  const logo = getDealLogo(task.dealId);
  const isDone = task.status === "done";

  return (
    <div
      className={`group flex items-start gap-4 bg-surface-card border border-border-default rounded-lg p-4 transition-all ${
        isDone ? "opacity-50" : "hover:border-sp/40 hover:bg-surface-sp/20"
      }`}
    >
      <button
        onClick={onToggle}
        className={`mt-0.5 shrink-0 size-5 rounded border flex items-center justify-center transition-colors ${
          isDone
            ? "bg-sp border-sp text-zinc-950"
            : "border-border-default hover:border-sp text-transparent hover:text-sp"
        }`}
      >
        <CheckCircle2 className="size-3.5" />
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className={`text-sm font-medium truncate ${isDone ? "line-through text-text-muted" : "text-text-primary"}`}>
                {task.headline}
              </p>
              <PriorityBadge p={task.priority} />
              <KindBadge kind={task.kind} />
            </div>
            <p className={`text-xs mt-0.5 leading-relaxed ${isDone ? "text-text-muted" : "text-text-secondary"}`}>
              {task.detail}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2 text-[10px] font-mono uppercase tracking-[0.14em] text-text-muted">
          <Link
            to="/crm/deals/$dealId"
            params={{ dealId: task.dealId }}
            className="inline-flex items-center gap-1.5 hover:text-sp transition-colors"
          >
            {logo && (
              <div className="size-4 rounded-sm bg-white overflow-hidden border border-border-default">
                <img src={logo} alt="" loading="lazy" className="size-full object-contain p-[1px]" />
              </div>
            )}
            <span className="truncate max-w-[140px]">{task.dealLabel}</span>
          </Link>
          {task.contactLabel && (
            <>
              <span>·</span>
              <Link
                to="/crm/contacts/$contactId"
                params={{ contactId: task.dealId /* best effort */ }}
                className="hover:text-sp transition-colors truncate max-w-[140px]"
              >
                {task.contactLabel}
              </Link>
            </>
          )}
          <span className="ml-auto flex items-center gap-1">
            {task.dueGroup === "today" ? (
              <>
                <Flame className="size-3 text-sp" /> Today
              </>
            ) : task.dueGroup === "this-week" ? (
              <>
                <Calendar className="size-3 text-text-muted" /> This week
              </>
            ) : (
              <>
                <Flag className="size-3 text-text-muted" /> Later
              </>
            )}
          </span>
        </div>
      </div>

      <Link
        to="/crm/deals/$dealId"
        params={{ dealId: task.dealId }}
        className="shrink-0 text-text-muted hover:text-sp transition-colors mt-1"
      >
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

function PriorityBadge({ p }: { p: TaskPriority }) {
  const map = {
    critical: { label: "Critical", color: "var(--danger)" },
    high: { label: "High", color: "var(--amber)" },
    medium: { label: "Med", color: "var(--text-muted)" },
    low: { label: "Low", color: "var(--info)" },
  } as const;
  const m = map[p];
  return (
    <span
      className="inline-flex items-center text-[10px] font-mono uppercase tracking-[0.14em] px-1.5 py-0.5 rounded border"
      style={{ color: m.color, borderColor: `color-mix(in oklab, ${m.color} 30%, transparent)` }}
    >
      {m.label}
    </span>
  );
}

function KindBadge({ kind }: { kind: TaskKind }) {
  const map = {
    commitment: { label: "Commitment", icon: <Check className="size-2.5" /> },
    "follow-up": { label: "Follow-up", icon: <ArrowRight className="size-2.5" /> },
    risk: { label: "Risk", icon: <AlertTriangle className="size-2.5" /> },
    "next-step": { label: "Next step", icon: <Calendar className="size-2.5" /> },
    note: { label: "Note", icon: <Circle className="size-2.5" /> },
  } as const;
  const m = map[kind];
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.14em] text-text-muted">
      {m.icon}
      {m.label}
    </span>
  );
}
