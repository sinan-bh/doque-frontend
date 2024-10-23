import React from "react";
import LineChart from "../charts/line-chart";
import { format, parseISO } from "date-fns";
import { Workspace } from "@/lib/store/features/admin/workspace-slice";

interface ActivityChartProps {
  workspaces: Workspace[];
  lineChartView: string;
  setLineChartView: (view: string) => void;
}

export default function ActivityChart({
  workspaces,
  lineChartView,
  setLineChartView,
}: ActivityChartProps) {
  const getLabels = (view: string) => {
    switch (view) {
      case "week":
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      case "month":
        return [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
      case "year":
        const currentYear = new Date().getFullYear();
        return Array.from(
          { length: 5 },
          (_, index) => `${currentYear - index}`
        ).reverse();
      default:
        return [];
    }
  };

  const getLineData = (view: string) => {
    const dataMap: { [key: string]: number } = {};
    const labels = getLabels(view);

    workspaces.forEach((workspace) => {
      const date = parseISO(workspace.createdAt);
      let key: string;

      switch (view) {
        case "week":
          key = format(date, "eee");
          break;
        case "month":
          key = format(date, "MMM");
          break;
        case "year":
          key = format(date, "yyyy");
          break;
        default:
          return;
      }

      if (!dataMap[key]) dataMap[key] = 0;
      dataMap[key]++;
    });

    return labels.map((label) => dataMap[label] || 0);
  };

  const lineData = {
    labels: getLabels(lineChartView),
    datasets: [
      {
        label: "Workspaces Activity",
        data: getLineData(lineChartView),
        borderColor: "#0FA4AF",
        backgroundColor: "rgba(15, 164, 175, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Spaces Activity",
        data: workspaces.map((workspace) => workspace.space.length),
        borderColor: "#FFD966",
        backgroundColor: "rgba(255, 217, 102, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="mt-6 p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h3 className="text-xl font-semibold mb-2 sm:mb-0">Your Activity</h3>
        <div className="flex space-x-2">
          {["week", "month", "year"].map((option) => (
            <button
              key={option}
              onClick={() => setLineChartView(option)}
              className={`px-3 py-1 rounded ${
                lineChartView === option
                  ? "bg-transparent border border-slate-800 dark:border-white text-black dark:text-white"
                  : "bg-gray-300 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <LineChart data={lineData} />
    </div>
  );
}
