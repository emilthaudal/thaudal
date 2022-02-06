import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import LoginComponent from "../components/logincomponent";
import { authAtom } from "../state/auth";

function Login(): JSX.Element {
  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    // redirect to home if already logged in
    if (auth) history.pushState(null, "/");
  }, []);

  return (
    <div>
      <LoginComponent></LoginComponent>
    </div>
  );
}
export default Login;
