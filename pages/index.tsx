import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>thaudal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav className="flex items-center p-6 container mx-auto">
          <ul className="mx-2">Home</ul>
          <ul className="mx-2">Pilou</ul>
        </nav>
      </header>

      <main className="flex items-center p-6 container mx-auto">
        <h1 className="font-thin font-sans text-3xl">thaudal</h1>
        <p></p>
      </main>
    </div>
  );
};

export default Home;
