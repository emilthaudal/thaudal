import router from "next/router";
import React from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { refreshToken } from "../api/api";
import Header from "../components/header";
import IsItFriday from "../components/isitfriday";
import { authAtom } from "../state/auth";

export default function Home(): JSX.Element {
  const [auth, setAuth] = useRecoilState(authAtom);

  React.useEffect(() => {
    if (auth.user != "") return;
    else if (auth.refresh) {
      refreshToken()
        .then((response) => {
          setAuth({
            token: response.jwtToken,
            user: response.username,
            refresh: response.refreshToken,
          });
        })
        .catch(() => {});
    }
  }, [auth.refresh, auth.user, setAuth]);
  return (
    <div>
      <main className="flex items-center p-6 container mx-auto flex-col">
        <h1 className="font-thin font-sans text-3xl">thaudal.com</h1>
        <IsItFriday />
      </main>
    </div>
  );
}
