import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import {
  deals,
  tasks,
  commsThreads,
  formatCurrency,
  weightedTotal,
} from "@/lib/crm-data";
import { getDealLogo } from "@/lib/crm-logos";

export const Route = createFileRoute("/_app/crm/briefing")({
  component: BriefingPage,
});

type CalEvent = {
  time: string;
  duration: string;
  title: string;
  attendees: string;
  dealId?: string;
};

type OvernightItem = {
  who: string;
  what: string;
  time: string;
  dealId?: string;
};

function BriefingPage() {
  const todayTasks = tasks
    .filter((t) => t.status === "open" && t.dueGroup === "today")
    .sort((a, b) => {
      const p = { critical: 0, high: 1, medium: 2, low: 3 };
      return p[a.priority] - p[b.priority];
    });

  const atRiskDeals = deals.filter(
    (d) => d.health === "at-risk" || d.health === "stalled",
  );

  const calendar: CalEvent[] = [
    {
      time: "10:30",
      duration: "45 min",
      title: "Discovery — Brightline Health",
      attendees: "Samir Okafor, Tasha",
      dealId: "brightline-health",
    },
    {
      time: "13:00",
      duration: "30 min",
      title: "Pipeline sync",
      attendees: "Internal",
    },
    {
      time: "15:30",
      duration: "60 min",
      title: "MSA walk-through — Acme Corp",
      attendees: "Priya Mehta, Jordan Reyes",
      dealId: "acme-corp",
    },
  ];

  const overnight: OvernightItem[] = [
    {
      who: "Priya Mehta · Acme Corp",
      what: "Replied with redline ETA — EOD Thursday. Pushing for 2× liability cap and Frankfurt + Dublin failover.",
      time: "2h ago",
      dealId: "acme-corp",
    },
    {
      who: "Marcus Chen · Northwind Labs",
      what: "Wants a 90-min architectural review with Raj and Jin early next week.",
      time: "Yesterday",
      dealId: "northwind-labs",
    },
    {
      who: "Helios Manufacturing",
      what: "Five days of silence after SAP went on-site Tuesday. Procurement window is narrowing.",
      time: "Overnight",
      dealId: "helios-manufacturing",
    },
    {
      who: "Kestrel Robotics",
      what: "Proposal still has zero opens across nine days. Budget freeze rumor not yet validated.",
      time: "Overnight",
      dealId: "kestrel-robotics",
    },
  ];

  const priorities = todayTasks.slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-[760px] px-8 py-16">
      {/* Greeting */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Briefing · synthesised 04:42
        </p>
        <h1 className="mt-4 font-display text-[52px] leading-[1.05] font-light tracking-[-0.03em] text-[var(--text-primary)]">
          Good morning, Dilith.
        </h1>
        <p className="mt-3 text-[17px] leading-relaxed text-[var(--text-muted)] max-w-[560px]">
          Three things deserve your attention today.{" "}
          <span className="text-[var(--text-secondary)]">
            Your weighted pipeline is{" "}
            <span className="text-[var(--text-primary)] font-medium">
              {formatCurrency(weightedTotal)}
            </span>
            .
          </span>
        </p>
      </motion.header>

      {/* Today's focus */}
      <Section delay={0.08} label="Today's focus">
        <div className="rounded-[var(--radius)] border border-[var(--border-default)] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--sp)]">
            15:30 · 60 minutes
          </p>
          <h2 className="mt-2 font-display text-[22px] font-medium leading-snug text-[var(--text-primary)]">
            MSA walk-through with Acme Corp.
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-muted)]">
            Priya committed legal redlines by EOD Thursday. Neutralise the §7
            liability cap, lock the Jun 17 kickoff. Everything else can slip a
            day; this one can't.
          </p>
          <div className="mt-5 flex items-center gap-5 text-[13px]">
            <Link
              to="/crm/deals/$dealId"
              params={{ dealId: "acme-corp" }}
              className="inline-flex items-center gap-1 font-medium text-[var(--sp)] hover:opacity-80 transition-opacity"
            >
              Open deal
              <ArrowUpRight className="size-3.5" strokeWidth={2} />
            </Link>
            <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              Prep talking points
            </button>
            <span className="ml-auto text-[12px] text-[var(--text-muted)]">
              Priya Mehta, Jordan Reyes
            </span>
          </div>
        </div>
      </Section>

      {/* Priorities */}
      <Section delay={0.16} label="Three priorities">
        <ol className="divide-y divide-[var(--border-default)]">
          {priorities.map((t, i) => (
            <li key={t.id} className="py-5 flex items-start gap-6 group">
              <span className="font-display text-[32px] font-extralight tabular-nums text-[var(--text-muted)] leading-none w-8 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-medium text-[var(--text-primary)] leading-snug">
                  {t.headline}
                </p>
                <p className="mt-1.5 text-[13px] italic text-[var(--text-muted)] leading-relaxed">
                  {t.detail}
                </p>
                <Link
                  to="/crm/deals/$dealId"
                  params={{ dealId: t.dealId }}
                  className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.14em] text-[var(--text-muted)] hover:text-[var(--sp)] transition-colors"
                >
                  <span className="size-1 rounded-full bg-[var(--sp)]" />
                  {t.dealLabel}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Your day */}
      <Section delay={0.24} label="Your day">
        <ol className="relative">
          <span
            aria-hidden
            className="absolute left-[57px] top-3 bottom-3 w-px bg-[var(--border-default)]"
          />
          {calendar.map((ev, i) => (
            <li key={i} className="relative flex items-start gap-6 py-4">
              <span className="w-12 shrink-0 pt-1 font-mono text-[13px] tabular-nums text-[var(--text-primary)]">
                {ev.time}
              </span>
              <span
                aria-hidden
                className="relative z-10 mt-2 size-2 rounded-full bg-white border border-[var(--border-default)] shrink-0"
                style={ev.dealId ? { borderColor: "var(--sp)", backgroundColor: "var(--sp)" } : undefined}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-[var(--text-primary)]">
                  {ev.title}
                </p>
                <p className="mt-0.5 text-[12px] text-[var(--text-muted)]">
                  {ev.attendees} · {ev.duration}
                </p>
              </div>
              {ev.dealId && (
                <Link
                  to="/crm/deals/$dealId"
                  params={{ dealId: ev.dealId }}
                  className="text-[12px] text-[var(--text-muted)] hover:text-[var(--sp)] pt-1 transition-colors"
                >
                  Open
                </Link>
              )}
            </li>
          ))}
        </ol>
      </Section>

      {/* What changed overnight */}
      <Section delay={0.32} label="What changed overnight">
        <ul className="divide-y divide-[var(--border-default)]">
          {overnight.map((o, i) => (
            <li key={i} className="py-5">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[14px] font-medium text-[var(--text-primary)] truncate">
                  {o.who}
                </p>
                <span className="text-[11px] font-mono text-[var(--text-muted)] shrink-0">
                  {o.time}
                </span>
              </div>
              <p className="mt-1.5 text-[13px] text-[var(--text-muted)] leading-relaxed">
                {o.what}
              </p>
              {o.dealId && (
                <Link
                  to="/crm/deals/$dealId"
                  params={{ dealId: o.dealId }}
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-[0.14em] text-[var(--text-muted)] hover:text-[var(--sp)] transition-colors"
                >
                  View thread
                  <ArrowUpRight className="size-3" strokeWidth={2} />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </Section>

      {/* Risk watch */}
      <Section delay={0.4} label="Risk watch">
        <ul className="divide-y divide-[var(--border-default)]">
          {atRiskDeals.map((d) => {
            const logo = getDealLogo(d.id);
            return (
              <li key={d.id}>
                <Link
                  to="/crm/deals/$dealId"
                  params={{ dealId: d.id }}
                  className="flex items-center gap-4 py-4 group"
                >
                  {logo ? (
                    <img
                      src={logo}
                      alt=""
                      className="size-9 rounded-md object-contain bg-white border border-[var(--border-default)] p-1 shrink-0"
                    />
                  ) : (
                    <div className="size-9 rounded-md border border-[var(--border-default)] grid place-items-center text-[10px] font-mono text-[var(--text-muted)] shrink-0">
                      {d.logoSeed}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-medium text-[var(--text-primary)] group-hover:text-[var(--sp)] transition-colors truncate">
                      {d.company}
                    </p>
                    <p className="text-[12px] text-[var(--text-muted)] truncate">
                      {d.nextStep}
                    </p>
                  </div>
                  <span className="text-[13px] font-mono tabular-nums text-[var(--text-secondary)] shrink-0">
                    {formatCurrency(d.amount)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <footer className="mt-16 pt-6 border-t border-[var(--border-default)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
        <span>
          Synthesised from {commsThreads.length} threads · {tasks.length} tasks · {deals.length} deals
        </span>
        <button className="hover:text-[var(--sp)] transition-colors">
          Regenerate
        </button>
      </footer>
    </div>
  );
}

function Section({
  label,
  delay,
  children,
}: {
  label: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className="mt-14"
    >
      <h2 className="text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
        {label}
      </h2>
      {children}
    </motion.section>
  );
}
