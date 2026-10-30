import { Button } from '../../../components/ui/button'
import type { SessionSummary } from '../types'
import { SessionTile } from './SessionTile'

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

type Props = {
  items: SessionSummary[]
  showClub: boolean
  hasMore: boolean
  loadingMore: boolean
  onLoadMore: () => void
}

export function SessionList({ items, showClub, hasMore, loadingMore, onLoadMore }: Props) {
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

      {hasMore && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={onLoadMore} disabled={loadingMore}>
            {loadingMore ? 'Loading…' : 'Load more'}
          </Button>
        </div>
      )}
    </div>
  )
}