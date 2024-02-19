import SearchBar from "@/app/_components/ui/SearchBar";
import { Key, useEffect, useState } from "react";
import { Player, PlayerSearchParams, UpgradeTargetPlayer } from "@/app/_types/player";
import useSWRInfinite from "swr/infinite";
import { fetchPlayers } from "@/app/_service/playerService";
import { useInView } from "react-intersection-observer";
import PlayerImage from "@/app/_components/player/PlayerImage";
import PlayerWithSeason from "@/app/_components/player/PlayerWithSeason";
import PlayerPositions from "@/app/_components/player/PlayerPositions";
import PlayerGrades from "@/app/_components/player/PlayerGrades";
import Loader from "@/app/_components/ui/Loader";
import NoResults from "@/app/_components/ui/NoResults";
import { PageResponse } from "@/app/_types/pageable";

interface Props {
  setTargetPlayer: (player: UpgradeTargetPlayer) => void;
}
export default function TargetPlayerList({ setTargetPlayer }: Props) {
  const getPageKey = (pageIndex = 1) => {
    return pageIndex.toString();
  };

  const [params, setParams] = useState<PlayerSearchParams>({});
  const { data, size, setSize, isLoading, mutate, isValidating } = useSWRInfinite<PageResponse, 1>(
    getPageKey,
    (page) => fetchPlayers({ page: parseInt(page) + 1, size: 15, ...params }),
    {
      revalidateFirstPage: false,
    },
  );
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && !isLoading) {
      setSize(size + 1);
    }
  }, [inView]);

  useEffect(() => {
    mutate();
  }, [params]);

  return (
    <div>
      <SearchBar
        placeholder={"선수명을 입력해주세요."}
        onSubmit={(playerName) => {
          setParams({ ...params, name: playerName });
        }}
      />
      <div className={"h-[52rem] overflow-y-auto mt-10 border border-gray-300 rounded-xl"}>
        {isLoading || isValidating ? (
          <Loader useScreenHeight={false} />
        ) : data?.[0].size === 0 ? (
          <NoResults text={"일치하는 선수가 없습니다."} />
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <tbody>
              {data?.map(({ content }) =>
                content.map((player: Player, index: Key) => <TargetPlayerRow key={player.spId} player={player} setTargetPlayer={setTargetPlayer} />),
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const TargetPlayerRow = ({
  player: {
    spId,
    playerName,
    positions,
    maxOverall,
    season: { imageUrl },
  },
  setTargetPlayer,
}: {
  player: Player;
  setTargetPlayer: (player: UpgradeTargetPlayer) => void;
}) => {
  const [grade, setGrade] = useState<number>(1);

  const selectPlayer = () => {
    setTargetPlayer({ playerId: spId, grade: grade, overall: maxOverall });
  };
  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-200 cursor-pointer">
      <td className="px-4 py-4">
        <PlayerGrades grade={grade} setGrade={setGrade} />
      </td>
      <td className="flex items-center py-4 text-gray-900 whitespace-nowrap">
        <div className="px-4">
          <PlayerImage spId={spId} />
        </div>
        <div>
          <PlayerWithSeason seasonImgUrl={imageUrl} playerName={playerName} />
          <PlayerPositions positions={positions} />
        </div>
      </td>
      <td className="px-4 py-4 text-right">
        <button
          type="button"
          className="text-white bg-gray-700 hover:bg-gray-400  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={selectPlayer}
        >
          선택
        </button>
      </td>
    </tr>
  );
};
