import Head from "next/head";
import * as React from "react";
import Header from "./Header";

function Intro() {
  return (
    <div>
      <Header />
      <main className="flex items-center p-6 container mx-auto flex-col">
        <h1 className="font-thin font-sans text-3xl">thaudal.com</h1>
        {/* <p className="p-6">
          <li>Next.JS</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>.NET 6</li>
          <li>Elastic</li>
        </p> */}
      </main>
    </div>
  );
}
export default Intro;
