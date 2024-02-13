"use client";

import NicknameSearchBox from "@/app/_components/ui/SearchBar";
import { fetchUserMatches } from "@/app/_service/userService";
import { useSearchParams } from "next/navigation";
import { Key, useEffect, useMemo } from "react";
import Loader from "@/app/_components/ui/Loader";
import SquadError from "@/app/user/squad/error";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";
import Match from "@/app/_types/match";
import MatchRow from "@/app/user/_components/MatchRow";
import { Player } from "@/app/_types/player";
import PlayerRow from "@/app/players/_components/PlayerRow";

const getPageKey = (pageIndex = 1) => {
  return pageIndex.toString();
};
export default function UserMatchListPage() {
  const searchParams = useSearchParams();
  const nickname: string = useMemo(() => searchParams.get("nickname") || "", [searchParams]);

  const { data, size, setSize, isLoading, error } = useSWRInfinite(
    getPageKey,
    (page) => (!nickname ? null : fetchUserMatches({ nickname, matchType: 50, page: parseInt(page) + 1 })),
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

  return (
    <div>
      <NicknameSearchBox />
      {!nickname ? null : isLoading ? (
        <Loader description={"매치결과를 불러오는 중입니다. 잠시만 기다려주세요."} />
      ) : data ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg common_border mt-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <tbody>
              {/*{data?.map((match: Match) => <MatchRow key={match.matchId} match={match} />)}*/}
              {data?.map((matches: Match[]) => matches?.map((match: Match, index: Key) => <MatchRow key={index} match={match} />))}
            </tbody>
          </table>
        </div>
      ) : (
        <SquadError error={error} />
      )}
      <div ref={ref}></div>
    </div>
  );
}
