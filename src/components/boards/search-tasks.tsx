"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { Input } from "../ui/input";
import { IoIosSearch } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function SearchBar() {
  const { tasks } = useAppSelector((state) => state.tasks);
  const [query, setQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const pathName = usePathname();

  useEffect(() => {
    if (query.trim() === "") {
      setOpen(false);
      setFilteredTasks([]);
    } else {
      setOpen(true);
      setFilteredTasks(
        tasks.filter(
          (task) =>
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.description.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, tasks]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredTasks.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      router.push(
        `${pathName}?task=${filteredTasks[highlightedIndex].id}&list=${filteredTasks[highlightedIndex].column}`
      );
    }
  };

  return (
    <div className="relative bg-white flex items-center px-4 border rounded-lg w-[400px]">
      <IoIosSearch className="text-zinc-500 relative top-[1px]" />
      <Input
        type="text"
        className="bg-white border-none rounded-none shadow-none pl-1 focus-visible:ring-0"
        placeholder="Search tasks.."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setHighlightedIndex(-1);
        }}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        onKeyDown={handleKeyDown}
      />
      {open && (
        <>
          {filteredTasks.length > 0 ? (
            <ul className="absolute top-full left-0 w-full bg-white border border-zinc-200 rounded-lg shadow-md mt-1 max-h-60 overflow-y-auto z-10">
              {filteredTasks.map((task, index) => (
                <li
                  key={task.title}
                  className={`px-4 py-1  cursor-pointer hover:bg-zinc-100 ${
                    highlightedIndex === index ? "bg-zinc-100" : ""
                  }`}>
                  <Link
                    href={`${pathName}?task=${task.id}&list=${task.column}`}>
                    <p>{task.title}</p>
                    <p className="text-xs text-zinc-500 overflow-hidden text-ellipsis whitetask-nowrap">
                      {task.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="absolute top-full left-0 w-full bg-white border border-zinc-200 rounded-lg shadow-md mt-1 max-h-60 overflow-y-auto z-10">
              <p className="p-2 text-sm text-zinc-500">No results found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
