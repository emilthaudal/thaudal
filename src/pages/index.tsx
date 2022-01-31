import React from "react";
import { useEffect } from "react";
import Header from "../components/header";
import IsItFriday from "../components/isitfriday";

export default function Home(): JSX.Element {
  return (
    <div>
      <main className="flex items-center p-6 container mx-auto flex-col">
        <h1 className="font-thin font-sans text-3xl">thaudal.com</h1>
        <IsItFriday />
      </main>
    </div>
  );
}
