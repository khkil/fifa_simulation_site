import Match, { MatchInfo, MatchPlayer, MatchUser } from "@/app/_types/match";
import { convertDateFormat } from "@/app/_utils";
import { Fragment, Key, useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { UserSquad } from "@/app/_types/user";
import Error from "@/app/error";
import { fetchUserMatchDetail, fetchUserSquad } from "@/app/_service/userService";
import Loader from "@/app/_components/ui/Loader";
import MatchDetailTab from "@/app/user/match/_components/MatchDetailTab";
import MatchRecords from "@/app/user/match/_components/MatchRecords";
import MatchLineup from "@/app/user/match/_components/MatchLineup";

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
        {users.length === 2 ? (
          <details>
            <summary
              className={"list-none hover:bg-gray-300 py-3"}
              onClick={() => {
                toggleMatchDetail(matchId);
              }}
            >
              <div className={"flex items-center justify-center"}>
                <div className={"w-[45%] flex justify-end"}>
                  <p className={"px-5 font-bold text-lg text-gray-700"}>{users[0].nickname}</p>
                  <p className={`px-2 font-bold text-xl  ${users[0].nickname === winner.nickname ? "text-red-400" : "text-black"}`}>
                    {users[0].goal}
                  </p>
                </div>

                <p className={"font-bold text-xl text-black"}>:</p>

                <div className={"w-[45%] flex"}>
                  <p className={`px-2 font-bold text-xl  ${users[1].nickname === winner.nickname ? "text-red-400" : "text-black"}`}>
                    {users[1].goal}
                  </p>
                  <p className={"px-5 font-bold text-lg text-gray-700 w-[45%] text-left"}>{users[1].nickname}</p>
                </div>

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
        ) : (
          <InvalidMatch />
        )}
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
          <MatchRecords matchInfo={matchDetail.matchInfo} />
        ) : tabIndex === 1 ? (
          <MatchLineup matchInfo={matchDetail.matchInfo} />
        ) : null
      ) : null}
    </div>
  );
};

const InvalidMatch = () => {
  return (
    <div className={"h-20 bg-gray-100 flex justify-center items-center"}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
      <p className={"text-lg font-bold px-2"}>경기정보를 불러올수 없습니다.</p>
    </div>
  );
};
