"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineTemplate } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchWorkspaceData } from "@/lib/store/features/workspace-slice";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [activePath, setActivePath] = useState<string>("/u/home");
  const { workSpace } = useSelector((state: RootState)=> state.workspace)

  const sidebarItems = [
    { icon: <AiOutlineHome className="text-2xl" />, label: "Home", link: "/u/home" },
    { icon: <HiOutlineTemplate className="text-2xl" />, label: "Templates", link: "/u/home/templates" },
  ];

  const activeLink = (path: string) => {
    setActivePath(path);
  };

  useEffect(()=> {
    const fetchData = () => {
      dispatch(fetchWorkspaceData())
    }
    fetchData()
  },[])

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] sm:w-1/4 md:w-1/5 bg-[#EDF1F4] p-4 flex flex-col">
      <div className="flex-1">
        {sidebarItems.map((item, index) => (
          <Link key={index} href={item.link} onClick={() => activeLink(item.link)}>
            <div
              className={`flex items-center p-1 mr-2 rounded-lg mt-1 cursor-pointer ${
                activePath === item.link ? "bg-[#E1E4E6]" : "hover:bg-[#E1E4E6]"
              }`}
            >
              {item.icon}
              <h2 className="font-medium text-sm ml-2">{item.label}</h2>
            </div>
          </Link>
        ))}

        <hr className="my-2 border-gray-500 h-1" />
        <h2 className="font-semibold text-sm mt-1 text-gray-600">Workspaces</h2>

        <div className="max-h-[360px] overflow-y-auto">
          {workSpace?.map((workspace, index) => (
            <Link href={`/w/${workspace.WorkspaceId}/dashboard`} key={index}>
              <div className="flex items-center ml-1 mt-3">
                <div className="flex flex-col py-1">
                  <span className="font-semibold text-sm">{workspace.name}</span>
                  <span className="font-medium text-sm">Workspace</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Link href="">
        <div className="flex items-center p-1 hover:bg-[#E1E4E6] rounded-lg mt-2">
          <FiSettings className="text-2xl" />
          <h2 className="font-medium text-lg ml-2">Settings</h2>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
