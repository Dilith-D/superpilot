import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";

interface Step {
  id: number;
  targetId?: string;
  title: string;
  body: string;
  pain?: string;
  chapter?: string;
  action?: () => void;
}

export function GuidedTour() {
  const [step, setStep] = useState<number | null>(null);
  const navigate = useNavigate();

  const steps: Step[] = [
    {
      id: 1,
      title: "",
      body: "",
    },
    {
      id: 2,
      targetId: "superpilot-feed",
      pain: "2+ hrs/day reconstructing context",
      title: "Deal intelligence feed",
      body: "Without SuperPilot, reps start each day reading email threads, Slack messages, and call notes — piecing together what they need to know. SuperPilot surfaces what actually needs your attention, ranked by urgency, with context already assembled.",
    },
    {
      id: 3,
      chapter: "MOMENT 1 · BEFORE THE CALL",
      pain: "45 min prep before every call",
      targetId: "superpilot-brief-card",
      title: "Pre-call brief",
      body: "Today, reps manually prep for each call — skimming notes, searching old emails, reading transcripts. SuperPilot assembles the full brief automatically: open commitments, stakeholder map, key concerns, and a suggested opener.",
      action: () => navigate({ to: "/crm/deals/$dealId", params: { dealId: "acme-corp" } }),
    },
    {
      id: 4,
      chapter: "MOMENT 1 · BEFORE THE CALL",
      pain: "No traceability = no trust",
      targetId: "superpilot-view-links",
      title: "Every insight links to its source",
      body: "If AI surfaces an insight with no source, reps don't trust it. Every data point in SuperPilot links directly to its source — an email, a call timestamp, a document. Tap any insight to see exactly where it came from.",
    },
    {
      id: 5,
      chapter: "MOMENT 2 · AFTER THE CALL",
      pain: "30 min of admin after every call",
      title: "Post-call intelligence",
      body: "After a call, reps manually write notes, update the CRM, create tasks, and draft a follow-up email — often an hour later, from memory. SuperPilot does this the moment the call ends: tasks, commitments, follow-up email, all ready to confirm.",
      action: () => window.dispatchEvent(new Event("superpilot:tour-open-postcall")),
    },
    {
      id: 6,
      chapter: "MOMENT 2 · AFTER THE CALL",
      pain: "Wrong owner = dropped ball",
      targetId: "superpilot-product-tag",
      title: "Automatic team routing",
      body: "When a task belongs to another team, it gets lost in a DM or forgotten entirely. SuperPilot identified this task required Product — and tagged them automatically. No manual routing, no dropped balls.",
    },
    {
      id: 7,
      chapter: "MOMENT 3 · BETWEEN CALLS",
      pain: "Every handoff = context reset",
      targetId: "superpilot-move-stage",
      title: "Handoff brief",
      body: "When a deal moves from AE to Implementation, the new owner starts from zero — re-reading emails and re-asking questions the prospect already answered. SuperPilot generates the complete handoff brief: why they bought, what was promised, what to watch out for.",
      action: () => window.dispatchEvent(new Event("superpilot:tour-open-handoff")),
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem("superpilot_tour_done")) {
      const t = setTimeout(() => setStep(1), 800);
      return () => clearTimeout(t);
    }
    const replay = () => {
      localStorage.removeItem("superpilot_tour_done");
      setStep(1);
    };
    window.addEventListener("superpilot:replay-tour", replay);
    return () => window.removeEventListener("superpilot:replay-tour", replay);
  }, []);

  useEffect(() => {
    const replay = () => {
      localStorage.removeItem("superpilot_tour_done");
      setStep(1);
    };
    window.addEventListener("superpilot:replay-tour", replay);
    return () => window.removeEventListener("superpilot:replay-tour", replay);
  }, []);

  const current = steps.find((s) => s.id === step);

  const next = useCallback(() => {
    if (!step) return;
    const cur = steps.find((s) => s.id === step);
    if (cur?.action) cur.action();
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      localStorage.setItem("superpilot_tour_done", "1");
      setStep(null);
    }
  }, [step, steps]);

  const dismiss = useCallback(() => {
    localStorage.setItem("superpilot_tour_done", "1");
    setStep(null);
  }, []);

  // Spotlight the target element
  useEffect(() => {
    if (!current?.targetId) return;
    const el = document.getElementById(current.targetId);
    if (!el) return;
    el.classList.add("sp-tour-spotlight");
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return () => el.classList.remove("sp-tour-spotlight");
  }, [current]);

  return (
    <>
      {/* Backdrop — all steps */}
      <AnimatePresence>
        {step !== null && (
          <motion.div
            key="tour-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Step 1 — full-screen PM Product Brief overlay */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div
            key="tour-step-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="bg-surface-base border border-border-default rounded-2xl shadow-2xl p-8 w-full max-w-[560px] space-y-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <span className="text-[9px] font-mono font-bold text-sp uppercase tracking-[0.2em]">
                  ✦ SuperPilot · PM Product Brief
                </span>
                <button
                  onClick={dismiss}
                  className="shrink-0 size-7 grid place-items-center rounded-md text-text-muted hover:text-text-primary hover:bg-surface-sidebar transition-colors"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              {/* The Problem */}
              <div className="space-y-2">
                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-text-muted">
                  The Problem
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Sales reps lose 2+ hours every day reconstructing context — skimming emails, reading transcripts, and manually prepping for calls. After every call, another 30 minutes of admin. When deals change hands, the new owner starts from zero. The work is never in the CRM. It's in reps' heads.
                </p>
              </div>

              {/* What We Built */}
              <div className="space-y-2">
                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-text-muted">
                  What We Built
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  SuperPilot is an AI intelligence layer that sits on top of your CRM. It reads your emails, call transcripts, and activity history — and surfaces the right context at the right moment, with every insight linked to its source.
                </p>
              </div>

              {/* 3 Core Moments */}
              <div className="space-y-3">
                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-text-muted">
                  3 Core Moments
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Before the call", desc: "auto brief assembled from your history" },
                    { label: "After the call", desc: "tasks, commitments & follow-up email" },
                    { label: "Between calls", desc: "complete handoff brief for every transition" },
                  ].map((m) => (
                    <div key={m.label} className="flex items-start gap-2.5">
                      <span className="mt-[7px] size-1.5 rounded-full bg-sp shrink-0" />
                      <p className="text-sm text-text-secondary leading-relaxed">
                        <span className="font-medium text-text-primary">{m.label}</span>
                        {" — "}
                        {m.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={dismiss}
                  className="text-xs font-medium text-text-muted hover:text-text-primary px-3 py-2 transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={next}
                  className="flex items-center gap-1.5 text-xs font-medium bg-sp text-zinc-950 px-5 py-2.5 rounded-md hover:brightness-110 shadow-[0_0_16px_var(--sp-glow)] transition-all"
                >
                  Start demo
                  <ArrowRight className="size-3" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Steps 2-7 — bottom card */}
      <AnimatePresence>
        {current && step !== 1 && (
          <motion.div
            key={`tour-step-${current.id}`}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[70] w-[480px] max-w-[calc(100vw-2rem)] pointer-events-auto"
          >
            <div className="bg-surface-base border border-border-default rounded-xl shadow-2xl p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[9px] font-mono font-bold text-sp uppercase tracking-[0.2em]">
                      ✦ SuperPilot Tour · Step {current.id}/{steps.length}
                    </span>
                  </div>
                  {current.chapter && (
                    <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-text-muted">
                      {current.chapter}
                    </p>
                  )}
                  {current.pain && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded border border-amber/20 bg-amber/10 text-amber text-[9px] font-mono uppercase tracking-[0.1em]">
                      PAIN: {current.pain}
                    </span>
                  )}
                  <h3 className="text-base font-display font-medium text-text-primary">
                    {current.title}
                  </h3>
                </div>
                <button
                  onClick={dismiss}
                  className="shrink-0 size-7 grid place-items-center rounded-md text-text-muted hover:text-text-primary hover:bg-surface-sidebar transition-colors"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">{current.body}</p>

              <div className="flex items-center justify-between">
                {/* Progress dots */}
                <div className="flex items-center gap-1.5">
                  {steps.map((s) => (
                    <span
                      key={s.id}
                      className={`rounded-full transition-all ${
                        s.id === current.id
                          ? "size-2 bg-sp"
                          : s.id < current.id
                          ? "size-1.5 bg-sp/40"
                          : "size-1.5 bg-border-default"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={dismiss}
                    className="text-xs font-medium text-text-muted hover:text-text-primary px-3 py-2 transition-colors"
                  >
                    Skip tour
                  </button>
                  <button
                    onClick={next}
                    className="flex items-center gap-1.5 text-xs font-medium bg-sp text-zinc-950 px-4 py-2 rounded-md hover:brightness-110 shadow-[0_0_16px_var(--sp-glow)] transition-all"
                  >
                    {current.id === steps.length ? "Finish" : "Next"}
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
