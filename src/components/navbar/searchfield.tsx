"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import axiosInstance from "@/utils/axios";
import Link from "next/link";

interface Workspace {
  WorkspaceId: string;
  name: string;
}

export default function SearchField() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<Workspace[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  
  const searchContainerRef = useRef<HTMLDivElement>(null); // Reference for the container

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }

    // Close dropdown on click outside
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
    if (!history.some((item) => item.WorkspaceId === workspace.WorkspaceId)) {
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
      const response = await axiosInstance.get<{ data: Workspace[] }>(`/workspace`);
      const data = response.data?.data || [];

      const filteredData = data.filter((workspace) =>
        workspace.name.toLowerCase().includes(searchValue.toLowerCase())
      );

      setSuggestions(filteredData);
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
        <IoIosSearch className="text-gray-400 text-xl" />
      </span>

      <input
        type="text"
        placeholder="Search Workspaces..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full px-8 text-sm py-1 pl-8 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EDF1F4] shadow-[0px_2px_5px_rgba(0,0,0,0.1)] dark:bg-darkBg"
        onFocus={() => {
          if (searchValue === "") setShowHistory(true);
        }}
      />

      <span
        className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer"
        onClick={clearSearch}
      >
        <IoIosClose className="text-gray-400 size-6" />
      </span>

      {showHistory && searchValue.trim() === "" && searchHistory.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 bg-white rounded-md mt-1 shadow-lg max-h-40 overflow-y-auto dark:bg-gray-950">
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
                <Link href={`/w/${workspace.WorkspaceId}/dashboard`}>
                  {workspace.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading ? (
        <div className="absolute z-50 top-full left-0 right-0 bg-white border rounded-md mt-1 shadow-lg max-h-40 overflow-y-auto">
          <p className="px-4 py-2">Loading...</p>
        </div>
      ) : suggestions.length > 0 ? (
        <ul className="absolute z-50 top-full left-0 right-0 bg-white border rounded-md mt-1 shadow-lg max-h-40 overflow-y-auto">
          {suggestions.map((workspace) => (
            <Link
              key={workspace.WorkspaceId}
              href={`/w/${workspace.WorkspaceId}/dashboard`}
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
