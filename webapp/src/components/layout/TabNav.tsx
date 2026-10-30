import { NavLink, useLocation } from 'react-router-dom'

type Tab = { label: string; to: string; end?: boolean }

type Props = {
  tabs: Tab[]
  label: string // aria-label for the nav
  keepSearch?: boolean // carry the current ?query over when switching tabs
}

export function TabNav({ tabs, label, keepSearch = false }: Props) {
  const { search } = useLocation()

  return (
    <nav
      aria-label={label}
      className="-mx-4 overflow-x-auto border-b border-line px-4 [scrollbar-width:none] sm:mx-0 sm:px-0"
    >
      <ul className="flex min-w-max gap-1">
        {tabs.map((tab) => (
          <li key={tab.to}>
            <NavLink
              to={{ pathname: tab.to, search: keepSearch ? search : '' }}
              end={tab.end}
              className={({ isActive }) =>
                isActive
                  ? 'relative -mb-px block border-b-2 border-neon-violet px-4 py-3 text-sm font-semibold text-neon-violet-soft text-glow'
                  : 'relative -mb-px block border-b-2 border-transparent px-4 py-3 text-sm font-medium text-ink-muted transition hover:text-foreground'
              }
            >
              {tab.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}