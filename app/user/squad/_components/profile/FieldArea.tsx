"use client";

import useSWR from "swr";
import { fetchUserSquad } from "@/app/_service/userService";
import { UserSquad } from "@/app/_types/user";
import { Season } from "@/app/_types/season";
import { fetchClubs, fetchSeasons } from "@/app/_service/playerService";
import Image from "next/image";
import PlayerPay from "@/app/_components/player/PlayerPay";
import { getPositionGroupByPosition } from "@/app/_utils";

interface Props {
  nickname: string;
  seasons: Season[];
  squad: UserSquad;
}

export default function FieldArea({ seasons, nickname, squad }: Props) {
  return (
    <div className="relative w-[800px] h-[1000px] bg-[url(/images/squad/soccer_field.jpg)] bg-no-repeat bg-contain">
      {squad?.players
        .filter(({ x, y }) => x !== 0 && y !== 0)
        .map(({ spid, pid, x, y, name, role, thumb, ovr, buildUp, pay }) => {
          const seasonId = parseInt(spid.toString().slice(0, 3));
          const season: Season | undefined = seasons.find(({ id }) => id === seasonId);

          return (
            <div
              key={spid}
              className={`absolute`}
              style={{
                left: `${x * 0.77}%`,
                top: `${(role === "gk" ? 100 : 100 - y) * 0.9}%`,
              }}
            >
              <div className={"flex justify-center"}>
                <div className={"text-center"}>
                  <p className={"text-base text-white font-semibold"}>{ovr}</p>
                  <p className={`text-lg text-${getPositionGroupByPosition(role.toUpperCase())} font-bold`}>{role.toUpperCase()}</p>
                </div>
                <Image
                  width={100}
                  height={100}
                  alt={"squad_player"}
                  className={"w-10 h-10 rounded-full"}
                  src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common${thumb}`}
                />
                <div className={"text-center"}>
                  <Image alt={"build_up"} width={30} height={100} src={`/images/strong/${buildUp}.png`} />
                  <div className={"mt-0.5"}>
                    <PlayerPay pay={pay} />
                  </div>
                </div>
              </div>
              <div className={"flex items-center justify-center space-x-1"}>
                <img src={season?.imageUrl} alt={"시즌이미지"} width={23} height={7} />
                <p className={"text-white font-semibold text-base"}>{name}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
