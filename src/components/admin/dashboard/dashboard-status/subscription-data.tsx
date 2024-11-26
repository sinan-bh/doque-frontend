"use client";

import React from "react";
import { Radar } from "react-chartjs-2";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip, Legend);

interface Subscription {
  createdAt: string;
  subscription: string;
}

interface SubscriptionStatisticsProps {
  subscriptions: Subscription[];
}

export default function SubscriptionStatistics({
  subscriptions,
}: SubscriptionStatisticsProps) {
  const filterSubscriptions = (timePeriod: string) => {
    const now = dayjs();
    return subscriptions.filter((sub) => {
      const createdAt = dayjs(sub.createdAt);
      switch (timePeriod) {
        case "today":
          return createdAt.isSame(now, "day");
        case "week":
          return createdAt.isSame(now, "week");
        case "month":
          return createdAt.isSame(now, "month");
        case "year":
          return createdAt.isSame(now, "year");
        default:
          return true;
      }
    });
  };

  const getPlanData = (filteredSubscriptions: Subscription[]) => {
    const plans = ["free", "basic", "standard", "premium"];
    return plans.map(
      (plan) =>
        filteredSubscriptions.filter((sub) => sub.subscription === plan).length
    );
  };

  const chartData: ChartData<"radar"> = {
    labels: ["Free", "Basic", "Standard", "Premium"],
    datasets: [
      {
        label: "Today",
        data: getPlanData(filterSubscriptions("today")),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "This Week",
        data: getPlanData(filterSubscriptions("week")),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "This Month",
        data: getPlanData(filterSubscriptions("month")),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "This Year",
        data: getPlanData(filterSubscriptions("year")),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-6 p-6 w-full md:w-1/2 h-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Subscription Statistics
      </h2>
      <Radar data={chartData} />
    </div>
  );
}
