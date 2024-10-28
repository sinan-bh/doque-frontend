import Chat from "@/components/chat/chat";
import Sidebar from "@/components/workspace/sidebar";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <Chat />
      <div className="w-full ml-11 h-full overflow-auto sm:ml-0">{children}</div>
    </div>
  );
}
