"use client";

import React, { useEffect, useState } from "react";
import SpaceCard from "./space-card";
import { getAllSpaces } from "@/utils/taskUtils";
import { PopulateSpaceData } from "./populate-context-data";
import { useParams } from "next/navigation";
import { Space } from "@/types/spaces";
import { NewSpaceButton } from "./new-space-button";

export default function DisplaySpaceCards() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const { workSpaceId }: { workSpaceId: string } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchSpaces = async () => {
      const { data: spaces, error: fetchError } = await getAllSpaces(
        workSpaceId
      );
      if (fetchError) {
        setError(fetchError);
        setLoading(false);
        return;
      }
      if (spaces) {
        setSpaces(spaces);
      }
      setLoading(false);
    };
    fetchSpaces();
  }, [workSpaceId]);

  return (
    <>
      <div className="flex gap-4 mt-8 mb-2 items-center">
        <h1 className="text-xl font-semibold">Spaces</h1>
        <NewSpaceButton setSpaces={setSpaces} workSpaceId={workSpaceId} />
      </div>
      {loading && <div>Fetching space details..</div>}
      {spaces && (
        <div className="grid grid-cols-3 gap-4">
          {spaces.map((s, i) => (
            <SpaceCard setSpaces={setSpaces} space={s} key={i} />
          ))}
          <PopulateSpaceData spaces={spaces} />
        </div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}
    </>
  );
}
