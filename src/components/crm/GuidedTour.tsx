import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";

interface Step {
  id: number;
  targetId?: string;
  title: string;
  body: string;
  action?: () => void;
}

export function GuidedTour() {
  const [step, setStep] = useState<number | null>(null);
  const navigate = useNavigate();

  const steps: Step[] = [
    {
      id: 1,
      title: "Welcome to Superleap with SuperPilot",
      body: "SuperPilot is your AI sales intelligence layer. It listens, reads, and surfaces everything your team needs to win — before, during, and after every deal interaction.",
    },
    {
      id: 2,
      targetId: "superpilot-feed",
      title: "Deal intelligence feed",
      body: "Every morning, SuperPilot surfaces which deals need attention — commitments overdue, buying signals, and risks — so you start the day already knowing what to do.",
    },
    {
      id: 3,
      targetId: "superpilot-brief-card",
      title: "Pre-call brief",
      body: "SuperPilot assembled this brief automatically from your emails, call transcripts, and CRM history. Every source is linked — click any insight to see exactly where it came from.",
      action: () => navigate({ to: "/crm/deals/$dealId", params: { dealId: "acme-corp" } }),
    },
    {
      id: 4,
      targetId: "superpilot-view-links",
      title: "Every insight links to its source",
      body: "SuperPilot doesn't just surface insights — it shows you the exact email, call timestamp, or document it came from. Full transparency, always.",
    },
    {
      id: 5,
      title: "Post-call intelligence",
      body: "When a call ends, SuperPilot does the admin. It extracts tasks, commitments, and a follow-up email — ready for you to review in seconds.",
      action: () => window.dispatchEvent(new Event("superpilot:tour-open-postcall")),
    },
    {
      id: 6,
      targetId: "superpilot-product-tag",
      title: "Automatic team routing",
      body: "SuperPilot flagged and tagged the product team on the bulk export task automatically — no manual assignment needed. The right people get looped in without you lifting a finger.",
    },
    {
      id: 7,
      targetId: "superpilot-move-stage",
      title: "Handoff brief",
      body: "When a deal moves stages, SuperPilot generates a complete handoff brief — why they bought, what was promised, who the stakeholders are, and what to watch out for. Nothing gets lost in translation.",
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

      <AnimatePresence>
        {current && (
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
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold text-sp uppercase tracking-[0.2em]">
                      ✦ SuperPilot Tour · Step {current.id}/{steps.length}
                    </span>
                  </div>
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
