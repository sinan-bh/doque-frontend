"use client";

import SpaceCard from "./space-card";
import { NewSpaceButton } from "./new-space-button";
import { useAppSelector } from "@/lib/store/hooks";
import HandleLoading from "../ui/handle-loading";
import { Button } from "../ui/button";

export default function DisplaySpaceCards() {
  const { spaces, error, loadingSpaces } = useAppSelector(
    (state) => state.space
  );

  return (
    <>
      <div className="flex gap-4 mt-8 mb-2 items-center">
        <h1 className="text-xl font-semibold">Spaces</h1>
        <NewSpaceButton>
          <Button size="sm" variant="outline">
            New Space +
          </Button>
        </NewSpaceButton>
      </div>
      <HandleLoading loading={loadingSpaces.getSpaces} error={error.getSpaces}>
        {spaces && (
          <div className="grid grid-cols-3 gap-4">
            {spaces.map((s) => (
              <SpaceCard space={s} key={s._id} />
            ))}
          </div>
        )}
      </HandleLoading>
    </>
  );
}
