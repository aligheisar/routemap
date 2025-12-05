import { Auth } from "../types/nav-item";

const authCheck = (auth: Auth | undefined, loggedIn: boolean): boolean => {
  if (!auth) return true;
  if (auth === "authenticated") return loggedIn;
  return !loggedIn;
};

export { authCheck };
