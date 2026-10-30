import { mockAccountData } from "../../mock/account";
import type { AccountType } from "./types";

export const useAccountData = (): AccountType => {
  return mockAccountData;
}