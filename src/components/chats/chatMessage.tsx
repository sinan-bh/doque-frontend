"use client";

import React from "react";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";

type MessageProps = {
  message: {
    content: string;
    timestamp: string;
    _id: string;
    sender: {
      firstName: string;
      image: string;
      _id: string;
    };
  };
};

function formatTimestamp(timestamp: string): string {
  const messageDate = new Date(timestamp);
  const currentDate = new Date();

  const diffInMilliseconds = currentDate.getTime() - messageDate.getTime();
  const diffInMinutes = diffInMilliseconds / (1000 * 60);
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  if (diffInMinutes < 1) {
    return "Now";
  } else if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)} minute${
      Math.floor(diffInMinutes) > 1 ? "s" : ""
    } ago`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hour${
      Math.floor(diffInHours) > 1 ? "s" : ""
    } ago`;
  } else if (diffInDays < 1) {
    return "Yesterday";
  } else if (diffInDays < 2) {
    return "2 days ago";
  } else {
    return format(messageDate, "dd-MM-yyyy HH:mm");
  }
}

export default function ChatMessage({ message }: MessageProps) {
  const currentUser = Cookies.get("user");
  const user = JSON.parse(currentUser || "{}");
  const currentUserId = user.id;

  return (
    <div
      className={`flex mb-4 ${
        message.sender._id === currentUserId ? "justify-end" : "justify-start"
      }`}
    >
      {message.sender._id !== currentUserId && (
        <Avatar className="w-7 h-7 mr-4 sm:w-10 sm:h-10">
          <AvatarImage
            src={message?.sender?.image || "/images/avatarFallback.png"}
            alt="Avatar"
          />
          <AvatarFallback />
        </Avatar>
      )}
      <div className="max-w-[70%]">
        <p
          className={`text-xs mb-1 ${
            message.sender._id === currentUserId
              ? "text-right text-gray-300"
              : "text-left text-gray-600"
          }`}
        >
          {message.sender.firstName}
        </p>
        <div
          className={`p-3 rounded-lg ${
            message.sender._id === currentUserId
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          <p>{message.content}</p>
        </div>
        <p
          className={`text-xs mt-1 ${
            message.sender._id === currentUserId
              ? "text-right text-gray-400"
              : "text-left text-gray-500"
          }`}
        >
          {formatTimestamp(message.timestamp)}
        </p>
      </div>
    </div>
  );
}
