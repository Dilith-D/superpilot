import { AnimatePresence, motion } from "motion/react";
import { X, Sparkles, AlertTriangle, ExternalLink } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const commitments = [
  { text: "3–4 week migration timeline", source: "Oct 22 call" },
  { text: "Chargebee integration out-of-box", source: "Oct 16 email" },
  { text: "Finance custom report in week 2", source: "Oct 21 call" },
];

const stakeholders = [
  { name: "Priya Mehta", role: "VP Ops", note: "champion, main contact" },
  { name: "Rohan Shah", role: "IT", note: "infra approvals" },
  { name: "CFO", role: "", note: "signed off, not day-to-day" },
];

const watchouts = [
  "IT approval adds ~1 week to timeline",
  "Finance report scope not finalized",
  "Priya expects weekly status updates",
];

export function HandoffModal({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-[600px] max-h-[90vh] flex flex-col bg-surface-base border border-border-default rounded-xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-default bg-surface-card">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-3.5 text-sp" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-sp">
                      SuperPilot — Handoff brief generated
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-text-muted">
                    AE → Implementation · Acme Corp
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="size-8 grid place-items-center rounded-md text-text-muted hover:text-text-primary hover:bg-surface-sidebar transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                {/* Why they bought */}
                <section>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-1.5">
                    Why they bought
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Migration from Salesforce blocking ops reporting. Priya owns this internally.
                    Decision driven by timeline and Chargebee fit.
                  </p>
                </section>

                {/* Commitments */}
                <section>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-1.5">
                    Commitments made
                  </p>
                  <ul className="space-y-2">
                    {commitments.map((c, i) => (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">· {c.text}</span>
                        <button className="shrink-0 flex items-center gap-1 text-[10px] font-mono text-sp hover:brightness-125 ml-3">
                          {c.source} <ExternalLink className="size-3" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Stakeholders */}
                <section>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-1.5">
                    Stakeholders
                  </p>
                  <ul className="space-y-1.5">
                    {stakeholders.map((s, i) => (
                      <li key={i} className="text-sm text-text-secondary">
                        · <span className="font-medium text-text-primary">{s.name}</span>
                        {s.role && <span className="text-text-muted"> ({s.role})</span>}
                        {" — "}{s.note}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Watch out for */}
                <section>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber mb-1.5 flex items-center gap-1.5">
                    <AlertTriangle className="size-3" />
                    Watch out for
                  </p>
                  <ul className="space-y-1.5">
                    {watchouts.map((w, i) => (
                      <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                        <span className="text-amber mt-0.5">·</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Success metric */}
                <section>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted mb-1.5">
                    Success metric
                  </p>
                  <div className="bg-surface-card border border-border-default rounded-md p-3">
                    <p className="text-sm text-text-primary italic font-display leading-relaxed">
                      "Live and operational within 6 weeks of sign"
                    </p>
                  </div>
                </section>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-2 px-6 py-4 border-t border-border-default bg-surface-card">
                <button
                  onClick={onClose}
                  className="flex-1 text-xs font-medium bg-sp text-zinc-950 py-2.5 rounded-md hover:brightness-110 shadow-[0_0_16px_var(--sp-glow)] transition-all"
                >
                  Assign to Implementation →
                </button>
                <button className="text-xs font-medium text-text-secondary hover:text-text-primary px-4 py-2.5 rounded-md border border-border-default hover:border-text-muted transition-colors">
                  Edit brief
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
