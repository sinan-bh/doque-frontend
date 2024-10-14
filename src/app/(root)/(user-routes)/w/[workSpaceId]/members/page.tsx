"use client";

import React, {  useState } from "react";
import MembersGrid from "@/components/workspace/members-views/member-grid";
import MembersList from "@/components/workspace/members-views/member-list";
import TeamsGrid from "@/components/workspace/members-views/team-grid";
import TeamsList from "@/components/workspace/members-views/team-list";
import { members, teams } from "@/consts/members-datas";
import { IoGrid, IoList } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
// import axios from "axios";

// type InvitedMembers = {
//   data: {
//     user: string;
//     status: string;
//   };
// };

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDc3OWExNDQ0MGIwYmE1NzZmNDEzNyIsImlhdCI6MTcyODU0MzM1MywiZXhwIjoxNzMxMTM1MzUzfQ.et4X9HazmsOZ7N4X20V4wlpOM26ubCthEFVJGLvPrGs";


export default function Page() {
  const [activeTab, setActiveTab] = useState<"members" | "teams">("members");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  // const [data, setData] = useState<InvitedMembers[]>([]);

  const handleTabSwitch = (tab: "members" | "teams") => setActiveTab(tab);
  const handleViewSwitch = (view: "grid" | "list") => setViewType(view);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const workspaceId = "6707881d4440b0ba576f4162";
  //       const response = await axios.get(
  //         `https://daily-grid-rest-api.onrender.com/api//workspaces/${workspaceId}/invited-members`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setData(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const renderContent = () => {
    if (activeTab === "members") {
      return viewType === "grid" ? (
        <MembersGrid members={members} />
      ) : (
        <MembersList members={members} />
      );
    } else {
      return viewType === "grid" ? (
        <TeamsGrid teams={teams} />
      ) : (
        <TeamsList teams={teams} />
      );
    }
  };

  return (
    <div className="p-5 bg-gray-100 mx-auto h-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Members</h1>
      </div>

      <div className="border-b border-gray-300 mb-4 relative ">
        <div className="flex justify-between ">
          <div className="flex space-x-4 mt-2">
            <h2
              className={`text-base font-semibold cursor-pointer ${activeTab === "members"
                  ? "border-b-2 border-blue-600"
                  : "text-gray-600"
                }`}
              onClick={() => handleTabSwitch("members")}>
              Members
            </h2>
            <h2
              className={`text-base font-semibold cursor-pointer ${activeTab === "teams"
                  ? "border-b-2 border-blue-600"
                  : "text-gray-600"
                }`}
              onClick={() => handleTabSwitch("teams")}>
              Teams
            </h2>
          </div>
          <div className="flex items-center space-x-4 pb-2">
            <div className="relative flex items-center text-sm">
              <FiSearch className="absolute left-3 text-gray-400" />
              <input
                type="text"
                className="pl-10 pr-4 py-2 border-none rounded-xl focus:outline-none"
                placeholder="Search..."
              />
              <select className="ml-4 px-3 py-2 rounded-xl focus:outline-none">
                <option value="">Sort by</option>
                <option value="name">Name</option>
                <option value="date">Date Joined</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className={`p-2 rounded-full cursor-pointer ${viewType === "grid" ? "bg-red-200" : "bg-transparent"
                  }`}
                onClick={() => handleViewSwitch("grid")}
                title="Grid View">
                <IoGrid
                  className={`text-gray-600 text-xl ${viewType === "grid" ? "text-blue-600" : ""
                    }`}
                />
              </div>
              <div
                className={`p-2 rounded-full cursor-pointer ${viewType === "list" ? "bg-red-200" : "bg-transparent"
                  }`}
                onClick={() => handleViewSwitch("list")}
                title="List View">
                <IoList
                  className={`text-gray-600 text-2xl ${viewType === "list" ? "text-blue-600" : ""
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
