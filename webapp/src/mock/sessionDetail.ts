import type { SessionDetail, SessionMatch, SessionPlayer } from "../features/sessions/types";
import { mockLiveStats, mockSessions } from "./sessions";

const NAMES = ["Somchai K.", "Ploy", "Nattaya", "Kittipong", "Mali", "Ben", "Tom", "Aom", "Arthit", "Dao", "Chai", "Pim"];

export const getSession = async (sessionId: string): Promise<SessionDetail> => {
  const base = [mockLiveStats, ...mockSessions].find((s) => s.sessionId === sessionId);
  if (!base) throw new Error("Session not found");

  const started = base.status === "LIVE" || base.status === "COMPLETED";

  // DUMMY: at most 12 players in the list, whatever the headline count says
  const players: SessionPlayer[] = Array.from({ length: Math.min(base.playerCount, 12) }, (_, i) => ({
    playerId: `p_${i + 1}`,
    name: NAMES[i],
    avatarUrl: "",
    rating: Math.round((2.5 + (i % 8) * 0.3) * 10) / 10,
    isGuest: i % 6 === 5,
    rsvp: i % 5 === 4 ? "maybe" : "going",
    checkedIn: started && i % 7 !== 6,
    paid: started && i < base.paidCount,
  }));

  const n = (i: number) => NAMES[i];
  const matches: SessionMatch[] = !started
    ? []
    : base.status === "LIVE"
      ? [
          { matchId: "m1", court: 1, team1: [n(0), n(1)], team2: [n(2), n(3)], status: "playing" },
          { matchId: "m2", court: 2, team1: [n(4), n(5)], team2: [n(6), n(7)], status: "playing" },
        ]
      : [
          { matchId: "m1", court: 1, team1: [n(0), n(1)], team2: [n(2), n(3)], score: [11, 7], status: "done" },
          { matchId: "m2", court: 2, team1: [n(4), n(5)], team2: [n(6), n(7)], score: [9, 11], status: "done" },
          { matchId: "m3", court: 1, team1: [n(0), n(2)], team2: [n(1), n(3)], score: [11, 4], status: "done" },
          { matchId: "m4", court: 2, team1: [n(4), n(6)], team2: [n(5), n(7)], score: [11, 9], status: "done" },
        ];

  return {
    ...base,
    courtCount: "courtCount" in base ? base.courtCount : 4,
    pricePerPlayer: 150,
    notes: base.status === "SCHEDULED" ? "Bring water. Parking is behind the hall." : undefined,
    players,
    matches,
  };
};