import React from "react";
import { SiImessage } from "react-icons/si";

interface MessageIconProps {
  onClick: () => void;
}

const MessageIcon: React.FC<MessageIconProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-10 right-10 p-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-transform transform hover:scale-110" // Added scale effect on hover
    >
      <SiImessage size={24} />
    </button>
  );
};

export default MessageIcon;
