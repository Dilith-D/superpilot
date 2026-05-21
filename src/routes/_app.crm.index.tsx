import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  FileSignature,
  Sparkles,
  TrendingUp,
  Mail,
  Calendar,
  Eye,
  FileText,
} from "lucide-react";
import {
  deals,
  intelFeed,
  tasks,
  getDeal,
  getContact,
  formatCurrency,
  pipelineTotal,
  weightedTotal,
  type IntelCard,
} from "@/lib/crm-data";
import { DraftModal } from "@/components/crm/DraftModal";

export const Route = createFileRoute("/_app/crm/")({
  component: CrmHomePage,
});

function CrmHomePage() {
  const [openCard, setOpenCard] = useState<IntelCard | null>(null);
  const [timeFilter, setTimeFilter] = useState<"today" | "week">("today");
  const navigate = useNavigate();

  const openDeals = deals.filter(
    (d) => d.stage !== "Closed Won" && d.stage !== "Closed Lost",
  );
  const atRisk = deals.filter((d) => d.health === "at-risk" || d.health === "stalled").length;

  const isTodayCard = (c: IntelCard) =>
    c.timestamp.includes("h ago") || c.timestamp === "Yesterday" || c.timestamp.includes("min");
  const visibleFeed = timeFilter === "today" ? intelFeed.filter(isTodayCard) : intelFeed;

  const scopedCommitments = visibleFeed.filter((i) => i.kind === "commitment").length;
  const scopedRisks = visibleFeed.filter((i) => i.kind === "risk").length;
  const scopedSignals = visibleFeed.filter((i) => i.kind === "signal").length;
  const scopedNextSteps = visibleFeed.filter((i) => i.kind === "next-step").length;

  const scopeLabel = timeFilter === "today" ? "today" : "this week";

  function handleCta(card: IntelCard) {
    if (card.cta.verb === "open") {
      navigate({ to: "/crm/deals/$dealId", params: { dealId: card.dealId } });
      return;
    }
    setOpenCard(card);
  }

  return (
    <div className="px-8 py-8 max-w-[1400px] mx-auto space-y-8">
      {/* Greeting */}
      <header className="flex items-end justify-between flex-wrap gap-6">
        <div className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sp">
            ✦ SuperPilot · {todayLabel()}
          </p>
          <h1 className="text-3xl font-display font-medium tracking-tight">
            Good morning, Dilith.
          </h1>
          <p className="text-sm text-text-secondary max-w-xl">
            <span className="text-text-primary">{scopedCommitments}</span>{" "}
            {scopedCommitments === 1 ? "commitment" : "commitments"} to keep {scopeLabel},{" "}
            <span className="text-amber">
              {scopedRisks} {scopedRisks === 1 ? "deal" : "deals"} drifting
            </span>
            , and{" "}
            <span className="text-sp">
              {scopedSignals} buying {scopedSignals === 1 ? "signal" : "signals"}
            </span>{" "}
            you'll want to act on.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTimeFilter("today")}
            className={`text-xs font-mono uppercase tracking-[0.16em] rounded-md px-3 py-2 transition-colors ${
              timeFilter === "today"
                ? "text-text-primary border border-border-default"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeFilter("week")}
            className={`text-xs font-mono uppercase tracking-[0.16em] rounded-md px-3 py-2 transition-colors ${
              timeFilter === "week"
                ? "text-text-primary border border-border-default"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            This week
          </button>
        </div>
      </header>

      {/* KPI strip — scoped to today/week */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {timeFilter === "today" ? (
          <>
            <Kpi
              label="Signals"
              value={String(visibleFeed.length)}
              delta={`+${visibleFeed.length}`}
              deltaLabel="since 8am"
            />
            <Kpi
              label="Commitments due"
              value={String(scopedCommitments)}
              delta={scopedCommitments > 0 ? "act" : "clear"}
              deltaLabel="next 36h"
              deltaNegative={scopedCommitments > 0}
            />
            <Kpi
              label="Next steps"
              value={String(scopedNextSteps)}
              delta="ready"
              deltaLabel="to schedule"
            />
            <Kpi
              label="Drifting"
              value={String(atRisk)}
              delta={`-${atRisk}`}
              deltaLabel="health drop"
              deltaNegative
            />
          </>
        ) : (
          <>
            <Kpi label="Open pipeline" value={formatCurrency(pipelineTotal)} delta="+8.4%" />
            <Kpi
              label="Weighted forecast"
              value={formatCurrency(weightedTotal)}
              delta="+3.1%"
            />
            <Kpi label="Open deals" value={String(openDeals.length)} delta="0" />
            <Kpi
              label="Avg. health"
              value="72"
              deltaLabel="SuperPilot score"
              delta="-4"
              deltaNegative
            />
          </>
        )}
      </section>

      {/* Two-column */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Intelligence feed — main */}
        <div id="superpilot-feed" className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="size-3.5 text-sp" />
              <h2 className="text-sm font-mono uppercase tracking-[0.18em] text-text-primary">
                Deal intelligence feed
              </h2>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-text-muted">
              {visibleFeed.length} signals · {timeFilter === "today" ? "last 24h" : "last 7 days"}
            </span>
          </div>

          <div className="space-y-3">
            {visibleFeed.map((card) => (
              <IntelRow key={card.id} card={card} onCta={handleCta} />
            ))}
          </div>
        </div>

        {/* Right rail: today's agenda */}
        <aside className="space-y-6">
          <Panel title="Today's agenda">
            <AgendaItem
              time="10:30am"
              title="Discovery — Brightline Health"
              meta="Samir Okafor · 30 min"
              icon={<Calendar className="size-3.5" />}
            />
            <AgendaItem
              time="1:00pm"
              title="MSA redlines — Acme Corp"
              meta="Internal w/ Legal · 45 min"
              icon={<FileSignature className="size-3.5" />}
            />
            <AgendaItem
              time="3:15pm"
              title="Pipeline review"
              meta="Weekly · 30 min"
              icon={<TrendingUp className="size-3.5" />}
            />
          </Panel>

          <Panel title="Top deals by weighted value">
            {deals
              .slice()
              .sort(
                (a, b) =>
                  b.amount * (b.probability / 100) -
                  a.amount * (a.probability / 100),
              )
              .slice(0, 4)
              .map((d) => (
                <Link
                  key={d.id}
                  to="/crm/deals/$dealId"
                  params={{ dealId: d.id }}
                  className="flex items-center justify-between py-2.5 border-b border-border-default/60 last:border-0 hover:bg-surface-card/50 -mx-3 px-3 rounded-sm transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-text-primary truncate">
                      {d.company}
                    </p>
                    <p className="text-[10px] font-mono text-text-muted">
                      {d.stage} · {d.probability}%
                    </p>
                  </div>
                  <span className="text-xs font-mono text-text-secondary tabular-nums">
                    {formatCurrency(d.amount)}
                  </span>
                </Link>
              ))}
          </Panel>
        </aside>
      </section>

      {/* Tasks quick-view */}
      <TasksQuickView />

      {openCard && <DraftModal card={openCard} onClose={() => setOpenCard(null)} />}
    </div>
  );
}

// ---------- pieces ----------

function todayLabel() {
  return new Date("2026-05-20").toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function Kpi({
  label,
  value,
  delta,
  deltaLabel,
  deltaNegative,
}: {
  label: string;
  value: string;
  delta: string;
  deltaLabel?: string;
  deltaNegative?: boolean;
}) {
  return (
    <div className="bg-surface-card border border-border-default rounded-lg p-4 space-y-2">
      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted">
        {label}
      </p>
      <p className="text-2xl font-display font-medium tabular-nums text-text-primary">
        {value}
      </p>
      <p className="text-[10px] font-mono text-text-secondary flex items-center gap-1">
        <span className={deltaNegative ? "text-danger" : "text-sp"}>{delta}</span>
        <span className="text-text-muted">{deltaLabel ?? "vs last week"}</span>
      </p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface-card border border-border-default rounded-lg p-4">
      <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-2">
        {title}
      </h3>
      <div className="space-y-0">{children}</div>
    </div>
  );
}

function AgendaItem({
  time,
  title,
  meta,
  icon,
}: {
  time: string;
  title: string;
  meta: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border-default/60 last:border-0">
      <span className="text-[10px] font-mono text-sp uppercase tracking-[0.14em] pt-0.5 w-14 shrink-0">
        {time}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-text-primary truncate flex items-center gap-1.5">
          <span className="text-text-muted">{icon}</span>
          {title}
        </p>
        <p className="text-[10px] text-text-muted">{meta}</p>
      </div>
    </div>
  );
}

function IntelRow({ card, onCta }: { card: IntelCard; onCta: (card: IntelCard) => void }) {
  const deal = getDeal(card.dealId);
  const contact = deal ? getContact(deal.primaryContactId) : undefined;
  const meta = kindMeta(card.kind);

  return (
    <article className="sp-surface rounded-lg p-4 group hover:shadow-[0_0_36px_var(--sp-glow)] transition-shadow">
      <div className="flex items-start gap-4">
        <div
          className="size-8 rounded-md flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: "color-mix(in oklab, var(--sp) 12%, transparent)" }}
        >
          <span className="text-sp">{meta.icon}</span>
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[10px] font-mono uppercase tracking-[0.18em]"
              style={{ color: meta.color }}
            >
              {meta.label}
            </span>
            <span className="size-1 rounded-full bg-border-default" />
            <Link
              to="/crm/deals/$dealId"
              params={{ dealId: card.dealId }}
              className="text-[10px] font-mono text-text-secondary hover:text-text-primary uppercase tracking-[0.14em] transition-colors"
            >
              {deal?.company}
            </Link>
            {contact && (
              <>
                <span className="size-1 rounded-full bg-border-default" />
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-[0.14em]">
                  {contact.name.split(" ")[0]}
                </span>
              </>
            )}
            <span className="ml-auto text-[10px] font-mono text-text-muted">
              {card.timestamp}
            </span>
          </div>

          <h3 className="text-sm font-medium text-text-primary leading-snug text-pretty">
            {card.headline}
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            {card.detail}
          </p>

          <div className="flex items-center justify-between pt-1">
            <p className="text-[10px] font-mono text-text-muted flex items-center gap-2">
              <span>{card.source}</span>
              <span className="size-1 rounded-full bg-border-default" />
              <span>confidence {card.confidence}%</span>
            </p>
            <button
              onClick={() => onCta(card)}
              className="flex items-center gap-1.5 text-xs font-medium text-sp hover:brightness-125 transition-all"
            >
              {ctaIcon(card.cta.verb)}
              {card.cta.label}
              <ArrowUpRight className="size-3" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function kindMeta(kind: IntelCard["kind"]) {
  switch (kind) {
    case "commitment":
      return { label: "Commitment", icon: <CheckCircle2 className="size-4" />, color: "var(--sp)" };
    case "risk":
      return { label: "Risk", icon: <AlertTriangle className="size-4" />, color: "var(--amber)" };
    case "signal":
      return { label: "Buying signal", icon: <TrendingUp className="size-4" />, color: "var(--info)" };
    case "next-step":
      return { label: "Next step", icon: <CalendarClock className="size-4" />, color: "var(--sp)" };
    case "win":
      return { label: "Win quote", icon: <Sparkles className="size-4" />, color: "var(--sp)" };
  }
}

function ctaIcon(verb: IntelCard["cta"]["verb"]) {
  switch (verb) {
    case "draft":
      return <Mail className="size-3" />;
    case "schedule":
      return <Calendar className="size-3" />;
    case "review":
      return <FileText className="size-3" />;
    case "open":
      return <Eye className="size-3" />;
  }
}

function TasksQuickView() {
  const top4 = tasks
    .filter((t) => t.status === "open")
    .sort((a, b) => {
      const g = { today: 0, "this-week": 1, later: 2 };
      const p = { critical: 0, high: 1, medium: 2, low: 3 };
      return g[a.dueGroup] - g[b.dueGroup] || p[a.priority] - p[b.priority];
    })
    .slice(0, 4);

  const [done, setDone] = useState<Set<string>>(new Set());
  function toggle(id: string) {
    setDone((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-3.5 text-sp" />
          <h2 className="text-sm font-mono uppercase tracking-[0.18em] text-text-primary">
            Open tasks
          </h2>
        </div>
        <Link
          to="/crm/tasks"
          className="text-[10px] font-mono uppercase tracking-[0.16em] text-sp hover:brightness-125 flex items-center gap-1"
        >
          All tasks <ArrowUpRight className="size-3" />
        </Link>
      </div>
      <div className="bg-surface-card border border-border-default rounded-lg divide-y divide-border-default/60">
        {top4.map((t) => (
          <div key={t.id} className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={() => toggle(t.id)}
              className={`shrink-0 size-5 rounded border flex items-center justify-center transition-colors ${
                done.has(t.id)
                  ? "bg-sp border-sp"
                  : "border-border-default hover:border-sp"
              }`}
            >
              {done.has(t.id) && <CheckCircle2 className="size-3 text-zinc-950" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${done.has(t.id) ? "line-through text-text-muted" : "text-text-primary"}`}>
                {t.headline}
              </p>
              <p className="text-[10px] font-mono text-text-muted">
                {t.dealLabel} ·{" "}
                <span className={t.dueGroup === "today" ? "text-sp" : ""}>
                  {t.dueGroup === "today" ? "Today" : t.dueGroup === "this-week" ? "This week" : "Later"}
                </span>
              </p>
            </div>
            <span
              className="text-[10px] font-mono uppercase tracking-[0.14em]"
              style={{
                color:
                  t.priority === "critical"
                    ? "var(--danger)"
                    : t.priority === "high"
                    ? "var(--amber)"
                    : "var(--text-muted)",
              }}
            >
              {t.priority}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
