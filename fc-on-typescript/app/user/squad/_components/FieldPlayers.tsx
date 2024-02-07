import { fetchUserSquad } from "@/app/_service/userService";

export default async function FieldPlayers({ nickname }: { nickname?: string | null }) {
  if (nickname) {
    const data = await fetchUserSquad(nickname);
    console.log(data);
  }

  return <div className="w-full h-screen bg-[url(/images/squad/soccer_field.jpg)] bg-no-repeat bg-contain"></div>;
}
