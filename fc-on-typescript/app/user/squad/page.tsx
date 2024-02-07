"use client";

import NicknameSearchBox from "@/app/_components/ui/SearchBar";
import FieldPlayers from "./_components/FieldPlayers";

export default function UserSquadPage() {
  return (
    <div>
      <NicknameSearchBox />
      <div className="flex space-3 pt-10 ">
        <div className="w-3/5">asd</div>
        <div className="w-2/5">
          <FieldPlayers />
        </div>
      </div>
    </div>
  );
}
