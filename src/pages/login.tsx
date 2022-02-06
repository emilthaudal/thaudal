import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { refreshToken } from "../api/api";
import CreateUserComponent from "../components/createusercomponent";
import LoginComponent from "../components/logincomponent";
import { authAtom } from "../state/auth";

function Login(): JSX.Element {
  const [signIn, setSignIn] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authAtom);

  React.useEffect(() => {
    if (auth.user) router.push("/");
    else if (auth.refresh) {
      setIsLoading(true);
      refreshToken()
        .then((response) => {
          setAuth({
            token: response.jwtToken,
            user: response.username,
            refresh: response.refreshToken,
          });
          setIsLoading(false);
          router.push("/");
        })
        .catch(() => {});
    }
  }, [auth.refresh, auth.user, router, setAuth]);

  if (loading) {
    return <div>Loading</div>;
  }

  if (signIn) {
    return (
      <div className="container">
        <CreateUserComponent />
        <button onClick={() => setSignIn(false)}>
          Already have a user? Login
        </button>
      </div>
    );
  }
  return (
    <div className="container">
      <LoginComponent></LoginComponent>
      <button onClick={() => setSignIn(true)}>Dont have a user? Sign-up</button>
    </div>
  );
}
export default Login;
