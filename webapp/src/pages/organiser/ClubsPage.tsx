import { useNavigate } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'
import { NoClubCard } from '../../features/organiser/components/NoClubCard'
import { ClubTile } from './ClubTile'
import { useMyClubs } from '../../features/clubs/hooks'

const ClubsPage = () => {
  const navigate = useNavigate()
  const clubs = useMyClubs()
  const createClub = () => navigate('/organiser/club/new') // or open a dialog

  return (
    <div className="space-y-6 px-2">
      <header>
        <h1 className="font-display text-2xl font-bold">Clubs</h1>
        <p className="text-sm text-ink-muted">Pick a club to manage its roster, sessions and settings.</p>
      </header>

      {clubs.length === 0 ? (
        <NoClubCard onCreateClub={createClub} />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <li key={club.clubId} className="flex">
              <div className="flex w-full flex-col [&>a]:flex-1">
                <ClubTile club={club} />
              </div>
            </li>
          ))}

          <li className="flex">
            <button
              type="button"
              onClick={createClub}
              className="flex min-h-40 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line text-ink-muted outline-none transition hover:border-neon-violet/60 hover:text-neon-violet-soft focus-visible:ring-2 focus-visible:ring-neon-violet/60"
            >
              <PlusIcon className="size-6" />
              <span className="text-sm font-medium">Create new club</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default ClubsPage