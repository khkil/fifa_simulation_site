"use client";

import NicknameSearchBox from "@/app/_components/ui/SearchBar";
import { fetchUserMatches } from "@/app/_service/userService";
import { useSearchParams } from "next/navigation";
import { Key, useEffect, useMemo, useState } from "react";
import Loader from "@/app/_components/ui/Loader";
import SquadError from "@/app/user/match/error";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";
import Match from "@/app/_types/match";
import MatchRow from "@/app/user/match/_components/MatchRow";
import MatchError from "@/app/user/match/error";

export default function UserMatchListPage() {
  const searchParams = useSearchParams();
  const nickname: string = searchParams.get("nickname") || "";

  const getPageKey = (pageIndex = 1) => {
    if (!nickname) return null;
    return pageIndex.toString();
  };

  const { data, size, setSize, isLoading, isValidating, error } = useSWRInfinite(
    getPageKey,
    (page) => fetchUserMatches({ nickname, matchType: 50, page: parseInt(page) + 1 }),
    {
      revalidateFirstPage: false,
    },
  );
  const [ref, inView] = useInView();
  const [matchIds, setMatchIds] = useState<string[]>([]);

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
              {data?.map((matches: Match[]) =>
                matches?.map((match: Match, index: Key) => <MatchRow key={index} match={match} matchIds={matchIds} setMatchIds={setMatchIds} />),
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <MatchError error={error} />
      )}
      {isValidating ? (
        <div className={"h-24"}>
          <Loader useScreenHeight={false} />
        </div>
      ) : (
        <div ref={ref}></div>
      )}
    </div>
  );
}
