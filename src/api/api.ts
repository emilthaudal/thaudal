// api.js
import merge from "lodash/merge";
import Cookies from "js-cookie";
import { configureRefreshFetch, fetchJSON } from "refresh-fetch";

const COOKIE_NAME = "MYAPP";

const baseUrl = process.env.NEXT_PUBLIC_API;

const retrieveToken = () => Cookies.get(COOKIE_NAME);
const saveToken = (token: string | object) => Cookies.set(COOKIE_NAME, token);
const clearToken = () => Cookies.remove(COOKIE_NAME);

function fetchJSONWithToken(url: string, options = {}) {
  const token = retrieveToken();

  let optionsWithToken = options;
  if (token != null) {
    optionsWithToken = merge({}, options, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return fetchJSON(url, optionsWithToken);
}

async function login(email: string, password: string) {
  try {
    const response: any = await fetchJSON(baseUrl + "/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    saveToken(response.body.token);
  } catch (error) {}
}

async function logout() {
  await fetchJSONWithToken(baseUrl + "/api/auth/logout", {
    method: "POST",
  });
  clearToken();
}

const getLists = () => {};

const shouldRefreshToken = (error: {
  response: { status: number };
  body: { message: string };
}) =>
  error.response.status === 401 && error.body.message === "Token has expired";

const refreshToken = async () => {
  try {
    const response: any = await fetchJSONWithToken(
      baseUrl + "/api/user/refresh-token",
      {
        method: "POST",
      }
    );
    saveToken(response.body.token);
  } catch (error) {
    // Clear token and continue with the Promise catch chain
    clearToken();
    throw error;
  }
};

const fetch = configureRefreshFetch({
  fetch: fetchJSONWithToken,
  shouldRefreshToken,
  refreshToken,
});

export { fetch, login, logout, getLists };
