import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { RefreshCw, Layers, Lock } from "lucide-react";

export const Route = createFileRoute("/_app/crm/gtm")({
  component: GTMPage,
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

function SLabel({ c }: { c: string }) {
  return <p style={{ fontFamily: JB, fontSize: 11, color: MUT, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>{c}</p>;
}
function SHead({ c }: { c: string }) {
  return <h2 style={{ fontFamily: SG, fontSize: 22, fontWeight: 600, color: TX1, marginBottom: 24, marginTop: 0, lineHeight: 1.3 }}>{c}</h2>;
}
function IndigoPill({ c }: { c: string }) {
  return <span style={{ display: "inline-flex", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: JB, fontWeight: 700, background: `${IND}20`, color: IND, border: `1px solid ${IND}40` }}>{c}</span>;
}
function GrayPill({ c }: { c: string }) {
  return <span style={{ display: "inline-flex", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: JB, background: "#ffffff0A", color: MUT, border: `1px solid ${BOR}` }}>{c}</span>;
}

// ─── ICP ──────────────────────────────────────────────────────────────────────
const COMPANY_ROWS = [
  { label: "Type", value: "B2B SaaS company" },
  { label: "Size", value: "20–200 employees" },
  { label: "Sales team", value: "5–30 reps" },
  { label: "Sales cycle", value: "4–12 weeks" },
  { label: "Deal value", value: "₹3L–₹50L average" },
  { label: "Current CRM", value: "HubSpot or Salesforce" },
  { label: "Tools in stack", value: "6+ (email, calls, notes, CRM, Slack, docs)" },
  { label: "Stage", value: "Series A to Series C" },
];
const BUYING_SIGNALS = [
  'Reps complain about "too much admin"',
  "Manager asks for deal updates in every 1:1",
  "Deals go cold after proposal stage regularly",
  'Onboarding failures traced to "AE didn\'t document"',
  "New rep ramp taking 3+ months",
  "RevOps cleaning CRM data instead of analyzing it",
  'Team using Google Docs alongside CRM for "real" notes',
];

// ─── Competitive table ────────────────────────────────────────────────────────
const COMP_ROWS = [
  { capability: "Post-call intelligence", competitor: "Manual or basic AI notes", superpilot: "Full extraction + tasks + email draft", win: true },
  { capability: "Pre-call context", competitor: "Manual research", superpilot: "Auto-assembled from all sources", win: true },
  { capability: "Cross-channel memory", competitor: "Siloed per tool", superpilot: "Unified timeline across email, calls, meetings", win: true },
  { capability: "Handoff briefs", competitor: "Not available", superpilot: "Auto-generated on stage change", win: true },
  { capability: "Deal intelligence", competitor: "Basic dashboards", superpilot: "Contextual nudges with specific recommendations", win: true },
  { capability: "Indian B2B context", competitor: "Built for Western enterprise", superpilot: "Multilingual, India-pricing, local workflows", win: true },
  { capability: "Implementation time", competitor: "6–9 months", superpilot: "Live in 30 days", win: true },
  { capability: "Price per seat", competitor: "$150–$300/mo", superpilot: "Fraction of the cost", win: true },
];

// ─── Wedge steps ──────────────────────────────────────────────────────────────
const WEDGE_STEPS = [
  {
    num: "1",
    title: "Land with the AE",
    body: "The Account Executive is the primary pain owner. Pre-call brief + post-call automation delivers immediate, measurable time savings. AE becomes the internal champion.",
    filled: true,
  },
  {
    num: "2",
    title: "Expand to the team",
    body: "Once one AE is using SuperPilot daily, the manager notices: pipeline reviews are faster, deal briefs are richer, new reps ramp faster. Team-level rollout follows.",
    filled: false,
  },
  {
    num: "3",
    title: "Own the workflow",
    body: "SuperPilot becomes how the team operates. Handoff briefs are standard. Deal memory is the source of truth. Switching cost is now the loss of institutional memory.",
    filled: false,
  },
];

// ─── Pricing tiers ────────────────────────────────────────────────────────────
const TIERS = [
  {
    label: "INCLUDED",
    labelColor: MUT,
    labelBg: "#ffffff0A",
    title: "Superleap Core",
    price: "Base Superleap plan",
    priceColor: TX2,
    featured: false,
    features: ["CRM pipeline and deals", "Lead management", "Basic automations", "Reporting", "Mobile app"],
    note: "SuperPilot not included — upgrade to unlock",
  },
  {
    label: "RECOMMENDED",
    labelColor: IND,
    labelBg: `${IND}20`,
    title: "SuperPilot Add-on",
    price: "+₹X,XXX/seat/month",
    priceColor: IND,
    featured: true,
    features: ["Pre-call brief (all channels)", "Post-call task extraction", "Deal intelligence feed", "Handoff brief generation", "Deal memory layer", "Follow-up email drafting"],
    note: "Pays for itself in week 1",
  },
  {
    label: "CUSTOM",
    labelColor: MUT,
    labelBg: "#ffffff0A",
    title: "Enterprise",
    price: "Contact sales",
    priceColor: TX2,
    featured: false,
    features: ["Everything in SuperPilot", "Custom data integrations", "Dedicated implementation", "SLA guarantees", "On-premise memory option", "Multi-workspace orchestration (V3)"],
    note: "",
  },
];

// ─── Expansion funnel ─────────────────────────────────────────────────────────
const FUNNEL_LEVELS = [
  { label: "Land — 1 AE team, core workflow", width: "100%", alpha: "20" },
  { label: "Expand — Full sales team rollout", width: "78%", alpha: "30" },
  { label: "Deepen — Add CS and Implementation teams", width: "56%", alpha: "44" },
  { label: "Platform — RevOps, forecasting, V3 capabilities", width: "36%", alpha: "66" },
];

// ─── Moat cards ───────────────────────────────────────────────────────────────
const MOAT_CARDS = [
  { icon: RefreshCw, title: "Data Flywheel", body: "Every interaction processed makes the intelligence better. Gong and Clari are built on English-language, Western sales patterns. SuperPilot is trained on Indian B2B deal data — the nuances, the relationship dynamics, the WhatsApp-heavy workflows. That data moat compounds over time." },
  { icon: Layers, title: "Native Integration", body: "Gong is a $500+/user/year add-on. Clari is another add-on. SuperPilot is native to the CRM — same data model, same UI, same pricing conversation. No integration tax. No context switching. The intelligence is where the work happens." },
  { icon: Lock, title: "Institutional Memory Lock-in", body: "When a company uses SuperPilot for 12+ months, their entire deal history, commitment trail, and institutional knowledge lives in the memory layer. Switching CRMs means losing that memory. That is the most defensible moat in B2B SaaS: irreplaceable context." },
];

function GTMPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 32px 96px", display: "flex", flexDirection: "column", gap: 72 }}>

        {/* Header */}
        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          <IndigoPill c="Commercial Strategy" />
          <h1 style={{ fontFamily: SG, fontSize: 32, fontWeight: 700, color: TX1, margin: "14px 0 10px", letterSpacing: "-0.02em" }}>Go-To-Market Strategy</h1>
          <p style={{ fontFamily: DM, fontSize: 16, color: TX2, lineHeight: 1.65, maxWidth: 540, margin: 0 }}>Who SuperPilot is for, how it enters, how it expands.</p>
        </motion.header>

        {/* ICP */}
        <section>
          <FadeIn><SLabel c="Ideal Customer Profile" /><SHead c="Who feels this pain most acutely." /></FadeIn>
          <FadeIn delay={0.06}>
            <div style={{ background: SPC, borderLeft: `3px solid ${IND}`, borderRadius: 10, padding: 24, boxShadow: `0 0 40px ${IND}08` }}>
              <p style={{ fontFamily: JB, fontSize: 12, color: IND, fontWeight: 700, marginBottom: 20, letterSpacing: "0.05em" }}>✦ SuperPilot ICP</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                {/* Company profile */}
                <div>
                  <p style={{ fontFamily: JB, fontSize: 10, color: MUT, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 14 }}>Company</p>
                  {COMPANY_ROWS.map(r => (
                    <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${BOR}` }}>
                      <span style={{ fontFamily: DM, fontSize: 13, color: MUT }}>{r.label}</span>
                      <span style={{ fontFamily: DM, fontSize: 13, color: TX1 }}>{r.value}</span>
                    </div>
                  ))}
                </div>
                {/* Buying signals */}
                <div>
                  <p style={{ fontFamily: JB, fontSize: 10, color: MUT, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 14 }}>Buying Signals</p>
                  {BUYING_SIGNALS.map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: `1px solid ${BOR}` }}>
                      <span style={{ color: IND, flexShrink: 0, fontFamily: JB, fontSize: 13, marginTop: 1 }}>•</span>
                      <span style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.5 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, marginTop: 20, paddingTop: 20, borderTop: `1px solid ${BOR}` }}>
                Why this segment specifically: these companies have complex enough sales motions to feel the context fragmentation problem acutely — but are not yet large enough to have dedicated RevOps teams solving it manually.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Wedge */}
        <section>
          <FadeIn><SLabel c="Wedge" /><SHead c="How SuperPilot enters the account." /></FadeIn>
          <FadeIn delay={0.06}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 0, marginBottom: 16 }}>
              {WEDGE_STEPS.map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", flex: 1, gap: 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, padding: "0 16px" }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%", border: `2px solid ${IND}`,
                      background: step.filled ? IND : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 14, flexShrink: 0,
                    }}>
                      <span style={{ fontFamily: SG, fontSize: 14, fontWeight: 700, color: step.filled ? "#fff" : IND }}>{step.num}</span>
                    </div>
                    <h3 style={{ fontFamily: SG, fontSize: 14, fontWeight: 600, color: TX1, margin: "0 0 8px", textAlign: "center" }}>{step.title}</h3>
                    <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, margin: 0, textAlign: "center" }}>{step.body}</p>
                  </div>
                  {i < WEDGE_STEPS.length - 1 && (
                    <div style={{ flexShrink: 0, paddingTop: 18 }}>
                      <svg width="24" height="20" viewBox="0 0 24 20"><path d="M1 10h18M15 4l6 6-6 6" stroke={IND} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ background: CARD, border: `1px solid ${BOR}`, borderRadius: 10, padding: 16 }}>
              <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, margin: 0 }}>
                <span style={{ color: IND, fontWeight: 600 }}>Why this wedge works:</span> The AE wedge is the right entry because: (1) AEs have the most acute pain, (2) the value is immediately measurable in time saved, (3) AE adoption creates visible artifacts (briefs, handoff docs) that spread the feature organically to managers and CSMs.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Competitive positioning */}
        <section>
          <FadeIn><SLabel c="Competitive Positioning" /><SHead c="Why SuperPilot wins the switch conversation." /></FadeIn>
          <FadeIn delay={0.06}>
            <div style={{ background: CARD, border: `1px solid ${BOR}`, borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.8fr 1.8fr", padding: "10px 20px", background: SPC, borderBottom: `1px solid ${BOR}` }}>
                {["CAPABILITY", "HUBSPOT / SALESFORCE", "SUPERPILOT"].map(h => (
                  <p key={h} style={{ fontFamily: JB, fontSize: 10, color: TX2, textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>{h}</p>
                ))}
              </div>
              {COMP_ROWS.map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1.8fr 1.8fr 1.8fr", padding: "12px 20px", borderBottom: i < COMP_ROWS.length - 1 ? `1px solid ${BOR}` : "none", alignItems: "center" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "#ffffff04"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}>
                  <span style={{ fontFamily: DM, fontSize: 13, color: TX2 }}>{row.capability}</span>
                  <span style={{ fontFamily: DM, fontSize: 13, color: MUT }}>{row.competitor}</span>
                  <span style={{ fontFamily: DM, fontSize: 13, color: TX1 }}>{row.superpilot}</span>
                </div>
              ))}
            </div>
            <div style={{ background: SPC, borderLeft: `3px solid ${IND}`, borderRadius: 10, padding: 16 }}>
              <p style={{ fontFamily: DM, fontSize: 14, color: TX2, lineHeight: 1.75, margin: 0 }}>
                <span style={{ color: IND, fontWeight: 700 }}>✦ Teams don't switch because SuperPilot has more features.</span> They switch because the CXO asks: "Is our CRM AI-native?" HubSpot and Salesforce have AI features. SuperPilot is AI-native. The data model, the workflow, and the intelligence layer are designed together. That's the answer the CXO is looking for.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Pricing */}
        <section>
          <FadeIn><SLabel c="Pricing" /><SHead c="How SuperPilot gets priced." /></FadeIn>
          <FadeIn delay={0.06}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
              {TIERS.map(tier => (
                <div key={tier.title} style={{
                  background: tier.featured ? SPC : CARD,
                  border: `1px solid ${tier.featured ? IND : BOR}`,
                  borderRadius: 10, padding: 24,
                  boxShadow: tier.featured ? `0 0 30px ${IND}10` : "none",
                }}>
                  <span style={{ display: "inline-flex", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: JB, fontWeight: 700, background: tier.labelBg, color: tier.labelColor, border: `1px solid ${tier.featured ? IND + "40" : BOR}`, marginBottom: 12 }}>{tier.label}</span>
                  <h3 style={{ fontFamily: SG, fontSize: 16, fontWeight: 600, color: TX1, margin: "0 0 6px" }}>{tier.title}</h3>
                  <p style={{ fontFamily: SG, fontSize: tier.featured ? 20 : 14, fontWeight: 700, color: tier.priceColor, margin: "0 0 16px" }}>{tier.price}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                    {tier.features.map(f => (
                      <div key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ color: tier.featured ? IND : MUT, fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                        <span style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.4 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  {tier.note && <p style={{ fontFamily: JB, fontSize: 11, color: tier.featured ? EME : MUT, marginTop: "auto" }}>{tier.note}</p>}
                </div>
              ))}
            </div>
            <div style={{ background: SPC, borderLeft: `3px solid ${IND}`, borderRadius: 10, padding: 20 }}>
              <p style={{ fontFamily: JB, fontSize: 12, color: IND, fontWeight: 700, marginBottom: 10, letterSpacing: "0.05em" }}>✦ Why per-seat, not usage-based</p>
              <p style={{ fontFamily: DM, fontSize: 14, color: TX2, lineHeight: 1.75, margin: 0 }}>
                AI pricing is often usage-based (per API call, per token). SuperPilot is priced per seat because the value delivered is continuous and ambient — not transactional. A rep doesn't "use" SuperPilot like a tool. It runs in the background for them constantly. Per-seat pricing aligns the business model with the product experience.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Expansion funnel */}
        <section>
          <FadeIn><SLabel c="Expansion" /><SHead c="How a deal grows after it closes." /></FadeIn>
          <FadeIn delay={0.06}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", marginBottom: 16 }}>
              {FUNNEL_LEVELS.map((level, i) => (
                <div key={i} style={{
                  width: level.width, padding: "14px 20px", borderRadius: 8,
                  background: `${IND}${level.alpha}`, border: `1px solid ${IND}40`,
                  textAlign: "center", fontFamily: DM, fontSize: 14, color: TX1,
                  transition: "opacity 0.15s",
                }}>
                  {level.label}
                </div>
              ))}
            </div>
            <div style={{ background: CARD, border: `1px solid ${BOR}`, borderRadius: 10, padding: 16 }}>
              <p style={{ fontFamily: JB, fontSize: 12, color: AMB, fontWeight: 700, marginBottom: 8 }}>Target NRR: 130%+</p>
              <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, margin: 0 }}>
                SuperPilot's expansion motion is natural: land with AEs, expand to CS and Implementation when handoff briefs prove their value, deepen with RevOps when forecasting signals mature. Each new team that uses deal memory creates a switching cost that protects the account.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Moat */}
        <section>
          <FadeIn><SLabel c="Competitive Moat" /><SHead c="Why SuperPilot is hard to copy." /></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {MOAT_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <FadeIn key={card.title} delay={0.04 + i * 0.06}>
                  <div style={{ background: CARD, border: `1px solid ${BOR}`, borderRadius: 10, padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <Icon size={18} color={IND} strokeWidth={1.75} />
                      <h3 style={{ fontFamily: SG, fontSize: 14, fontWeight: 600, color: TX1, margin: 0 }}>{card.title}</h3>
                    </div>
                    <p style={{ fontFamily: DM, fontSize: 13, color: TX2, lineHeight: 1.7, margin: 0 }}>{card.body}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
