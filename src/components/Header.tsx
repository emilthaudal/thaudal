import Head from "next/head";
import Link from "next/link";
import * as React from "react";

function Header() {
  return (
    <div>
      <Head>
        <title>thaudal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <ul className="flex items-center p-6 container mx-auto">
          <li className="mx-2">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="mx-2">
            <Link href="/Emil">
              <a>Emil</a>
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
}
export default Header;
