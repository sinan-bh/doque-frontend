"use client";

import { fetchInvitedMembers } from "@/lib/store/features/workspace-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function ChatDetails() {
  const {workSpaceId} : {workSpaceId: string} = useParams()
  const dispatch = useAppDispatch()
  const {invitedMembers} = useAppSelector(state=> state.workspace)
  
  useEffect(()=> {
    dispatch(fetchInvitedMembers({workSpaceId}))
  },[dispatch])

  return (
    <div className="w-1/4 max-h-screen p-4 bg-gray-50 overflow-auto">
      <h2 className="font-bold text-lg mb-4">Designers</h2>
      <p className="text-sm mb-4">We are a Digital Designers team.</p>
      <h3 className="font-bold mb-2">Members</h3>
      <ul className="space-y-2">
        {invitedMembers?.map((member, index) => (
          <li key={index} className="flex items-center">
            <img
              src={member.image}
              className="w-8 h-8 rounded-full mr-2"
              alt="Member"
            />
            <span>{member.firstName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
