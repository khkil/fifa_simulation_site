"use client";

import NicknameSearchBox from "@/app/_components/ui/SearchBar";
import FieldArea from "./_components/profile/FieldArea";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { Season } from "@/app/_types/season";
import { fetchSeasons } from "@/app/_service/playerService";
import { UserSquad } from "@/app/_types/user";
import { UserProfile } from "@/app/user/squad/_components/profile/UserProfile";
import FieldPlayers from "@/app/user/squad/_components/information/FieldPlayers";
import SquadTab from "@/app/user/squad/_components/SquadTab";
import { fetchUserSquad } from "@/app/_service/userService";
import Loader from "@/app/_components/ui/Loader";
import SquadError from "@/app/user/match/error";
import dynamic from "next/dynamic";

const WeeklyPriceGraph = dynamic(() => import("@/app/user/squad/_components/information/WeeklyPriceGraph"), { ssr: false });
const PositionPriceGraph = dynamic(() => import("@/app/user/squad/_components/information/PositionPriceGraph"), { ssr: false });

export default function UserSquadPage() {
  const searchParams = useSearchParams();
  const nickname: string = useMemo(() => searchParams.get("nickname") || "", [searchParams]);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const {
    data: seasons,
    isLoading: isLoadingSeason,
    error: seasonError,
  } = useSWR<Season[], Error>("seasons", nickname ? fetchSeasons : null, {
    revalidateOnFocus: false,
  });
  const {
    data: squad,
    isLoading: isLoadingSquad,
    error: squadError,
  } = useSWR<UserSquad, Error>(`squad_${nickname}`, nickname ? () => fetchUserSquad(nickname) : null, {
    revalidateOnFocus: false,
  });

  const isLoading = useMemo<boolean>(() => isLoadingSeason || isLoadingSquad, [isLoadingSeason, isLoadingSquad]);

  return (
    <div>
      <NicknameSearchBox />
      {!nickname ? null : isLoading ? (
        <Loader description={"스쿼드를 불러오는 중입니다. 잠시만 기다려주세요."} />
      ) : seasons && squad ? (
        <div className={"pt-5"}>
          <SquadTab tabIndex={tabIndex} setTabIndex={setTabIndex} />
          <div className={"pt-2"}>
            {tabIndex === 0 ? (
              <div className="flex space-x-10">
                <div className="w-1/2">
                  <UserProfile nickname={nickname} squad={squad} />
                </div>
                <div className="w-1/2">
                  <FieldArea nickname={nickname} seasons={seasons} squad={squad} />
                </div>
              </div>
            ) : tabIndex === 1 ? (
              <div className="flex space-x-10">
                <div className="w-1/2">
                  <FieldPlayers players={squad.players} seasons={seasons} />
                </div>
                <div className="w-1/2">
                  <WeeklyPriceGraph totalPriceList={squad.totalPriceList} />
                  <PositionPriceGraph players={squad.players} />
                </div>
              </div>
            ) : (
              <div>asd</div>
            )}
          </div>
        </div>
      ) : (
        <SquadError error={seasonError || squadError} />
      )}
    </div>
  );
}
