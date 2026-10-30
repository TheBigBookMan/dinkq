import { mockAuth } from "../../mock/auth";

export const useSession = () => {
  return mockAuth;
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