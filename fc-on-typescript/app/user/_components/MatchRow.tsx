import Match, { MatchUser } from "@/app/_types/match";
import { convertDateFormat } from "@/app/_utils";
import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { UserSquad } from "@/app/_types/user";
import Error from "@/app/error";
import { fetchUserMatchDetail, fetchUserSquad } from "@/app/_service/userService";
import Loader from "@/app/_components/ui/Loader";

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
    <tr
      className="odd:bg-white even:bg-gray-50 border-b cursor-pointer"
      onClick={() => {
        toggleMatchDetail(matchId);
      }}
    >
      <td className="">
        <details>
          <summary className={"list-none hover:bg-gray-300 py-3"}>
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
  const { data, isLoading, error } = useSWR<Match, Error>(`match_${matchId}`, () => fetchUserMatchDetail(matchId), {
    revalidateOnFocus: false,
  });
  return isLoading ? (
    <div className={"h-32"}>
      <Loader useScreenHeight={false} />
    </div>
  ) : (
    <div className="p-3 border-t">123</div>
  );
};
