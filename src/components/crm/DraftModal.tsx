import { useEffect, useState } from "react";
import { X, Sparkles, Send, Calendar, Check, Pencil } from "lucide-react";
import type { IntelCard, DraftPayload } from "@/lib/crm-data";

type Props = {
  card: IntelCard;
  onClose: () => void;
};

export function DraftModal({ card, onClose }: Props) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!card.draft) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[88vh] flex flex-col bg-surface-card border border-border-default rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="flex items-start justify-between gap-4 px-6 py-4 border-b border-border-default bg-surface-sp">
          <div className="flex items-start gap-3 min-w-0">
            <div
              className="size-8 rounded-md flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: "color-mix(in oklab, var(--sp) 14%, transparent)" }}
            >
              <Sparkles className="size-4 text-sp" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-sp">
                SuperPilot draft · ready to send
              </p>
              <h2 className="text-sm font-medium text-text-primary truncate">
                {card.headline}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {sent ? (
            <SentState draft={card.draft} />
          ) : card.draft.kind === "email" ? (
            <EmailDraft draft={card.draft} />
          ) : card.draft.kind === "meeting" ? (
            <MeetingDraft draft={card.draft} />
          ) : (
            <TranscriptView draft={card.draft} />
          )}
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between gap-3 px-6 py-3 border-t border-border-default bg-surface-base">
          <p className="text-[10px] font-mono text-text-muted">
            {sent
              ? "Logged to deal timeline"
              : "Edit any field before sending · SuperPilot will learn from your edits"}
          </p>
          {sent ? (
            <button
              onClick={onClose}
              className="text-xs font-medium text-text-primary bg-surface-card border border-border-default rounded-md px-4 py-2 hover:border-sp transition-colors"
            >
              Done
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="text-xs font-medium text-text-secondary hover:text-text-primary px-3 py-2 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setSent(true)}
                className="flex items-center gap-2 text-xs font-medium text-zinc-950 bg-sp px-4 py-2 rounded-md hover:brightness-110 shadow-[0_0_24px_var(--sp-glow)] transition-all"
              >
                {card.draft.kind === "meeting" ? (
                  <>
                    <Calendar className="size-3.5" />
                    Send invite
                  </>
                ) : card.draft.kind === "transcript" ? (
                  <>
                    <Check className="size-3.5" />
                    Mark reviewed
                  </>
                ) : (
                  <>
                    <Send className="size-3.5" />
                    Send email
                  </>
                )}
              </button>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}

// ---------- variants ----------

function EmailDraft({ draft }: { draft: Extract<DraftPayload, { kind: "email" }> }) {
  const [to, setTo] = useState(draft.to);
  const [subject, setSubject] = useState(draft.subject);
  const [body, setBody] = useState(draft.body);
  return (
    <div className="divide-y divide-border-default">
      <Row label="To">
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full bg-transparent text-sm text-text-primary focus:outline-none"
        />
      </Row>
      <Row label="Subject">
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-transparent text-sm text-text-primary font-medium focus:outline-none"
        />
      </Row>
      <div className="p-6">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={Math.min(20, body.split("\n").length + 2)}
          className="w-full bg-transparent text-sm text-text-primary leading-relaxed font-body resize-none focus:outline-none whitespace-pre-wrap"
        />
        <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-text-muted">
          <Pencil className="size-3" />
          Click anywhere to edit
        </div>
      </div>
    </div>
  );
}

function MeetingDraft({ draft }: { draft: Extract<DraftPayload, { kind: "meeting" }> }) {
  const [selected, setSelected] = useState(1); // recommended
  const [to, setTo] = useState(draft.to);
  const [title, setTitle] = useState(draft.title);
  const [body, setBody] = useState(draft.body);
  return (
    <div className="divide-y divide-border-default">
      <Row label="To">
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full bg-transparent text-sm text-text-primary focus:outline-none"
        />
      </Row>
      <Row label="Title">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-sm text-text-primary font-medium focus:outline-none"
        />
      </Row>
      <div className="px-6 py-4 space-y-2">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted">
          Proposed times
        </p>
        {draft.proposedTimes.map((time, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-md border transition-colors ${
              selected === i
                ? "border-sp bg-surface-sp text-text-primary"
                : "border-border-default text-text-secondary hover:text-text-primary hover:border-text-muted"
            }`}
          >
            <span
              className={`size-3.5 rounded-full border ${
                selected === i ? "border-sp bg-sp" : "border-border-default"
              } flex items-center justify-center shrink-0`}
            >
              {selected === i && <Check className="size-2.5 text-zinc-950" />}
            </span>
            <span className="text-sm font-mono tabular-nums">{time}</span>
            {i === 1 && (
              <span className="ml-auto text-[10px] font-mono uppercase tracking-[0.14em] text-sp">
                Recommended
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="p-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-2">
          Message
        </p>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={Math.min(16, body.split("\n").length + 2)}
          className="w-full bg-transparent text-sm text-text-primary leading-relaxed resize-none focus:outline-none whitespace-pre-wrap"
        />
      </div>
    </div>
  );
}

function TranscriptView({
  draft,
}: {
  draft: Extract<DraftPayload, { kind: "transcript" }>;
}) {
  return (
    <div className="p-6 space-y-4">
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted">
          Transcript excerpt
        </p>
        <h3 className="text-sm font-medium text-text-primary mt-1">{draft.title}</h3>
      </div>
      <div className="border-l-2 border-sp pl-4 py-1">
        <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-sp">
          {draft.speaker}
        </p>
        <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap mt-2 font-mono">
          {draft.excerpt}
        </p>
      </div>
    </div>
  );
}

function SentState({ draft }: { draft: DraftPayload }) {
  const label =
    draft.kind === "meeting"
      ? "Invite sent"
      : draft.kind === "transcript"
      ? "Reviewed"
      : "Email sent";
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 gap-3">
      <div className="size-12 rounded-full bg-surface-sp border border-sp/40 flex items-center justify-center">
        <Check className="size-6 text-sp" />
      </div>
      <p className="text-base font-display text-text-primary">{label}</p>
      <p className="text-xs text-text-muted max-w-xs">
        SuperPilot logged this to the deal timeline and set a follow-up reminder for 48 hours.
      </p>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4 px-6 py-3">
      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted w-16 shrink-0">
        {label}
      </span>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
