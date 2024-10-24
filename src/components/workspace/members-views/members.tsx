"use client";

import React, { useEffect, useState } from "react";
import MembersGrid from "@/components/workspace/members-views/member-grid";
import MembersList from "@/components/workspace/members-views/member-list";
import { IoGrid, IoList } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
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
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
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
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300">Members</h1>
      </div>

      <div className="border-b border-gray-300 mb-4 relative ">
        <div className="flex justify-between ">
          <div className="flex space-x-4 mt-2">
            <h2
              className={`text-base font-semibold cursor-pointer ${
                activeTab === "members"
                  ? "border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabSwitch("members")}
            >
              Members
            </h2>
          </div>
          <div className="flex items-center space-x-4 pb-2">
            <div className="relative flex items-center text-sm">
              <FiSearch className="absolute left-3 text-gray-400" />
              <input
                type="text"
                className="pl-10 pr-4 py-2 border-none rounded-xl focus:outline-none"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="ml-4 px-3 py-2 rounded-xl focus:outline-none"
                value={sortType}
                onChange={(e) => setSortType(e.target.value as "name" | "")}
              >
                <option value="">Sort by</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className={`p-2 rounded-full cursor-pointer ${
                  viewType === "grid" ? "bg-red-200" : "bg-transparent"
                }`}
                onClick={() => handleViewSwitch("grid")}
                title="Grid View"
              >
                <IoGrid
                  className={`text-gray-600 text-xl ${
                    viewType === "grid" ? "text-blue-600" : ""
                  }`}
                />
              </div>
              <div
                className={`p-2 rounded-full cursor-pointer ${
                  viewType === "list" ? "bg-red-200" : "bg-transparent"
                }`}
                onClick={() => handleViewSwitch("list")}
                title="List View"
              >
                <IoList
                  className={`text-gray-600 text-2xl ${
                    viewType === "list" ? "text-blue-600" : ""
                  }`}
                />
              </div>
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
