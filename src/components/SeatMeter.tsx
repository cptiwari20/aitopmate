import { site } from "@/lib/site";

export default function SeatMeter({ compact = false }: { compact?: boolean }) {
  const { seatsTaken, seatsTotal, name, closes } = site.cohort;
  const pct = Math.round((seatsTaken / seatsTotal) * 100);
  return (
    <div className={compact ? "" : "rounded-2xl border border-line bg-ink-2/70 p-5"}>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-mute">{name} seats</span>
        <span className="tabular-nums">
          <span className="text-ivory">{seatsTaken}</span>
          <span className="text-dim"> / {seatsTotal}</span>
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-gradient-to-r from-brass to-ember" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-3 text-xs text-dim">
        {seatsTotal - seatsTaken} seats left · applications close {closes}
      </p>
    </div>
  );
}
