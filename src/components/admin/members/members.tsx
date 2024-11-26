import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiSquareInfo } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../../../lib/store/hooks";
import {
  fetchMembers,
  selectMembers,
  selectLoading,
  selectError,
} from "../../../lib/store/features/admin/admin-member-slice";
import { FiSearch } from "react-icons/fi";
import StatusButton from "./blockuser-btn";
import MembersSkeleton from "@/components/ui/admin/members-skelton";
import { AdminWorkspace } from "@/lib/store/features/admin/admin-workspace-slice";

export default function Members() {
  const dispatch = useAppDispatch();
  const members = useAppSelector(selectMembers);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const filteredMembers = members.filter((member) =>
    `${member.firstName} ${member.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (userId: string) => {
    setSelectedUser((prev) => (prev === userId ? null : userId));
  };

  return (
    <div className="flex h-full overflow-hidden ml-3">
      <main className="flex-1 pl-6 sm:pl-1 bg-gray-100 dark:bg-gray-900">
        <header className="mb-4 flex flex-col sticky top-0 z-20 ">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-2xl ml-1 font-bold text-gray-600 dark:text-gray-200">
              Members
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border outline-none border-gray-300 dark:border-gray-600 rounded-full w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                aria-label="Search Members"
              />
              <FiSearch className="absolute hidden sm:block right-3 top-2.5 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
          <div className="hidden sm:block mt-2">
            <table className="w-full bg-gray-300 dark:bg-gray-700 rounded-lg">
              <thead className="sticky top-0 z-10">
                <tr>
                  <th className="p-4 pl-12 text-gray-600 dark:text-gray-200">
                    User
                  </th>
                  <th className="p-4 pl-48 text-gray-600 dark:text-gray-200">
                    Email
                  </th>
                  <th className="p-4 pl-12 text-gray-600 dark:text-gray-200">
                    Workspace
                  </th>
                  <th className="p-4 text-gray-600 dark:text-gray-200">
                    Status
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <MembersSkeleton />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 dark:text-red-400">{error}</p>
        ) : (
          <div className="overflow-y-auto h-[calc(100vh-220px)]">
            {filteredMembers.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">
                Users not found.
              </p>
            ) : (
              <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <tbody>
                  {filteredMembers.map((member) => (
                    <React.Fragment key={member._id}>
                      <tr className="border-b dark:border-gray-600 sm:table-row">
                        <td
                          className="p-4 flex flex-col items-start sm:flex-row sm:items-center"
                          onClick={() => handleRowClick(member._id)}
                        >
                          <Image
                            src={
                              member.image &&
                              member.image.startsWith(
                                "https://res.cloudinary.com"
                              )
                                ? member.image
                                : "/images/avatarFallback.png"
                            }
                            alt="User Image"
                            width={40}
                            height={40}
                            className="rounded-full mr-4"
                          />
                          <div className="text-gray-800 dark:text-gray-200 flex items-center">
                            <span className="mr-2">
                              {member.firstName} {member.lastName}
                            </span>
                            <CiSquareInfo className="text-gray-600 dark:text-gray-300" />
                          </div>
                          <div className="flex flex-col sm:hidden mt-2">
                            <span>{member.email}</span>
                            <span>{`workspaces: ${
                              member.activeWorkspaces.length || 0
                            }`}</span>
                            <div className="mt-2">
                              <StatusButton
                                initialStatus={member.isBlocked}
                                memberId={member._id}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-800 dark:text-gray-200 hidden sm:table-cell">
                          {member.email}
                        </td>
                        <td className="p-4 text-gray-800 dark:text-gray-200 hidden sm:table-cell">
                          {`workspaces: ${member.activeWorkspaces.length || 0}`}
                        </td>
                        <td className="p-4 hidden sm:table-cell">
                          <StatusButton
                            initialStatus={member.isBlocked}
                            memberId={member._id}
                          />
                        </td>
                      </tr>

                      {selectedUser === member._id && (
                        <tr className="border-b dark:border-gray-600">
                          <td colSpan={4} className="p-4">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                              <div className="flex items-center space-x-6">
                                <Image
                                  src={member.image}
                                  alt={`${member.firstName} ${member.lastName}`}
                                  width={40}
                                  height={40}
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                    {member.firstName} {member.lastName}
                                  </h2>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {member.email}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-6 space-y-4">
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    Account Status
                                  </h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    <strong>Status:</strong>{" "}
                                    {member.status === "active"
                                      ? "Active"
                                      : "Inactive"}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    <strong>Subscription Plan:</strong>
                                    {member.subscription}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    <strong>Verified:</strong>{" "}
                                    {member.verified ? "Yes" : "No"}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    <strong>Blocked:</strong>{" "}
                                    {member.isBlocked ? "Yes" : "No"}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    <strong>Account Created:</strong>{" "}
                                    {new Date(
                                      member.createdAt
                                    ).toLocaleDateString()}
                                  </p>
                                </div>

                                <div>
                                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    Workspaces
                                  </h3>
                                  {member.activeWorkspaces.length > 0 ? (
                                    member.activeWorkspaces.map(
                                      (workspace: AdminWorkspace) => (
                                        <div
                                          key={workspace._id}
                                          className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4"
                                        >
                                          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                            {workspace.name}
                                          </h4>
                                          <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {workspace.description}
                                          </p>

                                          <p className="text-sm text-gray-500 dark:text-gray-400">
                                            <strong>Visibility:</strong>{" "}
                                            {workspace.visibility}
                                          </p>
                                          <p className="text-sm text-gray-500 dark:text-gray-400">
                                            <strong>Created At:</strong>{" "}
                                            {new Date(
                                              workspace.createdAt
                                            ).toLocaleDateString()}
                                          </p>
                                        </div>
                                      )
                                    )
                                  ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      No active workspaces found.
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
