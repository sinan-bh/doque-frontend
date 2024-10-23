"use client";

// import StackedAvatars from "@/components/ui/stacked-avatars";
import { useAppSelector } from "@/lib/store/hooks";
import { formatedDate } from "@/components/workspace/dashboard/task-list";
import React, { useState } from "react";

const HighPriorityTask: React.FC = () => {
  const { spaces } = useAppSelector((state) => state.space);
  const { selectedProjectId } = useAppSelector((state) => state.workspace);

  const selectedSpace = spaces.find((space) => space._id === selectedProjectId);

  const highPriorityTasks = selectedSpace
    ? selectedSpace.lists.flatMap((list) => 
        list.tasks.filter((task) => task.priority === "high")
      )
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < highPriorityTasks.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      // Wrap around to the first task
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else {
      // Wrap around to the last task
      setCurrentIndex(highPriorityTasks.length - 1);
    }
  };

  return (
    <div className="w-full h-[180px] bg-white  rounded-lg shadow-md p-2 space-y-2 dark:bg-gray-800">
      {highPriorityTasks.length > 0 ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-red-600 bg-red-100 px-1 rounded-full">
              {highPriorityTasks[currentIndex].priority}
            </span>
            <div className="space-x-1">
              <button className="focus:outline-none" onClick={handlePrev}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="focus:outline-none" onClick={handleNext}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          {(highPriorityTasks[currentIndex].createdAt && highPriorityTasks[currentIndex].dueDate) && (
            <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-300">
              <p>Created at {formatedDate(highPriorityTasks[currentIndex].createdAt)}</p>
              <p>Due Date {formatedDate(highPriorityTasks[currentIndex].dueDate)}</p>
            </div>
          )}
          <h3 className="text-xs text-gray-900 dark:text-gray-300">{highPriorityTasks[currentIndex].title}</h3>
          <p className="text-[10px] text-gray-600 dark:text-gray-400">{highPriorityTasks[currentIndex].description}</p>

          <div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">ToDo</span>
            <div className="flex items-center mt-1 space-x-2">
              {/* <StackedAvatars max={3} members={[{},{},{},{}]} size="sm" space="high" /> */}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No high priority tasks available</p>
      )}
    </div>
  );
};

export default HighPriorityTask;
