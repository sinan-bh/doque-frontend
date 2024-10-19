"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import Spaces from "./spaces";
import { FiSettings } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AddSpaceBtn } from "../ui/add-space";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/contexts/user-context";
import { AiFillHome } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";
import { ReactNode } from "react";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { useAppDispatch } from "@/lib/store/hooks";
import { fetchSpacesData } from "@/lib/store/thunks/space-thunks";

interface Workspace {
  name: string;
  WorkspaceId: string;
}

interface SidebarIcon {
  icon: ReactNode;
  label: string;
  href: string;
}

const Sidebar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [render, isRender] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [workspace, setWorkspace] = useState<Workspace[]>([]);
  const [activeRoute, setActiveRoute] = useState<string>("");
  const { userProfile, loggedUser } = useUser();

  const { workSpaceId }: { workSpaceId: string } = useParams();

  const dispatch = useAppDispatch();

  const sidebarItems: SidebarIcon[] = [
    {
      icon: <AiFillHome className="text-xl text-black mt-1" />,
      label: "Home",
      href: "/home",
    },
    {
      icon: <RiDashboardFill className="text-xl text-black  mt-1" />,
      label: "Dashboard",
      href: `/w/${workSpaceId}/dashboard`,
    },
    {
      icon: <BsFillPeopleFill className="text-xl text-black mt-1" />,
      label: "Members",
      href: `/w/${workSpaceId}/members`,
    },
    {
      icon: <FaCalendar className="text-xl text-black mt-1" />,
      label: "Calendar",
      href: `/w/${workSpaceId}/calendar`,
    },
  ];

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(
          "https://daily-grid-rest-api.onrender.com/api/workspace"
        );
        setWorkspace(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [render, loggedUser?.token]);

  useEffect(() => {
    setActiveRoute(window.location.pathname);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleRouteChange = (route: string) => {
    setActiveRoute(route);
    router.push(route);
  };

  const main = workspace.find((val) => val.WorkspaceId === workSpaceId);

  useEffect(() => {
    dispatch(fetchSpacesData(workSpaceId)); // populate spaces when workspace changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workSpaceId]);

  return (
    <div
      className={`relative h-full p-2 flex-shrink-0 flex flex-col transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}>
      <div className="relative">
        <div className="flex items-center justify-between p-3 bg-gray-200 rounded-md cursor-pointer">
          <div className="flex items-center h-10 pl-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userProfile?.image} alt="Workspace logo" />
              <AvatarFallback />
            </Avatar>
            {isSidebarOpen && (
              <h2 className="text-md text-black ml-2 h-5 overflow-hidden">
                {main?.name}
              </h2>
            )}
          </div>
          {isSidebarOpen && (
            <IoIosArrowDown
              className={`text-black transform transition-transform duration-300 cursor-pointer ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              onClick={toggleDropdown}
            />
          )}
        </div>

        {dropdownOpen && isSidebarOpen && (
          <div
            onMouseLeave={() => setDropdownOpen(false)}
            className="absolute top-full left-0 w-full bg-gray-300 shadow-xl rounded-xl z-50">
            <div className="border-b-2 border-gray-600 p-2">
              <h3 className="text-md text-black">Workspaces</h3>
            </div>
            {workspace.length > 0 ? (
              workspace.map((data, key) => (
                <Link href={`/w/${data.WorkspaceId}/dashboard`} key={key}>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer">
                    <h3 className="text-sm text-black">{data.name}</h3>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-2">No workspaces available</div>
            )}
            <div className="flex items-center justify-center p-2 hover:bg-gray-100 cursor-pointer">
              <FaPlus className="mr-2" />
              <AddSpaceBtn isRender={isRender} />
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 bg-gray-200 rounded-md mt-3 flex flex-col">
        <div className="p-4">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center p-2 cursor-pointer ${
                activeRoute === item.href
                  ? "border-l-4 border-black "
                  : "hover:border-l-4 border-transparent"
              }`}
              onClick={() => handleRouteChange(item.href)}>
              <div className="flex items-center">
                <div>{item.icon}</div>
                {isSidebarOpen && (
                  <h2 className="ml-3 text-black h-5 overflow-hidden">
                    {item.label}
                  </h2>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar max-h-64 p-4">
          {isSidebarOpen && <Spaces />}
        </div>

        <div className="mt-auto flex items-center p-2 pl-6 hover:bg-gray-300 rounded-lg cursor-pointer">
          <FiSettings className="text-xl text-black" />
          {isSidebarOpen && (
            <h1 className="ml-3 font-medium text-black h-6 overflow-hidden">
              Settings
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
