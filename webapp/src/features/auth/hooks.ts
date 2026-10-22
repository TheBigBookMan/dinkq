import type { UserData, UserType } from "./types";

export const useSession = () => {
  // temp mock
  const isPending: boolean = false;
  const isError: boolean = false;
  const userType: UserType = "GUEST";
  const userData: UserData = {
    name: "Ben",
    imageURL: "",
    rating: 3.8
  };

  return {
    isPending,
    isError,
    userType,
    userData: {}
  }
}