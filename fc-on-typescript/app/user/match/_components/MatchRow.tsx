import Match, { MatchInfo, MatchPlayer, MatchUser } from "@/app/_types/match";
import { convertDateFormat } from "@/app/_utils";
import { Fragment, Key, useCallback, useEffect, useState } from "react";
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

  if (isLoading)
    return (
      <div className={"h-32"}>
        <Loader useScreenHeight={false} />
      </div>
    );

  return (
    <div className={"p-2 border-t"}>
      <MatchDetailTab tabIndex={tabIndex} setTabIndex={setTabIndex} />
      {matchDetail?.matchInfo ? (
        tabIndex === 0 ? (
          <div>
            <MatchRecord matchInfo={matchDetail.matchInfo} />

            <MatchRecord title={"점유율(%)"} maxValue={20} />
            <MatchRecord title={"코너킥"} maxValue={20} />
            <MatchRecord title={"태클"} />
            <MatchRecord title={"파울"} />
            <MatchRecord title={"오프사이드"} />
            <MatchRecord title={"경고"} />
            <MatchRecord title={"퇴장"} />
            <MatchRecord title={"부상"} />
          </div>
        ) : tabIndex === 1 ? (
          <MatchLineUp matchInfo={matchDetail.matchInfo} />
        ) : null
      ) : null}
    </div>
  );
};

export const MatchRecord = ({ matchInfo }: { matchInfo: MatchInfo[]; key: string; title: string; maxValue?: number }) => {
  return (
    <div className="flex">
      <div className={"w-[30%] text-center"}>그래프</div>
      <div className={"w-[15%] text-center"}>수치</div>
      <div className={"w-[10%] text-center"}></div>
      <div className={"w-[15%] text-center"}>수치</div>
      <div className={"w-[30%] text-center"}>그래프</div>
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
