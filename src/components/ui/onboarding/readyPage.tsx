"use client";

import { useEffect } from "react";
import axios from "axios";
import Spinner from "../spinner/spinner";
import { useRouter } from "next/navigation";

type readyPage = {
  spaceName: string;
  listName: {
    todo: string;
    doing: string;
    completed: string;
  };
};

export default function ReadyPage({ spaceName, listName }: readyPage) {
  const router = useRouter();

  useEffect(() => {
    const handleReady = async () => {
      try {
        await axios.post(
          "https://daily-grid-rest-api.onrender.com/api/space?workspaceId=6707881d4440b0ba576f4162",
          { name: spaceName },
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDc3OWExNDQ0MGIwYmE1NzZmNDEzNyIsImlhdCI6MTcyODU1MDk1NCwiZXhwIjoxNzMxMTQyOTU0fQ.Y9YjtJmC3VW442LyD-3JY9KW580izhAO2y3TZ8W1CT0`,
            },
          }
        );
        await axios.post(
          "https://daily-grid-rest-api.onrender.com/api/space/670798ab898cba87ae9c7ca4/lists",
          { name: listName.todo },
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDc3OWExNDQ0MGIwYmE1NzZmNDEzNyIsImlhdCI6MTcyODU1MDk1NCwiZXhwIjoxNzMxMTQyOTU0fQ.Y9YjtJmC3VW442LyD-3JY9KW580izhAO2y3TZ8W1CT0`,
            },
          }
        );
        await axios.post(
          "https://daily-grid-rest-api.onrender.com/api/space/670798ab898cba87ae9c7ca4/lists",
          { name: listName.doing },
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDc3OWExNDQ0MGIwYmE1NzZmNDEzNyIsImlhdCI6MTcyODU1MDk1NCwiZXhwIjoxNzMxMTQyOTU0fQ.Y9YjtJmC3VW442LyD-3JY9KW580izhAO2y3TZ8W1CT0`,
            },
          }
        );
        await axios.post(
          "https://daily-grid-rest-api.onrender.com/api/space/670798ab898cba87ae9c7ca4/lists",
          { name: listName.completed },
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDc3OWExNDQ0MGIwYmE1NzZmNDEzNyIsImlhdCI6MTcyODU1MDk1NCwiZXhwIjoxNzMxMTQyOTU0fQ.Y9YjtJmC3VW442LyD-3JY9KW580izhAO2y3TZ8W1CT0`,
            },
          }
        );
        router.push("/w/1/1");
      } catch (error) {
        console.log(error);
      }
    };

    handleReady();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-black mb-4">
        Your Board Is Ready
      </h1>
      <Spinner />
    </div>
  );
}
