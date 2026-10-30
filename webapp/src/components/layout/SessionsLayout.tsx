import { Link, Outlet } from 'react-router-dom'
import { CalendarPlusIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { TabNav } from './TabNav'
import { useMyClubs } from '../../features/clubs/hooks'
import LiveSessionCard from '../../features/organiser/components/LiveSessionCard'
import { Pill } from '../../features/sessions/components/Pill'
import { useClubFilter, useLiveSession } from '../../features/sessions/hooks'

const tabs = [
  { label: 'Upcoming', to: '/organiser/sessions/upcoming' },
  { label: 'Recent', to: '/organiser/sessions/recent' },
]

const SessionsLayout = () => {
  const [clubId, setClubId] = useClubFilter()
  const { data: clubs = [] } = useMyClubs()
  const {data: live} = useLiveSession() // LiveSessionStats | null

  const showLive = live && (!clubId || live.clubId === clubId)

  return (
    <div className="space-y-4 px-4">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Sessions</h1>
          <p className="text-sm text-ink-muted">What's on, and what you've run.</p>
        </div>
        <Button
          asChild
          className="h-10 shrink-0 rounded-lg bg-linear-to-r from-neon-violet to-neon-magenta px-4 font-semibold text-primary-foreground shadow-neon-sm hover:shadow-neon"
        >
          <Link to="/organiser/sessions/new">
            <CalendarPlusIcon />
            Schedule
          </Link>
        </Button>
      </header>

      {clubs.length > 1 && (
        <div role="group" aria-label="Filter by club" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          <Pill active={!clubId} onClick={() => setClubId(undefined)}>
            All clubs
          </Pill>
          {clubs.map((c) => (
            <Pill key={c.clubId} active={clubId === c.clubId} onClick={() => setClubId(c.clubId)}>
              {c.clubName}
            </Pill>
          ))}
        </div>
      )}

      {showLive && <LiveSessionCard session={live} />}

      <TabNav tabs={tabs} label="Session views" keepSearch />

      <Outlet />
    </div>
  )
}

export default SessionsLayout