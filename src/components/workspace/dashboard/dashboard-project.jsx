import React from "react";
import ProjectCard from "./project-cards";
import TaskList from "./task-list";
import HighPriorityTask from "./high-priority-task";
import CommentsList from "./comments-list";
import { IoMdAddCircleOutline } from "react-icons/io";
import { NewSpaceButton } from "@/components/spaces/new-space-button";
import MyTask from "./my-task";

export default function DashboardProject() {
  return (
    <div className="max-w-3xl h-auto min-h-[calc(100vh-150px)] bg-white rounded-lg shadow-md p-4 dark:bg-darkBg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 mb-4">
        <div className="font-extrabold text-xl dark:text-gray-300 mb-2 sm:mb-0">
          Project
        </div>
        <div className="font-semibold text-xs text-gray-600 flex items-center cursor-pointer">
          <NewSpaceButton>
            <div className="flex items-center">
              <IoMdAddCircleOutline size={15} className="mr-1" />
              <span className="dark:text-gray-300">Add New Project</span>
            </div>
          </NewSpaceButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <ProjectCard />
          <TaskList />
        </div>
        <div className="space-y-4">
          <HighPriorityTask />
          <CommentsList />
        </div>
      </div>

      <div className="mt-6">
        <MyTask />
      </div>
    </div>
  );
}
