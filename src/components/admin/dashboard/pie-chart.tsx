// import React from "react";
// import { Pie } from "react-chartjs-2";
// import { ChartData } from "chart.js";

// interface PieChartProps {
//   data: ChartData<"pie">;
// }

// export default function PieChart({ data }: PieChartProps) {
//   return (
//     <div className="h-64">
//       <Pie data={data} />
//     </div>
//   );
// }

import React from "react";
import { Pie } from "react-chartjs-2";
import { ChartData } from "chart.js";

interface PieChartProps {
  data: ChartData<"pie">;
}

export default function PieChart({ data }: PieChartProps) {
  return (
    <div className="h-72 w-full">
      <Pie
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: true,
        }}
      />
    </div>
  );
}
