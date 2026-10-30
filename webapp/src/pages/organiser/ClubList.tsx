import { Link } from 'react-router-dom'
import { ArrowRightIcon, ChevronRightIcon, PlusIcon } from 'lucide-react'
import { Button } from '../../components/ui/button';
import type { ClubSummary } from '../../features/clubs/type';


type Props = {
  clubs: ClubSummary[]
  onCreateClub?: () => void // shows a "Create new club" button when provided
  className?: string
}

export function ClubList({ clubs, onCreateClub, className = '' }: Props) {
  return (
    <section aria-labelledby="clubs-heading" className={`neon-card flex flex-col gap-5 p-5 sm:p-6 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="text-xs uppercase tracking-wider text-ink-muted">Your clubs</p>
          <h2 id="clubs-heading" className="font-display text-xl font-semibold">
            Choose a club
          </h2>
        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="shrink-0 border-line bg-raised/70 text-neon-violet-soft hover:border-neon-violet/70 hover:bg-raised hover:shadow-neon-sm"
        >
          <Link to="/organiser/clubs">
            View all
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>

      <ul className="space-y-2">
        {clubs.map((club) => (
          <li key={club.clubId}>
            <Link
              to={`/organiser/club/${club.clubId}`}
              className="group flex items-center gap-3 rounded-xl border border-line bg-raised/50 p-4 outline-none transition hover:border-neon-violet/60 hover:bg-raised hover:shadow-neon-sm focus-visible:ring-2 focus-visible:ring-neon-violet/60"
            >
              <span
                aria-hidden="true"
                className="grid size-10 shrink-0 place-items-center rounded-lg border border-neon-violet/40 bg-surface font-display font-semibold text-neon-violet-soft"
              >
                {club.clubName[0]?.toUpperCase()}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{club.clubName}</p>
                <p className="text-xs text-ink-muted">
                  {club.playerCount} {club.playerCount === 1 ? 'player' : 'players'}
                </p>
              </div>

              <ChevronRightIcon className="size-5 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-neon-violet-soft" />
            </Link>
          </li>
        ))}
      </ul>

      {onCreateClub && (
        <div className="mt-auto">
          <Button variant="outline" onClick={onCreateClub} className="h-10 border-line bg-raised/70 hover:border-neon-violet/70">
            <PlusIcon />
            Create new club
          </Button>
        </div>
      )}
    </section>
  )
}