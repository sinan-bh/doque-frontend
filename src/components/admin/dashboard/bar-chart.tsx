import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";

interface BarChartProps {
  data: ChartData<"bar">;
}

export default function BarChart({ data }: BarChartProps) {
  return (
    <div className="h-64">
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            title: {
              display: true,
              text: "Users by Plan",
            },
          },
        }}
      />
    </div>
  );
}
