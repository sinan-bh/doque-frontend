import Image from "next/image";
import React from "react";

export default function SpaceSettings() {
  return (
    <div className="w-2/5 bg-gray-100 rounded-xl p-6">
      <h1 className="text-lg font-semibold mb-6">Space Setting</h1>

      <div className="flex justify-around items-center mb-6">
        <div className="flex flex-col items-center">
          <p className="text-xs font-medium mb-2">Avatar</p>
          <Image
            src="https://th.bing.com/th/id/OIP.jJc8w97jm7qvXJrutrnmrgHaHe?rs=1&pid=ImgDetMain"
            alt="Space avatar"
            width={40}
            height={40}
            className="rounded-xl border"
          />
        </div>
        <div className="flex flex-col w-2/3">
          <label className="text-sm font-medium mb-1" htmlFor="space-name">
            Name
          </label>
          <input
            id="space-name"
            type="text"
            placeholder="Space name..."
            className="border border-gray-300 rounded-xl outline-none p-2"
          />
        </div>
      </div>

      <div className="flex justify-around items-start mb-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1" htmlFor="owner-select">
            Owner
          </label>
          <select
            name="owner"
            id="owner-select"
            className="border w-28 border-gray-300 rounded-xl p-2 "
          >
            <option value="Alixa">Alixa</option>
          </select>
        </div>
        <div className="flex flex-col w-2/3">
          <label className="text-sm font-medium mb-1">Privacy</label>
          <p className="text-xs text-gray-500">
            Only you and invited people can access this space.
          </p>
        </div>
      </div>

      <div className="flex flex-col mb-6">
        <label className="text-sm font-medium mb-1" htmlFor="description">
          Description
        </label>
        <input
          id="description"
          type="text"
          className="border border-gray-300 rounded-xl p-2 "
          placeholder="Describe your space..."
        />
      </div>

      <div className="flex justify-end">
        <button className="p-2 text-black bg-white rounded-md border-2 border-black hover:bg-black hover:text-white transition-colors">
          Save
        </button>
      </div>
    </div>
  );
}
