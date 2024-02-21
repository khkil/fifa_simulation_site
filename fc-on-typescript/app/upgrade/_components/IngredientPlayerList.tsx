import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { Season } from "@/app/_types/season";
import { fetchPlayers, fetchPlayersByOverall, fetchSeasons } from "@/app/_service/playerService";
import { PageResponse } from "@/app/_types/pageable";
import { Player, PlayerByOverall } from "@/app/_types/player";
import Loader from "@/app/_components/ui/Loader";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";
import PlayerWithSeason from "@/app/_components/player/PlayerWithSeason";
import PlayerPositions from "@/app/_components/player/PlayerPositions";
import { convertPriceFormat } from "@/app/_utils";
import NotFound from "@/app/not-found";
import NoResults from "@/app/_components/ui/NoResults";

interface Props {
  playerOverall: number;
}

export default function IngredientPlayerList({ playerOverall }: Props) {
  const [overall, setOverall] = useState(playerOverall - 1);
  const [ref, inView] = useInView();

  const getPageKey = (page = 1) => {
    return {
      key: `players_${overall}_${page}`,
      page,
    };
  };

  const { data, size, setSize, isLoading, mutate, isValidating } = useSWRInfinite<PageResponse<PlayerByOverall>, Error>(
    getPageKey,
    (page) => fetchPlayersByOverall(overall, { page: parseInt(page) + 1, size: 10 }),
    {
      revalidateFirstPage: false,
    },
  );

  const notFound = useMemo(() => data?.[0]?.totalPages === 0 || false, [data]);

  useEffect(() => {
    if (inView && !isLoading) {
      setSize(size + 1);
    }
  }, [inView]);

  return (
    <div>
      <OverallRangeSlider playerOverall={playerOverall} overall={overall} setOverall={setOverall} />
      <div className={"h-[52rem] overflow-y-auto border border-gray-300 rounded-lg"}>
        {isLoading ? (
          <Loader useScreenHeight={false} />
        ) : !notFound ? (
          <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead>
                <tr>
                  <th scope="col" className="py-3 w-2/12 text-center">
                    강화등급
                  </th>
                  <th scope="col" className="py-3 w-7/12">
                    선수정보
                  </th>
                  <th scope="col" className="py-3 w-3/12 pl-9">
                    수량
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((v) =>
                  v.content.map((playerByOverall: PlayerByOverall) => (
                    <IngredientPlayerRow key={playerByOverall.spId} playerByOverall={playerByOverall} />
                  )),
                )}
              </tbody>
            </table>
            <div ref={ref}></div>
          </div>
        ) : (
          <NoResults text={"일치하는 선수가 없습니다."} />
        )}
      </div>
    </div>
  );
}

const OverallRangeSlider = ({
  playerOverall,
  overall,
  setOverall,
}: {
  playerOverall: number;
  overall: number;
  setOverall: (ovr: number) => void;
}) => {
  return (
    <div className={"pb-5"}>
      <label htmlFor="steps-range" className="block mb-2 text-sm font-medium text-gray-900">
        <span className={"font-semibold"}>강화재료 오버롤 : </span>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">{overall}</span>
      </label>

      <input
        id="steps-range"
        type="range"
        min={playerOverall - 10}
        max={playerOverall + 10}
        value={overall}
        step={1}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        onChange={(e) => {
          setOverall(parseInt(e.target.value));
        }}
      />
    </div>
  );
};

const IngredientPlayerRow = ({
  playerByOverall: {
    playerName,
    grade,
    price,
    season: { imageUrl },
    positions,
  },
}: {
  playerByOverall: PlayerByOverall;
}) => {
  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-200 cursor-pointer">
      <td className="py-2 w-2/12">
        <div className={"flex justify-center"}>
          <img className={"h-5"} src={`/images/strong/${grade}.png`} />
        </div>
      </td>
      <td className="py-2 w-7/12">
        <div>
          <PlayerWithSeason playerName={playerName} seasonImgUrl={imageUrl} />
          <PlayerPositions positions={positions} />
          <p className={"text-bp font-medium"}>{convertPriceFormat(price)} BP</p>
        </div>
      </td>
      <td className="py-2 w-3/12">
        <div className="custom-number-input h-10 w-24">
          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button
              data-action="decrement"
              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none border-0 border-r border-gray-200"
              onClick={() => {}}
            >
              <span className="m-auto text-2xl font-thin">−</span>
            </button>
            <div className="w-full bg-gray-300 font-semibold text-md flex justify-center items-center">0</div>
            <button
              data-action="increment"
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer border-l border-gray-200"
              onClick={() => {}}
            >
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};
