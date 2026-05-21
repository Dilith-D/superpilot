import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, ArrowRight, Sparkles, FileText, User, Briefcase, CheckSquare } from "lucide-react";
import { deals, contacts, tasks } from "@/lib/crm-data";

type Item = {
  id: string;
  group: "Jump to" | "Draft" | "Ask";
  label: string;
  hint?: string;
  icon: typeof Search;
  run: () => void;
};

export function CommandBar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("superpilot:open-command", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("superpilot:open-command", onOpen as EventListener);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
    }
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const close = () => setOpen(false);
    const go = (to: string, params?: Record<string, string>) => () => {
      close();
      navigate({ to, params } as never);
    };

    const jump: Item[] = [
      { id: "j-briefing", group: "Jump to", label: "Daily briefing", icon: FileText, run: go("/crm/briefing") },
      { id: "j-deals", group: "Jump to", label: "Deals", icon: Briefcase, run: go("/crm/deals") },
      { id: "j-contacts", group: "Jump to", label: "Contacts", icon: User, run: go("/crm/contacts") },
      { id: "j-tasks", group: "Jump to", label: "Tasks", icon: CheckSquare, run: go("/crm/tasks") },
      ...deals.map<Item>((d) => ({
        id: `d-${d.id}`,
        group: "Jump to",
        label: d.company,
        hint: `${d.stage} · $${(d.amount / 1000).toFixed(0)}k`,
        icon: Briefcase,
        run: go("/crm/deals/$dealId", { dealId: d.id }),
      })),
      ...contacts.map<Item>((c) => ({
        id: `c-${c.id}`,
        group: "Jump to",
        label: c.name,
        hint: `${c.title} · ${c.company}`,
        icon: User,
        run: go("/crm/contacts/$contactId", { contactId: c.id }),
      })),
    ];

    const draft: Item[] = q
      ? [
          { id: "draft-email", group: "Draft", label: `Draft email about "${q}"`, icon: Sparkles, run: close },
          { id: "draft-followup", group: "Draft", label: `Draft follow-up: "${q}"`, icon: Sparkles, run: close },
        ]
      : [];

    const ask: Item[] = q
      ? [{ id: "ask", group: "Ask", label: `Ask SuperPilot: "${q}"`, icon: Sparkles, run: close }]
      : [];

    const query = q.trim().toLowerCase();
    const filteredJump = query
      ? jump.filter((i) => i.label.toLowerCase().includes(query) || i.hint?.toLowerCase().includes(query))
      : jump.slice(0, 6);

    return [...filteredJump, ...draft, ...ask];
  }, [q, navigate]);

  useEffect(() => {
    if (active >= items.length) setActive(0);
  }, [items, active]);

  if (!open) return null;

  const groups = items.reduce<Record<string, Item[]>>((acc, it) => {
    (acc[it.group] ||= []).push(it);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh] px-4">
      <div
        className="absolute inset-0 bg-[var(--text-primary)]/20 backdrop-blur-[2px] animate-fade-in"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-xl rounded-2xl bg-[var(--surface-card)] border border-[var(--border-default)] shadow-[0_30px_80px_-20px_rgba(15,23,42,0.18)] animate-scale-in overflow-hidden">
        <div className="flex items-center gap-3 px-4 h-12 border-b border-[var(--border-default)]">
          <Search className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, items.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                items[active]?.run();
              }
            }}
            placeholder="Jump to, draft, or ask SuperPilot…"
            className="flex-1 bg-transparent outline-none text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
          <kbd className="text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border-default)] rounded px-1.5 py-px">
            esc
          </kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto py-2">
          {items.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">No matches.</div>
          )}
          {Object.entries(groups).map(([group, list]) => (
            <div key={group} className="pb-2">
              <div className="px-4 pt-2 pb-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {group}
              </div>
              {list.map((it) => {
                const idx = items.indexOf(it);
                const isActive = idx === active;
                const Icon = it.icon;
                return (
                  <button
                    key={it.id}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => it.run()}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-[var(--surface-sidebar)] text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)]"
                    }`}
                  >
                    <Icon className={`size-4 ${isActive ? "text-[var(--sp)]" : "text-[var(--text-muted)]"}`} strokeWidth={2} />
                    <span className="flex-1 truncate">{it.label}</span>
                    {it.hint && (
                      <span className="text-[11px] font-mono text-[var(--text-muted)] truncate">{it.hint}</span>
                    )}
                    {isActive && <ArrowRight className="size-3.5 text-[var(--sp)]" strokeWidth={2} />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 px-4 h-9 border-t border-[var(--border-default)] text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--text-muted)]">
          <span>SuperPilot</span>
          <span>↑↓ navigate · ↵ select</span>
        </div>
      </div>
    </div>
  );
}
