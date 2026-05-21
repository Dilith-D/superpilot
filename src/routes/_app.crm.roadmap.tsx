import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Zap, BarChart2, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/_app/crm/roadmap")({
  component: RoadmapPage,
});

const IND = "#6366F1"; const EME = "#10B981"; const AMB = "#F59E0B";
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
  return <span style={{ display: "inline-flex", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: JB, fontWeight: 700, background: `${IND}20`, color: IND, border: `1px solid ${IND}40` }}>{children}</span>;
}
function GrayPill({ children }: { children: string }) {
  return <span style={{ display: "inline-flex", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: JB, background: "#ffffff0A", color: MUT, border: `1px solid ${BOR}` }}>{children}</span>;
}
function AmberPill({ children }: { children: string }) {
  return <span style={{ display: "inline-flex", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: JB, fontWeight: 700, background: `${AMB}20`, color: AMB, border: `1px solid ${AMB}40` }}>{children}</span>;
}
function EmeraldPill({ children }: { children: string }) {
  return <span style={{ display: "inline-flex", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: JB, fontWeight: 700, background: `${EME}20`, color: EME, border: `1px solid ${EME}40` }}>{children}</span>;
}

// ─── Phase timeline ───────────────────────────────────────────────────────────
function PhaseTimeline() {
  return (
    <svg viewBox="0 0 560 90" style={{ width: "100%", overflow: "visible" }}>
      {/* V1 — filled */}
      <circle cx={70} cy={40} r={26} fill={IND} />
      <text x={70} y={36} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={700} fontFamily="Space Grotesk, sans-serif">V1</text>
      <text x={70} y={50} textAnchor="middle" fill="#fff" fontSize={9} fontFamily="Space Grotesk, sans-serif">Now</text>
      <text x={70} y={76} textAnchor="middle" fill={TX2} fontSize={10} fontFamily="DM Sans, sans-serif">Workflow Compression</text>

      {/* Solid line V1→V2 */}
      <line x1={96} y1={40} x2={234} y2={40} stroke={IND} strokeWidth={2} />

      {/* V2 — indigo outline */}
      <circle cx={260} cy={40} r={26} fill="none" stroke={IND} strokeWidth={2} />
      <text x={260} y={36} textAnchor="middle" fill={IND} fontSize={12} fontWeight={700} fontFamily="Space Grotesk, sans-serif">V2</text>
      <text x={260} y={50} textAnchor="middle" fill={IND} fontSize={9} fontFamily="Space Grotesk, sans-serif">Q2</text>
      <text x={260} y={76} textAnchor="middle" fill={TX2} fontSize={10} fontFamily="DM Sans, sans-serif">Predictive Intelligence</text>

      {/* Dashed line V2→V3 */}
      <line x1={286} y1={40} x2={424} y2={40} stroke={MUT} strokeWidth={2} strokeDasharray="6,4" />

      {/* V3 — gray outline */}
      <circle cx={450} cy={40} r={26} fill="none" stroke={MUT} strokeWidth={2} />
      <text x={450} y={36} textAnchor="middle" fill={MUT} fontSize={12} fontWeight={700} fontFamily="Space Grotesk, sans-serif">V3</text>
      <text x={450} y={50} textAnchor="middle" fill={MUT} fontSize={9} fontFamily="Space Grotesk, sans-serif">Q4</text>
      <text x={450} y={76} textAnchor="middle" fill={MUT} fontSize={10} fontFamily="DM Sans, sans-serif">Cross-Workspace Orchestration</text>
    </svg>
  );
}

// ─── Feature row ──────────────────────────────────────────────────────────────
function FeatureRow({ mark, name, desc, markColor }: { mark: string; name: string; desc: string; markColor: string }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "8px 0" }}>
      <span style={{ fontFamily: JB, fontSize: 13, color: markColor, flexShrink: 0, width: 16 }}>{mark}</span>
      <div>
        <span style={{ fontFamily: DM, fontSize: 13, color: TX1, fontWeight: 500 }}>{name}</span>
        <span style={{ fontFamily: DM, fontSize: 13, color: TX2 }}> — {desc}</span>
      </div>
    </div>
  );
}

const V1_FEATURES = [
  { name: "Pre-call brief", desc: "Pull from Meet, VoIP, email, CRM history" },
  { name: "Post-call extraction", desc: "Tasks, commitments, cross-functional tags from transcript" },
  { name: "Follow-up email draft", desc: "Context-aware draft generated from call" },
  { name: "Deal intelligence feed", desc: "Morning briefing with proactive nudges" },
  { name: "Handoff brief", desc: "Auto-generated on every role transition" },
  { name: "Deal memory", desc: "Incremental summarization, versioned" },
];
const V2_FEATURES = [
  { name: "WhatsApp synthesis", desc: "Full conversation history via Business API" },
  { name: "Sentiment tracking", desc: "Stakeholder engagement signals across touchpoints" },
  { name: "Predictive risk scoring", desc: "ML model trained on your historical deal outcomes" },
  { name: "Manager team view", desc: "Pipeline health across all reps, ranked" },
  { name: "Slack/Teams delivery", desc: "Nudges surface where reps already work" },
  { name: "Email thread AI", desc: "Commitment and next-step detection from email chains" },
];
const V3_FEATURES = [
  { name: "Multi-rep deal memory", desc: "Full team context, not just the AE" },
  { name: "Competitive signals", desc: "Detect competitor mentions across all deals" },
  { name: "Revenue forecasting", desc: "Pipeline health from memory signals, not rep input" },
  { name: "SuperPilot API", desc: "External tools can query deal memory" },
  { name: "MCP integration", desc: "Superleap MCP carries SuperPilot context natively" },
  { name: "Cross-org benchmarks", desc: "How your deal velocity compares to industry" },
];

// ─── Adoption timeline ────────────────────────────────────────────────────────
const ADOPTION_PHASES = [
  {
    phase: "Week 1–2",
    title: "Zero behavior change",
    body: "The brief auto-appears on deal records. Tasks auto-create after calls. Reps don't have to do anything differently. They just notice things are faster.",
  },
  {
    phase: "Week 3–4",
    title: "Rep pulls, not push",
    body: "Reps start opening deal records before calls specifically to read the brief. They start trusting the source links. They start using the handoff briefs when transitioning deals.",
  },
  {
    phase: "Month 2+",
    title: "Team norm",
    body: "Managers start using deal intelligence in pipeline reviews instead of asking reps for updates. New reps onboard using deal memory. SuperPilot becomes the default way the team operates.",
  },
];

// ─── MVP scope columns ────────────────────────────────────────────────────────
const MVP_COLS = [
  { icon: Zap, title: "Works immediately", body: "Every V1 feature builds on data Superleap already captures. No new integrations. No new data collection. No behavior change required from reps. The brief auto-appears. Tasks auto-create. Value is felt before it's explained." },
  { icon: BarChart2, title: "Proves the concept", body: "V1 is narrow enough to ship in one quarter but rich enough to generate measurable productivity data. That data becomes the business case for V2." },
  { icon: RefreshCw, title: "Builds the flywheel", body: "Every interaction processed by V1 improves V2's predictive accuracy. The data SuperPilot collects in V1 is the training signal for V2's ML layer. Starting narrow is strategically correct." },
];

function RoadmapPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 32px 96px", display: "flex", flexDirection: "column", gap: 72 }}>

        {/* Header */}
        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <IndigoPill>Shipping maturity</IndigoPill>
            <GrayPill>3-phase plan</GrayPill>
          </div>
          <h1 style={{ fontFamily: SG, fontSize: 32, fontWeight: 700, color: TX1, margin: "0 0 10px", letterSpacing: "-0.02em" }}>Product Roadmap</h1>
          <p style={{ fontFamily: DM, fontSize: 16, color: TX2, lineHeight: 1.65, maxWidth: 560, margin: 0 }}>
            How SuperPilot ships — sequenced for adoption, built for compounding value.
          </p>
        </motion.header>

        {/* Shipping philosophy */}
        <FadeIn>
          <div style={{ background: SPC, borderLeft: `3px solid ${IND}`, borderRadius: 10, padding: 20 }}>
            <p style={{ fontFamily: JB, fontSize: 12, color: IND, fontWeight: 700, marginBottom: 10, letterSpacing: "0.05em" }}>✦ Why this sequence</p>
            <p style={{ fontFamily: DM, fontSize: 14, color: TX2, lineHeight: 1.75, margin: 0 }}>
              V1 ships on data Superleap already captures — no new infrastructure. V2 gets smarter as the data flywheel builds. V3 becomes a platform play once SuperPilot is the memory layer for the entire revenue team. Each phase proves the next one is worth building.
            </p>
          </div>
        </FadeIn>

        {/* Timeline visual */}
        <FadeIn delay={0.04}>
          <div style={{ background: CARD, border: `1px solid ${BOR}`, borderRadius: 10, padding: "32px 40px" }}>
            <PhaseTimeline />
          </div>
        </FadeIn>

        {/* Phase cards */}
        <section>
          <FadeIn><SLabel>Three Phases</SLabel><SHead>V1 ships now. V2 compounds. V3 is the platform.</SHead></FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* V1 */}
            <FadeIn delay={0.04}>
              <div style={{ background: SPC, borderLeft: `3px solid ${IND}`, borderRadius: 10, padding: 28, boxShadow: `0 0 40px ${IND}08` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                    <span style={{ fontFamily: SG, fontSize: 13, color: IND, fontWeight: 700 }}>V1</span>
                    <span style={{ fontFamily: SG, fontSize: 20, color: TX1, fontWeight: 600 }}>WORKFLOW COMPRESSION</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <EmeraldPill>Ships now</EmeraldPill>
                    <GrayPill>Works on existing data</GrayPill>
                  </div>
                </div>
                <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, marginBottom: 20 }}>
                  Every feature in V1 builds on data Superleap already captures. No new integrations required. No new data collection. Ships immediately.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                  {V1_FEATURES.map(f => <FeatureRow key={f.name} mark="✦" name={f.name} desc={f.desc} markColor={IND} />)}
                </div>
                <div style={{ marginTop: 20, padding: 14, background: `${IND}08`, border: `1px solid ${IND}20`, borderRadius: 8 }}>
                  <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, margin: 0 }}>
                    <span style={{ color: IND, fontWeight: 600 }}>What V1 proves:</span> Reps use it every day. Admin time drops measurably. The data flywheel starts accumulating. V2 becomes inevitable.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* V2 */}
            <FadeIn delay={0.06}>
              <div style={{ background: CARD, border: `1px solid ${BOR}`, borderRadius: 10, padding: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                    <span style={{ fontFamily: SG, fontSize: 13, color: IND, fontWeight: 700 }}>V2</span>
                    <span style={{ fontFamily: SG, fontSize: 20, color: TX1, fontWeight: 600 }}>PREDICTIVE INTELLIGENCE</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <AmberPill>Q2</AmberPill>
                    <GrayPill>Requires V1 data</GrayPill>
                  </div>
                </div>
                <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, marginBottom: 20 }}>
                  Once SuperPilot has 3+ months of deal data, patterns emerge. V2 is the intelligence layer that learns from your specific team's sales motion.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                  {V2_FEATURES.map(f => <FeatureRow key={f.name} mark="○" name={f.name} desc={f.desc} markColor={MUT} />)}
                </div>
                <div style={{ marginTop: 20, padding: 14, background: `${AMB}08`, border: `1px solid ${AMB}20`, borderRadius: 8 }}>
                  <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, margin: 0 }}>
                    <span style={{ color: AMB, fontWeight: 600 }}>What V2 proves:</span> Intelligence compounds with usage. The more deals SuperPilot sees, the more accurate the risk scores. Stickiness becomes structural.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* V3 */}
            <FadeIn delay={0.08}>
              <div style={{ background: CARD, border: `1px solid ${BOR}`, borderRadius: 10, padding: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                    <span style={{ fontFamily: SG, fontSize: 13, color: IND, fontWeight: 700 }}>V3</span>
                    <span style={{ fontFamily: SG, fontSize: 20, color: TX1, fontWeight: 600 }}>CROSS-WORKSPACE ORCHESTRATION</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <GrayPill>Q4</GrayPill>
                    <IndigoPill>Platform play</IndigoPill>
                  </div>
                </div>
                <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, marginBottom: 20 }}>
                  V3 turns SuperPilot from a rep tool into the intelligence layer for the entire revenue organization. This is the platform moat.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                  {V3_FEATURES.map(f => <FeatureRow key={f.name} mark="○" name={f.name} desc={f.desc} markColor={MUT} />)}
                </div>
                <div style={{ marginTop: 20, padding: 14, background: `${IND}08`, border: `1px solid ${IND}20`, borderRadius: 8 }}>
                  <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, margin: 0 }}>
                    <span style={{ color: IND, fontWeight: 600 }}>What V3 proves:</span> SuperPilot becomes the reason companies don't leave Superleap. Not a feature — a platform.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* MVP Scope */}
        <section>
          <FadeIn><SLabel>MVP Scope Decision</SLabel><SHead>Why V1 is the right V1.</SHead></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {MVP_COLS.map((col, i) => {
              const Icon = col.icon;
              return (
                <FadeIn key={col.title} delay={0.04 + i * 0.06}>
                  <div style={{ background: CARD, border: `1px solid ${BOR}`, borderRadius: 10, padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <Icon size={18} color={IND} strokeWidth={1.75} />
                      <h3 style={{ fontFamily: SG, fontSize: 14, fontWeight: 600, color: TX1, margin: 0 }}>{col.title}</h3>
                    </div>
                    <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, margin: 0 }}>{col.body}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* Adoption Strategy */}
        <section>
          <FadeIn>
            <SLabel>Adoption Strategy</SLabel>
            <SHead>How reps actually adopt this.</SHead>
            <p style={{ fontFamily: DM, fontSize: 14, color: TX2, lineHeight: 1.7, marginBottom: 24, marginTop: -12 }}>
              Most AI features fail not because the technology is wrong but because adoption is assumed. SuperPilot is designed to earn adoption.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
            {ADOPTION_PHASES.map((phase, i) => (
              <FadeIn key={phase.phase} delay={0.04 + i * 0.06}>
                <div style={{ background: CARD, border: `1px solid ${BOR}`, borderRadius: 10, padding: 20 }}>
                  <span style={{ display: "inline-flex", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: JB, background: `${IND}15`, color: IND, border: `1px solid ${IND}30`, marginBottom: 10 }}>{phase.phase}</span>
                  <h3 style={{ fontFamily: SG, fontSize: 14, fontWeight: 600, color: TX1, margin: "0 0 10px" }}>{phase.title}</h3>
                  <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, margin: 0 }}>{phase.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.1}>
            <div style={{ background: SPC, borderLeft: `3px solid ${IND}`, borderRadius: 10, padding: 16 }}>
              <p style={{ fontFamily: DM, fontSize: 14, color: TX2, lineHeight: 1.75, margin: 0 }}>
                <span style={{ color: IND, fontWeight: 700 }}>✦ The adoption rule:</span> never ask reps to do more work to get value. Every SuperPilot feature delivers value through existing rep behavior — opening a record, finishing a call, moving a deal stage.
              </p>
            </div>
          </FadeIn>
        </section>

      </div>
    </div>
  );
}
