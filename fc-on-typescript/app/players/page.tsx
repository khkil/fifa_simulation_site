"use client";

import { Key, useEffect } from "react";
import PlayerTable from "@/app/players/_components/PlayerTable";
import { fetchPlayers } from "@/app/_service/playerService";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";
import { Player } from "@/app/_types/player";
import PlayerRow from "@/app/players/_components/PlayerRow";

const getPageKey = (pageIndex = 1) => {
  return pageIndex.toString();
};

//https://klloo.github.io/swr-pagination/
export default function PlayerListPage() {
  const { data, size, setSize, isLoading } = useSWRInfinite(getPageKey, (page) => fetchPlayers({ page: parseInt(page) + 1, size: 15 }), {
    revalidateFirstPage: false,
  });
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && !isLoading) {
      setSize(size + 1);
    }
  }, [inView]);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg common_border">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-4 py-3">
                선수명
              </th>
              <th scope="col" className="px-4 py-3">
                강화
              </th>
              <th scope="col" className="px-4 py-3">
                급여
              </th>
              <th scope="col" className="px-4 py-3">
                스피드
              </th>
              <th scope="col" className="px-4 py-3">
                슛
              </th>
              <th scope="col" className="px-4 py-3">
                패스
              </th>
              <th scope="col" className="px-4 py-3">
                드리블
              </th>
              <th scope="col" className="px-4 py-3">
                피지컬
              </th>
              <th scope="col" className="px-4 py-3">
                수비
              </th>
              <th scope="col" className="px-4 py-3">
                현재가격
              </th>
            </tr>
          </thead>
          <tbody>{data?.map((v: object) => v?.content.map((player: Player, index: Key) => <PlayerRow key={index} player={player} />))}</tbody>
        </table>
      </div>
      <div ref={ref}></div>
    </div>
  );
  //<PlayerTable playerList={content} />
}
