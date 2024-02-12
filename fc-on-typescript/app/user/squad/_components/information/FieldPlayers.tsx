import { Player } from "@/app/_types/user";
import CustomImage from "@/app/_components/player/PlayerImage";
import PlayerWithSeason from "@/app/_components/player/PlayerWithSeason";
import PlayerPositions from "@/app/_components/player/PlayerPositions";
import { Season } from "@/app/_types/season";

interface Props {
  players: Player[];
  seasons: Season[];
}

export default function FieldPlayers({ players }: Props) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg common_border">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            <th scope="col" className="px-4 py-3 text-center">
              선수
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              급여
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              가격
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map(({ spid, name }) => (
            <tr className="odd:bg-white even:bg-gray-50 border-b">
              <td className="flex items-center py-4 text-gray-900 whitespace-nowrap">
                <div className="px-4">
                  <CustomImage spId={spid} />
                </div>
                <div>
                  <PlayerWithSeason seasonImgUrl={imageUrl} playerName={name} />
                  <PlayerPositions positions={positions} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
