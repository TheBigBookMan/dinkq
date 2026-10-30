import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import { timeAgo } from '../../../../lib/utils'
import type { ClubPlayerProfile } from '../../type'

const joinedFmt = new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: 'numeric' })

export function PlayerHeader({ player }: { player: ClubPlayerProfile }) {
  const joined = new Date(player.joinedAt)
  const seen = player.lastSeenAt ? timeAgo(player.lastSeenAt) : null

  console.log(player);

  return (
    <section aria-labelledby="player-name" className="neon-card space-y-4 p-5 sm:p-6">
      <Link to=".." className="inline-flex items-center gap-1 text-sm text-ink-muted transition hover:text-foreground">
        <ArrowLeftIcon className="size-4" />
        Roster
      </Link>

      <div className="flex items-center gap-4">
        {player.avatarUrl ? (
          <img src={player.avatarUrl} alt="" className="size-16 shrink-0 rounded-full border border-line object-cover" />
        ) : (
          <div
            aria-hidden="true"
            className="grid size-16 shrink-0 place-items-center rounded-full border border-neon-violet/50 bg-raised font-display text-2xl font-semibold text-neon-violet-soft shadow-neon-sm"
          >
            {player?.name[0]?.toUpperCase()}
          </div>
        )}

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h2 id="player-name" className="truncate font-display text-xl font-semibold">
              {player.name}
            </h2>
            {player.isGuest && (
              <span className="shrink-0 rounded-full border border-neon-amber/40 bg-neon-amber/10 px-2 py-0.5 text-xs font-medium text-neon-amber">
                Guest
              </span>
            )}
          </div>
          <p className="text-sm text-ink-muted">
            {!Number.isNaN(joined.getTime()) && `Joined ${joinedFmt.format(joined)} · `}
            {seen ? `Played ${seen}` : 'Not played yet'}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="font-display text-3xl font-semibold tabular-nums text-neon-cyan">{player.rating.toFixed(1)}</p>
          <p className="text-xs text-ink-muted">rating</p>
        </div>
      </div>
    </section>
  )
}