import Image from "next/image";
import * as React from "react";
import Card from "../components/card";
import cake from "../../public/birthday.png";
import bob from "../../public/bob.jpeg";
function Birthday() {
  const [flipped, setFlipped] = React.useState(false);
  return (
    <div className="flex flex-col p-20 justify-center items-center pt-3">
      {!flipped ? (
        <Card>
          <div className="flex content-center items-center justify-center">
            <Image
              width={100}
              height={100}
              quality={100}
              src={cake}
              alt="cake"
            />
          </div>
          <h1 className=" text-xl mb-2">Tillykke med fødselsdagen, mulle!</h1>
          <div className="text-gray-700 text-base space-y-1">
            <p>
              Jeg glæder mig til at fejre dig med snurrer, dyner, hygge og bob
              (vend kortet).
            </p>
            <p>
              Du er min bedste ven, og jeg er glad for at du har lyst til at
              bruge dagen med mig.
            </p>
            <p>
              Det føles som om der er gået en evighed siden din sidste
              fødselsdag, og på samme tid som om det var lige for nylig.
            </p>
            <p>Jeg ved at dit 26. år bliver bedre og nemmere end det 25.</p>
            <p>Tillyke min mulle</p>
            <p>Jeg elsker dig</p>
            <p>Emil</p>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="object-cover">
            <Image src={bob} alt="Image of bob" />
          </div>
        </Card>
      )}
      <div className="p-10">
        <button
          onClick={() => setFlipped(!flipped)}
          type="button"
          className="text-gray-200 border border-gray-200 hover:bg-gray-200 hover:text-gray-700 focus:ring-4 focus:ring-emerald-100 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
export default Birthday;
