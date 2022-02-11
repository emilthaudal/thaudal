import { useState } from "react";
import CardContent from "./cardcontent";

function Card(props: any) {
  return (
    <div className="h-250 bg-gray-200 max-w-sm rounded-lg shadow-lg px-6 py-4 border border-gray-200">
      {props.children}
    </div>
  );
}
export default Card;
