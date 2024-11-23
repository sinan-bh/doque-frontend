"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  fetchMessages,
  socketMessage,
} from "@/lib/store/features/message-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import io from "socket.io-client";
import { Message } from "@/lib/store/features/message-slice";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import ChatMessage from "./chatMessage";
import { fetchWorkspaceData } from "@/lib/store/features/workspace-slice";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_API_URI);

export default function ChatBox() {
  const { workSpaceId }: { workSpaceId: string } = useParams();
  const dispatch = useAppDispatch();
  const { workspaces } = useAppSelector((state) => state.workspace);
  const { messages } = useAppSelector((state) => state.message);
  const [inputMessage, setInputMessage] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const currentUser = Cookies.get("user");
  const user = JSON.parse(currentUser || "{}");
  const currentUserId = user.id;

  useEffect(() => {
    dispatch(fetchWorkspaceData());
    dispatch(fetchMessages({ workSpaceId }));

    socket.on("receiveMessage", (newMessage: Message) => {
      dispatch(socketMessage(newMessage));
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [dispatch, workSpaceId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const messageToSend = {
      workSpaceId: workSpaceId,
      sender: currentUserId,
      content: inputMessage,
    };

    socket.emit("sendMessage", messageToSend);
    setInputMessage("");
    scrollToBottom();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const workspaceName = workspaces?.find((w) => w._id === workSpaceId);

  return (
    <div className="w-full h-full p-4 bg-white flex flex-col ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-xl">{workspaceName?.name}</h2>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto mb-4 overflow-x-hidden"
      >
        {messages?.messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg?.sender?._id === currentUserId
                ? "justify-end"
                : "justify-start"
            } mb-2`}
          >
            <ChatMessage message={msg} />
          </div>
        ))}
      </div>

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Write something..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full p-2 rounded-lg border border-gray-300"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
