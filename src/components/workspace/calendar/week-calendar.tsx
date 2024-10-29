"use client";

import { useAppSelector } from "@/lib/store/hooks";
import React, { useState } from "react";
import moment from "moment";
import clsx from "clsx";
import { useParams } from "next/navigation";
import Link from "next/link";
import CreateTask from "./create-task";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const WeekCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const { allTasks } = useAppSelector((state) => state.calendar);
  const { workSpaceId } = useParams();

  const getWeekDates = (date: Date): Date[] => {
    const weekDays: Date[] = [];
    const dayOfWeek = date.getDay();
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - ((dayOfWeek + 1) % 7));

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(weekStart);
      currentDay.setDate(weekStart.getDate() + i);
      weekDays.push(currentDay);
    }

    return weekDays;
  };

  const days = getWeekDates(currentDate);

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  // Filter tasks based on the current week
  const tasksByDate: {
    [key: string]: {
      _id: string;
      priority: string;
      dueDate: string;
      title: string;
      listId: string;
      spaceId: string;
    }[];
  } = {};

  days.forEach((day) => {
    const formattedDate = moment(day).format("YYYY-MM-DD");
    tasksByDate[formattedDate] = allTasks
      .filter((task) => task.dueDate && moment(task.dueDate).isSame(day, "day"))
      .sort((a, b) => moment(a.dueDate).diff(moment(b.dueDate)));
  });

  return (
    <div className="w-full h-full rounded-lg shadow-md border border-gray-300 bg-white dark:bg-darkBg">
      <div className="flex justify-end p-4 bg-white shadow-lg rounded-t-lg dark:bg-darkBg">
        <button
          onClick={handlePreviousWeek}
          className="text-gray-600 hover:text-gray-800 px-3">
          &lt;
        </button>

        <span className="font-bold text-lg">
          {currentDate.toDateString() === new Date().toDateString()
            ? "This Week"
            : `${days[0].toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })} - ${days[days.length - 1].toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}`}
        </span>

        <button
          onClick={handleNextWeek}
          className="text-gray-600 hover:text-gray-800 px-3">
          &gt;
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100%-64px)]">
        <div className="grid grid-cols-[150px,1fr] border-t border-gray-300">
          <div className="border border-gray-300 bg-gray-100 dark:bg-darkBg"></div>
          <div className="border border-gray-300 bg-gray-100 dark:bg-darkBg text-center font-bold">
            Tasks
          </div>

          {days.map((day, index) => (
            <React.Fragment key={index}>
              <Link
                href={`/w/${workSpaceId}/calendar?tab=Day&date=${moment(
                  day
                ).format("MM-DD")}`}>
                <div className="flex items-center justify-center border h-full border-gray-300 bg-gray-100 hover:bg-gray-200 font-light dark:bg-darkBg dark:hover:bg-zinc-700 ">
                  {`${day.toLocaleString("en-US", {
                    weekday: "short",
                  })} ${day.getDate()}`}
                </div>
              </Link>
              <div className="flex justify-between w-full items-center border border-gray-300 bg-white dark:bg-darkBg p-2">
                <div className="flex gap-2 flex-wrap">
                  {tasksByDate[moment(day).format("YYYY-MM-DD")].length > 0 ? (
                    tasksByDate[moment(day).format("YYYY-MM-DD")].map(
                      (task) => (
                        <Link
                          key={task._id}
                          href={`/w/${workSpaceId}/spaces/${task.spaceId}?task=${task._id}&list=${task.listId}`}>
                          <div
                            className={clsx(
                              "bg-gray-200 rounded-md w-fit px-4 py-2 hover:scale-105 transition-transform",
                              {
                                "bg-red-300": task?.priority === "high",
                                "bg-yellow-200": task?.priority === "medium",
                                "bg-green-300": task?.priority === "low",
                              }
                            )}>
                            <p className="font-bold text-gray-800 ">
                              {task.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              Due: {moment(task.dueDate).format("h:mm A")}
                            </p>
                          </div>
                        </Link>
                      )
                    )
                  ) : (
                    <p className="text-gray-500">No tasks</p>
                  )}
                </div>
                <CreateTask dueTime={{ chosenDate: day }}>
                  <Button size="icon" variant="ghost">
                    <PlusIcon />
                  </Button>
                </CreateTask>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekCalendar;
