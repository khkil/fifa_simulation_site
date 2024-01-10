import CommonLayout from "@/components/layouts/CommonLayout";
import TargetPlayer from "@/components/upgrade/TargetPlayer";
import TargetPlayerList from "@/components/upgrade/TargetPlayerList";
import { useState } from "react";

const UpgradeSimulationPage = () => {
  const [player, setPlayer] = useState(null);
  return (
    <CommonLayout>
      <div className="flex">
        <div className="w-1/2">
          <TargetPlayer playerId={playerId} />
        </div>
        <div className="w-1/2">
          <TargetPlayerList />
        </div>
      </div>
    </CommonLayout>
  );
};

export default UpgradeSimulationPage;
