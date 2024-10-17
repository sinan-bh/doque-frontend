"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaBell } from "react-icons/fa";
import { ModeToggle } from "../ui/dark-mode/mode-toggle";
import { useAdmin } from "../../contexts/admin-context";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { logout } = useAdmin();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    console.log("Logged out");
    router.push("/home");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 p-4 flex justify-end relative transition-colors duration-300">
      <div className="flex items-center space-x-4">
        <span title="Notifications">
          <FaBell size={20} />
        </span>
        <ModeToggle />
        <Image
          src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg&ga=GA1.1.213238987.1727286128&semt=ais_hybrid"
          alt="Profile"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />
      </div>

      {isDropdownOpen && (
        <div className="absolute top-12 right-4 w-32 bg-white dark:bg-gray-700 border rounded shadow-md transition-colors duration-300">
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
};

export default Navbar;
