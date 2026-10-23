import { Link } from 'react-router-dom'
import { ChevronRightIcon, UserPlusIcon } from 'lucide-react'
import { Button } from '../../../components/ui/button'

const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' }) // "today", "yesterday", "3 days ago"

function daysAgo(value: string | number) {
  const t = new Date(value).getTime()
  if (Number.isNaN(t)) return null
  const days = Math.floor((Date.now() - t) / 86_400_000)
  return rtf.format(-Math.max(0, days), 'day')
}

type ClubCardProps = {
  name: string
  playerCount: number
  newThisMonth?: number
  guestsToReview?: number
  lastSessionAt?: string | number // ISO string or epoch ms
  onAddPlayer: () => void
  className?: string
}

const ClubCard = ({
  name,
  playerCount,
  newThisMonth = 0,
  guestsToReview = 0,
  lastSessionAt,
  onAddPlayer,
  className = '',
}: ClubCardProps) => {
  const empty = playerCount === 0
  const last = lastSessionAt !== undefined ? daysAgo(lastSessionAt) : null

  return (
    <section aria-labelledby="club-heading" className={`neon-card flex flex-col gap-5 p-5 sm:p-6 ${className}`}>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-wider text-ink-muted">Your club</p>
        <h2 id="club-heading" className="font-display text-xl font-semibold">
          {name}
        </h2>
      </div>

      {empty ? (
        <p className="text-sm text-ink-muted">No players yet. Add your first player to get ready for a session.</p>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
            <span className="font-display text-4xl font-semibold tabular-nums">{playerCount}</span>
            <span className="pb-1 text-sm text-ink-muted">{playerCount === 1 ? 'player' : 'players'}</span>
            {newThisMonth > 0 && (
              <span className="mb-1 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-2 py-0.5 text-xs font-medium text-neon-cyan">
                +{newThisMonth} this month
              </span>
            )}
          </div>

          {guestsToReview > 0 && (
            <Link
              to="/organiser/roster"
              className="group flex items-center justify-between rounded-lg border border-neon-amber/40 bg-neon-amber/10 px-3 py-2 text-sm text-neon-amber outline-none transition hover:border-neon-amber focus-visible:ring-2 focus-visible:ring-neon-amber/50"
            >
              {guestsToReview} {guestsToReview === 1 ? 'guest' : 'guests'} to review
              <ChevronRightIcon className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
          )}

          {last && <p className="text-xs text-ink-muted">Last session {last}</p>}
        </div>
      )}

      {/* mt-auto keeps the buttons at the bottom when the card stretches to match its neighbour */}
      <div className="mt-auto flex flex-wrap items-center gap-2">
        <Button
          onClick={onAddPlayer}
          className="h-10 rounded-lg bg-linear-to-r from-neon-violet to-neon-magenta px-4 font-semibold text-primary-foreground shadow-neon-sm hover:shadow-neon"
        >
          <UserPlusIcon />
          {empty ? 'Add your first player' : 'Add player'}
        </Button>
        {!empty && (
          <Button asChild variant="ghost" className="h-10 text-ink-muted">
            <Link to="/organiser/roster">View roster</Link>
          </Button>
        )}
      </div>
    </section>
  )
}

export default ClubCard;