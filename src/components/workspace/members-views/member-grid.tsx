import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface Member {
  data:{
    id: number;
    img?: string;
    firstName: string;
    lastName:string
    email: string;
    role?: string;
    online?: boolean;
  }
 
}

const MembersGrid: React.FC<{ members: Member[] }> = ({ members }) => {  
  console.log(members);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {members?.map((member, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 flex">
          <div className="text-center">
            <Avatar className="w-16 h-16" key={i}>
              <AvatarImage
                src={member?.data.img || "/images/avatarFallback.png"}
                alt="Avatar"
              />
              <AvatarFallback />
            </Avatar>
          </div>
          <div className="ml-4">
            <h3 className="text-md font-semibold text-gray-700">
              {member.data.firstName}{member.data.lastName}
            </h3>
            <p className="text-sm text-gray-500">{member.data.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MembersGrid;  