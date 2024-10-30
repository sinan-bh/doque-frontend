import BoardsContainer from "@/components/boards/boards-container";
import TaskDetails from "@/components/boards/task-details";
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
