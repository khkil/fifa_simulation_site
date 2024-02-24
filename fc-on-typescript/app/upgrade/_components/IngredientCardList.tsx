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
      {Array.from({ length: UPGRADE_INGREDIENT_MAX_COUNT }, (_, index) => index).map((v) => (
        <div key={v} className={"border border-gray-300 rounded-lg w-full text-center h-48"}>
          {ingredientPlayers[v] ? <IngredientCard ingredientPlayer={ingredientPlayers[v]} /> : null}
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
}: {
  ingredientPlayer: IngredientPlayer;
}) => {
  return (
    <div className={"space-y-1 py-3"}>
      <div className={"flex justify-center pb-1"}>
        <PlayerImage spId={spId} height={80} width={80} />
      </div>
      <div className={"flex justify-center"}>
        <PlayerPositions positions={[positions.filter((v) => v.overall === overall)[0]]} />
      </div>
      <div className={"flex justify-center items-center"}>
        <PlayerWithSeason playerName={playerName} seasonImgUrl={imageUrl} />
        <img className={"h-5 ml-0.5"} src={`/images/strong/${grade}.png`} />
      </div>
      <div className={"flex justify-center items-center"}>
        <p className={"text-bp font-semibold"}>{convertPriceFormat(price)} BP</p>
      </div>
    </div>
  );
};
