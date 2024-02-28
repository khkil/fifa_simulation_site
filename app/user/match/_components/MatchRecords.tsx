import { MatchInfo } from "@/app/_types/match";
import { useMemo } from "react";
import { getPercentage } from "@/app/_utils";

interface Props {
  matchInfo: MatchInfo[];
}

export default function MatchRecords({ matchInfo }: Props) {
  const { user1, user2 }: { user1: MatchInfo | undefined; user2: MatchInfo | undefined } = useMemo(
    () => ({
      user1: matchInfo?.[0],
      user2: matchInfo?.[1],
    }),
    [matchInfo],
  );

  if (!user1 || !user2) return null;
  return (
    <div className={"pt-5"}>
      <MatchRecord desc={"슛"} value1={user1?.shoot.shootTotal} value2={user2.shoot.shootTotal} maxValue={20} />
      <MatchRecord desc={"유효슛"} value1={user1.shoot.effectiveShootTotal} value2={user2.shoot.effectiveShootTotal} maxValue={20} />
      <MatchRecord
        desc={"슛 성공률(%)"}
        value1={getPercentage(user1.shoot.goalTotal, user1.shoot.shootTotal)}
        value2={getPercentage(user2.shoot.goalTotal, user2.shoot.shootTotal)}
        maxValue={100}
      />
      <MatchRecord
        desc={"패스 성공률(%)"}
        value1={getPercentage(user1.pass.passSuccess, user1.pass.passTry)}
        value2={getPercentage(user2.pass.passSuccess, user2.pass.passTry)}
        maxValue={100}
      />
      {/*<MatchRecord desc={"점유율(%)"} value1={`${user1.matchDetail.possession}`} value2={`${user2.matchDetail.possession}`} maxValue={20} />*/}
      <MatchRecord desc={"코너킥"} value1={user1.defence.tackleSuccess} value2={user2.defence.tackleSuccess} maxValue={20} />
      <MatchRecord desc={"태클"} value1={user1.shoot.shootTotal} value2={user2.shoot.shootTotal} maxValue={20} />
      <MatchRecord desc={"파울"} value1={user1.matchDetail.foul} value2={user2.matchDetail.foul} maxValue={20} />
      <MatchRecord desc={"오프사이드"} value1={user1.matchDetail.offsideCount} value2={user2.matchDetail.offsideCount} maxValue={20} />
      <MatchRecord desc={"경고"} value1={user1.matchDetail.yellowCards} value2={user2.matchDetail.yellowCards} maxValue={20} />
      <MatchRecord desc={"퇴장"} value1={user1.matchDetail.redCards} value2={user2.matchDetail.redCards} maxValue={20} />
      <MatchRecord desc={"부상"} value1={user1.matchDetail.injury} value2={user2.matchDetail.injury} maxValue={20} />
    </div>
  );
}

const MatchRecord = ({ desc, value1, value2, maxValue }: { desc: string; value1: number; value2: number; maxValue: number }) => {
  return (
    <div className="flex py-2 px-5">
      <div className={"w-[30%] text-center"}>
        <div className="w-full bg-gray-200 rounded-full h-2.5 scale-x-[-1]">
          <div className={`bg-green-500 h-2.5 rounded-full`} style={{ width: `${(value1 / maxValue) * 100}%` }}></div>
        </div>
      </div>
      <div className={"w-[15%] text-center"}>
        <p className={"font-bold text-lg text-gray-800"}>{`${value1}${desc.indexOf("%") > -1 ? "%" : ""}`}</p>
      </div>
      <div className={"w-[10%] text-center"}>
        <p className={"font-bold text-lg text-gray-800"}>{desc}</p>
      </div>
      <div className={"w-[15%] text-center"}>
        <p className={"font-bold text-lg text-gray-800"}>{`${value2}${desc.indexOf("%") > -1 ? "%" : ""}`}</p>
      </div>
      <div className={"w-[30%] text-center"}>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className={`bg-blue-500 h-2.5 rounded-full`} style={{ width: `${(value2 / maxValue) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
};
