import PlayerPriceTable from "./_components/player/PlayerPriceTable";
import NicknameSearchBar from "./user/_components/NicknameSearchBar";
import ChargeCalculator from "@/app/_components/calculator/ChargeCalculator";

export default function Home() {
  return (
    <div>
      <NicknameSearchBar pathname="/user/squad" />
      <div className="flex space-x-3 pt-10">
        <PlayerPriceTable theme="info" title="오늘의 시세 급상승 순위" />
        <PlayerPriceTable theme="error" title="오늘의 시세 급하락 순위" sort="wave,asc" />
      </div>
      <div className="flex space-x-3 pt-10">
        <ChargeCalculator />
        <div className="w-full"></div>
      </div>
    </div>
  );
}
