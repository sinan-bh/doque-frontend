"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchWorkspaceData } from "@/lib/store/features/workspace-slice";

export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const { workSpace } = useSelector((state: RootState) => state.workspace);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchWorkspaceData());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 640
      ) {
        setIsSidebarOpen(false);
      } 
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        className="p-2 bg-gray-200 dark:bg-gray-800 rounded-md fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <AiOutlineMenu className="text-xl" />
      </button>

      {isSidebarOpen && window.innerWidth < 640 && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className={`${
            window.innerWidth < 640
              ? "fixed left-0 top-0 h-full max-w-72 w-full z-50"
              : "relative sm:w-1/4 md:w-[260px]"
          } bg-[#EDF1F4] h-full p-4 flex flex-col dark:bg-gray-900`}
        >
          <div className="flex-1">
            <div className="flex items-center p-1 mr-2 mt-1 cursor-pointer border-l-2 border-black dark:border-l-2 dark:border-white">
              <AiOutlineHome className="text-2xl" />
              <h2 className="font-medium text-sm ml-2">Home</h2>
            </div>

            <hr className="my-2 border-gray-500 h-1" />
            <h2 className="text-sm mt-1 text-gray-600 dark:text-gray-300">
              Workspaces
            </h2>

            <div className="max-h-[360px] overflow-y-auto">
              {workSpace?.map((workspace, index) => (
                <Link
                  href={`/w/${workspace.WorkspaceId}/dashboard`}
                  key={index}
                >
                  <div className="flex items-center hover:bg-zinc-200 dark:hover:bg-gray-800 px-4 py-2 rounded-md">
                    <div className="flex flex-col p-1 border-b-2 border-gray-300 dark:border-gray-600">
                      <span className="text-sm">{workspace.name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
