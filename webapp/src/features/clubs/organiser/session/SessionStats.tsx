import type { SessionDetail } from "../../../sessions/types";

const money = new Intl.NumberFormat(undefined, { style: "currency", currency: "THB", maximumFractionDigits: 0 });

function Stat({ label, value, tone = "" }: { label: string; value: string | number; tone?: string }) {
  return (
    <div className="rounded-xl border border-line bg-raised/50 p-3">
      <p className="text-xs uppercase tracking-wider text-ink-muted">{label}</p>
      <p className={`mt-1 font-display text-2xl font-semibold tabular-nums ${tone}`}>{value}</p>
    </div>
  );
}

export function SessionStats({ session }: { session: SessionDetail }) {
  const unpaid = session.playerCount - session.paidCount;

  return (
    <section aria-label="Session totals" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Stat label="Players" value={session.playerCount} />
      <Stat label="Games" value={session.matches.length} />
      <Stat label="Collected" value={money.format(session.paidCount * session.pricePerPlayer)} />
      <Stat
        label="Outstanding"
        value={money.format(unpaid * session.pricePerPlayer)}
        tone={unpaid > 0 ? "text-neon-amber" : ""}
      />
    </section>
  );
}