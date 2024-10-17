import React from "react";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";

interface LineChartProps {
  data: ChartData<"line">;
}

export default function LineChart({ data }: LineChartProps) {
  return (
    <div className="h-96 w-full">
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
