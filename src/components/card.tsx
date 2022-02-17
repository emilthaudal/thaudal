import { useState } from "react";
import CardContent from "./cardcontent";

function Card(props: any) {
  return (
    <div className="flex flex-col bg-gray-200 max-w-sm rounded-lg shadow-lg px-6 py-4 border border-gray-200">
      {props.children}
    </div>
  );
}
export default Card;
