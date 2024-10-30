import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAppSelector } from "@/lib/store/hooks";
import { NewSpaceButton } from "../spaces/new-space-button";
import { EditSpace } from "../spaces/edit-space";
import HandleLoading from "../ui/handle-loading";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";

const Spaces: React.FC = () => {
  const [showSpaces, setShowSpaces] = useState(true);
  const { spaces, loadingSpaces, error } = useAppSelector(
    (state) => state.space
  );

  const { workSpaceId }: { workSpaceId: string } = useParams();

  const toggleSpaceList = () => {
    setShowSpaces((prev) => !prev);
  };

  return (
    <div>
      <div className="pb-2">
        <div className="flex items-center justify-between border-b border-gray-500 pb-1 ">
          <Link href={`/w/${workSpaceId}/spaces`}>
            <h3 className="font-medium text-black dark:text-gray-300">
              Spaces
            </h3>
          </Link>
          <div className="flex items-center gap-2 ">
            <NewSpaceButton>
              <Button size="icon" variant="ghost">
                <FaPlus className="text-black cursor-pointer dark:text-gray-300" />
              </Button>
            </NewSpaceButton>
            {showSpaces ? (
              <Button size="icon" variant="ghost" onClick={toggleSpaceList}>
                <IoIosArrowUp className="cursor-pointer" />
              </Button>
            ) : (
              <Button size="icon" variant="ghost" onClick={toggleSpaceList}>
                <IoIosArrowDown className="cursor-pointer" />
              </Button>
            )}
          </div>
        </div>

        {showSpaces && (
          <HandleLoading
            errorComponent={
              <div>
                <p className="text-sm text-zinc-800">Could not load spaces!!</p>
                <p className="text-xs text-red-600">{error.getSpaces}</p>
              </div>
            }
            loading={loadingSpaces.getSpaces}
            error={error.getSpaces}>
            <div className="mt-4 max-h-40 sm:max-h-56 md:max-h-56 lg:max-h-56 overflow-y-auto">
              {spaces.map((space) => (
                <div key={space._id}>
                  <div className="flex justify-between items-center p-1 cursor-pointer rounded hover:bg-gray-200">
                    <Link href={`/w/${workSpaceId}/spaces/${space._id}`}>
                      <h2 className="font-medium text-md text-black dark:text-gray-300">
                        {space.name}
                      </h2>
                    </Link>
                    <div className="flex items-center relative">
                      <EditSpace initialData={space} spaceId={space._id}>
                        <div>
                          <BsThreeDotsVertical className="text-black mr-2 cursor-pointer dark:text-gray-300" />
                        </div>
                      </EditSpace>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </HandleLoading>
        )}
      </div>
    </div>
  );
};

export default Spaces;
