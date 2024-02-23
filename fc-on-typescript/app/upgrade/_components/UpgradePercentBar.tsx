import { IngredientPlayer, UpgradeTargetPlayer } from "@/app/_types/player";
import { useMemo } from "react";
import { UPGRADE_GAUGES, UPGRADE_INGREDIENT_MAX_COUNT, UPGRADEABLE_MIN_OVR_DIFF } from "@/app/_constants/upgrade";

interface Props {
  targetPlayer: UpgradeTargetPlayer;
  ingredientPlayers: IngredientPlayer[];
}

export function UpgradePercentBar({ targetPlayer, ingredientPlayers }: Props) {
  const successPercent = useMemo<string>(() => {
    let value = 0;
    ingredientPlayers.forEach((ingredientPlayer: IngredientPlayer) => {
      const upgradeGrade = targetPlayer.grade - 1;
      const gaugeIndex = ingredientPlayer.overall - targetPlayer.overall + UPGRADEABLE_MIN_OVR_DIFF;
      const gauge: number = UPGRADE_GAUGES?.[upgradeGrade]?.[gaugeIndex] || 0;
      value += gauge * (100 / UPGRADE_INGREDIENT_MAX_COUNT);
    });
    return (value >= 100 ? 100 : value).toFixed(1);
  }, [targetPlayer, ingredientPlayers]);

  return (
    <div className="w-full bg-gray-200 rounded-full mt-5 h-6">
      <div
        className="bg-primary text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-full"
        style={{ width: `${successPercent}%` }}
      >
        {successPercent}%
      </div>
    </div>
  );
}
