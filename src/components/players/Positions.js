import { getPlusOverallFromGrade, getPositionGroup } from "@/utils";

const Positions = ({ positions, plusGrade = 1 }) => {
  return (
    <div className="flex">
      {positions?.map(({ positionName, overall }, idx) => (
        <div key={idx} className="flex mr-2">
          <p className={`text-${getPositionGroup(positionName)} text-base mr-1`}>{positionName}</p>
          <p className="text-base">{overall + getPlusOverallFromGrade(plusGrade)}</p>
        </div>
      ))}
    </div>
  );
};

export default Positions;
