"use client";

import Image from "next/image";
import { useState } from "react";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "Alixa",
    email: "Alixa@gmail.com",
    password: "********",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleButtonClick = () => {
    if (isEditing) {
      console.log("Saved data:", formData);
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full p-6 bg-gray-100 dark:bg-gray-900">
      <div className="relative w-full h-48">
        <div className="rounded-t-lg overflow-hidden mb-6 h-32">
          <Image
            src="https://images.unsplash.com/photo-1606112219348-204d7d8b94ee"
            alt="Profile Banner"
            layout="fill"
            objectFit="cover"
            className="w-full h-full rounded-t-lg"
          />
        </div>

        <div className="relative w-full h-16 bg-white dark:bg-gray-800 rounded-b-lg mb-6 flex items-center">
          <div className="absolute left-4 -top-12">
            <Image
              src="https://i.pravatar.cc/100"
              alt="Admin Avatar"
              width={100}
              height={100}
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Profile Settings
        </h2>
        <form>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-gray-900 dark:text-gray-200"
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-gray-900 dark:text-gray-200"
                readOnly={!isEditing}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-gray-900 dark:text-gray-200"
                readOnly={!isEditing}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleButtonClick}
                className="border border-gray-300 dark:border-gray-600 text-black dark:text-white bg-gray-200 dark:bg-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                {isEditing ? "Save" : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
