import React from "react";

interface IconProps {
  onDelete: () => void;
}

export default function DeleteAndEditIcons({ onDelete }: IconProps) {
  return (
    <div className="flex space-x-2">
      <span
        onClick={onDelete}
        className="text-gray-500 cursor-pointer hover:text-red-700 transition"
        aria-label="Delete message"
      >
        CLEAR
      </span>
    </div>
  );
}
