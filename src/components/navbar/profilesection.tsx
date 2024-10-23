"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { Button } from "../ui/button";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchUserProfile, logout } from "@/lib/store/features/userSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function ProfileSection() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userProfile } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const userDetails = Cookies.get("user");
      const user = JSON.parse(userDetails || "");
      dispatch(fetchUserProfile({ userId: user.id }));
    };
    fetchData();
  }, [dispatch]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/signin");
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}>
          <Avatar className="w-8 h-8">
            <AvatarImage src={userProfile?.image} alt="Avatar" />
            <AvatarFallback />
          </Avatar>
          <span className="font-semibold text-gray-800 dark:text-gray-300">
            {userProfile?.firstName}
          </span>
          {isOpen ? (
            <IoIosArrowUp className="text-gray-600 transition-transform duration-300 dark:text-gray-300" />
          ) : (
            <IoIosArrowDown className="text-gray-600 transition-transform duration-300 dark:text-gray-300" />
          )}
        </div>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-64 bg-white/90 rounded-lg  z-10 shadow-lg backdrop-blur-md p-3 dark:bg-gray-950">
          <Link
            href={`/u/${userProfile?._id}/profile`}
            onClick={() => setIsOpen(!isOpen)}>
            <Button className="flex items-center justify-between bg-gray-100 rounded-lg w-full hover:bg-gray-300 h-12 p-2 dark:bg-gray-900 dark:hover:bg-gray-800 ">
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={userProfile?.image} alt="Avatar" />
                  <AvatarFallback />
                </Avatar>
                <span className="font-semibold text-gray-800 dark:text-gray-300">
                  {userProfile?.firstName}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-sm text-gray-500 dark:text-gray-300">
                  Profile
                </span>
                <IoIosArrowForward className="text-gray-600" />
              </div>
            </Button>
          </Link>

          <div className="flex justify-between gap-2 mt-2">
            <Link
              href={`/u/${userProfile?._id}/settings`}
              className="flex-1 bg-[#E5E9EC] text-black rounded-2xl flex items-center justify-center h-8 hover:bg-[#C7C3B5] dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-600"
              onClick={() => setIsOpen(!isOpen)}>
              <FiSettings className="mr-1 dark:text-gray-300" />
              Settings
            </Link>
            <Button
              onClick={() => {
                handleLogout();
                setIsOpen(!isOpen);
              }}
              className="flex-1 bg-[#E5E9EC] text-black rounded-2xl flex items-center justify-center h-8 hover:bg-[#C7C3B5] dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-600">
              <IoLogOutOutline className="mr-1 dark:text-gray-300" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
