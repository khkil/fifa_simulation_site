"use client";

import { useState } from "react";
import { IngredientPlayer, UpgradeTargetPlayer } from "@/app/_types/player";
import TargetPlayer from "@/app/upgrade/_components/TargetPlayer";
import TargetPlayerList from "@/app/upgrade/_components/TargetPlayerList";
import IngredientPlayerList from "@/app/upgrade/_components/IngredientPlayerList";
import IngredientCardList from "@/app/upgrade/_components/IngredientCardList";
import { UpgradePercentBar } from "@/app/upgrade/_components/UpgradePercentBar";
import NoResults from "@/app/_components/ui/NoResults";

export default function UpgradePage() {
  const [targetPlayer, setTargetPlayer] = useState<UpgradeTargetPlayer | null>(null);
  const [ingredientPlayers, setIngredientPlayers] = useState<IngredientPlayer[]>([]);

  return (
    <div className={"flex justify-center space-x-5"}>
      <div className={"w-3/5"}>
        {!targetPlayer ? (
          <div className={"h-96 border border-gray-300 rounded-lg "}>
            <NoResults text={"강화할 선수를 선택해주세요"} />
          </div>
        ) : (
          <TargetPlayer
            targetPlayer={targetPlayer}
            setTargetPlayer={setTargetPlayer}
            ingredientPlayers={ingredientPlayers}
            setIngredientPlayers={setIngredientPlayers}
          />
        )}
      </div>
      <div className={"w-2/5"}>
        {!targetPlayer ? (
          <TargetPlayerList setTargetPlayer={setTargetPlayer} />
        ) : (
          <IngredientPlayerList
            playerOverall={targetPlayer.overall}
            ingredientPlayers={ingredientPlayers}
            setIngredientPlayers={setIngredientPlayers}
          />
        )}
      </div>
    </div>
  );
}
