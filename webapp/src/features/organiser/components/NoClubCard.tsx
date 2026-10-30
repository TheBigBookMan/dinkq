import { PlusIcon } from 'lucide-react'
import { Button } from '../../../components/ui/button'

type Props = {
  onCreateClub: () => void
  className?: string
}

export function NoClubCard({ onCreateClub, className = '' }: Props) {
  return (
    <section aria-labelledby="club-heading" className={`neon-card flex flex-col gap-5 p-5 m-5 sm:p-6 ${className}`}>
      <div className="min-w-0 space-y-1">
        <p className="text-xs uppercase tracking-wider text-ink-muted">Your club</p>
        <h2 id="club-heading" className="truncate font-display text-xl font-semibold">
          No club yet
        </h2>
      </div>

      <p className="text-sm text-ink-muted">
        Create your club to build a roster and start running sessions.
      </p>

      <div className="mt-auto">
        <Button
          onClick={onCreateClub}
          className="h-10 rounded-lg bg-linear-to-r from-neon-violet to-neon-magenta px-4 font-semibold text-primary-foreground shadow-neon-sm hover:shadow-neon"
        >
          <PlusIcon />
          Create new club
        </Button>
      </div>
    </section>
  )
}