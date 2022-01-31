import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Header from "../components/header";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-50 mx-auto px-4 font-sans h-screen font-thin">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
