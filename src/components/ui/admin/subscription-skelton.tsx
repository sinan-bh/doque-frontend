import React from "react";

export default function SubscriptionStatisticsSkeleton() {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
      <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  );
}
