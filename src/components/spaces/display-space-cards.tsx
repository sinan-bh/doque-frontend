import React from "react";
import SpaceCard from "./space-card";
import { getAllSpaces } from "@/utils/taskUtils";
import { PopulateSpaceData } from "./populate-context-data";

export default async function DisplaySpaceCards({
  workSpaceId,
}: {
  workSpaceId: string;
}) {
  const { data: spaces, error } = await getAllSpaces(workSpaceId);
  return (
    <>
      {spaces && (
        <div className="grid grid-cols-3 gap-4">
          {spaces.map((s, i) => (
            <SpaceCard space={s} key={i} />
          ))}
          <PopulateSpaceData spaces={spaces} />
        </div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}
    </>
  );
}
