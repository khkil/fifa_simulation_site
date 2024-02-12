import Chart from "react-apexcharts";
import { TotalPrice } from "@/app/_types/user";
import { POSITION_GROUP } from "@/app/_constants";
import { Key } from "react";
import { PositionGroup } from "@/app/_types/position";

interface Props {
  totalPriceList: TotalPrice[];
}
export default function PositionPriceGraph({ totalPriceList }: Props) {
  const priceByPositions = Object.keys(POSITION_GROUP).map((key): PositionGroup => {
    const positions = POSITION_GROUP?.[key];
    console.log(positions);
  });
  console.log(priceByPositions);
  const chart = {
    options: {
      colors: ["#f2be57", "#2b7def", "#00d28b", "#f6425f"],
      labels: Object.keys(POSITION_GROUP).map((v) => v.toUpperCase()),
      yaxis: {
        labels: {
          formatter: function (value: number) {
            return `${value} BP`;
          },
        },
      },
    },
    series: [44, 55, 41, 17],
  };

  return (
    <div>
      <h2 className={"font-bold text-xl mb-2"}>포지션별 구단가치</h2>
      <Chart options={chart.options} series={chart.series} type="donut" width="380" />
    </div>
  );
}
