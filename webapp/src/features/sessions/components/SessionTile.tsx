import { Link } from 'react-router-dom'
import { ChevronRightIcon } from 'lucide-react'
import type { SessionSummary } from '../types'

const dateFmt = new Intl.DateTimeFormat(undefined, { weekday: 'short', day: 'numeric', month: 'short' })
const timeFmt = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })

const badgeBase = 'shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium'

function badgeFor(s: SessionSummary) {
  const unpaid = s.playerCount - s.paidCount
  switch (s.status) {
    case 'CANCELED':
      return { label: 'Canceled', className: 'border-line bg-raised/50 text-ink-muted' }
    case 'POSTPONED':
      return { label: 'Postponed', className: 'border-neon-amber/40 bg-neon-amber/10 text-neon-amber' }
    case 'COMPLETED':
      if (s.playerCount === 0) return null
      return unpaid > 0
        ? { label: `${unpaid} unpaid`, className: 'border-neon-amber/40 bg-neon-amber/10 text-neon-amber' }
        : { label: 'All paid', className: 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan' }
    default:
      return null // scheduled or live: nothing to settle yet
  }
}

type Props = { session: SessionSummary; showClub?: boolean; to?: string }

export function SessionTile({ session: s, showClub = false, to }: Props) {
  const start = new Date(s.startedAt)
  const valid = !Number.isNaN(start.getTime())
  const badge = badgeFor(s)
  const count = `${s.playerCount} ${s.status === 'SCHEDULED' ? 'signed up' : s.playerCount === 1 ? 'player' : 'players'}`

  return (
    <Link
      to={to ?? `/organiser/sessions/${s.sessionId}`}
      className={`group flex items-center gap-3 rounded-xl border border-line bg-raised/50 p-4 outline-none transition hover:border-neon-violet/60 hover:shadow-neon-sm focus-visible:ring-2 focus-visible:ring-neon-violet/60 ${
        s.status === 'CANCELED' ? 'opacity-70' : ''
      }`}
    >
      <div className="min-w-0 flex-1 space-y-1">
        <p className="font-medium">{valid ? dateFmt.format(start) : 'Date unknown'}</p>
        <p className="truncate text-xs text-ink-muted">
          {valid && `${timeFmt.format(start)} · `}
          {count}
          {showClub && ` · ${s.clubName}`}
        </p>
      </div>

      {badge && <span className={`${badgeBase} ${badge.className}`}>{badge.label}</span>}
      <ChevronRightIcon className="size-5 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-neon-violet-soft" />
    </Link>
  )
}