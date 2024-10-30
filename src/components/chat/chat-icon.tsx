import { AppDispatch } from "@/lib/store";
import { fetchMessages } from "@/lib/store/features/message-slice";
import { setWorkSpaceId } from "@/lib/store/features/workspace-slice";
import { useParams } from "next/navigation";
import React from "react";
import { SiImessage } from "react-icons/si";
import { useDispatch } from "react-redux";

interface MessageIconProps {
  onClick: () => void;
}

const MessageIcon: React.FC<MessageIconProps> = ({ onClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { workSpaceId }: { workSpaceId: string } = useParams();

  const handleClick = () => {
    dispatch(setWorkSpaceId(workSpaceId));
    dispatch(fetchMessages());
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-10 z-50 right-10 p-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-transform transform hover:scale-110" // Added scale effect on hover
    >
      <SiImessage size={24} />
    </button>
  );
};

export default MessageIcon;
