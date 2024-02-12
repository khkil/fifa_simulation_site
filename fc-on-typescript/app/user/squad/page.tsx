"use client";

import NicknameSearchBox from "@/app/_components/ui/SearchBar";
import FieldArea from "./_components/profile/FieldArea";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { Season } from "@/app/_types/season";
import { fetchSeasons } from "@/app/_service/playerService";
import { fetchUserSquad } from "@/app/_service/userService";
import { UserSquad } from "@/app/_types/user";
import { UserProfile } from "@/app/user/squad/_components/profile/UserProfile";
import FieldPlayers from "@/app/user/squad/_components/information/FieldPlayers";
import SquadTab from "@/app/user/squad/_components/SquadTab";
import PriceGraph from "@/app/user/squad/_components/information/PriceGraph";

const data: UserSquad = {
  formation: "4-2-2-2",
  totalPay: 255,
  maintotalPrice: "13,206,000,000,000",
  ovr: {
    df: 120,
    fw: 129,
    mf: 126,
    total: 122,
  },
  players: [
    {
      spid: 221189342,
      pid: 189342,
      name: "카를로 핀솔리오",
      role: "gk",
      ovr: 99,
      pay: 5,
      buildUp: 8,
      price: "325,000,000,000",
      thumb: "/players/p189342.png?rd=202402111150",
      x: 50.0,
      y: -31.30000000000001,
    },
    {
      spid: 254214100,
      pid: 214100,
      name: "루드 굴리트",
      role: "ldm",
      ovr: 124,
      pay: 26,
      buildUp: 7,
      price: "197,000,000,000",
      thumb: "/playersAction/p254214100.png?rd=202402111150",
      x: 35.0,
      y: 33.0,
    },
    {
      spid: 268001075,
      pid: 1075,
      name: "A. 델피에로",
      role: "rm",
      ovr: 128,
      pay: 25,
      buildUp: 7,
      price: "906,000,000,000",
      thumb: "/playersAction/p268001075.png?rd=202402111150",
      x: 80.62,
      y: 67.0,
    },
    {
      spid: 268006235,
      pid: 6235,
      name: "파벨 네드베드",
      role: "lm",
      ovr: 128,
      pay: 25,
      buildUp: 7,
      price: "879,000,000,000",
      thumb: "/playersAction/p268006235.png?rd=202402111150",
      x: 19.37,
      y: 67.0,
    },
    {
      spid: 100247703,
      pid: 247703,
      name: "이언 러시",
      role: "rs",
      ovr: 129,
      pay: 30,
      buildUp: 2,
      price: "2,200,000,000,000",
      thumb: "/playersAction/p100247703.png?rd=202402111150",
      x: 60.0,
      y: 87.0,
    },
    {
      spid: 110013128,
      pid: 13128,
      name: "안드리 셰우첸코",
      role: "ls",
      ovr: 129,
      pay: 42,
      buildUp: 1,
      price: "5,020,000,000,000",
      thumb: "/playersAction/p110013128.png?rd=202402111150",
      x: 39.0,
      y: 87.0,
    },
    {
      spid: 260193082,
      pid: 193082,
      name: "후안 콰드라도",
      role: "rwb",
      ovr: 119,
      pay: 19,
      buildUp: 7,
      price: "171,000,000,000",
      thumb: "/playersAction/p260193082.png?rd=202402111150",
      x: 94.5,
      y: 22.0,
    },
    {
      spid: 280232756,
      pid: 232756,
      name: "피카요 토모리",
      role: "rcb",
      ovr: 120,
      pay: 17,
      buildUp: 8,
      price: "272,000,000,000",
      thumb: "/playersAction/p280232756.png?rd=202402111150",
      x: 65.0,
      y: 15.0,
    },
    {
      spid: 242205452,
      pid: 205452,
      name: "안토니오 뤼디거",
      role: "lcb",
      ovr: 120,
      pay: 16,
      buildUp: 8,
      price: "721,000,000,000",
      thumb: "/playersAction/p242205452.png?rd=202402111150",
      x: 35.0,
      y: 15.0,
    },
    {
      spid: 265243237,
      pid: 243237,
      name: "루카 펠레그리니",
      role: "lwb",
      ovr: 122,
      pay: 19,
      buildUp: 8,
      price: "365,000,000,000",
      thumb: "/playersAction/p265243237.png?rd=202402111150",
      x: 5.5,
      y: 22.0,
    },
    {
      spid: 100005471,
      pid: 5471,
      name: "프랭크 램파드",
      role: "rdm",
      ovr: 124,
      pay: 31,
      buildUp: 2,
      price: "2,150,000,000,000",
      thumb: "/playersAction/p100005471.png?rd=202402111150",
      x: 65.0,
      y: 33.0,
    },
    {
      spid: 322265418,
      pid: 265418,
      name: "H. 소나",
      role: "CM",
      ovr: 53,
      pay: 5,
      buildUp: 1,
      price: "1,070",
      thumb: "/players/p265418.png?rd=202402111150",
      x: 0.0,
      y: 0.0,
    },
    {
      spid: 322264142,
      pid: 264142,
      name: "A. 도런",
      role: "ST",
      ovr: 51,
      pay: 5,
      buildUp: 1,
      price: "1,100",
      thumb: "/players/p264142.png?rd=202402111150",
      x: 0.0,
      y: 0.0,
    },
    {
      spid: 300263065,
      pid: 263065,
      name: "F. 로고",
      role: "CDM",
      ovr: 58,
      pay: 5,
      buildUp: 1,
      price: "1,010",
      thumb: "/players/p263065.png?rd=202402111150",
      x: 0.0,
      y: 0.0,
    },
    {
      spid: 276242619,
      pid: 242619,
      name: "셰이크 두쿠레",
      role: "CM",
      ovr: 104,
      pay: 19,
      buildUp: 2,
      price: "158,000,000",
      thumb: "/playersAction/p276242619.png?rd=202402111150",
      x: 0.0,
      y: 0.0,
    },
    {
      spid: 265242374,
      pid: 242374,
      name: "무사 바로",
      role: "CF",
      ovr: 106,
      pay: 21,
      buildUp: 1,
      price: "179,000,000",
      thumb: "/playersAction/p265242374.png?rd=202402111150",
      x: 0.0,
      y: 0.0,
    },
    {
      spid: 234190362,
      pid: 190362,
      name: "테무 푸키",
      role: "ST",
      ovr: 92,
      pay: 15,
      buildUp: 1,
      price: "40,500,000",
      thumb: "/playersAction/p234190362.png?rd=202402111150",
      x: 0.0,
      y: 0.0,
    },
    {
      spid: 256178603,
      pid: 178603,
      name: "마츠 후멜스",
      role: "CB",
      ovr: 109,
      pay: 24,
      buildUp: 2,
      price: "201,000,000",
      thumb: "/playersAction/p256178603.png?rd=202402111150",
      x: 0.0,
      y: 0.0,
    },
  ],
  totalPriceList: [
    {
      totalPrice: 12740686703170,
      date: "2024-01-30",
    },
    {
      totalPrice: 12632707203180,
      date: "2024-01-31",
    },
    {
      totalPrice: 12575710003190,
      date: "2024-02-01",
    },
    {
      totalPrice: 12888734203190,
      date: "2024-02-02",
    },
    {
      totalPrice: 12877750203160,
      date: "2024-02-03",
    },
    {
      totalPrice: 12723773203170,
      date: "2024-02-04",
    },
    {
      totalPrice: 12598730703170,
      date: "2024-02-05",
    },
    {
      totalPrice: 12494755103170,
      date: "2024-02-06",
    },
    {
      totalPrice: 12414772103170,
      date: "2024-02-07",
    },
    {
      totalPrice: 12478741403170,
      date: "2024-02-08",
    },
    {
      totalPrice: 12450696603170,
      date: "2024-02-09",
    },
    {
      totalPrice: 13150604103170,
      date: "2024-02-10",
    },
  ],
  totalTeamColor: {
    affiliation: {
      1003: {
        lv: 2,
        name: "첼시",
        skill: "전체 능력치 +3|",
        image: "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/crests/light/medium/l5.png",
        playercnt: 6,
        playerlist: [254214100, 110013128, 260193082, 280232756, 242205452, 100005471],
      },
      1021: {
        lv: 2,
        name: "유벤투스",
        skill: "전체 능력치 +3|",
        image: "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/crests/light/medium/l45.png",
        playercnt: 5,
        playerlist: [221189342, 268001075, 268006235, 100247703, 265243237],
      },
    },
    enhance: {
      10002: {
        lv: 2,
        name: "은빛 물결",
        skill: "전체 능력치 +2|",
        image: "https://ssl.nexon.com/s2/game/fo4/obt/datacenter/teamcolor/tc_u_s.png",
        playercnt: 8,
        playerlist: [221189342, 254214100, 268001075, 268006235, 260193082, 280232756, 242205452, 265243237],
      },
    },
  },
};

export default function UserSquadPage() {
  const searchParams = useSearchParams();
  const nickname: string = useMemo(() => searchParams.get("nickname") || "", [searchParams]);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const { data: seasons, isLoading: isLoadingSeason } = useSWR<Season[]>("seasons", fetchSeasons);
  //const { data: squad, isLoading: isLoadingSquad } = useSWR<UserSquad, Error>(`squad_${nickname}`, () => fetchUserSquad(nickname));

  return (
    <div>
      <NicknameSearchBox />
      {nickname && seasons ? (
        isLoadingSeason /*|| isLoadingSquad*/ ? (
          <div>로딩 </div>
        ) : (
          <div className={"pt-5"}>
            <SquadTab tabIndex={tabIndex} setTabIndex={setTabIndex} />
            <div className={"pt-2"}>
              {tabIndex === 0 ? (
                <div className="flex space-x-10">
                  <div className="w-1/2">
                    <UserProfile nickname={nickname} squad={data} />
                  </div>
                  <div className="w-1/2">
                    <FieldArea nickname={nickname} seasons={seasons} squad={data} />
                  </div>
                </div>
              ) : (
                <div className={"pt-2"}>
                  <FieldPlayers players={data.players} seasons={seasons} />
                  <PriceGraph />
                </div>
              )}
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}
