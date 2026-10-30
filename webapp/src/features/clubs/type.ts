export type NewClubInput = { 
  clubName: string; 
  clubIcon?: string; 
  description?: string; 
  contactEmail?: string; 
  contactPhone?: string 
}

export type Club = {
  clubId: string
  clubName: string
  clubIcon: string
  description?: string
  playerCount: number
  address?: string
  city?: string
  country?: string
  latitude?: number
  longitude?: number
  courtCount?: number
  newThisMonth?: number
  guestsToReview?: number;
  nextSessionAt?: string // ISO
  lastSessionAt?: string // ISO
  isLive?: boolean
  contactEmail: string
  contactPhone: string
  schedule?: string
  createdAt: string
}

export type RosterPlayer = {
  playerId: string
  name: string
  avatarUrl: string // '' = none, show the initial
  rating: number
  isGuest: boolean
  joinedAt: string // ISO
  lastSeenAt?: string // ISO, missing = never played
}

export type ClubSettingsValues = {
  autoCreateNextSession: boolean
  autoInvite: boolean
  autoInviteWho: 'last-session' | 'active' | 'everyone'
  defaultCourts: number
  sessionHours: number
  pricePerSession: number // THB per player, 0 = free
  selfCheckIn: boolean
  allowGuests: boolean
  trackPayments: boolean
  avoidRepeatPartners: boolean
  matchOnLevel: boolean
  showRatingsToPlayers: boolean
  approveNewMembers: boolean
}

export type PlayerMatch = {
  matchId: string
  playedAt: string // ISO
  partner: string
  opponents: [string, string]
  score: [number, number] // [this player's team, the other team]
  won: boolean
}

export type PlayerSession = {
  sessionId: string
  startedAt: string // ISO
  paid: boolean
}

// everything here is for this club only
export type ClubPlayerProfile = RosterPlayer & {
  rank: number
  rankOf: number
  sessionsAttended: number
  gamesPlayed: number
  wins: number
  recentMatches: PlayerMatch[]
  recentSessions: PlayerSession[]
  notes: string // private organiser notes
}

export type ClubSummary = { clubId: string; clubName: string; playerCount: number }