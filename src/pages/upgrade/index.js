import CommonLayout from "@/components/layouts/CommonLayout";
import TargetPlayer from "@/components/upgrade/TargetPlayer";
import TargetPlayerList from "@/components/upgrade/TargetPlayerList";

const UpgradeSimulationPage = () => {
  return (
    <CommonLayout>
      <div className="flex">
        <div className="w-1/2">
          <TargetPlayer />
        </div>
        <div className="w-1/2">
          <TargetPlayerList />
        </div>
      </div>
    </CommonLayout>
  );
};

export default UpgradeSimulationPage;
