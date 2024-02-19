"use client";

import { useState } from "react";
import { UpgradeTargetPlayer } from "@/app/_types/player";
import TargetPlayer from "@/app/upgrade/_components/TargetPlayer";
import TargetPlayerList from "@/app/upgrade/_components/TargetPlayerList";

//const defaultTargetPlayer = { playerId: 264184881, grade: 5, overall: 115 };
const defaultTargetPlayer = null;

export default function UpgradePage() {
  const [targetPlayer, setTargetPlayer] = useState<UpgradeTargetPlayer | null>(defaultTargetPlayer);
  return (
    <div className={"flex justify-center space-x-5"}>
      <div className={"w-3/5"}>
        <TargetPlayer targetPlayer={targetPlayer} />
      </div>
      <div className={"w-2/5"}>
        <TargetPlayerList setTargetPlayer={setTargetPlayer} />
      </div>
    </div>
  );
}
