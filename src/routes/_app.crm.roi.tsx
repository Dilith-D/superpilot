import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Users, TrendingUp, Shield } from "lucide-react";
import { ROICalculator } from "@/components/crm/ROICalculator";

export const Route = createFileRoute("/_app/crm/roi")({
  component: ROIPage,
});

const IND = "#6366F1"; const EME = "#10B981"; const AMB = "#F59E0B"; const RED = "#EF4444";
const CARD = "#12121A"; const SPC = "#0F0F1C"; const BOR = "#1E1E2E";
const TX1 = "#F5F5F5"; const TX2 = "#8B8B9A"; const MUT = "#4B4B5A"; const BG = "#0A0A0F";
const SG = '"Space Grotesk", system-ui, sans-serif';
const DM = '"DM Sans", system-ui, sans-serif';
const JB = '"JetBrains Mono", ui-monospace, monospace';

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  );
}

function SLabel({ children }: { children: string }) {
  return <p style={{ fontFamily: JB, fontSize: 11, color: MUT, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>{children}</p>;
}
function SHead({ children }: { children: string }) {
  return <h2 style={{ fontFamily: SG, fontSize: 22, fontWeight: 600, color: TX1, marginBottom: 24, marginTop: 0, lineHeight: 1.3 }}>{children}</h2>;
}
function IndigoPill({ children }: { children: string }) {
  return <span style={{ display: "inline-flex", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: JB, fontWeight: 700, background: `${IND}20`, color: IND, border: `1px solid ${IND}40`, letterSpacing: "0.05em" }}>{children}</span>;
}

// ─── Before/After comparison ──────────────────────────────────────────────────
const BEFORE_ROWS = [
  { label: "Pre-call prep", value: "12 min per call" },
  { label: "Post-call admin", value: "15 min per call" },
  { label: "Context reconstruction", value: "Manual, error-prone" },
  { label: "Handoff preparation", value: "30–60 min per transition" },
  { label: "New rep ramp time", value: "3–4 months" },
  { label: "Daily selling time", value: "~5.5 hours of 8" },
];
const AFTER_ROWS = [
  { label: "Pre-call prep", value: "1 min per call", pct: "↓92%" },
  { label: "Post-call admin", value: "2 min per call", pct: "↓87%" },
  { label: "Context reconstruction", value: "Automatic, sourced", pct: "" },
  { label: "Handoff preparation", value: "Auto-generated in seconds", pct: "" },
  { label: "New rep ramp time", value: "6–8 weeks", pct: "↓60%" },
  { label: "Daily selling time", value: "~7.5 hours of 8", pct: "" },
];

function BeforeAfterTable() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {/* Without SuperPilot */}
      <div style={{ background: CARD, border: `1px solid ${BOR}`, borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", background: "#1A0A0A", borderBottom: `1px solid rgba(239,68,68,0.2)` }}>
          <p style={{ fontFamily: SG, fontSize: 13, fontWeight: 600, color: "#EF4444", margin: 0 }}>Without SuperPilot</p>
        </div>
        {BEFORE_ROWS.map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "11px 16px", borderBottom: i < BEFORE_ROWS.length - 1 ? `1px solid ${BOR}` : "none", alignItems: "center" }}>
            <span style={{ fontFamily: DM, fontSize: 12, color: MUT }}>{row.label}</span>
            <span style={{ fontFamily: JB, fontSize: 12, color: TX2 }}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* With SuperPilot */}
      <div style={{ background: SPC, border: `1px solid ${BOR}`, borderLeft: `3px solid ${IND}`, borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", background: `${IND}10`, borderBottom: `1px solid ${IND}30` }}>
          <p style={{ fontFamily: SG, fontSize: 13, fontWeight: 600, color: IND, margin: 0 }}>With SuperPilot</p>
        </div>
        {AFTER_ROWS.map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "11px 16px", borderBottom: i < AFTER_ROWS.length - 1 ? `1px solid ${BOR}` : "none", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: DM, fontSize: 12, color: TX2 }}>{row.label}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: JB, fontSize: 12, color: TX1 }}>{row.value}</span>
              {row.pct && <span style={{ fontFamily: JB, fontSize: 10, color: EME, fontWeight: 700 }}>{row.pct}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Beyond Productivity cards ─────────────────────────────────────────────────
const BEYOND = [
  {
    icon: Users,
    color: IND,
    title: "Handoff Quality",
    body: "Every AE-to-Implementation and AE-to-CSM handoff carries the complete deal memory — every commitment, every concern, every stakeholder. Customers stop repeating themselves. Onboarding NPS improves. Churn from misaligned expectations drops.",
    chip: "Industry avg onboarding NPS lifts 18–24 pts when context is preserved",
  },
  {
    icon: TrendingUp,
    color: EME,
    title: "New Rep Productivity",
    body: "A new rep joining a team with SuperPilot inherits full deal history from day one. They don't spend 3 months learning accounts — they start from the same context as the rep they replaced. Ramp time drops from 3–4 months to 6–8 weeks.",
    chip: "60% reduction in time-to-first-deal for new reps",
  },
  {
    icon: Shield,
    color: IND,
    title: "Deal Retention at Risk Moments",
    body: "Deals go cold not because of bad selling but because of missed follow-ups and forgotten commitments. SuperPilot's proactive monitoring catches these before they become lost deals. Every flagged deal is a revenue retention event.",
    chip: "Estimated 8–12% reduction in deal slippage from operational gaps",
  },
];

function ROIPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 32px 96px", display: "flex", flexDirection: "column", gap: 72 }}>

        {/* Header */}
        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          <IndigoPill>Business Case Tool</IndigoPill>
          <h1 style={{ fontFamily: SG, fontSize: 32, fontWeight: 700, color: TX1, margin: "14px 0 10px", letterSpacing: "-0.02em" }}>ROI Calculator</h1>
          <p style={{ fontFamily: DM, fontSize: 16, color: TX2, lineHeight: 1.65, maxWidth: 540, margin: 0 }}>
            Quantify SuperPilot's impact on your team's productivity and revenue.
          </p>
        </motion.header>

        {/* Section 1 — Before/After */}
        <section>
          <FadeIn>
            <SLabel>Per-Rep Impact</SLabel>
            <SHead>What changes for each rep.</SHead>
          </FadeIn>
          <FadeIn delay={0.06}><BeforeAfterTable /></FadeIn>
        </section>

        {/* Section 2 — Calculator */}
        <section>
          <FadeIn>
            <SLabel>Interactive Calculator</SLabel>
            <SHead>Model your team's numbers.</SHead>
          </FadeIn>
          <FadeIn delay={0.06}><ROICalculator /></FadeIn>
        </section>

        {/* Section 3 — Beyond Productivity */}
        <section>
          <FadeIn>
            <SLabel>Beyond Productivity</SLabel>
            <SHead>The numbers you can't calculate. But can't ignore.</SHead>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {BEYOND.map((card, i) => {
              const Icon = card.icon;
              return (
                <FadeIn key={card.title} delay={0.04 + i * 0.06}>
                  <div style={{ background: CARD, border: `1px solid ${BOR}`, borderRadius: 10, padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <Icon size={18} color={card.color} strokeWidth={1.75} />
                      <h3 style={{ fontFamily: SG, fontSize: 15, fontWeight: 600, color: TX1, margin: 0 }}>{card.title}</h3>
                    </div>
                    <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, margin: "0 0 12px" }}>{card.body}</p>
                    <span style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 5, fontFamily: JB, fontSize: 11, background: `${IND}10`, color: IND, border: `1px solid ${IND}30` }}>
                      {card.chip}
                    </span>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* Section 4 — The math */}
        <FadeIn>
          <div style={{ background: SPC, borderLeft: `3px solid ${IND}`, borderRadius: 10, padding: 24 }}>
            <p style={{ fontFamily: JB, fontSize: 12, color: IND, fontWeight: 700, marginBottom: 12, letterSpacing: "0.05em" }}>✦ The case in one paragraph</p>
            <p style={{ fontFamily: DM, fontSize: 15, color: TX1, lineHeight: 1.8, margin: 0 }}>
              A 10-rep B2B SaaS sales team loses roughly 40 hours of selling time daily to pre-call prep and post-call admin. That is 5 full-time equivalent roles doing zero-revenue work every single day. SuperPilot recovers 2 hours per rep per day — returning the equivalent of 2.5 FTEs to selling. At ₹5L average deal value and an 8% conversion rate on recovered call capacity, that is ₹2.4 Cr+ in additional annual revenue potential for a 10-person team. The feature pays for itself in the first month.
            </p>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
