import { fetchPlayerPriceRank } from "@/app/_service/playerService";
import { Theme } from "@/app/_types";
import Alert from "../ui/Alert";
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
  } = await fetchPlayerPriceRank();

  return (
    <div className="w-full">
      <Alert theme={theme} title={title} />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg common_border">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
            {playerPriceList.map(({ seasonImgUrl, playerName }: PlayerPriceRank) => (
              <tr className="odd:bg-white even:bg-gray-50  border-b ">
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
                  <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                  <PlayerWithSeason seasonImgUrl={seasonImgUrl} playerName={playerName} />
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
