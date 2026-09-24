export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brass">
      <span className="h-px w-6 bg-brass/60" />
      {children}
    </p>
  );
}
