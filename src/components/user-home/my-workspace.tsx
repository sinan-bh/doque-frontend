"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useAppSelector } from "@/lib/store/hooks";
import ProjectCard from "./project-card";
import Cookies from "js-cookie";

export default function MyWorkSpace() {
  const [carouselRef] = useEmblaCarousel({ loop: true });
  const { workSpace } = useAppSelector((state) => state.workspace);
  const cookie = Cookies.get("user") || "{}";
  const userId = JSON.parse(cookie).id;

  const usersWorkSpaces = workSpace.filter((workspace) => {
    const owner = workspace.members.find((member) => member.status === "owner");
    return owner?.user._id === userId;
  });

  return (
    <div className="relative">
      <div ref={carouselRef} className="overflow-hidden">
        <div className="flex ml-4">
          {usersWorkSpaces.map(({ WorkspaceId }, index) => (
            <ProjectCard key={index} workSpaceId={WorkspaceId} />
          ))}
        </div>
      </div>
    </div>
  );
}
