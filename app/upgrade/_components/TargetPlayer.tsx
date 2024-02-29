import { IngredientPlayer, Position, UpgradeTargetPlayer } from "@/app/_types/player";
import PlayerWithSeason from "@/app/_components/player/PlayerWithSeason";
import PlayerPositions from "@/app/_components/player/PlayerPositions";
import { useMemo, useState } from "react";
import { convertPriceFormat, getPlusOverallFromGrade } from "@/app/_utils";
import NoResults from "@/app/_components/ui/NoResults";
import IngredientCardList from "@/app/upgrade/_components/IngredientCardList";
import { UpgradePercentBar } from "@/app/upgrade/_components/UpgradePercentBar";
import { UPGRADE_GAUGES, UPGRADE_INGREDIENT_MAX_COUNT, UPGRADEABLE_MIN_OVR_DIFF } from "@/app/_constants/upgrade";

interface Props {
  targetPlayer: UpgradeTargetPlayer;
  setTargetPlayer: (targetPlayer: null | UpgradeTargetPlayer) => void;
  ingredientPlayers: IngredientPlayer[];
  setIngredientPlayers: (ingredientPlayer: IngredientPlayer[]) => void;
}

interface TotalPrice {
  used: number;
  profit: number;
}

export default function TargetPlayer({ targetPlayer, setTargetPlayer, ingredientPlayers, setIngredientPlayers }: Props) {
  let { playerId, grade, priceList, overall, playerName, season, positions } = targetPlayer;

  const totalIngredientPrice: number = useMemo<number>(() => ingredientPlayers.reduce((sum, { price }) => sum + price, 0), [ingredientPlayers]);
  const successPercent = useMemo<number>(() => {
    let value = 0;
    ingredientPlayers.forEach((ingredientPlayer: IngredientPlayer) => {
      const upgradeGrade = targetPlayer.grade - 1;
      const gaugeIndex = ingredientPlayer.overall - targetPlayer.overall + UPGRADEABLE_MIN_OVR_DIFF;
      const gauge: number = UPGRADE_GAUGES?.[upgradeGrade]?.[gaugeIndex] || 0;
      value += gauge * (100 / UPGRADE_INGREDIENT_MAX_COUNT);
    });
    return value >= 100 ? 100 : value;
  }, [targetPlayer, ingredientPlayers]);

  const [zoomIn, setZoomIn] = useState<boolean>(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState<boolean | null>(null);

  const [totalPrice, setTotalPrice] = useState<TotalPrice>({
    used: 0,
    profit: 0,
  });

  const resetPlayer = (): void => {
    setTargetPlayer(null);
    setIngredientPlayers([]);
  };

  const goUpgrade = () => {
    if (targetPlayer.grade === 10) {
      alert("최대 10강까지 강화가능합니다");
      return;
    }

    const success = Math.random() * 100 <= successPercent;
    if (success) {
      onUpgradeSuccess();
    } else {
      onUpgradeFail();
    }

    setIngredientPlayers([]);

    setTimeout(() => {
      setZoomIn(false);
    }, 500);
  };

  const onUpgradeSuccess = () => {
    const { overall, grade } = targetPlayer;
    const nextGrade = grade + 1;

    setUpgradeSuccess(true);
    setZoomIn(true);

    setTargetPlayer({ ...targetPlayer, grade: nextGrade, overall: overall + getPlusOverallFromGrade(nextGrade) });

    const profit = totalPrice.profit - totalIngredientPrice + (priceList[nextGrade - 1].price - priceList[grade - 1].price);
    setTotalPrice({ used: totalPrice.used + totalIngredientPrice, profit });
  };

  const onUpgradeFail = () => {
    const prevGrade = grade === 1 ? 1 : grade - 1;
    const downGrade = Math.floor(Math.random() * prevGrade) + 1;
    let downGradeOvr = overall;
    for (let i = grade; i > downGrade; i--) {
      downGradeOvr -= getPlusOverallFromGrade(i);
    }
    setUpgradeSuccess(false);
    setTargetPlayer({ ...targetPlayer, grade: downGrade, overall: downGradeOvr });

    const profit = totalPrice.profit - totalIngredientPrice;
    setTotalPrice({ used: totalPrice.used + totalIngredientPrice, profit });
  };

  return (
    <div>
      <div className={" border border-gray-300 rounded-lg p-5 flex flex-col items-center "}>
        <div className={"w-full"}>
          <div className={"text-center pb-3"}>
            {upgradeSuccess === true ? (
              <div className={"flex justify-center items-center"}>
                <PlayerWithSeason playerName={playerName} seasonImgUrl={season.imageUrl} />
                <p className={"ml-1 font-semibold"}>선수</p>
                <img className={"h-5 mx-2"} src={`/images/strong/${grade}.png`} />
                <p className={"font-semibold mr-1"}> 강화에 </p>
                <p className={"font-bold mr-1 text-blue-600"}> 성공</p>
                <p className={"font-semibold"}> 하셨습니다!</p>
              </div>
            ) : upgradeSuccess === false ? (
              <div className={"flex justify-center items-center"}>
                <PlayerWithSeason playerName={playerName} seasonImgUrl={season.imageUrl} />
                <p className={"ml-1 font-semibold"}>선수</p>
                {/*<img className={"h-5 mx-2"} src={`/images/strong/${grade + 1}.png`} />*/}
                <p className={"font-semibold mr-1"}> 강화에 </p>
                <p className={"font-bold mr-1 text-red-500"}> 실패</p>
                <p className={"font-semibold mr-2"}> 하셨습니다!</p>
                <p className={"font-semibold mr-1"}> 강화등급이 </p>
                <img className={"h-5 mx-2"} src={`/images/strong/${grade}.png`} />
                <p className={"font-semibold"}> 로 떨어졌습니다.</p>
              </div>
            ) : null}
          </div>
          <div className={`flex w-full transition-all duration-500 ${zoomIn ? "scale-125" : "scale-100"}`}>
            <div className={"flex flex-col items-center w-1/3"}>
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common/playersAction/p${playerId}.png`}
              />
              <PlayerWithSeason playerName={playerName} seasonImgUrl={season.imageUrl} />
              <PlayerPositions positions={positions} plusGrade={targetPlayer.grade} />
              <p className={"pt-1 text-bp font-semibold"}>{convertPriceFormat(priceList[grade - 1].price)} BP</p>
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
                        <p className={"text-bp font-semibold text-base"}>{convertPriceFormat(priceList?.[grade]?.price || 0)} BP</p>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                        능력치
                      </th>
                      <td className="px-6 py-4 flex space-x-1 items-center">
                        <p className={"font-semibold text-lg"}>{overall + getPlusOverallFromGrade(grade)} </p>
                        <p className={"font-semibold text-lg text-orange-600"}>+</p>
                        <p className={"font-semibold text-lg text-orange-600"}>{getPlusOverallFromGrade(grade + 1)}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                  <p className={"text-bp font-semibold text-base"}>{convertPriceFormat(totalPrice.used)} BP</p>
                </td>
                <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                  누적 수익 BP
                </th>
                <td className="px-6 py-4 flex space-x-2 justify-center">
                  <p className={`${totalPrice.profit >= 0 ? "text-bp" : "text-red-500"} font-semibold text-base`}>
                    {convertPriceFormat(totalPrice.profit)} BP
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex mt-4 md:mt-6 space-x-4">
          <button
            className={`inline-flex items-center px-4 py-2 text-lg font-medium text-center text-white rounded-lg ${successPercent === 0 ? "bg-gray-300" : "bg-gray-700 hover:bg-gray-500"}`}
            onClick={goUpgrade}
          >
            강화하기
          </button>
          <button
            className={`inline-flex items-center px-4 py-2 text-lg font-medium text-center text-gray-900 bg-white border rounded-lg border-gray-300 hover:bg-gray-100`}
            onClick={resetPlayer}
          >
            초기화
          </button>
        </div>
      </div>
      <IngredientCardList ingredientPlayers={ingredientPlayers} setIngredientPlayers={setIngredientPlayers} />
      <UpgradePercentBar targetPlayer={targetPlayer} ingredientPlayers={ingredientPlayers} successPercent={successPercent.toFixed(1)} />
    </div>
  );
}
