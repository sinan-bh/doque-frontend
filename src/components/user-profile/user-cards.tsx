"use client";

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import clsx from "clsx";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FaRegClock } from "react-icons/fa";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { assignedTask } from "@/lib/store/features/userSlice";

interface Task {
  task: {
    id: string;
    title: string;
    dueDate: string;
    priority: string;
  };
  list: {
    id: string;
    name: string;
  };
  space: {
    id: string;
    name: string;
  };
}

export function Usercards() {
  const { assignedTasks, loading } = useAppSelector((state) => state.user);
  const currentUser = Cookies.get("user");
  const user = JSON.parse(currentUser || "{}");
  const id = user.id;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(assignedTask(id));
  }, [dispatch, id]);

  const tasks = assignedTasks?.data || [];

  return (
    <div className="p-8 min-h-screen">
      <div className="flex flex-wrap gap-4 justify-start">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : tasks.length > 0 ? (
          tasks.map((taskData: Task) => {
            const { task, list, space } = taskData;
            return (
              <Link
                href={`/w/${space.id}/spaces/${space.id}?task=${task.id}&list=${list.id}`}
                key={task.id}>
                <Card
                  key={task.id}
                  className="w-[300px] m-3 max-w-full overflow-hidden border rounded-lg shadow-md dark:bg-gray-950">
                  <div
                    className={clsx("h-6", {
                      "bg-red-300": task?.priority === "high",
                      "bg-yellow-300": task?.priority === "medium",
                      "bg-green-300": task?.priority === "low",
                    })}></div>
                  <CardHeader className="p-4">
                    <div className="flex flex-col space-y-2">
                      <CardTitle className="font-normal text-gray-900 dark:text-gray-100">
                        Space :{" "}
                        <span className="font-semibold text-gray-700 dark:text-gray-100">
                          {space.name}
                        </span>
                      </CardTitle>
                      <CardTitle className="font-normal text-gray-900 dark:text-gray-100">
                        List :{" "}
                        <span className="font-semibold text-gray-700 dark:text-gray-100">
                          {list.name}
                        </span>
                      </CardTitle>

                      <div className="flex items-center space-x-2">
                        <p className="font-normal">Priority : </p>
                        <p
                          className={clsx("text-sm px-2 py-1 rounded-lg", {
                            "text-red-700 bg-red-100":
                              task?.priority === "high",
                            "text-yellow-700 bg-yellow-100":
                              task?.priority === "medium",
                            "text-green-700 bg-green-100":
                              task?.priority === "low",
                          })}>
                          {task.priority}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <FaRegClock className="text-gray-500" />
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        {task?.dueDate
                          ? new Date(task.dueDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Not set"}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            );
          })
        ) : (
          <p>No assigned tasks found.</p>
        )}
      </div>
    </div>
  );
}
