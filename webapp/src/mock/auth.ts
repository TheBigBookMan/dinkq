import type { UserType, UserData } from "../features/auth/types";

export const mockAuth = {
    // temp mock
  isPending: false,
  isError: false,
  userType: "GUEST",
  userData: {
    name: "Ben",
    imageURL: "",
  }
}