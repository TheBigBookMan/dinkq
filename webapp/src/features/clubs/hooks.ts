import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getClub, getMyClubs } from "../../mock/club";
import { getClubPlayer } from "../../mock/clubPlayer";
import { getRoster } from "../../mock/roster";
import { api } from "../../lib/api";
import type { Club, NewClubInput } from "./type";

// Fresh for a minute, so child pages reuse the data a parent already loaded
const STALE = 60_000;

export const useMyClubs = () =>
  useQuery({
    queryKey: ["clubs"],
    queryFn: () => api<Club[]>('/clubs'),
    staleTime: STALE,
  });

export const useClub = (clubId: string | undefined) =>
  useQuery({
    queryKey: ["club", clubId],
    queryFn: () => api<Club>(`/clubs/${clubId}`),
    enabled: !!clubId, // useParams gives string | undefined
    staleTime: STALE,
  });

export const useCreateClub = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: NewClubInput) =>
      api<Club>('/clubs', { method: 'POST', body: JSON.stringify(input) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clubs'] }),
  })
}

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