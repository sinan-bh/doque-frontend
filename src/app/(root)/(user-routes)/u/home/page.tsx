import React from "react";
import MyWorkSpace from "@/components/user-home/my-workspace";
import GuestWorkSpaces from "@/components/user-home/guest-workspace";
import Carousel from "@/components/user-home/carousel";
import { cards } from "@/consts/user-home-cards";

export default function Workspace() {
  return (
    <div className="w-full p-4 flex-grow bg-[#EDF1F4] overflow-auto hide-scrollbar dark:bg-gray-950">
      <h1 className="text-3xl text-[#3B3C3D] font-bold ml-5 mb-4">
        My Workspaces
      </h1>

      <MyWorkSpace />

      <GuestWorkSpaces />

      <h1 className="text-3xl text-[#3B3C3D] font-bold ml-5 mb-4">Templates</h1>
      <Carousel cards={cards} />
    </div>
  );
}
