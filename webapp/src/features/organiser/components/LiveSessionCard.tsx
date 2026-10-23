import { Link } from 'react-router-dom'
import { ArrowRightIcon } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { useNow } from '../../../hooks/useNow'
import { formatDuration } from '../../../lib/utils'
import type { LiveSessionStats } from '../../sessions/types'

const ratio = (part: number, whole: number) => (whole > 0 ? Math.min(1, Math.max(0, part / whole)) : 0)

function Bar({ value, className = 'bg-neon-violet' }: { value: number; className?: string }) {
  return (
    <div aria-hidden="true" className="h-1.5 overflow-hidden rounded-full bg-line">
      <div
        className={`h-full rounded-full transition-[width] duration-500 ${className}`}
        style={{ width: `${value * 100}%` }}
      />
    </div>
  )
}

function Stat({ label, value, of, bar, hint }: { label: string; value: number; of?: number; bar?: number; hint?: string }) {
  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-wider text-ink-muted">{label}</p>
      <p className="font-display text-2xl font-semibold tabular-nums">
        {value}
        {of !== undefined && <span className="text-base text-ink-muted">/{of}</span>}
      </p>
      {bar !== undefined ? <Bar value={bar} /> : hint ? <p className="text-xs text-ink-muted">{hint}</p> : null}
    </div>
  )
}

const LiveSessionCard = ({ session: s, className = '' }: { session: LiveSessionStats; className?: string }) => {
  const now = useNow()
  const running = now - s.startedAt
  const remaining = s.endsAt - now
  const over = remaining < 0

  return (
    <section aria-labelledby="live-session-heading" className={`neon-card space-y-6 p-5 sm:p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2.5" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon-magenta opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-neon-magenta shadow-neon-magenta" />
          </span>
          <h2 id="live-session-heading" className="font-display text-lg font-semibold">
            <span className="mr-2 text-xs font-semibold tracking-widest text-neon-magenta">LIVE</span>
            Session in progress
          </h2>
        </div>
        <Button
          asChild
          className="h-9 rounded-lg bg-linear-to-r from-neon-violet to-neon-magenta px-4 font-semibold text-primary-foreground shadow-neon-sm hover:shadow-neon"
        >
          <Link to={`/organiser/sessions/${s.id}`}>
            Open
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>

      {/* Time */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-muted">Running</p>
            <p className="font-display text-3xl font-semibold tabular-nums">{formatDuration(running)}</p>
          </div>
          <div>
            <p className={`text-xs uppercase tracking-wider ${over ? 'text-neon-amber' : 'text-ink-muted'}`}>
              {over ? 'Over time' : 'Time left'}
            </p>
            <p className={`font-display text-3xl font-semibold tabular-nums ${over ? 'text-neon-amber' : ''}`}>
              {over ? `+${formatDuration(-remaining)}` : formatDuration(remaining)}
            </p>
          </div>
        </div>
        <Bar value={ratio(running, s.endsAt - s.startedAt)} className={over ? 'bg-neon-amber' : 'bg-neon-violet'} />
      </div>

      {/* Counts */}
      <div className="grid grid-cols-3 gap-3 border-t border-line pt-5">
        <Stat label="Here" value={s.arrivedCount} of={s.expectedCount} bar={ratio(s.arrivedCount, s.expectedCount ?? s.arrivedCount)} />
        <Stat label="On court" value={s.gamesInPlay} hint={`of ${s.courtCount} courts`} />
        <Stat label="Paid" value={s.paidCount} of={s.arrivedCount} bar={ratio(s.paidCount, s.arrivedCount)} />
      </div>
    </section>
  )
}

export default LiveSessionCard;