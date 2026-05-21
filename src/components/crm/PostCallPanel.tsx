import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, CheckCircle2, Sparkles, Mail, ExternalLink } from "lucide-react";
import { type Deal } from "@/lib/crm-data";
import { DraftModal } from "@/components/crm/DraftModal";

const postcallTasks = [
  { id: "pc-1", label: "Send migration estimate doc", due: "Tomorrow", owner: "You", tag: null },
  { id: "pc-2", label: "Share Chargebee integration guide", due: "Friday", owner: "You", tag: null },
  { id: "pc-3", label: "Get bulk export timeline", due: "This week", owner: null, tag: "Product Team" },
  { id: "pc-4", label: "Schedule CFO intro call", due: "Next week", owner: "You", tag: null },
];

interface Props {
  open: boolean;
  onClose: () => void;
  deal: Deal;
}

export function PostCallPanel({ open, onClose, deal }: Props) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [draftOpen, setDraftOpen] = useState(false);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20"
              onClick={onClose}
            />
            <motion.aside
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 h-full w-[480px] max-w-full z-50 bg-surface-base border-l border-border-default shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-default bg-surface-card">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-3.5 text-sp" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-sp">
                      SuperPilot — Post-call actions
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-text-muted">
                    Oct 22 · Discovery Call · 34 min · {deal.company}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="size-8 grid place-items-center rounded-md text-text-muted hover:text-text-primary hover:bg-surface-sidebar transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                {/* Call summary */}
                <section>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-2">
                    Call summary
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Discussed migration timeline. Priya confirmed Chargebee is critical. Rohan needs
                    to approve infra changes. CFO presentation needed before sign-off.
                  </p>
                </section>

                {/* Tasks */}
                <section>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-3">
                    Tasks created — review & confirm
                  </p>
                  <ul className="space-y-2.5">
                    {postcallTasks.map((t) => (
                      <li key={t.id} className="flex items-start gap-3">
                        <button
                          onClick={() => toggle(t.id)}
                          className={`mt-0.5 shrink-0 size-5 rounded border flex items-center justify-center transition-colors ${
                            checked.has(t.id)
                              ? "bg-sp border-sp"
                              : "border-border-default hover:border-sp"
                          }`}
                        >
                          {checked.has(t.id) && <CheckCircle2 className="size-3 text-zinc-950" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${checked.has(t.id) ? "line-through text-text-muted" : "text-text-primary"}`}>
                            {t.label}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-mono text-text-muted">
                              Due: {t.due}
                            </span>
                            {t.owner && (
                              <span className="text-[10px] font-mono text-text-muted">· {t.owner}</span>
                            )}
                            {t.tag && (
                              <span
                                id="superpilot-product-tag"
                                className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-[0.14em] bg-surface-sp text-sp px-1.5 py-0.5 rounded"
                              >
                                {t.tag} ✦
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Commitment memory */}
                <section>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-2">
                    Commitment added to memory
                  </p>
                  <div className="rounded-md border border-amber/30 bg-amber/5 p-3 space-y-1">
                    <p className="text-sm text-text-primary font-medium">
                      "Migration live in 3–4 weeks from contract sign"
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted">
                      <span>Oct 22 · 00:24:13</span>
                      <button className="flex items-center gap-1 text-sp hover:brightness-125">
                        transcript <ExternalLink className="size-3" />
                      </button>
                    </div>
                  </div>
                </section>

                {/* Follow-up email */}
                <section>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-2">
                    Follow-up email
                  </p>
                  <div className="rounded-md border border-border-default bg-surface-card p-3 space-y-2">
                    <p className="text-[10px] font-mono text-text-muted">To: Priya Mehta</p>
                    <p className="text-sm text-text-secondary leading-relaxed italic">
                      "Hi Priya, great speaking with you today. As promised, I'll follow up with the
                      migration timeline estimate and the Chargebee integration guide shortly…"
                    </p>
                    <button
                      onClick={() => setDraftOpen(true)}
                      className="flex items-center gap-1.5 text-xs font-medium text-sp hover:brightness-125 transition-all"
                    >
                      <Mail className="size-3" />
                      Preview full draft
                      <ExternalLink className="size-3" />
                    </button>
                  </div>
                </section>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-2 px-6 py-4 border-t border-border-default bg-surface-card">
                <button
                  onClick={onClose}
                  className="flex-1 text-xs font-medium bg-sp text-zinc-950 py-2.5 rounded-md hover:brightness-110 shadow-[0_0_16px_var(--sp-glow)] transition-all"
                >
                  Confirm all →
                </button>
                <button className="text-xs font-medium text-text-secondary hover:text-text-primary px-4 py-2.5 rounded-md border border-border-default hover:border-text-muted transition-colors">
                  Edit tasks
                </button>
                <button
                  onClick={onClose}
                  className="text-xs font-medium text-text-muted hover:text-text-primary px-3 py-2.5 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {draftOpen && (
        <DraftModal
          card={{
            id: "postcall-draft",
            dealId: "acme-corp",
            kind: "commitment",
            headline: "Follow-up: Migration timeline & Chargebee guide",
            detail: "Draft follow-up email after Oct 22 discovery call",
            source: "SuperPilot",
            confidence: 96,
            timestamp: "Just now",
            cta: { verb: "draft", label: "Draft email" },
          }}
          onClose={() => setDraftOpen(false)}
        />
      )}
    </>
  );
}
