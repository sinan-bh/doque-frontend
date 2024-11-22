"use client";

import React from "react";
import Cookies from "js-cookie";

// Define the type of the message prop
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

export default function ChatMessage({ message }: MessageProps) {
  const currentUser = Cookies.get("user");
  const user = JSON.parse(currentUser || "{}");
  const currentUserId = user.id;

  return (
    <div
      className={`flex mb-4 ${message.sender._id === currentUserId ? "justify-end" : "justify-start"}`}
    >
      <img
        src={message.sender.image || "https://picsum.photos/500"}
        className="w-8 h-8 rounded-full mr-2"
        alt="Sender"
      />
      <div
        className={`p-3 rounded-lg ${
          message.sender._id === currentUserId ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        <p>{message.content}</p>
      </div>
    </div>
  );
}
