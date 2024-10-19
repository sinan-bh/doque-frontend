import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Users } from "@/lib/store/features/workspace-slice";

const MembersList: React.FC<{ members: Users[] }> = ({ members }) => {
  return (
    <div className="space-y-4">
      {members.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 rounded-lg"
        >
          <div className="flex items-center">
            <Avatar className="w-10 h-10 mr-4">
              <AvatarImage
                src={item.image || "/images/avatarFallback.png"}
                alt="Avatar"
              />
              <AvatarFallback />
            </Avatar>
            <h3 className="text-md font-semibold text-gray-800">
              {item.firstName}{item.lastName}
            </h3>
          </div>
          <h2 className="text-gray-600">{item.email}</h2>
        </div>
      ))}
    </div>
  );
};

export default MembersList;
