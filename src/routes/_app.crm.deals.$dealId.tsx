import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Flame,
  Pause,
  ChevronRight,
  ChevronDown,
  PhoneCall,
  MailIcon,
  CalendarPlus,
  FileSignature,
  Building2,
  StickyNote,
  ArrowUpRight,
  Check,
  ExternalLink,
} from "lucide-react";
import {
  getDeal,
  getDealRecord,
  getContact,
  formatCurrency,
  intelFeed,
  tasks,
  type Deal,
  type DealHealth,
  type TimelineEvent,
} from "@/lib/crm-data";
import { getDealLogo } from "@/lib/crm-logos";
import { JoinCallModal } from "@/components/crm/JoinCallModal";
import { PostCallPanel } from "@/components/crm/PostCallPanel";
import { HandoffModal } from "@/components/crm/HandoffModal";

export const Route = createFileRoute("/_app/crm/deals/$dealId")({
  loader: ({ params }) => {
    const deal = getDeal(params.dealId);
    if (!deal) throw notFound();
    return { deal };
  },
  notFoundComponent: () => (
    <div className="px-8 py-16 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
        404
      </p>
      <h1 className="mt-2 text-2xl font-display">Deal not found</h1>
      <Link
        to="/crm/deals"
        className="mt-4 inline-block text-sm text-sp hover:brightness-125"
      >
        ← Back to deals
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="px-8 py-16 text-center text-sm text-danger">{error.message}</div>
  ),
  component: DealRecordPage,
});

function DealRecordPage() {
  const { deal } = Route.useLoaderData();
  const record = getDealRecord(deal.id);
  const primaryContact = getContact(deal.primaryContactId);
  const navigate = useNavigate();
  const dealSignals = intelFeed.filter((i) => i.dealId === deal.id);
  const dealTasks = tasks.filter((t) => t.dealId === deal.id);
  const [tab, setTab] = useState<"overview" | "activity" | "contacts" | "notes" | "tasks">(
    "overview",
  );
  const [callOpen, setCallOpen] = useState(false);
  const [postcallOpen, setPostcallOpen] = useState(false);
  const [handoffOpen, setHandoffOpen] = useState(false);
  const [stageMenuOpen, setStageMenuOpen] = useState(false);
  const logo = getDealLogo(deal.id);

  useEffect(() => {
    const openPostcall = () => setPostcallOpen(true);
    const openHandoff = () => setHandoffOpen(true);
    window.addEventListener("superpilot:tour-open-postcall", openPostcall);
    window.addEventListener("superpilot:tour-open-handoff", openHandoff);
    return () => {
      window.removeEventListener("superpilot:tour-open-postcall", openPostcall);
      window.removeEventListener("superpilot:tour-open-handoff", openHandoff);
    };
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Top breadcrumb + actions */}
      <div className="px-8 pt-6 pb-2 flex items-center justify-between gap-4">
        <Link
          to="/crm/deals"
          className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="size-3" />
          All deals
        </Link>
        <div className="flex items-center gap-2">
          <ActionBtn icon={<PhoneCall className="size-3.5" />} label="Log call" onClick={() => setPostcallOpen(true)} />
          <ActionBtn icon={<MailIcon className="size-3.5" />} label="Email" />
          <ActionBtn icon={<CalendarPlus className="size-3.5" />} label="Meeting" />
          <ActionBtn icon={<StickyNote className="size-3.5" />} label="Note" />
          <div className="relative">
            <button
              id="superpilot-move-stage"
              onClick={() => setStageMenuOpen((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary bg-surface-sp border border-sp/30 text-sp rounded-md px-3 py-2 hover:bg-sp/20 transition-colors"
            >
              Move Stage
              <ChevronDown className="size-3.5" />
            </button>
            {stageMenuOpen && (
              <div className="absolute top-full right-0 mt-1 z-50 bg-surface-card border border-border-default rounded-lg shadow-lg min-w-[160px] overflow-hidden">
                <button
                  onClick={() => { setStageMenuOpen(false); setHandoffOpen(true); }}
                  className="w-full px-4 py-2.5 text-xs text-left text-text-primary hover:bg-surface-sp hover:text-sp transition-colors font-medium"
                >
                  → Implementation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="px-8 pt-4 pb-6 border-b border-border-default">
        <div className="flex items-start gap-5">
          <div className="size-14 rounded-lg flex items-center justify-center shrink-0 border border-border-default bg-white overflow-hidden">
            {logo ? (
              <img
                src={logo}
                alt={`${deal.company} logo`}
                width={56}
                height={56}
                className="size-full object-contain p-1"
              />
            ) : (
              <span className="text-sm font-mono font-medium text-zinc-900 tracking-wider">
                {deal.logoSeed}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
              {deal.industry} · {deal.stage}
            </p>
            <h1 className="text-3xl font-display font-medium tracking-tight mt-1">
              {deal.company}
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              {primaryContact?.name} · {primaryContact?.title}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
              Amount · {deal.probability}% probability
            </p>
            <p className="text-3xl font-display font-medium tabular-nums mt-1">
              {formatCurrency(deal.amount)}
            </p>
            <p className="text-[11px] font-mono text-text-secondary mt-1">
              Close {deal.closeDate}
            </p>
          </div>
        </div>

        {/* Stage rail */}
        <StageRail current={deal.stage} health={deal.health} />
      </header>

      {/* Tabs */}
      <div className="px-8 border-b border-border-default flex items-center gap-1 overflow-x-auto">
        {(["overview", "activity", "contacts", "notes", "tasks"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-3 text-xs font-mono uppercase tracking-[0.16em] border-b-2 transition-colors ${
              tab === t
                ? "border-sp text-text-primary"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            {t}
            {t === "tasks" && dealTasks.length > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center bg-surface-sp text-sp text-[9px] font-mono font-bold px-1.5 py-0 rounded-sm tabular-nums">
                {dealTasks.filter((x) => x.status === "open").length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <main className="lg:col-span-2 space-y-6">
          {tab === "overview" && (
            <>
              {record?.brief && (
                <PreCallBriefCard
                  brief={record.brief}
                  onJoin={() => setCallOpen(true)}
                />
              )}
              {record?.summary && <SummaryCard text={record.summary} />}
              <TimelineCard events={(record?.timeline ?? []).slice(0, 4)} compact />
              {(record?.timeline?.length ?? 0) > 4 && (
                <button
                  onClick={() => setTab("activity")}
                  className="text-xs font-mono uppercase tracking-[0.16em] text-sp hover:brightness-125 inline-flex items-center gap-1"
                >
                  View full activity
                  <ChevronRight className="size-3" />
                </button>
              )}
            </>
          )}
          {tab === "activity" && record && <TimelineCard events={record.timeline} />}
          {tab === "contacts" && (
            <ContactsList
              ids={record?.contactIds ?? [deal.primaryContactId]}
              onOpen={(id) =>
                navigate({ to: "/crm/contacts/$contactId", params: { contactId: id } })
              }
            />
          )}
          {tab === "notes" && <NotesPlaceholder />}
          {tab === "tasks" && (
            <DealTasksCard dealId={deal.id} tasks={dealTasks} />
          )}
        </main>

        <aside className="space-y-6">
          {dealSignals.length > 0 && <SignalsRail signals={dealSignals} />}
          {primaryContact && <PrimaryContactCard contact={primaryContact} />}
          <DealFactsCard deal={deal} />
          {record && <DealContextCard record={record} />}
        </aside>
      </div>
      <JoinCallModal
        open={callOpen}
        onClose={() => setCallOpen(false)}
        company={deal.company}
        contact={primaryContact}
        callIn={record?.brief?.callIn}
      />
      <PostCallPanel open={postcallOpen} onClose={() => setPostcallOpen(false)} deal={deal} />
      <HandoffModal open={handoffOpen} onClose={() => setHandoffOpen(false)} />
    </div>
  );
}

// ============ Pieces ============

function ActionBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary bg-surface-card border border-border-default rounded-md px-3 py-2 hover:border-text-muted transition-colors">
      {icon}
      {label}
    </button>
  );
}

const STAGES = [
  "Discovery",
  "Qualified",
  "Proposal Sent",
  "Negotiation",
  "Closed Won",
] as const;

function StageRail({ current, health }: { current: string; health: DealHealth }) {
  const idx = STAGES.indexOf(current as (typeof STAGES)[number]);
  return (
    <div className="mt-5 flex items-center gap-px bg-border-default rounded-md overflow-hidden border border-border-default">
      {STAGES.map((s, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div
            key={s}
            className={`flex-1 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.14em] flex items-center justify-center gap-1.5 ${
              active
                ? "bg-surface-sp text-text-primary"
                : done
                ? "bg-surface-card text-text-secondary"
                : "bg-surface-card text-text-muted"
            }`}
          >
            {done && <CheckCircle2 className="size-3 text-sp" />}
            {active && <HealthDot health={health} />}
            {s}
          </div>
        );
      })}
    </div>
  );
}

function HealthDot({ health }: { health: DealHealth }) {
  const color =
    health === "hot" || health === "momentum" || health === "won"
      ? "var(--sp)"
      : health === "on-track"
      ? "var(--info)"
      : health === "at-risk" || health === "action-needed"
      ? "var(--amber)"
      : "var(--danger)";
  return (
    <span
      className="size-1.5 rounded-full shrink-0"
      style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
    />
  );
}

function PreCallBriefCard({
  brief,
  onJoin,
}: {
  brief: NonNullable<ReturnType<typeof getDealRecord>>["brief"];
  onJoin?: () => void;
}) {
  if (!brief) return null;
  const hasSpecLayout = !!brief.lastTouchpoint;
  return (
    <article id="superpilot-brief-card" className="sp-surface rounded-lg p-5 space-y-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-sp" />
          <h2 className="text-sm font-mono uppercase tracking-[0.18em] text-text-primary">
            ✦ SuperPilot — Pre-call brief
          </h2>
        </div>
        <span className="text-[10px] font-mono text-text-muted">
          Updated 2 hours ago · 4 sources
        </span>
      </header>

      {/* Spec layout sections — only when spec fields are present */}
      {hasSpecLayout && (
        <div className="space-y-4">
          {brief.lastTouchpoint && (
            <div id="superpilot-view-links">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-1.5">
                Last touchpoint
              </p>
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-text-secondary leading-relaxed">
                  <span className="font-mono text-[10px] text-text-muted mr-2">{brief.lastTouchpoint.date}</span>
                  {brief.lastTouchpoint.summary}
                </p>
                <button className="shrink-0 flex items-center gap-1 text-[10px] font-mono text-sp hover:brightness-125">
                  view <ExternalLink className="size-3" />
                </button>
              </div>
            </div>
          )}

          {brief.openCommitments && brief.openCommitments.length > 0 && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-1.5">
                Open commitments
              </p>
              <ul className="space-y-1.5">
                {brief.openCommitments.map((c, i) => (
                  <li key={i} className="flex items-center justify-between text-sm text-text-secondary">
                    <span>· {c.text}</span>
                    <span className="text-[10px] font-mono text-text-muted">{c.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {brief.keyConcerns && brief.keyConcerns.length > 0 && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-1.5">
                Key concerns
              </p>
              <ul className="space-y-1.5">
                {brief.keyConcerns.map((c, i) => (
                  <li key={i} className="flex items-center justify-between text-sm text-text-secondary">
                    <span>{c.text}</span>
                    <span className="text-[10px] font-mono text-sp px-1.5 py-0.5 bg-surface-sp rounded">×{c.freq}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {brief.stakeholders && brief.stakeholders.length > 0 && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-1.5">
                Stakeholders
              </p>
              <ul className="space-y-1.5">
                {brief.stakeholders.map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className={s.engaged ? "text-sp" : "text-danger"}>
                      {s.engaged ? "✓" : "✗"}
                    </span>
                    <span className="text-text-primary font-medium">{s.name}</span>
                    <span className="text-text-muted">—</span>
                    <span className="text-text-secondary">{s.title}</span>
                    <span className="ml-auto text-[10px] font-mono text-text-muted">{s.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {brief.suggestedFocus && (
            <div className="bg-surface-sp border border-sp/20 rounded-md p-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-sp mb-1">
                Suggested focus
              </p>
              <p className="text-sm text-text-primary leading-relaxed">{brief.suggestedFocus}</p>
            </div>
          )}

          <div className="border-t border-border-default/60 pt-4" />
        </div>
      )}

      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-1">
          Goal
        </p>
        <p className="text-sm text-text-primary leading-relaxed">{brief.goal}</p>
      </div>

      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-2">
          Talking points
        </p>
        <ul className="space-y-2">
          {brief.talkingPoints.map((tp, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed"
            >
              <span className="text-sp font-mono text-[10px] mt-1 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{tp}</span>
            </li>
          ))}
        </ul>
      </div>

      {brief.risks.length > 0 && (
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber mb-2 flex items-center gap-1.5">
            <AlertTriangle className="size-3" />
            Watch out for
          </p>
          <ul className="space-y-1.5">
            {brief.risks.map((r, i) => (
              <li
                key={i}
                className="text-sm text-text-secondary leading-relaxed flex items-start gap-2"
              >
                <span className="text-amber mt-1">·</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-surface-base border border-border-default rounded-md p-3">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-1">
          Suggested opener
        </p>
        <p className="text-sm text-text-primary italic leading-relaxed font-display">
          "{brief.opener}"
        </p>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onJoin}
          className="flex items-center gap-1.5 text-xs font-medium bg-sp text-zinc-950 px-3 py-2 rounded-md hover:brightness-110 shadow-[0_0_20px_var(--sp-glow)] transition-all"
        >
          <Phone className="size-3.5" />
          {hasSpecLayout ? "Prepare for call" : "Join call"}
        </button>
        <button className="text-xs font-medium text-text-secondary hover:text-text-primary px-3 py-2 transition-colors">
          {hasSpecLayout ? "Dismiss" : "Regenerate brief"}
        </button>
      </div>
    </article>
  );
}

function SummaryCard({ text }: { text: string }) {
  return (
    <article className="bg-surface-card border border-border-default rounded-lg p-5">
      <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-2">
        Where this deal stands
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed">{text}</p>
    </article>
  );
}

function TimelineCard({
  events,
  compact,
}: {
  events: TimelineEvent[];
  compact?: boolean;
}) {
  return (
    <article className="bg-surface-card border border-border-default rounded-lg p-5">
      <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-4">
        {compact ? "Recent activity" : "Activity timeline"}
      </h3>
      <ol className="space-y-0 relative">
        <span
          className="absolute left-[15px] top-2 bottom-2 w-px bg-border-default"
          aria-hidden
        />
        {events.map((e) => (
          <TimelineRow key={e.id} event={e} />
        ))}
      </ol>
    </article>
  );
}

function TimelineRow({ event }: { event: TimelineEvent }) {
  const meta = timelineMeta(event.kind);
  return (
    <li className="relative flex items-start gap-4 py-3 first:pt-0 last:pb-0">
      <div
        className={`size-8 rounded-md flex items-center justify-center shrink-0 z-10 ${
          event.highlight ? "ring-1 ring-sp/40" : ""
        }`}
        style={{
          background: event.highlight
            ? "color-mix(in oklab, var(--sp) 14%, var(--surface-card))"
            : "var(--surface-base)",
          color: meta.color,
        }}
      >
        {meta.icon}
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm text-text-primary font-medium leading-tight">
            {event.title}
          </p>
          <span className="text-[10px] font-mono text-text-muted shrink-0 tabular-nums">
            {event.at}
          </span>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed mt-1">
          {event.detail}
        </p>
        <p className="text-[10px] font-mono text-text-muted mt-1">{event.actor}</p>
      </div>
    </li>
  );
}

function timelineMeta(kind: TimelineEvent["kind"]) {
  switch (kind) {
    case "call":
      return { icon: <Phone className="size-3.5" />, color: "var(--info)" };
    case "email":
      return { icon: <Mail className="size-3.5" />, color: "var(--text-secondary)" };
    case "meeting":
      return { icon: <Calendar className="size-3.5" />, color: "var(--info)" };
    case "note":
      return { icon: <StickyNote className="size-3.5" />, color: "var(--text-muted)" };
    case "doc":
      return { icon: <FileSignature className="size-3.5" />, color: "var(--text-secondary)" };
    case "stage":
      return { icon: <ChevronRight className="size-3.5" />, color: "var(--sp)" };
    case "signal":
      return { icon: <Sparkles className="size-3.5" />, color: "var(--sp)" };
  }
}

function ContactsList({
  ids,
  onOpen,
}: {
  ids: string[];
  onOpen: (id: string) => void;
}) {
  return (
    <article className="bg-surface-card border border-border-default rounded-lg overflow-hidden">
      {ids.map((id) => {
        const c = getContact(id);
        if (!c) return null;
        return (
          <button
            key={id}
            onClick={() => onOpen(id)}
            className="w-full flex items-center gap-3 px-5 py-3 border-b border-border-default last:border-0 hover:bg-surface-sp text-left transition-colors group"
          >
            <div className="size-9 rounded-full bg-surface-base border border-border-default flex items-center justify-center text-xs font-mono text-text-primary">
              {c.name
                .split(" ")
                .map((s) => s[0])
                .join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary group-hover:text-sp transition-colors">
                {c.name}
              </p>
              <p className="text-[11px] text-text-muted">
                {c.title} · {c.email}
              </p>
            </div>
            <ArrowUpRight className="size-4 text-text-muted group-hover:text-sp transition-colors" />
          </button>
        );
      })}
    </article>
  );
}

function NotesPlaceholder() {
  return (
    <article className="bg-surface-card border border-border-default rounded-lg p-8 text-center">
      <StickyNote className="size-5 text-text-muted mx-auto mb-2" />
      <p className="text-sm text-text-secondary">No notes yet on this deal.</p>
      <button className="mt-3 text-xs font-medium text-sp hover:brightness-125">
        + Add note
      </button>
    </article>
  );
}

function SignalsRail({ signals }: { signals: typeof intelFeed }) {
  return (
    <div className="sp-surface rounded-lg p-4 space-y-3">
      <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-sp flex items-center gap-1.5">
        <Sparkles className="size-3" />
        SuperPilot signals
      </h3>
      <ul className="space-y-2.5">
        {signals.map((s) => (
          <li key={s.id} className="text-xs text-text-secondary leading-relaxed">
            <p className="text-text-primary font-medium leading-snug">{s.headline}</p>
            <p className="text-[10px] font-mono text-text-muted mt-0.5">
              {s.source} · {s.timestamp}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PrimaryContactCard({ contact }: { contact: NonNullable<ReturnType<typeof getContact>> }) {
  return (
    <article className="bg-surface-card border border-border-default rounded-lg p-4 space-y-3">
      <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted">
        Primary contact
      </h3>
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-surface-base border border-border-default flex items-center justify-center text-xs font-mono text-text-primary">
          {contact.name
            .split(" ")
            .map((s) => s[0])
            .join("")}
        </div>
        <div className="min-w-0">
          <Link
            to="/crm/contacts/$contactId"
            params={{ contactId: contact.id }}
            className="text-sm font-medium text-text-primary hover:text-sp transition-colors block truncate"
          >
            {contact.name}
          </Link>
          <p className="text-[11px] text-text-muted truncate">{contact.title}</p>
        </div>
      </div>
      <div className="space-y-1.5 pt-2 border-t border-border-default">
        <Field icon={<Mail className="size-3" />} value={contact.email} />
        <Field icon={<Phone className="size-3" />} value={contact.phone} />
        <Field icon={<Building2 className="size-3" />} value={contact.company} />
      </div>
    </article>
  );
}

function Field({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <p className="flex items-center gap-2 text-xs text-text-secondary">
      <span className="text-text-muted">{icon}</span>
      <span className="truncate">{value}</span>
    </p>
  );
}

function DealFactsCard({ deal }: { deal: Deal }) {
  return (
    <article className="bg-surface-card border border-border-default rounded-lg p-4 space-y-2">
      <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-1">
        Deal facts
      </h3>
      <Fact label="Owner" value={deal.owner} />
      <Fact label="Stage" value={deal.stage} />
      <Fact
        label="Health"
        value={
          <span className="inline-flex items-center gap-1.5">
            <HealthBadgeIcon health={deal.health} />
            {healthLabel(deal.health)}
          </span>
        }
      />
      <Fact label="Probability" value={`${deal.probability}%`} />
      <Fact label="Amount" value={formatCurrency(deal.amount)} />
      <Fact label="Close date" value={deal.closeDate} />
      <Fact label="Last touch" value={deal.lastTouch} />
    </article>
  );
}

function HealthBadgeIcon({ health }: { health: DealHealth }) {
  if (health === "hot" || health === "won") return <Flame className="size-3 text-sp" />;
  if (health === "momentum") return <TrendingUp className="size-3 text-sp" />;
  if (health === "on-track") return <CheckCircle2 className="size-3 text-info" />;
  if (health === "at-risk" || health === "action-needed") return <AlertTriangle className="size-3 text-amber" />;
  return <Pause className="size-3 text-danger" />;
}

function healthLabel(h: DealHealth) {
  const map: Record<typeof h, string> = {
    hot: "Hot",
    "on-track": "On track",
    "at-risk": "At risk",
    stalled: "Stalled",
    momentum: "Momentum",
    "action-needed": "Action needed",
    won: "Won",
  };
  return map[h] ?? h;
}

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 border-b border-border-default/60 last:border-0">
      <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-text-muted">
        {label}
      </span>
      <span className="text-xs text-text-primary text-right">{value}</span>
    </div>
  );
}

function DealContextCard({ record }: { record: NonNullable<ReturnType<typeof getDealRecord>> }) {
  return (
    <article className="bg-surface-card border border-border-default rounded-lg p-4 space-y-3">
      <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted">
        Deal context
      </h3>
      {record.champions.length > 0 && (
        <ContextSection
          label="Champions"
          items={record.champions}
          icon={<TrendingUp className="size-3 text-sp" />}
        />
      )}
      {record.blockers.length > 0 && (
        <ContextSection
          label="Blockers"
          items={record.blockers}
          icon={<AlertTriangle className="size-3 text-amber" />}
        />
      )}
      {record.competitors.length > 0 && (
        <ContextSection
          label="Competing against"
          items={record.competitors}
          icon={<FileText className="size-3 text-text-muted" />}
        />
      )}
    </article>
  );
}

function ContextSection({
  label,
  items,
  icon,
}: {
  label: string;
  items: string[];
  icon: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-text-muted mb-1 flex items-center gap-1.5">
        {icon}
        {label}
      </p>
      <ul className="space-y-1">
        {items.map((it, i) => (
          <li key={i} className="text-xs text-text-secondary leading-relaxed">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DealTasksCard({ dealId, tasks: list }: { dealId: string; tasks: typeof import("@/lib/crm-data").tasks }) {
  const [local, setLocal] = useState(list);

  function toggle(id: string) {
    setLocal((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === "done" ? "open" : "done" } : t)),
    );
  }

  const open = local.filter((t) => t.status === "open");
  const done = local.filter((t) => t.status === "done");

  const prioOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const groupOrder = { today: 0, "this-week": 1, later: 2 };

  const sorted = (arr: typeof local) =>
    arr.sort(
      (a, b) =>
        groupOrder[a.dueGroup] - groupOrder[b.dueGroup] ||
        prioOrder[a.priority] - prioOrder[b.priority],
    );

  return (
    <div className="space-y-6">
      {/* Open tasks */}
      <article className="bg-surface-card border border-border-default rounded-lg p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted">
            Open tasks · {open.length}
          </h3>
          <Link
            to="/crm/tasks"
            className="text-[10px] font-mono uppercase tracking-[0.14em] text-sp hover:brightness-125 inline-flex items-center gap-1"
          >
            All tasks
            <ArrowUpRight className="size-3" />
          </Link>
        </div>
        {sorted(open).map((t) => (
          <TaskRow key={t.id} task={t} onToggle={() => toggle(t.id)} />
        ))}
        {open.length === 0 && (
          <p className="text-sm text-text-muted py-4">No open tasks on this deal.</p>
        )}
      </article>

      {/* Done tasks */}
      {done.length > 0 && (
        <article className="bg-surface-card border border-border-default rounded-lg p-5 space-y-4 opacity-50">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted">
            Completed · {done.length}
          </h3>
          {sorted(done).map((t) => (
            <TaskRow key={t.id} task={t} onToggle={() => toggle(t.id)} />
          ))}
        </article>
      )}
    </div>
  );
}

function TaskRow({
  task,
  onToggle,
}: {
  task: typeof import("@/lib/crm-data").tasks[number];
  onToggle: () => void;
}) {
  const isDone = task.status === "done";
  const priorityMap = {
    critical: { label: "Critical", color: "var(--danger)" },
    high: { label: "High", color: "var(--amber)" },
    medium: { label: "Med", color: "var(--text-muted)" },
    low: { label: "Low", color: "var(--info)" },
  } as const;
  const p = priorityMap[task.priority];

  const kindMap = {
    commitment: { label: "Commitment", icon: <Check className="size-2.5" /> },
    "follow-up": { label: "Follow-up", icon: <ArrowUpRight className="size-2.5" /> },
    risk: { label: "Risk", icon: <AlertTriangle className="size-2.5" /> },
    "next-step": { label: "Next step", icon: <Calendar className="size-2.5" /> },
    note: { label: "Note", icon: <ChevronRight className="size-2.5" /> },
  } as const;
  const k = kindMap[task.kind];

  return (
    <div className="flex items-start gap-3 group">
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
        <div className="flex items-center gap-2">
          <p className={`text-sm font-medium truncate ${isDone ? "line-through text-text-muted" : "text-text-primary"}`}>
            {task.headline}
          </p>
          <span
            className="inline-flex items-center text-[10px] font-mono uppercase tracking-[0.14em] px-1.5 py-0.5 rounded border"
            style={{ color: p.color, borderColor: `color-mix(in oklab, ${p.color} 30%, transparent)` }}
          >
            {p.label}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.14em] text-text-muted">
            {k.icon}
            {k.label}
          </span>
        </div>
        <p className={`text-xs mt-0.5 leading-relaxed ${isDone ? "text-text-muted" : "text-text-secondary"}`}>
          {task.detail}
        </p>
        <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono uppercase tracking-[0.14em] text-text-muted">
          {task.contactLabel && <span>{task.contactLabel}</span>}
          <span>·</span>
          <span>
            {task.dueGroup === "today" ? (
              <span className="text-sp">Today</span>
            ) : task.dueGroup === "this-week" ? (
              <span>This week</span>
            ) : (
              <span>Later</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
