import { fetchPlayerPriceRank } from "@/app/_service/playerService";
import { Response, Theme } from "@/app/_types";
import Alert from "../ui/Alert";

interface Props {
  title: string;
  theme: Theme;
  sort?: string;
}

export default async function PlayerPriceTable({ theme, title, sort }: Props) {
  const { data }: Response = await fetchPlayerPriceRank();

  return <Alert theme={theme} title="te" />;
}
