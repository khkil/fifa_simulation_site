import { PlayerByOverall } from "@/app/_types/player";
import { upgradeCardMaxCount } from "@/app/_utils";
import PlayerWithSeason from "@/app/_components/player/PlayerWithSeason";

interface Props {
  ingredientPlayers: PlayerByOverall[];
  setIngredientPlayers: (players: PlayerByOverall[]) => void;
}
export default function IngredientCardList({ ingredientPlayers, setIngredientPlayers }: Props) {
  return (
    <div className={"mt-5 flex"}>
      {Array.from({ length: upgradeCardMaxCount }, (_, index) => index + 1).map((v) => (
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
  ingredientPlayer: PlayerByOverall;
}) => {
  return (
    <div>
      <PlayerWithSeason playerName={playerName} seasonImgUrl={imageUrl} />
    </div>
  );
};
