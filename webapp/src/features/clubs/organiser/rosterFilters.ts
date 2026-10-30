import type { RosterPlayer } from '../type'

export type SortKey = 'name' | 'rating-desc' | 'rating-asc' | 'newest' | 'oldest' | 'active'

export type Filters = {
  q: string
  type: 'all' | 'members' | 'guests'
  rating: 'all' | 'beginner' | 'intermediate' | 'advanced'
  tenure: 'all' | 'new' | 'mid' | 'long'
  activity: 'all' | 'active' | 'inactive'
  sort: SortKey
}

export const defaultFilters: Filters = {
  q: '', type: 'all', rating: 'all', tenure: 'all', activity: 'all', sort: 'name',
}

export const OPTIONS = {
  type: [
    { value: 'all', label: 'Everyone' },
    { value: 'members', label: 'Members' },
    { value: 'guests', label: 'Guests' },
  ],
  rating: [
    { value: 'all', label: 'Any' },
    { value: 'beginner', label: 'Beginner · under 3.0' },
    { value: 'intermediate', label: 'Intermediate · 3.0–3.9' },
    { value: 'advanced', label: 'Advanced · 4.0+' },
  ],
  tenure: [
    { value: 'all', label: 'Any' },
    { value: 'new', label: 'New · under 1 month' },
    { value: 'mid', label: '1–6 months' },
    { value: 'long', label: '6+ months' },
  ],
  activity: [
    { value: 'all', label: 'Any' },
    { value: 'active', label: 'Active · last 30 days' },
    { value: 'inactive', label: 'Inactive' },
  ],
} as const

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'name', label: 'Name A–Z' },
  { value: 'rating-desc', label: 'Rating, high to low' },
  { value: 'rating-asc', label: 'Rating, low to high' },
  { value: 'newest', label: 'Newest members' },
  { value: 'oldest', label: 'Longest members' },
  { value: 'active', label: 'Recently active' },
]

const DAY = 86_400_000
const ts = (iso?: string) => (iso ? Date.parse(iso) : 0)

const comparators: Record<SortKey, (a: RosterPlayer, b: RosterPlayer) => number> = {
  name: (a, b) => a.name.localeCompare(b.name),
  'rating-desc': (a, b) => b.rating - a.rating,
  'rating-asc': (a, b) => a.rating - b.rating,
  newest: (a, b) => ts(b.joinedAt) - ts(a.joinedAt),
  oldest: (a, b) => ts(a.joinedAt) - ts(b.joinedAt),
  active: (a, b) => ts(b.lastSeenAt) - ts(a.lastSeenAt),
}

export function filterRoster(players: RosterPlayer[], f: Filters): RosterPlayer[] {
  const now = Date.now()
  const q = f.q.trim().toLowerCase()

  const out = players.filter((p) => {
    if (q && !p.name.toLowerCase().includes(q)) return false

    if (f.type === 'members' && p.isGuest) return false
    if (f.type === 'guests' && !p.isGuest) return false

    if (f.rating === 'beginner' && p.rating >= 3) return false
    if (f.rating === 'intermediate' && (p.rating < 3 || p.rating >= 4)) return false
    if (f.rating === 'advanced' && p.rating < 4) return false

    const joinedDays = (now - Date.parse(p.joinedAt)) / DAY
    if (f.tenure === 'new' && joinedDays >= 30) return false
    if (f.tenure === 'mid' && (joinedDays < 30 || joinedDays >= 180)) return false
    if (f.tenure === 'long' && joinedDays < 180) return false

    const active = p.lastSeenAt !== undefined && now - Date.parse(p.lastSeenAt) < 30 * DAY
    if (f.activity === 'active' && !active) return false
    if (f.activity === 'inactive' && active) return false

    return true
  })

  return out.sort(comparators[f.sort])
}

// how many of the filter pills are set (search and sort don't count)
export function activeFilterCount(f: Filters) {
  return [f.type, f.rating, f.tenure, f.activity].filter((v) => v !== 'all').length
}