import Image from "next/image";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import StatusButton from "./blockuser-btn";

interface Member {
  name: string;
  email: string;
  subscription: string;
  workspace: string;
  role: string;
  avatar: string;
}

export default function Members() {
  const [members] = useState<Member[]>([
    {
      name: "Alixa",
      email: "Alixa@gmail.com",
      subscription: "Free Plan",
      workspace: "My Workspace",
      role: "Admin",
      avatar:
        "https://img.freepik.com/premium-photo/man-with-beard-blue-circle-with-white-background_1057389-84761.jpg?size=626&ext=jpg&ga=GA1.1.213238987.1727286128&semt=ais_hybrid-rr-similar",
    },
    {
      name: "Jhon",
      email: "jhon@gmail.com",
      subscription: "Basic Plan",
      workspace: "Web Designing",
      role: "Member",
      avatar:
        "https://img.freepik.com/premium-photo/man-with-beard-blue-circle-with-white-background_1057389-84761.jpg?size=626&ext=jpg&ga=GA1.1.213238987.1727286128&semt=ais_hybrid-rr-similar",
    },
    {
      name: "Alice",
      email: "alice@example.com",
      subscription: "Premium Plan",
      workspace: "Graphic Design",
      role: "Admin",
      avatar:
        "https://img.freepik.com/premium-photo/man-with-beard-blue-circle-with-white-background_1057389-84761.jpg?size=626&ext=jpg&ga=GA1.1.213238987.1727286128&semt=ais_hybrid-rr-similar",
    },
    {
      name: "Michael",
      email: "michael@yahoo.com",
      subscription: "Standard Plan",
      workspace: "Marketing",
      role: "Editor",
      avatar:
        "https://img.freepik.com/premium-photo/man-with-beard-blue-circle-with-white-background_1057389-84761.jpg?size=626&ext=jpg&ga=GA1.1.213238987.1727286128&semt=ais_hybrid-rr-similar",
    },
    {
      name: "Sara",
      email: "sara@hotmail.com",
      subscription: "Free Plan",
      workspace: "Development",
      role: "Member",
      avatar:
        "https://img.freepik.com/premium-photo/man-with-beard-blue-circle-with-white-background_1057389-84761.jpg?size=626&ext=jpg&ga=GA1.1.213238987.1727286128&semt=ais_hybrid-rr-similar",
    },
    {
      name: "David",
      email: "david@gmail.com",
      subscription: "Enterprise Plan",
      workspace: "Consulting",
      role: "Manager",
      avatar:
        "https://img.freepik.com/premium-photo/man-with-beard-blue-circle-with-white-background_1057389-84761.jpg?size=626&ext=jpg&ga=GA1.1.213238987.1727286128&semt=ais_hybrid-rr-similar",
    },
    {
      name: "Emma",
      email: "emma@outlook.com",
      subscription: "Standard Plan",
      workspace: "Project Management",
      role: "Team Lead",
      avatar:
        "https://img.freepik.com/premium-photo/man-with-beard-blue-circle-with-white-background_1057389-84761.jpg?size=626&ext=jpg&ga=GA1.1.213238987.1727286128&semt=ais_hybrid-rr-similar",
    },
    {
      name: "Liam",
      email: "liam@gmail.com",
      subscription: "Basic Plan",
      workspace: "Content Creation",
      role: "Contributor",
      avatar:
        "https://img.freepik.com/premium-photo/man-with-beard-blue-circle-with-white-background_1057389-84761.jpg?size=626&ext=jpg&ga=GA1.1.213238987.1727286128&semt=ais_hybrid-rr-similar",
    },
    {
      name: "Sophia",
      email: "sophia@icloud.com",
      subscription: "Premium Plan",
      workspace: "Social Media",
      role: "Admin",
      avatar:
        "https://img.freepik.com/premium-photo/man-with-beard-blue-circle-with-white-background_1057389-84761.jpg?size=626&ext=jpg&ga=GA1.1.213238987.1727286128&semt=ais_hybrid-rr-similar",
    },
    {
      name: "Emma",
      email: "emma@outlook.com",
      subscription: "Standard Plan",
      workspace: "Project Management",
      role: "Team Lead",
      avatar:
        "https://img.freepik.com/premium-photo/man-with-beard-blue-circle-with-white-background_1057389-84761.jpg?size=626&ext=jpg&ga=GA1.1.213238987.1727286128&semt=ais_hybrid-rr-similar",
    },
    {
      name: "Emma",
      email: "emma@outlook.com",
      subscription: "Standard Plan",
      workspace: "Project Management",
      role: "Team Lead",
      avatar:
        "https://img.freepik.com/premium-photo/man-with-beard-blue-circle-with-white-background_1057389-84761.jpg?size=626&ext=jpg&ga=GA1.1.213238987.1727286128&semt=ais_hybrid-rr-similar",
    },
  ]);

  return (
    <div className="flex h-full overflow-hidden">
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
        <header className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Members
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <FiSearch className="absolute right-3 top-2.5 text-gray-600 dark:text-gray-400" />
          </div>
        </header>

        <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md mb-2">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-4 text-left w-1/4 text-gray-600 dark:text-gray-200">
                User
              </th>
              <th className="p-4 text-left w-1/4 text-gray-600 dark:text-gray-200">
                Email
              </th>
              <th className="p-4 text-left w-1/4 text-gray-600 dark:text-gray-200">
                Subscription
              </th>
              <th className="p-4 text-left w-1/4 text-gray-600 dark:text-gray-200">
                Workspace
              </th>
              <th className="p-4 text-left w-1/5 text-gray-600 dark:text-gray-200">
                Block
              </th>
            </tr>
          </thead>
        </table>

        <div className="overflow-y-auto h-[calc(100vh-260px)]">
          {members.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Users not found.
            </p>
          ) : (
            <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <tbody>
                {members.map((member, index) => (
                  <tr key={index} className="border-b dark:border-gray-600">
                    <td className="p-4 flex items-center">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        width={40}
                        height={40}
                        className="rounded-full mr-4"
                      />
                      <span className="text-gray-800 dark:text-gray-200">
                        {member.name}
                      </span>
                    </td>
                    <td className="p-4 text-gray-800 dark:text-gray-200">
                      {member.email}
                    </td>
                    <td className="p-4 text-gray-800 dark:text-gray-200">
                      {member.subscription}
                    </td>
                    <td className="p-4 text-gray-800 dark:text-gray-200">
                      {member.workspace}
                      <br />
                      Role: {member.role}
                    </td>
                    <td className="p-4">
                      <StatusButton initialStatus={true} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
