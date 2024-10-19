"use client";

import { useEffect } from "react";
import Spinner from "../spinner/spinner";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { onReadyPage } from "@/lib/store/features/workspace-slice";

type readyPage = {
  spaceName: string;
  listName: {
    todo: string;
    doing: string;
    completed: string;
  };
};

export default function ReadyPage({ spaceName, listName }: readyPage) {
  const dispatch = useDispatch<AppDispatch>()
  const { workSpaceId, spaceId} = useSelector((state: RootState)=> state.workspace)
  const router = useRouter();  

  useEffect(() => {
    const handleReady = async () => {
      dispatch(onReadyPage({workSpaceId,spaceName,listName}))
      router.push(`w/${workSpaceId}/spaces/${spaceId}`);
    };

    handleReady();
  }, [workSpaceId,spaceId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-black mb-4">
        Your Board Is Ready
      </h1>
      <Spinner />
    </div>
  );
}
