import type { UserData, UserType } from "./types";

export const useSession = () => {
  // temp mock
  const isPending: boolean = false;
  const isError: boolean = false;
  const userType: UserType = "GUEST";
  const userData: UserData = {
    name: "Ben",
    imageURL: "",
  };

  return {
    isPending,
    isError,
    userType,
    userData
  }
}

export const useAuth = () => {

  // dummy logout function
  function logout() {
    console.log('logout');
  }

  return {
    logout
  }
}