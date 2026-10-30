import type { LiveSessionStats, SessionSummary } from '../features/sessions/types' // adjust the path

const beans = { clubId: 'c_001', clubName: 'The Beans' }
const pickMe = { clubId: 'c_002', clubName: 'Pick Me' }

// daysAgo > 0 is the past, < 0 is the future
function at(daysAgo: number, hour: number, minute = 0) {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  d.setHours(hour, minute, 0, 0)
  return d
}

function session(
  sessionId: string,
  club: { clubId: string; clubName: string },
  start: Date,
  playerCount: number,
  paidCount: number,
  status: SessionSummary['status'] = 'COMPLETED',
  hours = 3,
): SessionSummary {
  const end = new Date(start.getTime() + hours * 3_600_000)
  return {
    sessionId,
    ...club,
    date: start,
    startedAt: start.toISOString(),
    endsAt: end.toISOString(),
    playerCount,
    paidCount,
    status,
  }
}

export const mockSessions: SessionSummary[] = [
  session('s_009', beans, at(-5, 18), 0, 0, 'SCHEDULED'),
  session('s_010', pickMe, at(-2, 19), 0, 0, 'SCHEDULED'),
  session('s_001', beans, at(1, 18), 18, 18), // all paid
  session('s_002', beans, at(3, 19), 22, 19), // 3 unpaid
  session('s_003', beans, at(5, 17, 30), 16, 16),
  session('s_004', pickMe, at(8, 18), 1, 1, 'POSTPONED'), // singular "1 player"
  session('s_005', pickMe, at(10, 19), 0, 0, 'CANCELED'), // no badge
  session('s_006', pickMe, at(12, 18, 30), 24, 20),
  session('s_007', pickMe, at(15, 18), 14, 14),
  session('s_008', beans, at(19, 19), 20, 15), // 5 unpaid
]

// started 45 minutes ago, runs 2.5 hours in total
export const mockLiveStats: LiveSessionStats = {
  ...session('s_live', beans, new Date(Date.now() - 45 * 60_000), 20, 12, 'LIVE', 2.5),
  liveSessionId: 'ls_001',
  arrivedCount: 17,
  expectedCount: 22,
  gamesInPlay: 4,
  courtCount: 4,
}