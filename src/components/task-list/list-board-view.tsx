"use client";

import React from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { List } from "lucide-react";
import { ViewBoardsIcon } from "@heroicons/react/solid";

export default function ListBoardView() {
  const { workSpaceId, spaceId }: { workSpaceId: string; spaceId: string } =
    useParams();

  const pathname = usePathname();
  const isList = pathname.split("/").filter(Boolean).pop() === "1";

  return (
    <div className="flex text-sm items-center border dark:border-zinc-950 shadow-sm rounded-md overflow-hidden flex-shrink-0">
      <Link href={`/w/${workSpaceId}/spaces/${spaceId}`} className="h-full">
        <button
          className={clsx(
            "w-8 sm:w-24 h-full p-0 flex items-center justify-center gap-1 ",
            {
              "bg-zinc-800 text-zinc-100 dark:bg-white dark:text-zinc-950":
                !isList,
              "hover:bg-zinc-200 bg-zinc-100 dark:hover:bg-zinc-800 dark:bg-zinc-950":
                isList,
            }
          )}>
          <ViewBoardsIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Boards</span>
        </button>
      </Link>
      <Link href={`/w/${workSpaceId}/spaces/${spaceId}/1`} className="h-full">
        <button
          className={clsx(
            "w-8 sm:w-24 h-full p-0 flex gap-1 justify-center items-center ",
            {
              "bg-zinc-800 text-zinc-100 dark:bg-white dark:text-zinc-950":
                isList,
              "hover:bg-zinc-200 bg-zinc-100 dark:hover:bg-zinc-800 dark:bg-zinc-950":
                !isList,
            }
          )}>
          <List />
          <span className="hidden sm:inline">List</span>
        </button>
      </Link>
    </div>
  );
}
