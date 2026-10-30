import type { ClubPlayerProfile, PlayerMatch, PlayerSession } from '../features/clubs/type'
import { getRoster } from './roster'

const ago = (days: number, hour = 18) => {
  const d = new Date()
  d.setDate(d.getDate() - days)
  d.setHours(hour, 0, 0, 0)
  return d.toISOString()
}

const recentMatches: PlayerMatch[] = [
  { matchId: 'm1', playedAt: ago(2), partner: 'Ploy', opponents: ['Tom', 'Mali'], score: [11, 7], won: true },
  { matchId: 'm2', playedAt: ago(2), partner: 'Ploy', opponents: ['Chai', 'Dao'], score: [9, 11], won: false },
  { matchId: 'm3', playedAt: ago(2), partner: 'Aom', opponents: ['Ben', 'Pim'], score: [11, 4], won: true },
  { matchId: 'm4', playedAt: ago(9), partner: 'Tom', opponents: ['Mali', 'Dao'], score: [11, 9], won: true },
  { matchId: 'm5', playedAt: ago(9), partner: 'Ben', opponents: ['Chai', 'Aom'], score: [8, 11], won: false },
  { matchId: 'm6', playedAt: ago(16), partner: 'Mali', opponents: ['Tom', 'Ploy'], score: [11, 6], won: true },
]

const recentSessions: PlayerSession[] = [
  { sessionId: 's_001', startedAt: ago(2), paid: true },
  { sessionId: 's_002', startedAt: ago(9), paid: false },
  { sessionId: 's_003', startedAt: ago(16), paid: true },
  { sessionId: 's_008', startedAt: ago(30), paid: true },
]

export const getClubPlayer = (clubId: string, playerId: string): ClubPlayerProfile => {
  const roster = getRoster(clubId)
  const player = roster.find((p) => p.playerId === playerId)
  if (!player) throw new Error('Player not found')

  const rank = [...roster].sort((a, b) => b.rating - a.rating).findIndex((p) => p.playerId === playerId) + 1

  // DUMMY: every player gets the same stats and matches; later, one API call
  return {
    ...player,
    rank,
    rankOf: roster.length,
    sessionsAttended: 18,
    gamesPlayed: 64,
    wins: 37,
    recentMatches,
    recentSessions,
    notes: '',
  }
}