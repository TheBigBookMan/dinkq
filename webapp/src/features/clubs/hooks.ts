import { useQuery } from "@tanstack/react-query";
import { getClub, getMyClubs } from "../../mock/club";
import { getClubPlayer } from "../../mock/clubPlayer";
import { getRoster } from "../../mock/roster";

// Fresh for a minute, so child pages reuse the data a parent already loaded
const STALE = 60_000;

export const useMyClubs = () =>
  useQuery({
    queryKey: ["clubs"],
    queryFn: () => getMyClubs(), // later: the real API function
    staleTime: STALE,
  });

export const useClub = (clubId: string | undefined) =>
  useQuery({
    queryKey: ["club", clubId],
    queryFn: () => getClub(clubId!),
    enabled: !!clubId, // useParams gives string | undefined
    staleTime: STALE,
  });

export const useClubRoster = (clubId: string | undefined) =>
  useQuery({
    queryKey: ["club", clubId, "roster"],
    queryFn: () => getRoster(clubId!),
    enabled: !!clubId,
    staleTime: STALE,
  });

export const useClubPlayer = (clubId: string | undefined, playerId: string | undefined) =>
  useQuery({
    queryKey: ["club", clubId, "player", playerId],
    queryFn: () => getClubPlayer(clubId!, playerId!),
    enabled: !!clubId && !!playerId,
    staleTime: STALE,
  });