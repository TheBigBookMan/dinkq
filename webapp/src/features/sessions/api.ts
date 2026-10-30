import { mockLiveStats, mockSessions } from "../../mock/sessions";
import type { LiveSessionStats, SessionsPage, SessionsQuery } from "./types";
import { mockMyClubsData } from "../../mock/club";
import type { NewSessionInput, SessionSummary } from "./types";

export const createSession = async (input: NewSessionInput): Promise<SessionSummary> => {
  const club = mockMyClubsData.find((c) => c.clubId === input.clubId);
  if (!club) throw new Error("Club not found");

  // DUMMY: later, POST to your API. Note that courtCount, price and notes aren't kept by SessionSummary
  const created: SessionSummary = {
    sessionId: `s_${Date.now()}`,
    clubId: club.clubId,
    clubName: club.clubName,
    date: new Date(input.startsAt),
    startedAt: input.startsAt,
    endsAt: input.endsAt,
    playerCount: 0,
    paidCount: 0,
    status: "SCHEDULED",
  };
  mockSessions.unshift(created);
  return created;
};

export const getLiveSession = async (): Promise<LiveSessionStats | null> => {
  return null;
  // return mockLiveStats;
};

const PAGE_SIZE = 5 // small on purpose, so you can see "Load more" with the mock data
const t = (iso: string) => Date.parse(iso)

// DUMMY: later, one API call that does this filtering in SQL
export const getSessions = async (q: SessionsQuery, page: number): Promise<SessionsPage> => {
  const upcoming = q.scope === 'upcoming'

  let list = mockSessions.filter((s) =>
    upcoming
      ? s.status === 'SCHEDULED' || s.status === 'POSTPONED'
      : s.status === 'COMPLETED' || s.status === 'CANCELED',
  )
  if (q.clubId) list = list.filter((s) => s.clubId === q.clubId)
  if (q.unpaidOnly) list = list.filter((s) => s.paidCount < s.playerCount)
  if (q.status) list = list.filter((s) => s.status === q.status)

  list.sort((a, b) => (upcoming ? t(a.startedAt) - t(b.startedAt) : t(b.startedAt) - t(a.startedAt)))

  const start = page * PAGE_SIZE
  return {
    items: list.slice(start, start + PAGE_SIZE),
    nextPage: start + PAGE_SIZE < list.length ? page + 1 : null,
  }
}
