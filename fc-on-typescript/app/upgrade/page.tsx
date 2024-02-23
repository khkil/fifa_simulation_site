"use client";

import { useState } from "react";
import { IngredientPlayer, UpgradeTargetPlayer } from "@/app/_types/player";
import TargetPlayer from "@/app/upgrade/_components/TargetPlayer";
import TargetPlayerList from "@/app/upgrade/_components/TargetPlayerList";
import IngredientPlayerList from "@/app/upgrade/_components/IngredientPlayerList";
import IngredientCardList from "@/app/upgrade/_components/IngredientCardList";
import { UpgradePercentBar } from "@/app/upgrade/_components/UpgradePercentBar";
import NoResults from "@/app/_components/ui/NoResults";

let defaultTargetPlayer: UpgradeTargetPlayer | null = {
  playerId: 287256790,
  overall: 111,
  grade: 1,
  priceList: [
    { price: 7450000000, grade: 1 },
    { price: 11300000000, grade: 2 },
    { price: 19200000000, grade: 3 },
    { price: 67900000000, grade: 4 },
    { price: 214000000000, grade: 5 },
    { price: 1160000000000, grade: 6 },
    { price: 4390000000000, grade: 7 },
    { price: 11400000000000, grade: 8 },
    { price: 31900000000000, grade: 9 },
    { price: 102000000000000, grade: 10 },
  ],
  playerName: "J. 무시알라",
  season: {
    id: 287,
    seasonName: "23 TOTS (23 Team Of The Season)",
    imageUrl: "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/23tots.png",
  },
  positions: [
    { positionName: "LM", overall: 110 },
    { positionName: "CAM", overall: 111 },
    { positionName: "CM", overall: 107 },
  ],
};

const ingredientPlayerList = [
  {
    spId: 802166906,
    playerName: "프랑코 바레시",
    overall: 124,
    price: 3380000000000,
    grade: 7,
    season: { id: 802, seasonName: "Decade", imageUrl: "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/dc.png" },
    positions: [{ positionName: "CB", overall: 124 }],
  },
  {
    spId: 802166906,
    playerName: "프랑코 바레시",
    overall: 124,
    price: 3380000000000,
    grade: 7,
    season: { id: 802, seasonName: "Decade", imageUrl: "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/dc.png" },
    positions: [{ positionName: "CB", overall: 124 }],
  },
];

export default function UpgradePage() {
  const [targetPlayer, setTargetPlayer] = useState<UpgradeTargetPlayer | null>(defaultTargetPlayer); // null
  const [ingredientPlayers, setIngredientPlayers] = useState<IngredientPlayer[]>([]); // []

  return (
    <div className={"flex justify-center space-x-5"}>
      <div className={"w-3/5"}>
        {!targetPlayer ? (
          <div className={"h-96 border border-gray-300 rounded-lg "}>
            <NoResults text={"강화할 선수를 선택해주세요"} />
          </div>
        ) : (
          <div>
            <TargetPlayer targetPlayer={targetPlayer} setTargetPlayer={setTargetPlayer} setIngredientPlayers={setIngredientPlayers} />
            <IngredientCardList ingredientPlayers={ingredientPlayers} setIngredientPlayers={setIngredientPlayers} />
            <UpgradePercentBar targetPlayer={targetPlayer} ingredientPlayers={ingredientPlayers} />
          </div>
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
