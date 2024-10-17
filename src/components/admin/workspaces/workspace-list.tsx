import React from "react";
import Link from "next/link";

interface Workspace {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const workspaceData: Workspace[] = [
  {
    _id: "60d0fe4f5311236168a109cb",
    name: "Project Workspace",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-02T00:00:00.000Z",
  },
  {
    _id: "60d0fe4f5311236168a109klm",
    name: "Task Workspace",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-02T00:00:00.000Z",
  },
  {
    _id: "60d0fe4f5311236168a109fu",
    name: "Design Workspace",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-02T00:00:00.000Z",
  },
];

export default function WorkspaceList() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Workspaces
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workspaceData.map((workspace) => (
          <Link
            key={workspace._id}
            href={`/admin/workspaces/${workspace._id}`}
            className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg block hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {workspace.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Created on: {new Date(workspace.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Updated on: {new Date(workspace.updatedAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
