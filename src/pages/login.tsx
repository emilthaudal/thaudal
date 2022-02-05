import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom } from "../state/auth";

function Login(): JSX.Element {
  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);

  useEffect(() => {
    // redirect to home if already logged in
    if (auth) history.pushState(null, "/");
  }, [auth]);

  return <div></div>;
}
export default Login;
