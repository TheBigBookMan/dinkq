import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { useMyClubs } from '../../clubs/hooks'
import { SessionTile } from '../../sessions/components/SessionTile'
import { useClubFilter, useSessions } from '../../sessions/hooks'
import type { SessionSummary } from '../../sessions/types'

const monthFmt = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' })

// the list is already sorted, so a new heading starts whenever the month changes
function groupByMonth(items: SessionSummary[]) {
  const groups: { label: string; items: SessionSummary[] }[] = []
  for (const s of items) {
    const label = monthFmt.format(new Date(s.startedAt))
    const last = groups[groups.length - 1]
    if (last?.label === label) last.items.push(s)
    else groups.push({ label, items: [s] })
  }
  return groups
}

const UpcomingSessions = () => {
  const [clubId] = useClubFilter()
  const { data: clubs = [] } = useMyClubs()
  const q = useSessions({ scope: 'upcoming', clubId })

  if (q.isPending) return <p className="text-sm text-ink-muted">Loading sessions…</p>

  if (q.isError)
    return (
      <div className="space-y-3">
        <p className="text-sm">Couldn't load sessions.</p>
        <Button variant="outline" size="sm" onClick={() => q.refetch()}>
          Try again
        </Button>
      </div>
    )

  const items = q.data.pages.flatMap((p) => p.items)

  if (items.length === 0)
    return (
      <div className="neon-card space-y-3 p-6 text-center">
        <p className="font-display text-lg font-semibold">No upcoming sessions</p>
        <p className="text-sm text-ink-muted">Schedule one so players can sign up.</p>
        <Button asChild variant="outline" size="sm">
          <Link to="/organiser/sessions/new">Schedule a session</Link>
        </Button>
      </div>
    )

  const showClub = clubs.length > 1 && !clubId

  return (
    <div className="space-y-6">
      {groupByMonth(items).map((group) => (
        <section key={group.label} aria-label={group.label} className="space-y-2">
          <h2 className="text-xs uppercase tracking-wider text-ink-muted">{group.label}</h2>
          <ul className="space-y-2">
            {group.items.map((s) => (
              <li key={s.sessionId}>
                <SessionTile session={s} showClub={showClub} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      {q.hasNextPage && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => q.fetchNextPage()} disabled={q.isFetchingNextPage}>
            {q.isFetchingNextPage ? 'Loading…' : 'Load more'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default UpcomingSessions