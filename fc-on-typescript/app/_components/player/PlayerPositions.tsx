import { Position } from "@/app/_types/player";
import { getPlusOverallFromGrade, getPositionGroup } from "@/app/_utils";

interface Props {
  positions: Position[];
  plusGrade?: number;
}

export default function PlayerPositions({ positions, plusGrade = 0 }: Props) {
  return (
    <div className="flex">
      {positions?.map(({ positionName, overall }, idx) => (
        <div key={idx} className="flex mr-2">
          <p className={`text-${getPositionGroup(positionName)} text-base font-semibold mr-1`}>{positionName}</p>
          <p className="text-base">{overall + getPlusOverallFromGrade(plusGrade)}</p>
        </div>
      ))}
    </div>
  );
}
