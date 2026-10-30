import type { RosterPlayer } from '../features/clubs/type'

const ago = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString()

const p = (
  n: number, name: string, rating: number, joinedDaysAgo: number,
  seenDaysAgo: number | null, isGuest = false,
): RosterPlayer => ({
  playerId: `p_${n}`, name, avatarUrl: '', rating, isGuest,
  joinedAt: ago(joinedDaysAgo),
  lastSeenAt: seenDaysAgo === null ? undefined : ago(seenDaysAgo),
})

const roster: RosterPlayer[] = [
  p(1, 'Somchai K.', 4.3, 400, 2),
  p(2, 'Ploy', 3.4, 220, 5),
  p(3, 'Nattaya', 2.6, 40, 3),
  p(4, 'Kittipong', 3.9, 300, 45),
  p(5, 'Mali', 2.9, 12, 1),
  p(6, 'Ben', 3.2, 150, 8),
  p(7, 'Tom', 4.1, 500, 20),
  p(8, 'Aom', 2.4, 5, 5),
  p(9, 'Arthit', 3.6, 90, 70),
  p(10, 'Dao', 3.0, 200, 10),
  p(11, 'Sarah (guest)', 3.3, 3, 3, true),
  p(12, 'Mike (guest)', 4.4, 15, 15, true),
  p(13, 'Pim', 2.8, 60, null),
  p(14, 'Chai', 4.6, 600, 1),
]

export const getRoster = (clubId: string): RosterPlayer[] => {
  void clubId
  return roster // DUMMY: later, call your API
}