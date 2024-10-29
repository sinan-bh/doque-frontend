import React from "react";

export default function MembersSkeleton() {
  return (
    <div className="animate-pulse w-full h-screen">
      <table className="w-full bg-white dark:bg-gray-800 rounded-lg">
        <tbody>
          {Array.from({ length: 8 }).map((_, index) => (
            <tr key={index} className="border-b dark:border-gray-600">
              <td className="p-4 flex items-center">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full mr-4"></div>
                <div className="w-1/2 h-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
              </td>
              <td className="p-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
              </td>
              <td className="p-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
              </td>
              <td className="p-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
