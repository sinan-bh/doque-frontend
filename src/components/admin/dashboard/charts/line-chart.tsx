import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type LineChartData = ChartData<"line">;

interface LineChartProps {
  data: LineChartData;
}

export default function LineChart({ data }: LineChartProps) {
  return <Line data={data} />;
}
