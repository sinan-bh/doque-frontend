import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import PieChart from "./pie-chart";
import LineChart from "./line-chart";
import BarChart from "./bar-chart";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

export default function Dashboard() {
  const pieData = {
    labels: ["Members", "Workspaces", "Projects", "Plans"],
    datasets: [
      {
        data: [67, 27, 11, 21],
        backgroundColor: ["#0FA4AF", "#FFD966", "#FF7F7F", "#B19CD9"],
        hoverBackgroundColor: ["#0FA4AF", "#FFD966", "#FF7F7F", "#B19CD9"],
      },
    ],
  };

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Your Activity",
        data: [20, 30, 50, 80, 60, 40, 70],
        borderColor: "#0FA4AF",
        backgroundColor: "rgba(15, 164, 175, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ["Free Plan", "Basic Plan", "Standard Plan", "Premium Plan"],
    datasets: [
      {
        label: "Total Users",
        data: [15, 30, 25, 20],
        backgroundColor: "#0FA4AF",
        borderColor: "#0FA4AF",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          { title: "Total Users", value: "45K" },
          { title: "Total Workspaces", value: "150" },
          { title: "Total Revenue", value: "$120K" },
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg flex flex-col items-center"
          >
            <h2 className="text-3xl font-bold">{item.value}</h2>
            <p className="text-gray-600 dark:text-gray-400">{item.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Plan Statistics</h3>
            <div className="text-4xl font-bold">60K</div>
          </div>
          <BarChart data={barData} />
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Overall View</h3>
          <PieChart data={pieData} />
        </div>
      </div>

      <div className="mt-6 p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Your Activity</h3>
        <LineChart data={lineData} />
      </div>
    </div>
  );
}
