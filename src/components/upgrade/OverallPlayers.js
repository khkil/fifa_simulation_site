import { fetchPlayersByOverall } from "@/services/playerSerivce";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import CustomImage from "../common/CustomImage";
import Loader from "../common/Loader";
import Positions from "../players/Positions";
import Price from "../players/Price";

const overallPlayers = ({ ingredients, setIngredients, overall }) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching, isLoading, isError } = useInfiniteQuery(
    ["overallPlayers"],
    ({ pageParam = 1 }) => fetchPlayersByOverall({ overall, page: pageParam }),
    {
      getNextPageParam: ({ last }, allPages) => (!last ? allPages.length + 1 : undefined),
    }
  );

  const pages = useMemo(() => data?.pages || [], [data]);

  return (
    <div>
      <InfiniteScroll hasMore={hasNextPage} loadMore={() => !isFetchingNextPage && fetchNextPage()}>
        <SearchBar />
        {isLoading ? <Loader /> : <PlayerList pages={pages} ingredients={ingredients} setIngredients={setIngredients} />}
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

const Player = ({ player, ingredients, setIngredients }) => {
  const selectPlayer = () => {
    setIngredients([...ingredients, player]);
  };

  const addPlayer = () => {
    setIngredients([...ingredients, player]);
  };

  const count = useMemo(() => ingredients.filter(({ spId }) => spId === player.spId).length, [ingredients]);

  return (
    <tr className="odd:bg-white  even:bg-gray-50">
      <td width={150}>
        <div className="flex items-center justify-center">
          <img src={`/images/strong/${player.grade}.png`} />
        </div>
      </td>
      <td className="py-4">
        <div className="flex">
          <CustomImage
            width={70}
            height={70}
            src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common/playersAction/p${player.spId}.png`}
            spId={player.spId}
            seasonId={player.season.id}
          />
          <div className="p-2">
            <div className="flex">
              <img style={{ height: 20, paddingRight: 5 }} src={player.season.imageUrl} />
              <p className="text-black text-base font-bold">{player.playerName}</p>
            </div>
            <div className="flex">
              <Positions positions={player.positions} plusGrade={1} />
            </div>
            <Price price={player.price} />
          </div>
        </div>
      </td>
      <td className="px-3 py-4">
        <div class="custom-number-input h-10 w-24">
          <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button
              data-action="decrement"
              class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none border-0"
            >
              <span class="m-auto text-2xl font-thin">−</span>
            </button>
            <div type="text" class="w-full bg-gray-300 font-semibold text-md flex justify-center" name="custom-input-number">
              {count}
            </div>
            <button
              data-action="increment"
              class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
              onClick={addPlayer}
            >
              <span class="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

const PlayerList = ({ pages, ingredients, setIngredients }) => {
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
            content?.map((player, index) => <Player key={index} player={player} ingredients={ingredients} setIngredients={setIngredients} />)
          )}
        </tbody>
      </table>
    </div>
  );
};
export default overallPlayers;
