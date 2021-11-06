import Head from "next/head";
import * as React from "react";
import Header from "./Header";

function Intro() {
  return (
    <div>
      <Header />
      <main className="flex items-center p-6 container mx-auto flex-col">
        <h1 className="font-thin font-sans text-3xl">thaudal</h1>
        <p className="">This is the page about thaudal</p>
      </main>
    </div>
  );
}
export default Intro;
