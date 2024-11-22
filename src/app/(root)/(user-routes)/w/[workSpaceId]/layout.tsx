import Sidebar from "@/components/workspace/sidebar";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="w-full ml-11 overflow-auto sm:ml-0">{children}</div>
    </div>
  );
}
