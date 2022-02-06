import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { logout } from "../api/api";
import { authAtom } from "../state/auth";

function Header(): JSX.Element {
  const [auth, setAuth] = useRecoilState(authAtom);
  React.useEffect(() => {}, [auth]);

  function onLogOut() {
    logout().then(() => {
      setAuth({
        token: undefined,
        user: undefined,
        refresh: undefined,
      });
    });
  }

  return (
    <div>
      <Head>
        <title>thaudal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex flex-row">
        <div className="">
          <ul className="flex items-center p-6 container mx-auto">
            <li className="mx-2 hover:text-emerald-500">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            {/* <li className="mx-2 hover:text-emerald-500">
              <Link href="/emil">
                <a>Emil</a>
              </Link>
            </li> */}
            <li className="mx-2 hover:text-emerald-500">
              <Link href="/todolist/todolist">
                <a>TodoLists</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex items-center p-6 container mx-auto">
            {!auth.user ? (
              <li className="mx-2 hover:text-emerald-500">
                <Link href="/login">Login</Link>
              </li>
            ) : (
              <div className="flex flex-row">
                <li>
                  <p>{auth.user}</p>
                </li>
                <li className="mx-2 hover:text-emerald-500">
                  <button onSubmit={() => onLogOut}>Logout</button>
                </li>
              </div>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
}
export default Header;
function setAuth(arg0: { token: any; user: any; refresh: any }) {
  throw new Error("Function not implemented.");
}
