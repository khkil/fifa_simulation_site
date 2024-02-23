import { IngredientPlayer, UpgradeTargetPlayer } from "@/app/_types/player";
import { useMemo } from "react";
import { UPGRADE_GAUGES } from "@/app/_constants/upgrade";

interface Props {
  targetPlayer: UpgradeTargetPlayer;
  ingredientPlayers: IngredientPlayer[];
}

export function UpgradePercentBar({ targetPlayer, ingredientPlayers }: Props) {
  const successPercent = useMemo<number>(() => {
    let value = 0;
    ingredientPlayers.forEach((ingredientPlayer: IngredientPlayer) => {
      const upgradeGrade = [targetPlayer.grade - 1];
      const upgradePercent = [targetPlayer.overall - ingredientPlayer.overall + 5];
      const gauge = UPGRADE_GAUGES[targetPlayer.grade - 1][targetPlayer.overall - ingredientPlayer.overall + 5];

      console.log(upgradeGrade, upgradePercent);
      ingredientPlayer.overall;
    });
    return value;
  }, [targetPlayer, ingredientPlayers]);

  return (
    <div className="w-full bg-gray-200 rounded-full mt-5">
      <div
        className="bg-primary text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: `${successPercent}%` }}
      >
        {successPercent}%
      </div>
    </div>
  );
}
