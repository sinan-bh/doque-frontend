import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Users } from "@/lib/store/features/workspace-slice";

const MembersGrid: React.FC<{ members: Users[] }> = ({ members }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {members?.map((member, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 flex dark:bg-darkBg">
          <div className="text-center">
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12" key={i}>
              <AvatarImage
                src={member.image || "/images/avatarFallback.png"}
                alt="Avatar"
              />
              <AvatarFallback />
            </Avatar>
          </div>
          <div className="ml-4">
            <span className="text-sm sm:text-lg font-semibold text-gray-700 dark:text-gray-200 px-1">
              {member.firstName}
            </span>
            <span className="text-sm sm:text-lg font-semibold text-gray-700 dark:text-gray-200 px-1">{member.lastName}</span>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MembersGrid;
