import { IngredientPlayer } from "@/app/_types/player";
import PlayerWithSeason from "@/app/_components/player/PlayerWithSeason";
import { UPGRADE_INGREDIENT_MAX_COUNT } from "@/app/_constants/upgrade";
import PlayerImage from "@/app/_components/player/PlayerImage";
import PlayerPositions from "@/app/_components/player/PlayerPositions";
import { convertPriceFormat } from "@/app/_utils";

interface Props {
  ingredientPlayers: IngredientPlayer[];
  setIngredientPlayers: (players: IngredientPlayer[]) => void;
}
export default function IngredientCardList({ ingredientPlayers, setIngredientPlayers }: Props) {
  return (
    <div className={"mt-5 flex"}>
      {Array.from({ length: UPGRADE_INGREDIENT_MAX_COUNT }, (_, index) => index).map((index) => (
        <div key={index} className={"border border-gray-300 rounded-lg w-full text-center min-h-[14rem]"}>
          {ingredientPlayers[index] ? (
            <IngredientCard
              ingredientPlayer={ingredientPlayers[index]}
              ingredientPlayers={ingredientPlayers}
              setIngredientPlayers={setIngredientPlayers}
              index={index}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

const IngredientCard = ({
  ingredientPlayer: {
    spId,
    playerName,
    grade,
    overall,
    price,
    positions,
    season: { imageUrl },
  },
  ingredientPlayers,
  setIngredientPlayers,
  index,
}: {
  ingredientPlayer: IngredientPlayer;
  ingredientPlayers: IngredientPlayer[];
  setIngredientPlayers: (players: IngredientPlayer[]) => void;
  index: number;
}) => {
  const removeIngredient = () => {
    setIngredientPlayers(ingredientPlayers.filter((_, x) => x !== index));
  };

  return (
    <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex justify-end pt-2">
        <button
          className="inline-block text-gray-500 hover:bg-gray-300 rounded-lg text-sm p-1.5 bg-gray-200"
          onClick={removeIngredient}
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center pb-3">
        <PlayerImage spId={spId} height={80} width={80} />
        <div className={"flex justify-center items-center mt-2"}>
          <PlayerWithSeason playerName={playerName} seasonImgUrl={imageUrl} />
          <img className={"h-5 ml-0.5"} src={`/images/strong/${grade}.png`} />
        </div>
        <div className={"flex justify-center"}>
          <PlayerPositions positions={[positions.filter((v) => v.overall === overall)[0]]} />
        </div>
        <div className={"flex justify-center items-center"}>
          <p className={"text-bp text-sm font-semibold"}>{convertPriceFormat(price)} BP</p>
        </div>
      </div>
    </div>
  );
};
