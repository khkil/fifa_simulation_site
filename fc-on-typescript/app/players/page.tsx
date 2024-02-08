"use client";

import { Key, useEffect } from "react";
import PlayerTable from "@/app/players/_components/PlayerTable";
import useSWRInfinite from "swr/infinite";
import { fetchPlayers } from "@/app/_service/playerService";
import { Pageable } from "@/app/_types/pageable";

const getKey = (pageIndex: number) => {
  return `/users?page=${pageIndex}&limit=10`; // SWR 키
};

//https://klloo.github.io/swr-pagination/
export default function PlayerListPage() {
  const { data, size, setSize } = useSWRInfinite(getKey, () => fetchPlayers());

  return <div>{data?.map((v: object, index: Key) => <PlayerTable key={index} playerList={v?.content} />)}</div>;
  //<PlayerTable playerList={content} />
}
