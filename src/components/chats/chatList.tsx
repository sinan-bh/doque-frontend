"use client";

import React from "react";

export default function ChatList() {
  return (
    <div className="w-1/4 h-full p-4 bg-gray-100">
      <div className="flex items-center mb-4">
        <img
          src="https://picsum.photos/300"
          className="w-10 h-10 rounded-full"
          alt="User"
        />
        <div className="ml-2">
          <h2 className="font-bold">Alixa</h2>
          <p className="text-sm text-gray-500">Senior Developer</p>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search Here..."
        className="w-full p-2 mb-4 rounded-lg border border-gray-300"
      />
      <div className="space-y-4">
        {["Designers", "Group Project"].map((chat, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-lg"
          >
            <div className="flex items-center">
              <img
                src="https://picsum.photos/200/300"
                className="w-10 h-10 rounded-full"
                alt="Chat Icon"
              />
              <div className="ml-2">
                <h3 className="font-bold">{chat}</h3>
                <p className="text-sm text-gray-500">Latest message...</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">10:35 AM</span>
          </div>
        ))}
      </div>
    </div>
  );
}
