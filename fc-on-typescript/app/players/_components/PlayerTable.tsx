import CustomImage from "@/app/_components/player/PlayerImage";
import PlayerWithSeason from "@/app/_components/player/PlayerWithSeason";
import { convertKorPriceFormat, convertPriceFormat } from "@/app/_utils";
import { Player } from "@/app/_types/player";
import PlayerPositions from "@/app/_components/player/PlayerPositions";
import PlayerRow from "@/app/players/_components/PlayerRow";

interface Props {
  playerList: Player[];
}

export default function PlayerTable({ playerList }: Props) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg common_border">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-4 py-3">
              선수명
            </th>
            <th scope="col" className="px-4 py-3">
              강화
            </th>
            <th scope="col" className="px-4 py-3">
              급여
            </th>
            <th scope="col" className="px-4 py-3">
              스피드
            </th>
            <th scope="col" className="px-4 py-3">
              슛
            </th>
            <th scope="col" className="px-4 py-3">
              패스
            </th>
            <th scope="col" className="px-4 py-3">
              드리블
            </th>
            <th scope="col" className="px-4 py-3">
              피지컬
            </th>
            <th scope="col" className="px-4 py-3">
              수비
            </th>
            <th scope="col" className="px-4 py-3">
              현재가격
            </th>
          </tr>
        </thead>
        <tbody>
          {playerList.map((player: Player) => (
            <PlayerRow key={player.spId} player={player} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
