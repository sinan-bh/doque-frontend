import React from "react";
import {
  Workspace,
} from "../../../lib/store/features/admin/workspace-slice";

import {
  UserIcon,
  CalendarIcon,
  ClipboardListIcon,
} from "@heroicons/react/solid";
import { Member } from "@/lib/store/features/admin/member-slice";

interface WorkspaceDetailsContentProps {
  workspace: Workspace;
  members: Member[];
  loading: boolean;
  error: string | null;
}

const WorkspaceDetailsContent: React.FC<WorkspaceDetailsContentProps> = ({
  workspace,
  members,
  loading,
  error,
}) => {
  const getCreatorDetails = (creatorId: string) => {
    return members.find((member) => member._id === creatorId);
  };

  const getMemberDetails = (memberId: string) => {
    return members.find((member) => member._id === memberId);
  };

  const creatorDetails = workspace
    ? getCreatorDetails(workspace.createdBy)
    : null;

  return (
    <div className="rounded-lg p-8 bg-gray-50 dark:bg-gray-800 shadow-lg transition-all duration-300">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      {workspace ? (
        <div>
          <div className="flex flex-col md:flex-row items-start justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {workspace.name}
              </h2>
              {creatorDetails && (
                <div className="flex items-center mb-2">
                  <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Created by: {creatorDetails.firstName}{" "}
                    {creatorDetails.lastName}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center mb-1">
                <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                <p className="text-gray-600 dark:text-gray-400">
                  Created on:{" "}
                  {new Date(workspace.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                <p className="text-gray-600 dark:text-gray-400">
                  Updated on:{" "}
                  {new Date(workspace.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <ClipboardListIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
            <p className="text-gray-600 dark:text-gray-300">
              Description: {workspace.description}
            </p>
          </div>

          <div className="flex items-center mb-4 ml-6">
            <p className="text-gray-600 dark:text-gray-300">
              No of Spaces: {workspace.space.length}
            </p>
          </div>

          <hr className="my-8 border-gray-300 dark:border-gray-600" />

          <div>
            <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Members
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workspace.members.map((member) => {
                const memberDetails = getMemberDetails(member.user);
                return memberDetails ? (
                  <div
                    key={member._id}
                    className="flex items-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
                  >
                    <UserIcon className="w-10 h-10 text-blue-500 dark:text-blue-400 mr-3" />
                    <div>
                      <p className="text-gray-800 dark:text-gray-100 font-medium text-lg">
                        {memberDetails.firstName} {memberDetails.lastName}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Status: {member.status}
                      </p>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      ) : (
        !loading && (
          <p className="text-gray-600 dark:text-gray-300">
            No workspace details available.
          </p>
        )
      )}
    </div>
  );
};

export default WorkspaceDetailsContent;
