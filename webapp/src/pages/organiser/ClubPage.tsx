import { Link, useParams } from 'react-router-dom'
import { BarChart3Icon, ChevronRightIcon, InfoIcon, SettingsIcon, UsersIcon } from 'lucide-react'

const ClubPage = () => {
  const {clubId} = useParams();

  const sections = [
  {
    to: `/organiser/club/${clubId}/details`,
    title: 'Details',
    description: 'Location, courts, schedule and contact info.',
    icon: InfoIcon,
    iconClass: 'text-neon-amber',
  },
  {
    to: `/organiser/club/${clubId}/roster`,
    title: 'Roster',
    description: 'Players in your club. Add, search and edit ratings.',
    icon: UsersIcon,
    iconClass: 'text-neon-cyan',
    hint: '42 players', // later: from useMyClub()
  },
  {
    to: `/organiser/club/${clubId}/statistics`,
    title: 'Statistics',
    description: 'Attendance, sessions per month and top players.',
    icon: BarChart3Icon,
    iconClass: 'text-neon-magenta',
  },
  {
    to: `/organiser/club/${clubId}/settings`,
    title: 'Settings',
    description: 'Club info, co-organisers and danger zone.',
    icon: SettingsIcon,
    iconClass: 'text-neon-violet-soft',
  },
]
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sections.map(({ to, title, description, icon: Icon, iconClass, hint }) => (
        <Link
          key={to}
          to={to}
          className="neon-card group flex flex-col gap-4 p-5 outline-none transition hover:border-neon-violet/60 hover:shadow-neon-sm focus-visible:ring-2 focus-visible:ring-neon-violet/60 sm:p-6"
        >
          <div className="flex items-center justify-between">
            <span className="grid size-11 place-items-center rounded-xl border border-line bg-raised/70">
              <Icon className={`size-5 ${iconClass}`} />
            </span>
            <ChevronRightIcon className="size-5 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-neon-violet-soft" />
          </div>

          <div className="space-y-1">
            <h2 className="font-display text-lg font-semibold">{title}</h2>
            <p className="text-sm text-ink-muted">{description}</p>
          </div>

          {hint && <p className="mt-auto text-xs font-medium text-neon-cyan">{hint}</p>}
        </Link>
      ))}
    </div>
  )
}

export default ClubPage