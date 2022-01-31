import React from "react";
import { useEffect } from "react";

function IsItFriday() {
  const [showFriday, setShowFriday] = React.useState(false);
  const [isItFriday, setIsItFriday] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  useEffect(() => {}, []);

  function clickButton() {
    setLoading(true);
    fetch(process.env.NEXT_PUBLIC_API + "/api/DayOfWeek/IsItFriday")
      .then((res) => res.json())
      .then((data) => {
        setIsItFriday(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setIsItFriday(false);
      });
    setShowFriday(true);
  }
  return (
    <div>
      <div className="relative rounded-xl overflow-auto p-8">
        <button
          className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-emerald-500 duration-300 py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
          onClick={clickButton}
        >
          Er det fredag?
        </button>
      </div>

      {showFriday ? <p>{isItFriday ? "Ja" : "Nej"}</p> : <p></p>}
    </div>
  );
}
export default IsItFriday;
