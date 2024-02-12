import { Player } from "@/app/_types/user";
import CustomImage from "@/app/_components/player/PlayerImage";
import PlayerWithSeason from "@/app/_components/player/PlayerWithSeason";
import PlayerPositions from "@/app/_components/player/PlayerPositions";
import { Season } from "@/app/_types/season";
import { Position } from "@/app/_types/player";
import PlayerPay from "@/app/_components/player/PlayerPay";

interface Props {
  players: Player[];
  seasons: Season[];
}

const FieldPlayer = ({ player: { spid, role, ovr, pay, name, price }, seasons }: { player: Player; seasons: Season[] }) => {
  const seasonId = parseInt(spid.toString().slice(0, 3));
  const season: Season | undefined = seasons.find(({ id }) => id === seasonId);
  const position: Position = { positionName: role.toUpperCase(), overall: ovr };
  return (
    <tr key={spid} className="odd:bg-white even:bg-gray-50 border-b">
      <td className="flex items-center py-4 text-gray-900 whitespace-nowrap ">
        <div className="px-4">
          <CustomImage spId={spid} />
        </div>
        <div>
          <PlayerWithSeason seasonImgUrl={season?.imageUrl || ""} playerName={name} />
          <PlayerPositions positions={[position]} />
        </div>
      </td>
      <td>
        <div className={"flex justify-center"}>
          <PlayerPay pay={pay} />
        </div>
      </td>
      <td className={"text-right pr-5"}>
        <p className={"text-base text-bp font-semibold"}>{price} BP</p>
      </td>
    </tr>
  );
};

export default function FieldPlayers({ players, seasons }: Props) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg common_border">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b"></thead>
        <tbody>
          <tr className="bg-gray-100 border-b">
            <td className="flex items-center py-4 text-gray-900 whitespace-nowrap">
              <p className={"font-semibold text-xl text-gray-500 px-5"}>주전</p>
            </td>
          </tr>
          {players
            .filter(({ x, y }) => x !== 0.0 || y !== 0.0)
            .map((player: Player) => (
              <FieldPlayer key={player.spid} player={player} seasons={seasons} />
            ))}
          <tr className="bg-gray-100 border-b">
            <td className="flex items-center py-4 text-gray-900 whitespace-nowrap">
              <p className={"font-semibold text-xl text-gray-500 px-5"}>후보</p>
            </td>
          </tr>
          {players
            .filter(({ x, y }) => x === 0.0 && y === 0.0)
            .map((player: Player) => (
              <FieldPlayer key={player.spid} player={player} seasons={seasons} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
