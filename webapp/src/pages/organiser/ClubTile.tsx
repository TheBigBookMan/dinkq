import { Link } from 'react-router-dom'
import { CalendarIcon, ChevronRightIcon, HistoryIcon, MapPinIcon } from 'lucide-react'
import type { Club } from '../../features/clubs/type'

const dateFmt = new Intl.DateTimeFormat(undefined, { weekday: 'short', day: 'numeric', month: 'short' })
const timeFmt = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })

function when(iso?: string, withTime = false) {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return withTime ? `${dateFmt.format(d)} · ${timeFmt.format(d)}` : dateFmt.format(d)
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="font-display text-xl font-semibold tabular-nums">{value}</p>
      <p className="text-xs text-ink-muted">{label}</p>
    </div>
  )
}

export function ClubTile({ club }: { club: Club }) {
  const next = when(club.nextSessionAt, true)
  const last = when(club.lastSessionAt)

  return (
    <Link
      to={`/organiser/club/${club.clubId}`}
      className="neon-card group flex flex-col gap-5 p-5 outline-none transition hover:border-neon-violet/60 hover:shadow-neon-sm focus-visible:ring-2 focus-visible:ring-neon-violet/60 sm:p-6"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-xl border border-neon-violet/40 bg-surface font-display text-lg font-semibold text-neon-violet-soft"
        >
          {club.clubName[0]?.toUpperCase()}
        </span>

        <div className="min-w-0 flex-1 space-y-1">
          <h2 className="truncate font-display text-lg font-semibold">{club.clubName}</h2>
          {club.city && (
            <p className="flex items-center gap-1 text-sm text-ink-muted">
              <MapPinIcon className="size-3.5 shrink-0" />
              <span className="truncate">{club.city}</span>
            </p>
          )}
        </div>

        {club.isLive ? (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-neon-magenta/40 bg-neon-magenta/10 px-2.5 py-1 text-xs font-semibold text-neon-magenta">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon-magenta opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-neon-magenta" />
            </span>
            LIVE
          </span>
        ) : (
          <ChevronRightIcon className="size-5 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-neon-violet-soft" />
        )}
      </div>

      {/* Numbers */}
      <div className="flex items-end gap-6">
        <Stat value={club.playerCount} label={club.playerCount === 1 ? 'player' : 'players'} />
        {club.courtCount !== undefined && <Stat value={club.courtCount} label={club.courtCount === 1 ? 'court' : 'courts'} />}
        {!!club.newThisMonth && (
          <span className="mb-1 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-2 py-0.5 text-xs font-medium text-neon-cyan">
            +{club.newThisMonth} this month
          </span>
        )}
      </div>

      {/* Sessions */}
      <dl className="mt-auto space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-4 shrink-0 text-neon-violet-soft" />
          <dt className="sr-only">Next session</dt>
          <dd className={next ? '' : 'text-ink-muted'}>{next ? `Next: ${next}` : 'No session scheduled'}</dd>
        </div>
        {last && (
          <div className="flex items-center gap-2 text-ink-muted">
            <HistoryIcon className="size-4 shrink-0" />
            <dt className="sr-only">Last session</dt>
            <dd>Last: {last}</dd>
          </div>
        )}
      </dl>
    </Link>
  )
}