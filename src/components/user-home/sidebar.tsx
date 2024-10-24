"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchWorkspaceData } from "@/lib/store/features/workspace-slice";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { workSpace } = useSelector((state: RootState) => state.workspace);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchWorkspaceData());
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="w-full sm:w-1/4 md:w-[350px] bg-[#EDF1F4] p-4 flex flex-col dark:bg-gray-950">
      <div className="flex-1">
        <div className="flex items-center p-1 mr-2 mt-1 cursor-pointer border-l-2 border-black dark:border-l-2 dark:border-white">
          <AiOutlineHome className="text-2xl" />
          <h2 className="font-medium text-sm ml-2">Home</h2>
        </div>

        <hr className="my-2 border-gray-500 h-1" />
        <h2 className="font-semibold text-sm mt-1 text-gray-600">Workspaces</h2>

        <div className="max-h-[360px] overflow-y-auto">
          {workSpace?.map((workspace, index) => (
            <Link href={`/w/${workspace.WorkspaceId}/dashboard`} key={index}>
              <div className="flex items-center hover:bg-zinc-200 dark:hover:bg-gray-800 px-4 py-2 rounded-md">
                <div className="flex flex-col py-1">
                  <span className="font-semibold text-sm">
                    {workspace.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
