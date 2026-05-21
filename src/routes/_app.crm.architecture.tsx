import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  FileText,
  Zap,
  Activity,
  Database,
  AlertTriangle,
  Clock,
  ShieldAlert,
} from "lucide-react";

export const Route = createFileRoute("/_app/crm/architecture")({
  component: ArchitecturePage,
});

// ─── dark-page palette (overrides the app's light CSS variables via inline styles) ───
const IND = "#6366F1";
const EME = "#10B981";
const AMB = "#F59E0B";
const RED = "#EF4444";
const CARD = "#12121A";
const SPC = "#0F0F1C";
const BOR = "#1E1E2E";
const TX1 = "#F5F5F5";
const TX2 = "#8B8B9A";
const MUT = "#4B4B5A";
const BG = "#0A0A0F";
const SG = '"Space Grotesk", system-ui, sans-serif';
const DM = '"DM Sans", system-ui, sans-serif';
const JB = '"JetBrains Mono", ui-monospace, monospace';

// ─── utility: FadeIn on scroll ───────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  y = 16,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── section primitives ───────────────────────────────────────────────────────
function SLabel({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: JB, fontSize: 11, color: MUT, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>
      {children}
    </p>
  );
}

function SHead({ children }: { children: string }) {
  return (
    <h2 style={{ fontFamily: SG, fontSize: 22, fontWeight: 600, color: TX1, marginBottom: 24, marginTop: 0, lineHeight: 1.3 }}>
      {children}
    </h2>
  );
}

// ─── badge variants ───────────────────────────────────────────────────────────
function AIBadge() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontFamily: JB, fontWeight: 600, background: `${IND}22`, color: IND, border: `1px solid ${IND}40` }}>
      ✦ AI
    </span>
  );
}
function HybridBadge() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontFamily: JB, fontWeight: 600, background: `${AMB}22`, color: AMB, border: `1px solid ${AMB}40` }}>
      ⚡ Hybrid
    </span>
  );
}
function RulesBadge() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontFamily: JB, fontWeight: 600, background: "#ffffff0A", color: MUT, border: `1px solid ${BOR}` }}>
      ○ Rules
    </span>
  );
}
function SmallBadge({ color, children }: { color: string; children: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "1px 7px", borderRadius: 4, fontSize: 10, fontFamily: JB, background: `${color}22`, color, border: `1px solid ${color}40` }}>
      {children}
    </span>
  );
}

// ─── code block ───────────────────────────────────────────────────────────────
function CodeBlock({ code }: { code: string }) {
  return (
    <pre
      style={{
        fontFamily: JB,
        fontSize: 12,
        lineHeight: 1.7,
        background: BG,
        border: `1px solid ${BOR}`,
        borderRadius: 8,
        padding: "14px 16px",
        overflowX: "auto",
        whiteSpace: "pre",
        color: TX2,
        margin: 0,
      }}
    >
      <code>{code.trim()}</code>
    </pre>
  );
}

// ─── layer chip ───────────────────────────────────────────────────────────────
function LayerChip({ children }: { children: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        padding: "3px 10px",
        borderRadius: 5,
        fontSize: 11,
        fontFamily: JB,
        background: SPC,
        border: `1px solid ${BOR}`,
        color: TX2,
      }}
    >
      {children}
    </span>
  );
}

function TechPill({ children }: { children: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        padding: "2px 9px",
        borderRadius: 5,
        fontSize: 11,
        fontFamily: JB,
        background: "#ffffff08",
        border: `1px solid ${BOR}`,
        color: MUT,
      }}
    >
      {children}
    </span>
  );
}

function IndigoPill({ children }: { children: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 10,
        fontFamily: JB,
        fontWeight: 700,
        background: `${IND}22`,
        color: IND,
        border: `1px solid ${IND}40`,
        letterSpacing: "0.05em",
      }}
    >
      {children}
    </span>
  );
}

// ─── animated flow arrow ──────────────────────────────────────────────────────
function FlowArrow({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "6px 0", gap: 4 }}>
      <div style={{ position: "relative", width: 1, height: 36, background: `${IND}40` }}>
        <motion.div
          style={{
            position: "absolute",
            left: -3,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: IND,
            top: 0,
          }}
          animate={{ top: [0, 36], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <p style={{ fontFamily: JB, fontSize: 10, color: MUT, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
        {label}
      </p>
    </div>
  );
}

// ─── Section 1: Capability Audit ──────────────────────────────────────────────
const AUDIT_ROWS = [
  { feature: "Pre-call brief assembly", what: "LLM summarization across unified interaction context", type: "ai" as const },
  { feature: "Post-call task extraction", what: "LLM entity extraction + intent classification", type: "ai" as const },
  { feature: "Cross-functional tagging", what: "LLM intent detection", type: "ai" as const },
  { feature: "Follow-up email draft", what: "LLM generation with deal context injection", type: "ai" as const },
  { feature: "Deal health scoring", what: "Rule-based signals + LLM interpretation", type: "hybrid" as const },
  { feature: "Proactive nudges", what: "Deterministic triggers + LLM reasoning", type: "hybrid" as const },
  { feature: "Handoff brief generation", what: "LLM summarization of full deal history", type: "ai" as const },
  { feature: '"Proposal opened 4×" signal', what: "Webhook event — not AI", type: "rules" as const },
  { feature: "Task due date suggestion", what: "Pattern matching — not AI", type: "rules" as const },
];

function CapabilityAudit() {
  return (
    <section>
      <FadeIn>
        <SLabel>Capability Audit</SLabel>
        <SHead>Not every feature is AI. Here's what actually is.</SHead>
        <p style={{ fontFamily: DM, fontSize: 14, color: TX2, lineHeight: 1.7, marginBottom: 24, marginTop: -12 }}>
          Being precise about what is AI and what is not matters. The AI lives in the interpretation layer — not every feature.
        </p>
      </FadeIn>
      <FadeIn delay={0.06}>
        <div style={{ background: CARD, border: `1px solid ${BOR}`, borderRadius: 10, overflow: "hidden" }}>
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 3fr 1fr",
              gap: 16,
              padding: "10px 20px",
              background: SPC,
              borderBottom: `1px solid ${BOR}`,
            }}
          >
            {["FEATURE", "WHAT IT ACTUALLY IS", "AI?"].map((h) => (
              <p key={h} style={{ fontFamily: JB, fontSize: 10, color: TX2, textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>
                {h}
              </p>
            ))}
          </div>
          {/* Rows */}
          {AUDIT_ROWS.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 3fr 1fr",
                gap: 16,
                padding: "13px 20px",
                borderBottom: i < AUDIT_ROWS.length - 1 ? `1px solid ${BOR}` : "none",
                alignItems: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#ffffff05"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
            >
              <p style={{ fontFamily: DM, fontSize: 13, color: TX1, margin: 0 }}>{row.feature}</p>
              <p style={{ fontFamily: DM, fontSize: 13, color: TX2, margin: 0 }}>{row.what}</p>
              <div>
                {row.type === "ai" && <AIBadge />}
                {row.type === "hybrid" && <HybridBadge />}
                {row.type === "rules" && <RulesBadge />}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Section 2: Three-layer architecture ──────────────────────────────────────
function ArchBand({
  layerLabel,
  title,
  chips,
  isSP = false,
}: {
  layerLabel: string;
  title: string;
  chips: string[];
  isSP?: boolean;
}) {
  return (
    <div
      style={{
        background: isSP ? SPC : CARD,
        border: `1px solid ${BOR}`,
        borderLeft: isSP ? `3px solid ${IND}` : `1px solid ${BOR}`,
        borderRadius: 10,
        padding: "20px 24px",
        boxShadow: isSP ? `0 0 40px ${IND}0A` : undefined,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <IndigoPill>{layerLabel}</IndigoPill>
        <p style={{ fontFamily: SG, fontSize: 16, fontWeight: 600, color: TX1, margin: 0 }}>{title}</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {chips.map((c) => (
          <LayerChip key={c}>{c}</LayerChip>
        ))}
      </div>
    </div>
  );
}

function ThreeLayerArchitecture() {
  return (
    <section>
      <FadeIn>
        <SLabel>Architecture</SLabel>
        <SHead>Three layers. One continuous intelligence.</SHead>
      </FadeIn>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <FadeIn delay={0.04}>
          <ArchBand layerLabel="LAYER 1" title="Data Ingestion & Unification" chips={["Gmail", "VoIP Calls", "Google Meet", "CRM Pipeline", "WhatsApp", "Fathom", "Calendar"]} />
        </FadeIn>
        <FadeIn delay={0.08}>
          <FlowArrow label="Normalized interaction timeline" />
        </FadeIn>
        <FadeIn delay={0.12}>
          <ArchBand layerLabel="LAYER 2" title="Intelligence Engine" chips={["Summarization", "Extraction", "Scoring", "Memory"]} isSP />
        </FadeIn>
        <FadeIn delay={0.16}>
          <FlowArrow label="Structured insights + actions" />
        </FadeIn>
        <FadeIn delay={0.20}>
          <ArchBand layerLabel="LAYER 3" title="Delivery & Surfacing" chips={["Deal Feed", "Pre-call Brief", "Post-call Panel", "Handoff Brief", "Widget"]} />
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Section 3: AI Components ─────────────────────────────────────────────────
const BRIEF_JSON = `{
  "last_touchpoint": {
    "summary": "Priya asked about migration timeline",
    "source_event_id": "evt_001"
  },
  "open_commitments": [
    {
      "commitment": "Send migration estimate",
      "source_event_id": "evt_002"
    }
  ],
  "stakeholder_map": [
    { "name": "Priya Mehta", "role": "champion", "engaged": true },
    { "name": "CFO", "role": "economic_buyer", "engaged": false }
  ]
}`;

const EXTRACT_JSON = `{
  "action_items": [
    {
      "action": "Get bulk export timeline",
      "cross_functional": true,
      "tag_team": "product",
      "context": "Prospect asked if bulk export is on roadmap"
    }
  ],
  "commitments_made": [
    {
      "commitment": "Migration live in 3-4 weeks",
      "timestamp": "00:24:13",
      "verbatim": "Yes, 3 to 4 weeks from contract signature."
    }
  ]
}`;

const SCORING_PY = `def needs_llm_interpretation(signals):
    return (
        signals["days_since_last_activity"] > 5 or
        signals["stage_velocity_ratio"] > 1.5 or
        signals["overdue_followups"] > 0 or
        (not signals["economic_buyer_engaged"] and
            signals["days_in_current_stage"] > 7)
    )`;

const MEMORY_JSON = `{
  "deal_id": "acme_corp_001",
  "version": 14,
  "commitments_made": [
    {
      "commitment": "3-4 week migration timeline",
      "verbatim": "We can get you live in 3 to 4 weeks",
      "source_event_id": "evt_001"
    }
  ],
  "recurring_concerns": [
    { "concern": "Data migration complexity", "frequency": 3 }
  ],
  "success_metrics": ["Live within 6 weeks of contract sign"]
}`;

function SpecRow({ model, temp, tokens }: { model: string; temp: string; tokens: string }) {
  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
      {[["Model", model], ["Temp", temp], ["Max tokens", tokens]].map(([k, v]) => (
        <div key={k} style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontFamily: JB, fontSize: 10, color: MUT, textTransform: "uppercase", letterSpacing: "0.1em" }}>{k}</span>
          <span style={{ fontFamily: JB, fontSize: 11, color: TX1 }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

function AICard({
  letter,
  title,
  icon: Icon,
  badge,
  badge2,
  iconColor,
  description,
  model,
  temp,
  tokens,
  code,
  costBox,
}: {
  letter: string;
  title: string;
  icon: React.ElementType;
  badge: string;
  badge2?: string;
  iconColor: string;
  description: string;
  model: string;
  temp: string;
  tokens: string;
  code: string;
  costBox?: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${BOR}`,
        borderRadius: 10,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: `${iconColor}1A`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={18} color={iconColor} strokeWidth={1.75} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: JB, fontSize: 10, color: MUT, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Component {letter}</p>
          <h3 style={{ fontFamily: SG, fontSize: 15, fontWeight: 600, color: TX1, margin: 0 }}>{title}</h3>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <SmallBadge color={IND}>{badge}</SmallBadge>
        {badge2 && <SmallBadge color={AMB}>{badge2}</SmallBadge>}
      </div>
      <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, margin: 0 }}>{description}</p>
      <SpecRow model={model} temp={temp} tokens={tokens} />
      {costBox}
      <CodeBlock code={code} />
    </div>
  );
}

function AIComponents() {
  const costBox = (
    <div
      style={{
        background: `${AMB}0A`,
        borderLeft: `3px solid ${AMB}`,
        borderRadius: 6,
        padding: "12px 14px",
        fontFamily: JB,
        fontSize: 11,
        color: AMB,
        lineHeight: 1.8,
      }}
    >
      Without gate: 180 LLM calls/day per workspace<br />
      With gate: 36 LLM calls/day per workspace<br />
      At 100 workspaces: 18,000 → 3,600 calls/day
    </div>
  );

  return (
    <section>
      <FadeIn>
        <SLabel>Intelligence Engine</SLabel>
        <SHead>Four AI components. Each solves one moment.</SHead>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <FadeIn delay={0.04}>
          <AICard
            letter="A · Contextual Summarization"
            title="Contextual Summarization"
            icon={FileText}
            badge="Powers Pre-Call Brief"
            iconColor={IND}
            description="LLM summarization across the unified interaction timeline. Pulls from stored deal summary + recent raw interactions. Every output carries source event IDs — the rep can verify any claim in one click."
            model="Claude Sonnet"
            temp="0.2"
            tokens="800"
            code={BRIEF_JSON}
          />
        </FadeIn>
        <FadeIn delay={0.04}>
          <AICard
            letter="B · Entity & Action Extraction"
            title="Entity & Action Extraction"
            icon={Zap}
            badge="Powers Post-Call Panel"
            iconColor={IND}
            description="LLM extraction from call transcripts. Identifies action items, commitments made, cross-functional dependencies. Temperature 0.1 — maximally deterministic. Cross-functional routing uses an explicit intent map, not free-form inference."
            model="Claude Sonnet"
            temp="0.1"
            tokens="1000"
            code={EXTRACT_JSON}
          />
        </FadeIn>
        <FadeIn delay={0.08}>
          <AICard
            letter="C · Deal Intelligence Scoring"
            title="Deal Intelligence Scoring"
            icon={Activity}
            badge="Powers Deal Feed"
            badge2="Hybrid — Rules + AI"
            iconColor={AMB}
            description="Two-step process. Rule-based signal computation runs on every deal (cheap). A threshold gate filters which deals need LLM interpretation. Only ~20% of deals at any time cross the threshold — keeping costs linear, not exponential."
            model="Claude Sonnet"
            temp="0.3"
            tokens="400"
            code={SCORING_PY}
            costBox={costBox}
          />
        </FadeIn>
        <FadeIn delay={0.08}>
          <AICard
            letter="D · Incremental Deal Memory"
            title="Incremental Deal Memory"
            icon={Database}
            badge="Foundation"
            iconColor={IND}
            description="The memory substrate everything else reads from. Delta summarization on every new interaction — never reprocesses full history. Cost stays flat as deal history grows. Full version history maintained for audit trail."
            model="Claude Sonnet"
            temp="0.2"
            tokens="600"
            code={MEMORY_JSON}
          />
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Section 4: Orchestration ─────────────────────────────────────────────────
const PIPELINE_STEPS = [
  "Webhook",
  "Fetch Recording",
  "Transcription",
  "Fetch Deal Context",
  "LLM Extraction",
  "Write to CRM",
  "Update Memory",
  "Draft Email",
  "Surface to Rep",
];

function PipelineChip({ label, index, total }: { label: string; index: number; total: number }) {
  const duration = total * 0.7;
  return (
    <motion.span
      style={{
        fontFamily: JB,
        fontSize: 11,
        padding: "5px 10px",
        borderRadius: 5,
        border: `1px solid ${BOR}`,
        background: SPC,
        color: TX1,
        whiteSpace: "nowrap",
        flexShrink: 0,
        display: "inline-flex",
      }}
      animate={{
        background: [SPC, `${IND}22`, SPC],
        borderColor: [BOR, IND, BOR],
        color: [TX1, IND, TX1],
        boxShadow: [`0 0 0px ${IND}00`, `0 0 12px ${IND}44`, `0 0 0px ${IND}00`],
      }}
      transition={{
        duration,
        delay: index * 0.6,
        repeat: Infinity,
        repeatDelay: (total - 1) * 0.6,
        ease: "easeInOut",
        times: [0, 0.3, 1],
      }}
    >
      {label}
    </motion.span>
  );
}

function PipelineArrow() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M1 7h12M9 2l5 5-5 5" stroke={IND} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FanOutDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const boxStyle = {
    fill: SPC,
    stroke: BOR,
    strokeWidth: 1,
  };
  const mergeBoxStyle = {
    fill: SPC,
    stroke: EME,
    strokeWidth: 1,
  };
  const pathBaseStyle = {
    fill: "none",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
  };

  const BRANCHES = [
    { cx: 70, label: "Gmail API", sublabel: "3s" },
    { cx: 200, label: "VoIP API", sublabel: "3s" },
    { cx: 330, label: "Meet/Fathom", sublabel: "3s" },
    { cx: 460, label: "CRM", sublabel: "1s" },
    { cx: 590, label: "Redis Cache", sublabel: "0.5s" },
  ];

  const animatedPath = (delay: number) =>
    inView
      ? {
          strokeDasharray: 300,
          strokeDashoffset: 0,
          transition: `stroke-dashoffset 0.7s ease-out ${delay}s`,
        }
      : {
          strokeDasharray: 300,
          strokeDashoffset: 300,
        };

  return (
    <svg ref={ref} viewBox="0 0 680 300" style={{ width: "100%", fontFamily: JB }}>
      {/* Top node */}
      <rect x={230} y={8} width={220} height={32} rx={6} fill={SPC} stroke={BOR} />
      <text x={340} y={28} textAnchor="middle" fill={TX1} fontSize={12}>Rep opens deal record</text>

      {/* Line from top to fan horizontal */}
      <path d="M 340 40 L 340 62" stroke={IND} {...pathBaseStyle} style={animatedPath(0.1)} />

      {/* Horizontal fan bus */}
      <path d={`M ${BRANCHES[0].cx} 62 H ${BRANCHES[4].cx}`} stroke={IND} {...pathBaseStyle} style={animatedPath(0.2)} />

      {/* Vertical drops to branches */}
      {BRANCHES.map((b, i) => (
        <path key={i} d={`M ${b.cx} 62 V 90`} stroke={IND} {...pathBaseStyle} style={animatedPath(0.3 + i * 0.06)} />
      ))}

      {/* Branch boxes */}
      {BRANCHES.map((b, i) => (
        <g key={i}>
          <rect x={b.cx - 55} y={90} width={110} height={34} rx={5} {...boxStyle} />
          <text x={b.cx} y={105} textAnchor="middle" fill={TX1} fontSize={11}>{b.label}</text>
          <text x={b.cx} y={118} textAnchor="middle" fill={MUT} fontSize={9}>{b.sublabel} timeout</text>
        </g>
      ))}

      {/* Vertical rises from branches */}
      {BRANCHES.map((b, i) => (
        <path key={i} d={`M ${b.cx} 124 V 152`} stroke={EME} {...pathBaseStyle} style={animatedPath(0.7 + i * 0.06)} />
      ))}

      {/* Horizontal merge bus */}
      <path d={`M ${BRANCHES[0].cx} 152 H ${BRANCHES[4].cx}`} stroke={EME} {...pathBaseStyle} style={animatedPath(1.1)} />

      {/* Drop to merge node */}
      <path d="M 340 152 V 172" stroke={EME} {...pathBaseStyle} style={animatedPath(1.2)} />

      {/* Merge node */}
      <rect x={220} y={172} width={240} height={32} rx={6} {...mergeBoxStyle} />
      <text x={340} y={192} textAnchor="middle" fill={TX1} fontSize={12}>Merge context</text>

      {/* Graceful degradation asterisk */}
      <text x={680} y={192} textAnchor="end" fill={IND} fontSize={9} fontStyle="italic">* graceful degradation</text>

      {/* Drop to LLM node */}
      <path d="M 340 204 V 224" stroke={IND} {...pathBaseStyle} style={animatedPath(1.4)} />

      {/* LLM node */}
      <rect x={220} y={224} width={240} height={32} rx={6} fill={SPC} stroke={IND} />
      <text x={340} y={244} textAnchor="middle" fill={IND} fontSize={12}>LLM Summarization</text>

      {/* Drop to brief node */}
      <path d="M 340 256 V 276" stroke={IND} {...pathBaseStyle} style={animatedPath(1.6)} />

      {/* Brief node */}
      <rect x={220} y={276} width={240} height={22} rx={6} fill={`${IND}15`} stroke={`${IND}50`} />
      <text x={340} y={291} textAnchor="middle" fill={IND} fontSize={12}>Brief rendered</text>
    </svg>
  );
}

function BatchFlowDiagram() {
  const boxS: React.CSSProperties = {
    padding: "6px 12px",
    borderRadius: 6,
    border: `1px solid ${BOR}`,
    background: SPC,
    fontFamily: JB,
    fontSize: 11,
    color: TX1,
    whiteSpace: "nowrap",
  };
  const pathA: React.CSSProperties = { ...boxS, color: MUT, border: `1px solid ${BOR}`, background: "#ffffff06" };
  const pathB: React.CSSProperties = { ...boxS, color: IND, border: `1px solid ${IND}40`, background: `${IND}0D` };
  const arrow = (
    <svg width="24" height="10" viewBox="0 0 24 10" style={{ flexShrink: 0 }}>
      <path d="M1 5h18M15 1l5 4-5 4" stroke={IND} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const grayArrow = (
    <svg width="24" height="10" viewBox="0 0 24 10" style={{ flexShrink: 0 }}>
      <path d="M1 5h18M15 1l5 4-5 4" stroke={MUT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const downArrow = (
    <svg width="10" height="20" viewBox="0 0 10 20" style={{ flexShrink: 0, margin: "0 auto" }}>
      <path d="M5 1v14M1 11l4 5 4-5" stroke={IND} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Top linear chain */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={boxS}>Cron job</span>
        {arrow}
        <span style={boxS}>Fetch all active deals</span>
        {arrow}
        <span style={boxS}>Fan-out 50 concurrent</span>
      </div>
      {/* Fork indicator */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginRight: 0 }}>
        <div style={{ marginLeft: "auto", display: "flex", flexDirection: "column", gap: 4, width: "60%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: JB, fontSize: 10, color: MUT, whiteSpace: "nowrap" }}>Path A</span>
            {grayArrow}
            <span style={pathA}>Signals below threshold</span>
            {grayArrow}
            <span style={pathA}>Mark healthy</span>
            {grayArrow}
            <span style={pathA}>Done</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: JB, fontSize: 10, color: IND, whiteSpace: "nowrap" }}>Path B</span>
            {arrow}
            <span style={pathB}>Signals above threshold</span>
            {arrow}
            <span style={pathB}>Fetch interactions</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 72 }}>
            {arrow}
            <span style={pathB}>LLM interpretation</span>
            {arrow}
            <span style={pathB}>Write nudge to feed</span>
          </div>
        </div>
      </div>
      {/* Converge */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 80 }}>
        {downArrow}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ ...boxS, background: `${IND}10`, border: `1px solid ${IND}40`, color: IND }}>Update health score</span>
      </div>
    </div>
  );
}

function OrchCard({
  num,
  title,
  badge,
  description,
  tech,
  children,
  noteType,
  noteContent,
}: {
  num: string;
  title: string;
  badge: string;
  description: string;
  tech: string;
  children: React.ReactNode;
  noteType?: "indigo" | "amber";
  noteContent?: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${BOR}`,
        borderRadius: 10,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <p style={{ fontFamily: JB, fontSize: 10, color: MUT, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
            Pattern {num}
          </p>
          <h3 style={{ fontFamily: SG, fontSize: 16, fontWeight: 600, color: TX1, margin: 0 }}>{title}</h3>
        </div>
        <span
          style={{
            fontFamily: JB,
            fontSize: 10,
            color: TX2,
            background: `${IND}10`,
            border: `1px solid ${BOR}`,
            padding: "4px 10px",
            borderRadius: 5,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {badge}
        </span>
      </div>
      <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, margin: 0 }}>{description}</p>
      {/* Visual pipeline */}
      <div
        style={{
          background: BG,
          border: `1px solid ${BOR}`,
          borderRadius: 8,
          padding: 16,
          overflowX: "auto",
        }}
      >
        {children}
      </div>
      {noteContent && (
        <div
          style={{
            background: noteType === "indigo" ? `${IND}08` : `${AMB}08`,
            borderLeft: `3px solid ${noteType === "indigo" ? IND : AMB}`,
            borderRadius: 6,
            padding: "12px 14px",
            fontFamily: DM,
            fontSize: 13,
            color: TX2,
            lineHeight: 1.7,
          }}
        >
          {noteContent}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <TechPill>{tech}</TechPill>
      </div>
    </div>
  );
}

function Orchestration() {
  return (
    <section>
      <FadeIn>
        <SLabel>Orchestration</SLabel>
        <SHead>Three patterns. One for each moment.</SHead>
        <p style={{ fontFamily: DM, fontSize: 14, color: TX2, lineHeight: 1.7, marginBottom: 24, marginTop: -12 }}>
          SuperPilot is not a single LLM call. It is a pipeline of coordinated steps. Three distinct orchestration patterns handle the three workflow moments.
        </p>
      </FadeIn>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <FadeIn delay={0.04}>
          <OrchCard
            num="1 · Post-Call Processing"
            title="Post-Call Processing"
            badge="Sequential · Event-triggered · 2–3 min"
            description="A call ends, a webhook fires, a linear pipeline runs. Each step depends on the previous. Failures are retried independently — not from scratch."
            tech="BullMQ / Celery"
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              {PIPELINE_STEPS.map((s, i) => (
                <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <PipelineChip label={s} index={i} total={PIPELINE_STEPS.length} />
                  {i < PIPELINE_STEPS.length - 1 && <PipelineArrow />}
                </span>
              ))}
            </div>
          </OrchCard>
        </FadeIn>
        <FadeIn delay={0.06}>
          <OrchCard
            num="2 · Pre-Call Brief"
            title="Pre-Call Brief"
            badge="Parallel fan-out · On-demand · < 10 seconds"
            description="The rep is waiting. Sequential fetching is too slow. All data sources are hit simultaneously. A hard 3-second timeout prevents slow sources from blocking the brief. The cached deal summary means the LLM never processes raw history."
            tech="Promise.all + timeouts / LangGraph"
            noteType="indigo"
            noteContent={
              <span>
                <strong style={{ color: IND }}>Graceful degradation:</strong> If any source times out, the brief still generates from available data. Source labeled as unavailable. Never blocks. Never fails silently.
              </span>
            }
          >
            <FanOutDiagram />
          </OrchCard>
        </FadeIn>
        <FadeIn delay={0.08}>
          <OrchCard
            num="3 · Deal Intelligence Monitoring"
            title="Deal Intelligence Monitoring"
            badge="Scheduled batch · Every 6 hours · Cost-optimized"
            description="Runs across all active deals on a schedule. The threshold gate is the key engineering decision — cheap rules run first, LLM only runs on deals that cross a risk signal. Cost scales with deal risk, not deal count."
            tech="node-cron + BullMQ"
          >
            <BatchFlowDiagram />
          </OrchCard>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Section 5: Production Constraints ────────────────────────────────────────
function ConstraintCard({
  icon: Icon,
  title,
  problem,
  mitigation,
  borderColor,
  mitigationBg,
}: {
  icon: React.ElementType;
  title: string;
  problem: string;
  mitigation: string;
  borderColor: string;
  mitigationBg: string;
}) {
  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${BOR}`,
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: 10,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Icon size={18} color={borderColor} strokeWidth={1.75} />
        <h3 style={{ fontFamily: SG, fontSize: 15, fontWeight: 600, color: TX1, margin: 0 }}>{title}</h3>
      </div>
      <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.65, margin: 0 }}>{problem}</p>
      <div style={{ background: mitigationBg, borderRadius: 6, padding: "10px 12px", fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.65 }}>
        {mitigation}
      </div>
    </div>
  );
}

function ProductionConstraints() {
  return (
    <section>
      <FadeIn>
        <SLabel>Production Reality</SLabel>
        <SHead>Three things that could break this. And how they don't.</SHead>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <FadeIn delay={0.04}>
          <ConstraintCard
            icon={AlertTriangle}
            title="Data Quality"
            problem="If reps don't use VoIP, there are no call transcripts. If email isn't synced, email context is empty."
            mitigation="SuperPilot degrades gracefully. Works with whatever data exists. Labels missing sources explicitly. Never fabricates context."
            borderColor={AMB}
            mitigationBg={`${AMB}08`}
          />
        </FadeIn>
        <FadeIn delay={0.06}>
          <ConstraintCard
            icon={Clock}
            title="Latency"
            problem="Pre-call brief must be under 10 seconds or reps won't trust it. Post-call processing can be 2–3 minutes."
            mitigation="Parallel fetching + cached deal summary + Redis = consistently under 4 seconds. Post-call has no user waiting — 2–3 minutes is acceptable."
            borderColor={AMB}
            mitigationBg={`${AMB}08`}
          />
        </FadeIn>
        <FadeIn delay={0.08}>
          <ConstraintCard
            icon={ShieldAlert}
            title="LLM Hallucination"
            problem="The most dangerous failure: AI confidently stating a commitment the rep never made."
            mitigation="Every AI-generated claim carries a source_event_id rendered as a clickable link. The rep verifies any claim against the original transcript in one click. Trust through verifiability — not blind trust."
            borderColor={RED}
            mitigationBg={`${RED}08`}
          />
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Section 6: Tech Stack ────────────────────────────────────────────────────
const STACK_ROWS = [
  { layer: "Job queue", tech: "BullMQ (Node) / Celery (Python)", rationale: "Simple, observable, retry-native" },
  { layer: "Transcription (real-time)", tech: "Deepgram", rationale: "Low latency, speaker diarization" },
  { layer: "Transcription (batch)", tech: "Whisper (self-hosted)", rationale: "Cost-efficient at scale" },
  { layer: "LLM", tech: "Claude Sonnet", rationale: "Best cost-performance balance for structured output" },
  { layer: "Orchestration V1", tech: "Async/await + Promise.all", rationale: "Sufficient, no overhead" },
  { layer: "Orchestration V2", tech: "Temporal or LangGraph", rationale: "Durability + conditional branching at scale" },
  { layer: "Memory storage", tech: "PostgreSQL + JSONB", rationale: "Queryable, versioned, auditable" },
  { layer: "Cache", tech: "Redis", rationale: "Pre-call brief response time" },
  { layer: "Scheduler", tech: "node-cron / Celery beat", rationale: "Deal monitoring batch jobs" },
];

function TechStack() {
  return (
    <section>
      <FadeIn>
        <SLabel>Stack</SLabel>
        <SHead>What it's built on.</SHead>
      </FadeIn>
      <FadeIn delay={0.06}>
        <div style={{ background: CARD, border: `1px solid ${BOR}`, borderRadius: 10, overflow: "hidden" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 2fr 2.5fr",
              gap: 16,
              padding: "10px 20px",
              background: SPC,
              borderBottom: `1px solid ${BOR}`,
            }}
          >
            {["LAYER", "TECHNOLOGY", "RATIONALE"].map((h) => (
              <p key={h} style={{ fontFamily: JB, fontSize: 10, color: TX2, textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>
                {h}
              </p>
            ))}
          </div>
          {STACK_ROWS.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 2fr 2.5fr",
                gap: 16,
                padding: "13px 20px",
                borderBottom: i < STACK_ROWS.length - 1 ? `1px solid ${BOR}` : "none",
                alignItems: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#ffffff05"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
            >
              <p style={{ fontFamily: DM, fontSize: 13, color: TX2, margin: 0 }}>{row.layer}</p>
              <p style={{ fontFamily: JB, fontSize: 12, color: TX1, margin: 0 }}>{row.tech}</p>
              <p style={{ fontFamily: DM, fontSize: 13, color: TX2, margin: 0 }}>{row.rationale}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Bottom note ──────────────────────────────────────────────────────────────
function BottomNote() {
  return (
    <FadeIn>
      <div
        style={{
          background: SPC,
          borderLeft: `3px solid ${IND}`,
          borderRadius: 10,
          padding: 20,
          fontFamily: DM,
          fontSize: 14,
          color: TX2,
          lineHeight: 1.7,
        }}
      >
        <span style={{ color: IND, fontWeight: 600 }}>✦</span>{" "}
        This architecture is designed to ship as V1 with Superleap's existing data infrastructure — Gmail integration, VoIP connections, Google Meet transcripts, and CRM pipeline data. No new data collection required. The intelligence layer reads what's already there.
      </div>
    </FadeIn>
  );
}

// ─── Page header ──────────────────────────────────────────────────────────────
function PageHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "3px 10px",
          borderRadius: 20,
          fontSize: 11,
          fontFamily: JB,
          fontWeight: 600,
          background: `${IND}20`,
          color: IND,
          border: `1px solid ${IND}40`,
          marginBottom: 16,
          letterSpacing: "0.05em",
        }}
      >
        Technical Reference
      </span>
      <h1
        style={{
          fontFamily: SG,
          fontSize: 32,
          fontWeight: 700,
          color: TX1,
          margin: "0 0 12px 0",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
        }}
      >
        How SuperPilot Works
      </h1>
      <p
        style={{
          fontFamily: DM,
          fontSize: 16,
          color: TX2,
          lineHeight: 1.65,
          maxWidth: 600,
          margin: 0,
        }}
      >
        A technical deep dive into the AI architecture and orchestration behind SuperPilot.
      </p>
    </motion.header>
  );
}

// ─── Root page component ──────────────────────────────────────────────────────
function ArchitecturePage() {
  return (
    <div style={{ background: BG, minHeight: "100vh", overflowX: "hidden" }}>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "64px 32px 96px",
          display: "flex",
          flexDirection: "column",
          gap: 80,
        }}
      >
        <PageHeader />
        <CapabilityAudit />
        <ThreeLayerArchitecture />
        <AIComponents />
        <Orchestration />
        <ProductionConstraints />
        <TechStack />
        <BottomNote />
      </div>
    </div>
  );
}
