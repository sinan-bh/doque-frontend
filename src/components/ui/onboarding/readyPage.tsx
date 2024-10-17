"use client";

import { useEffect } from "react";
import axios from "axios";
import Spinner from "../spinner/spinner";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user-context";
import { useWorkSpaceContext } from "@/contexts/workspace-context";

type readyPage = {
  spaceName: string;
  listName: {
    todo: string;
    doing: string;
    completed: string;
  };
};

export default function ReadyPage({ spaceName, listName }: readyPage) {
  const { loggedUser} = useUser()
  const { workSpacesId} = useWorkSpaceContext()
  const router = useRouter();  

  

  useEffect(() => {
    if (loggedUser?.token) {
    const handleReady = async () => {
      try {
        const {data} = await axios.post(
          `https://daily-grid-rest-api.onrender.com/api/space?workspaceId=${workSpacesId}`,
          { name: spaceName },
          {
            headers: {
              Authorization: `Bearer ${loggedUser?.token}`,
            },
          }
        );
        const spaceId = data.data._id
        console.log(data);
        
        await axios.post(
          `https://daily-grid-rest-api.onrender.com/api/space/${spaceId}/lists`,
          { name: listName.todo },
          {
            headers: {
              Authorization: `Bearer ${loggedUser?.token}`,
            },
          }
        );
        await axios.post(
          `https://daily-grid-rest-api.onrender.com/api/space/${spaceId}/lists`,
          { name: listName.doing },
          {
            headers: {
              Authorization: `Bearer ${loggedUser?.token}`,
            },
          }
        );
        await axios.post(
          `https://daily-grid-rest-api.onrender.com/api/space/${spaceId}/lists`,
          { name: listName.completed },
          {
            headers: {
              Authorization: `Bearer ${loggedUser?.token}`,
            },
          }
        );
        router.push(`w/${workSpacesId}/spaces/${spaceId}`);
      } catch (error) {
        console.log(error);
      }
    };

    handleReady();
  }
  }, [workSpacesId,loggedUser?.token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-black mb-4">
        Your Board Is Ready
      </h1>
      <Spinner />
    </div>
  );
}
