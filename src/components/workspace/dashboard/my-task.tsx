"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Task {
  id: string;
  workspaceName: string;
  taskName: string;
  workspaceUrl: string;
}

const sampleTasks: Task[] = [
  {
    id: "1",
    workspaceName: "Development Workspaceeeeeeeeeeeeeeeeeeee",
    taskName:
      "Fix Login Bug dl;ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    workspaceUrl: "/workspace/1",
  },
  {
    id: "2",
    workspaceName: "Marketing Wddddddddddddddddddddorkspace",
    taskName: "Prepare Campaign",
    workspaceUrl: "/workspace/2",
  },
  {
    id: "3",
    workspaceName: "Design Workspace",
    taskName: "UI Mockupfffffffffffffffffffffffffff",
    workspaceUrl: "/workspace/3",
  },
  {
    id: "4",
    workspaceName: "Sales Workspace",
    taskName: "Client Outreach",
    workspaceUrl: "/workspace/4",
  },
  {
    id: "5",
    workspaceName: "HR Workspace",
    taskName: "Employee Onboarding",
    workspaceUrl: "/workspace/5",
  },
  {
    id: "6",
    workspaceName: "Finance Workspace",
    taskName: "Budget Planning",
    workspaceUrl: "/workspace/6",
  },
];

export default function MyTask() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="p-4 mb-2">
      <h3 className="text-gray-600 text-lg font-semibold dark:text-gray-300">
        My Tasks
      </h3>
      <Slider {...settings} className="mt-4">
        {sampleTasks.map((task) => (
          <div
            key={task.id}
            className="group flex-shrink-0 w-60 h-28 border border-gray-500 dark:bg-gray-800 p-6 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
          >
            <div>
              <p
                className="text-sm font-medium dark:text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap "
                title={task.workspaceName}
              >
                {task.workspaceName}
              </p>
              <p
                className="text-xs text-gray-600 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap "
                title={task.taskName}
              >
                {task.taskName}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
