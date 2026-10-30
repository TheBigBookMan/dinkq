import type { UserData } from "../auth/types";

type AccountSignIn = {
  line: boolean;
  google: boolean;
  emailCode: boolean;
}

// UserData has email, name and email
export type AccountType = UserData & AccountSignIn;