"use client";

import React, { useState } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { ModeToggle } from "../ui/dark-mode/mode-toggle";
import { useAppDispatch } from "../../lib/store/hooks";
import { logout } from "../../lib/store/features/admin/admin-auth-slice";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
    router.push("/u/home");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 p-4 flex justify-end relative transition-colors duration-300">
      <div className="flex z-40 items-center space-x-4">
        <ModeToggle />

        <MdAdminPanelSettings
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />
      </div>

      {isDropdownOpen && (
        <div className="absolute z-40 top-12 right-4 w-32 bg-white dark:bg-gray-700 border rounded shadow-md transition-colors duration-300">
          <button
            className="w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
