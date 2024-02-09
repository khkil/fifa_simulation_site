"use client";

import useSWR from "swr";
import { fetchUserSquad } from "@/app/_service/userService";
import { UserSquad } from "@/app/_types/user";
import { Season } from "@/app/_types/season";
import { fetchClubs } from "@/app/_service/playerService";
import Image from "next/image";
import PlayerPay from "@/app/_components/player/PlayerPay";
import { getPositionGroup } from "@/app/_utils";

export default function FieldPlayers({ nickname }: { nickname: string }) {
  //const { data, isLoading } = useSWR<UserSquad, Error>(`squad_${nickname}`, () => fetchUserSquad(nickname));

  const data: UserSquad = {
    formation: "4-2-2-2",
    totalPay: 255,
    maintotalPrice: "12,948,000,000,000",
    ovr: { df: 120, fw: 129, mf: 126, total: 122 },
    players: [
      {
        spid: 221189342,
        pid: 189342,
        name: "카를로 핀솔리오",
        role: "gk",
        ovr: 99,
        pay: 5,
        buildUp: 8,
        price: "335,000,000,000",
        thumb: "/players/p189342.png?rd=202402101210",
        x: 50,
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
        price: "244,000,000,000",
        thumb: "/playersAction/p254214100.png?rd=202402101210",
        x: 35,
        y: 33,
      },
      {
        spid: 268001075,
        pid: 1075,
        name: "A. 델피에로",
        role: "rm",
        ovr: 128,
        pay: 25,
        buildUp: 7,
        price: "770,000,000,000",
        thumb: "/playersAction/p268001075.png?rd=202402101210",
        x: 80.62,
        y: 67,
      },
      {
        spid: 268006235,
        pid: 6235,
        name: "파벨 네드베드",
        role: "lm",
        ovr: 128,
        pay: 25,
        buildUp: 7,
        price: "924,000,000,000",
        thumb: "/playersAction/p268006235.png?rd=202402101210",
        x: 19.37,
        y: 67,
      },
      {
        spid: 100247703,
        pid: 247703,
        name: "이언 러시",
        role: "rs",
        ovr: 129,
        pay: 30,
        buildUp: 2,
        price: "2,180,000,000,000",
        thumb: "/playersAction/p100247703.png?rd=202402101210",
        x: 60,
        y: 87,
      },
      {
        spid: 110013128,
        pid: 13128,
        name: "안드리 셰우첸코",
        role: "ls",
        ovr: 129,
        pay: 42,
        buildUp: 1,
        price: "4,940,000,000,000",
        thumb: "/playersAction/p110013128.png?rd=202402101210",
        x: 39,
        y: 87,
      },
      {
        spid: 260193082,
        pid: 193082,
        name: "후안 콰드라도",
        role: "rwb",
        ovr: 119,
        pay: 19,
        buildUp: 7,
        price: "175,000,000,000",
        thumb: "/playersAction/p260193082.png?rd=202402101210",
        x: 94.5,
        y: 22,
      },
      {
        spid: 280232756,
        pid: 232756,
        name: "피카요 토모리",
        role: "rcb",
        ovr: 120,
        pay: 17,
        buildUp: 8,
        price: "239,000,000,000",
        thumb: "/playersAction/p280232756.png?rd=202402101210",
        x: 65,
        y: 15,
      },
      {
        spid: 242205452,
        pid: 205452,
        name: "안토니오 뤼디거",
        role: "lcb",
        ovr: 120,
        pay: 16,
        buildUp: 8,
        price: "731,000,000,000",
        thumb: "/playersAction/p242205452.png?rd=202402101210",
        x: 35,
        y: 15,
      },
      {
        spid: 265243237,
        pid: 243237,
        name: "루카 펠레그리니",
        role: "lwb",
        ovr: 122,
        pay: 19,
        buildUp: 8,
        price: "310,000,000,000",
        thumb: "/playersAction/p265243237.png?rd=202402101210",
        x: 5.5,
        y: 22,
      },
      {
        spid: 100005471,
        pid: 5471,
        name: "프랭크 램파드",
        role: "rdm",
        ovr: 124,
        pay: 31,
        buildUp: 2,
        price: "2,100,000,000,000",
        thumb: "/playersAction/p100005471.png?rd=202402101210",
        x: 65,
        y: 33,
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
        thumb: "/players/p265418.png?rd=202402101210",
        x: 0,
        y: 0,
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
        thumb: "/players/p264142.png?rd=202402101210",
        x: 0,
        y: 0,
      },
      {
        spid: 300263065,
        pid: 263065,
        name: "F. 로고",
        role: "CDM",
        ovr: 58,
        pay: 5,
        buildUp: 1,
        price: "1,000",
        thumb: "/players/p263065.png?rd=202402101210",
        x: 0,
        y: 0,
      },
      {
        spid: 276242619,
        pid: 242619,
        name: "셰이크 두쿠레",
        role: "CM",
        ovr: 104,
        pay: 19,
        buildUp: 2,
        price: "170,000,000",
        thumb: "/playersAction/p276242619.png?rd=202402101210",
        x: 0,
        y: 0,
      },
      {
        spid: 265242374,
        pid: 242374,
        name: "무사 바로",
        role: "CF",
        ovr: 106,
        pay: 21,
        buildUp: 1,
        price: "168,000,000",
        thumb: "/playersAction/p265242374.png?rd=202402101210",
        x: 0,
        y: 0,
      },
      {
        spid: 234190362,
        pid: 190362,
        name: "테무 푸키",
        role: "ST",
        ovr: 92,
        pay: 15,
        buildUp: 1,
        price: "54,300,000",
        thumb: "/playersAction/p234190362.png?rd=202402101210",
        x: 0,
        y: 0,
      },
      {
        spid: 256178603,
        pid: 178603,
        name: "마츠 후멜스",
        role: "CB",
        ovr: 109,
        pay: 24,
        buildUp: 2,
        price: "217,000,000",
        thumb: "/playersAction/p256178603.png?rd=202402101210",
        x: 0,
        y: 0,
      },
    ],
    totalPriceList: [
      { totalPrice: 12601771803130, date: "2024-01-27" },
      { totalPrice: 12464741303150, date: "2024-01-28" },
      { totalPrice: 12740686703170, date: "2024-01-30" },
      { totalPrice: 12632707203180, date: "2024-01-31" },
      { totalPrice: 12575710003190, date: "2024-02-01" },
      { totalPrice: 12888734203190, date: "2024-02-02" },
      { totalPrice: 12877750203160, date: "2024-02-03" },
      { totalPrice: 12723773203170, date: "2024-02-04" },
      { totalPrice: 12598730703170, date: "2024-02-05" },
      { totalPrice: 12494755103170, date: "2024-02-06" },
      { totalPrice: 12414772103170, date: "2024-02-07" },
      { totalPrice: 12478741403170, date: "2024-02-08" },
      { totalPrice: 12450696603170, date: "2024-02-09" },
    ],
  };

  return (
    <div className="relative w-[500px] h-[700px] bg-[url(/images/squad/soccer_field.jpg)] bg-no-repeat bg-contain">
      {data?.players
        .filter(({ x, y }) => x !== 0 && y !== 0)
        .map(({ spid, x, y, name, role, thumb, ovr, buildUp, pay }) => (
          <div
            key={spid}
            className={`absolute`}
            style={{
              left: `${x * 0.85}%`,
              top: `${(role === "gk" ? 100 : 100 - y) * 0.9}%`,
            }}
          >
            <div className={"flex justify-center"}>
              <div className={"text-center"}>
                <p className={"text-sm text-white font-semibold"}>{ovr}</p>
                <p className={`text-sm text-${getPositionGroup(role.toUpperCase())} font-semibold`}>{role.toUpperCase()}</p>
              </div>
              <Image
                width={100}
                height={100}
                alt={"squad_player"}
                className={"w-10 h-10 rounded-full"}
                src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common${thumb}`}
              />
              <div className={"text-center"}>
                <Image alt={"build_up"} width={25} height={100} src={`/images/strong/${buildUp}.png`} />
                <div className={"p-1"}>
                  <PlayerPay pay={pay} width={4} height={4} />
                </div>
              </div>
            </div>
            <div className={"flex"}>
              <p className={"text-white"}>{name}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
