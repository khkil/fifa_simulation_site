import Match from "@/app/_types/match";
import { convertDateFormat } from "@/app/_utils";

interface Props {
  match: Match;
}
export default function MatchRow({ match: { matchId, matchDate, users } }: Props) {
  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b">
      <td className="px-4 py-4">
        <div className={"flex justify-center items-center"}>
          <div className={"text-center"}>
            <div>{users.map((v) => v.nickname).join(" VS ")}</div>
            <div>{convertDateFormat(matchDate)}</div>
          </div>
        </div>
      </td>
    </tr>
  );
}
