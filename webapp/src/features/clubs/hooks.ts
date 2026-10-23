import { mockMyClubData as clubData } from "../../mock/club";
import type { Club } from "./type";

export const useMyClubs = (): Club => {
  // Temp for dummy
  return clubData;
}