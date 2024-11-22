"use client";

import { fetchWorkspaceData } from "@/lib/store/features/workspace-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function ChatList() {
  const {workSpaceId} = useParams()
  const dispatch = useAppDispatch()
  const {workspaces} = useAppSelector(state=> state.workspace)

  const workspaceName = workspaces?.find(w => w._id === workSpaceId)
  const workSpaces = workspaces?.filter(w => w._id !== workSpaceId)

  useEffect(()=> {
    dispatch(fetchWorkspaceData())
  }, [dispatch])

  return (
    <div className="w-1/4 max-h-screen p-4 bg-gray-100 overflow-auto">
      <div className="flex items-center mb-4">
        <img
          src="https://picsum.photos/300"
          className="w-10 h-10 rounded-full"
          alt="User"
        />
        <div className="ml-2">
          <h2 className="font-bold">{}</h2>
          <p className="text-sm text-gray-500">{workspaceName?.name}</p>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search Here..."
        className="w-full p-2 mb-4 rounded-lg border border-gray-300"
      />
      <div className="space-y-4">
        {workSpaces?.map((chat) => (
          <Link
            key={chat._id}
            className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-lg cursor-pointer"
            href={`/w/${chat._id}/chat`}
          >
            <div className="flex items-center">
              <img
                src="https://picsum.photos/200/300"
                className="w-10 h-10 rounded-full"
                alt="Chat Icon"
              />
              <div className="ml-2">
                <h3 className="font-bold">{chat.name}</h3>
                <p className="text-sm text-gray-500">Latest message...</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">10:35 AM</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
