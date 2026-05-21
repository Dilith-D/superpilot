import { createFileRoute, Link } from "@tanstack/react-router";
import priyaAvatar from "@/assets/priya-mehta.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-base text-text-secondary font-body">
      <SiteNav />
      <Hero />
      <RelayRace />
      <IntelligenceSurfaces />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}

function SiteNav() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-zinc-900/60 bg-surface-base/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-6 bg-sp rounded-sm flex items-center justify-center">
            <span className="text-[10px] text-zinc-950 font-mono font-bold">SP</span>
          </div>
          <span className="font-display font-medium text-text-primary tracking-tight text-lg">
            SuperPilot
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#problem" className="text-sm font-medium text-zinc-400 hover:text-text-primary transition-colors">
            Problem
          </a>
          <a href="#intelligence" className="text-sm font-medium text-zinc-400 hover:text-text-primary transition-colors">
            Intelligence
          </a>
          <a href="#enterprise" className="text-sm font-medium text-zinc-400 hover:text-text-primary transition-colors">
            Enterprise
          </a>
        </div>
        <Link
          to="/login"
          className="text-sm font-medium bg-zinc-100 text-zinc-950 px-4 py-2 rounded-md ring-1 ring-zinc-100/10 hover:bg-zinc-200 transition-colors"
        >
          Try the demo
        </Link>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-40 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-[52ch] space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sp/10 border border-sp/20">
            <span className="size-1.5 rounded-full bg-sp animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-sp uppercase tracking-wider">
              The intelligence layer for your CRM
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-display font-medium text-text-primary leading-[1.02] text-balance">
            Your sales team remembers the pitch. <span className="text-sp">SuperPilot</span> remembers everything else.
          </h1>

          <p className="text-lg text-zinc-400 max-w-[44ch] text-pretty leading-relaxed">
            SuperPilot bridges the relay race between SDR, AE, SE, Legal, Implementation and CS.
            It listens to every call, reads every thread, and surfaces the intelligence your
            team needs to win.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/login"
              className="bg-sp text-zinc-950 text-sm font-medium py-2.5 pr-4 pl-2.5 flex items-center gap-2 rounded-md ring-1 ring-sp hover:brightness-110 transition-all shadow-[0_0_28px_var(--sp-glow)]"
            >
              <div className="size-4 bg-zinc-950/20 rounded flex items-center justify-center shrink-0">
                <div className="size-1.5 bg-zinc-950 rounded-full" />
              </div>
              Try the demo
            </Link>
            <a
              href="#intelligence"
              className="bg-zinc-900 text-text-primary text-sm font-medium py-2.5 px-4 rounded-md ring-1 ring-zinc-800 hover:bg-zinc-800 transition-colors"
            >
              See it in action
            </a>
          </div>

          <div className="pt-6 flex items-center gap-6 text-[11px] font-mono text-text-muted uppercase tracking-[0.18em]">
            <span>SOC 2 Type II</span>
            <span className="size-1 rounded-full bg-zinc-800" />
            <span>Salesforce · HubSpot</span>
            <span className="size-1 rounded-full bg-zinc-800" />
            <span>Gong · Zoom</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const handoffs = [
  { id: "01", label: "SDR → AE", desc: "Qualification context, initial objections, prospect language" },
  { id: "02", label: "AE → SE", desc: "Business pain, demo promises, feature requests" },
  { id: "03", label: "AE → Legal", desc: "Pricing discussions, discount rationale, timelines" },
  { id: "04", label: "AE → Impl.", desc: "Workflow requirements, migration concerns, promises" },
  { id: "05", label: "AE → CSM", desc: "Success metrics, expansion signals, relationship context" },
];

function RelayRace() {
  return (
    <section id="problem" className="py-28 border-t border-zinc-900/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-4 mb-16 max-w-[60ch]">
          <span className="font-mono text-xs text-sp font-semibold uppercase tracking-[0.2em]">
            The context problem
          </span>
          <h2 className="text-3xl lg:text-4xl font-display font-medium text-text-primary leading-tight text-balance">
            Stop losing revenue in the handoff.
          </h2>
          <p className="text-zinc-400 text-base text-pretty leading-relaxed">
            A B2B SaaS deal moves through five handoffs in 6–12 weeks. At every exchange, context
            decays. Prospects repeat themselves. New owners start from zero. The prospect experiences
            one relationship — your team experiences a relay race where the baton keeps dropping.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-6 left-6 right-6 h-px bg-gradient-to-r from-zinc-800/40 via-sp/30 to-zinc-800/40" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10 relative">
            {handoffs.map((h, i) => (
              <div key={h.id} className="space-y-4">
                <div
                  className={`relative z-10 size-12 rounded-full flex items-center justify-center font-mono text-sm ${
                    i === 2
                      ? "bg-sp/15 border border-sp/30 text-sp shadow-[0_0_20px_var(--sp-glow)]"
                      : "bg-surface-card border border-zinc-800 text-zinc-500"
                  }`}
                >
                  {h.id}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{h.label}</p>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed text-pretty">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Stat value="6 handoffs" label="in one deal lifecycle — SDR to AE to SE to Legal to Implementation to CS" />
          <Stat value="2+ hours" label="lost per rep, per day, to context prep and post-call admin" />
          <Stat value="60%" label="of B2B sales rep time is non-selling (Salesforce State of Sales, 2026)" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-6 rounded-lg bg-surface-card/60 ring-1 ring-zinc-800/70">
      <p className="text-3xl font-display font-medium text-text-primary tracking-tight">{value}</p>
      <p className="text-sm text-zinc-500 mt-2 text-pretty leading-relaxed">{label}</p>
    </div>
  );
}

function IntelligenceSurfaces() {
  return (
    <section
      id="intelligence"
      className="py-28 border-t border-[var(--border-default)] bg-[var(--surface-sidebar)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left narrative */}
          <div className="space-y-16 lg:sticky lg:top-32">
            <div className="space-y-4">
              <span className="font-mono text-[11px] text-[var(--sp)] font-semibold uppercase tracking-[0.2em]">
                How it works
              </span>
              <h2 className="text-4xl font-display font-medium text-[var(--text-primary)] leading-tight text-balance">
                The cockpit for your revenue engine.
              </h2>
              <p className="text-[var(--text-secondary)] text-lg text-pretty max-w-[44ch] leading-relaxed">
                SuperPilot synthesizes every meeting, email, and document into precise intelligence
                cards that follow the deal — and the prospect — across every handoff.
              </p>
            </div>

            <ol className="space-y-10">
              <Capability
                idx="01"
                kicker="Before the call"
                title="Walk in already up-to-speed."
                desc="Every meeting opens with a dossier on the account, the stakeholders, the open commitments, and the three things you should say first."
                active
              />
              <Capability
                idx="02"
                kicker="After the call"
                title="Commitments tracked before you hang up."
                desc="SuperPilot extracts every promise, follow-up, and CRM update from the call. Accept, edit, or dismiss — then it's done."
              />
              <Capability
                idx="03"
                kicker="Between calls"
                title="The baton arrives intact."
                desc="When the deal moves from AE to SE, Legal, or CSM, SuperPilot generates the handoff brief automatically. Nothing repeated. Nothing lost."
              />
            </ol>
          </div>

          {/* Right: intelligence cards */}
          <div className="space-y-6">
            <PreCallCard />
            <ContactCard />
            <PostCallCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function Capability({
  idx,
  kicker,
  title,
  desc,
  active,
}: {
  idx: string;
  kicker: string;
  title: string;
  desc: string;
  active?: boolean;
}) {
  return (
    <li className="group">
      <h3
        className={`font-mono text-[11px] font-semibold uppercase tracking-[0.2em] mb-2 ${
          active ? "text-[var(--sp)]" : "text-[var(--text-muted)]"
        }`}
      >
        {idx} · {kicker}
      </h3>
      <p className="text-[var(--text-primary)] font-medium mb-1 text-lg font-display">{title}</p>
      <p className="text-sm text-[var(--text-secondary)] text-pretty leading-relaxed max-w-[52ch]">
        {desc}
      </p>
    </li>
  );
}

function SuperPilotHeader({
  pill,
  pillTone = "sp",
  meta,
}: {
  pill: string;
  pillTone?: "sp" | "emerald";
  meta?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider">
          ✦ SUPERPILOT
        </span>
        <span
          className={`px-1.5 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider ${
            pillTone === "emerald"
              ? "bg-[var(--surface-sp)] text-[var(--sp)]"
              : "bg-[var(--surface-sp)] text-[var(--sp)]"
          }`}
        >
          {pill}
        </span>
      </div>
      {meta && (
        <span className="text-[10px] font-mono text-[var(--text-muted)]">{meta}</span>
      )}
    </div>
  );
}

function PreCallCard() {
  return (
    <div className="card-quiet p-6">
      <SuperPilotHeader pill="AI Brief" meta="UPDATED 2M AGO" />

      <h4 className="text-lg font-display font-medium text-[var(--text-primary)] mb-1">
        Pre-call: Acme Corp — Series D expansion
      </h4>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6">
        <Dot color="sp" label="₹8,40,000 ARR" />
        <Dot color="sp" label="Decision maker present" />
        <Dot color="amber" label="At risk · 4 days silent" />
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase mb-2 tracking-[0.18em]">
            Primary objective
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Re-open the proposal conversation. The CTO flagged SOC 2 residency concerns in
            Tuesday's email — get ahead of it before procurement does.
          </p>
        </div>
        <div>
          <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase mb-2 tracking-[0.18em]">
            Known landmines
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Procurement raised multi-region data residency last quarter. Have AWS Frankfurt
            failover talking points ready. Avoid revisiting price — Priya already defended it.
          </p>
        </div>
        <div>
          <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase mb-2 tracking-[0.18em]">
            Open commitments from your side
          </p>
          <ul className="text-sm text-[var(--text-secondary)] space-y-1.5">
            <li>→ Security whitepaper (promised Mon, not yet sent)</li>
            <li>→ Reference call with NovaPay CTO</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ContactCard() {
  return (
    <div className="card-quiet p-6">
      <SuperPilotHeader pill="Contact intel" />

      <div className="flex items-start gap-4 mb-6">
        <img
          src={priyaAvatar}
          alt="Priya Mehta headshot"
          width={48}
          height={48}
          loading="lazy"
          className="size-12 rounded-full object-cover ring-1 ring-[var(--border-default)]"
        />
        <div>
          <h4 className="text-lg font-display font-medium text-[var(--text-primary)]">
            Priya Mehta
          </h4>
          <p className="text-sm text-[var(--text-secondary)]">
            VP Sales Operations · Acme Corp
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field
          label="Champion status"
          value="Verified — defended your pricing internally on 14 May."
        />
        <Field
          label="Communication style"
          value="Direct. Wants technical depth. Skip the deck — open with the diagram."
        />
        <Field
          label="What matters"
          value="Operational bottleneck in legal review. Wants a 14-day path to signed MSA."
        />
        <Field
          label="Recent sentiment"
          value="Bullish on outcomes, anxious about Q3 board commitment."
        />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-md border border-[var(--border-default)] bg-[var(--surface-sidebar)]">
      <p className="text-[9px] text-[var(--text-muted)] uppercase mb-1.5 font-mono tracking-[0.18em]">
        {label}
      </p>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{value}</p>
    </div>
  );
}

function PostCallCard() {
  const actions = [
    { label: "Draft security whitepaper follow-up to CTO", status: "PENDING", tone: "muted" },
    { label: "Schedule SE deep-dive on AWS Frankfurt failover", status: "DUE 24H", tone: "amber" },
    { label: "Log: Champion (Priya) re-verified post-call", status: "SYNCED", tone: "sp" },
    { label: "Move stage → Negotiation; update ARR forecast", status: "ACCEPTED", tone: "sp" },
  ];

  return (
    <div className="card-quiet p-6">
      <SuperPilotHeader pill="4 actions extracted" pillTone="emerald" meta="FROM 38-MIN CALL" />

      <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
        SuperPilot listened to your 14:00 call with Acme and pulled the commitments. Accept,
        edit, or dismiss — then it's written back to the CRM.
      </p>

      <div className="space-y-2">
        {actions.map((a) => (
          <div
            key={a.label}
            className="flex items-center justify-between gap-3 p-2.5 rounded-md border border-[var(--border-default)] bg-[var(--surface-sidebar)]"
          >
            <span className="text-xs text-[var(--text-primary)]">{a.label}</span>
            <span
              className={`text-[10px] font-mono tracking-wider ${
                a.tone === "sp"
                  ? "text-[var(--sp)]"
                  : a.tone === "amber"
                  ? "text-[var(--amber)]"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dot({ color, label }: { color: "emerald" | "sp" | "amber"; label: string }) {
  const c =
    color === "amber"
      ? "bg-[var(--amber)]"
      : "bg-[var(--sp)]";
  return (
    <div className="flex items-center gap-1.5">
      <div className={`size-1.5 rounded-full ${c}`} />
      <span className="text-[11px] font-mono text-[var(--text-secondary)]">{label}</span>
    </div>
  );
}

function FinalCTA() {
  return (
    <section id="enterprise" className="py-32 border-t border-zinc-900/80">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-[58ch] mx-auto space-y-8">
          <h2 className="text-4xl lg:text-5xl font-display font-medium text-text-primary text-balance leading-tight">
            The revenue intelligence your CRM was always supposed to be.
          </h2>
          <p className="text-zinc-400 text-lg text-pretty">
            Join high-growth B2B SaaS teams running their entire deal lifecycle on SuperPilot.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Link
              to="/login"
              className="bg-sp text-zinc-950 font-medium px-8 py-3 rounded-md ring-1 ring-sp hover:brightness-110 transition-all text-lg shadow-[0_0_32px_var(--sp-glow)]"
            >
              Try the demo
            </Link>
            <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.22em]">
              No credit card · 14-day pilot · White-glove onboarding
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="py-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="size-5 bg-zinc-800 rounded-sm flex items-center justify-center">
            <span className="text-[8px] text-zinc-400 font-mono font-bold">SP</span>
          </div>
          <span className="font-display font-medium text-zinc-500 tracking-tight text-sm">
            SuperPilot Intelligence
          </span>
        </div>
        <div className="flex items-center gap-8 text-xs font-mono text-zinc-600">
          <a href="#" className="hover:text-zinc-400 transition-colors">Security</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">Changelog</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
          <span>© 2026 SuperPilot Inc.</span>
        </div>
      </div>
    </footer>
  );
}
