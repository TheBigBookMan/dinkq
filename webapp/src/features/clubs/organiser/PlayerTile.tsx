import { Link } from 'react-router-dom'
import type { RosterPlayer } from '../type'

const joinedFmt = new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' })
const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })
const DAY = 86_400_000

function ago(iso: string) {
  const t = Date.parse(iso)
  if (Number.isNaN(t)) return null
  const days = Math.max(0, Math.floor((Date.now() - t) / DAY))
  if (days < 14) return rtf.format(-days, 'day') // "today", "yesterday", "5 days ago"
  if (days < 60) return rtf.format(-Math.floor(days / 7), 'week')
  return rtf.format(-Math.floor(days / 30), 'month')
}

export function PlayerTile({ player }: { player: RosterPlayer }) {
  const joined = new Date(player.joinedAt)
  const seen = player.lastSeenAt ? ago(player.lastSeenAt) : null

  return (
    <Link to={player.playerId} className="neon-card flex items-center gap-3 p-4">
      {player.avatarUrl ? (
        <img src={player.avatarUrl} alt="" className="size-11 shrink-0 rounded-full border border-line object-cover" />
      ) : (
        <div
          aria-hidden="true"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-neon-violet/40 bg-raised font-display font-semibold text-neon-violet-soft"
        >
          {player.name[0]?.toUpperCase()}
        </div>
      )}

      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium">{player.name}</p>
          {player.isGuest && (
            <span className="shrink-0 rounded-full border border-neon-amber/40 bg-neon-amber/10 px-2 py-0.5 text-xs font-medium text-neon-amber">
              Guest
            </span>
          )}
        </div>
        <p className="truncate text-xs text-ink-muted">
          {!Number.isNaN(joined.getTime()) && `Joined ${joinedFmt.format(joined)} · `}
          {seen ? `Played ${seen}` : 'Not played yet'}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="font-display text-xl font-semibold tabular-nums text-neon-cyan">{player.rating.toFixed(1)}</p>
        <p className="text-xs text-ink-muted">rating</p>
      </div>
    </Link>
  )
}