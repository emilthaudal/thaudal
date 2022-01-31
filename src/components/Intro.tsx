import Head from "next/head";
import * as React from "react";
import { useEffect } from "react";
// @ts-ignore
import Header from "./header";

function Intro() {
  const [showFriday, setShowFriday] = React.useState(false);
  const [isItFriday, setIsItFriday] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  useEffect(() => {}, []);

  function clickButton() {
    setLoading(true);
    fetch(process.env.API + "/api/DayOfWeek/IsItFriday")
      .then((res) => res.json())
      .then((data) => {
        setIsItFriday(data);
        setLoading(false);
      });
    setShowFriday(true);
  }

  return (
    <div>
      <Header />
      <main className="flex items-center p-6 container mx-auto flex-col">
        <h1 className="font-thin font-sans text-3xl">thaudal.com</h1>
        <div className="relative rounded-xl overflow-auto p-8">
          <button
            className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-emerald-500 duration-300 py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
            onClick={clickButton}
          >
            Er det fredag?
          </button>
        </div>

        {showFriday ? <p>{isItFriday ? "Ja" : "Nej"}</p> : <p></p>}
      </main>
    </div>
  );
}
export default Intro;
