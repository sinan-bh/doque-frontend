"use client";

import SpaceCard from "./space-card";
import { useParams } from "next/navigation";
import { NewSpaceButton } from "./new-space-button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchSpacesData } from "@/lib/store/api/space-api";
import { useEffect } from "react";
import HandleLoading from "../ui/handle-loading";

export default function DisplaySpaceCards() {
  const { workSpaceId }: { workSpaceId: string } = useParams();
  const { spaces, error, loadingSpaces } = useAppSelector(
    (state) => state.space
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSpacesData(workSpaceId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workSpaceId]);

  return (
    <>
      <div className="flex gap-4 mt-8 mb-2 items-center">
        <h1 className="text-xl font-semibold">Spaces</h1>
        <NewSpaceButton setSpaces={() => {}} workSpaceId={workSpaceId} />
      </div>
      <HandleLoading loading={loadingSpaces.getSpaces} error={error.getSpaces}>
        {spaces && (
          <div className="grid grid-cols-3 gap-4">
            {spaces.map((s, i) => (
              <SpaceCard setSpaces={() => {}} space={s} key={i} />
            ))}
          </div>
        )}
      </HandleLoading>
    </>
  );
}
