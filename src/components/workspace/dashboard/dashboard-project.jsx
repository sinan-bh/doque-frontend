import React from "react";
import ProjectCard from "./project-cards";
import TaskList from "./task-list";
import HighPriorityTask from "./high-priority-task";
import CommentsList from "./comments-list";
import { IoMdAddCircleOutline } from "react-icons/io";
import { NewSpaceButton } from "@/components/spaces/new-space-button";

export default function DashboardProject() {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center px-4 mb-4">
        <div className="font-extrabold text-xl">Project</div>
        <div className="font-semibold text-xs text-gray-600 flex items-center cursor-pointer">
          <NewSpaceButton>
            <div className="flex">
              <IoMdAddCircleOutline size={15} className="mr-1" />
              <span>Add New Project</span>
            </div>
          </NewSpaceButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <ProjectCard />
          <TaskList />
        </div>
        <div className="space-y-4">
          <HighPriorityTask />
          <CommentsList />
        </div>
      </div>
    </div>
  );
}
