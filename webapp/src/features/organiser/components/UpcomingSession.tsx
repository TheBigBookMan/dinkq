import { Link } from 'react-router-dom'
import { CalendarPlusIcon, PlayIcon, UsersIcon } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import type { SessionSummary } from '../../sessions/types'

const dateFmt = new Intl.DateTimeFormat(undefined, { weekday: 'short', day: 'numeric', month: 'short' })
const timeFmt = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()

// calendar days between today and the session, not 24h blocks
function dayLabel(start: Date) {
  const diff = Math.round((startOfDay(start) - startOfDay(new Date())) / 86_400_000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff > 1) return `In ${diff} days`
  return dateFmt.format(start)
}

type Props = {
  session: SessionSummary | null
  onStart?: (sessionId: string) => void
  className?: string
}

export function UpcomingSession({ session, onStart, className = '' }: Props) {
  const base = `neon-card flex flex-col gap-5 p-5 sm:p-6 ${className}`

  if (!session) {
    return (
      <section aria-labelledby="upcoming-heading" className={base}>
        <div className="min-w-0 space-y-1">
          <p className="text-xs uppercase tracking-wider text-ink-muted">Next session</p>
          <h2 id="upcoming-heading" className="font-display text-xl font-semibold">
            Nothing scheduled
          </h2>
        </div>
        <p className="text-sm text-ink-muted">Schedule your next session so players can sign up.</p>
        <div className="mt-auto">
          <Button
            asChild
            className="h-10 rounded-lg bg-linear-to-r from-neon-violet to-neon-magenta px-4 font-semibold text-primary-foreground shadow-neon-sm hover:shadow-neon"
          >
            <Link to="/organiser/sessions/new">
              <CalendarPlusIcon />
              Schedule a session
            </Link>
          </Button>
        </div>
      </section>
    )
  }

  const start = new Date(session.startedAt)
  const end = new Date(session.endsAt)
  if (Number.isNaN(start.getTime())) return null

  const isToday = startOfDay(start) === startOfDay(new Date())
  const timeRange = Number.isNaN(end.getTime())
    ? timeFmt.format(start)
    : `${timeFmt.format(start)} – ${timeFmt.format(end)}`

  return (
    <section aria-labelledby="upcoming-heading" className={base}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="text-xs uppercase tracking-wider text-ink-muted">Next session</p>
          <h2 id="upcoming-heading" className="truncate font-display text-xl font-semibold">
            {dayLabel(start)}
          </h2>
          <p className="text-sm text-ink-muted">
            {dateFmt.format(start)} · {timeRange}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-neon-violet/40 bg-neon-violet/10 px-2.5 py-1 text-xs font-medium text-neon-violet-soft">
          {session.clubName}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <UsersIcon className="size-4 text-neon-cyan" />
        <span className="font-medium tabular-nums">{session.playerCount}</span>
        <span className="text-ink-muted">{session.playerCount === 1 ? 'player' : 'players'} signed up</span>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2">
        {isToday && onStart && (
          <Button
            onClick={() => onStart(session.sessionId)}
            className="h-10 rounded-lg bg-linear-to-r from-neon-violet to-neon-magenta px-4 font-semibold text-primary-foreground shadow-neon-sm hover:shadow-neon"
          >
            <PlayIcon />
            Start session
          </Button>
        )}
        <Button asChild variant={isToday ? 'ghost' : 'outline'} className="h-10 text-ink-muted">
          <Link to={`/organiser/sessions/${session.sessionId}`}>View details</Link>
        </Button>
      </div>
    </section>
  )
}