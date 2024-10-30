import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type PieChartData = ChartData<"pie">;

interface PieChartProps {
  data: PieChartData;
}

export default function PieChart({ data }: PieChartProps) {
  return <Pie data={data} />;
}
