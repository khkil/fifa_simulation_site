import Chart from "react-apexcharts";
import { Player, TotalPrice } from "@/app/_types/user";
import { POSITION_GROUP } from "@/app/_constants";
import { PositionGroup } from "@/app/_types/position";
import { convertKorPriceFormat } from "@/app/_utils";

interface Props {
  players: Player[];
}
export default function PositionPriceGraph({ players }: Props) {
  const positionGroups: PositionGroup[] = Object.keys(POSITION_GROUP) as PositionGroup[];

  const priceListByPositionGroup = positionGroups.map((group) => {
    const positions: string[] = POSITION_GROUP[group].positions;
    const positionGroupPrice: number = players
      .filter(({ role }) => positions.includes(role.toUpperCase()))
      .reduce((sum, { price }) => sum + parseInt(price?.replaceAll(",", "")), 0);

    return { [group]: positionGroupPrice };
  });

  const chart = {
    options: {
      colors: ["#f2be57", "#2b7def", "#00d28b", "#f6425f"],
      labels: priceListByPositionGroup.map((obj) => Object.keys(obj)[0].toUpperCase()),
      yaxis: {
        labels: {
          formatter: function (value: number) {
            return `${convertKorPriceFormat(value)} BP`;
          },
        },
      },
    },
    series: priceListByPositionGroup.map((obj) => Object.values(obj)[0]),
  };

  return (
    <div>
      <h2 className={"font-bold text-xl mb-2"}>포지션별 구단가치</h2>
      <Chart options={chart.options} series={chart.series} type="donut" width="380" />
    </div>
  );
}
