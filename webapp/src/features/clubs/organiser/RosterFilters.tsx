import { useId, useState } from 'react'
import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { activeFilterCount, defaultFilters, OPTIONS, SORT_OPTIONS, type Filters, type SortKey } from './rosterFilters'

function PillGroup<T extends string>({
  label, value, options, onChange,
}: {
  label: string
  value: T
  options: readonly { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-xs uppercase tracking-wider text-ink-muted">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = o.value === value
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o.value)}
              className={`rounded-full border px-3 py-1.5 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-neon-violet/60 ${
                on
                  ? 'border-neon-violet bg-neon-violet/15 text-neon-violet-soft shadow-neon-sm'
                  : 'border-line bg-raised/50 text-ink-muted hover:border-neon-violet/50 hover:text-foreground'
              }`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

type Props = { filters: Filters; onChange: (filters: Filters) => void }

export function RosterFilters({ filters, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const sortId = useId()
  const count = activeFilterCount(filters)
  const dirty = count > 0 || filters.q !== '' || filters.sort !== defaultFilters.sort

  const set =
    <K extends keyof Filters>(key: K) =>
    (value: Filters[K]) =>
      onChange({ ...filters, [key]: value })

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
          <Input
            type="search"
            aria-label="Search players"
            placeholder="Search players"
            value={filters.q}
            onChange={(e) => set('q')(e.target.value)}
            className="h-11 bg-raised/70 pl-9"
          />
        </div>

        <Button
          type="button"
          variant="outline"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="h-11 shrink-0 border-line bg-raised/70"
        >
          <SlidersHorizontalIcon />
          Filters
          {count > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-neon-violet text-xs text-primary-foreground">
              {count}
            </span>
          )}
        </Button>
      </div>

      {open && (
        <div id={panelId} className="neon-card space-y-5 p-4 sm:p-5">
          <PillGroup label="Type" value={filters.type} options={OPTIONS.type} onChange={set('type')} />
          <PillGroup label="Rating" value={filters.rating} options={OPTIONS.rating} onChange={set('rating')} />
          <PillGroup label="Time at club" value={filters.tenure} options={OPTIONS.tenure} onChange={set('tenure')} />
          <PillGroup label="Activity" value={filters.activity} options={OPTIONS.activity} onChange={set('activity')} />

          <div className="space-y-2">
            <label htmlFor={sortId} className="text-xs uppercase tracking-wider text-ink-muted">
              Sort by
            </label>
            <select
              id={sortId}
              value={filters.sort}
              onChange={(e) => set('sort')(e.target.value as SortKey)}
              className="h-11 w-full rounded-md border border-line bg-raised/70 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <Button type="button" variant="ghost" size="sm" disabled={!dirty} onClick={() => onChange(defaultFilters)}>
              Reset all
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}