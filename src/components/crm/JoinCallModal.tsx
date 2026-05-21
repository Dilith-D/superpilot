import { useEffect, useState } from "react";
import { Phone, Mic, MicOff, Video, VideoOff, X, Sparkles } from "lucide-react";
import type { Contact } from "@/lib/crm-data";

type Props = {
  open: boolean;
  onClose: () => void;
  company: string;
  contact?: Contact;
  callIn?: string;
};

export function JoinCallModal({ open, onClose, company, contact, callIn }: Props) {
  const [muted, setMuted] = useState(false);
  const [video, setVideo] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [phase, setPhase] = useState<"connecting" | "live">("connecting");

  useEffect(() => {
    if (!open) return;
    setSeconds(0);
    setPhase("connecting");
    const t1 = setTimeout(() => setPhase("live"), 1400);
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      clearTimeout(t1);
      clearInterval(id);
    };
  }, [open]);

  if (!open) return null;

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-surface-card border border-border-default rounded-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border-default">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-danger animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-secondary">
              {phase === "connecting" ? "Connecting…" : `Live · ${mm}:${ss}`}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary p-1"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Stage */}
        <div
          className="relative aspect-video w-full flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--sp) 18%, transparent), transparent 60%), radial-gradient(circle at 70% 70%, color-mix(in oklab, var(--info) 16%, transparent), transparent 55%), var(--surface-base)",
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="size-20 rounded-full bg-surface-card border border-border-default flex items-center justify-center text-xl font-display text-text-primary">
              {contact?.name
                .split(" ")
                .map((s) => s[0])
                .join("") ?? "?"}
            </div>
            <div className="text-center">
              <p className="text-base font-medium text-text-primary">
                {contact?.name ?? company}
              </p>
              <p className="text-[11px] font-mono text-text-muted">
                {contact?.title ?? company}
              </p>
            </div>
            {phase === "live" && (
              <div className="flex items-end gap-0.5 h-5 mt-1">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <span
                    key={i}
                    className="w-0.5 bg-sp rounded-full"
                    style={{
                      height: `${20 + Math.sin((seconds + i) * 1.2) * 20 + 30}%`,
                      transition: "height 200ms ease",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Self tile */}
          <div className="absolute bottom-3 right-3 w-28 aspect-video rounded-md bg-surface-card border border-border-default flex items-center justify-center text-[10px] font-mono uppercase tracking-[0.16em] text-text-muted">
            {video ? "You · cam on" : "Camera off"}
          </div>
        </div>

        {/* SuperPilot live coach */}
        <div className="px-5 py-3 border-t border-border-default bg-surface-base flex items-start gap-2">
          <Sparkles className="size-3.5 text-sp shrink-0 mt-0.5" />
          <p className="text-xs text-text-secondary leading-relaxed">
            <span className="font-mono uppercase tracking-[0.14em] text-[10px] text-sp mr-1">
              Coach
            </span>
            Listening live. I'll flag commitments, risks, and next steps in your sidebar as they come up.
          </p>
        </div>

        {/* Controls */}
        <div className="px-5 py-4 flex items-center justify-center gap-3 border-t border-border-default">
          <button
            onClick={() => setMuted((m) => !m)}
            className={`size-10 rounded-full flex items-center justify-center border transition-colors ${
              muted
                ? "bg-danger/20 border-danger/40 text-danger"
                : "bg-surface-card border-border-default text-text-secondary hover:text-text-primary"
            }`}
          >
            {muted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
          </button>
          <button
            onClick={() => setVideo((v) => !v)}
            className={`size-10 rounded-full flex items-center justify-center border transition-colors ${
              !video
                ? "bg-danger/20 border-danger/40 text-danger"
                : "bg-surface-card border-border-default text-text-secondary hover:text-text-primary"
            }`}
          >
            {video ? <Video className="size-4" /> : <VideoOff className="size-4" />}
          </button>
          <button
            onClick={onClose}
            className="h-10 px-4 rounded-full bg-danger text-white text-xs font-medium flex items-center gap-2 hover:brightness-110 transition-all"
          >
            <Phone className="size-4 rotate-[135deg]" />
            End call
          </button>
        </div>

        {callIn && (
          <p className="text-center pb-3 text-[10px] font-mono text-text-muted">
            Scheduled · {callIn}
          </p>
        )}
      </div>
    </div>
  );
}
