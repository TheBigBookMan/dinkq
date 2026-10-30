import type { PlayerMatch } from '../../type'

const dateFmt = new Intl.DateTimeFormat(undefined, { weekday: 'short', day: 'numeric', month: 'short' })

export function RecentMatches({ matches }: { matches: PlayerMatch[] }) {
  return (
    <section aria-labelledby="matches-heading" className="neon-card p-5 sm:p-6">
      <h2 id="matches-heading" className="mb-4 font-display text-lg font-semibold">
        Recent matches
      </h2>

      {matches.length === 0 ? (
        <p className="text-sm text-ink-muted">No matches yet.</p>
      ) : (
        <ul className="divide-y divide-line">
          {matches.map((m) => (
            <li key={m.matchId} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">
                  with <span className="font-medium">{m.partner}</span>
                  <span className="text-ink-muted"> vs {m.opponents.join(' & ')}</span>
                </p>
                <p className="text-xs text-ink-muted">{dateFmt.format(new Date(m.playedAt))}</p>
              </div>
              <span className="font-display text-lg font-semibold tabular-nums">
                {m.score[0]}-{m.score[1]}
              </span>
              <span
                className={`w-7 shrink-0 rounded-md border py-0.5 text-center text-xs font-semibold ${
                  m.won
                    ? 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan'
                    : 'border-line bg-raised/50 text-ink-muted'
                }`}
              >
                {m.won ? 'W' : 'L'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}