/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import instance from "@/utils/axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import clsx from "clsx";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FaRegClock } from "react-icons/fa";
import Link from "next/link";
import { Space } from "@/types/spaces";
import { axiosErrorCatch } from "@/utils/axiosErrorCatch";

export function Usercards() {
  const [assignedSpaces, setAssignedSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const workspacesResp = await instance.get("/workspace");
        const userWorkspaces = workspacesResp.data.data;
        const workspaceIds = userWorkspaces.map(
          (workspace: { workspaceId: string }) => workspace.workspaceId
        );

        const spacesResp = await instance.get("/space");
        const allSpaces = spacesResp.data.data;

        const matchedSpaces = allSpaces.filter((space: { workspace: string }) =>
          workspaceIds.includes(space.workspace)
        );

        const currentUser = Cookies.get("user");
        const user = JSON.parse(currentUser || "{}");
        const currentUserId = user.id;

        const assignedSpaces = matchedSpaces
          .map((space: { lists: any[] }) => {
            const filteredLists = space.lists
              .map((listItem) => {
                const filteredTasks = listItem.tasks.filter(
                  (task: { assignedTo: string[] }) =>
                    task.assignedTo.includes(currentUserId)
                );
                return { ...listItem, tasks: filteredTasks };
              })
              .filter((listItem) => listItem.tasks.length > 0);

            return { ...space, lists: filteredLists };
          })
          .filter((space: Space) => space.lists.length > 0);
        setAssignedSpaces(assignedSpaces);
      } catch (error) {
        setError(axiosErrorCatch(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 min-h-screen">
      <div className="flex flex-wrap gap-4 justify-start">
        {isLoading && <p>Loading....</p>}
        {error && <p className="text-red-600">{error}</p>}
        {assignedSpaces.length > 0 ? (
          assignedSpaces.map(
            (space: {
              _id: string;
              workspace: string;
              name: string;
              lists: any[];
            }) => (
              <div key={space._id} className="flex justify-between w-full">
                {space.lists.map(
                  (listItem: { _id: string; name: string; tasks: any[] }) => (
                    <div key={listItem._id}>
                      {listItem.tasks.map(
                        (task: {
                          _id: string;
                          priority: string;
                          dueDate: string;
                        }) => (
                          <Link
                            href={`/w/${space.workspace}/spaces/${space._id}?task=${task._id}&list=${listItem._id}`}
                            key={task._id}>
                            <Card
                              key={task._id}
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
                                      {listItem.name}
                                    </span>
                                  </CardTitle>

                                  <div className="flex items-center space-x-2">
                                    <p className="font-normal">Priority : </p>
                                    <p
                                      className={clsx(
                                        "text-sm px-2 py-1 rounded-lg",
                                        {
                                          "text-red-700 bg-red-100":
                                            task?.priority === "high",
                                          "text-yellow-700 bg-yellow-100":
                                            task?.priority === "medium",
                                          "text-green-700 bg-green-100":
                                            task?.priority === "low",
                                        }
                                      )}>
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
                                      ? new Date(
                                          task.dueDate
                                        ).toLocaleDateString("en-US", {
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
                        )
                      )}
                    </div>
                  )
                )}
              </div>
            )
          )
        ) : (
          <>{!isLoading && !error && <p>No assigned spaces found.</p>}</>
        )}
      </div>
    </div>
  );
}
