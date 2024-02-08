"use client";

import NicknameSearchBox from "@/app/_components/ui/SearchBar";
import FieldPlayers from "./_components/FieldPlayers";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function UserSquadPage() {
  const searchParams = useSearchParams();
  const nickname: string = useMemo(() => searchParams.get("nickname") || "", [searchParams]);

  return (
    <div>
      <NicknameSearchBox />
      {nickname ? (
        <div className="flex space-3 pt-10 ">
          <div className="w-3/5">asd</div>
          <div className="w-2/5">
            <FieldPlayers nickname={nickname} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
