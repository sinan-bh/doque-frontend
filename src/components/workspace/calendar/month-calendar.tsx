"use client"; // For Next.js

import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/en";
import { useAppSelector } from "@/lib/store/hooks";
import clsx from "clsx";
import Link from "next/link";
import { useParams } from "next/navigation";

interface DayInfo {
  day: number;
  isCurrentMonth: boolean;
}

const MonthCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const { allTasks } = useAppSelector((state) => state.calendar);
  const { workSpaceId } = useParams();

  const getDaysInMonth = (): DayInfo[] => {
    const daysInMonth: DayInfo[] = [];
    const firstDayOfMonth = currentDate.startOf("month").day();
    const daysInCurrentMonth = currentDate.daysInMonth();

    const previousMonth = currentDate.subtract(1, "month");
    const daysInPreviousMonth = previousMonth.daysInMonth();

    for (let i = 0; i < firstDayOfMonth - 1; i++) {
      daysInMonth.push({
        day: daysInPreviousMonth - (firstDayOfMonth - 2) + i,
        isCurrentMonth: false,
      });
    }

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      daysInMonth.push({ day, isCurrentMonth: true });
    }

    const remainingSpots = 7 - (daysInMonth.length % 7);
    if (remainingSpots < 7) {
      for (let day = 1; day <= remainingSpots; day++) {
        daysInMonth.push({
          day,
          isCurrentMonth: false,
        });
      }
    }

    return daysInMonth;
  };

  const handlePreviousMonth = (): void => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = (): void => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const daysInMonth = getDaysInMonth();

  // Group tasks by their day in the current month
  const tasksByDay: {
    [key: number]: {
      _id: string;
      priority: string;
      dueDate: string;
      title: string;
      listId: string;
      spaceId: string;
    }[];
  } = {};
  allTasks.forEach((task) => {
    const taskDate = dayjs(task.dueDate);
    if (taskDate.isSame(currentDate, "month")) {
      const day = taskDate.date();
      if (!tasksByDay[day]) {
        tasksByDay[day] = [];
      }
      tasksByDay[day].push(task);
    }
  });

  return (
    <div className="w-full max-h-full overflow-y-scroll hide-scrollbar ">
      <div className="flex items-center justify-end p-4 bg-white shadow-md rounded-t-lg dark:bg-darkBg">
        <button
          onClick={handlePreviousMonth}
          className="text-gray-600 hover:text-gray-800 px-3 dark:text-gray-200"
        >
          &lt;
        </button>

        <span className="font-bold text-lg text-gray-800 dark:text-gray-200">
          {currentDate.isSame(dayjs(), "month")
            ? "This Month"
            : currentDate.format("MMMM YYYY")}
        </span>

        <button
          onClick={handleNextMonth}
          className="text-gray-600 hover:text-gray-800 px-3 dark:text-gray-200"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 border-t border-gray-300 shadow-md bg-gray-100 dark:border-none dark:border-gray-50">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
          <div
            key={index}
            className="text-center  bg-gray-100 text-gray-600 font-semibold dark:bg-darkBg dark:text-gray-200"
          >
            {day}
          </div>
        ))}

        {daysInMonth.map((dayInfo, index) => (
          <Link
            key={index}
            href={`/w/${workSpaceId}/calendar?tab=Day&date=${
              currentDate.month() + 1
            }-${dayInfo.day}`}
          >
            <div
              className={`relative flex justify-center items-center h-20 border border-gray-200 dark:bg-darkBg hover:bg-gray-300 dark:hover:bg-zinc-700 ${
                dayInfo.isCurrentMonth
                  ? "bg-white hover:bg-gray-50"
                  : "bg-gray-50 text-gray-400"
              }`}
            >
              <span className="absolute top-2 right-2 text-sm font-bold">
                {dayInfo.day}
              </span>
              {dayInfo.isCurrentMonth && tasksByDay[dayInfo.day] && (
                <div className="text-xs">
                  {tasksByDay[dayInfo.day].length === 1 ? (
                    <span
                      className={clsx("text-white  rounded-full px-2 py-1", {
                        "bg-red-400":
                          tasksByDay[dayInfo.day][0].priority === "high",
                        "bg-yellow-500":
                          tasksByDay[dayInfo.day][0].priority === "medium",
                        "bg-green-500":
                          tasksByDay[dayInfo.day][0].priority === "ow",
                      })}
                    >
                      {tasksByDay[dayInfo.day][0].title}
                    </span>
                  ) : (
                    <span className="bg-blue-500 text-white rounded-full px-2 py-1">
                      {tasksByDay[dayInfo.day].length} tasks
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MonthCalendar;
