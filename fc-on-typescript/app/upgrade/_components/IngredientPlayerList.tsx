import { useState } from "react";

interface Props {
  playerOverall: number;
}

export default function IngredientPlayerList({ playerOverall }: Props) {
  const [ingredientOvr, setIngredientOvr] = useState(playerOverall - 1);

  return (
    <div>
      <div className="custom-number-input h-10 w-24">
        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
          <button
            data-action="decrement"
            className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none border-0 border-r border-gray-200"
            onClick={() => {}}
          >
            <span className="m-auto text-2xl font-thin">−</span>
          </button>
          <div className="w-full bg-gray-300 font-semibold text-md flex justify-center items-center">0</div>
          <button
            data-action="increment"
            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer border-l border-gray-200"
            onClick={() => {}}
          >
            <span className="m-auto text-2xl font-thin">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}
