import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Space {
  id: number;
  name: string;
}

const Spaces: React.FC = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [showSpaces, setShowSpaces] = useState(true);
  const [activeSpaceId, setActiveSpaceId] = useState<number | null>(null); // Track which space is active for actions

  const addSpace = () => {
    const newSpaceId = spaces.length + 1;
    const newSpace: Space = { id: newSpaceId, name: `Space ${newSpaceId}` };
    setSpaces([...spaces, newSpace]);
    setShowSpaces(true);
  };

  const toggleSpaceList = () => {
    setShowSpaces((prev) => !prev);
  };

  const handleSpaceActions = (spaceId: number) => {
    // Toggle the active space ID
    setActiveSpaceId((prevId) => (prevId === spaceId ? null : spaceId));
  };

  return (
    <div>
      <div className="pb-2">
        <div className="flex items-center justify-between border-b border-gray-500 pb-1">
          <Link href="/w/id/spaces">
            <h3 className="font-medium text-black">Spaces</h3>
          </Link>
          <div className="flex items-center gap-2">
            <FaPlus className="text-black cursor-pointer" onClick={addSpace} />
            {showSpaces ? (
              <IoIosArrowUp
                className="cursor-pointer"
                onClick={toggleSpaceList}
              />
            ) : (
              <IoIosArrowDown
                className="cursor-pointer"
                onClick={toggleSpaceList}
              />
            )}
          </div>
        </div>

        {showSpaces && (
          <div className="mt-4">
            {spaces.map((space) => (
              <div key={space.id}>
                <div className="flex justify-between items-center p-1 hover:border-l-8 cursor-pointer">
                  <Link href={"/w/1/1"}>
                    <h2 className="font-medium text-md text-black">
                      {space.name}
                    </h2>
                  </Link>
                  <div className="flex items-center relative">
                      {activeSpaceId === space.id && (
                      <div className="flex flex-col items-start bg-white shadow-lg p-2 rounded absolute right-full mr-2">
                        <button className="text-sm hover:underline">
                          Edit
                        </button>
                        <button className="text-sm hover:underline">
                          Delete
                        </button>
                      </div>
                    )}
                    <BsThreeDotsVertical
                      onClick={() => handleSpaceActions(space.id)} 
                      className="text-black mr-2 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Spaces;
