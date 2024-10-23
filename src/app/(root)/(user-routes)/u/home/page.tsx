import React from "react";
import MyWorkSpace from "@/components/user-home/my-workspace";
import GuestWorkSpaces from "@/components/user-home/guest-workspace";

export default function Workspace() {
  return (
    <div className="w-full p-4 flex-grow bg-[#EDF1F4] overflow-auto hide-scrollbar dark:bg-gray-950">
      <h1 className="text-3xl text-[#3B3C3D] font-bold ml-5 mb-4">
        My Workspaces
      </h1>
      <MyWorkSpace />
      <h2 className="text-3xl text-[#3B3C3D] font-bold ml-5 mt-8 mb-4">
        Guest Workspaces
      </h2>
      <GuestWorkSpaces />
      {/* <h2 className="text-3xl text-[#3B3C3D] font-bold ml-5 mt-8 mb-4">
        Recently Visited
      </h2>
      <Carousel cards={recentlyVisitedCards} /> */}
    </div>
  );
}
