import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Users } from "@/lib/store/features/workspace-slice";

const MembersList: React.FC<{ members: Users[] }> = ({ members }) => {
  return (
    <div className="space-y-4">
      {members.map((item, index) => (
        <div key={index} className="flex p-2 rounded-lg items-center">
          <Avatar className="w-7 h-7 mr-4 sm:w-10 sm:h-10">
            <AvatarImage
              src={item.image || "/images/avatarFallback.png"}
              alt="Avatar"
            />
            <AvatarFallback />
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-300 mr-2">
                {item.firstName} {item.lastName}
              </h3>
            </div>
            <h2 className="text-sm sm:text-lg text-gray-500 sm:hidden block">
              {item.email}
            </h2>
          </div>
          <div className="hidden sm:flex flex-1 justify-center">
            <h2 className="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
              {item.email}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MembersList;
