import React, { useState } from "react";
import { FaEllipsisV, FaLock, FaUnlock } from "react-icons/fa";

interface StatusButtonProps {
  initialStatus: boolean;
}

export default function StatusButton({ initialStatus }: StatusButtonProps) {
  const [isActive, setIsActive] = useState(initialStatus);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleStatus = (status: boolean) => {
    setIsActive(status);
    setShowDropdown(false);
  };

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative">
      <button
        onClick={handleDropdown}
        className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200"
      >
        <FaEllipsisV />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10">
          <ul className="py-1">
            <li
              onClick={() => toggleStatus(false)}
              className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
            >
              <FaLock className="mr-2 text-red-500" /> Block
            </li>
            <li
              onClick={() => toggleStatus(true)}
              className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
            >
              <FaUnlock className="mr-2 text-green-500" /> Unblock
            </li>
          </ul>
        </div>
      )}

      <div className="flex items-center mt-2">
        {isActive ? (
          <span className="text-green-500">
            <FaUnlock />
          </span>
        ) : (
          <span className="text-red-500">
            <FaLock />
          </span>
        )}
      </div>
    </div>
  );
}
