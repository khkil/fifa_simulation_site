import CommonLayout from "@/components/layouts/CommonLayout";
import Ingredients from "@/components/upgrade/Ingredients";
import OverallPlayers from "@/components/upgrade/OverallPlayers";
import TargetPlayer from "@/components/upgrade/TargetPlayer";
import TargetPlayerList from "@/components/upgrade/TargetPlayerList";
import { useMemo, useState } from "react";

//export const INITIAL_PLAYER = { playerId: null, grade: null, overall: null };
export const INITIAL_PLAYER = { playerId: 264184881, grade: 5, overall: 125 };

const UpgradeSimulationPage = () => {
  const [selectPlayer, setSelectPlayer] = useState(INITIAL_PLAYER);
  const [ingredients, setIngredients] = useState([]);

  const isPlayerPicked = useMemo(() => selectPlayer?.playerId && selectPlayer?.overall, [selectPlayer]);

  return (
    <CommonLayout>
      <div className="flex">
        <div className="w-1/2">
          <TargetPlayer selectPlayer={selectPlayer} setSelectPlayer={setSelectPlayer} />
          <Ingredients overall={selectPlayer.overall} ingredients={ingredients} setIngredients={setIngredients} />
        </div>
        <div className="w-1/2">
          {isPlayerPicked ? (
            <OverallPlayers overall={selectPlayer.overall - 1} ingredients={ingredients} setIngredients={setIngredients} />
          ) : (
            <TargetPlayerList setSelectPlayer={setSelectPlayer} />
          )}
        </div>
      </div>
    </CommonLayout>
  );
};

export default UpgradeSimulationPage;
