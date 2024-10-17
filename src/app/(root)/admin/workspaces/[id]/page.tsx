"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

interface Workspace {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const mockResponse: Workspace = {
  _id: "60d0fe4f5311236168a109cb",
  name: "Project Workspace",
  createdAt: "2023-01-01T00:00:00.000Z",
  updatedAt: "2023-01-02T00:00:00.000Z",
};

export default function WorkspaceDetail() {
  const workspace = mockResponse;
  const router = useRouter();

  const handleBack = () => {
    router.push("/admin/workspaces");
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <button
          onClick={handleBack}
          className="mr-2 text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {workspace.name}
        </h2>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Created on: {new Date(workspace.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Updated on: {new Date(workspace.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
