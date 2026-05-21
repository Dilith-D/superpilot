export function StubPage({
  phase,
  title,
  subtitle,
}: {
  phase: number;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="grid place-items-center min-h-[calc(100vh-3.5rem)] p-12">
      <div className="text-center space-y-4 max-w-md">
        <span className="inline-block font-mono text-[10px] text-sp uppercase tracking-[0.22em] px-2 py-1 rounded-sm bg-sp/10 border border-sp/20">
          Phase {phase}
        </span>
        <h1 className="font-display text-2xl font-medium text-text-primary">{title}</h1>
        <p className="text-sm text-text-secondary">{subtitle}</p>
      </div>
    </div>
  );
}
