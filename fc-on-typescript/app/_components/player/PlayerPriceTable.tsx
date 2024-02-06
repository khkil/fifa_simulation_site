import { fetchPlayerPriceRank } from "@/app/_service/playerService";
import { Theme } from "@/app/_types";
import { convertKorPriceFormat, convertPriceFormat } from "@/app/_utils";
import Alert from "../ui/Alert";
import CustomImage from "./PlayerImage";
import PlayerWithSeason from "./PlayerWithSeason";

interface Props {
  title: string;
  theme: Theme;
  sort?: string;
}

export default async function PlayerPriceTable({ theme, title, sort }: Props) {
  const {
    data: playerPriceList,
  }: {
    data: Array<PlayerPriceRank>;
  } = await fetchPlayerPriceRank({ sort });

  return (
    <div className="w-full">
      <Alert theme={theme} title={title} />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg common_border">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                선수명
              </th>
              <th scope="col" className="px-6 py-3">
                변동금액(%)
              </th>
              <th scope="col" className="px-6 py-3">
                현재 가격
              </th>
            </tr>
          </thead>
          <tbody>
            {playerPriceList.map(({ playerId, seasonImgUrl, playerName, todayPrice, yesterdayPrice, percentage }: PlayerPriceRank) => (
              <tr className="odd:bg-white even:bg-gray-50  border-b ">
                <th scope="row" className="flex items-center py-4 text-gray-900 whitespace-nowrap ">
                  <div className="mx-4">
                    <CustomImage spId={playerId} />
                  </div>
                  <PlayerWithSeason seasonImgUrl={seasonImgUrl} playerName={playerName} />
                </th>
                <td className="px-6 py-4 text-center">
                  <div>
                    <span className={`font-bold ${percentage > 0 ? "text-blue-500" : "text-red-600"}`}>
                      {percentage > 0 ? "+" : ""}
                      {percentage}%
                    </span>
                    <div className="text-center">{convertPriceFormat(todayPrice - yesterdayPrice)}BP</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div>
                    <span className="text-slate-800">{convertPriceFormat(todayPrice)}BP</span>
                  </div>
                  <span>{convertKorPriceFormat(todayPrice)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
