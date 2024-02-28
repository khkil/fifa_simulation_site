import Chart from "react-apexcharts";
import { TotalPrice } from "@/app/_types/user";
import { convertKorPriceFormat, convertPriceFormat } from "@/app/_utils";

interface Props {
  totalPriceList: TotalPrice[];
}
export default function WeeklyPriceGraph({ totalPriceList }: Props) {
  const divide = 100000000000; // To-do 구단가치별 상승폭 조정
  const minimumPrice = Math.min(...totalPriceList.map((v) => v.totalPrice));
  const maximumPrice = Math.max(...totalPriceList.map((v) => v.totalPrice));
  const todayPrice = totalPriceList[totalPriceList.length - 1].totalPrice;

  const chart = {
    options: {
      chart: {
        sparkline: {
          enabled: false,
        },
        width: "100%",
        height: 400,
        toolbar: {
          show: false,
        },
      },

      fill: {
        opacity: 1,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "100%",
          borderRadius: 6,
          dataLabels: {
            position: "top",
          },
        },
      },
      legend: {
        show: true,
      },
      dataLabels: {
        enabled: false,
      },

      tooltip: {
        x: {
          show: true,
          format: "dd MMM",
          formatter: (value: number) => `${value} 시세`,
        },
        y: {
          formatter: (value: number) => `${convertPriceFormat(value)} BP`,
        },
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500",
          },
          formatter: function (value: string) {
            return `${convertKorPriceFormat(value)} BP`;
          },
        },
        categories: totalPriceList.map((v) => v.date),
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        min: Math.floor((minimumPrice * 0.9) / divide) * divide, // 시작값 소폭 조정
        max: Math.ceil(maximumPrice / divide) * divide,
        labels: {
          show: true,
          min: 10000,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500",
          },
        },
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 11,
        },
      },
    },
    series: [
      {
        name: "구단가치",
        data: totalPriceList.map((v) => v.totalPrice),
      },
    ],
  };
  return (
    <div className="mixed-chart w-full ">
      <h2 className={"font-bold text-xl mb-2 text-gray-700"}>일별 구단가치</h2>
      <div className="flex justify-between border-gray-200 border-b pb-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 pb-1">현재 구단가치</dt>
          <dd className="leading-none text-3xl font-bold text-bp ">{convertPriceFormat(todayPrice)} BP</dd>
        </dl>
        {/*<div>
          <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md ">
            <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
            </svg>
            Profit rate 23.5%
          </span>
        </div>*/}
      </div>
      <div className="grid grid-cols-2 py-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 pb-1">최고 구단가치</dt>
          <dd className="leading-none text-xl font-bold text-green-500 ">{convertPriceFormat(maximumPrice)} BP</dd>
        </dl>
        <dl>
          <dt className="text-base font-normal text-gray-500 pb-1">최저 구단가치</dt>
          <dd className="leading-none text-xl font-bold text-red-600 ">{convertPriceFormat(minimumPrice)} BP</dd>
        </dl>
      </div>
      <Chart options={chart.options} series={chart.series} type="bar" />
    </div>
  );
}
