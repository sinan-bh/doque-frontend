"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import Spaces from "./spaces";
import { FiSettings } from "react-icons/fi";
import { AddWorkSpaceBtn } from "../ui/add-workspace";
import { useParams, useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";
import { ReactNode } from "react";
import Link from "next/link";
import {
  fetchWorkspaceData,
  setWorkSpaceId,
} from "@/lib/store/features/workspace-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchWorkspaceUser } from "@/lib/store/features/userSlice";
import { fetchSpacesData } from "@/lib/store/thunks/space-thunks";
import { EditWorkSpace } from "./edit-workspace";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";

interface SidebarIcon {
  icon: ReactNode;
  label: string;
  href: string;
}

const Sidebar: React.FC = () => {
  const { workspaces } = useAppSelector((state) => state.workspace);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useAppDispatch();
  const { workSpaceId }: { workSpaceId: string } = useParams();

  const profile = workspaces?.find(
    (workspace) => workspace._id === workSpaceId
  )?.createdBy;

  useEffect(() => {
    if (profile) {
      const fetchData = async () => {
        dispatch(fetchWorkspaceUser({ userId: profile._id }));
      };
      fetchData();
    }
  }, [dispatch, profile]);

  const sidebarItems: SidebarIcon[] = [
    {
      icon: <AiFillHome className="text-xl" />,
      label: "Home",
      href: "/",
    },
    {
      icon: <RiDashboardFill className="text-xl" />,
      label: "Dashboard",
      href: `/w/${workSpaceId}/dashboard`,
    },
    {
      icon: <BsFillPeopleFill className="text-xl" />,
      label: "Members",
      href: `/w/${workSpaceId}/members`,
    },
    {
      icon: <FaCalendar className="text-xl" />,
      label: "Calendar",
      href: `/w/${workSpaceId}/calendar`,
    },
    {
      icon: <IoMdChatbubbles className="text-xl" />,
      label: "Chat",
      href: `/w/${workSpaceId}/chat`,
    },
  ];

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setWorkSpaceId(workSpaceId));
      await dispatch(fetchWorkspaceData());
    };
    fetchData();
  }, [workSpaceId]);

  useEffect(() => {
    setActiveRoute(window.location.pathname);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth < 640) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleRouteChange = (route: string) => {
    setActiveRoute(route);
    setIsCollapsed(true);
    router.push(route);
  };

  const main = workspaces.find((val) => val._id === workSpaceId);

  useEffect(() => {
    dispatch(fetchSpacesData(workSpaceId));
  }, [workSpaceId]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setDropdownOpen(false);
  };

  return (
    <div
      className={`fixed top-0 h-screen sm:relative z-40 sm:h-auto  border-r-2 dark:border-gray-700 p-2 flex-shrink-0 flex flex-col transition-all duration-300 bg-white dark:bg-darkBg ${
        isCollapsed ? "w-14" : "w-64"
      }`}
    >
      <div
        className={`flex mt-16 sm:mt-0 items-center p-2 cursor-pointer ${
          isCollapsed ? "justify-center" : ""
        }`}
        onClick={toggleCollapse}
      >
        <MdKeyboardDoubleArrowRight
          className={`text-3xl sm:fixed bg-gray-200 bg-opacity-50 p-1 dark:bg-opacity-5 rounded-lg left-5 top-5 z-50 transition-transform duration-500`}
          style={{
            transform: isCollapsed ? "rotateY(0deg) " : "rotateY(180deg) ",
            perspective: "500px",
          }}
        />
      </div>

      <div className="relative">
        <div className="flex items-center justify-between p-3 rounded-md ">
          <div className="flex items-center h-2 sm:h-10 md:h-10 lg:h-10 gap-4">
            {!isCollapsed && (
              <h2 className="text-md max-w-44 text-black ml-2 h-5 w-11/12 overflow-hidden text-ellipsis whitespace-nowrap dark:text-gray-300">
                {main?.name}
              </h2>
            )}
          </div>
          <IoIosArrowDown
            className={`text-black flex-shrink-0 transform transition-transform duration-300  dark:text-gray-300 ${
              isCollapsed === true
                ? "hidden"
                : dropdownOpen
                ? "rotate-180 cursor-pointer"
                : ""
            }`}
            onClick={toggleDropdown}
          />
        </div>

        {dropdownOpen && (
          <div
            onMouseLeave={() => setDropdownOpen(false)}
            className="absolute top-full left-0 w-full bg-white border dark:border-gray-600 rounded-lg z-50 dark:bg-darkBg"
          >
            <div className="border-b-2 border-gray-200 dark:border-gray-600 p-2">
              <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">
                Workspaces
              </h3>
            </div>
            <div className="h-[200px] overflow-scroll">
              {workspaces.length > 0 ? (
                workspaces.map((data, key) => (
                  <Link href={`/w/${data._id}/dashboard`} key={key}>
                    <div className="p-2 hover:border-l-2 cursor-pointer dark:text-gray-300 hover:border-black">
                      <h3 className="text-sm text-black dark:text-gray-300">
                        {data.name}
                      </h3>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-2">No workspaces available</div>
              )}
            </div>
            <AddWorkSpaceBtn>
              <div className="flex items-center justify-center p-2 border-t-2 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
                <FaPlus className="mr-2" />
                <h3 className="text-md text-black dark:text-gray-300">
                  Add Workspace
                </h3>
              </div>
            </AddWorkSpaceBtn>
          </div>
        )}
      </div>

      <div className="flex-1 rounded-md mt-3 flex flex-col">
        <div className="p-2">
          {!isCollapsed &&
            sidebarItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center p-2 cursor-pointer ${
                  activeRoute === item.href
                    ? "border-l-4 border-black dark:border-gray-300"
                    : "hover:border-l-4 border-transparent"
                }`}
                onClick={() => handleRouteChange(item.href)}
              >
                <div className="flex items-center">
                  <div>{item.icon}</div>
                  <h2 className="ml-3 text-black h-5 overflow-hidden dark:text-gray-300">
                    {item.label}
                  </h2>
                </div>
              </div>
            ))}

          {isCollapsed &&
            sidebarItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center cursor-pointer ${
                  isCollapsed ? "p-2 mt-1" : ""
                } ${
                  activeRoute === item.href
                    ? "border-l-4 border-black dark:border-gray-300"
                    : "hover:border-l-4 border-transparent"
                }`}
                onClick={() => handleRouteChange(item.href)}
              >
                <div className="flex items-center">
                  <div>{item.icon}</div>
                </div>
              </div>
            ))}
        </div>

        {!isCollapsed && (
          <div className="relative flex-1 p-4">{<Spaces />}</div>
        )}

        <EditWorkSpace
          initialData={{ name: main?.name || "", visibility: true }}
        >
          <div className="mt-auto flex items-center p-2 pl-3 hover:bg-gray-300 rounded-lg cursor-pointer dark:hover:bg-gray-900">
            <FiSettings className="text-xl text-black dark:text-gray-300" />
            {!isCollapsed && (
              <h1 className="ml-3 font-medium text-black h-6 overflow-hidden dark:text-gray-300">
                Settings
              </h1>
            )}
          </div>
        </EditWorkSpace>
      </div>
    </div>
  );
};

export default Sidebar;
