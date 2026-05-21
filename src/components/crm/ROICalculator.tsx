import { useState } from "react";

const IND = "#6366F1"; const EME = "#10B981"; const AMB = "#F59E0B";
const CARD = "#12121A"; const SPC = "#0F0F1C"; const BOR = "#1E1E2E";
const TX1 = "#F5F5F5"; const TX2 = "#8B8B9A"; const MUT = "#4B4B5A"; const BG = "#0A0A0F";
const SG = '"Space Grotesk", system-ui, sans-serif';
const DM = '"DM Sans", system-ui, sans-serif';
const JB = '"JetBrains Mono", ui-monospace, monospace';

function fmt(val: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

function fmtCr(val: number): string {
  if (val >= 10_000_000) return `${(val / 10_000_000).toFixed(1)} Cr+`;
  if (val >= 100_000) return `${(val / 100_000).toFixed(1)}L+`;
  return fmt(val);
}

function fmtHours(h: number): string {
  const hrs = Math.floor(h);
  const min = Math.round((h - hrs) * 60);
  if (min === 0) return `${hrs} hrs`;
  if (hrs === 0) return `${min} min`;
  return `${hrs} hr ${min} min`;
}

function SliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <label style={{ fontFamily: DM, fontSize: 13, color: TX2 }}>{label}</label>
        <span style={{ fontFamily: JB, fontSize: 14, color: TX1, fontWeight: 700 }}>{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: IND, cursor: "pointer" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
        <span style={{ fontFamily: JB, fontSize: 10, color: MUT }}>{min}</span>
        <span style={{ fontFamily: JB, fontSize: 10, color: MUT }}>{max}</span>
      </div>
    </div>
  );
}

export function ROICalculator() {
  const [reps, setReps] = useState(10);
  const [callsPerDay, setCallsPerDay] = useState(5);
  const [dealValue, setDealValue] = useState(500_000);

  // Fixed research-backed constants
  const savedPerCall = 24; // minutes (12 min pre-call + 12 min post-call rounded)

  // Derived calculations
  const timeSavedRepDay = (callsPerDay * savedPerCall) / 60;
  const timeSavedTeamDay = timeSavedRepDay * reps;
  const additionalCallsRep = (callsPerDay * savedPerCall) / 20;
  const addRevMonth = additionalCallsRep * reps * 22 * 0.08 * dealValue;
  const annualImpact = addRevMonth * 12;

  const outputRows: { label: string; value: string; color: string; big?: boolean }[] = [
    {
      label: "Time saved per rep per day",
      value: fmtHours(timeSavedRepDay),
      color: TX1,
    },
    {
      label: "Time saved across team daily",
      value: fmtHours(timeSavedTeamDay),
      color: timeSavedTeamDay > 20 ? AMB : TX1,
    },
    {
      label: "Additional calls possible per rep",
      value: `+${additionalCallsRep.toFixed(1)} calls/day/rep`,
      color: TX1,
    },
    {
      label: "Additional revenue potential / month",
      value: fmt(addRevMonth) + "/mo",
      color: EME,
    },
    {
      label: "Annual revenue impact",
      value: fmtCr(annualImpact),
      color: EME,
      big: true,
    },
  ];

  return (
    <div
      style={{
        background: SPC,
        borderLeft: `3px solid ${IND}`,
        borderRadius: 10,
        padding: 32,
        boxShadow: `0 0 40px ${IND}08`,
      }}
    >
      <p style={{ fontFamily: JB, fontSize: 12, color: IND, fontWeight: 700, marginBottom: 24, letterSpacing: "0.05em" }}>
        ✦ Calculate your team's impact
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        {/* LEFT — inputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <SliderRow
            label="Number of reps"
            value={reps}
            min={1}
            max={100}
            onChange={setReps}
            display={String(reps)}
          />
          <SliderRow
            label="Calls per rep per day"
            value={callsPerDay}
            min={1}
            max={15}
            onChange={setCallsPerDay}
            display={String(callsPerDay)}
          />
          {/* Deal value — number input */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <label style={{ fontFamily: DM, fontSize: 13, color: TX2 }}>Average deal value</label>
              <span style={{ fontFamily: JB, fontSize: 13, color: TX1, fontWeight: 700 }}>{fmt(dealValue)}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: JB, fontSize: 14, color: MUT }}>₹</span>
              <input
                type="number"
                value={dealValue}
                min={100_000}
                max={5_000_000}
                step={100_000}
                onChange={(e) =>
                  setDealValue(Math.max(100_000, Math.min(5_000_000, Number(e.target.value) || 500_000)))
                }
                style={{
                  flex: 1,
                  background: BG,
                  border: `1px solid ${BOR}`,
                  borderRadius: 6,
                  padding: "8px 10px",
                  color: TX1,
                  fontFamily: JB,
                  fontSize: 13,
                  outline: "none",
                }}
              />
            </div>
            <p style={{ fontFamily: JB, fontSize: 10, color: MUT, marginTop: 4 }}>
              ₹1L – ₹50L range
            </p>
          </div>
        </div>

        {/* RIGHT — live outputs */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {outputRows.map((row, i) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: row.big ? "center" : "baseline",
                gap: 12,
                padding: "14px 0",
                borderBottom: i < outputRows.length - 1 ? `1px solid ${BOR}` : "none",
              }}
            >
              <span style={{ fontFamily: DM, fontSize: 13, color: TX2, flexShrink: 1 }}>{row.label}</span>
              <span
                style={{
                  fontFamily: SG,
                  fontSize: row.big ? 26 : 14,
                  fontWeight: 700,
                  color: row.color,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
          <p style={{ fontFamily: DM, fontSize: 11, color: MUT, fontStyle: "italic", marginTop: 12 }}>
            Assumes 8% lead-to-close conversion. Adjust inputs for your baseline.
          </p>
        </div>
      </div>
    </div>
  );
}
