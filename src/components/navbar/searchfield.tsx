"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import axiosInstance from "@/utils/axios";
import Link from "next/link";

interface Workspace {
  _id: string;
  name: string;
}

export default function SearchField() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<Workspace[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  const saveToSearchHistory = (workspace: Workspace) => {
    let history = [...searchHistory];
    if (!history.some((item) => item._id === workspace._id)) {
      history = [workspace, ...history].slice(0, 5);
      setSearchHistory(history);
      localStorage.setItem("searchHistory", JSON.stringify(history));
    }
  };

  const fetchSuggestions = async () => {
    if (searchValue.trim() === "") {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.get<{ data: Workspace[] }>(
        `/search?query=${searchValue}`
      );
      const data = response.data?.data || [];

      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const clearSearch = () => {
    setSearchValue("");
    setSuggestions([]);
    setShowHistory(true);
  };

  const handleSearchSelect = (workspace: Workspace) => {
    saveToSearchHistory(workspace);
    setSearchValue("");
    setSuggestions([]);
    setShowHistory(false);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const handleClick = (workspace: Workspace) => {
    handleSearchSelect(workspace);
  };

  return (
    <div className="relative w-full" ref={searchContainerRef}>
      <span className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        <IoIosSearch className="text-gray-600 text-xl dark:text-gray-300" />
      </span>

      <input
        type="text"
        placeholder="Search Workspaces..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full px-8 text-sm py-2 pl-8 pr-8 outline-none text-black placeholder:text-gray-600  border-b-2 border-gray-500 bg-transparent dark:bg-darkBg dark:text-white dark:placeholder:text-gray-300"
        onFocus={() => {
          if (searchValue === "") setShowHistory(true);
        }}
      />

      <span
        className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer"
        onClick={clearSearch}
      >
        <IoIosClose className="text-gray-600 size-6" />
      </span>

      {showHistory && searchValue.trim() === "" && searchHistory.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 bg-white rounded-md mt-1 shadow-lg max-h-40 overflow-y-auto dark:bg-zinc-900">
          <div className="flex justify-between px-4 py-2">
            <span>Recent Searches</span>
            <button
              onClick={clearSearchHistory}
              className="text-sm text-blue-500"
            >
              Clear
            </button>
          </div>
          <ul>
            {searchHistory.map((workspace, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                onClick={() => handleClick(workspace)}
              >
                <Link href={`/w/${workspace._id}/dashboard`}>
                  {workspace.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading ? (
        <div className="absolute z-50 top-full left-0 right-0 bg-white dark:bg-zinc-900 border rounded-md mt-1 shadow-lg max-h-40 overflow-y-auto">
          <p className="px-4 py-2">Loading...</p>
        </div>
      ) : suggestions.length > 0 ? (
        <ul className="absolute z-50 top-full left-0 right-0 bg-white dark:bg-zinc-900 border rounded-md mt-1 shadow-lg max-h-40 overflow-y-auto">
          {suggestions.map((workspace) => (
            <Link
              key={workspace._id}
              href={`/w/${workspace._id}/dashboard`}
              onClick={() => handleClick(workspace)}
            >
              <li className="px-4 py-2 cursor-pointer">{workspace.name}</li>
            </Link>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
