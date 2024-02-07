"use client";

import { fetchUserSquad } from "@/app/_service/userService";
import useSquad from "@/app/_hooks/swr";

export default function FieldPlayers({ nickname }: { nickname: string }) {
  const { data } = useSquad(nickname);
  console.log(data);

  return <div className="w-full h-screen bg-[url(/images/squad/soccer_field.jpg)] bg-no-repeat bg-contain"></div>;
}
