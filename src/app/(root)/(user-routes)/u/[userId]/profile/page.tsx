"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Usercards } from "@/components/user-profile/user-cards";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchUserProfile } from "@/lib/store/features/userSlice";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"activity" | "cards">("activity");
  const dispatch = useAppDispatch();
  const { userProfile } = useAppSelector((state) => state.user);
 

  useEffect(() => {
    if (!userProfile) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, userProfile]);  const handleTabClick = (tab: "activity" | "cards") => {
    setActiveTab(tab);
  };

  return (
    <div className="p-8 min-h-screen bg-[#EDF1F4] dark:bg-darkBg">
      <div className="flex justify-around items-center p-4 rounded-lg mb-8">
        <div className=" items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage src={userProfile?.image||"https://i.pinimg.com/564x/a3/e4/7c/a3e47c7483116543b6fa589269b760df.jpg"} alt="User Profile" />
            <AvatarFallback />
          </Avatar>
          <div className="mt-3">
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {userProfile?.firstName} {userProfile?.lastName}
            </h1>
            <h3 className="text-sm text-gray-600 dark:text-gray-200">{userProfile?.email}</h3>
          </div>
        </div>
        <div className="bg-lime-300 p-0.5 rounded-lg dark:text-black">
          <h1 className="text-sm">Online</h1>
        </div>
      </div>

      <div className="flex-col pl-20 pr-20">
        <div className="flex mb-3 gap-8 pl-10 border-b-2 border-gray-300">
          <h2
            onClick={() => handleTabClick("activity")}
            className={`text-lg font-semibold cursor-pointer ${
              activeTab === "activity"
                ? "text-black border-b-2  dark:text-gray-100 border-gray-100"
                : "text-gray-500 dark:text-gray-300"
            }`}
          >
            Activity
          </h2>
          <h2
            onClick={() => handleTabClick("cards")}
            className={`text-lg font-semibold cursor-pointer ${
              activeTab === "cards"
                ? "text-black border-b-2 dark:text-gray-100 border-gray-100"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Cards
          </h2>
        </div>

        {activeTab === "activity" ? (
          <div>
            <div className="pl-4 p-3 rounded-lg flex items-center space-x-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={userProfile?.image} alt="User Profile" />
                <AvatarFallback />
              </Avatar>
              <div>
                <h1 className="text-lg text-gray-800 dark:text-gray-100">
                  {userProfile?.firstName} {userProfile?.lastName}
                  <span className="text-sm text-gray-500 dark:text-gray-300">- activity log</span>
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  30 Sept 2024, 11:49 . Activity performed in{" "}
                  <span className="font-semibold underline dark:text-gray-100">
                    Project Management
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Usercards />
        )}
      </div>
    </div>
  );
}
