import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  Flame,
  Snowflake,
  Minus,
  ArrowUpRight,
  Check,
  MessageSquare,
  Hash,
  Calendar as CalendarIcon,
  Paperclip,
  Pin,
  Send,
  ArrowRight,
} from "lucide-react";
import {
  getContact,
  getContactBrief,
  getDealsForContact,
  getThreadsForContact,
  formatCurrency,
  type Contact,
  type ContactBrief,
  type Deal,
  type DealHealth,
  type CommsThread,
  type CommsChannel,
} from "@/lib/crm-data";
import { getDealLogo } from "@/lib/crm-logos";

export const Route = createFileRoute("/_app/crm/contacts/$contactId")({
  loader: ({ params }) => {
    const contact = getContact(params.contactId);
    if (!contact) throw notFound();
    return { contact };
  },
  notFoundComponent: () => (
    <div className="px-8 py-16 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
        404
      </p>
      <h1 className="mt-2 text-2xl font-display">Contact not found</h1>
      <Link
        to="/crm/contacts"
        className="mt-4 inline-block text-sm text-sp hover:brightness-125"
      >
        ← Back to contacts
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="px-8 py-16 text-center text-sm text-danger">{error.message}</div>
  ),
  component: ContactRecordPage,
});

function ContactRecordPage() {
  const { contact } = Route.useLoaderData();
  const brief = getContactBrief(contact.id);
  const dealList = getDealsForContact(contact.id);
  const threads = getThreadsForContact(contact.id);
  const totalValue = dealList.reduce((s, d) => s + d.amount, 0);

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="px-8 pt-6 pb-2 flex items-center justify-between gap-4">
        <Link
          to="/crm/contacts"
          className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="size-3" />
          All contacts
        </Link>
        <div className="flex items-center gap-2">
          <ActionBtn icon={<Mail className="size-3.5" />} label="Email" />
          <ActionBtn icon={<Phone className="size-3.5" />} label="Call" />
        </div>
      </div>

      {/* Header */}
      <header className="px-8 pt-4 pb-6 border-b border-border-default">
        <div className="flex items-start gap-5">
          <div className="size-16 rounded-full bg-surface-card border border-border-default flex items-center justify-center text-base font-display text-text-primary shrink-0">
            {initials(contact.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                {contact.company}
              </p>
              {brief && <RoleBadge role={brief.role} />}
              {brief && <SentimentBadge s={brief.sentiment} />}
            </div>
            <h1 className="text-3xl font-display font-medium tracking-tight mt-1">
              {contact.name}
            </h1>
            <p className="text-sm text-text-secondary mt-1">{contact.title}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-text-secondary">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="size-3 text-text-muted" />
                {contact.email}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="size-3 text-text-muted" />
                {contact.phone}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
              {dealList.length} active{" "}
              {dealList.length === 1 ? "deal" : "deals"}
            </p>
            {totalValue > 0 && (
              <p className="text-3xl font-display font-medium tabular-nums mt-1">
                {formatCurrency(totalValue)}
              </p>
            )}
            {brief && (
              <p className="text-[11px] font-mono text-text-secondary mt-1">
                Last · {brief.lastInteraction}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <main className="lg:col-span-2 space-y-6">
          {brief && <RelationshipBrief brief={brief} contact={contact} />}
          {threads.length > 0 && <ConversationsCard threads={threads} contact={contact} />}
          {dealList.length > 0 && <RelatedDealsCard deals={dealList} />}
          {brief && <RecentMomentsCard brief={brief} />}
        </main>

        <aside className="space-y-6">
          <ContactFactsCard contact={contact} />
          {brief && <QuickContextCard brief={brief} />}
        </aside>
      </div>
    </div>
  );
}

// ============ Pieces ============

function ActionBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary bg-surface-card border border-border-default rounded-md px-3 py-2 hover:border-text-muted transition-colors">
      {icon}
      {label}
    </button>
  );
}

function RoleBadge({ role }: { role: ContactBrief["role"] }) {
  return (
    <span className="inline-flex items-center text-[10px] font-mono uppercase tracking-[0.14em] text-text-secondary border border-border-default rounded px-2 py-0.5">
      {role}
    </span>
  );
}

function SentimentBadge({ s }: { s: ContactBrief["sentiment"] }) {
  const map = {
    warm: { icon: <Flame className="size-3" />, color: "var(--sp)", label: "Warm" },
    neutral: { icon: <Minus className="size-3" />, color: "var(--text-muted)", label: "Neutral" },
    cold: { icon: <Snowflake className="size-3" />, color: "var(--info)", label: "Cooling" },
  } as const;
  const m = map[s];
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

function RelationshipBrief({
  brief,
  contact,
}: {
  brief: ContactBrief;
  contact: Contact;
}) {
  return (
    <article className="sp-surface rounded-lg p-5 space-y-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-sp" />
          <h2 className="text-sm font-mono uppercase tracking-[0.18em] text-text-primary">
            Relationship brief
          </h2>
        </div>
        <span className="text-[10px] font-mono text-text-muted">
          SuperPilot · synthesized from {brief.recentMoments.length} touches
        </span>
      </header>

      <p className="text-sm text-text-primary leading-relaxed font-display italic">
        "{brief.relationship}"
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-2">
            Known for
          </p>
          <ul className="space-y-1.5">
            {brief.knownFor.map((k, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed"
              >
                <Check className="size-3 text-sp shrink-0 mt-0.5" />
                <span>{k}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber mb-2 flex items-center gap-1.5">
            <AlertTriangle className="size-3" />
            Watch out for
          </p>
          <ul className="space-y-1.5">
            {brief.watchOuts.map((w, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed"
              >
                <span className="text-amber mt-1">·</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-border-default/60">
        <button className="flex items-center gap-1.5 text-xs font-medium bg-sp text-zinc-950 px-3 py-2 rounded-md hover:brightness-110 shadow-[0_0_20px_var(--sp-glow)] transition-all">
          <Mail className="size-3.5" />
          Draft message to {contact.name.split(" ")[0]}
        </button>
        <button className="text-xs font-medium text-text-secondary hover:text-text-primary px-3 py-2 transition-colors">
          Regenerate brief
        </button>
      </div>
    </article>
  );
}

function RelatedDealsCard({ deals: list }: { deals: Deal[] }) {
  return (
    <article className="bg-surface-card border border-border-default rounded-lg overflow-hidden">
      <header className="px-5 pt-4 pb-2">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted">
          Related deals
        </h3>
      </header>
      <ul>
        {list.map((d) => (
          <li key={d.id}>
            <Link
              to="/crm/deals/$dealId"
              params={{ dealId: d.id }}
              className="flex items-center gap-4 px-5 py-3 border-t border-border-default hover:bg-surface-sp/40 group transition-colors"
            >
              <DealLogo dealId={d.id} seed={d.logoSeed} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate group-hover:text-sp transition-colors">
                  {d.company}
                </p>
                <p className="text-[11px] font-mono text-text-muted truncate">
                  {d.stage} · close {d.closeDate}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-medium text-text-primary tabular-nums">
                  {formatCurrency(d.amount)}
                </p>
                <HealthLabel health={d.health} />
              </div>
              <ArrowUpRight className="size-4 text-text-muted group-hover:text-sp transition-colors shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

function DealLogo({ dealId, seed }: { dealId: string; seed: string }) {
  const src = getDealLogo(dealId);
  return (
    <div className="size-9 rounded-md flex items-center justify-center shrink-0 border border-border-default bg-white overflow-hidden">
      {src ? (
        <img
          src={src}
          alt=""
          loading="lazy"
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

function HealthLabel({ health }: { health: DealHealth }) {
  const map: Record<DealHealth, { label: string; color: string }> = {
    hot: { label: "Hot", color: "var(--sp)" },
    "on-track": { label: "On track", color: "var(--info)" },
    "at-risk": { label: "At risk", color: "var(--amber)" },
    stalled: { label: "Stalled", color: "var(--danger)" },
    momentum: { label: "Momentum", color: "var(--sp)" },
    "action-needed": { label: "Action needed", color: "var(--amber)" },
    won: { label: "Won", color: "var(--sp)" },
  };
  const m = map[health];
  return (
    <span
      className="text-[10px] font-mono uppercase tracking-[0.14em]"
      style={{ color: m.color }}
    >
      {m.label}
    </span>
  );
}

function RecentMomentsCard({ brief }: { brief: ContactBrief }) {
  return (
    <article className="bg-surface-card border border-border-default rounded-lg p-5">
      <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-4">
        Recent moments
      </h3>
      <ol className="space-y-0 relative">
        <span
          className="absolute left-[15px] top-2 bottom-2 w-px bg-border-default"
          aria-hidden
        />
        {brief.recentMoments.map((m, i) => (
          <li
            key={i}
            className="relative flex items-start gap-4 py-3 first:pt-0 last:pb-0"
          >
            <div className="size-8 rounded-md flex items-center justify-center shrink-0 z-10 bg-surface-base text-sp">
              <ChevronRight className="size-3.5" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-sm text-text-primary leading-relaxed">
                {m.what}
              </p>
              <p className="text-[10px] font-mono text-text-muted mt-1 tabular-nums">
                {m.at}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}

function ContactFactsCard({ contact }: { contact: Contact }) {
  return (
    <article className="bg-surface-card border border-border-default rounded-lg p-4 space-y-2">
      <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-1">
        Contact facts
      </h3>
      <Fact label="Name" value={contact.name} />
      <Fact label="Title" value={contact.title} />
      <Fact label="Company" value={contact.company} icon={<Building2 className="size-3" />} />
      <Fact label="Email" value={contact.email} icon={<Mail className="size-3" />} />
      <Fact label="Phone" value={contact.phone} icon={<Phone className="size-3" />} />
    </article>
  );
}

function QuickContextCard({ brief }: { brief: ContactBrief }) {
  return (
    <article className="bg-surface-card border border-border-default rounded-lg p-4 space-y-3">
      <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted">
        Quick context
      </h3>
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-text-muted mb-1 flex items-center gap-1.5">
          <TrendingUp className="size-3 text-sp" />
          Role
        </p>
        <p className="text-xs text-text-secondary">{brief.role}</p>
      </div>
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-text-muted mb-1">
          Sentiment
        </p>
        <p className="text-xs text-text-secondary capitalize">{brief.sentiment}</p>
      </div>
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-text-muted mb-1">
          Last interaction
        </p>
        <p className="text-xs text-text-secondary">{brief.lastInteraction}</p>
      </div>
    </article>
  );
}

function Fact({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 border-b border-border-default/60 last:border-0">
      <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-text-muted flex items-center gap-1.5">
        {icon}
        {label}
      </span>
      <span className="text-xs text-text-primary text-right truncate max-w-[60%]">
        {value}
      </span>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((s) => s[0])
    .join("");
}

// ============ Conversations ============

const channelMeta: Record<
  CommsChannel,
  { label: string; icon: typeof Mail; tint: string }
> = {
  email: { label: "Email", icon: Mail, tint: "text-sky-300" },
  call: { label: "Call", icon: Phone, tint: "text-emerald-300" },
  sms: { label: "SMS", icon: MessageSquare, tint: "text-amber-300" },
  slack: { label: "Slack", icon: Hash, tint: "text-fuchsia-300" },
  meeting: { label: "Meeting", icon: CalendarIcon, tint: "text-indigo-300" },
};

function ConversationsCard({
  threads,
  contact,
}: {
  threads: CommsThread[];
  contact: Contact;
}) {
  const sorted = [...threads].sort((a, b) => {
    if ((b.pinned ? 1 : 0) !== (a.pinned ? 1 : 0))
      return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
    return a.lastActivityRank - b.lastActivityRank;
  });
  const [openId, setOpenId] = useState<string>(sorted[0]?.id ?? "");

  return (
    <article className="bg-surface-card border border-border-default rounded-lg overflow-hidden">
      <header className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted">
            Conversations with {contact.name.split(" ")[0]}
          </h3>
          <p className="text-[10px] font-mono text-text-muted mt-0.5">
            {sorted.length} thread{sorted.length === 1 ? "" : "s"} across email, calls, SMS, Slack
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 text-[11px] font-medium text-text-secondary hover:text-text-primary border border-border-default rounded-md px-2.5 py-1.5">
          <Send className="size-3" />
          New message
        </button>
      </header>

      <ul className="border-t border-border-default">
        {sorted.map((t) => {
          const expanded = t.id === openId;
          const meta = channelMeta[t.channel];
          const Icon = meta.icon;
          return (
            <li key={t.id} className="border-b border-border-default last:border-b-0">
              <button
                onClick={() => setOpenId(expanded ? "" : t.id)}
                className="w-full flex items-start gap-3 px-5 py-3 text-left hover:bg-surface-sp/40 transition-colors"
              >
                <div className="size-7 rounded-md bg-surface-base ring-1 ring-border-default grid place-items-center shrink-0">
                  <Icon className={`size-3.5 ${meta.tint}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-text-muted">
                      {meta.label}
                    </span>
                    {t.pinned && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-mono uppercase tracking-wider text-sp">
                        <Pin className="size-2.5" />
                        Pinned
                      </span>
                    )}
                    {t.unreadCount > 0 && (
                      <span className="text-[9px] font-mono font-bold text-zinc-950 bg-sp px-1.5 py-0.5 rounded-sm tabular-nums">
                        {t.unreadCount} new
                      </span>
                    )}
                    <span className="ml-auto text-[10px] font-mono text-text-muted">
                      {t.lastActivity}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-text-primary mt-0.5 truncate">
                    {t.subject}
                  </p>
                  <p className="text-[11px] text-text-muted truncate mt-0.5">
                    {t.preview}
                  </p>
                </div>
                <ChevronDown
                  className={`size-3.5 text-text-muted shrink-0 mt-2 transition-transform ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expanded && <ThreadDetail thread={t} />}
            </li>
          );
        })}
      </ul>
    </article>
  );
}

function ThreadDetail({ thread }: { thread: CommsThread }) {
  return (
    <div className="px-5 pb-5 pt-1 space-y-4 bg-surface-base/30">
      {(thread.superpilotSummary || thread.superpilotNextStep) && (
        <div className="rounded-md border border-sp/25 bg-gradient-to-br from-sp/[0.06] to-transparent p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="size-3 text-sp" />
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-sp">
              SuperPilot summary
            </span>
          </div>
          {thread.superpilotSummary && (
            <p className="text-[12px] text-text-primary leading-relaxed">
              {thread.superpilotSummary}
            </p>
          )}
          {thread.superpilotNextStep && (
            <div className="mt-2 pt-2 border-t border-sp/15 flex items-start gap-1.5">
              <ArrowRight className="size-3 text-sp mt-0.5 shrink-0" />
              <p className="text-[12px] text-text-secondary leading-relaxed">
                <span className="text-sp font-medium">Next · </span>
                {thread.superpilotNextStep}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        {thread.messages.map((m) => {
          const outbound = m.direction === "outbound";
          return (
            <div
              key={m.id}
              className={`rounded-md border p-3 ${
                outbound
                  ? "bg-surface-card/60 border-border-default"
                  : "bg-surface-card border-border-default"
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`size-6 rounded-full grid place-items-center text-[9px] font-mono font-bold ${
                      outbound
                        ? "bg-sp/15 text-sp ring-1 ring-sp/30"
                        : "bg-surface-base text-text-primary ring-1 ring-border-default"
                    }`}
                  >
                    {m.from
                      .split(" ")
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-text-primary truncate">
                      {m.from}{" "}
                      <span className="text-text-muted font-normal">
                        {outbound ? "sent" : "received"}
                      </span>
                    </p>
                    <p className="text-[10px] text-text-muted font-mono">
                      {m.timestamp}
                      {m.durationSec && (
                        <> · {Math.round(m.durationSec / 60)} min</>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              {m.subject && m.subject !== thread.subject && (
                <p className="text-[11px] font-medium text-text-primary mb-1.5">
                  {m.subject}
                </p>
              )}
              <pre className="text-[12px] text-text-secondary leading-relaxed whitespace-pre-wrap font-sans">
                {m.body}
              </pre>
              {m.attachments && m.attachments.length > 0 && (
                <div className="mt-2 pt-2 border-t border-border-default/60 flex flex-wrap gap-1.5">
                  {m.attachments.map((a) => (
                    <span
                      key={a.name}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-surface-base border border-border-default text-[10px]"
                    >
                      <Paperclip className="size-2.5 text-text-muted" />
                      <span className="text-text-primary">{a.name}</span>
                      <span className="text-text-muted font-mono">{a.size}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
