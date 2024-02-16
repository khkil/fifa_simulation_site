import Match, { MatchInfo, MatchPlayer, MatchUser } from "@/app/_types/match";
import { convertDateFormat } from "@/app/_utils";
import { Fragment, Key, useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { UserSquad } from "@/app/_types/user";
import Error from "@/app/error";
import { fetchUserMatchDetail, fetchUserSquad } from "@/app/_service/userService";
import Loader from "@/app/_components/ui/Loader";
import MatchDetailTab from "@/app/user/match/_components/MatchDetailTab";

interface Props {
  match: Match;
  matchIds: string[];
  setMatchIds: (matchId: string[]) => void;
}
export default function MatchRow({ match: { matchId, matchDate, users }, matchIds, setMatchIds }: Props) {
  const winner = users?.reduce((winner: MatchUser, user: MatchUser) => (winner.goal > user.goal ? winner : user), users[0]);

  const toggleMatchDetail = useCallback(
    (matchId: string) => {
      const values: string[] = matchIds.includes(matchId) ? matchIds.filter((v) => v !== matchId) : [...matchIds, matchId];
      return setMatchIds(values);
    },
    [matchIds],
  );

  if (!users || !winner) return null;
  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b cursor-pointer">
      <td className="">
        <details>
          <summary
            className={"list-none hover:bg-gray-300 py-3"}
            onClick={() => {
              toggleMatchDetail(matchId);
            }}
          >
            <div className={"flex items-center justify-center"}>
              <p className={"px-5 font-bold text-lg text-gray-700 w-[45%] text-right"}>{users[0].nickname}</p>
              <p className={`px-2 font-bold text-xl  ${users[0].nickname === winner.nickname ? "text-red-400" : "text-black"}`}>{users[0].goal}</p>
              <p className={"font-bold text-xl text-black"}>:</p>
              <p className={`px-2 font-bold text-xl  ${users[1].nickname === winner.nickname ? "text-red-400" : "text-black"}`}>{users[1].goal}</p>
              <p className={"px-5 font-bold text-lg text-gray-700 w-[45%] text-left"}>{users[1].nickname}</p>
              <div className={"relative pt-5"}>
                <svg
                  className={`w-3 h-3 ${matchIds.includes(matchId) ? "rotate-180" : ""} transition-all duration-200 `}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                </svg>
              </div>
            </div>
            <div className={"pt-2 text-center"}>{convertDateFormat(matchDate)}</div>
          </summary>

          {matchIds.includes(matchId) ? <MatchDetail matchId={matchId} /> : null}
        </details>
      </td>
    </tr>
  );
}

export const MatchDetail = ({ matchId }: { matchId: string }) => {
  const {
    data: matchDetail,
    isLoading,
    error,
  } = useSWR<Match, Error>(`match_${matchId}`, () => fetchUserMatchDetail(matchId), {
    revalidateOnFocus: false,
  });

  const [tabIndex, setTabIndex] = useState<number>(0);

  const getPercentage = (part: number, whole: number): number => {
    if (part == 0 || whole == 0) return 0;
    return parseFloat(((part / whole) * 100).toFixed(1));
  };

  const { user1, user2 }: { user1: MatchInfo | undefined; user2: MatchInfo | undefined } = useMemo(
    () => ({
      user1: matchDetail?.matchInfo?.[0],
      user2: matchDetail?.matchInfo?.[1],
    }),
    [matchDetail],
  );

  if (isLoading)
    return (
      <div className={"h-32"}>
        <Loader useScreenHeight={false} />
      </div>
    );

  if (!user1 || !user2) return null;
  return (
    <div className={"p-2 border-t"}>
      <MatchDetailTab tabIndex={tabIndex} setTabIndex={setTabIndex} />
      {matchDetail?.matchInfo ? (
        tabIndex === 0 ? (
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
        ) : tabIndex === 1 ? (
          <MatchLineUp matchInfo={matchDetail.matchInfo} />
        ) : null
      ) : null}
    </div>
  );
};

export const MatchRecord = ({ desc, value1, value2, maxValue }: { desc: string; value1: number; value2: number; maxValue: number }) => {
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

export const MatchLineUp = ({ matchInfo }: { matchInfo: MatchInfo[] }) => {
  return (
    <div className="flex justify-center">
      {matchInfo.map(({ nickname }: MatchInfo) => (
        <div className={"w-1/2 text-center border-r border-gray-300"}>
          <div>{nickname}</div>
        </div>
      ))}
    </div>
  );
};
