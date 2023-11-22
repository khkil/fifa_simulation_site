import { CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "구단가치 그래프",
    },
  },
};

const SquadPriceGraph = ({ priceList }) => {
  const labels = useMemo(() => priceList.map(({ date }) => date), [priceList]);
  const values = useMemo(() => priceList.map(({ totalPrice }) => totalPrice), [priceList]);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "구단가치",
        data: values,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default SquadPriceGraph;
