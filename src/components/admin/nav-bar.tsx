"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaBell } from "react-icons/fa";
import { ModeToggle } from "../ui/dark-mode/mode-toggle";
import { useAppDispatch } from "../../lib/store/hooks";
import { logout } from "../../lib/store/features/admin/admin-auth-slice";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
    router.push("/u/home");
  };

  const sampleNotifications = [
    { id: 1, message: "New user John Doe has joined." },
    { id: 2, message: "New user Jane Smith has joined." },
    { id: 3, message: "New user Alex Brown has joined." },
    { id: 4, message: "New user Emily White has joined." },
    { id: 5, message: "New user Michael Black has joined." },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 p-4 flex justify-end relative transition-colors duration-300">
      <div className="flex z-40 items-center space-x-4">
        <span
          title="Notifications"
          onClick={toggleNotificationDropdown}
          className="relative cursor-pointer"
        >
          <FaBell size={20} />
        </span>

        {isNotificationOpen && (
          <div className="absolute top-12 right-16 w-64 h-40 bg-white dark:bg-gray-700 border rounded shadow-md p-4 transition-colors duration-300 overflow-y-auto">
            {sampleNotifications.map((notification) => (
              <p
                key={notification.id}
                className="text-gray-700 dark:text-gray-300 mb-2"
              >
                {notification.message}
              </p>
            ))}
          </div>
        )}

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
