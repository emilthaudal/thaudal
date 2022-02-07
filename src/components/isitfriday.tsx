import React, { useState } from "react";
import { useEffect } from "react";
import BigButton from "./bigButton";

function IsItFriday() {
  const [showFriday, setShowFriday] = React.useState(false);
  const [isItFriday, setIsItFriday] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = useState("");

  function clickButton() {
    setLoading(true);
    fetch(process.env.NEXT_PUBLIC_API + "/api/DayOfWeek/IsItFriday")
      .then((res) => res.json())
      .then((data) => {
        setIsItFriday(data);
        setLoading(false);
        setShowFriday(true);
      })
      .catch((err) => {
        setLoading(false);
        setError("Could not fetch data");
        setShowFriday(false);
      });
  }

  if (error != "") {
    return <div>error</div>;
  }

  return (
    <div>
      <div className="p-8">
        <BigButton
          onClick={() => clickButton()}
          text={"Er det fredag?"}
          type="button"
        ></BigButton>
      </div>

      {showFriday ? <p>{isItFriday ? "Ja" : "Nej"}</p> : <p></p>}
    </div>
  );
}
export default IsItFriday;
