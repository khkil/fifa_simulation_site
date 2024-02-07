"use client";

import NicknameSearchBox from "@/app/_components/ui/SearchBar";
import FieldPlayers from "./_components/FieldPlayers";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function UserSquadPage() {
  const searchParams = useSearchParams();

  return (
    <div>
      <NicknameSearchBox />
      <div className="flex space-3 pt-10 ">
        <div className="w-3/5">asd</div>
        <div className="w-2/5">{searchParams.get("nickname") ? <FieldPlayers nickname={searchParams.get("nickname")} /> : null}</div>
      </div>
    </div>
  );
}
