import PlayerPriceTable from "./_components/player/PlayerPriceTable";
import NicknameSearchBox from "./_components/ui/SearchBar";

export default function Home() {
  return (
    <div>
      <NicknameSearchBox />
      <div className="flex space-x-3 pt-10">
        <PlayerPriceTable theme="info" title="오늘의 시세 급상승 순위" />
        <PlayerPriceTable theme="error" title="오늘의 시세 급하락 순위" />
      </div>
    </div>
  );
}
