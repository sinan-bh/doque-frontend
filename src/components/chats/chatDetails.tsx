"use client";

import { fetchInvitedMembers } from "@/lib/store/features/workspace-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ChatDetails() {
  const { workSpaceId }: { workSpaceId: string } = useParams();
  const dispatch = useAppDispatch();
  const { invitedMembers } = useAppSelector((state) => state.workspace);

  useEffect(() => {
    dispatch(fetchInvitedMembers({ workSpaceId }));
  }, [dispatch]);

  return (
    <div className="w-2/4 h-full p-4 bg-gray-50 overflow-auto hidden lg:block dark:bg-black">
      {/* <h2 className="font-bold text-lg mb-4">Designers</h2>
      <p className="text-sm mb-4">We are a Digital Designers team.</p> */}
      <h3 className="font-bold mb-2">Members</h3>
      <ul className="space-y-2">
        {invitedMembers?.map((member, index) => (
          <li key={index} className="flex items-center">
            <Avatar className="w-7 h-7 mr-4 sm:w-10 sm:h-10">
              <AvatarImage
                src={member?.image || "/images/avatarFallback.png"}
                alt="Avatar"
              />
              <AvatarFallback />
            </Avatar>
            <span>{member.firstName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
