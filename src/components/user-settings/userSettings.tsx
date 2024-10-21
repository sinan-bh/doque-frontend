"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/contexts/user-context";
import instance from "@/utils/axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ProfileSettings() {
  const { userProfile } = useUser();
  const { toast } = useToast();
  const router = useRouter()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await instance.put(`/userprofile/${userProfile?._id}`, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        image: userData.image,
      });

      if (resp.status === 200) {
        toast({ title: "Updated", description: "Profile updated succesfully" });
        router.push(`/u/${userProfile?._id}/profile`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full bg-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">My Settings</h2>
      </div>
      <div className="flex w-full mr-10 rounded-lg max-w-6xl mx-auto overflow-hidden shadow-md">
        <div className="flex-1 relative">
          <div className="relative h-full bg-white p-6 flex items-center">
            <div
              className="absolute top-0 left-0 w-full h-2/3 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2FsbHBhcGVyfGVufDB8fDB8fHww)",
              }}
            ></div>
            <div className="flex items-center">
              <div className="mr-6 z-10">
                <Image
                  src={
                    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                  }
                  alt="Profile"
                  className="rounded-full object-cover border-4 border-white"
                  width={120}
                  height={120}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-6"></div>
      <div className="max-w-6xl mr-10 mx-auto p-12 bg-white rounded-lg shadow-md relative">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-8">
            <div className="flex-1 space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="text"
                  name="image"
                  value={userData.image}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                />
              </div>
            </div>

            <div className="mt-2">
              <a
                href="reset-password"
                className="text-sm text-blue-500 flex justify-end hover:underline"
              >
                Change Password
              </a>
            </div>
          </div>
          <div>
            <button type="submit" className="bg-blue-400 p-2 rounded-xl">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
