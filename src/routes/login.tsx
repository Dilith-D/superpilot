import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getSession, signIn } from "@/lib/session";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    if (getSession()) throw redirect({ to: "/crm" });
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("dilith@zephyrtech.io");
  const [password, setPassword] = useState("superpilot");
  const [loading, setLoading] = useState(false);

  function doSignIn(userEmail: string) {
    setLoading(true);
    signIn(userEmail);
    setTimeout(() => navigate({ to: "/crm" }), 350);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    doSignIn(email);
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[var(--surface-base)] text-[var(--text-primary)] font-body">
      {/* Left: quiet brand panel */}
      <div className="relative hidden md:flex flex-col justify-between p-14 border-r border-[var(--border-default)] overflow-hidden">
        <a href="/" className="relative flex items-center gap-2.5 w-fit">
          <div className="size-7 bg-[var(--sp)] rounded-md flex items-center justify-center">
            <span className="text-[11px] text-white font-mono font-bold">SP</span>
          </div>
          <span className="font-display font-medium tracking-tight text-lg">SuperPilot</span>
        </a>

        <div className="relative max-w-md space-y-6 animate-fade-in">
          <span className="inline-block font-mono text-[10px] text-[var(--sp)] uppercase tracking-[0.22em]">
            The cockpit
          </span>
          <h1 className="text-5xl font-display font-medium leading-[1.05] tracking-tight text-pretty">
            Every signal captured.
            <br />
            <span className="text-[var(--text-muted)]">Every commitment kept.</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed max-w-sm">
            Sign in to your Zephyr Technologies workspace. Demo data is pre-loaded — six deals,
            twelve contacts, a couple of weeks of activity.
          </p>
        </div>

        <div className="relative flex items-center gap-5 text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.18em]">
          <span>SOC 2 · Type II</span>
          <span className="size-1 rounded-full bg-[var(--border-default)]" />
          <span>End-to-end encrypted</span>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-sm space-y-8 animate-fade-in">
          <div className="space-y-2">
            <h2 className="text-3xl font-display font-medium tracking-tight">
              Sign in
            </h2>
            <p className="text-[15px] text-[var(--text-secondary)]">
              Welcome back, Dilith.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Work email" type="email" value={email} onChange={setEmail} autoFocus />
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              hint={
                <a href="#" className="text-[var(--text-muted)] hover:text-[var(--sp)] transition-colors">
                  Forgot?
                </a>
              }
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--sp)] text-white text-sm font-medium py-2.5 rounded-md hover:brightness-[1.05] disabled:opacity-60 transition-all"
            >
              {loading ? "Signing in…" : "Continue with email"}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--border-default)]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[var(--surface-base)] px-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  or
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => doSignIn("dilith@zephyrtech.io")}
              className="w-full flex items-center justify-center gap-2.5 bg-[var(--surface-card)] text-[var(--text-primary)] text-sm font-medium py-2.5 rounded-md border border-[var(--border-default)] hover:bg-[var(--surface-sidebar)] disabled:opacity-60 transition-colors"
            >
              <svg className="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.19 3.32v2.77h3.55c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.55-2.77c-.98.66-2.23 1.06-3.73 1.06-2.87 0-5.3-1.94-6.17-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.83 14.09a6.96 6.96 0 0 1 0-4.18V7.07H2.18C.79 9.36 0 11.91 0 14.5c0 2.59.79 5.14 2.18 7.43l3.65-2.84z" fill="#FBBC05"/>
                <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.45-3.45C17.95 1.19 15.24 0 12 0 7.7 0 3.99 2.47 2.18 6.07l3.65 2.84c.87-2.59 3.3-4.16 6.17-4.16z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => doSignIn("dilith@zephyrtech.io")}
              className="w-full flex items-center justify-center gap-2.5 bg-[var(--surface-card)] text-[var(--text-primary)] text-sm font-medium py-2.5 rounded-md border border-[var(--border-default)] hover:bg-[var(--surface-sidebar)] disabled:opacity-60 transition-colors"
            >
              <Shield className="size-4 text-[var(--sp)]" />
              Continue with SSO
            </button>
          </form>

          <p className="text-xs text-[var(--text-muted)] text-center">
            New to SuperPilot?{" "}
            <a href="/" className="text-[var(--text-secondary)] hover:text-[var(--sp)] transition-colors">
              Request access
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  hint,
  autoFocus,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  hint?: React.ReactNode;
  autoFocus?: boolean;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--text-muted)]">
        <span>{label}</span>
        {hint}
      </span>
      <input
        type={type}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[var(--surface-card)] border border-[var(--border-default)] rounded-md px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--sp)] focus:ring-2 focus:ring-[var(--sp)]/20 transition-colors"
      />
    </label>
  );
}
