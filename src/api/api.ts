// api.js
import merge from "lodash/merge";
import Cookies from "js-cookie";
import { configureRefreshFetch, fetchJSON } from "refresh-fetch";
import TodoList from "../model/todolist";
import router from "next/router";
import AuthResponse from "../model/authresponse";

const COOKIE_NAME = "thaudal-token";
const REFRESH_COOKIE_NAME = "refreshToken";

const baseUrl = process.env.NEXT_PUBLIC_API;

const retrieveToken = () => Cookies.get(COOKIE_NAME);
const retrieveRefreshToken = () => Cookies.get(REFRESH_COOKIE_NAME);
const saveRefreshToken = (token: string | object) =>
  Cookies.set(REFRESH_COOKIE_NAME, token);
const saveToken = (token: string | object) => Cookies.set(COOKIE_NAME, token);
const clearToken = () => Cookies.remove(COOKIE_NAME);
const clearRefreshToken = () => Cookies.remove(REFRESH_COOKIE_NAME);

function fetchJSONWithToken(url: string, options = {}) {
  const token = retrieveToken();

  let optionsWithToken = options;
  if (token != null) {
    optionsWithToken = merge({}, options, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    const rToken = retrieveRefreshToken();
    if (rToken) {
      refreshToken();
    } else {
      router.push("/login");
      return;
    }
  }

  return fetchJSON(url, optionsWithToken);
}

async function login(email: string, password: string) {
  try {
    const response: any = await fetchJSON(baseUrl + "/api/Users/authenticate", {
      method: "POST",
      body: JSON.stringify({
        Username: email,
        Password: password,
      }),
    });
    var responseBody: AuthResponse = response.body;
    if (!responseBody) {
      throw new Error("Invalid response from server");
    }
    saveToken(responseBody.jwtToken);
    saveRefreshToken(responseBody.refreshToken);
    return responseBody;
  } catch (error) {}
}

async function createUser(email: string, password: string, name: string) {
  try {
    const response: any = await fetchJSON(baseUrl + "/api/Users/create", {
      method: "POST",
      body: JSON.stringify({
        Username: email,
        Password: password,
        Name: name,
      }),
    });
    saveToken(response.body.jwtToken);
    saveRefreshToken(response.body.refreshToken);
    return response.body;
  } catch (error) {}
}

async function logout() {
  await fetchJSONWithToken(baseUrl + "/api/users/revoke-token", {
    method: "POST",
    body: {
      token: retrieveRefreshToken(),
    },
  });
  clearToken();
  clearRefreshToken();
}

function getLists(): TodoList[] {
  let todoLists: TodoList[] = [];

  try {
    const response: any = fetchJSONWithToken(
      baseUrl + "/api/TodoList/GetLists",
      {
        method: "GET",
      }
    );
    response.map((list: TodoList) => {
      todoLists.push(list);
    });
    return todoLists;
  } catch (error) {
    return todoLists;
  }
}

const shouldRefreshToken = (error: {
  response: { status: number };
  body: { message: string };
}) => {
  const refresh = retrieveRefreshToken();
  return error.response.status === 401 && refresh != undefined;
};

const refreshToken = async () => {
  try {
    const rToken = retrieveRefreshToken();
    const body = JSON.stringify({ refreshToken: rToken });
    console.log(body);
    const response: any = await fetchJSONWithToken(
      baseUrl + "/api/users/refresh-token",
      {
        method: "POST",
        body: body,
      }
    );
    saveToken(response.body.jwtToken);
    saveRefreshToken(response.body.refreshToken);
    return response.body;
  } catch (error) {
    // Clear token and continue with the Promise catch chain
    clearToken();
    clearRefreshToken();
    throw error;
  }
};

const fetch = configureRefreshFetch({
  fetch: fetchJSONWithToken,
  shouldRefreshToken,
  refreshToken,
});

export {
  fetch,
  login,
  logout,
  getLists,
  createUser,
  retrieveRefreshToken,
  retrieveToken,
  refreshToken,
};
