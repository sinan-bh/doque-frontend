"use client";

import React from "react";
import ChatList from "./chatList";
import ChatBox from "./chatBox";
import ChatDetails from "./chatDetails";

export default function ChatApp() {
  return (
    <div className="flex w-full h-full">
      <ChatList />
      <ChatBox />
      <ChatDetails />
    </div>
  );
}
