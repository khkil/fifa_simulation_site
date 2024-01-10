import CommonLayout from "@/components/layouts/CommonLayout";
import TargetPlayer from "@/components/upgrade/TargetPlayer";
import TargetPlayerList from "@/components/upgrade/TargetPlayerList";
import { useState } from "react";

const UpgradeSimulationPage = () => {
  const [selectPlayer, setSelectPlayer] = useState({ playerId: null, grade: null });
  return (
    <CommonLayout>
      <div className="flex">
        <div className="w-1/2">
          <TargetPlayer selectPlayer={selectPlayer} />
        </div>
        <div className="w-1/2">
          <TargetPlayerList setSelectPlayer={setSelectPlayer} />
        </div>
      </div>
    </CommonLayout>
  );
};

export default UpgradeSimulationPage;
