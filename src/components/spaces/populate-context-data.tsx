"use client";

import { useBoards } from "@/contexts/boards-context";
import { Space } from "@/types/spaces";
import { useEffect } from "react";

function PopulateSpaceData({ spaces }: { spaces: Space[] }) {
  const { populateSpacesData } = useBoards();
  useEffect(() => {
    populateSpacesData(spaces);
  }, [populateSpacesData, spaces]);
  return null;
}

export { PopulateSpaceData };
