import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <div className="bg-emerald-700 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 mx-auto px-4 font-sans h-screen font-thin">
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}

export default MyApp;
