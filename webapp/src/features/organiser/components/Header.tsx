import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LogOutIcon, PlayIcon } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { LiveIndicator } from '../../../components/shared/LiveIndicator'
import { useMyClubs } from '../../clubs/hooks'
import { useLogout } from '../../auth/hooks'

const START_TO = '/organiser/sessions/new';

const cta =
  'bg-linear-to-r from-neon-violet to-neon-magenta font-semibold text-primary-foreground shadow-neon-sm hover:shadow-neon'

const bar = 'absolute left-2.5 h-0.5 w-5 rounded-full bg-current transition-all duration-300 motion-reduce:transition-none'

interface OrganiserHeaderProps {
  live?: { startedAt: string; to: string } | null;
}

export function Header({ live }: OrganiserHeaderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const logout = useLogout();
  const { pathname } = useLocation();
  const clubData = useMyClubs();

  const NAV = [
    { to: '/organiser', label: 'Home', end: true },
    { to: `/organiser/clubs`, label: 'Clubs' },
    { to: '/organiser/sessions', label: 'Sessions' },
    { to: '/organiser/account', label: 'Account' }
  ]

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const item = (i: number) => ({
    className: `transition-all duration-300 motion-reduce:transition-none ${
      open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
    }`,
    style: { transitionDelay: open ? `${100 + i * 60}ms` : '0ms' },
  })

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        data-open={open}
        className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm transition-opacity duration-300 data-[open=false]:pointer-events-none data-[open=false]:opacity-0 md:hidden"
      />

      <header className="sticky top-0 z-40 border-b border-neon-violet/20 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link to="/organiser" className="font-display text-xl font-bold tracking-tight">
            Dink<span className="text-neon-magenta text-glow">Q</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {NAV.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'bg-neon-violet/15 text-neon-violet text-glow' : 'text-ink-muted hover:text-foreground'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {live ? (
            <LiveIndicator startedAt={live.startedAt} to={live.to} className="h-9" />
          ) : (
            <Button asChild className={`h-9 rounded-lg px-4 ${cta}`}>
              <Link to={START_TO}>
                <PlayIcon />
                Start session
              </Link>
            </Button>
          )}

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`relative size-10 rounded-lg outline-none transition-colors hover:bg-raised focus-visible:ring-2 focus-visible:ring-ring/60 md:hidden ${
              open ? 'text-neon-violet' : 'text-foreground'
            }`}
          >
            <span className={`${bar} ${open ? 'top-[19px] rotate-45' : 'top-[13px]'}`} />
            <span className={`${bar} top-[19px] ${open ? 'scale-x-0 opacity-0' : ''}`} />
            <span className={`${bar} ${open ? 'top-[19px] -rotate-45' : 'top-[25px]'}`} />
          </button>
        </div>

        <div
          id="mobile-nav"
          data-open={open}
          className="invisible absolute inset-x-0 top-full grid grid-rows-[0fr] bg-background/95 backdrop-blur-xl transition-[grid-template-rows,visibility] duration-300 motion-reduce:transition-none data-[open=true]:visible data-[open=true]:grid-rows-[1fr] md:hidden"
        >
          <div className="overflow-hidden">
            <nav
              aria-label="Main"
              className="space-y-1 border-b border-neon-violet/20 p-4 shadow-[0_20px_40px_-20px_rgb(177_77_255/0.35)]"
            >
              {NAV.map(({ to, label, end }, i) => (
                <div key={to} {...item(i)}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-lg font-medium transition-colors ${
                        isActive ? 'bg-neon-violet/15 text-neon-violet text-glow' : 'text-foreground/80 hover:bg-raised'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </div>
              ))}

              <div {...item(4)} className={`${item(4).className} border-t border-line pt-2`}>
                <Button disabled={logout.isPending} variant="ghost" onClick={() => logout.mutate()} className="h-12 w-full justify-start gap-3 rounded-xl px-4 text-ink-muted">
                  <LogOutIcon />
                  {logout.isPending ? "Logging out…" : "Log out"}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}