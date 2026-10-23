export type LiveSessionStats = {
  id: string
  startedAt: number // epoch ms
  endsAt: number // epoch ms, the planned end
  arrivedCount: number // checked in
  expectedCount?: number // said they would come (optional until you have RSVPs)
  gamesInPlay: number
  courtCount: number
  paidCount: number // out of arrivedCount
}

export type SessionSummary = {
  id: string
  startedAt: string // ISO string
  playerCount: number
  paidCount: number
}