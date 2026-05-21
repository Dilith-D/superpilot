import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  Search,
  Filter,
  Plus,
  AlertTriangle,
  Flame,
  Pause,
  CheckCircle2,
} from "lucide-react";
import {
  deals,
  getContact,
  formatCurrency,
  pipelineTotal,
  weightedTotal,
  type Deal,
  type DealStage,
  type DealHealth,
} from "@/lib/crm-data";
import { getDealLogo } from "@/lib/crm-logos";

const PINNED_ID = "acme-corp";

export const Route = createFileRoute("/_app/crm/deals/")({
  component: DealsListPage,
});

const STAGE_ORDER: DealStage[] = [
  "Discovery",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
];

type SortKey = "amount" | "company" | "closeDate" | "probability";

function DealsListPage() {
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<DealStage | "All">("All");
  const [sortKey, setSortKey] = useState<SortKey>("amount");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    let rows = deals.filter((d) => {
      if (stageFilter !== "All" && d.stage !== stageFilter) return false;
      if (query) {
        const q = query.toLowerCase();
        const contact = getContact(d.primaryContactId);
        return (
          d.company.toLowerCase().includes(q) ||
          d.industry.toLowerCase().includes(q) ||
          contact?.name.toLowerCase().includes(q)
        );
      }
      return true;
    });
    rows = rows.slice().sort((a, b) => {
      // Always pin Acme to the top
      if (a.id === PINNED_ID && b.id !== PINNED_ID) return -1;
      if (b.id === PINNED_ID && a.id !== PINNED_ID) return 1;
      const dir = sortDir === "asc" ? 1 : -1;
      switch (sortKey) {
        case "amount":
          return (a.amount - b.amount) * dir;
        case "company":
          return a.company.localeCompare(b.company) * dir;
        case "probability":
          return (a.probability - b.probability) * dir;
        case "closeDate":
          return (
            (new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime()) *
            dir
          );
      }
    });
    return rows;
  }, [query, stageFilter, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  return (
    <div className="px-8 py-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <header className="flex items-end justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
            Pipeline
          </p>
          <h1 className="text-3xl font-display font-medium tracking-tight">Deals</h1>
          <p className="text-sm text-text-secondary">
            {deals.length} deals · {formatCurrency(pipelineTotal)} open ·{" "}
            <span className="text-sp">{formatCurrency(weightedTotal)}</span> weighted
          </p>
        </div>
        <button className="flex items-center gap-2 bg-sp text-zinc-950 text-sm font-medium px-4 py-2 rounded-md hover:brightness-110 shadow-[0_0_24px_var(--sp-glow)] transition-all">
          <Plus className="size-4" />
          New deal
        </button>
      </header>

      {/* Pipeline by stage strip */}
      <section className="grid grid-cols-2 md:grid-cols-6 gap-px bg-border-default border border-border-default rounded-lg overflow-hidden">
        {STAGE_ORDER.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage);
          const total = stageDeals.reduce((s, d) => s + d.amount, 0);
          const active = stageFilter === stage;
          return (
            <button
              key={stage}
              onClick={() => setStageFilter(active ? "All" : stage)}
              className={`text-left p-3 transition-colors ${
                active
                  ? "bg-surface-sp"
                  : "bg-surface-card hover:bg-surface-card/60"
              }`}
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-muted">
                {stage}
              </p>
              <p className="text-lg font-display font-medium text-text-primary tabular-nums mt-1">
                {stageDeals.length}
              </p>
              <p className="text-[10px] font-mono text-text-secondary tabular-nums">
                {formatCurrency(total)}
              </p>
            </button>
          );
        })}
      </section>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="size-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search company, contact, industry…"
            className="w-full bg-surface-card border border-border-default rounded-md pl-9 pr-3 py-2 text-sm placeholder:text-text-muted focus:outline-none focus:border-sp focus:ring-2 focus:ring-sp/30 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-text-secondary hover:text-text-primary bg-surface-card border border-border-default rounded-md px-3 py-2 transition-colors">
          <Filter className="size-3.5" />
          {stageFilter === "All" ? "All stages" : stageFilter}
        </button>
        <span className="text-xs font-mono text-text-muted ml-auto">
          {filtered.length} of {deals.length}
        </span>
      </div>

      {/* Table */}
      <div className="border border-border-default rounded-lg overflow-hidden bg-surface-card">
        <table className="w-full text-sm">
          <thead className="bg-surface-base">
            <tr className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-muted text-left">
              <Th label="Deal" onClick={() => toggleSort("company")} active={sortKey === "company"} dir={sortDir} />
              <Th label="Stage" />
              <Th label="Health" />
              <Th label="Amount" onClick={() => toggleSort("amount")} active={sortKey === "amount"} dir={sortDir} align="right" />
              <Th label="Probability" onClick={() => toggleSort("probability")} active={sortKey === "probability"} dir={sortDir} align="right" />
              <Th label="Close" onClick={() => toggleSort("closeDate")} active={sortKey === "closeDate"} dir={sortDir} />
              <Th label="Last touch" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <DealRow key={d.id} deal={d} />
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-12 text-text-muted text-sm">
                  No deals match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({
  label,
  onClick,
  active,
  dir,
  align,
}: {
  label: string;
  onClick?: () => void;
  active?: boolean;
  dir?: "asc" | "desc";
  align?: "right";
}) {
  return (
    <th
      className={`px-4 py-3 font-mono font-normal ${align === "right" ? "text-right" : ""} ${
        onClick ? "cursor-pointer hover:text-text-primary transition-colors" : ""
      }`}
      onClick={onClick}
    >
      <span className={`inline-flex items-center gap-1 ${align === "right" ? "flex-row-reverse" : ""}`}>
        {label}
        {onClick && (
          <ArrowUpDown
            className={`size-3 ${active ? "text-sp" : "text-text-muted"} ${
              active && dir === "asc" ? "rotate-180" : ""
            } transition-transform`}
          />
        )}
      </span>
    </th>
  );
}

function DealRow({ deal }: { deal: Deal }) {
  const contact = getContact(deal.primaryContactId);
  return (
    <tr className="border-t border-border-default/80 hover:bg-surface-sp/40 group transition-colors">
      <td className="px-4 py-3">
        <Link
          to="/crm/deals/$dealId"
          params={{ dealId: deal.id }}
          className="flex items-center gap-3 min-w-0"
        >
          <Logo dealId={deal.id} seed={deal.logoSeed} />
          <div className="min-w-0">
            <p className="text-text-primary font-medium truncate group-hover:text-sp transition-colors">
              {deal.company}
            </p>
            <p className="text-[10px] font-mono text-text-muted truncate">
              {deal.industry} · {contact?.name}
            </p>
          </div>
        </Link>
      </td>
      <td className="px-4 py-3">
        <StageBadge stage={deal.stage} />
      </td>
      <td className="px-4 py-3">
        <HealthBadge health={deal.health} />
      </td>
      <td className="px-4 py-3 text-right tabular-nums text-text-primary font-medium">
        {formatCurrency(deal.amount)}
      </td>
      <td className="px-4 py-3 text-right tabular-nums">
        <ProbabilityBar value={deal.probability} />
      </td>
      <td className="px-4 py-3 font-mono text-xs text-text-secondary">
        {deal.closeDate}
      </td>
      <td className="px-4 py-3 font-mono text-xs text-text-muted">
        {deal.lastTouch}
      </td>
    </tr>
  );
}

function Logo({ dealId, seed }: { dealId: string; seed: string }) {
  const src = getDealLogo(dealId);
  return (
    <div className="size-8 rounded-md flex items-center justify-center shrink-0 border border-border-default bg-white overflow-hidden">
      {src ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          width={32}
          height={32}
          className="size-full object-contain p-0.5"
        />
      ) : (
        <span className="text-[10px] font-mono font-medium text-zinc-900 tracking-wider">
          {seed}
        </span>
      )}
    </div>
  );
}

function StageBadge({ stage }: { stage: DealStage }) {
  return (
    <span className="inline-flex items-center text-[10px] font-mono uppercase tracking-[0.14em] text-text-secondary border border-border-default rounded px-2 py-0.5">
      {stage}
    </span>
  );
}

function HealthBadge({ health }: { health: DealHealth }) {
  const map: Record<DealHealth, { label: string; icon: React.ReactNode; color: string }> = {
    hot: { label: "Hot", icon: <Flame className="size-3" />, color: "var(--sp)" },
    "on-track": { label: "On track", icon: <CheckCircle2 className="size-3" />, color: "var(--info)" },
    "at-risk": { label: "At risk", icon: <AlertTriangle className="size-3" />, color: "var(--amber)" },
    stalled: { label: "Stalled", icon: <Pause className="size-3" />, color: "var(--danger)" },
    momentum: { label: "Momentum", icon: <CheckCircle2 className="size-3" />, color: "var(--sp)" },
    "action-needed": { label: "Action needed", icon: <AlertTriangle className="size-3" />, color: "var(--amber)" },
    won: { label: "Won", icon: <CheckCircle2 className="size-3" />, color: "var(--sp)" },
  };
  const m = map[health];
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.14em]"
      style={{ color: m.color }}
    >
      {m.icon}
      {m.label}
    </span>
  );
}

function ProbabilityBar({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-2 w-full justify-end">
      <span className="h-1 w-16 rounded-full bg-border-default overflow-hidden">
        <span
          className="block h-full rounded-full bg-sp"
          style={{ width: `${value}%` }}
        />
      </span>
      <span className="text-xs font-mono text-text-secondary tabular-nums w-8 text-right">
        {value}%
      </span>
    </span>
  );
}
