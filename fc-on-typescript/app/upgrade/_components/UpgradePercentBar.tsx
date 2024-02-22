import { PlayerByOverall, UpgradeTargetPlayer } from "@/app/_types/player";
import { useMemo } from "react";
import { upgradeGauges } from "@/app/_utils";

interface Props {
  targetPlayer: UpgradeTargetPlayer;
  ingredientPlayers: PlayerByOverall[];
}

export function UpgradePercentBar({ targetPlayer, ingredientPlayers }: Props) {
  const successPercent = useMemo<number>(() => {
    let value = 0;
    ingredientPlayers.forEach((v) => {
      const gauge = upgradeGauges[targetPlayer.grade - 1];
      v.overall;
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
