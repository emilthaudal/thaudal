import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Header from "../components/header";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <div className="bg-gray-200 bg-gradient-to-br from-gray-100 via-emerald-600 to-emerald-700 mx-auto px-4 font-sans h-screen font-thin">
        <Header></Header>
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}

export default MyApp;
