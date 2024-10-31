import React from "react";
import SearchBar from "@/components/boards/search-tasks";
import ListBoardView from "@/components/task-list/list-board-view";

export default function NavbarBoarderList() {
  return (
    <div>
      <div className="flex sm:px-2 px-4 justify-between gap-2">
        <SearchBar />
        <ListBoardView />
      </div>
      <div className="h-0.5 bg-zinc-400 my-2 rounded-full"></div>
    </div>
  );
}
