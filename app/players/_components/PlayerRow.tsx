import PlayerImage from "@/app/_components/player/PlayerImage";
import PlayerWithSeason from "@/app/_components/player/PlayerWithSeason";
import PlayerPositions from "@/app/_components/player/PlayerPositions";
import { Player } from "@/app/_types/player";
import { useCallback, useMemo, useState } from "react";
import PlayerGrades from "@/app/_components/player/PlayerGrades";
import { convertPriceFormat } from "@/app/_utils";
import PlayerPay from "@/app/_components/player/PlayerPay";

interface Props {
  player: Player;
}
export default function PlayerRow({
  player: {
    spId,
    playerName,
    season: { imageUrl },
    positions,
    pay,
    average: { speed, shooting, passing, dribble, physical, defending },
    priceList,
  },
}: Props) {
  const [grade, setGrade] = useState<number>(1);
  const price: number = useMemo<number>(() => priceList[grade - 1]?.price || 0, [priceList, grade]);

  const getOverallUnit = useCallback((overall: number): number => {
    return Math.floor(overall / 10) * 10;
  }, []);

  return (
    <tr key={spId} className="odd:bg-white even:bg-gray-50 border-b">
      <td className="flex items-center py-4 text-gray-900 whitespace-nowrap">
        <div className="px-4">
          <PlayerImage spId={spId} />
        </div>
        <div>
          <PlayerWithSeason seasonImgUrl={imageUrl} playerName={playerName} />
          <PlayerPositions positions={positions} />
        </div>
      </td>
      <td className="px-4 py-4">
        <PlayerGrades grade={grade} setGrade={setGrade} />
      </td>
      <td className="px-4 py-4">
        <PlayerPay pay={pay} />
      </td>
      <td className="px-4 py-4">
        <p className={`text-over${getOverallUnit(speed)}`}>{speed}</p>
      </td>
      <td className="px-4 py-4">
        <p className={`text-over${getOverallUnit(shooting)}`}>{shooting}</p>
      </td>
      <td className="px-4 py-4">
        <p className={`text-over${getOverallUnit(passing)}`}>{passing}</p>
      </td>
      <td className="px-4 py-4">
        <p className={`text-over${getOverallUnit(dribble)}`}>{dribble}</p>
      </td>
      <td className="px-4 py-4">
        <p className={`text-over${getOverallUnit(physical)}`}>{physical}</p>
      </td>
      <td className="px-4 py-4">
        <p className={`text-over${getOverallUnit(defending)}`}>{defending}</p>
      </td>
      <td className="px-4 py-4">
        <p className={"text-bp font-semibold"}>{convertPriceFormat(price)} BP</p>
      </td>

      <td className="flex items-center py-4 text-gray-900 whitespace-nowrap"></td>
    </tr>
  );
}
