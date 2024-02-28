"use client";

import { Key, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { fetchPlayers } from "@/app/_service/playerService";
import { useInView } from "react-intersection-observer";
import { Player, PlayerSearchParams } from "@/app/_types/player";
import PlayerRow from "@/app/players/_components/PlayerRow";
import PlayerSearchBoxes from "@/app/players/_components/PlayerSearchBoxes";

export default function PlayerListPage() {
  const getPageKey = (pageIndex = 1) => {
    return pageIndex.toString();
  };

  const [params, setParams] = useState<PlayerSearchParams>({});
  const { data, size, setSize, isLoading, mutate } = useSWRInfinite(
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

  // @ts-ignore
  return (
    <div>
      <PlayerSearchBoxes params={params} setParams={setParams} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg common_border">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
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
          <tbody>
            {data?.map((v: object) =>
              (v as { content: Player[] }).content.map((player: Player, index: Key) => <PlayerRow key={index} player={player} />),
            )}
          </tbody>
        </table>
      </div>
      <div ref={ref}></div>
    </div>
  );
  //<PlayerTable playerList={content} />
}
