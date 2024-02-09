import useSWR from "swr";
import { Season } from "@/app/_types/season";
import { PlayerSearchParams } from "@/app/_types/player";
import Image from "next/image";
import customFetch from "@/app/_service";
import { fetchClubs, fetchNations, fetchSeasons, fetchSkills } from "@/app/_service/playerService";

interface Props {
  params: PlayerSearchParams;
  setParams: (params: PlayerSearchParams) => void;
}

export default function PlayerSearchBoxes({ params, setParams }: Props) {
  return (
    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg border mb-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase ">
          <tr className={"border-b"}>
            <td className="px-4 py-4 w-1/5">
              <p className={"text-base font-semibold"}>선수명</p>
            </td>
            <td className="px-4 py-4 bg-gray-50 ">
              <PlayerNameSearchBox params={params} setParams={setParams} />
            </td>
          </tr>
          <tr className={"border-b"}>
            <td className="px-4 py-4 w-1/5">
              <p className={"text-base font-semibold"}>시즌</p>
            </td>
            <td className="px-4 py-4 bg-gray-50 ">
              <SeasonSearchBox params={params} setParams={setParams} />
            </td>
          </tr>
          <tr className={"border-b"}>
            <td className="px-4 py-4 w-1/5">
              <p className={"text-base font-semibold"}>세부정보</p>
            </td>
            <td className="px-4 py-4 bg-gray-50 ">
              <DetailInfoSearchBox params={params} setParams={setParams} />
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
}

const PlayerNameSearchBox = ({ params, setParams }: Props) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 ring-0"
        placeholder="선수명을 입력해주세요"
      />
      <button type="button" className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-slate-700 rounded-e-lg border">
        <svg className="w-10 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </div>
  );
};

const SeasonSearchBox = ({ params: { seasonIds = [], ...props }, setParams }: Props) => {
  const { data: seasons } = useSWR<Season[], Error>(`season`, fetchSeasons);
  const onClick = (id: number) => {
    if (seasonIds.includes(id)) {
      seasonIds = seasonIds.filter((v) => v !== id);
    } else {
      seasonIds = [...seasonIds, id];
    }

    setParams({ ...props, seasonIds });
  };
  return (
    <div className={"flex flex-wrap"}>
      {seasons?.map(({ id, imageUrl, seasonName }: Season) => (
        <Image
          width={40}
          height={20}
          className={`px-1.5 py-1.5 cursor-pointer hover:opacity-20 ${seasonIds.includes(id) ? "opacity-20" : ""}`}
          key={id}
          alt={seasonName}
          src={imageUrl}
          onClick={() => {
            onClick(id);
          }}
        />
      ))}
    </div>
  );
};

const DetailInfoSearchBox = ({ params, setParams }: Props) => {
  const { data: clubs } = useSWR<Season[], Error>(`clubs`, fetchClubs);
  const { data: skills } = useSWR<Season[], Error>(`skills`, fetchSkills);
  const { data: nations } = useSWR<Season[], Error>(`nations`, fetchNations);

  return <div className={"flex"}></div>;
};
