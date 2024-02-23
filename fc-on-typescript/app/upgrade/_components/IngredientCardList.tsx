import { IngredientPlayer } from "@/app/_types/player";
import PlayerWithSeason from "@/app/_components/player/PlayerWithSeason";
import { UPGRADE_INGREDIENT_MAX_COUNT } from "@/app/_constants/upgrade";

interface Props {
  ingredientPlayers: IngredientPlayer[];
  setIngredientPlayers: (players: IngredientPlayer[]) => void;
}
export default function IngredientCardList({ ingredientPlayers, setIngredientPlayers }: Props) {
  return (
    <div className={"mt-5 flex"}>
      {Array.from({ length: UPGRADE_INGREDIENT_MAX_COUNT }, (_, index) => index).map((v) => (
        <div key={v} className={"border border-gray-300 rounded-lg w-full h-32 text-center"}>
          {ingredientPlayers[v] ? <IngredientCard ingredientPlayer={ingredientPlayers[v]} /> : null}
        </div>
      ))}
    </div>
  );
}

const IngredientCard = ({
  ingredientPlayer: {
    playerName,
    season: { imageUrl },
  },
}: {
  ingredientPlayer: IngredientPlayer;
}) => {
  return (
    <div>
      <PlayerWithSeason playerName={playerName} seasonImgUrl={imageUrl} />
    </div>
  );
};
