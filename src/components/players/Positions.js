import { getPlusStatFromGrade, getPositionGroup } from "@/utils";

const Positions = ({ positions, plusGrade = 1 }) => {
  return (
    <div className="flex">
      {positions?.map(({ positionName, overall }) => (
        <div className="flex mr-2">
          <p className={`text-${getPositionGroup(positionName)} text-base mr-1`}>{positionName}</p>
          <p className="text-base">{overall + getPlusStatFromGrade(plusGrade)}</p>
        </div>
      ))}
    </div>
  );
};

export default Positions;