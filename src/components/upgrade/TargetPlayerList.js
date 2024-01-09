import { fetchAllPlayers } from "@/services/playerSerivce";
import { convertPriceFormat, getPlusStatFromGrade, getPositionGroup } from "@/utils";
import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import CustomImage from "../common/CustomImage";

const TargetPlayerList = () => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching, isLoading, isError } = useInfiniteQuery(
    ["players"],
    ({ pageParam = 1 }) => fetchAllPlayers({ page: pageParam, size: 15 }),
    {
      getNextPageParam: ({ last }, allPages) => (!last ? allPages.length + 1 : undefined),
    }
  );

  const pages = useMemo(() => data?.pages || [], [data]);

  return (
    <div>
      <InfiniteScroll hasMore={hasNextPage} loadMore={() => !isFetchingNextPage && fetchNextPage()}>
        <SearchBar />
        <PlayerList pages={pages} />
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

const PlayerList = ({ pages }) => {
  return (
    <div className="relative  shadow-md sm:rounded-lg mt-3">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              강화등급
            </th>
            <th scope="col" className="py-3">
              선수정보
            </th>
            <th scope="col" className="px-3 py-3" width={150}></th>
          </tr>
        </thead>
        <tbody>{pages.map(({ content }) => content?.map((player) => <Player key={player.spId} player={player} />))}</tbody>
      </table>
    </div>
  );
};

const Player = ({
  player: {
    spId,
    playerName,
    positions,
    priceList,
    season: { id: seasonId, imageUrl: seasonImageUrl },
  },
}) => {
  const [grade, setGrade] = useState(1);
  const priceFromGrade = useMemo(() => priceList[grade - 1]?.price || 0, [grade]);

  return (
    <tr className="odd:bg-white  even:bg-gray-50 ">
      <td>
        <div className="flex px-3">
          <div className="dropdown">
            <div tabIndex={grade} role="button" className="btn">
              <img src={`/images/strong/${grade}.png`} onClick={() => {}} />
            </div>
            <ul tabIndex={grade} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box">
              {Array.from({ length: 10 }, (_, index) => index + 1).map((v) => (
                <li key={v}>
                  <a
                    onClick={() => {
                      setGrade(v);
                    }}
                  >
                    <img key={v} src={`/images/strong/${v}.png`} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
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
              {positions.map(({ positionName, overall }) => (
                <div className="flex mr-2">
                  <p className={`text-${getPositionGroup(positionName)} text-base`}>{positionName}</p>
                  <p className="text-base">{overall + getPlusStatFromGrade(grade)}</p>
                </div>
              ))}
            </div>
            <div>{convertPriceFormat(priceFromGrade)}BP</div>
          </div>
        </div>
      </td>
      <td className="px-3 py-4">
        <button
          type="button"
          className="text-white end-2.5 bottom-2.5 bg-lime-950 hover:bg-lime-800 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-2 py-1 "
        >
          {"선택"}
        </button>
      </td>
    </tr>
  );
};
export default TargetPlayerList;
