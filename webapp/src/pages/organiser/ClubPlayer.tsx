import { Link, useParams } from 'react-router-dom'
import { PlayerHeader } from '../../features/clubs/organiser/player/PlayerHeader'
import { PlayerStats } from '../../features/clubs/organiser/player/PlayerStats'
import { RecentMatches } from '../../features/clubs/organiser/player/RecentMatches'
import RecentSessions from '../../features/clubs/organiser/player/RecentSessions'
import { useClubPlayer } from '../../features/clubs/hooks'
import { PlayerActions } from '../../features/clubs/organiser/player/PlayerActions'

const ClubPlayer = () => {
  const { clubId, playerId } = useParams()
  const player = useClubPlayer(clubId, playerId)
  // const { data: player, isPending, isError } = useClubPlayer(clubId, playerId)

  // if (isPending) return <p className="text-sm text-ink-muted">Loading player…</p>
  // if (isError || !player)
  //   return (
  //     <div className="space-y-3">
  //       <p className="text-sm">Player not found in this club.</p>
  //       <Link to=".." className="text-sm text-neon-cyan underline-offset-4 hover:underline">
  //         Back to roster
  //       </Link>
  //     </div>
  //   )

  return (
    <div className="space-y-4">
      <PlayerHeader player={player} />
      <PlayerStats player={player} />

      <div className="grid gap-4 lg:grid-cols-2">
        <RecentMatches matches={player.recentMatches} />
        <RecentSessions sessions={player.recentSessions} />
      </div>

      <PlayerActions
        isGuest={player.isGuest}
        notes={player.notes}
        onSaveNotes={(notes) => console.log('notes', notes)} // DUMMY: later, a mutation
        onMakeMember={() => console.log('make member')}
        onRemove={() => console.log('remove')} // later: confirm dialog first
      />
    </div>
  )
}

export default ClubPlayer