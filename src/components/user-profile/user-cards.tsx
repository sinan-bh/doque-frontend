"use client";

import instance from "@/utils/axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import clsx from "clsx";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FaRegClock } from "react-icons/fa";
import Link from "next/link";

export function Usercards() {
  const [assignedSpaces, setAssignedSpaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workspacesResp = await instance.get(
          "/workspace"
        );
        const userWorkspaces = workspacesResp.data.data;
        const workspaceIds = userWorkspaces.map(
          (workspace: { WorkspaceId: string }) => workspace.WorkspaceId
        );

        const spacesResp = await instance.get(
          "/space"
        );
        const allSpaces = spacesResp.data.data;

        const matchedSpaces = allSpaces.filter((space: { workspace: string }) =>
          workspaceIds.includes(space.workspace)
        );

        const currentUser = Cookies.get("user");
        const user = JSON.parse(currentUser||"{}");
        const currentUserId = user.id;

        const assignedSpaces = matchedSpaces.filter(
          (space: { lists: any[] }) => {
            return space.lists.some((listItem) =>
              listItem.tasks.some((task: { assignedTo: string[] }) =>
                task.assignedTo.includes(currentUserId)
              )
            );
          }
        );

        setAssignedSpaces(assignedSpaces);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="p-8 min-h-screen">
      <div className="flex flex-wrap gap-4 justify-start">
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
                            key={task._id}
                          >
                            <Card
                              key={task._id}
                              className="w-[300px] m-3 max-w-full overflow-hidden border rounded-lg shadow-md"
                            >
                              <div
                                className={clsx("h-6", {
                                  "bg-red-300": task?.priority === "high",
                                  "bg-yellow-300": task?.priority === "medium",
                                  "bg-green-300": task?.priority === "low",
                                })}
                              ></div>
                              <CardHeader className="p-4">
                                <div className="flex flex-col space-y-2">
                                  <CardTitle className="font-semibold text-gray-900">
                                    Space:{" "}
                                    <span className="font-light text-gray-700">
                                      {space.name}
                                    </span>
                                  </CardTitle>
                                  <CardTitle className="font-semibold text-gray-900">
                                    List:{" "}
                                    <span className="font-light text-gray-700">
                                      {listItem.name}
                                    </span>
                                  </CardTitle>

                                  <div className="flex items-center space-x-2">
                                    <p className="font-semibold">Priority:</p>
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
                                      )}
                                    >
                                      {task.priority}
                                    </p>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardFooter className="flex justify-between items-center">
                                <div className="flex items-center space-x-1">
                                  <FaRegClock className="text-gray-500" />
                                  <span className="text-xs text-gray-600">
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
          <p>No assigned spaces found.</p>
        )}
      </div>
    </div>
  );
}
