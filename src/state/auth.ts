import Cookies from "js-cookie";
import { atom } from "recoil";

const COOKIE_NAME = "thaudal-token";
const retrieveToken = () => Cookies.get(COOKIE_NAME);

const authAtom = atom({
  key: "auth",
  // get initial state from local storage to enable user to stay logged in
  default: { token: retrieveToken() },
});

export { authAtom };
