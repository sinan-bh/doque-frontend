"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { Input } from "../ui/input";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SearchBar() {
  const { spaces } = useAppSelector((state) => state.space);
  const [query, setQuery] = useState("");
  const [filteredSpaces, setFilteredSpaces] = useState(spaces);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (query.trim() === "") {
      setOpen(false);
      setFilteredSpaces([]);
    } else {
      setOpen(true);
      setFilteredSpaces(
        spaces.filter(
          (space) =>
            space.name.toLowerCase().includes(query.toLowerCase()) ||
            space.description.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, spaces]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredSpaces.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      router.push(`spaces/${filteredSpaces[highlightedIndex]._id}`);
    }
  };

  return (
    <div className="relative bg-white flex items-center px-4 border rounded-lg w-[400px]">
      <IoIosSearch className="text-zinc-500 relative top-[1px]" />
      <Input
        type="text"
        className="bg-white border-none rounded-none shadow-none pl-1 focus-visible:ring-0"
        placeholder="Search spaces.."
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
          {filteredSpaces.length > 0 ? (
            <ul className="absolute top-full left-0 w-full bg-white border border-zinc-200 rounded-lg shadow-md mt-1 max-h-60 overflow-y-auto z-10 dark:bg-darkBg">
              {filteredSpaces.map((space, index) => (
                <li
                  key={space.name}
                  className={`px-4 py-1  cursor-pointer hover:bg-zinc-100 ${
                    highlightedIndex === index ? "bg-zinc-100" : ""
                  }`}>
                  <Link href={`spaces/${space._id}`}>
                    <p>{space.name}</p>
                    <p className="text-xs text-zinc-500 overflow-hidden text-ellipsis whitespace-nowrap">
                      {space.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="absolute top-full left-0 w-full bg-white border border-zinc-200 rounded-lg shadow-md mt-1 max-h-60 overflow-y-auto z-10 dark:bg-darkBg">
              <p className="p-2 text-sm text-zinc-500">No results found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
