import Match, { MatchUser } from "@/app/_types/match";
import { convertDateFormat } from "@/app/_utils";

interface Props {
  match: Match;
  matchIds: string[];
  setMatchIds: (matchId: string[]) => void;
}
export default function MatchRow({ match: { matchId, matchDate, users }, matchIds, setMatchIds }: Props) {
  const winner: MatchUser = users.reduce((winner: MatchUser, user: MatchUser) => (winner.goal > user.goal ? winner : user), users[0]);
  return (
    <tr
      className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-300 cursor-pointer"
      onClick={() => {
        setMatchIds([...matchIds, matchId]);
      }}
    >
      <td className="px-4 py-4">
        <div>
          <div className={"flex items-center justify-center"}>
            <p className={"px-5 font-bold text-lg text-gray-700 w-[45%] text-right"}>{users[0].nickname}</p>
            <p className={`px-2 font-bold text-xl  ${users[0].nickname === winner.nickname ? "text-red-400" : "text-black"}`}>{users[0].goal}</p>
            <p className={"font-bold text-xl text-black"}>:</p>
            <p className={`px-2 font-bold text-xl  ${users[1].nickname === winner.nickname ? "text-red-400" : "text-black"}`}>{users[1].goal}</p>
            <p className={"px-5 font-bold text-lg text-gray-700 w-[45%] text-left"}>{users[1].nickname}</p>
            <div className={"flex pt-5"}>
              <svg
                className={`w-4 h-4  ${matchIds.includes(matchId) ? "rotate-180" : ""} shrink-0`}
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
        </div>
      </td>
    </tr>
  );
}
