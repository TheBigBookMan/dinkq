import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserPlusIcon } from 'lucide-react'
import { Button } from '../../../components/ui/button.tsx'
import { AddPlayerDialog } from '../../players/components/AddPlayerDialog.tsx'
import { useClubRoster } from '../hooks'
import { PlayerTile } from './PlayerTile'
import { RosterFilters } from './RosterFilters.tsx'
import { activeFilterCount, defaultFilters, filterRoster, type Filters } from './rosterFilters.ts'

const ClubRoster = () => {
  const { clubId } = useParams()
  const players = useClubRoster(clubId)
  // const { data: players, isPending, isError, refetch } = useClubRoster(clubId)
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [addOpen, setAddOpen] = useState(false)

  const visible = useMemo(() => (players ? filterRoster(players, filters) : []), [players, filters])

  // TEMP DUMMY
  // if (isPending) return <p className="text-sm text-ink-muted">Loading roster…</p>
  // if (isError)
  //   return (
  //     <div className="space-y-3">
  //       <p className="text-sm">Couldn't load the roster.</p>
  //       <Button variant="outline" size="sm" onClick={() => refetch()}>
  //         Try again
  //       </Button>
  //     </div>
  //   )

  const filtered = filters.q.trim() !== '' || activeFilterCount(filters) > 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold">Roster</h2>
          <p className="text-sm text-ink-muted">
            {players.length} {players.length === 1 ? 'player' : 'players'}
          </p>
        </div>
        <Button
          onClick={() => setAddOpen(true)}
          className="h-10 rounded-lg bg-linear-to-r from-neon-violet to-neon-magenta px-4 font-semibold text-primary-foreground shadow-neon-sm hover:shadow-neon"
        >
          <UserPlusIcon />
          Add player
        </Button>
      </div>

      {players.length > 0 && <RosterFilters filters={filters} onChange={setFilters} />}

      {filtered && players.length > 0 && (
        <p className="text-sm text-ink-muted" aria-live="polite">
          Showing {visible.length} of {players.length}
        </p>
      )}

      {players.length === 0 ? (
        <div className="neon-card space-y-3 p-6 text-center">
          <p className="font-display text-lg font-semibold">No players yet</p>
          <p className="text-sm text-ink-muted">Add your first player to build your roster.</p>
        </div>
      ) : visible.length === 0 ? (
        <div className="neon-card space-y-3 p-6 text-center">
          <p className="font-display text-lg font-semibold">No players match</p>
          <Button variant="outline" size="sm" onClick={() => setFilters(defaultFilters)}>
            Clear filters
          </Button>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((player) => (
            <PlayerTile key={player.playerId} player={player} />
          ))}
        </ul>
      )}

      <AddPlayerDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onSubmit={async (player) => {
          console.log(player) // DUMMY: later, useAddPlayer mutation, then invalidate ['club', clubId, 'roster']
        }}
      />
    </div>
  )
}

export default ClubRoster