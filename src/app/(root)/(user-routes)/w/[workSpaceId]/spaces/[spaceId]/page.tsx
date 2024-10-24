import BoardsContainer from "@/components/boards/boards-container";
import TaskDetails from "@/components/boards/task-details";
import { EditSpace } from "@/components/spaces/edit-space";
import Filter from "@/components/spaces/filter";
import SearchBar from "@/components/boards/search-tasks";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { getSpaceDetails } from "@/utils/space-utils";

export default async function Page({
  params,
  searchParams,
}: {
  params: { workSpaceId: string; spaceId: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const userCookie = cookies().get("user");
  const { data: spaceDetails, error } = await getSpaceDetails(
    params.spaceId,
    userCookie?.value
  );

  return (
    <div className="mt-4 overflow-hidden">
      {error && <p>{error}</p>}
      {spaceDetails && (
        <>
          <div className="flex px-4 justify-between">
            <SearchBar />
            <div className="flex gap-4">
              <EditSpace
                spaceId={params.workSpaceId}
                initialData={{
                  name: spaceDetails.name,
                  description: spaceDetails.description,
                }}>
                <Button variant="outline" size="sm">
                  Edit space
                </Button>
              </EditSpace>
              <Filter />
            </div>
          </div>
          <div className="h-0.5 bg-zinc-400 my-2 rounded-full"></div>
          {searchParams["task"] && searchParams["list"] && (
            <TaskDetails
              listId={searchParams["list"]}
              taskId={searchParams["task"]}
            />
          )}
          <BoardsContainer />
        </>
      )}
    </div>
  );
}
