import { useSearchParams } from 'react-router-dom'
import { Button } from '../../../../components/ui/button'
import { useMyClubs } from '../../hooks'
import { Pill } from '../../../sessions/components/Pill'
import { SessionList } from '../../../sessions/components/SessionList'
import { useClubFilter, useSessions } from '../../../sessions/hooks'

const RecentSessions = () => {
  const [clubId] = useClubFilter()
  const { data: clubs = [] } = useMyClubs()
  const [params, setParams] = useSearchParams()

  const unpaidOnly = params.get('unpaid') === '1'
  const raw = params.get('status')
  const status = raw === 'COMPLETED' || raw === 'CANCELED' ? raw : undefined

  function setParam(key: string, value?: string) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true },
    )
  }

  const q = useSessions({ scope: 'recent', clubId, unpaidOnly, status })
  const filtered = unpaidOnly || status !== undefined

  const filters = (
    <div role="group" aria-label="Filter sessions" className="flex flex-wrap gap-2">
      <Pill active={!status} onClick={() => setParam('status')}>All</Pill>
      <Pill active={status === 'COMPLETED'} onClick={() => setParam('status', 'COMPLETED')}>Completed</Pill>
      <Pill active={status === 'CANCELED'} onClick={() => setParam('status', 'CANCELED')}>Canceled</Pill>
      <Pill active={unpaidOnly} onClick={() => setParam('unpaid', unpaidOnly ? undefined : '1')}>Unpaid only</Pill>
    </div>
  )

  let body: React.ReactNode
  if (q.isPending) {
    body = <p className="text-sm text-ink-muted">Loading sessions…</p>
  } else if (q.isError) {
    body = (
      <div className="space-y-3">
        <p className="text-sm">Couldn't load sessions.</p>
        <Button variant="outline" size="sm" onClick={() => q.refetch()}>Try again</Button>
      </div>
    )
  } else {
    const items = q.data.pages.flatMap((p) => p.items)
    body =
      items.length === 0 ? (
        <div className="neon-card space-y-3 p-6 text-center">
          <p className="font-display text-lg font-semibold">
            {filtered ? 'No sessions match' : 'No sessions yet'}
          </p>
          {filtered && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setParams((prev) => { const n = new URLSearchParams(prev); n.delete('status'); n.delete('unpaid'); return n }, { replace: true })}
            >
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <SessionList
          items={items}
          showClub={clubs.length > 1 && !clubId}
          hasMore={q.hasNextPage}
          loadingMore={q.isFetchingNextPage}
          onLoadMore={() => q.fetchNextPage()}
        />
      )
  }

  return (
    <div className="space-y-4">
      {filters}
      {body}
    </div>
  )
}

export default RecentSessions