import { IngredientPlayer, UpgradeTargetPlayer } from "@/app/_types/player";

interface Props {
  targetPlayer: UpgradeTargetPlayer;
  ingredientPlayers: IngredientPlayer[];
  successPercent: string;
}

export function UpgradePercentBar({ successPercent }: Props) {
  return (
    <div className="w-full bg-gray-200 rounded-full mt-5 h-6 text-center">
      <div
        className="bg-sky-300 p-0.5 leading-none rounded-full h-full flex items-center justify-center"
        style={{ width: `${successPercent}%` }}
      ></div>
      <p className={"relative top-[-25px] font-semibold text-lg"}>{successPercent}%</p>
    </div>
  );
}
