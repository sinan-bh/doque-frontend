"use client";

import React from "react";

interface ChatMessageProps {
  message: string;
  sender: string;
  isReceiver?: boolean;
  isFile?: boolean;
}

export default function ChatMessage({
  message,
  sender,
  isReceiver,
  isFile,
}: ChatMessageProps) {
  return (
    <div
      className={`flex mb-4 ${isReceiver ? "justify-end" : "justify-start"}`}
    >
      {!isReceiver && (
        <img
          src="https://picsum.photos/500"
          className="w-8 h-8 rounded-full mr-2"
          alt="Sender"
        />
      )}
      <div
        className={`p-3 rounded-lg ${
          isReceiver ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {isFile ? (
          <div className="flex items-center">
            <img src="/file-icon.png" className="w-5 h-5 mr-2" alt="File" />
            <span>{message}</span>
          </div>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
}
