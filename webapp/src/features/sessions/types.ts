export type SessionStatus = "SCHEDULED" | "LIVE" | "COMPLETED" | "POSTPONED" | "CANCELED";

export type SessionSummary = {
  sessionId: string;
  clubId: string;
  clubName: string;
  date: Date;
  startedAt: string;
  endsAt: string;
  playerCount: number;
  paidCount: number;
  status: SessionStatus;
}

export type LiveSessionStats = SessionSummary & {
  liveSessionId: string;
  arrivedCount: number;
  expectedCount?: number;
  gamesInPlay: number;
  courtCount: number;
}

export type SessionsQuery = {
  scope: 'upcoming' | 'recent'
  clubId?: string
  unpaidOnly?: boolean
  status?: 'COMPLETED' | 'CANCELED' // only used by the recent scope
}

export type NewSessionInput = {
  clubId: string
  startsAt: string // ISO
  endsAt: string // ISO
  courtCount: number
  pricePerPlayer: number // THB
  notes?: string
}

export type SessionsPage = { items: SessionSummary[]; nextPage: number | null }

export type RsvpStatus = "going" | "maybe" | "declined";

export type SessionPlayer = {
  playerId: string;
  name: string;
  avatarUrl: string; // '' = none
  rating: number;
  isGuest: boolean;
  rsvp: RsvpStatus;
  checkedIn: boolean;
  paid: boolean;
};

export type SessionMatch = {
  matchId: string;
  court: number;
  team1: [string, string];
  team2: [string, string];
  score?: [number, number]; // [team1, team2]
  status: "playing" | "done";
};

export type SessionDetail = SessionSummary & {
  courtCount: number;
  pricePerPlayer: number; // THB
  notes?: string;
  players: SessionPlayer[];
  matches: SessionMatch[]; // only live and completed sessions have these
};