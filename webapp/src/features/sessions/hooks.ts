import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getLiveSession, getSessions } from "./api";
import type { SessionsQuery } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSession } from "./api";
import { getSession } from "../../mock/sessionDetail";

export const useSession = (sessionId: string | undefined) =>
  useQuery({
    queryKey: ["sessions", "detail", sessionId],
    queryFn: () => getSession(sessionId!),
    enabled: !!sessionId,
    // a live session refreshes every 10 seconds; any other status stays put
    refetchInterval: (query) => (query.state.data?.status === "LIVE" ? 10_000 : false),
  });

export const useCreateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSession, // (input: NewSessionInput) => Promise<SessionSummary>
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sessions"] }), // refreshes the live card and every list
  });
};

// null data means nothing is live
export const useLiveSession = () =>
  useQuery({
    queryKey: ["sessions", "live"],
    queryFn: () => getLiveSession(),
    refetchInterval: 30_000, // MVP: poll; later, socket events update this cache entry instead
  });

export const useSessions = (query: SessionsQuery) =>
  useInfiniteQuery({
    queryKey: ["sessions", query],
    queryFn: ({ pageParam }) => getSessions(query, pageParam),
    initialPageParam: 0,
    getNextPageParam: (last) => last.nextPage ?? undefined,
    staleTime: 30_000,
  });

// the club filter lives in the URL (?club=c_001), so the layout and both tabs share it
export function useClubFilter() {
  const [params, setParams] = useSearchParams();
  const clubId = params.get("club") ?? undefined;

  const setClubId = (id?: string) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (id) next.set("club", id);
        else next.delete("club");
        return next;
      },
      { replace: true },
    );

  return [clubId, setClubId] as const;
}