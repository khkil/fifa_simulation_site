import { IngredientPlayer, UpgradeTargetPlayer } from "@/app/_types/player";

interface Props {
  targetPlayer: UpgradeTargetPlayer;
  ingredientPlayers: IngredientPlayer[];
  successPercent: string;
}

export function UpgradePercentBar({ successPercent }: Props) {
  return (
    <div className="w-full bg-gray-200 rounded-full mt-5 h-6 flex items-center">
      <div
        className="bg-primary text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-full flex items-center justify-center"
        style={{ width: `${successPercent}%` }}
      >
        <p className={"font-bold text-lg"}>{successPercent}%</p>
      </div>
    </div>
  );
}
