

// A local time on a past day, e.g. at(2, 18, 30) = two days ago, 6:30pm
const at = (daysAgo: number, hour: number, minute = 0) => {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

export const mockSessions: SessionSummary[] = [
  { id: 's_001', startedAt: at(1, 18), playerCount: 18, paidCount: 18 }, // all paid
  { id: 's_002', startedAt: at(3, 19), playerCount: 22, paidCount: 19 }, // 3 unpaid
  { id: 's_003', startedAt: at(5, 17, 30), playerCount: 16, paidCount: 16 },
  { id: 's_004', startedAt: at(8, 18), playerCount: 1, paidCount: 1 },    // singular "1 player"
  { id: 's_005', startedAt: at(10, 19), playerCount: 0, paidCount: 0 },   // no badge
  { id: 's_006', startedAt: at(12, 18, 30), playerCount: 24, paidCount: 20 },
  { id: 's_007', startedAt: at(15, 18), playerCount: 14, paidCount: 14 },
  { id: 's_008', startedAt: at(19, 19), playerCount: 20, paidCount: 15 }, // 5 unpaid
]

// For testing the header's LIVE pill: started 47 minutes ago
export const mockLiveSession = {
  id: 's_live',
  startedAt: Date.now() - 47 * 60 * 1000,
}

import type { LiveSessionStats, SessionSummary } from "../features/sessions/types"
export const mockLiveStats: LiveSessionStats = {
  id: 's_live',
  startedAt: Date.now() - 47 * 60 * 1000, // running 47 min
  endsAt: Date.now() + 73 * 60 * 1000, // 73 min left (a 2-hour session)
  expectedCount: 18,
  arrivedCount: 14,
  gamesInPlay: 3,
  courtCount: 4,
  paidCount: 12,
}