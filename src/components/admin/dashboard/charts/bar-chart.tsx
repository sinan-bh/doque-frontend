import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type BarChartData = ChartData<'bar'>;


interface BarChartProps {
  data: BarChartData;
}

export default function BarChart({ data }: BarChartProps) {
  return <Bar data={data} />;
}
