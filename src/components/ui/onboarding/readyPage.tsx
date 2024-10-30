"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { createList, createSpace } from "@/lib/store/features/workspace-slice";

type readyPage = {
  spaceName: string;
  listName: {
    todo: string;
    doing: string;
    completed: string;
  };
};

export default function ReadyPage({ spaceName, listName }: readyPage) {
  const dispatch = useDispatch<AppDispatch>();
  const { workSpaceId, spaceId } = useSelector(
    (state: RootState) => state.workspace
  );
  const router = useRouter();

  useEffect(() => {
    const handleSpace = async () => {
      await dispatch(createSpace({ workSpaceId, spaceName }));
    };
    handleSpace();
  }, [workSpaceId]);

  useEffect(() => {
    const handleReady = async () => {
      await dispatch(createList({ spaceId, listName }));
      if (spaceId) {
        router.push(`w/${workSpaceId}/spaces/${spaceId}`);
      }
    };

    handleReady();
  }, [spaceId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-center">
          <div className="flex space-x-2 text-3xl md:text-4xl font-extrabold tracking-widest text-white">
            {['D', 'O', 'Q', 'U', 'E'].map((letter, index) => (
              <span
                key={index}
                className="rounded-lg text-gray-600 dark:text-white animate-bounceDelay bg-gradient-to-r from-white to-gray-600 dark:from-slate-900 dark:to-slate-700"
                style={{ animationDelay: `${0.1 + (index % 2) * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </div>
          <div className="flex text-3xl md:text-4xl justify-center tracking-widest">
            {Array(5)
              .fill('.')
              .map((dot, index) => (
                <span
                  key={index}
                  className="text-gray-600 dark:text-white px-2 animate-bounceDelay"
                  style={{ animationDelay: `${0.1 + (index % 2) * 0.1}s` }}
                >
                  {dot}
                </span>
              ))}
          </div>
        </div>
      </div>
      <h1 className="text-2xl md:text-3xl font-medium sm:font-bold text-black mb-4 text-center">
        Your board is being ready..
      </h1>
    </div>
  );
}
