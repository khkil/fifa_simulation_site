import { MatchInfo, MatchPlayer } from "@/app/_types/match";
import { Key, useMemo, useState } from "react";
import PlayerWithSeason from "@/app/_components/player/PlayerWithSeason";
import PlayerPositions from "@/app/_components/player/PlayerPositions";
import { convertKorPriceFormat, convertPriceFormat } from "@/app/_utils";
import Chart from "react-apexcharts";

interface Props {
  matchInfo: MatchInfo[];
}
export default function MatchLineup({ matchInfo }: Props) {
  return (
    <div className="flex justify-center">
      {matchInfo.map(({ player }: MatchInfo, index: Key) => (
        <LineupPlayers key={index} player={player} reverse={index !== 0} />
      ))}
    </div>
  );
}

const LineupPlayers = ({ player, reverse }: { player: MatchPlayer[]; reverse?: boolean }) => {
  const [selectPlayer, setSelectPlayer] = useState<MatchPlayer>(player[0]);
  const squadPrice = useMemo<number>(() => player.reduce((sum, { price }) => sum + price, 0), [player]);
  return (
    <div className={`w-1/2 text-center py-5 border-gray-300 flex ${reverse ? "flex-row-reverse" : "border-r"}`}>
      <div className={"w-7/12"}>
        <div className={"p-2"}>
          <p className={"text-bp text-xl font-bold"}>{convertPriceFormat(squadPrice)} BP</p>
          <p className={"text-gray-400 text-lg font-semibold"}>({convertKorPriceFormat(squadPrice)} BP)</p>
        </div>
        <div className={"w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 "}>
          {player.map((player: MatchPlayer, index) => (
            <button
              key={player.spId}
              aria-current="true"
              type="button"
              className={`w-full px-4 py-3 font-medium text-left rtl:text-right border-b cursor-pointer border-gray-200 focus:outline-none ${selectPlayer.spId === player.spId ? "text-white bg-gray-600" : "hover:bg-gray-100"} `}
              onClick={() => {
                setSelectPlayer(player);
              }}
            >
              <div className={"flex justify-start items-center"}>
                <div className={"min-w-12"}>
                  <PlayerPositions positions={[{ positionName: player.positionName }]} />
                </div>
                <PlayerWithSeason playerName={player.name} seasonImgUrl={player.seasonImageUrl} />
                <img className={"ml-2 h-5"} src={`/images/strong/${player.spGrade}.png`} />
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className={"w-5/12"}>
        <DonutChart percentage={10} />
      </div>
    </div>
  );
};

const DonutChart = ({ percentage }: { percentage: number }) => {
  return (
    <div className="radial-progress" style={{ "--value": 70 }} role="progressbar">
      70%
    </div>
  );
};
