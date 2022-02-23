import { ButtonHTMLAttributes } from "react";

function BigButton(props: BigButtonProps): JSX.Element {
  return (
    <button
      type={props.type}
      onClick={() => props.onClick()}
      className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-emerald-500 duration-300 py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
    >
      {props.text}
    </button>
  );
}
export default BigButton;
interface BigButtonProps {
  onClick: () => void;
  text: string;
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}
