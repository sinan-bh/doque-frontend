"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../spinner/spinner";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user-context";

type readyPage = {
  spaceName: string;
  listName: {
    todo: string;
    doing: string;
    completed: string;
  };
};

export default function ReadyPage({ spaceName, listName }: readyPage) {
  const [workSpaceId, setWorkSpaceId] = useState<string | null>(null)
  const { loggedUser} = useUser()
  const router = useRouter();  

  useEffect(()=> {
    const workSpace = localStorage.getItem("workSpace")
    if (workSpace) {
      setWorkSpaceId(JSON.parse(workSpace))
    }
  },[loggedUser?.id])

  useEffect(() => {
    const handleReady = async () => {
      try {
        await axios.post(
          `https://daily-grid-rest-api.onrender.com/api/space?workspaceId=${workSpaceId}`,
          { name: spaceName },
          {
            headers: {
              Authorization: `Bearer ${loggedUser?.token}`,
            },
          }
        );
        await axios.post(
          "https://daily-grid-rest-api.onrender.com/api/space/670798ab898cba87ae9c7ca4/lists",
          { name: listName.todo },
          {
            headers: {
              Authorization: `Bearer ${loggedUser?.token}`,
            },
          }
        );
        await axios.post(
          "https://daily-grid-rest-api.onrender.com/api/space/670798ab898cba87ae9c7ca4/lists",
          { name: listName.doing },
          {
            headers: {
              Authorization: `Bearer ${loggedUser?.token}`,
            },
          }
        );
        await axios.post(
          "https://daily-grid-rest-api.onrender.com/api/space/670798ab898cba87ae9c7ca4/lists",
          { name: listName.completed },
          {
            headers: {
              Authorization: `Bearer ${loggedUser?.token}`,
            },
          }
        );
        router.push("/w/1/1");
      } catch (error) {
        console.log(error);
      }
    };

    handleReady();
  }, [workSpaceId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-black mb-4">
        Your Board Is Ready
      </h1>
      <Spinner />
    </div>
  );
}
