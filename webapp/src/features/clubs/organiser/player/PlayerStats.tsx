import type { ClubPlayerProfile } from '../../type'

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-xl border border-line bg-raised/50 p-3">
      <p className="text-xs uppercase tracking-wider text-ink-muted">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold tabular-nums">{value}</p>
      {sub && <p className="text-xs text-ink-muted">{sub}</p>}
    </div>
  )
}

export function PlayerStats({ player }: { player: ClubPlayerProfile }) {
  const winRate = player.gamesPlayed > 0 ? `${Math.round((player.wins / player.gamesPlayed) * 100)}%` : '—'

  return (
    <section aria-label="Player statistics" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Stat label="Club rank" value={`#${player.rank}`} sub={`of ${player.rankOf}`} />
      <Stat label="Sessions" value={player.sessionsAttended} />
      <Stat label="Games" value={player.gamesPlayed} sub={`${player.wins} won`} />
      <Stat label="Win rate" value={winRate} />
    </section>
  )
}