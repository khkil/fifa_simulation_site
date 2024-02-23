import { IngredientPlayer, Position, UpgradeTargetPlayer } from "@/app/_types/player";
import PlayerWithSeason from "@/app/_components/player/PlayerWithSeason";
import PlayerPositions from "@/app/_components/player/PlayerPositions";
import { useMemo } from "react";
import { convertPriceFormat, getPlusOverallFromGrade } from "@/app/_utils";
import NoResults from "@/app/_components/ui/NoResults";

interface Props {
  targetPlayer: UpgradeTargetPlayer;
  setTargetPlayer: (targetPlayer: null) => void;
  setIngredientPlayers: (ingredientPlayer: IngredientPlayer[]) => void;
}

export default function TargetPlayer({ targetPlayer, setTargetPlayer, setIngredientPlayers }: Props) {
  const { playerId, grade, priceList, overall, playerName, season, positions } = targetPlayer;

  const resetPlayer = (): void => {
    setTargetPlayer(null);
    setIngredientPlayers([]);
  };

  return (
    <div className={" border border-gray-300 rounded-lg p-10 flex flex-col items-center "}>
      <div className="flex w-full">
        <div className={"flex flex-col items-center w-1/3"}>
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common/playersAction/p${playerId}.png`}
          />
          <PlayerWithSeason playerName={playerName} seasonImgUrl={season.imageUrl} />
          <PlayerPositions positions={positions} />
        </div>
        <div className={"flex flex-col items-center w-2/3"}>
          <div className="overflow-x-auto shadow-md sm:rounded-lg border w-full">
            <table className="w-full text-sm text-gray-500">
              <tbody>
                <tr className="border-b border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                    시도 강화등급
                  </th>
                  <td className="px-6 py-4 flex space-x-2">
                    <img className={"h-5"} src={`/images/strong/${grade}.png`} /> <p>{"->"}</p>{" "}
                    <img className={"h-5"} src={`/images/strong/${grade + 1}.png`} />
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                    강화성공시 선수가치
                  </th>
                  <td className="px-6 py-4">
                    <p className={"text-bp font-semibold text-base"}>{convertPriceFormat(priceList[grade + 1].price)} BP</p>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                    능력치
                  </th>
                  <td className="px-6 py-4 flex space-x-1 items-center">
                    <p className={"font-semibold text-lg"}>{overall} </p>
                    <p className={"font-semibold text-lg text-orange-600"}>+</p>
                    <p className={"font-semibold text-lg text-orange-600"}>{getPlusOverallFromGrade(grade + 1)}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg border w-full mt-10">
        <table className="w-full text-sm text-gray-500">
          <tbody>
            <tr className="border-b border-gray-200">
              <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                누적 소모 BP
              </th>
              <td className="px-6 py-4 flex space-x-2 justify-center">
                <p className={"text-bp font-semibold text-base"}>{0} BP</p>
              </td>
              <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                누적 수익 BP
              </th>
              <td className="px-6 py-4 flex space-x-2 justify-center">
                <p className={"text-bp font-semibold text-base"}>{0} BP</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex mt-4 md:mt-6 space-x-4">
        <button className="inline-flex items-center px-4 py-2 text-lg font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-500">
          강화하기
        </button>
        <button
          className="inline-flex items-center px-4 py-2 text-lg font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
          onClick={resetPlayer}
        >
          초기화
        </button>
      </div>
    </div>
  );
}
