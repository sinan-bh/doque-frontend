"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchUserProfile,
  clearMessages,
  updateUserProfile,
} from "@/lib/store/features/userSlice";
import { FaCamera } from "react-icons/fa";

export default function ProfileSettings() {
  const dispatch = useAppDispatch();
  const { userProfile, successMessage, error } = useAppSelector(
    (state) => state.user
  );

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchUserProfile({ userId: userProfile?._id }));
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast({
        title: "Success",
        description: successMessage,
      });
      dispatch(clearMessages());
    }

    if (error) {
      toast({
        title: "Error",
        description: error,
      });
      dispatch(clearMessages());
    }
  }, [successMessage, error, toast, dispatch]);

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
    formData.append("upload_preset", "Project Doque");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dzxrdd7a4/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

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
    dispatch(fetchUserProfile({ userId: userProfile?._id }));
    toast({ description: "Profile updated successfully" });
    router.push(`/u/${userProfile?._id}/profile`);
  };

  return (
    <div className="h-full bg-gray-100 p-6 dark:bg-darkBg">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">My Settings</h2>
      </div>
      <div className="flex w-full mr-10 rounded-lg max-w-6xl mx-auto overflow-hidden shadow-md">
        <div className="flex-1 relative">
          <div className="relative h-full bg-[url('https://wallpapers.com/images/hd/abstract-pastel-linkedin-banner-d4uikckcdgob8bo1.jpg')] p-6 flex items-center">
            <div className="mr-6 z-10 relative">
              {userData.image && (
                <Image
                  src={
                    userData?.image ||
                    "https://i.pinimg.com/564x/a3/e4/7c/a3e47c7483116543b6fa589269b760df.jpg"
                  }
                  alt="Profile"
                  className="rounded-full object-cover border-4 border-white dark:border-black"
                  width={120}
                  height={120}
                />
              )}
              <div className="absolute bottom-0 right-5 p-1 bg-white border-2 border-gray-300 rounded-full hover:bg-blue-300">
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
          </div>
        </div>
      </div>
      <div className="my-6"></div>
      <div className="max-w-6xl mr-10 mx-auto p-12 bg-white rounded-lg shadow-md relative dark:bg-gray-950">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-8">
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
                <label className="text-sm font-medium text-gray-700 p-1 dark:text-gray-300">
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
            <div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 p-1 dark:text-gray-300">
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

            <div className="mt-2">
              <a
                href="/forgot-password"
                className="text-sm text-blue-500 flex justify-end hover:underline">
                Change Password
              </a>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-400 p-2 rounded-xl w-20">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
