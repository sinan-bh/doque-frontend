"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchUserProfile,
  clearMessages,
  updateUserProfile,
} from "@/lib/store/features/userSlice";
import { FaCamera } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ProfileSettings() {
  const dispatch = useAppDispatch();
  const { userProfile } = useAppSelector((state) => state.user);

  const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL ?? "";

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const [userData, setUserData] = useState({
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    email: userProfile?.email || "",
    phoneNumber: userProfile?.phoneNumber || "",
    image: userProfile?.image || "",
  });

  useEffect(() => {
    if (userProfile) {
      setUserData({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        phoneNumber: userProfile.phoneNumber,
        image: userProfile.image,
      });
    }
  }, [userProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Doque project");

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setUserData((prevData) => ({
        ...prevData,
        image: data.secure_url,
      }));
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(updateUserProfile({ id: userProfile?._id, userData }));
    dispatch(fetchUserProfile());
    toast({ description: "Profile updated successfully" });
    router.push(`/u/profile`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-darkBg flex flex-col items-center p-6">
      <div className="flex flex-col w-full max-w-6xl mx-auto rounded-lg shadow-md overflow-hidden">
        <div className="relative bg-[url('https://wallpapers.com/images/hd/abstract-pastel-linkedin-banner-d4uikckcdgob8bo1.jpg')] h-32 flex items-center justify-center">
          {userData.image && (
            <Avatar className="w-28 h-28 mr-4 sm:w-28 sm:h-28">
              <AvatarImage
                src={userData?.image || "/images/avatarFallback.png"}
                alt="Avatar"
              />
              <AvatarFallback />
            </Avatar>
          )}
          <div className="relative top-10 right-12 p-1 bg-white border-2 border-gray-300 rounded-full hover:bg-blue-300">
            <label htmlFor="file-input">
              <FaCamera className="text-gray-600 cursor-pointer" />
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-950">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-8">
              <div className="flex-1 space-y-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    className="p-2 border outline-none rounded-lg focus:ring focus:ring-blue-200"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    className="p-2 border outline-none rounded-lg focus:ring focus:ring-blue-200"
                    required
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    className="p-2 border outline-none rounded-lg focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-2">
              <a
                href="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Change Password
              </a>
              <button
                type="submit"
                className="bg-blue-400 p-2 rounded-xl w-full md:w-auto mt-4"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
