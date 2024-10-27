"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchUserProfiles, fetchWorkspaceMembers } from "@/lib/store/features/workspace-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

interface MessageProps {
  name: string;
  image: string;
  // isActive?: boolean;
}

function ChatList({ name, image }: MessageProps) {  

  return (
    <div className="flex flex-col items-center relative">
      <div className="relative">
        <Avatar className="w-12 h-12">
          <AvatarImage src={image} alt={`${name}'s Avatar`} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        {/*-----comming soon----*/}
        {/* {isActive && (
          <div className="absolute top-0 right-0 h-3 w-3 bg-green-400 rounded-full border border-white"></div>
        )} */}
      </div>
      <p className="text-xs font-semibold mt-1 text-center truncate w-full">
        {name}
      </p>
    </div>
  );
}

export default function GroupChat() {
  const { users, members } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();
  const { workSpaceId }: { workSpaceId: string } = useParams();
  // const [isActive, setIsActive] = useState<boolean>(false)

useEffect(() => {
  const fetchData = async () => {
    await dispatch(fetchWorkspaceMembers({ workSpaceId }));
  };
  // const value = window.navigator.onLine
  // setIsActive(value)
    fetchData();
  }, [workSpaceId]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUserProfiles({ members }));
    };
    fetchData()
  }, [members]);

  return (
    <div className="text-lg mt-2 p-4 bg-white h-80 rounded-lg shadow-md space-y-2 dark:bg-darkBg">
      <div className="text-1xl font-semibold text-gray-600 dark:text-gray-300">Message</div>
      <div className="grid grid-cols-3 gap-4">
        {users?.map((message, index) => (
          <ChatList
            key={index}
            name={message.firstName}
            image={message.image}
            // isActive={isActive}
          />
        ))}
      </div>
    </div>
  );
}
