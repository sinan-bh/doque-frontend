"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaUsers,
  FaFolder,
  FaUser,
  FaCog,
  FaBars,
} from "react-icons/fa";

type MenuItem = {
  icon: JSX.Element;
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  { icon: <FaTachometerAlt />, label: "Dashboard", href: "/admin/dashboard" },
  { icon: <FaUsers />, label: "Members", href: "/admin/members" },
  { icon: <FaFolder />, label: "Workspaces", href: "/admin/workspaces" },
  { icon: <FaUser />, label: "Profile", href: "/admin/profile" },
  { icon: <FaCog />, label: "Settings", href: "#" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <aside
      className={`relative h-screen p-4 bg-white dark:bg-gray-800 shadow-md transition-width duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <button
        className="absolute z-50 top-4 -right-8 p-2 text-black hover:text-gray-900 dark:text-white dark:hover:text-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>
      {isOpen ? (
        <div className="text-2xl font-bold ml-6 mb-16 text-gray-900 dark:text-white">
          DOQUE
        </div>
      ) : (
        <div className="text-1xl font-bold mb-16 text-gray-900 dark:text-white">
          DOQ
        </div>
      )}
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index} className="ml-2">
            <Link href={item.href}>
              <div
                className={`flex items-center pl-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transform transition-transform duration-300 hover:scale-105 
                ${
                  pathname === item.href
                    ? "border-l-4 border-gray-700 dark:border-gray-400"
                    : "hover:border-l-4 hover:border-gray-400 dark:hover:border-gray-600"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
