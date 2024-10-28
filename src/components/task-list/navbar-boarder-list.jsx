"use client";

import React, { useState, useEffect } from "react";
import { EditSpace } from "@/components/spaces/edit-space";
import Filter from "@/components/spaces/filter";
import SearchBar from "@/components/boards/search-tasks";
import { Button } from "@/components/ui/button";
import ListBoardView from "@/components/task-list/list-board-view";
import Cookies from "js-cookie";
import { getSpaceDetails } from "@/utils/space-utils";
import { useParams } from "next/navigation";

export default function NavbarBoarderList() {
  const [spaceDetails, setSpaceDetails] = useState(null);
  const { spaceId } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpaceDetails = async () => {
      try {
        const userCookie = Cookies.get("user");
        const details = await getSpaceDetails(spaceId, userCookie);
        setSpaceDetails(details.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchSpaceDetails();
  }, [spaceId]);

  if (error) return <div>Error loading space details</div>;
  if (!spaceDetails) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex px-4 justify-between">
        <ListBoardView />
        <SearchBar />
        <div className="flex gap-4">
          <EditSpace
            spaceId={spaceId}
            initialData={{
              name: spaceDetails.name,
              description: spaceDetails.description,
            }}
          >
            <Button variant="outline" size="sm">
              Edit space
            </Button>
          </EditSpace>
          <Filter />
        </div>
      </div>
      <div className="h-0.5 bg-zinc-400 my-2 rounded-full"></div>
    </div>
  );
}
