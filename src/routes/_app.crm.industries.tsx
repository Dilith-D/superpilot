import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Code, GraduationCap, Landmark, Building2, Heart } from "lucide-react";

export const Route = createFileRoute("/_app/crm/industries")({
  component: IndustriesPage,
});

const IND = "#6366F1"; const EME = "#10B981"; const AMB = "#F59E0B"; const RED = "#EF4444";
const BLUE = "#3B82F6";
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

function Pill({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span style={{ display: "inline-flex", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: JB, fontWeight: 700, background: bg, color, border: `1px solid ${border}` }}>
      {label}
    </span>
  );
}

function FeatureChip({ c }: { c: string }) {
  return (
    <span style={{ display: "inline-flex", padding: "4px 10px", borderRadius: 5, fontSize: 11, fontFamily: JB, background: `${IND}15`, color: IND, border: `1px solid ${IND}30` }}>
      {c}
    </span>
  );
}

function SourceChip({ c }: { c: string }) {
  return (
    <span style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 5, fontSize: 11, fontFamily: JB, background: SPC, color: TX2, border: `1px solid ${BOR}` }}>
      {c}
    </span>
  );
}

function IndustryCard({
  icon: Icon,
  iconColor,
  accentColor,
  title,
  badge,
  badgeColor,
  user,
  problem,
  featureChips,
  featureBox,
  impact,
}: {
  icon: React.ElementType;
  iconColor: string;
  accentColor: string;
  title: string;
  badge: string;
  badgeColor: string;
  user: string;
  problem: string;
  featureChips?: string[];
  featureBox: React.ReactNode;
  impact: string;
}) {
  return (
    <div style={{
      background: CARD,
      border: `1px solid ${BOR}`,
      borderLeft: `3px solid ${accentColor}`,
      borderRadius: 10,
      padding: 28,
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: `${accentColor}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon size={20} color={accentColor} strokeWidth={1.75} />
          </div>
          <h2 style={{ fontFamily: SG, fontSize: 20, fontWeight: 600, color: TX1, margin: 0 }}>{title}</h2>
        </div>
        <Pill label={badge} color={badgeColor === "indigo" ? IND : MUT} bg={badgeColor === "indigo" ? `${IND}20` : "#ffffff0A"} border={badgeColor === "indigo" ? `${IND}40` : BOR} />
      </div>

      {/* User + problem */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontFamily: JB, fontSize: 10, color: MUT, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 4 }}>User</p>
        <p style={{ fontFamily: DM, fontSize: 14, color: TX1, fontWeight: 500, margin: "0 0 12px" }}>{user}</p>
        <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, margin: 0 }}>{problem}</p>
      </div>

      {/* Feature chips */}
      {featureChips && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {featureChips.map(c => <FeatureChip key={c} c={c} />)}
        </div>
      )}

      {/* Feature box */}
      <div style={{ marginBottom: 16 }}>{featureBox}</div>

      {/* Impact */}
      <div style={{ padding: "10px 14px", background: `${accentColor}0D`, border: `1px solid ${accentColor}30`, borderRadius: 7, fontFamily: JB, fontSize: 12, color: accentColor, lineHeight: 1.6 }}>
        {impact}
      </div>
    </div>
  );
}

function CodeBox({ accent, label, lines }: { accent: string; label: string; lines: string[] }) {
  return (
    <div style={{ background: SPC, borderLeft: `3px solid ${accent}`, borderRadius: 8, padding: 16 }}>
      <p style={{ fontFamily: JB, fontSize: 10, color: accent, fontWeight: 700, marginBottom: 12, letterSpacing: "0.08em" }}>{label}</p>
      {lines.map((line, i) => (
        <p key={i} style={{ fontFamily: DM, fontSize: 13, color: line.startsWith("→") ? accent : TX2, lineHeight: 1.6, margin: "0 0 4px" }}>{line}</p>
      ))}
    </div>
  );
}

function IndustriesPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 32px 96px", display: "flex", flexDirection: "column", gap: 56 }}>

        {/* Header */}
        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          <Pill label="Universal applicability" color={IND} bg={`${IND}20`} border={`${IND}40`} />
          <h1 style={{ fontFamily: SG, fontSize: 32, fontWeight: 700, color: TX1, margin: "14px 0 10px", letterSpacing: "-0.02em" }}>
            SuperPilot Across Industries
          </h1>
          <p style={{ fontFamily: DM, fontSize: 16, color: TX2, lineHeight: 1.65, maxWidth: 600, margin: 0 }}>
            The same institutional memory problem exists everywhere someone manages complex, multi-touchpoint relationships. Here's how SuperPilot adapts.
          </p>
        </motion.header>

        {/* Intro card */}
        <FadeIn>
          <div style={{ background: SPC, borderLeft: `3px solid ${IND}`, borderRadius: 10, padding: 20 }}>
            <p style={{ fontFamily: JB, fontSize: 12, color: IND, fontWeight: 700, marginBottom: 10, letterSpacing: "0.05em" }}>✦ One core insight, many expressions</p>
            <p style={{ fontFamily: DM, fontSize: 14, color: TX2, lineHeight: 1.75, margin: 0 }}>
              The core problem SuperPilot solves — context fragmentation across multiple touchpoints with multiple stakeholders — exists in every industry with complex customer relationships. The data sources, workflows, and specific moments differ. The underlying intelligence architecture does not.
            </p>
          </div>
        </FadeIn>

        {/* Industry cards */}
        <FadeIn delay={0.04}>
          <IndustryCard
            icon={Code} iconColor={IND} accentColor={IND}
            title="B2B SaaS / Technology" badge="Primary vertical" badgeColor="indigo"
            user="Account Executive"
            problem="6+ role handoffs over a 12-week deal cycle. Context evaporates at every transition. Reps spend 2+ hours daily reconstructing what was said, what was promised, and who needs to know what."
            featureChips={["Pre-call Brief", "Post-call Extraction", "Handoff Brief"]}
            featureBox={
              <CodeBox accent={IND} label="SUPERPILOT — DEAL EXAMPLE" lines={[
                "Before a renewal call with Acme Corp: SuperPilot surfaces that the AE promised",
                "3-4 week migration 8 months ago, the champion has changed, and the CFO now",
                "has authority. CSM walks in with full context. Renewal is handled like a",
                "continuation, not a new conversation.",
              ]} />
            }
            impact="2 hrs/day recovered per rep · 65% admin reduction · 60% faster new rep ramp"
          />
        </FadeIn>

        <FadeIn delay={0.06}>
          <IndustryCard
            icon={GraduationCap} iconColor={EME} accentColor={EME}
            title="Education / EdTech" badge="B2C" badgeColor="gray"
            user="Admissions Counsellor"
            problem="150 leads in a daily queue. Each follow-up call requires remembering what exam the student is targeting, what objection they raised last time, and how many days until their exam deadline. At 40 follow-ups per day, this prep is impossible to do manually."
            featureBox={
              <div style={{ background: SPC, borderLeft: `3px solid ${EME}`, borderRadius: 8, padding: 16 }}>
                <p style={{ fontFamily: JB, fontSize: 10, color: EME, fontWeight: 700, marginBottom: 12, letterSpacing: "0.08em" }}>✦ SUPERPILOT — RE-ENTRY BRIEF (EdTech variant)</p>
                {[
                  "Last discussed: JEE Advanced prep, concerned about Math section",
                  'Objection raised: "Coaching feels expensive vs self-study"',
                  "Lead today with: 11 days to exam — urgency window is now",
                ].map((line, i) => (
                  <p key={i} style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.6, margin: "0 0 6px", paddingLeft: 12, borderLeft: `2px solid ${BOR}` }}>{line}</p>
                ))}
                <p style={{ fontFamily: DM, fontSize: 12, color: MUT, marginTop: 12, fontStyle: "italic" }}>
                  Appears automatically before every follow-up call. Rep reads in 10 seconds. Conversation continues, not restarts.
                </p>
              </div>
            }
            impact="2–3 min prep eliminated × 40 follow-ups/day = 1.5–2 hrs saved · 10–15 additional students reached per counsellor per day"
          />
        </FadeIn>

        <FadeIn delay={0.06}>
          <IndustryCard
            icon={Landmark} iconColor={AMB} accentColor={AMB}
            title="BFSI / Lending" badge="B2B" badgeColor="gray"
            user="Relationship Manager"
            problem="An RM manages 20–40 active loan proposals simultaneously. Each deal involves multiple stakeholders — promoter, CFO, compliance team. A proposal sent 2 weeks ago with no response could be worth ₹2Cr. The RM has no system telling them which deals are silently dying."
            featureBox={
              <CodeBox accent={AMB} label="⚠ HIGH RISK — Mehta Enterprises" lines={[
                "Credit proposal opened 3 times this week. No response in 6 days.",
                "CFO engaged but promoter not yet contacted.",
                "→ Call promoter today. Proposal stage avg is 8 days — you're at 6.",
              ]} />
            }
            impact="At ₹50L average ticket size, recovering 2 stalled deals per RM per month = ₹1Cr+ in monthly disbursement uplift per RM"
          />
        </FadeIn>

        <FadeIn delay={0.06}>
          <IndustryCard
            icon={Building2} iconColor={BLUE} accentColor={BLUE}
            title="Real Estate" badge="B2C" badgeColor="gray"
            user="Property Sales Consultant"
            problem="A site visit happened 3 weeks ago. The buyer expressed interest in a 3BHK, had concerns about parking, and mentioned their budget is flexible if the floor is right. The consultant has 40 active prospects. None of this is in the CRM. The next call starts from zero."
            featureBox={
              <CodeBox accent={BLUE} label="SUPERPILOT — BUYER BRIEF" lines={[
                "Last interaction: Site visit, Oct 14",
                "Key preference: 3BHK, high floor, parking concern",
                "Budget signal: Flexible if right unit — ₹1.2–1.5Cr range",
                "→ Follow up with: Tower B, floors 12–15 just released. Matches profile exactly.",
              ]} />
            }
            impact="Site-visit-to-booking conversion improves when context is preserved. Industry avg: 12%. With context-aware follow-up: 18–22%."
          />
        </FadeIn>

        <FadeIn delay={0.06}>
          <IndustryCard
            icon={Heart} iconColor={RED} accentColor={RED}
            title="Healthcare" badge="B2C" badgeColor="gray"
            user="Patient Coordinator / Health Counsellor"
            problem="A patient inquiry came in for fertility treatment. Three touchpoints happened — a call, a WhatsApp exchange, and a consultation. Each person they spoke to started fresh. The patient felt like a number. High-stakes decisions require continuity, not repeated explanation."
            featureBox={
              <CodeBox accent={RED} label="SUPERPILOT — PATIENT CONTEXT BRIEF" lines={[
                "Previous interactions: 3 (call + WhatsApp + consultation)",
                'Key concern raised: "Will insurance cover IVF cycle 2?"',
                "Commitment made: Doctor to check with finance team — not yet done",
                "→ Confirm insurance answer before this call.",
              ]} />
            }
            impact="Patient trust and conversion improve when history is respected. Coordinators spend less time on 'let me check with my colleague' and more time on clinical conversation."
          />
        </FadeIn>

        {/* Closing card */}
        <FadeIn delay={0.06}>
          <div style={{ background: SPC, borderLeft: `3px solid ${IND}`, borderRadius: 10, padding: 24 }}>
            <h3 style={{ fontFamily: SG, fontSize: 20, fontWeight: 600, color: TX1, margin: "0 0 12px" }}>✦ One architecture. Every industry.</h3>
            <p style={{ fontFamily: DM, fontSize: 14, color: TX2, lineHeight: 1.75, margin: "0 0 20px" }}>
              The AI components powering SuperPilot — contextual summarization, entity extraction, deal memory, proactive intelligence — are industry-agnostic. What changes per vertical is: the data sources connected, the terminology in the prompts, and the workflow surfaces where briefs appear. The infrastructure is built once. The intelligence adapts to context.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              {["Gmail", "VoIP", "WhatsApp", "CRM"].map(s => <SourceChip key={s} c={s} />)}
              <span style={{ fontFamily: JB, fontSize: 12, color: MUT }}>→</span>
              <span style={{ display: "inline-flex", padding: "4px 12px", borderRadius: 5, fontFamily: JB, fontSize: 12, fontWeight: 700, background: `${IND}20`, color: IND, border: `1px solid ${IND}40` }}>
                ✦ SuperPilot Memory
              </span>
            </div>
            <p style={{ fontFamily: DM, fontSize: 14, color: TX2, lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>
              The same institutional memory layer. For every team that manages complex relationships at scale.
            </p>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
