"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchMessages } from "@/lib/store/features/message-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";

interface Message {
  messages?: {
    content: string;
    timestamp: string;
    _id: string;
    sender: { firstName: string; image: string };
  }[];
}

const Comment: React.FC<Message> = ({ messages }) => {
  return (
    <div className="pt-2">
      {messages?.slice(-3).reverse().map((comment) => (
        <div
          key={comment._id}
          className="w-full h-8 flex items-center bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition overflow-hidden dark:bg-darkBg"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.sender.image} alt="Project Icon" />
            <AvatarFallback />
          </Avatar>
          <div className="flex-1 pl-3 overflow-hidden">
            <p className="text-xs truncate">{comment.sender.firstName}</p>
            <p className="text-[10px] text-gray-600 truncate">
              {comment.content}
            </p>
          </div>
          <button className="ml-4 text-gray-600 hover:text-gray-800 flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

const CommentsList = () => {
  const dispatch = useAppDispatch();
  const { workSpaceId }: { workSpaceId: string } = useParams();
  const { messages } = useAppSelector((state) => state.message);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [workSpaceId]);

  const handleRefreshClick = () => {
    setIsRotating(true); // Set rotating state to true
    dispatch(fetchMessages());

    // Reset rotation state after the animation completes
    setTimeout(() => {
      setIsRotating(false);
    }, 500); // Duration of the rotation animation (match it with your CSS)
  };

  return (
    <div className="w-full  bg-white rounded-lg shadow-md p-2 space-y-2 mt-2 overflow-hidden dark:bg-darkBg">
      <div className="flex justify-between">
        <div className="font-semibold text-sm text-gray-500 dark:text-gray-300">
          New Comments
        </div>
        <div>
          <IoMdRefresh 
            onClick={handleRefreshClick} 
            className={`transition-transform duration-500 ${isRotating ? 'rotate-180' : ''}`} // Apply rotation class
          />
        </div>
      </div>
      <div className="space-y-2 overflow-auto">
        <Comment {...messages} />
      </div>
    </div>
  );
};

export default CommentsList;
