import type { LiveSessionStats, SessionSummary } from "./types";
import { mockLiveStats, mockSessions } from "../../mock/sessions";

export const useLiveSession = (): LiveSessionStats => {
  // temp dummy data 
  return mockLiveStats;
}

export const useSessions = (): SessionSummary[] => {
  // temp dummy data
  return mockSessions;
}