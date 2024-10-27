"use client"

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

export default function ListBoardView() {
  const { workSpaceId, spaceId }: { workSpaceId: string; spaceId: string } =
    useParams();

  return (
    <div className="flex gap-4">
      <Link href={`/w/${workSpaceId}/spaces/${spaceId}/1`}>
        <Button variant="outline" size="sm">
          List
        </Button>
      </Link>
      <Link href={`/w/${workSpaceId}/spaces/${spaceId}`}>
        <Button variant="outline" size="sm">
          Boards
        </Button>
      </Link>
    </div>
  );
}
