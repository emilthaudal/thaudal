import * as React from "react";
import Header from "../components/Header";

function Pilou() {
  return (
    <div>
      <Header></Header>
      <main className="flex items-center p-6 container mx-auto flex-col">
        <h1 className="font-thin font-sans text-3xl">Pilou</h1>
        <p className="font-sans">Pilou er en sød hund</p>
      </main>
    </div>
  );
}
export default Pilou;
