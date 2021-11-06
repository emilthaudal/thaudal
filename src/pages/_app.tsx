import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 mx-auto px-4">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
