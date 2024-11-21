"use client";

import React from "react";
import ChatList from "./chatList";
import ChatBox from "./cahtBox";
import ChatDetails from "./chatDetails";

export default function ChatApp() {
  return (
    <div className="flex w-full h-screen">
      <ChatList />
      <ChatBox />
      <ChatDetails />
    </div>
  );
}
