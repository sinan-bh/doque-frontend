import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/store/hooks";
import {
  fetchMembers,
  selectMembers,
  selectLoading,
  selectError,
} from "../../../lib/store/features/admin/admin-member-slice";
import { FiSearch } from "react-icons/fi";
import StatusButton from "./blockuser-btn";
import Spinner from "@/components/ui/spinner/spinner";

export default function Members() {
  const dispatch = useAppDispatch();
  const members = useAppSelector(selectMembers);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const filteredMembers = members.filter((member) =>
    `${member.firstName} ${member.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full overflow-hidden">
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
        <header className="mb-4 flex flex-col sticky top-0 z-20 ">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-600 dark:text-gray-200">
              Members
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <FiSearch className="absolute right-3 top-2.5 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
          <div className="mt-2">
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
                  <th className="p-4 pl- text-gray-600 dark:text-gray-200">
                    Status
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </header>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {<Spinner />}
          </p>
        ) : error ? (
          <p className="text-center text-red-500 dark:text-red-400">{error}</p>
        ) : filteredMembers.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Users not found.
          </p>
        ) : (
          <div className="overflow-y-auto h-[calc(100vh-220px)]">
            <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <tbody>
                {filteredMembers.map((member) => (
                  <tr
                    key={member._id}
                    className="border-b dark:border-gray-600"
                  >
                    <td className="p-4 flex items-center">
                      {member.image &&
                      member.image.startsWith("https://res.cloudinary.com") ? (
                        <Image
                          src={member.image}
                          alt="User Image"
                          width={40}
                          height={40}
                          className="rounded-full mr-4"
                        />
                      ) : (
                        <Image
                          src="/images/avatarFallback.png"
                          alt="Fallback Image"
                          width={40}
                          height={40}
                          className="rounded-full mr-4"
                        />
                      )}
                      <span className="text-gray-800 dark:text-gray-200">
                        {member.firstName} {member.lastName}
                      </span>
                    </td>
                    <td className="p-4 text-gray-800 dark:text-gray-200">
                      {member.email}
                    </td>
                    <td className="p-4 text-gray-800 dark:text-gray-200">
                      {`workspaces: ${member.activeWorkspace.length || 0}`}
                    </td>
                    <td className="p-4">
                      <StatusButton
                        initialStatus={member.isBlocked}
                        memberId={member._id}
                      />
                      <StatusButton
                        initialStatus={member.isBlocked}
                        memberId={member._id}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
          </div>
        )}
      </main>
    </div>
  );
}
