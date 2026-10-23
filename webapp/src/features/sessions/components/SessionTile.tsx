import { Link } from 'react-router-dom'
import { ChevronRightIcon, CircleAlertIcon, CircleCheckIcon, UsersIcon } from 'lucide-react'

// Created once at module level; `undefined` uses the browser's locale
const dateFmt = new Intl.DateTimeFormat(undefined, { weekday: 'short', day: 'numeric', month: 'short' })
const timeFmt = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })

const badge = 'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium'

type Props = {
  id: string
  startedAt: string | number // ISO string or epoch ms
  playerCount: number
  paidCount: number
  to?: string // defaults to the session page
}

export function SessionTile({ id, startedAt, playerCount, paidCount, to = `/organiser/sessions/${id}` }: Props) {
  const date = new Date(startedAt)
  const validDate = !Number.isNaN(date.getTime()) // Intl throws on an invalid date, so guard it
  const unpaid = Math.max(0, playerCount - paidCount)

  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-xl border border-line bg-raised/50 p-4 outline-none transition hover:border-neon-violet/60 hover:bg-raised hover:shadow-neon-sm focus-visible:border-neon-violet focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <div className="min-w-0 flex-1 space-y-2">
        <div>
          <p className="font-display text-base font-semibold">{validDate ? dateFmt.format(date) : '—'}</p>
          <p className="text-xs text-ink-muted">{validDate ? timeFmt.format(date) : ''}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
          <span className="inline-flex items-center gap-1.5 text-foreground/80">
            <UsersIcon className="size-4 text-ink-muted" />
            {playerCount} {playerCount === 1 ? 'player' : 'players'}
          </span>

          {playerCount > 0 &&
            (unpaid === 0 ? (
              <span className={`${badge} border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan`}>
                <CircleCheckIcon className="size-3.5" />
                All paid
              </span>
            ) : (
              <span className={`${badge} border-neon-amber/40 bg-neon-amber/10 text-neon-amber`}>
                <CircleAlertIcon className="size-3.5" />
                {unpaid} unpaid
              </span>
            ))}
        </div>
      </div>

      <ChevronRightIcon className="size-5 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-neon-violet" />
    </Link>
  )
}