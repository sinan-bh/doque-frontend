"use client";

import {
  fetchAllUsers,
  fetchWorkspaceData,
} from "@/lib/store/features/workspace-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ChatList() {
  const { workSpaceId }: { workSpaceId: string } = useParams();
  const dispatch = useAppDispatch();
  const { workspaces } = useAppSelector((state) => state.workspace);

  const [searchQuery, setSearchQuery] = useState("");

  const workspaceName = workspaces?.find((w) => w._id === workSpaceId);
  const workSpaces = workspaces?.filter((w) => w._id !== workSpaceId);

  const filteredWorkspaces = workSpaces?.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchWorkspaceData());
    dispatch(fetchAllUsers());
  }, [dispatch, workSpaceId]);

  return (
    <div className="w-2/4 h-full p-4 bg-gray-100 overflow-auto hidden sm:block">
      <div className="flex items-center mb-4">
        <Avatar className="w-7 h-7 mr-4 sm:w-10 sm:h-10">
          <AvatarImage
            src={
              workspaceName?.createdBy?.image || "/images/avatarFallback.png"
            }
            alt="Avatar"
          />
          <AvatarFallback />
        </Avatar>
        <div className="ml-2">
          <h2 className="font-bold">{workspaceName?.name}</h2>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search Here..."
        className="w-full p-2 mb-4 rounded-lg border border-gray-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="space-y-4">
        {filteredWorkspaces?.map((chat) => (
          <Link
            key={chat._id}
            className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-lg cursor-pointer"
            href={`/w/${chat._id}/chat`}
          >
            <div className="flex items-center">
              <Avatar className="w-7 h-7 mr-4 sm:w-10 sm:h-10">
                <AvatarImage
                  src={chat?.createdBy?.image || "/images/avatarFallback.png"}
                  alt="Avatar"
                />
                <AvatarFallback />
              </Avatar>
              <div className="ml-2">
                <h3 className="font-bold">{chat.name}</h3>
                {/* <p className="text-sm text-gray-500">Latest message...</p> */}
              </div>
            </div>
            {/* <span className="text-xs text-gray-500">10:35 AM</span> */}
          </Link>
        ))}
        {filteredWorkspaces?.length === 0 && (
          <p className="text-gray-500 text-sm">No workspaces found.</p>
        )}
      </div>
    </div>
  );
}
