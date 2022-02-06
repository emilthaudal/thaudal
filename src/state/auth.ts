import { atom } from "recoil";
import { retrieveRefreshToken, retrieveToken } from "../api/api";

const authAtom = atom({
  key: "auth",
  // get initial state from local storage to enable user to stay logged in
  default: {
    token: retrieveToken(),
    user: undefined,
    refresh: retrieveRefreshToken(),
  },
});

export { authAtom };
