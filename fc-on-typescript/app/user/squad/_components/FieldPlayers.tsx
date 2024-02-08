"use client";

import useSWR from "swr";
import { fetchUserSquad } from "@/app/_service/userService";

export default function FieldPlayers({ nickname }: { nickname: string }) {
  const { data, isLoading } = useSWR("squad", () => fetchUserSquad(nickname));

  console.log(data, isLoading);

  return <div className="w-full h-screen bg-[url(/images/squad/soccer_field.jpg)] bg-no-repeat bg-contain"></div>;
}
