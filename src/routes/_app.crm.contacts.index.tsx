import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Filter, Plus, ArrowUpRight, Flame, Snowflake, Minus } from "lucide-react";
import {
  contacts,
  getDealsForContact,
  getContactBrief,
  formatCurrency,
  type Contact,
} from "@/lib/crm-data";
import { getDealLogo } from "@/lib/crm-logos";

export const Route = createFileRoute("/_app/crm/contacts/")({
  component: ContactsListPage,
});

function ContactsListPage() {
  const [query, setQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState<string>("All");

  const companies = useMemo(
    () => Array.from(new Set(contacts.map((c) => c.company))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      if (companyFilter !== "All" && c.company !== companyFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
      );
    });
  }, [query, companyFilter]);

  return (
    <div className="px-8 py-8 max-w-[1400px] mx-auto space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
            People
          </p>
          <h1 className="text-3xl font-display font-medium tracking-tight">
            Contacts
          </h1>
          <p className="text-sm text-text-secondary">
            {contacts.length} people across {companies.length} accounts
          </p>
        </div>
        <button className="flex items-center gap-2 bg-sp text-zinc-950 text-sm font-medium px-4 py-2 rounded-md hover:brightness-110 shadow-[0_0_24px_var(--sp-glow)] transition-all">
          <Plus className="size-4" />
          New contact
        </button>
      </header>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="size-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, company, title, email…"
            className="w-full bg-surface-card border border-border-default rounded-md pl-9 pr-3 py-2 text-sm placeholder:text-text-muted focus:outline-none focus:border-sp focus:ring-2 focus:ring-sp/30 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1 bg-surface-card border border-border-default rounded-md p-1 overflow-x-auto">
          <FilterPill
            label="All"
            active={companyFilter === "All"}
            onClick={() => setCompanyFilter("All")}
          />
          {companies.map((co) => (
            <FilterPill
              key={co}
              label={co}
              active={companyFilter === co}
              onClick={() => setCompanyFilter(co)}
            />
          ))}
        </div>
        <span className="text-xs font-mono text-text-muted ml-auto">
          {filtered.length} of {contacts.length}
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((c) => (
          <ContactCard key={c.id} contact={c} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-sm text-text-muted">
            No people match your filters.
          </div>
        )}
      </div>
    </div>
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
        active
          ? "bg-surface-sp text-text-primary"
          : "text-text-muted hover:text-text-primary"
      }`}
    >
      {label}
    </button>
  );
}

function ContactCard({ contact }: { contact: Contact }) {
  const dealList = getDealsForContact(contact.id);
  const brief = getContactBrief(contact.id);
  const totalValue = dealList.reduce((s, d) => s + d.amount, 0);
  const logo = getDealLogo(dealList[0]?.id ?? "");

  return (
    <Link
      to="/crm/contacts/$contactId"
      params={{ contactId: contact.id }}
      className="group bg-surface-card border border-border-default rounded-lg p-4 hover:border-sp/40 hover:bg-surface-sp/30 transition-all flex flex-col gap-3"
    >
      <div className="flex items-start gap-3">
        <div className="size-10 rounded-full bg-surface-base border border-border-default flex items-center justify-center text-xs font-mono text-text-primary shrink-0">
          {initials(contact.name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-text-primary truncate group-hover:text-sp transition-colors">
              {contact.name}
            </p>
            {brief && <SentimentDot s={brief.sentiment} />}
          </div>
          <p className="text-[11px] text-text-muted truncate">{contact.title}</p>
        </div>
        <ArrowUpRight className="size-3.5 text-text-muted group-hover:text-sp transition-colors shrink-0" />
      </div>

      <div className="flex items-center gap-2 min-w-0">
        {logo && (
          <div className="size-5 rounded-sm bg-white overflow-hidden border border-border-default shrink-0">
            <img
              src={logo}
              alt=""
              loading="lazy"
              className="size-full object-contain p-0.5"
            />
          </div>
        )}
        <span className="text-[11px] text-text-secondary truncate">
          {contact.company}
        </span>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.14em] text-text-muted border-t border-border-default/60 pt-2.5">
        <span>
          {dealList.length} {dealList.length === 1 ? "deal" : "deals"}
        </span>
        {totalValue > 0 && (
          <span className="tabular-nums text-text-secondary">
            {formatCurrency(totalValue)}
          </span>
        )}
        {brief && (
          <span className="text-sp truncate max-w-[55%] text-right normal-case tracking-normal">
            {brief.lastInteraction}
          </span>
        )}
      </div>
    </Link>
  );
}

function SentimentDot({ s }: { s: "warm" | "neutral" | "cold" }) {
  const map = {
    warm: { icon: <Flame className="size-3" />, color: "var(--sp)", label: "Warm" },
    neutral: { icon: <Minus className="size-3" />, color: "var(--text-muted)", label: "Neutral" },
    cold: { icon: <Snowflake className="size-3" />, color: "var(--info)", label: "Cooling" },
  } as const;
  const m = map[s];
  return (
    <span
      className="inline-flex items-center gap-0.5 text-[10px] font-mono uppercase tracking-[0.14em]"
      style={{ color: m.color }}
      title={m.label}
    >
      {m.icon}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((s) => s[0])
    .join("");
}
