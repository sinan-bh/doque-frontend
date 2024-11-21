"use client";

import React from "react";

export default function ChatDetails() {
  return (
    <div className="w-1/4 h-full p-4 bg-gray-50">
      <h2 className="font-bold text-lg mb-4">Designers</h2>
      <p className="text-sm mb-4">We are a Digital Designers team.</p>
      <h3 className="font-bold mb-2">Members</h3>
      <ul className="space-y-2">
        {["Adity", "Nola", "Alixa", "Fern"].map((member, index) => (
          <li key={index} className="flex items-center">
            <img
              src={"https://picsum.photos/800"}
              className="w-8 h-8 rounded-full mr-2"
              alt="Member"
            />
            <span>{member}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
