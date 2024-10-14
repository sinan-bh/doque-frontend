"use client";

import React, { useState, useRef, useEffect } from "react";
import MessageList from "./chat-list";
import MessageInput from "./chat-input";
import MessageIcon from "./chat-icon";
import DeleteButton from "./delete-button";
import { useMessageContext } from "@/contexts/message-context";

const workspaceId = "6707881d4440b0ba576f4162";

export default function Chat() {
  const [isVisible, setIsVisible] = useState(false);
  const { deleteMessage } = useMessageContext();
  const chatRef = useRef<HTMLDivElement>(null);

  const toggleChatVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      chatRef.current &&
      !chatRef.current.contains(event.target as Node) &&
      isVisible
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <div
          ref={chatRef}
          className="fixed z-50 top-0 right-0 h-screen w-3/6 bg-white shadow-lg rounded-l-lg flex flex-col"
        >
          <div className="flex justify-between items-center mt-4 border-b pb-2 px-6">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            <DeleteButton onDelete={() => deleteMessage(workspaceId)} />
          </div>

          <div className="flex-grow max-h-[calc(100vh-8rem)] overflow-y-auto">
            <MessageList />
          </div>
          <div className="border-t">
            <MessageInput />
          </div>
        </div>
      )}
      {!isVisible && <MessageIcon onClick={toggleChatVisibility} />}
    </>
  );
}
