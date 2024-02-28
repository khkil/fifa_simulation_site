import { Position } from "@/app/_types/player";
import { getPlusOverallFromGrade, getPositionGroupByPosition } from "@/app/_utils";

interface Props {
  positions: Position[];
  plusGrade?: number;
}

export default function PlayerPositions({ positions, plusGrade = 0 }: Props) {
  return (
    <div className="flex">
      {positions?.map(({ positionName, overall }, idx) => (
        <div key={idx} className="flex mr-2">
          <p className={`text-${getPositionGroupByPosition(positionName)} text-base font-semibold mr-1`}>{positionName}</p>
          {overall ? <p className="text-base font-semibold text-gray-700">{overall + getPlusOverallFromGrade(plusGrade)}</p> : null}
        </div>
      ))}
    </div>
  );
}
