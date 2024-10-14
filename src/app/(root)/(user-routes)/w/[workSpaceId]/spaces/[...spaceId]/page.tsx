import BoardsContainer from "@/components/boards/boards-container";
import TaskDetails from "@/components/boards/task-details";
import Filter from "@/components/spaces/filter";
import SearchBar from "@/components/spaces/search-bar";
import { getSpaceDetails } from "@/utils/taskUtils";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { workSpaceId: string; spaceId: string | string[] };
}) {
  const { data: spaceDetails, error } = await getSpaceDetails(
    params.spaceId[0]
  );

  if (params.spaceId.length > 2) {
    redirect(`/w/${params.workSpaceId}/spaces/${params.spaceId[0]}`);
  }

  return (
    <div className="mt-4 overflow-hidden">
      {error && <p>{error}</p>}
      {spaceDetails && (
        <>
          <div className="flex px-4 justify-between">
            <SearchBar placeholder={`Search in ${spaceDetails.name}..`} />
            <Filter />
          </div>
          <div className="h-0.5 bg-zinc-400 my-2 rounded-full"></div>
          {params.spaceId[1] && <TaskDetails taskId={params.spaceId[1]} />}
          <BoardsContainer spaceData={spaceDetails} />
        </>
      )}
    </div>
  );
}
