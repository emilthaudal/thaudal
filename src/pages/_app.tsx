import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Header from "../components/header";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <div className="">
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}

export default MyApp;
