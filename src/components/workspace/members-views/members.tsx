"use client";

import React, { useEffect, useState } from "react";
import MembersGrid from "@/components/workspace/members-views/member-grid";
import MembersList from "@/components/workspace/members-views/member-list";
import { IoGrid, IoList } from "react-icons/io5";
import { FiFilter, FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import {
  fetchUserProfiles,
  fetchWorkspaceMembers,
  Member,
  Users,
} from "@/lib/store/features/workspace-slice";
import { useParams } from "next/navigation";

export default function Members() {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<"members" | "teams">("members");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortType, setSortType] = useState<"name" | "">("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleTabSwitch = (tab: "members" | "teams") => setActiveTab(tab);
  const handleViewSwitch = (view: "grid" | "list") => setViewType(view);

  const { members, users }: { members: Member[]; users: Users[] } = useSelector(
    (state: RootState) => state.workspace
  );
  const { workSpaceId }: { workSpaceId: string } = useParams();

  const filteredUsers = users
    ?.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === "name") {
        return `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        );
      }
      return 0;
    });

  const renderContent = () => {
    if (activeTab === "members") {
      return viewType === "grid" ? (
        <MembersGrid members={filteredUsers} />
      ) : (
        <MembersList members={filteredUsers} />
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchWorkspaceMembers({ workSpaceId }));
    };
    fetchData();
  }, [workSpaceId]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUserProfiles({ members }));
    };
    fetchData();
  }, [members]);

  return (
    <div>
      <div className="border-b border-gray-300 mb-4 relative dark:border-gray-600">
        <div className="flex sm:flex-row justify-between ">
          <div className="flex mt-2">
            <h2
              className={`text-base font-semibold cursor-pointer ${
                activeTab === "members"
                  ? "border-b-2 border-gray-300"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => handleTabSwitch("members")}
            >
              Members
            </h2>
          </div>
          <div className="flex items-center pb-2">
            <div className="relative flex items-center text-sm">
              <FiSearch
                size={16}
                className="absolute left-3 text-gray-400 dark:text-gray-500"
              />
              <input
                type="text"
                className="pl-10 w-56 sm:w-72 pr-4 py-2 border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 focus:outline-none"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mt-4 gap-2 sm:mt-0">
          <div className="relative flex items-center">
            <FiFilter
              className="w-5 h-5 text-sm text-gray-600 dark:text-gray-300 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />

            {isDropdownOpen && (
              <div className="absolute right-0 mt-20 w-40 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-600">
                <ul className="py-1">
                  <li
                    className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSortType("name");
                      setIsDropdownOpen(false);
                    }}
                  >
                    Name
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <div
              className={`p-2 rounded cursor-pointer ${
                viewType === "grid"
                  ? "bg-gray-600 dark:bg-gray-200"
                  : "bg-transparent"
              }`}
              onClick={() => handleViewSwitch("grid")}
              title="Grid View"
            >
              <IoGrid
                className={`text-gray-600 dark:text-gray-300 text-sm ${
                  viewType === "grid" ? "text-gray-100 dark:text-gray-600" : ""
                }`}
              />
            </div>
            <div
              className={`p-2 rounded cursor-pointer ${
                viewType === "list"
                  ? "bg-gray-600 dark:bg-gray-200"
                  : "bg-transparent"
              }`}
              onClick={() => handleViewSwitch("list")}
              title="List View"
            >
              <IoList
                className={`text-gray-600 dark:text-gray-300 text-sm ${
                  viewType === "list" ? "text-gray-100 dark:text-gray-600" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>{renderContent()}</div>
      </div>
    </div>
  );
}
