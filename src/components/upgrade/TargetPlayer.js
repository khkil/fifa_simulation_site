import { fetchPlayerDetail } from "@/services/playerSerivce";
import { useMemo } from "react";
import { useQuery } from "react-query";
import Loader from "../common/Loader";
import Positions from "../players/Positions";

const TargetPlayer = ({ selectPlayer: { playerId, grade } }) => {
  const { data, isLoading } = useQuery([`playerDetail`, playerId], () => fetchPlayerDetail(playerId), {
    enabled: !!playerId,
  });

  const { spId, playerName, season, priceList, positions } = useMemo(() => data || {}, [data]);
  //const price = useMemo(() => data?.priceList[grade] || 0, [priceList, grade]);

  return (
    <div className="mx-5 border border-gray-300 rounded-lg bg-gray-50 h-80 flex items-center justify-center">
      <div>
        {!playerId ? (
          <NotSelected />
        ) : isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-col items-center p-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common/playersAction/p${spId}.png`}
              alt={playerName}
            />
            <div className="flex items-center">
              <img src={season.imageUrl} className="mr-1 h-5" />
              <h5 className="mb-1 text-xl font-bold text-gray-900 mr-1">{playerName}</h5>
              <img src={`/images/strong/${grade}.png`} className="h-5" onClick={() => {}} />
            </div>
            <Positions positions={positions} />
            {/* {price} */}
            <div className="flex mt-4 md:mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add friend
              </a>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
              >
                Message
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NotSelected = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        class="flex-shrink-0 w-4 h-4 me-2 dark:text-gray-300"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <h3 class="text-xl font-medium text-gray-800 dark:text-gray-300">강화할 선수를 선택해주세요.</h3>
    </div>
  );
};

export default TargetPlayer;
