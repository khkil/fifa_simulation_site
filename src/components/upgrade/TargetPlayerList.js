import { fetchPlayers } from "@/services/playerSerivce";
import { convertPriceFormat } from "@/utils";
import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import CustomImage from "../common/CustomImage";
import Grades from "../players/Grades";
import Positions from "../players/Positions";

const TargetPlayerList = ({ setSelectPlayer }) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching, isLoading, isError } = useInfiniteQuery(
    ["players"],
    ({ pageParam = 1 }) => fetchPlayers({ page: pageParam, size: 15 }),
    {
      getNextPageParam: ({ last }, allPages) => (!last ? allPages.length + 1 : undefined),
    }
  );

  const pages = useMemo(() => data?.pages || [], [data]);

  return (
    <div>
      <InfiniteScroll hasMore={hasNextPage} loadMore={() => !isFetchingNextPage && fetchNextPage()}>
        <SearchBar />
        <PlayerList pages={pages} setSelectPlayer={setSelectPlayer} />
      </InfiniteScroll>
    </div>
  );
};

const SearchBar = () => {
  return (
    <form>
      <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  dark:bg-slate-100 ring-0"
          placeholder="선수명을 검색해주세요"
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-lime-950 hover:bg-lime-800 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-6 py-2 "
        >
          검색
        </button>
      </div>
    </form>
  );
};

const PlayerList = ({ pages, setSelectPlayer }) => {
  return (
    <div className="relative  shadow-md sm:rounded-lg mt-3">
      <table className="table-auto w-full">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              강화등급
            </th>
            <th scope="col" className="py-3">
              선수정보
            </th>
            <th scope="col" className="px-3 py-3 alg" width={150}></th>
          </tr>
        </thead>
        <tbody>
          {pages.map(({ content }) =>
            content?.map((player, index) => <Player index={index} key={player.spId} player={player} setSelectPlayer={setSelectPlayer} />)
          )}
        </tbody>
      </table>
    </div>
  );
};

const Player = ({
  index,
  player: {
    spId,
    playerName,
    positions,
    priceList,
    season: { id: seasonId, imageUrl: seasonImageUrl },
  },
  setSelectPlayer,
}) => {
  const [grade, setGrade] = useState(1);
  const priceFromGrade = useMemo(() => priceList[grade - 1]?.price || 0, [grade]);

  const selectPlayer = (playerId) => {
    setSelectPlayer({ playerId, grade });
  };

  return (
    <tr className="odd:bg-white  even:bg-gray-50">
      <td>
        <div className="flex items-center justify-center">
          <Grades grade={grade} setGrade={setGrade} index={index} />
        </div>
      </td>
      <td className="py-4">
        <div className="flex">
          <CustomImage
            width={70}
            height={70}
            src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common/playersAction/p${spId}.png`}
            spId={spId}
            seasonId={seasonId}
          />
          <div className="p-2">
            <div className="flex">
              <img style={{ height: 20, paddingRight: 5 }} src={seasonImageUrl} />
              <p className="text-black text-base font-bold">{playerName}</p>
            </div>
            <div className="flex">
              <Positions positions={positions} plusGrade={grade} />
            </div>
            <div>{convertPriceFormat(priceFromGrade)}BP</div>
          </div>
        </div>
      </td>
      <td className="px-3 py-4">
        <div className="flex justify-end">
          <button
            type="button"
            class="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
            onClick={() => {
              selectPlayer(spId);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
              />
            </svg>

            <span class="sr-only">Icon description</span>
          </button>
        </div>
      </td>
    </tr>
  );
};
export default TargetPlayerList;
