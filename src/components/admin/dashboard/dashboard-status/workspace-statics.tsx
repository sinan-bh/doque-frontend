import React, { useState } from "react";
import BarChart from "../charts/bar-chart";
import PieChart from "../charts/pie-chart";
import { AdminWorkspace } from "@/lib/store/features/admin/admin-workspace-slice";
import { AdminMember } from "@/lib/store/features/admin/admin-member-slice";

interface WorkspaceStatisticsProps {
  workspaces: AdminWorkspace[];
  view: string;
  setView: (view: string) => void;
  members: AdminMember[];
}

export default function WorkspaceStatistics({
  workspaces,
  view,
  setView,
  members,
}: WorkspaceStatisticsProps) {
  const [barCount, setBarCount] = useState(9);

  const workspaceByDay = workspaces.reduce(
    (acc: Record<string, number>, workspace) => {
      const date = new Date(workspace.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {}
  );

  const barLabels = Object.keys(workspaceByDay).slice(-barCount);
  const barDataValues = Object.values(workspaceByDay).slice(-barCount);

  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: "Workspaces Created",
        data: barDataValues,
        backgroundColor: "#0FA4AF",
        borderColor: "#0FA4AF",
        borderWidth: 1,
      },
    ],
  };

  const filteredWorkspaces = workspaces.filter((workspace) => {
    const now = new Date();
    const itemDate = new Date(workspace.createdAt);

    if (view === "all") return true;
    if (view === "day") return itemDate.toDateString() === now.toDateString();
    if (view === "week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      return itemDate >= startOfWeek && itemDate <= now;
    }
    if (view === "month") {
      return (
        itemDate.getMonth() === now.getMonth() &&
        itemDate.getFullYear() === now.getFullYear()
      );
    }
    return false;
  });

  const filteredSpaces = filteredWorkspaces.reduce(
    (acc, workspace) => acc + workspace.spaces.length,
    0
  );

  const filteredMembers = members.filter((member) => {
    const now = new Date();
    const memberDate = new Date(member.createdAt);

    if (view === "all") return true;
    if (view === "day") return memberDate.toDateString() === now.toDateString();
    if (view === "week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      return memberDate >= startOfWeek && memberDate <= now;
    }
    if (view === "month") {
      return (
        memberDate.getMonth() === now.getMonth() &&
        memberDate.getFullYear() === now.getFullYear()
      );
    }
    return false;
  });

  const pieData = {
    labels: ["Members", "Workspaces", "Spaces"],
    datasets: [
      {
        data: [
          filteredMembers.length,
          filteredWorkspaces.length,
          filteredSpaces,
        ],
        backgroundColor: ["#0FA4AF", "#FFD966", "#FF7F7F"],
        hoverBackgroundColor: ["#0FA4AF", "#FFD966", "#FF7F7F"],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
        <h3 className="text-xl font-semibold">Workspace Statistics</h3>

        <div className="mb-4 flex justify-end items-center">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Number of Bars:
          </label>
          <select
            value={barCount}
            onChange={(e) => setBarCount(Number(e.target.value))}
            className="ml-2 w-14 border border-gray-300 rounded-md shadow-sm p-2"
          >
            {[12, 11, 10, 9, 8, 7, 6, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[300px] md:min-w-[600px] max-h-[400px]">
            <BarChart data={barData} />
          </div>
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-4">Overall View</h3>
          <div className="min-w-64 max-w-xs mx-auto">
            <PieChart data={pieData} />
          </div>
        </div>
        <div className="mt-6">
          <div className="flex flex-wrap justify-center md:justify-start space-x-2 md:space-x-4">
            {["all", "day", "week", "month"].map((option) => (
              <label key={option} className="flex items-center mb-2">
                <input
                  type="radio"
                  checked={view === option}
                  onChange={() => setView(option)}
                  className="mr-2"
                />
                <span className="text-gray-700 dark:text-gray-300 capitalize">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
