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
      await dispatch(
        createSpace({ workSpaceId, spaceName })
      );
    }
    handleSpace()

   
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
       <div className=" flex items-center justify-center">
      <div className="flex flex-col">
          <div className="flex space-x-2 text-4xl font-extrabold tracking-widest text-white">
            <span className="rounded-lg text-gray-600 dark:text-white animate-bounceDelay bg-gradient-to-r from-white to-gray-600 dark:from-slate-900 dark:to-slate-700" style={{ animationDelay: '0.1s' }}>D</span>
            <span className="rounded-lg text-gray-600 dark:text-white animate-bounceDelay bg-gradient-to-r from-white to-gray-600 dark:from-slate-900 dark:to-slate-700" style={{ animationDelay: '0.2s' }}>O</span>
            <span className="rounded-lg text-gray-600 dark:text-white animate-bounceDelay bg-gradient-to-r from-white to-gray-600 dark:from-slate-900 dark:to-slate-700" style={{ animationDelay: '0.1s' }}>Q</span>
            <span className="rounded-lg text-gray-600 dark:text-white animate-bounceDelay bg-gradient-to-r from-white to-gray-600 dark:from-slate-900 dark:to-slate-700" style={{ animationDelay: '0.2s' }}>U</span>
            <span className="rounded-lg text-gray-600 dark:text-white animate-bounceDelay bg-gradient-to-r from-white to-gray-600 dark:from-slate-900 dark:to-slate-700" style={{ animationDelay: '0.1s' }}>E</span>
          </div>
          <div className="flex text-4xl justify-center tracking-widest">
              <span className="text-gray-600 dark:text-white px-2 animate-bounceDelay" style={{ animationDelay: '0.1s' }}>.</span>
              <span className="text-gray-600 dark:text-white px-2 animate-bounceDelay" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="text-gray-600 dark:text-white px-2 animate-bounceDelay" style={{ animationDelay: '0.1s' }}>.</span>
              <span className="text-gray-600 dark:text-white px-2 animate-bounceDelay" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="text-gray-600 dark:text-white px-2 animate-bounceDelay" style={{ animationDelay: '0.1s' }}>.</span>
          </div>
      </div>
    </div>
      <h1 className="text-3xl font-bold text-black mb-4">
        Your board Is being ready..
      </h1>
    </div>
  );
}
