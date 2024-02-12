import { Overall, Player, TeamColor, UserSquad } from "@/app/_types/user";
import { convertKorPriceFormat } from "@/app/_utils";
import { Key, useMemo } from "react";
import Image from "next/image";

interface Props {
  nickname: string;
  squad: UserSquad;
}
export const UserProfile = ({
  nickname,
  squad: {
    maintotalPrice,
    ovr: { fw, mf, df },
    totalPay,
    formation,
    players,
    totalTeamColor: { affiliation, enhance },
  },
}: Props) => {
  const allTeamColors = useMemo(() => ({ ...affiliation, ...enhance }), [affiliation, enhance]);

  return (
    <div className="w-full h-[1000px] p-6 bg-white border border-gray-200 rounded-lg shadow">
      <div className={"flex items-center mb-5"}>
        <h5 className="text-2xl font-semibold tracking-tight text-gray-900">{nickname}</h5>
        <h5 className="mx-2 text-xl font-semibold tracking-tight text-gray-900">님의 프로필</h5>
      </div>
      <OverallAverage fw={fw} df={df} mf={mf} />
      <div className={"mb-5"}>
        <p className="font-semibold text-slate-500 mb-1">구단가치</p>
        <p className={"text-bp font-bold text-lg"}>{maintotalPrice} BP</p>
        <p className={"font-semibold text-base text-gray-400"}>({convertKorPriceFormat(maintotalPrice)} BP)</p>
      </div>
      <div className={"mb-5"}>
        <p className="font-semibold text-slate-500 mb-1">포메이션</p>
        <p className={"text-gray-600 font-bold text-lg"}>{formation}</p>
      </div>
      <div className={"mb-5"}>
        <p className="font-semibold text-slate-500 mb-1">급여</p>
        <p className={"text-gray-600 font-bold text-lg"}>
          {totalPay} / {process.env.NEXT_PUBLIC_FC_ONLINE_MAX_PAY}
        </p>
      </div>
      <div className={"mb-5"}>
        <p className="font-semibold text-slate-500 mb-3">팀컬러</p>
        {Object.keys(allTeamColors).map((key) => (
          <SquadTeamColor key={key} teamColor={allTeamColors[key]} players={players} />
        ))}
      </div>
    </div>
  );
};

const SquadTeamColor = ({ teamColor: { name, skill, image, playerlist }, players }: { teamColor: TeamColor; players: Player[] }) => {
  const teamPlayers: Player[] = useMemo(() => players.filter((p) => playerlist.indexOf(p.spid) > -1), [players, playerlist]);
  return (
    <div className={"mb-5 mt-2"}>
      <div className={"mb-2 flex items-center"}>
        <img className={"w-6 mr-1.5"} src={image} />
        <p className={"font-semibold mr-1"}>{name}</p>
        <p className={"font-semibold text-gray-400"}>({skill.replace("|", "")})</p>
      </div>
      <div className={"flex"}>
        {teamPlayers.map(({ spid, thumb }) => (
          <Image
            key={spid}
            width={100}
            height={100}
            alt={"squad_player"}
            className={"w-16 h-16 border mx-0.5 bg-gray-200 rounded-lg"}
            src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common${thumb}`}
          />
        ))}
      </div>
    </div>
  );
};

const OverallAverage = ({ fw, df, mf }: Overall) => {
  const maxOverall = 150;
  return (
    <div className={"mb-5"}>
      <div className="font-semibold text-slate-500 mb-1">능력치</div>
      <div className={"space-y-3"}>
        <div>
          <div className={"flex"}>
            <p className={"text-lg text-fw font-bold min-w-9"}>FW</p>
            <p className={"text-lg font-bold"}>{fw}</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className={`bg-fw h-2.5 rounded-full`} style={{ width: `${(fw / maxOverall) * 100}%` }}></div>
          </div>
        </div>
        <div>
          <div className={"flex"}>
            <p className={"text-lg text-mf font-bold min-w-9"}>MF</p>
            <p className={"text-lg font-bold"}>{mf}</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className={`bg-mf h-2.5 rounded-full`} style={{ width: `${(mf / maxOverall) * 100}%` }}></div>
          </div>
        </div>
        <div>
          <div className={"flex"}>
            <p className={"text-lg text-df font-bold min-w-9"}>DF</p>
            <p className={"text-lg font-bold"}>{df}</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className={`bg-df h-2.5 rounded-full`} style={{ width: `${(df / maxOverall) * 100}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
