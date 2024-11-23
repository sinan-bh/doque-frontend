"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useAppSelector } from "@/lib/store/hooks";
import Cookies from "js-cookie";
import HandleLoading from "../ui/handle-loading";
import WorkspaceCard from "./workspace-card";
import WorkSpaceCardSkeleton from "./workspace-card-skeleton";

const loadingCards = [1, 2, 3];

export default function MyWorkSpace() {
  const [carouselRef] = useEmblaCarousel({ loop: false });
  const { workspaces, loading, error } = useAppSelector(
    (state) => state.workspace
  );

  const cookie = Cookies.get("user") || "{}";
  const userId = JSON.parse(cookie).id;

  const usersWorkSpaces = workspaces?.filter(
    (workspace) => workspace?.createdBy?._id === userId
  );

  return (
    <div className="relative min-h-40">
      <div ref={carouselRef} className="overflow-hidden">
        <HandleLoading
          loading={loading}
          error={error}
          loadingComponent={
            <div className="flex gap-2 overflow-hidden">
              {loadingCards.map((i) => (
                <WorkSpaceCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <div className="flex py-4 ml-4">
            {usersWorkSpaces?.map((w, index) => (
              <WorkspaceCard key={index} workSpace={w} />
            ))}
          </div>
        </HandleLoading>
      </div>
    </div>
  );
}
