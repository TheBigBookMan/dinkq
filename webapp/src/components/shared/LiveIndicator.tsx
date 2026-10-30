import { Link } from 'react-router-dom'
import { formatDuration } from '../../lib/utils'
import { useNow } from '../../hooks/useNow'

type Props = {
  startedAt: string // ISO string
  to: string // where "resume" goes
  className?: string
}

export function LiveIndicator({ startedAt, to, className = '' }: Props) {
  const now = useNow() // ticks every second
  const elapsed = Math.max(0, now - Date.parse(startedAt)) // NaN if the string is invalid

  return (
    <Link
      to={to}
      aria-label="Resume live session"
      className={`flex items-center gap-2.5 rounded-lg border border-neon-magenta/40 bg-neon-magenta/10 px-3 text-sm font-semibold text-neon-magenta outline-none transition hover:border-neon-magenta hover:shadow-neon-magenta focus-visible:ring-2 focus-visible:ring-neon-magenta/50 ${className}`}
    >
      {/* Pulsing dot: a solid dot with a ring that expands and fades */}
      <span className="relative flex size-2.5" aria-hidden="true">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon-magenta opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full bg-neon-magenta shadow-neon-magenta" />
      </span>
      <span className="tracking-widest">LIVE</span>
      <span aria-hidden="true" className="font-medium tabular-nums text-foreground/80">
        {formatDuration(elapsed)}
      </span>
    </Link>
  )
}