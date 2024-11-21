"use client";

import type React from "react";
import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

interface Message {
  sender: string;
  content: string;
}

// Create the socket instance
const socket = io("http://localhost:3001");

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  useEffect(() => {
    // Listen for new messages
    socket.on("receiveMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup socket connection on unmount
    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const messageData: Message = {
      sender: "User", // You can change this to the actual sender if needed
      content: inputMessage,
    };

    // Emit the sendMessage event
    socket.emit("sendMessage", messageData);
    setInputMessage("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="w-1/2 h-full p-4 bg-white flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-xl">Chat</h2>
      </div>

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "User" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`p-3 rounded-lg ${
                msg.sender === "User" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              <p className="font-semibold">{msg.sender}</p>
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
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
